import {put, takeLatest} from 'redux-saga/effects';

function* setBooks({payload}) {
  try {
    yield put({type: "SET_BOOK", payload: payload});
  } catch (e) {
    console.log(e);
  }
}

function* bookSaga() {
  yield takeLatest('SET_DATA', setBooks);
}

export default bookSaga;
