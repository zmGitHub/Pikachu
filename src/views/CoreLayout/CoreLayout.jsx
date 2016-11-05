import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
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
    this.logout = this.logout.bind(this);
  }
  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  logout(e) {
    e.preventDefault();
    browserHistory.push('/login');
  }
  render() {
    const collapse = this.state.collapse;
    const { children, location, ...rest } = this.props;
    const sidebarClass = classnames('ant-layout-aside', { 'ant-layout-aside-collapse ant-layout-aside': collapse });
    return (
      <div className={sidebarClass}>
        <Sidebar
          selectedKeys={location.pathname.split('/')[1]}
          collapse={collapse}
          onCollapseChange={() => {
            this.onCollapseChange();
          }}
        />
        <div className="ant-layout-main">
          <Header handleClick={this.logout} {...rest} />
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {children || '加载中...'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateTopProps = state => ({
  location: state.location,
});

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
};

export default connect(mapStateTopProps, null)(CoreLayout);
