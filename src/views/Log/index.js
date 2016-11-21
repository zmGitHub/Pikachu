import { injectReducer } from 'store/reducers';

export default store => ({
  path: 'log',
  breadcrumbName: '日志审计',
  getComponent(nextState, cd) {
    require.ensure([], (require) => {
      const component = require('./Log').default;
      const reducer = require('./containers').default;
      injectReducer(store, { key: 'log', reducer });
      cd(null, component);
    }, 'log');
  },
});
