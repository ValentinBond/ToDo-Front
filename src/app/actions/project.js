import {
  GET_PROJECT_LIST_FAILED,
  GET_PROJECT_LIST_REQUEST,
  GET_PROJECT_LIST_SUCCESS,
  CREATE_PROJECT_LIST_FAILED,
  CREATE_PROJECT_LIST_REQUEST,
  CREATE_PROJECT_LIST_SUCCESS,
  REMOVE_PROJECT_SUCCESS,
  REMOVE_PROJECT_REQUEST,
  REMOVE_PROJECT_FAILED, EDIT_PROJECT_REQUEST, EDIT_PROJECT_SUCCESS, EDIT_PROJECT_FAILED
} from '../constants';

export const getProjectListAction = ({ url }) => {
  return {
    type: GET_PROJECT_LIST_REQUEST,
    payload: { url }
  };
};

export const getProjectListSuccessAction = (payload) => {
  return {
    type: GET_PROJECT_LIST_SUCCESS,
    payload
  };
};

export const getProjectListFailedAction = (payload) => {
  return {
    type: GET_PROJECT_LIST_FAILED,
    payload
  };
};

export const createProjectAction = ({ url, formData }) => {
  return {
    type: CREATE_PROJECT_LIST_REQUEST,
    payload: {
      url,
      formData
    }
  };
};

export const createProjectSuccessAction = (payload) => {
  return {
    type: CREATE_PROJECT_LIST_SUCCESS,
    payload
  };
};

export const createProjectFailedAction = (payload) => {
  return {
    type: CREATE_PROJECT_LIST_FAILED,
    payload
  };
};


export const removeProjectAction = ({ url }) => {
  return {
    type: REMOVE_PROJECT_REQUEST,
    payload: { url }
  };
};

export const removeProjectSuccessAction = (payload) => {
  return {
    type: REMOVE_PROJECT_SUCCESS,
    payload
  };
};

export const removeProjectFailedAction = (payload) => {
  return {
    type: REMOVE_PROJECT_FAILED,
    payload
  };
};

export const editProjectAction = ({ url, formData }) => {
  return {
    type: EDIT_PROJECT_REQUEST,
    payload: {
      url,
      formData
    }
  };
};

export const editProjectSuccessAction = () => {
  return {
    type: EDIT_PROJECT_SUCCESS
  };
};

export const editProjectFailedAction = () => {
  return {
    type: EDIT_PROJECT_FAILED
  };
};
