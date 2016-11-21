import { injectReducer } from 'store/reducers';

export default store => ({
  path: 'register',
  breadcrumbName: '注册信息配置',
  getComponent(nextState, cd) {
    require.ensure([], (require) => {
      const component = require('./Register').default;
      const reducer = require('./containers').default;
      injectReducer(store, { key: 'register', reducer });
      cd(null, component);
    }, 'register');
  },
});
