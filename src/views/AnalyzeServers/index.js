import AnalyzeServers from './AnalyzeServers';
import serverRoute from './Server';
import detailRoute from './Detail';

export default store => ({
  path: 'analyzeServers',
  component: AnalyzeServers,
  indexRoute: serverRoute(store),
  breadcrumbName: '服务分析',
  childRoutes: [
    detailRoute(store),
  ],
});
