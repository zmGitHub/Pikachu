import React, { Component } from 'react';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import classnames from 'classnames';
import 'antd/dist/antd.css';
import 'styles/index.scss';

class CoreLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
  }
  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  render() {
    const collapse = this.state.collapse;
    const sidebarClass = classnames('ant-layout-aside', { 'ant-layout-aside-collapse ant-layout-aside': collapse });
    return (
      <div className={sidebarClass}>
        <Sidebar
          collapse={collapse}
          onCollapseChange={() => {
            this.onCollapseChange();
          }}
        />
        <div className="ant-layout-main">
          <Header />
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <h1>您好!欢迎来到9999</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoreLayout;
