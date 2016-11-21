import { injectReducer } from 'store/reducers';

export default store => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const component = require('./Integral').default;
      const reducer = require('./containers').default;
      injectReducer(store, { key: 'analyzeRights', reducer });
      cb(null, component);
    }, 'analyzeRights');
  },
});
