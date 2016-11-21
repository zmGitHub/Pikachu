import { query } from 'store/fetch';
import { notification } from 'antd';

const initalState = {
  fetching: false,
  result: {
    basicInfo: {
      headshot: '',     // 头像
      username: '',     // 用户名
      realName: '',     // 真实姓名
      nickname: '',      // 昵称
      gender: '',           // 性别
      birthday: '',       // 生日
      grade: '',          // 会员等级
      pointScore: '',   // 积分
      freezePointScore: '',  // 冻结积分
      privilege: '',    // 特权
      phone: '',
      email: '',
    },
    userPortrayal: {        // 用户画像
      network: '',  // 网络活跃度
      shop: '',    // 购物理性指数
      visit: '',   // 访问终端
      price: '',   // 价格敏感度
      product: '',  // 产品偏好
      sale: '',     // 促销敏感度
      color: '',    // 颜色喜好
      platform: '',  // 平台服务满意度
      radarMAp: [],   // 顺序： 信用情况，影响力，满意度，活跃度，消费能力
    },
    myFacility: [],
    integralInfo: [],   // 用户积分信息
    indentDetail: [],      // 订单详情
    actionInfo: [],
    commentInfo: [],
    customInfo: {               // 定制信息
      basicInfo: {
        range: '',          // 排名
        score: '',         // 评分
        crowdfunding: '',   // 众筹
        production: '',     // 作品
        fans: '',           //粉丝
      },
      list: [],
    },
    facilityInfo: {        // 设备服务信息 使用日志
      services: [],
      useLog: [],
    },
  },
  useLog: {   // 设备使用详情
    total: 0,
    data: [],
  },
  server: [],   // 设备服务详情
  customs: [],  // 定制信息
  intagrals: {
    fetching: false,   // 测试loading效果
  },
  freezes: {
    pointScore: '',   // 冻结积分
    freezePointScore: '',
  },
};


export const RECEIVE_DETAIL_INIT = 'RECEIVE_DETAIL_INIT';       // 初始化总数据
export const RECEIVE_DETAIL_ERROR = 'RECEIVE_DETAIL_ERROR';     // 错误处理
export const RECEIVE_FREEZE_DETAIL = 'RECEIVE_FREEZE_DETAIL';   // 冻结积分
export const RECEIVE_DETAIL_DATA = 'RECEIVE_DETAIL_DATA';       // 详情总数据
export const RECEIVE_CLIENT_DETAIL = 'RECEIVE_CLIENT_DETAIL';   // 设备详情
export const RECEIVE_INTEGRAL_DETAIL = 'RECEIVE_INTEGRAL_DETAIL';   // 积分信息
export const RECEIVE_ACTION_DETAIL = 'RECEIVE_ACTION_DETAIL';   // 行为信息
export const RECEIVE_COMMENT_DETAIL = 'RECEIVE_COMMENT_DETAIL'; // 评论信息
export const RECEIVE_CUSTOM_DETAIL = 'RECEIVE_CUSTOM_DETAIL';   // 定制信息

// 初始化
export function receiveInit() {
  return {
    type: RECEIVE_DETAIL_INIT,
    payload: {
      fetching: true,
    },
  };
}

// 储存数据
export function receiveGetDetail(data) {
  const intagrals = data.result.integralInfo;
  const actions = data.result.actionInfo;
  const comments = data.result.commentInfo;
  const customs = data.result.customInfo.list;
  const freezes = {
    pointScore: data.result.basicInfo.pointScore,
    freezePointScore: data.result.basicInfo.freezePointScore,
  };
  return {
    type: RECEIVE_DETAIL_DATA,
    payload: {
      fetching: false,
      freezes,
      intagrals: {
        intagrals,
      },
      actions,
      comments,
      customs,
      ...data,
    },
  };
}

// 错误处理
export function receiveError() {
  return {
    type: RECEIVE_DETAIL_ERROR,
    payload: {
      fetching: false,
    },
  };
}
// 储存设备详情数据
export function receiveClient(clients) {
  return {
    type: RECEIVE_CLIENT_DETAIL,
    payload: {
      fetching: false,
      ...clients,
    },
  };
}
// 冻结积分信息
export function receiveFreeze(freezes) {
  return {
    type: RECEIVE_FREEZE_DETAIL,
    payload: {
      fetching: false,
      freezes,
    },
  };
}
// 积分信息
export function receiveIntagral(intagrals) {
  return {
    type: RECEIVE_INTEGRAL_DETAIL,
    payload: {
      fetching: false,
      intagrals: {
        fetching: false,
        intagrals: intagrals.result,
      },
    },
  };
}
// 行为信息
export function receiveAction(actions) {
  return {
    type: RECEIVE_ACTION_DETAIL,
    payload: {
      fetching: false,
      actions: actions.result,
    },
  };
}
// 评论信息
export function receiveComment(comments) {
  return {
    type: RECEIVE_COMMENT_DETAIL,
    payload: {
      fetching: false,
      comments: comments.result,
    },
  };
}
// 定制信息
export function receiveCustom(customs) {
  return {
    type: RECEIVE_CUSTOM_DETAIL,
    payload: {
      fetching: false,
      customs: customs.result,
    },
  };
}
// 获取用户详情数据
export function getUserDetail(param) {
  return (dispatch) => {
    dispatch(receiveInit);
    query(`/api/user/detail/${param}`).then((data) => {
      if (data.success) {
        dispatch(receiveGetDetail(data));
      } else {
        notification.error({
          message: '获取数据失败',
          description: data.error || '未知错误',
        });
        dispatch(receiveError);
      }
    }, () => {
      dispatch(receiveError);
    });
  };
}
// 积分冻结
export function intagralFreeze(param) {
  return (dispatch) => {
    dispatch(receiveInit);
    query(`/api/user/integral_freeze/${param}`).then((data) => {
      if (data.success) {
        notification.success({
          message: '温馨提示',
          description: '冻结成功！',
        });
        dispatch(receiveFreeze(data.result));
      } else {
        notification.error({
          message: '冻结失败',
          description: data.error || '未知错误',
        });
        dispatch(receiveError);
      }
    }, () => {
      dispatch(receiveError);
    });
  };
}
// 获取设备详情
export function clientDetail(param) {
  return (dispatch) => {
    dispatch(receiveInit);
    query('/api/user/detail_client', param).then((data) => {
      if (data.success) {
        dispatch(receiveClient(data));
      } else {
        notification.error({
          message: '获取数据失败',
          description: data.error || '未知错误',
        });
        dispatch(receiveError);
      }
    }, () => {
      dispatch(receiveError);
    });
  };
}
// 获取更多积分信息
export function integralDetail(param) {
  return (dispatch) => {
    dispatch(receiveInit);
    query('/api/user/detail_integral', param).then((data) => {
      if (data.success) {
        if (data.result.length === 0) {
          notification.info({
            message: '温馨提示',
            description: '暂无更多数据',
          });
        } else {
          dispatch(receiveIntagral(data));
        }
      } else {
        notification.error({
          message: '获取数据失败',
          description: data.error || '未知错误',
        });
        dispatch(receiveError);
      }
    }, () => {
      dispatch(receiveError);
    });
  };
}

// 获取更多行为信息
export function actionDetail(param) {
  return (dispatch) => {
    dispatch(receiveInit);
    query('/api/user/detail_action', param).then((data) => {
      if (data.success) {
        if (data.result.length === 0) {
          notification.info({
            message: '温馨提示',
            description: '暂无更多数据',
          });
        } else {
          dispatch(receiveAction(data));
        }
      } else {
        notification.error({
          message: '获取数据失败',
          description: data.error || '未知错误',
        });
        dispatch(receiveError);
      }
    }, () => {
      dispatch(receiveError);
    });
  };
}
// 获取更多评论信息
export function commentDetail(param) {
  return (dispatch) => {
    dispatch(receiveInit);
    query('/api/user/detail_comment', param).then((data) => {
      if (data.success) {
        if (data.result.length === 0) {
          notification.info({
            message: '温馨提示',
            description: '暂无更多数据',
          });
        } else {
          dispatch(receiveComment(data));
        }
      } else {
        notification.error({
          message: '获取数据失败',
          description: data.error || '未知错误',
        });
        dispatch(receiveError);
      }
    }, () => {
      dispatch(receiveError);
    });
  };
}
// 获取更多评论信息
export function customDetail(param) {
  return (dispatch) => {
    dispatch(receiveInit);
    query('/api/user/detail_custom', param).then((data) => {
      if (data.success) {
        if (data.result.length === 0) {
          notification.info({
            message: '温馨提示',
            description: '暂无更多数据',
          });
        } else {
          dispatch(receiveCustom(data));
        }
      } else {
        notification.error({
          message: '获取数据失败',
          description: data.error || '未知错误',
        });
        dispatch(receiveError);
      }
    }, () => {
      dispatch(receiveError);
    });
  };
}
// reducer
export default function logReducer(state = initalState, action) {
  switch (action.type) {
    case RECEIVE_DETAIL_DATA:
      return Object.assign({}, state, action.payload);
    case RECEIVE_DETAIL_ERROR:
      return Object.assign({}, state, action.payload);
    case RECEIVE_DETAIL_INIT:
      return Object.assign({}, state, action.payload);
    case RECEIVE_CLIENT_DETAIL:
      return Object.assign({}, state, action.payload.result);
    case RECEIVE_INTEGRAL_DETAIL:
      return Object.assign({}, state, action.payload);
    case RECEIVE_ACTION_DETAIL:
      return Object.assign({}, state, action.payload);
    case RECEIVE_COMMENT_DETAIL:
      return Object.assign({}, state, action.payload);
    case RECEIVE_CUSTOM_DETAIL:
      return Object.assign({}, state, action.payload);
    case RECEIVE_FREEZE_DETAIL:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
