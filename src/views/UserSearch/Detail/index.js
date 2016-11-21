import { injectReducer } from 'store/reducers';

export default store => ({
  path: 'detail/:id',
  breadcrumbName: '用户详情',
  getComponent(nextState, cd) {
    require.ensure([], (require) => {
      const component = require('./Detail').default;
      const reducer = require('./containers').default;
      injectReducer(store, { key: 'detail', reducer });
      cd(null, component);
    }, 'detail');
  },
});
