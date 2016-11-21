import { injectReducer } from 'store/reducers';

export default store => ({
  // 当路由匹配时,异步获取组件
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const component = require('./Members').default;
      const reducer = require('./containers').default;

      // 动态注入 goods reducer
      injectReducer(store, { key: 'analyzeMembers', reducer });
      cb(null, component);
    }, 'analyzeMembers'); // webpack 代码分割后的文件名称
  },
});
