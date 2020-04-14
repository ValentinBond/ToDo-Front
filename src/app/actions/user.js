import {
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_FAILED
} from '../constants';

export const getUserListRequestAction = ({ url }) => {
  return { type: GET_USER_LIST_REQUEST, payload: { url } };
};

export const getUserListFailedAction = (payload) => {
  return { type: GET_USER_LIST_FAILED, payload };
};

export const getUserListSuccessAction = (payload) => {
  return { type: GET_USER_LIST_SUCCESS, payload };
};