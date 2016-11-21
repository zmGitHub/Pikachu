# 寻水的鱼 后台管理系统

## 使用方法

```
**1. 安装依赖
npm install
**2. 开发模式
npm run dev
**3. 生产模式
npm run prod
```
```
## 项目目录结构
bin  开发和生产环境配置
---- index.js koa 启动主文件
---- config.js 开发和生产的参数配置
---- build.js 生产构建文件
---- webpack.config.js webpack构建文件
src  项目主文件
---- components 组件目录
---- static 静态资源目录
---- store 项目核心文件
-------actions 这里是公共的 state  比如我们的标签列表
```
