import { call, put, takeEvery } from 'redux-saga/effects';
import axios from '../../utils/axios';
import {
  registrationFailedAction,
  registrationSuccessAction,
  logInSuccessAction,
  logInFailedAction
}  from '../actions';
import {
  REGISTRATION_REQUEST,
  LOGIN_REQUEST
} from '../constants';
import { httpRequest } from '../../utils/http';

const setTokenAndRedirect = (action, payload) => {
  window.localStorage.setItem('token', payload.data.token);
  axios.defaults.headers.common.Authorization = `Bearer ${payload.data.token}`;
  action.payload.history.push('/');
};

function* registrationWorker(action) {
  try {
    const payload = yield call(httpRequest, {
      url: action.payload.url,
      method: 'POST',
      data: action.payload.formData
    });

    setTokenAndRedirect(action, payload);

    yield put(registrationSuccessAction(payload));
  } catch (error) {
    yield put(registrationFailedAction(error));
  }
}

function* signInWorker(action) {
  try {
    const payload = yield call(httpRequest, {
      url: action.payload.url,
      method: 'POST',
      data: action.payload.formData
    });

    setTokenAndRedirect(action, payload);

    yield put(logInSuccessAction(payload));
  } catch (error) {
    yield put(logInFailedAction(error));
  }
}

export default function* authWatcher() {
  yield takeEvery(REGISTRATION_REQUEST, registrationWorker);
  yield takeEvery(LOGIN_REQUEST, signInWorker);
}