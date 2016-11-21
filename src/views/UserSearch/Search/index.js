import { injectReducer } from 'store/reducers';

export default store => ({
  getComponent(nextState, cd) {
    require.ensure([], (require) => {
      const component = require('./Search').default;
      const reducer = require('./containers').default;
      injectReducer(store, { key: 'search', reducer });
      cd(null, component);
    }, 'search');
  },
});
