import { get } from 'store/fetch';

const initialState = {
  fetching: false,
  total: 0,
  data: [],
};

export const RECEIVE_ABUSER_INIT = 'RECEIVE_ABUSER_INIT';
export const RECEIVE_ABUSER_ERRORS = 'RECEIVE_ABUSER_ERRORS';
export const RECEIVE_ABUSER = 'RECEIVE_ABUSER';

// 异常用户请求初始化
export function receiveInit() {
  return {
    type: RECEIVE_ABUSER_INIT,
    payload: {
      fetching: true,
    },
  };
}

// 异常用户请求初始化错误
export function receiveErrors() {
  return {
    type: RECEIVE_ABUSER_ERRORS,
    payload: {
      fetching: false,
    },
  };
}

// 接收异常用户请求
export function receiveUser(data) {
  return {
    type: RECEIVE_ABUSER,
    payload: {
      fetching: false,
      ...data,
    },
  };
}

// 异常用户查询
export function getAbnormalUsers() {
  return (dispatch) => {
    dispatch(receiveInit());
    get('/api/data/abnormalUsers').then((data) => {
      if (data.success) {
        dispatch(receiveUser(data.result));
      }
    }, () => {
      dispatch(receiveErrors());
    });
  };
}

export default function abnormalUsersReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ABUSER_INIT:
      return Object.assign({}, state, action.payload);
    case RECEIVE_ABUSER_ERRORS:
      return Object.assign({}, state, action.payload);
    case RECEIVE_ABUSER:
      return Object.assign({}, state, action.payload);
    default :
      return state;
  }
}
