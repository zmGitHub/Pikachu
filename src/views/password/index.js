import { injectReducer } from 'store/reducers';

export default store => ({
  path: 'password',
  breadcrumbName: '密码强度配置',
  getComponent(nextState, cd) {
    require.ensure([], (require) => {
      const component = require('./Password').default;
      const reducer = require('./containers').default;
      injectReducer(store, { key: 'password', reducer });
      cd(null, component);
    }, 'password');
  },
});
