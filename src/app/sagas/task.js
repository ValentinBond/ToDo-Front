import { call, put, takeEvery } from 'redux-saga/effects';
import {
  createTaskSuccessAction,
  createTaskFailedAction,
  getTaskListSuccessAction,
  getTaskListFailedAction,
  removeTaskSuccessAction,
  removeTaskFailedAction,
  editTaskSuccessAction,
  editTaskFailedAction
} from '../actions';
import {
  GET_TASK_LIST_REQUEST,
  CREATE_TASK_REQUEST,
  REMOVE_TASK_REQUEST, EDIT_TASK_REQUEST
} from '../constants';
import { httpRequest } from '../../utils/http';

function* getTaskListWorker(action) {
  try {
    const payload = yield call(httpRequest, {
      url: action.payload.url,
      method: 'GET'
    });

    yield put(getTaskListSuccessAction(payload));
  } catch (error) {
    yield put(getTaskListFailedAction(error));
  }
}

function* createTaskWorker(action) {
  try {
    const payload = yield call(httpRequest, {
      url: action.payload.url,
      method: 'POST',
      data: action.payload.formData
    });

    yield put(createTaskSuccessAction(payload));
  } catch (error) {
    yield put(createTaskFailedAction(error));
  }
}

function* removeTaskWorker(action) {
  try {
    const payload = yield call(httpRequest, {
      url: action.payload.url,
      method: 'DELETE'
    });

    yield put(removeTaskSuccessAction(payload));
  } catch (error) {
    yield put(removeTaskFailedAction(error));
  }
}

function* editTaskWorker(action) {
  try {
    const payload = yield call(httpRequest, {
      url: action.payload.url,
      data: action.payload.formData,
      method: 'PUT'
    });

    yield put(editTaskSuccessAction(payload));
  } catch (error) {
    yield put(editTaskFailedAction(error));
  }
}

export default function* taskWatcher() {
  yield takeEvery(GET_TASK_LIST_REQUEST, getTaskListWorker);
  yield takeEvery(CREATE_TASK_REQUEST, createTaskWorker);
  yield takeEvery(REMOVE_TASK_REQUEST, removeTaskWorker);
  yield takeEvery(EDIT_TASK_REQUEST, editTaskWorker);
}