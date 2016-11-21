import { post } from 'store/fetch';
import { notification } from 'antd';

const initialState = {
  fetching: false,
  data: [],
  total: 0,
};
export const RECEIVE_BLACK = 'RECEIVE_BLACK';
export const RECEIVE_BLACK_ERROR = 'RECEIVE_BLACK_ERROR';
export const RECEIVE_GET_BLACK = 'RECEIVE_GET_BLACK';
export const RECEIVE_BLACK_LIST = 'RECEIVE_BLACK_LIST';

export function receiveInit() {
  return {
    type: RECEIVE_BLACK,
    payload: {
      fetching: true,
    },
  };
}
export function receiveError() {
  return {
    type: RECEIVE_BLACK_ERROR,
    payload: {
      fetching: false,
    },
  };
}
// 获取列表
export function receiveGetBlack(data) {
  return {
    type: RECEIVE_GET_BLACK,
    payload: {
      fetching: false,
      ...data,
    },
  };
}
// 获取黑名单列表
export function getBlack(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    post('/api/user/blacklist', param).then((data) => {
      dispatch(receiveGetBlack(data.result));
    }, () => {
      dispatch(receiveError());
    });
  };
}

// 加入黑名单
export function addBlack(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    return post('/api/user/add_blacklist', param).then(data =>
       Promise.resolve(data)
    , () => {
      dispatch(receiveError());
    });
  };
}
// 删除黑名单
export function delBlack(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    return post('/api/user/del_blacklist', param).then((data) => {
      if (data.success) {
        notification.success({
          message: '温馨提示',
          description: '移除成功',
        });
        dispatch(receiveError());
      } else {
        notification.error({
          message: '移除失败',
          description: data.error || '未知错误',
        });
        dispatch(receiveError());
      }
    }, () => {
      dispatch(receiveError());
    });
  };
}
export default function logReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_BLACK:
      return Object.assign({}, state, action.payload);
    case RECEIVE_BLACK_ERROR:
      return Object.assign({}, state, action.payload);
    case RECEIVE_GET_BLACK:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
