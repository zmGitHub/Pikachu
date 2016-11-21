import CoreLayout from './CoreLayout';
import Home from './Home';
import loginRoute from './Login';
<<<<<<< HEAD
import logRouter from './log';
import blacklistRouter from './Blacklist';
import sensitiveRouter from './Sensitive';
import userRouter from './UserSearch';
import registerRouter from './Register';
import loginSettingRouter from './LoginSetting';
import passwordRouter from "./Password";
import notFoundRouter from './NotFound';
// 数据分析
import analyzeMembersRouter from './AnalyzeMembers';
import analyzeServersRouter from './AnalyzeServers';
import analyzeRightsRouter from './AnalyzeRights';
=======

>>>>>>> 70c5eec4f8adca442cd3544881fc225bd4f2af66
// 创建动态路由
export const createRoutes = store => ({
  childRoutes: [{
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    breadcrumbName: '主 页',
<<<<<<< HEAD
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
=======
    childRoutes: [],
  }, loginRoute(store)],
>>>>>>> 70c5eec4f8adca442cd3544881fc225bd4f2af66
});

export default createRoutes;
