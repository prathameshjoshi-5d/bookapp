import { all, fork, call } from "redux-saga/effects";

import bookSaga from "./bookSaga";

export default function* rootSaga() {
//   yield all([fork(PostSaga)]);
  yield all([
      call(bookSaga)
  ]);
}