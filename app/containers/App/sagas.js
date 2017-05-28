import io from "socket.io-client";
import {takeEvery, eventChannel} from "redux-saga";
import {call, fork, put, take, cancel, select} from "redux-saga/effects";

import {connected, disconnected} from "./actions/actions";
import * as requests from "./actions/requests";
import * as responses from "./actions/responses";
import threadsSaga from "../ThreadList/sagas";
import friendsSaga from "../FriendsList/sagas";
import chatbotSaga from "../ChatbotTab/sagas";
import historySaga from "../ThreadHistory/sagas";
import cryptoSaga from "../KeyList/sagas";
import {selectAppState} from "../LoginModal/selectors";
import {DISCONNECTED} from "./actions/actions";

function connect() {
  const socket = io();
  return new Promise(resolve => {
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    // Set the current user to 'connected'.
    // Timeout is somehow necessary for the reducer to be ready.
    setTimeout(() => emit(connected()), 100);

    // Keep the connection state updated
    socket.on("disconnect", res => {
      emit(disconnected());
    });
    socket.on("connect", res => {
      emit(connected());
    });

    // Doesn't work with 'var' due to block vs function scope.
    // Alternative: wrap callback into maker function.
    for (let key in responses) {
      const actionCreator = responses[key];
      if (typeof actionCreator === "function") {

        // Use dummy response to get action types from action creators
        // without causing null pointers.
        const dummyRes = {data: {}, args: []};
        const event = actionCreator(dummyRes).type;
        socket.on(event, res => {
          emit(actionCreator(res));
        });
      }
    }
    return () => {};
  });
}

function* receiveEvents(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    console.log(action);
    yield put(action);
  }
}

function* emitEvents(socket) {
  for (let key in requests) {
    const event = requests[key];
    if (typeof event === "string") {
      yield takeEvery(event, function* (action) {
        console.log(action);
        socket.emit(event, action.args);
      });
    }
  }
}

function* main() {
  while (true) {
    const socket = yield call(connect);
    const emitTask = yield fork(emitEvents, socket);
    const receiveTask = yield fork(receiveEvents, socket);
    const threadsTask = yield fork(threadsSaga, socket);
    const friendsTask = yield fork(friendsSaga, socket);
    const chatbotTask = yield fork(chatbotSaga);
    const historyTask = yield fork(historySaga);
    const cryptoTask = yield fork(cryptoSaga);

    const appState = yield select(selectAppState());
    if (appState) {
      yield put(requests.login({appState: appState}))
    }

    yield take(responses.LOGIN_PASSED);
    yield put(requests.loadMemes());
    yield put(requests.listen());

    yield take(DISCONNECTED);
    yield cancel(receiveTask);
    yield cancel(emitTask);
    yield cancel(threadsTask);
    yield cancel(friendsTask);
    yield cancel(chatbotTask);
    yield cancel(historyTask);
    yield cancel(cryptoTask);
  }
}

function* rootSaga() {
  yield fork(main);
}

export default [
  rootSaga
]
