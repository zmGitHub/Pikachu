import { query, post } from 'store/fetch';
import { notification } from 'antd';

const initialState = {
  fetching: false,
  data: {},
}

export const RECEIVE_PASSWORD_SUCCESS = 'RECEIVE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAIL = 'UPDATE_PASSWORD_FAIL';
export const RECEIVE_INI = "RECEIVE_INI"
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

export function receiveInit(message, description) {
  return {
    type: RECEIVE_INI,
    payload: {
      fetching: true,
    },
  };
}

export function receiveError(message, description) {
  showNotification(error, message, description)
  return {
    type: RECEIVE_ERROR,
    payload: {
      fetching: false,
    },
  };
}

export function getPassword() {
  return (dispatch) => {
    dispatch(receiveInit());
    query('/api/user/password/config').then((data) => {
      dispatch(receivePasswordSuccess(data.result));
    }, (data = {}) => {
      dispatch(receiveError("获取密码", data.error));
    });  
  }
}

export function receivePasswordSuccess(data) {
  return {
    type: RECEIVE_PASSWORD_SUCCESS,
    payload: {
      fetching: false,
      limit: data.passwordLimit,
      strengths: data.passwordStrengthList
    }
  }
}

export function updatePassword(params) {
  return (dispatch) => {
    dispatch(receiveInit());
    post('/api/user/password/config', params).then((data) => {
      dispatch(updatePasswordSuccess())
    }, (data) => {
      dispatch(receiveError(data));
    })
  }
}

export function updatePasswordSuccess() {
  showNotification('success', "密码强度", "更新成功！")
  return {
    type: UPDATE_PASSWORD_SUCCESS,
    payload: {
      fetching: false
    }
  }
}

function showNotification(status, message, description) {
  notification[status]({
    message: message,
    description: description || '未知错误',
  });
}

export default function PasswordReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_PASSWORD_SUCCESS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
