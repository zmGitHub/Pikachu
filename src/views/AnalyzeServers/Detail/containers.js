import { query } from 'store/fetch';

const initialState = {
  fetching: false,
  echarts: [],
  data: [],
  total: 0,
};

export const RECEIVE_SERVERDETAIL_INIT = 'RECEIVE_SERVERDETAIL_INIT';
export const RECEIVE_SERVERDETAIL_ERROR = 'RECEIVE_SERVERDETAIL_ERROR';
export const RECEIVE_SERVERDETAIL = 'RECEIVE_SERVERDETAIL';

export function receiveInit() {
  return {
    type: RECEIVE_SERVERDETAIL_INIT,
    payload: {
      fetching: true,
    },
  };
}
export function receiveServer(data) {
  return {
    type: RECEIVE_SERVERDETAIL,
    payload: {
      fetching: false,
      ...data,
    },
  };
}
export function receiveError() {
  return {
    type: RECEIVE_SERVERDETAIL_ERROR,
    payload: {
      fetching: false,
    },
  };
}

export function getDetail(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    query('/api/data/analyzeServerDetail', param).then((res) => {
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
    case RECEIVE_SERVERDETAIL:
      return Object.assign({}, state, action.payload);
    case RECEIVE_SERVERDETAIL_INIT:
      return Object.assign({}, state, action.payload);
    case RECEIVE_SERVERDETAIL_ERROR:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
