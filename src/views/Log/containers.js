import { post } from 'store/fetch';

const initialState = {
  fetching: false,
  data: [],
  total: 0,
};
export const RECEIVE_LOG = 'RECEIVE_LOG';
export const RECEIVE_LOG_ERROR = 'RECEIVE_LOG_ERROR';
export const RECEIVE_GET_LOG = 'RECEIVE_GET_LOG';
export const RECEIVE_APP_LIST = 'RECEIVE_APP_LIST';

export function receiveInit() {
  return {
    type: RECEIVE_LOG,
    payload: {
      fetching: true,
    },
  };
}
export function receiveError() {
  return {
    type: RECEIVE_LOG_ERROR,
    payload: {
      fetching: false,
    },
  };
}
export function receiveGetLog(data) {
  return {
    type: RECEIVE_GET_LOG,
    payload: {
      fetching: false,
      ...data,
    },
  };
}
// 获取列表
export function getLog(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    post('/api/user/log', param).then((data) => {
      dispatch(receiveGetLog(data.result));
    }, () => {
      dispatch(receiveError());
    });
  };
}
export default function logReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_LOG:
      return Object.assign({}, state, action.payload);
    case RECEIVE_LOG_ERROR:
      return Object.assign({}, state, action.payload);
    case RECEIVE_GET_LOG:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
