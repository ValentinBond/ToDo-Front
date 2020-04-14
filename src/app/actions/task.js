import {
  GET_TASK_LIST_SUCCESS,
  GET_TASK_LIST_REQUEST,
  GET_TASK_LIST_FAILED,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_REQUEST,
  CREATE_TASK_FAILED,
  REMOVE_TASK_REQUEST,
  REMOVE_TASK_SUCCESS,
  REMOVE_TASK_FAILED, EDIT_TASK_REQUEST, EDIT_TASK_SUCCESS, EDIT_TASK_FAILED
} from '../constants';

export const getTaskListAction = ({ url }) => {
  return {
    type: GET_TASK_LIST_REQUEST,
    payload: { url }
  };
};

export const getTaskListSuccessAction = (payload) => {
  return {
    type: GET_TASK_LIST_SUCCESS,
    payload
  };
};

export const getTaskListFailedAction = (payload) => {
  return {
    type: GET_TASK_LIST_FAILED,
    payload
  };
};

export const createTaskAction = ({ url, formData }) => {
  return {
    type: CREATE_TASK_REQUEST,
    payload: {
      url,
      formData
    }
  };
};

export const createTaskSuccessAction = (payload) => {
  return {
    type: CREATE_TASK_SUCCESS,
    payload
  };
};

export const createTaskFailedAction = (payload) => {
  return {
    type: CREATE_TASK_FAILED,
    payload
  };
};

export const removeTaskAction = ({ url }) => {
  return {
    type: REMOVE_TASK_REQUEST,
    payload: { url }
  };
};

export const removeTaskSuccessAction = (payload) => {
  return {
    type: REMOVE_TASK_SUCCESS,
    payload
  };
};

export const removeTaskFailedAction = (payload) => {
  return {
    type: REMOVE_TASK_FAILED,
    payload
  };
};

export const editTaskAction = ({ url, formData }) => {
  return {
    type: EDIT_TASK_REQUEST,
    payload: {
      url,
      formData
    }
  };
};

export const editTaskSuccessAction = (payload) => {
  return {
    type: EDIT_TASK_SUCCESS,
    payload
  };
};

export const editTaskFailedAction = (payload) => {
  return {
    type: EDIT_TASK_FAILED,
    payload
  };
};

