import { query, post } from 'store/fetch';
import { notification } from 'antd';

export const GET_LOGINSETTING_SUCCESS = "GET_LOGINSETTING_SUCCESS";
export const UPDATE_SETTING_SUCCESS = "UPDATE_SETTING_SUCCESS";
export const RECEIVE_SENSITIVE = "RECEIVE_SENSITIVE";
export const RECEIVE_SEARCH_ERROR = "RECEIVE_SEARCH_ERROR";

const initalState = {
  fetching: false,
  data: [],
  total: 0
};

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
    type: RECEIVE_SEARCH_ERROR,
    payload: {
      fetching: false,
    },
  };
}

export function getLoginSetting() {
  return (dispatch) => {
    dispatch(receiveInit())
    return query('/api/security/getAccountSecurity').then((data) => {
      dispatch(getLoginSettingSuccess(data.result))
    }, () => {
      dispatch(receiveError());
    })
  }
}

export function getLoginSettingSuccess(data) {
  return {
    type: GET_LOGINSETTING_SUCCESS,
    payload: {
      fetching: false,
      setting: {
        ...data
      }
    }
  }
}

export function updateSetting(params) {
  return (dispatch) => {
    dispatch(receiveInit());
    return post('/api/security/setAccountSecurity', params).then((data) => {
      showNotification("success", "配置更新成功！", "更新成功");
      dispatch(updateSettingSuccess(data));
    }, () => {
      showNotification("error", "配置更新失败！", data.error);
      dispatch(receiveErrors());
    });
  };
}

export function updateSettingSuccess() {
  return {
    type: UPDATE_SETTING_SUCCESS
  }
}

function showNotification(status, message, description) {
  notification[status]({
    message: message,
    description: description || '未知错误',
  });
}


export default function RegisterReducer(state = initalState, action) {
  switch (action.type) {
    case GET_LOGINSETTING_SUCCESS:
      return Object.assign({}, state, action.payload);
      break;
    default:
      return state;
  }
}