import { injectReducer } from 'store/reducers';

export default store => ({
  // 当路由匹配时,异步获取组件
  path: 'abnormalUser',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const component = require('./AbnormalUser').default;
      const reducer = require('./containers').default;
      // 动态注入 goods reducer
      injectReducer(store, { key: 'abnormalUser', reducer });
      cb(null, component);
    }, 'abnormalUser');
  },
});
