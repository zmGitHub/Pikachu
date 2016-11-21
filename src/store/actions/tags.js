import { notification } from 'antd';
import { get } from '../fetch';

const initialState = {
  fetching: false,
  data: [],
};
const RECEIVE_TAG_LIST = 'RECEIVE_TAG_LIST';

// 获取标签列表
export function receiveTags(data) {
  return {
    type: RECEIVE_TAG_LIST,
    payload: {
      fetching: false,
      data,
    },
  };
}
export function getTagList() {
  return dispatch =>
     get('/api/user/logintag').then((data) => {
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

export default function tagsReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TAG_LIST:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
