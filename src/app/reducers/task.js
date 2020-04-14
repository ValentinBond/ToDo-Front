import {
  GET_TASK_LIST_SUCCESS,
  GET_TASK_LIST_FAILED,
  GET_TASK_LIST_REQUEST,
  CREATE_TASK_FAILED
} from '../constants';


const initialState = {
  taskList: [],
  errors: [],
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TASK_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_TASK_LIST_SUCCESS:
      return {
        ...state,
        errors: [],
        taskList: payload.data.taskList,
        loading: false
      };
    case GET_TASK_LIST_FAILED:
    case CREATE_TASK_FAILED:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
};