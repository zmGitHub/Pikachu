import { injectReducer } from 'store/reducers';

export default store => ({
  path: 'blacklist',
  breadcrumbName: '黑/白名单管理',
  getComponent(nextState, cd) {
    require.ensure([], (require) => {
      const component = require('./Blacklist').default;
      const reducer = require('./containers').default;
      injectReducer(store, { key: 'blacklist', reducer });
      cd(null, component);
    }, 'blacklist');
  },
});
