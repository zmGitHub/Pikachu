import { notification } from 'antd';
import { get } from '../fetch';

const initialState = {
  fetching: false,
  data: [],
};
const RECEIVE_APP_LIST = 'RECEIVE_APP_LIST';
export function receiveTags(data) {
  return {
    type: RECEIVE_APP_LIST,
    payload: {
      fetching: false,
      data,
    },
  };
}
// 获取标签列表
export function getAppList() {
  return dispatch =>
     get('api/user/clients').then((data) => {
       if (data.success) {
         dispatch(receiveTags(data.result));
       }
     }, (error) => {
       notification.open({
         message: '获取标签列表异常',
         description: error || '未知错误',
       });
     })
  ;
}

export default function appsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_APP_LIST:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
