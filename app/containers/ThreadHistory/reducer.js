import {fromJS, Map, List} from "immutable";
import {LOGOUT, DELETE_MESSAGE} from "../App/actions/requests";
import {
  PHOTO_URL_RESOLVED, THREAD_HISTORY_RECEIVED, THREAD_PICTURES_RECEIVED,
  UPDATE_RECEIVED
} from "../App/actions/responses";
import {TOGGLE_MESSAGE_SELECT} from "../MessageContainer/actions";
import {IS_MSG_SELECT} from "./constants";
import {SELECT_ALL_MESSAGES, DESELECT_ALL_MESSAGES} from "./actions";
import {MESSAGE_DECRYPTED, THREAD_HISTORY_DECRYPTED} from "../KeyManager/actions";

const initState = Map();

export function historiesReducer(state = initState, action, threadID) {
  switch (action.type) {
    case THREAD_HISTORY_DECRYPTED:
      /* Timestamps needed to integrate the new thread history properly. */
      const threadId = action.args[0];
      const newHistory = fromJS(action.data); // Assume history to be sorted
      const firstStamp = (newHistory.first() || Map()).get("timestamp");
      const lastStamp = (newHistory.last() || Map()).get("timestamp");
      const oldHistory = state.get(threadId) || List();
      const latestStamp = (oldHistory.last() || Map()).get("timestamp") || 0;
      const oldestStamp = (oldHistory.first() || Map()).get("timestamp");

      return state
        .withMutations(state => {
          /* Prepend older history after scrolling. */
          if (lastStamp < oldestStamp) {
            state.set(threadId, newHistory.concat(oldHistory));
          /* Add all messages complete history newer than existing one. */
          } else if (firstStamp > latestStamp) {
            state.set(threadId, oldHistory.concat(newHistory));
          /* Add newer messages only if history starts within the extisting history. */
          } else if (firstStamp <= latestStamp && firstStamp >= oldestStamp) {
            state.set(threadId, oldHistory.concat(newHistory.skipUntil(msg => msg.get("timestamp") > latestStamp)));
          }
        });

    case MESSAGE_DECRYPTED:
      const data = action.data;
      switch (data.type) {

        /* Received when someone read a message. */
        case "read_receipt":
          return state.updateIn([data.threadID, -1, "readers"], readers => {
            return (readers || List()).push(data.reader);
          });

        /* TODO: implement online status inside the thread and friends list. */
        case "presence":
          return state;

        case "message":
          const history = state.get(data.threadID);
          const index = history ? history.count() : 0;
          return state
            .setIn([data.threadID, index], fromJS(data).set(IS_MSG_SELECT, false));
        default:
          return state;
      }

    case TOGGLE_MESSAGE_SELECT:
      return state
        .updateIn([action.threadID, action.index, IS_MSG_SELECT], isSelect => !isSelect);

    case SELECT_ALL_MESSAGES:
      return state.withMutations(state => {
        const count = state.get(threadID).count();
        for (let i = 0; i < count; i++)
          state.setIn([threadID, i, IS_MSG_SELECT], true);
      });

    case DESELECT_ALL_MESSAGES:
      return state.withMutations(state => {
        const count = state.get(threadID).count();
        for (let i = 0; i < count; i++)
          state.setIn([threadID, i, IS_MSG_SELECT], false);
      });

    case DELETE_MESSAGE:
      const newHist = state.get(threadID).filter(msg => !msg.get(IS_MSG_SELECT));
      return state
        .set(threadID, newHist);

    case LOGOUT:
      return initState;
  }
}

export function typersReducer(state = initState, action, threadID, userID) {
  switch (action.type) {
    case UPDATE_RECEIVED:
      const data = action.data;
      switch (data.type) {
        case "typ":
          let threadID = data.threadID;
          /* ThreadID equals the userID in non-group-chats. */
          if (userID == data.threadID)
            threadID = data.from;
          if (data.isTyping)
            return state.setIn([threadID, data.from], new Date().getTime());
          return state.deleteIn([threadID, data.from]);
        default:
          return state;
      }

    case THREAD_HISTORY_RECEIVED:
      const threadID = action.args[0];
      return state
        .set(threadID, fromJS({}));

    case LOGOUT:
      return initState;
  }
}

const initPhotoList = List();
export function photosReducer(state = initPhotoList, action) {
  switch (action.type) {

    case PHOTO_URL_RESOLVED:
      return fromJS([action.url]).concat(state).toOrderedSet().toList();

    case THREAD_PICTURES_RECEIVED:
      return fromJS(action.photos).map(photo => photo.get("uri"));

    case LOGOUT:
      return initPhotoList;
  }
}
