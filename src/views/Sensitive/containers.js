import { query, post } from 'store/fetch';
import { notification } from 'antd';

const initialState = {
  fetching: false,
  data: [],
  total: 0,
};
export const RECEIVE_SENSITIVE = 'RECEIVE_SENSITIVE';
export const RECEIVE_SENSITIVE_ERROR = 'RECEIVE_SENSITIVE_ERROR';
export const RECEIVE_GET_SENSITIVE = 'RECEIVE_GET_SENSITIVE';
export const RECEIVE_APP_LIST = 'RECEIVE_APP_LIST';

export function receiveInit() {
  return {
    type: RECEIVE_SENSITIVE,
    payload: {
      fetching: true,
    },
  };
}
export function receiveError() {
  return {
    type: RECEIVE_SENSITIVE_ERROR,
    payload: {
      fetching: false,
    },
  };
}
// 获取列表
export function receiveGetLog(data) {
  return {
    type: RECEIVE_GET_SENSITIVE,
    payload: {
      fetching: false,
      ...data,
    },
  };
}
export function getSensitive(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    query('/api/user/sensitive', param).then((data) => {
      dispatch(receiveGetLog(data.result));
    }, () => {
      dispatch(receiveError());
    });
  };
}
// 添加敏感词
export function add(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    return post('/api/user/sensitive/add', param);
  };
}

// 删除敏感词
export function del(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    post(`/api/user/sensitive/delete/${param}`).then((data) => {
      if (data.success) {
        notification.success({
          message: '温馨提示',
          description: '删除成功',
        });
        dispatch(getSensitive());
      } else {
        notification.error({
          message: '删除失败',
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
    case RECEIVE_SENSITIVE:
      return Object.assign({}, state, action.payload);
    case RECEIVE_SENSITIVE_ERROR:
      return Object.assign({}, state, action.payload);
    case RECEIVE_GET_SENSITIVE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
