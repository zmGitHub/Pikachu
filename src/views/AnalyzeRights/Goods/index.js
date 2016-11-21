import { injectReducer } from 'store/reducers';

export default store => ({
  path: '/goods',
  breadcrumbName: '商品兑换分析',
  getComponent(nextState, cd) {
    require.ensure([], (require) => {
      const component = require('./Goods').default;
      const reducer = require('./containers').default;
      injectReducer(store, { key: 'goods', reducer });
      cd(null, component);
    }, 'goods');
  },
});
