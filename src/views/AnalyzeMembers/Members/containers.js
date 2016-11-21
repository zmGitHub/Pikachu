import { get, query, post } from 'store/fetch';

const initialState = {
  fetching: false,
  error: false,
  general: {
    logins: {},
    adds: {},
    actives: {},
    loss: {},
    activeRate: {},
    lossRate: {},
  },
  app: {
    logins: {},
    adds: {},
    actives: {},
    loss: {},
    activeRate: {},
    lossRate: {},
    data: [],
  },
};


// 常量
export const RECEIVE_AMB_INIT = 'RECEIVE_AMB_INIT';
export const RECEIVE_AMB_ERRORS = 'RECEIVE_AMB_ERRORS';
export const RECEIVE_AMB = 'RECEIVE_AMB';
export const RECEIVE_AMB_APP = 'RECEIVE_AMB_APP';
export const RECEIVE_AMB_GENERAL = 'RECEIVE_AMB_GENERAL';


// 初始化请求
export function receiveInit() {
  return {
    type: RECEIVE_AMB_INIT,
    payload: {
      fetching: true,
    },
  };
}
// 初始化请求
export function receiveErrors() {
  return {
    type: RECEIVE_AMB_ERRORS,
    payload: {
      fetching: false,
      error: true,
    },
  };
}
// 接受会员概况
export function receiveAMB(data) {
  return {
    type: RECEIVE_AMB,
    payload: {
      fetching: false,
      error: false,
      general: data.general,
      app: data.app,
    },
  };
}
// 获取会员概况
export function receiveAMBGeneral(general) {
  return {
    type: RECEIVE_AMB_GENERAL,
    payload: {
      fetching: false,
      error: false,
      general,
    },
  };
}

// 获取应用分析
export function receiveAMBApp(app) {
  return {
    type: RECEIVE_AMB_APP,
    payload: {
      fetching: false,
      error: false,
      app,
    },
  };
}
// 获取会员分析数据
export function getAMB() {
  return (dispatch) => {
    dispatch(receiveInit());
    get('/api/data/analyzeMembers').then((data) => {
      if (data.success) {
        dispatch(receiveAMB(data.result));
      }
    }, () => {
      dispatch(receiveErrors());
    });
  };
}

// 设置警戒值
export function setAlert(params) {
  return dispatch =>
    post('/api/data/analyzeMembersGeneral', params).then((data) => {
      let promise = null;
      if (data.success && data.result) {
        promise = Promise.resolve(data.result);
      } else {
        promise = Promise.reject(data.error);
      }
      return promise;
    }, () => {
      dispatch(receiveErrors());
    });
}

// 获取会员概况
export function getAMBGeneral(params) {
  return (dispatch) => {
    query('/api/data/analyzeMembersGeneral', params).then((data) => {
      if (data.success) {
        dispatch(receiveAMBGeneral(data.result));
      }
    }, () => {
      dispatch(receiveErrors());
    });
  };
}

// 获取应用分析
export function getAMBApp(params) {
  return (dispatch) => {
    dispatch(receiveInit());
    query('/api/data/analyzeMembersApp', params).then((data) => {
      if (data.success) {
        dispatch(receiveAMBApp(data.result));
      }
    }, () => {
      dispatch(receiveErrors());
    });
  };
}

// reducers
export default function analyzeMembersReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_AMB_INIT:
      return Object.assign({}, state, action.payload);
    case RECEIVE_AMB_ERRORS:
      return Object.assign({}, state, action.payload);
    case RECEIVE_AMB:
      return Object.assign({}, state, action.payload);
    case RECEIVE_AMB_GENERAL:
      return Object.assign({}, state, action.payload);
    case RECEIVE_AMB_APP:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
