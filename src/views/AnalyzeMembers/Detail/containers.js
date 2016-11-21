import { query } from 'store/fetch';

const initialState = {
  fetching: false,
  logins: [],
  adds: [],
  actives: [],
  loss: [],
  activeRate: [],
  lossRate: [],
};
export const RECEIVE_AMB_DETAIL_INIT = 'RECEIVE_AMB_DETAIL_INIT';
export const RECEIVE_AMB_DETAIL = 'RECEIVE_AMB_DETAIL';
export const RECEIVE_AMB_DETAIL_ERROR = 'RECEIVE_AMB_DETAIL_ERROR';

export function receiveInit() {
  return {
    type: RECEIVE_AMB_DETAIL_INIT,
    payload: {
      fetching: true,
    },
  };
}
export function receiveError() {
  return {
    type: RECEIVE_AMB_DETAIL_ERROR,
    payload: {
      fetching: false,
    },
  };
}
export function receiveAMBDetail(data) {
  return {
    type: RECEIVE_AMB_DETAIL,
    payload: {
      fetching: false,
      ...data,
    },
  };
}
// 获取列表
export function getAMBDetail(id, params) {
  return (dispatch) => {
    dispatch(receiveInit());
    query(`/api/data/analyzeMembers/${id}`, params).then((data) => {
      dispatch(receiveAMBDetail(data.result));
    }, () => {
      dispatch(receiveError());
    });
  };
}
export default function ambDetailReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_AMB_DETAIL_INIT:
      return Object.assign({}, state, action.payload);
    case RECEIVE_AMB_DETAIL_ERROR:
      return Object.assign({}, state, action.payload);
    case RECEIVE_AMB_DETAIL:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
