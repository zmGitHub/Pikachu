import { query, post } from 'store/fetch';
import { notification } from 'antd';

const initalState = {
  fetching: false,
  data: [],
  total: 0
};

export const GET_SMS_CONDIG_SUCCESS = "GET_SMS_CONDIG_SUCCESS";
export const GET_EMAIL_CONFIG_SUCCESS = "GET_EMAIL_CONFIG_SUCCESS";
export const RECEIVE_SENSITIVE = "RECEIVE_SENSITIVE";
export const RECEIVE_SEARCH_ERROR = "RECEIVE_SEARCH_ERROR";
export const UPDATE_SMS_CONFIG_SUCCESS = "UPDATE_SMS_CONFIG_SUCCESS";
export const UPDATE_EMIAL_CONFIG_SUCCESS = "UPDATE_EMIAL_CONFIG_SUCCESS"

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

export function getSmsConfig() {
  return (dispatch) => {
    dispatch(receiveInit());
    return query('/api/security/getSMSRegisterConfig').then((data) => {
      dispatch(getSmsConfigSuccess(data.result));
    }, () => {
      dispatch(receiveError());
    })
  }
}

export function getSmsConfigSuccess(data) {
  return {
    type: GET_SMS_CONDIG_SUCCESS,
    payload: {
      fetching: false,
      sms: {
        ...data
      }
    }
  }
}


export function getEmailConfig() {
  return (dispatch) => {
    dispatch(receiveInit);
    return query('/api/security/getEmailRegisterConfig').then((data) => {
      dispatch(getEmailConfigSuccess(data.result));
    }, () => {
      dispatch(receiveError());
    })
  }
}

export function getEmailConfigSuccess(data) {
  return {
    type: GET_EMAIL_CONFIG_SUCCESS,
    payload: {
      fetching: false,
      email: {
        ...data
      }
    }
  }
}

export function updateSmsConfig(params) {
  return (dispatch) => {
    dispatch(receiveInit());
    post('/api/security/setSMSRegister', params).then((data) => {
      showNotification("success", "短信配置更新成功！", "更新成功");
      dispatch(updateSmsSuccess(data));
    }, (data = {}) => {
      showNotification("error", "短信配置更新失败！", data.error);
      dispatch(receiveErrors());
    });
  };
}

export function updateEmailConfig(params) {
  return (dispatch) => {
    dispatch(receiveInit());
    post('/api/security/setEmailRegister', params).then((data) => {
      showNotification("success", "邮箱配置更新成功！", "更新成功");
      dispatch(updateEmailSuccess(data));
    }, () => {
      showNotification("error", "邮箱配置更新失败！", data.error);
      dispatch(receiveErrors());
    });
  };
}

export function updateSmsSuccess(data) {
  return {
    type: UPDATE_SMS_CONFIG_SUCCESS
  }
}

export function updateEmailSuccess(data) {
  return {
    type: UPDATE_EMIAL_CONFIG_SUCCESS
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
    case GET_SMS_CONDIG_SUCCESS:
    case GET_EMAIL_CONFIG_SUCCESS:
      return Object.assign({}, state, action.payload);
      break;
    default:
      return state;
  }
}
