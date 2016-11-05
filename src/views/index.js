import CoreLayout from './CoreLayout';
import Home from './Home';
import loginRoute from './Login';

// 创建动态路由
export const createRoutes = store => ({
  childRoutes: [{
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    breadcrumbName: '主 页',
    childRoutes: [],
  }, loginRoute(store)],
});

export default createRoutes;
