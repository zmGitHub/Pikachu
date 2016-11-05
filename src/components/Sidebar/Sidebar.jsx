import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { Menu, Icon } from 'antd';
import logo from 'static/logo-light.png';
import avatar from './avatar.png';

const SubMenu = Menu.SubMenu;

const Sidebar = props => (
  <aside className="ant-layout-sider">
    <div className="ant-layout-sider-backdrop" />
    <div className="ant-layout-logo">
      <IndexLink to="/">
        <img src={logo} alt="海尔商业价值分析平台-BVS" />
      </IndexLink>
      <Icon
        type={props.collapse ? 'menu-unfold' : 'menu-fold'}
        title="关 闭" onClick={props.onCollapseChange}
      />
    </div>
    <Menu
      mode={props.collapse ? 'vertical' : 'inline'}
      theme="dark"
      defaultSelectedKeys={['home']}
      selectedKeys={[props.selectedKeys]}
    >
      <Menu.Item key="home">
        <IndexLink to="/">
          <Icon type="home" /><span className="nav-text">首 页</span>
        </IndexLink>
      </Menu.Item>
      <SubMenu
        key="user"
        title={
          <span className="nav-text"><Icon type="user" /><span>用户管理</span></span>
        }
      >
        <Menu.Item key="list">
          <Link to="/list">
            <span className="nav-text">黑/白名单管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="privilege">
          <Link to="/privilege">
            <span className="nav-text">特权赠送</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="sensitive">
          <Link to="/sensitive">
            <span className="nav-text">敏感词管理</span>
          </Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="Security"
        title={
          <span className="nav-text"><Icon type="setting" /><span>安全设置</span></span>
        }
      >
        <Menu.Item key="password">
          <Link to="/password">
            <span className="nav-text">密码强度配置</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to="/register">
            <span className="nav-text">注册短信验证码配置</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="email">
          <Link to="/email">
            <span className="nav-text">注册邮件配置</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="login">
          <Link to="/login">
            <span className="nav-text">用户登录配置</span>
          </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
    <div className="ant-layout-avatar">
      <img src={avatar} alt="海尔商业价值分析平台-BVS" />
      <span>炫酷吊炸天</span>
      <Icon type="setting" />
    </div>
  </aside>
);

Sidebar.propTypes = {
  onCollapseChange: PropTypes.func,
  collapse: PropTypes.bool,
  selectedKeys: PropTypes.string,
};

Sidebar.defaultProps = {
  collapse: false,
};

export default Sidebar;
