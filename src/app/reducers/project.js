import {
  GET_PROJECT_LIST_SUCCESS,
  GET_PROJECT_LIST_FAILED,
  GET_PROJECT_LIST_REQUEST,
  CREATE_PROJECT_LIST_FAILED
} from '../constants';

const initialState = {
  projectList: [],
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROJECT_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_PROJECT_LIST_SUCCESS:
      return {
        ...state,
        error: [],
        projectList: payload.data.projectList,
        loading: false
      };
    case GET_PROJECT_LIST_FAILED:
    case CREATE_PROJECT_LIST_FAILED:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
};