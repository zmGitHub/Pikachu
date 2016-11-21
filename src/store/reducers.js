import { combineReducers } from 'redux';
// 路由
import locationReducer from './actions/location';
// 标签列表
import tagsReducer from './actions/tags';
import appsReducer from './actions/apps';
import homeReducer from './actions/home';

export const makeRooterReducer = asyncReducers =>
  combineReducers({
    home: homeReducer,
    location: locationReducer,
    tags: tagsReducer,
    apps: appsReducer,
    ...asyncReducers,
  });

// 用于实现异步注入 reducer (代码分割)
export const injectReducer = (store, {
  key,
  reducer,
}) => {
  // 将异步注入的 reducer 存在 asyncReducers 对象上
  store.asyncReducers[key] = reducer;
  // 更新 store
  store.replaceReducer(makeRooterReducer(store.asyncReducers));
};

export default makeRooterReducer;
