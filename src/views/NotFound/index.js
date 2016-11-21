export default () => ({
  path: '*',
  // 当路由匹配时,异步获取组件
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const component = require('./NotFound').default;
      cb(null, component);
    }, 'notFound'); // webpack 代码分割后的文件名称
  },
});
