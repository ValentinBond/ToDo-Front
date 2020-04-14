import { call, all } from 'redux-saga/effects';
import authSaga from './auth';
import projectSaga from './project';
import taskSaga from './task';
import userSaga from './user';
import projectSocketSaga from './projectSocket';
import taskSocketSaga from './taskSocket';

export default function* rootSaga() {
  yield all({
    auth: call(authSaga),
    project: call(projectSaga),
    task: call(taskSaga),
    user: call(userSaga),
    socket: call(projectSocketSaga),
    taskSocket: call(taskSocketSaga)
  });
}