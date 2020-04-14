import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getUserListSuccessAction,
  getUserListFailedAction
}  from '../actions';
import {
  GET_USER_LIST_REQUEST
} from '../constants';
import { httpRequest } from '../../utils/http';


function* getUserListWorker(action) {
  try {
    const payload = yield call(httpRequest, {
      url: action.payload.url,
      method: 'GET'
    });

    yield put(getUserListSuccessAction(payload));
  } catch (error) {
    yield put(getUserListFailedAction(error));
  }
}


export default function* userWatcher() {
  yield takeEvery(GET_USER_LIST_REQUEST, getUserListWorker);
}