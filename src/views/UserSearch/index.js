import UserSearch from './UserSearch';
import searchRoute from './Search';
import detailRoute from './Detail';

export default store => ({
  path: 'search',
  component: UserSearch,
  indexRoute: searchRoute(store),
  breadcrumbName: '用户查询',
  childRoutes: [
    detailRoute(store),
  ],
});
