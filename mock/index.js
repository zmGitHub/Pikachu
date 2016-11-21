import Koa from 'koa';
import server from 'koa-static';
import convert from 'koa-convert';
import Mock from 'mockjs';
import pathToRegexp from 'path-to-regexp';
import APIS from './api';


const app = new Koa();

app.use(async(ctx, next) => {
  const reqAPI = ctx.path;
  const method = ctx.method;
  if (reqAPI.includes('/api/')) {
    let mockConfig = null;
    APIS.forEach((api) => {
      const regexp = api.URL.includes(':') && pathToRegexp(api.URL);
      if (regexp && regexp.test(reqAPI)) {
        mockConfig = api[method];
        return;
      } else if (api.URL === reqAPI) {
        mockConfig = api[method];
        return;
      }
    });
    const responseData = Mock.mock(mockConfig || {
      success: false,
      error: `没有配置${reqAPI}, 请添加`,
      data: null,
    });
    ctx.body = responseData;
    console.log(`接口地址: http://localhost:9999${reqAPI}`);
  }
  await next();
});
app.use(convert(server('.')));

app.listen(9999, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('📢 mockser 启动成功, 端口: 9999');
});
