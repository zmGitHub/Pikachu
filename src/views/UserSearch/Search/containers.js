import { post, query } from 'store/fetch';
import { notification, message } from 'antd';

const initialState = {
  fetching: false,
  data: [],
  total: 0,
};
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH';
export const RECEIVE_SEARCH_ERROR = 'RECEIVE_SEARCH_ERROR';
export const RECEIVE_GET_SEARCH = 'RECEIVE_GET_SEARCH';

export function receiveInit() {
  return {
    type: RECEIVE_SEARCH,
    payload: {
      fetching: true,
    },
  };
}
export function receiveError() {
  return {
    type: RECEIVE_SEARCH_ERROR,
    payload: {
      fetching: false,
    },
  };
}
// 获取列表
export function receiveGetLog(data) {
  return {
    type: RECEIVE_GET_SEARCH,
    payload: {
      fetching: false,
      ...data,
    },
  };
}
export function getSearch(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    post('/api/users', param).then((data) => {
      dispatch(receiveGetLog(data.result));
    }, () => {
      dispatch(receiveError());
    });
  };
}
// 冻结
export function freeze(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    return post(`api/user/freeze/${param}`).then((data) => {
      if (data.success) {
        notification.success({
          message: '温馨提示',
          description: '冻结成功',
        });
        dispatch(getSearch({}));
      } else {
        notification.error({
          message: '冻结失败',
          description: data.error || '未知错误',
        });
        dispatch(receiveError());
      }
    }, () => {
      dispatch(receiveError());
    });
  };
}

// 解冻
export function unFreeze(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    return post(`api/user/unFreeze/${param}`).then((data) => {
      if (data.success) {
        notification.success({
          message: '温馨提示',
          description: '解冻成功',
        });
        dispatch(getSearch({}));
      } else {
        notification.error({
          message: '解冻失败',
          description: data.error || '未知错误',
        });
        dispatch(receiveError());
      }
    }, () => {
      dispatch(receiveError());
    });
  };
}
// 排序
export function order(param) {
  return (dispatch) => {
    dispatch(receiveInit());
    return post('api/user/user_orderBy', param).then((data) => {
      if (data.success) {
        message.success('排序成功');
      } else {
        message.error('排序失败');
      }
    }, () => {
      dispatch(receiveError());
    });
  };
}
export default function logReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SEARCH:
      return Object.assign({}, state, action.payload);
    case RECEIVE_SEARCH_ERROR:
      return Object.assign({}, state, action.payload);
    case RECEIVE_GET_SEARCH:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
