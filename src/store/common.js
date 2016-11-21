import { notification } from 'antd';
import { get } from './fetch';

const initialState = {
  fetching: false,
  result: [],
};
const RECEIVE_APP_LIST = 'RECEIVE_APP_LIST';
const RECEIVE_TAG_LIST = 'RECEIVE_TAG_LIST';

// 获取登录应用列表
export function receiveAppList(data) {
  return {
    type: RECEIVE_APP_LIST,
    payload: {
      fetching: false,
      ...data,
    },
  };
}
export function getAppList() {
  return dispatch =>
     get('/api/user/clients').then((data) => {
       if (data.success) {
         dispatch(receiveAppList(data));
       }
     }, (error) => {
       notification.open({
         message: '获取登录应用列表异常',
         description: error || '未知错误',
       });
     })
  ;
}

// 获取标签列表
export function receiveTagList(data) {
  return {
    type: RECEIVE_TAG_LIST,
    payload: {
      fetching: false,
      ...data,
    },
  };
}
export function getTagList() {
  return dispatch =>
     get('/api/user/logintag').then((data) => {
       if (data.success) {
         dispatch(receiveTagList(data));
       }
     }, (error) => {
       notification.open({
         message: '获取登录应用列表异常',
         description: error || '未知错误',
       });
     })
  ;
}
const commonReducer = {
  loginapp: initialState,
  usertag: initialState,
};
export default function logReducer(state = commonReducer, action) {
  switch (action.type) {
    case RECEIVE_APP_LIST:
      return Object.assign({}, state, action.payload);
    case RECEIVE_TAG_LIST:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
