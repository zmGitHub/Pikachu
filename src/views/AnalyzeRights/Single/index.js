import { injectReducer } from 'store/reducers';

export default store => ({
  path: 'single/:id',
  breadcrumbName: '单应用分析',
  getComponent(nextState, cd) {
    require.ensure([], (require) => {
      const component = require('./Single').default;
      const reducer = require('./containers').default;
      injectReducer(store, { key: 'single', reducer });
      cd(null, component);
    }, 'single');
  },
});
