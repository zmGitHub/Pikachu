import { injectReducer } from 'store/reducers';

export default store => ({
  path: 'sensitive',
  breadcrumbName: '敏感词管理',
  getComponent(nextState, cd) {
    require.ensure([], (require) => {
      const component = require('./Sensitive').default;
      const reducer = require('./containers').default;
      injectReducer(store, { key: 'sensitive', reducer });
      cd(null, component);
    }, 'sensitive');
  },
});
