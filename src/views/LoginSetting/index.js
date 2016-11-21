import { injectReducer } from 'store/reducers';

export default store => ({
  path: 'loginsetting',
  breadcrumbName: '用户登录配置',
  getComponent(nextState, cd) {
    require.ensure([], (require) => {
      const component = require('./LoginSetting').default;
      const reducer = require('./containers').default;
      injectReducer(store, { key: 'loginsetting', reducer });
      cd(null, component);
    }, 'loginsetting');
  },
});
