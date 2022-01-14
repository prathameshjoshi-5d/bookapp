import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {SET_DATA, SET_TEST} from '../constants/actionTypes';

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
