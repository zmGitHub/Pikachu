import React, { PropTypes } from 'react';
import { Card, Row, Col } from 'antd';
import Echarts from 'components/Echarts';
import './portrayal.scss';

const option = {
  tooltip: {},
  radar: {
    indicator: [
           { name: '使用情况', max: 6500 },
           { name: '消费能力', max: 52000 },
           { name: '活跃度', max: 38000 },
           { name: '满意度', max: 30000 },
           { name: '影响力', max: 16000 },
    ],
    radius: 70,
    shape: 'circle',
    splitNumber: 5,
    name: {
      textStyle: {
        color: '#999',
      },
    },
    splitLine: {
      lineStyle: {
        color: [
          'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
          'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
          'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)',
        ].reverse(),
      },
    },
    splitArea: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(238, 197, 102, 0.5)',
      },
    },
  },
  series: [{
    name: '能力分析',
    type: 'radar',
    symbol: 'none',
    data: [
      {
        value: [4300, 10000, 28000, 28000, 13000],
      },
    ],
    lineStyle: {
      normal: {
        width: 1,
        opacity: 0.5,
      },
    },
    itemStyle: {
      normal: {
        color: '#F9713C',
      },
    },
    areaStyle: {
      normal: {
        opacity: 0.1,
      },
    },
  }],
};
export const Portrayal = props => (
  <Card className="portrayal">
    <h3>用户画像</h3>
    <Row gutter={16} className="row-portrayal">
      <Col sm={12} className="network">
        <Col sm={12} className="network-text">
          <span>网络活跃度：</span>
          <span className="network-btn-blue">配角</span>
        </Col>
        <Col sm={12} className="network-text">
          <span>理性购物指数：</span>
          <span className="network-btn-blue network-btn-red">剁手</span>
        </Col>
        <Col sm={12} className="network-text">
          <span>访问终端：</span>
          <span className="network-btn-blue">手机达人</span>
        </Col>
        <Col sm={12} className="network-text">
          <span>价格敏感度：</span>
          <span className="network-btn-blue">一般</span>
        </Col>
        <Col sm={12} className="network-text">
          <span>产品偏好：</span>
          <span className="network-btn-blue">小家电</span>
        </Col>
        <Col sm={12} className="network-text">
          <span>促销敏感度：</span>
          <span className="network-btn-blue network-btn-red">极高</span>
        </Col>
        <Col sm={12} className="network-text">
          <span>颜色偏好：</span><span className="network-btn-white" />
          <span className="network-btn">&nbsp;&nbsp;白色</span>
        </Col>
        <Col sm={12} className="network-text">
          <span>平台满意服务度：</span>
          <span className="network-btn-blue">非常满意</span>
        </Col>
      </Col>
      <Col sm={12}>
        <Echarts
          type="radar"
          options={option}
          height="204px"
        />
      </Col>
    </Row>
  </Card>
);
export default Portrayal;
