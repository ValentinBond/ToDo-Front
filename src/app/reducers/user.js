import {
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILED,
  GET_USER_LIST_REQUEST
} from '../constants';


const initialState = {
  userList: [],
  errors: [],
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        errors: [],
        userList: payload.data.userList,
        loading: false
      };
    case GET_USER_LIST_FAILED:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
};