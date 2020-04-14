import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SWITCH_AUTH
} from '../constants';


const initialState = {
  token: '',
  errors: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTRATION_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: [],
        token: payload.data.token
      };
    case REGISTRATION_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        errors: payload
      };
    case SWITCH_AUTH:
      return {
        ...state,
        errors: []
      };
    default:
      return state;
  }
};