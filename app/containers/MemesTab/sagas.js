import {put} from "redux-saga/effects";
import {takeEvery} from "redux-saga";
import {UPLOAD_IMAGE} from "../App/actions/requests";
import {IMAGE_UPLOADED, imageUploaded} from "../App/actions/responses";

// Replaced with general requests handled by the redux-saga event channel.
// For demonstration purposes only!

function* upload(socket, action) {
  socket.emit(UPLOAD_IMAGE, action.dataURL);
}

function* main(socket) {
  yield takeEvery(UPLOAD_IMAGE, upload, socket);

  socket.on(IMAGE_UPLOADED, (res) => {
    yield put(imageUploaded(res));
  });
}

export default main;
