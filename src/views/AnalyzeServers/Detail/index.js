import { injectReducer } from 'store/reducers';

export default store => ({
  path: 'detail',
  breadcrumbName: '服务详情',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const component = require('./Detail').default;
      const reducer = require('./containers').default;

      injectReducer(store, { key: 'analyzeDetail', reducer });
      cb(null, component);
    }, 'analyzeDetail');
  },
});
