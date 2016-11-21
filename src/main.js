import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import createStore from './store/createStore';

// 存储初始化的 store
const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);


const MOUNT_NODE = document.getElementById('root'); // 获取应用启动节点

// 启动函数
let render = () => {
  // 获取路由配置
  const routes = require('./views/index').default(store);
  ReactDOM.render(
    <Provider store={store}>
      <div style={{ height: '100%' }}>
        <Router history={browserHistory} routes={routes} />
      </div>
    </Provider>,
    MOUNT_NODE
  );
};

// 开发环境配置: 生产下应该去掉
if (__DEV__ && module.hot) {
  const renderApp = render;
  // 调用 readbox 显示开发中的错误
  const renderError = (error) => {
    const RedBox = require('redbox-react').default;
    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
  };

  render = () => {
    try {
      renderApp();
      console.log('render');
    } catch (error) {
      console.log('error');
      renderError(error);
    }
  };

  // 建立热部署
  module.hot.accept('./views/index', () => {
    console.log('hot');
    setImmediate(() => {
      // 先卸载之前的应用
      console.log('rerender');
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    });
  });
}

// 页面渲染
render();
