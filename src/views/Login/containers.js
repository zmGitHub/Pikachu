import { post } from 'store/fetch';

const initialState = {
  fetching: false,
  error: false,
  data: null,
};


// 常量
export const RECEIVE_USER_INIT = 'RECEIVE_USER_INIT';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const RECEIVE_USER = 'RECEIVE_USER';

// 初始化请求
export function receiveInit() {
  return {
    type: RECEIVE_USER_INIT,
    payload: {
      fetching: true,
    },
  };
}
// 初始化请求
export function receiveErrors() {
  return {
    type: RECEIVE_USER_ERRORS,
    payload: {
      fetching: false,
      error: true,
    },
  };
}
// 登录成功
export function receiveUser(data) {
  return {
    type: RECEIVE_USER,
    payload: {
      fetching: false,
      error: false,
      data,
    },
  };
}
// 用户登录
export function loginAction(params) {
  return (dispatch) => {
    dispatch(receiveInit());
    post('/api/users/login', params).then((data) => {
      dispatch(receiveUser(data));
    }, () => {
      dispatch(receiveErrors());
    });
  };
}

// reducers
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USER_INIT:
      return Object.assign({}, state, action.payload);
    case RECEIVE_USER_ERRORS:
      return Object.assign({}, state, action.payload);
    case RECEIVE_USER:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
