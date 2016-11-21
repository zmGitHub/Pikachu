import { query } from 'store/fetch';

const RECEIVE_HOME_DATA = 'RECEIVE_HOME_DATA';
const RECEIVE_HOME_ERROR = 'RECEIVE_HOME_ERROR';
const RECEIVE_HOME_INIT = 'RECEIVE_HOME_INIT';

const initialState = {
  fetching: false,
  data: {
    actualTime: {
      headcounts: '',   // 总人数
      integrals: '',  // 积分总数
      servers: '',   // 服务总数
      clients: '',   // 设备总数
    },
    seven: {
      logins: '',   // 登录数
      adds: '',     // 新增数
      actives: '',  // 活跃数
      runOff: '',   // 流失数
      activesRate: '', // 日活率
      runOffRate: '',  // 流失率
    },
    thirtyAdds: [],     // 30天新增用户数
    thirtyLogins: [],   // 30天登录应用
  },
};

export function receiveInit() {
  return {
    type: RECEIVE_HOME_INIT,
    payload: {
      fetching: true,
    },
  };
}
export function receiveError() {
  return {
    type: RECEIVE_HOME_ERROR,
    payload: {
      fetching: false,
    },
  };
}
// 存数据
export function receiveHome(data) {
  return {
    type: RECEIVE_HOME_DATA,
    payload: {
      fetching: false,
      data,
    },
  };
}

export function getHome() {
  return (dispatch) => {
    dispatch(receiveInit());
    query('/api/home').then((data) => {
      if (data.success) {
        dispatch(receiveHome(data.result));
      }
    }, () => {
      dispatch(receiveError());
    });
  };
}
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_HOME_INIT:
      return Object.assign({}, state, action.payload);
    case RECEIVE_HOME_DATA:
      return Object.assign({}, state, action.payload);
    case RECEIVE_HOME_ERROR:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
