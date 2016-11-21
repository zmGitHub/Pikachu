import CoreLayout from './CoreLayout';
import Home from './Home';
import loginRoute from './Login';
import logRouter from './log';
import blacklistRouter from './Blacklist';
import sensitiveRouter from './Sensitive';
import userRouter from './UserSearch';
import registerRouter from './Register';
import loginSettingRouter from './LoginSetting';
import passwordRouter from './Password';
import notFoundRouter from './NotFound';
// 数据分析
import analyzeMembersRouter from './AnalyzeMembers';
import analyzeServersRouter from './AnalyzeServers';
import analyzeRightsRouter from './AnalyzeRights';
// 创建动态路由
export const createRoutes = store => ({
  childRoutes: [{
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    breadcrumbName: '主 页',
    childRoutes: [
      logRouter(store),
      blacklistRouter(store),
      sensitiveRouter(store),
      userRouter(store),
      analyzeMembersRouter(store),
      registerRouter(store),
      loginSettingRouter(store),
      analyzeServersRouter(store),
      analyzeRightsRouter(store),
      passwordRouter(store),
    ],
  },
    loginRoute(store),
    notFoundRouter(),
  ],
});

export default createRoutes;
