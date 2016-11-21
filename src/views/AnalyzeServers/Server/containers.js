import { query } from 'store/fetch';

const initialState = {
  fetching: false,
  serverTotal: '',  // 服务总次数
  satisfactionTotal: '',  // 满意总次数
  data: [],
  total: 0,
};

export const RECEIVE_SERVER_INIT = 'RECEIVE_SERVER_INIT';
export const RECEIVE_SERVER_ERROR = 'RECEIVE_SERVER_ERROR';
export const RECEIVE_SERVER = 'RECEIVE_SERVER';

export function receiveInit() {
  return {
    type: RECEIVE_SERVER_INIT,
    payload: {
      fetching: true,
    },
  };
}
export function receiveServer(data) {
  return {
    type: RECEIVE_SERVER,
    payload: {
      fetching: false,
      ...data,
    },
  };
}
export function receiveError() {
  return {
    type: RECEIVE_SERVER_ERROR,
    payload: {
      fetching: false,
    },
  };
}

export function getServers(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    query('/api/data/analyzeServers', param).then((res) => {
      if (res.success) {
        dispatch(receiveServer(res.result));
      }
    }, () => {
      dispatch(receiveError());
    });
  };
}

export default function serverReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SERVER:
      return Object.assign({}, state, action.payload);
    case RECEIVE_SERVER_INIT:
      return Object.assign({}, state, action.payload);
    case RECEIVE_SERVER_ERROR:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
