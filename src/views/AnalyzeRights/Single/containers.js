import { query } from 'store/fetch';

export const RECEIVE_ANALYZE_INIT = 'RECEIVE_ANALYZE_INIT';
export const RECEIVE_ANALYZE = 'RECEIVE_ANALYZE';
export const RECEIVE_ANALYZE_ERROR = 'RECEIVE_ANALYZE_ERROR';

const initialState = {
  fetching: false,
  data: {
    out: [],
    use: [],
  },
  out: [],
  use: [],
};

export function receiveInit() {
  return {
    type: RECEIVE_ANALYZE_INIT,
    payload: {
      fetching: true,
    },
  };
}
export function receiveError() {
  return {
    type: RECEIVE_ANALYZE_ERROR,
    payload: {
      fetching: false,
    },
  };
}
export function receivesingle(data) {
  return {
    type: RECEIVE_ANALYZE_ERROR,
    payload: {
      fetching: false,
      ...data,
    },
  };
}

export function getSingle(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    query('/api/data/single', param).then((data) => {
      if (data.success) {
        dispatch(receivesingle(data.result));
      }
    });
  };
}

export default function logReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ANALYZE_INIT:
      return Object.assign({}, state, action.payload);
    case RECEIVE_ANALYZE:
      return Object.assign({}, state, action.payload);
    case RECEIVE_ANALYZE_ERROR:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

