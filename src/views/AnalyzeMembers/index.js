import AnalyzeMembers from './AnalyzeMembers';
import membersRoute from './Members';
import detailRoute from './Detail';

export default store => ({
  path: 'analyzeMembers',
  component: AnalyzeMembers,
  indexRoute: membersRoute(store),
  breadcrumbName: '会员分析',
  childRoutes: [
    detailRoute(store),
  ],
});
