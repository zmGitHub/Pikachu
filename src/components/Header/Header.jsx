import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import avatar from './avatar.png';

const Header = props => (
  <div className="ant-layout-header">
    <div className="ant-layout-breadcrumb">
      <Breadcrumb {...props} />
    </div>
    <ul className="ant-layout-navbar">
      <li>
        <img src={avatar} alt="海尔商业价值分析平台-BVS" />
        <span>寻水的鱼</span>
      </li>
      <li>
        <a className="ant-layout-logout" onClick={props.handleClick} href="">
          <Icon type="logout" />
        </a>
      </li>
    </ul>
  </div>
);
Header.propTypes = {
  handleClick: React.PropTypes.func,
};
export default Header;
