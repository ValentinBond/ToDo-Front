import { call, put, takeEvery } from 'redux-saga/effects';
import {
  createProjectSuccessAction,
  createProjectFailedAction,
  getProjectListFailedAction,
  getProjectListSuccessAction,
  editProjectSuccessAction,
  editProjectFailedAction
} from '../actions';
import {
  GET_PROJECT_LIST_REQUEST,
  CREATE_PROJECT_LIST_REQUEST, REMOVE_PROJECT_REQUEST, EDIT_PROJECT_REQUEST
} from '../constants';
import { httpRequest } from '../../utils/http';
import { removeProjectFailedAction, removeProjectSuccessAction } from '../actions/project';


function* getProjectListWorker(action) {
  try {
    const payload = yield call(httpRequest, {
      url: action.payload.url,
      method: 'GET'
    });

    yield put(getProjectListSuccessAction(payload));
  } catch (error) {
    yield put(getProjectListFailedAction(error));
  }
}

function* createProjectWorker(action) {
  try {
    const payload = yield call(httpRequest, {
      url: action.payload.url,
      method: 'POST',
      data: action.payload.formData
    });

    yield put(createProjectSuccessAction(payload));
  } catch (error) {
    yield put(createProjectFailedAction(error));
  }
}

function* removeProjectWorker(action) {
  try {
    const payload = yield call(httpRequest, {
      url: action.payload.url,
      method: 'DELETE',
      data: action.payload.formData
    });

    yield put(removeProjectSuccessAction(payload));
  } catch (error) {
    yield put(removeProjectFailedAction(error));
  }
}

function* editProjectWorker(action) {
  try {
    const payload = yield call(httpRequest, {
      url: action.payload.url,
      method: 'PUT',
      data: action.payload.formData
    });

    yield put(editProjectSuccessAction(payload));
  } catch (error) {
    yield put(editProjectFailedAction(error));
  }
}


export default function* projectWatcher() {
  yield takeEvery(GET_PROJECT_LIST_REQUEST, getProjectListWorker);
  yield takeEvery(CREATE_PROJECT_LIST_REQUEST, createProjectWorker);
  yield takeEvery(REMOVE_PROJECT_REQUEST, removeProjectWorker);
  yield takeEvery(EDIT_PROJECT_REQUEST, editProjectWorker);
}