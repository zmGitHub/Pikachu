import { query } from 'store/fetch';
import { notification } from 'antd';

const initialState = {
  integrals: {    // 积分概况
    obligate: '',  // 最近一天全网积预留总数
    out: {     // 积分发放总数
      amounts: '--',  // 数量
      compare: '--',    // 比较条件
      rate: '--',       // 增长或下降
      isRate: '--',  //是否增长
    },
    useAmounts: {     // 积分使用总数
      amounts: '--',  // 数量
      compare: '--',    // 比较条件
      rate: '--',       // 增长或下降
      isRate: true,  //是否增长
    },
    exchange: {     // 兑换商品总数
      amounts: '--',  // 数量
      compare: '--',    // 比较条件
      rate: '--',       // 增长或下降
      isRate: true,  //是否增长
    },
    users: {     // 兑换人数
      amounts: '--',  // 数量
      compare: '--',    // 比较条件
      rate: '--',       // 增长或下降
      isRate: false,  //是否增长
    },
  },
  clientAnalyze: {       // 应用分析
    outMore: '--', // 30天发放最多
    useMore: '--', //30天使用最多
  },
  total: 0,
  data: [],
};
export const RECEIVE_IG_ALL = 'RECEIVE_IG_ALL';
export const RECEIVE_IG_CLIENT = 'RECEIVE_IG_CLIENT';
export const RECEIVE_IG_GENARAL = 'RECEIVE_IG_GENARAL';
export const RECEIVE_IG_ERROR = 'RECEIVE_IG_ERROR';
export const RECEIVE_IG_INIT = 'RECEIVE_IG_INIT';

export function receiveInit() {
  return {
    type: RECEIVE_IG_INIT,
    payload: {
      fetching: true,
    },
  };
}
export function receiveError() {
  return {
    type: RECEIVE_IG_ERROR,
    payload: {
      fetching: false,
    },
  };
}
// 首次储存数据
export function receiveAll(data) {
  return {
    type: RECEIVE_IG_ALL,
    payload: {
      fetching: false,
      ...data,
    },
  };
}
// 积分概况
export function receiveIntegral(integrals) {
  return {
    type: RECEIVE_IG_GENARAL,
    payload: {
      fetching: false,
      integrals,
    },
  };
}
// 应用分析
export function receiveClient(data) {
  return {
    type: RECEIVE_IG_CLIENT,
    payload: {
      fetching: false,
      ...data,
    },
  };
}
// 页面刚进入拿数据
export function getAll() {
  return (dispatch) => {
    dispatch(receiveInit());
    query('/api/data/integralAnalyze').then((data) => {
      if (data.success) {
        dispatch(receiveAll(data.result));
      }
    }, () => {
      dispatch(receiveError());
    });
  };
}
// 数据
export function getIntegral(param) {
  return (dispatch) => {
    query('/api/data/integralAnalyzeGeneral', param).then((data) => {
      if (data.success) {
        dispatch(receiveIntegral(data.result));
      }
    }, () => {
      dispatch(receiveError());
    });
  };
}
// 页面刚进入拿数据
export function getClient(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    query('/api/data/integralAnalyzeClient', param).then((data) => {
      if (data.success) {
        dispatch(receiveClient(data.result));
      }
    }, () => {
      dispatch(receiveError());
    });
  };
}
export default function integralReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_IG_INIT:
      return Object.assign({}, state, action.payload);
    case RECEIVE_IG_ALL:
      return Object.assign({}, state, action.payload);
    case RECEIVE_IG_GENARAL:
      return Object.assign({}, state, action.payload);
    case RECEIVE_IG_CLIENT:
      return Object.assign({}, state, action.payload);
    case RECEIVE_IG_ERROR:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
