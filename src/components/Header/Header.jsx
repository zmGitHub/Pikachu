import React from 'react';
import { Breadcrumb, Icon, Row, Col } from 'antd';

const Header = props => (
  <div className="ant-layout-header">
    <Row type="flex" justify="center" align="middle">
      <Col span={23}>
        <div className="ant-layout-breadcrumb">
          <Breadcrumb {...props} />
        </div>
      </Col>
      <Col span={1}>
        <a className="ant-layout-header-logout" onClick={props.handleClick} href="">
          <Icon type="logout" />
        </a>
      </Col>
    </Row>

  </div>
);
Header.propTypes = {
  handleClick: React.PropTypes.func,
};
export default Header;
