import {
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  REGISTRATION_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_REQUEST
} from '../constants';

export const registrationRequestAction = ({ url, formData, history }) => {
  return {
    type: REGISTRATION_REQUEST,
    payload: {
      url,
      formData,
      history
    }
  };
};

export const registrationSuccessAction = (payload) => {
  return {
    type: REGISTRATION_SUCCESS,
    payload
  };
};

export const registrationFailedAction = (payload) => {
  return {
    type: REGISTRATION_FAILED,
    payload
  };
};

export const logInRequestAction = ({ url, formData, history }) => {
  return {
    type: LOGIN_REQUEST,
    payload: {
      url,
      formData,
      history
    }
  };
};

export const logInSuccessAction = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
};

export const logInFailedAction = (payload) => {
  return {
    type: LOGIN_FAILED,
    payload
  };
};