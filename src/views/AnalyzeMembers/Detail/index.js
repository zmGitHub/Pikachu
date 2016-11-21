import { injectReducer } from 'store/reducers';

export default store => ({
  path: 'detial/:id',
  breadcrumbName: '单应用分析',
  // 当路由匹配时,异步获取组件
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const component = require('./Detail').default;
      const reducer = require('./containers').default;

      // 动态注入 goods reducer
      injectReducer(store, { key: 'AMBDetail', reducer });
      cb(null, component);
    }, 'AMBDetail'); // webpack 代码分割后的文件名称
  },
});
