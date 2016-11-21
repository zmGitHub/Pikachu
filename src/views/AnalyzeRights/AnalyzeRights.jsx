import React, { Component, PropTypes } from 'react';
import { Tabs, Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router';
import './analyzeRights.scss';

const TabPane = Tabs.TabPane;

class AnalyzeRights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTitle: '积分概况',
    };
  }
  click(key) {
    const title = {};
    switch (key.key) {
      case 'analyzeRights':
        title.key = '积分概况';
        break;
      case 'goods':
        title.key = '商品兑换分析';
        break;
      default:
        title.key = '积分概况';
        break;
    }
    this.setState({
      menuTitle: title.key,
    });
  }
  render() {
    // 路由
    const menu = (
      <Menu onClick={this.click.bind(this)}>
        <Menu.Item key="analyzeRights">
          <Link to={'/analyzeRights'}>积分概况</Link>
        </Menu.Item>
        <Menu.Item key="goods">
          <Link to={'/goods'}>商品兑换分析</Link>
        </Menu.Item>
        <Menu.Item key="abnormalUser">
          <Link to={'/analyzeRights/abnormalUser'}>异常用户分析</Link>
        </Menu.Item>
      </Menu>
    );
    const drop = (
      <div>
        <span>积分权益分析-</span>
        <Dropdown overlay={menu} trigger={['click']}>
          <Link className="dropdown-font">
            {this.state.menuTitle} <Icon type="down" />
          </Link>
        </Dropdown>
      </div>
    );
    return (
      <div>
        <Tabs type="card" className="tab-color">
          <TabPane tab={drop} key="1">
            {this.props.children || ''}
          </TabPane>
          <TabPane tab="服务权益分析" key="4">
            <p>jkdnjsdnf</p>
            <p>jkdnjsdnf</p>
            <p>jkdnjsdnf</p>
            <p>jkdnjsdnf</p>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
AnalyzeRights.propTypes = {
  children: PropTypes.element.isRequired,
};
export default AnalyzeRights;
