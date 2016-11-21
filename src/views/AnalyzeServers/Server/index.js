import { injectReducer } from 'store/reducers';

export default store => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const component = require('./Server').default;
      const reducer = require('./containers').default;

      injectReducer(store, { key: 'analyzeServers', reducer });
      cb(null, component);
    }, 'analyzeServers');
  },
});
