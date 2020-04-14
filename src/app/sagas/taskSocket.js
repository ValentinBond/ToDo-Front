import { eventChannel } from 'redux-saga';
import socket from '../../utils/socketInstance';
import { call, take } from 'redux-saga/effects';
import { fork, put, cancel } from '@redux-saga/core/effects';
import {
  getTaskListSuccessAction
} from '../actions';

const createTaskSocketChannel = ({ projectId }) => {
  return eventChannel(emitter => {
    const handler = data => emitter(data);

    socket.on(`tasks${projectId}`, handler);
    return () => {
      socket.off(`tasks${projectId}`, handler);
    };
  });
};

function* listenTaskServerSaga(projectId) {
  const socketChannel = yield call(createTaskSocketChannel, { projectId });

  while (true) {
    const payload = yield take(socketChannel);

    yield put(getTaskListSuccessAction(payload));
  }
}

export default function* socketTaskWorker() {
  while (true) {
    const { projectId } = yield take('START_TASK_CHANNEL');
    const taskSocketConnect = yield fork(listenTaskServerSaga, projectId);
    const payload = yield take('END_TASK_CHANNEL');

    createTaskSocketChannel({ projectId: payload.projectId }).close();
    yield cancel(taskSocketConnect);
  }
}

