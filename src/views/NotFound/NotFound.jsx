import React from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import notFoundImg from 'static/404.jpg';
import './NotFound.scss';

const NotFound = () => (
  <div className="notFound">
    <section className="notFound-content">
      <p><img src={notFoundImg} alt="404 页面丢失啦" /></p>
      <p className="notFound-title ">对不起!您访问的页面找不到了...</p>
      <IndexLink to="/">返回首页</IndexLink>
    </section>
  </div>
);
export default NotFound;
