import { eventChannel } from 'redux-saga';
import socket from '../../utils/socketInstance';

import { call, take } from 'redux-saga/effects';
import { fork, put, cancel } from '@redux-saga/core/effects';
import {
  getProjectListSuccessAction
} from '../actions';

const createProjectSocketChannel = () => {
  return eventChannel(emitter => {
    const handler = data => emitter(data);

    socket.on('projects', handler);

    return () => {
      socket.off('projects', handler);
    };
  });
};

function* listenProjectServerSaga() {
  const socketChannel = yield call(createProjectSocketChannel);

  while (true) {
    const payload = yield take(socketChannel);

    yield put(getProjectListSuccessAction(payload));
  }
}


export default function* projectSocketWorker() {
  while (true) {
    yield take('START_CHANNEL');
    const projectSocketConnect = yield fork(listenProjectServerSaga);

    yield take('END_CHANNEL');
    createProjectSocketChannel().close();
    yield cancel(projectSocketConnect);
  }
}