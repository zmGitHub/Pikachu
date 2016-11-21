import AnalyzeRights from './AnalyzeRights';
import integralRoute from './Integral';
import abnormalUser from './AbnormalUser';
import singleRouter from './Single';
import goodsRouter from './Goods';

export default store => ({
  path: 'analyzeRights',
  component: AnalyzeRights,
  indexRoute: integralRoute(store),
  breadcrumbName: '权益分析',
  childRoutes: [
    abnormalUser(store),
    singleRouter(store),
    goodsRouter(store),
  ],
});
