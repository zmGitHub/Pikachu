import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { Menu, Icon } from 'antd';
import logo from 'static/turbo.png';

const SubMenu = Menu.SubMenu;

const Sidebar = props => (
  <aside className="ant-layout-sider">
    <div className="ant-layout-sider-backdrop" />
    <div className="ant-layout-logo">
      <IndexLink to="/">
        <img src={logo} alt="寻水的鱼-turbo" />
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
        <Menu.Item key="search">
          <Link to="/search">
            <span className="nav-text">用户查询</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="log">
          <Link to="/log">
            <span className="nav-text">日志审计</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="blacklist">
          <Link to="/blacklist">
            <span className="nav-text">黑/白名单管理</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="sensitive">
          <Link to="/sensitive">
            <span className="nav-text">敏感词管理</span>
          </Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="Analysis"
        title={
          <span className="nav-text"><Icon type="line-chart" /><span>数据分析</span></span>
        }
      >
        <Menu.Item key="analyzeMembers">
          <Link to="/analyzeMembers">
            <span className="nav-text">会员分析</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="analyzeServers">
          <Link to="/analyzeServers">
            <span className="nav-text">服务分析</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="analyzeRights">
          <Link to="/analyzeRights">
            <span className="nav-text">权益分析</span>
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
          <Link to="/loginsetting">
            <span className="nav-text">用户登录配置</span>
          </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
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
