import React, { Component, PropTypes } from 'react';
import { Table, Card, Row, Col } from 'antd';
import './order.scss';

const columns = [
  {
    title: '商品',
    dataIndex: '',
    key: 'x',
    render: row =>
       (
         <Row gutter={16}>
           <Col sm={6}>
             <img src={row.picture} className="order-img" alt="暂无图片" />
           </Col>
           <Col sm={18}>
             <p className="order-name">{row.name ? row.name : '暂无'}</p>
             <p><span>尺寸：{row.size ? row.size : '暂无'}</span><span>颜色： {row.color ? row.color : '暂无'}</span></p>
             <p>七天无理由退换</p>
           </Col>
         </Row>
      )
    ,
  },
  {
    title: '单价',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: '数量',
    dataIndex: 'count',
    key: '',
  },
  {
    title: '实际付款',
    dataIndex: 'payment',
    key: 'payment',
  },
  {
    title: '订单状态',
    dataIndex: 'indent',
    key: 'indent',
  },
  {
    title: '物流状态',
    dataIndex: 'logistics',
    key: 'logistics',
  },
  {
    title: '收货日期',
    dataIndex: 'date',
    key: 'date',
  },
];
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { order } = this.props;
    return (
      <Card className="order">
        <h3>用户商品订单详情</h3>
        <Table
          columns={columns}
          dataSource={order}
          size="middle"
          pagination={false}
          className="order-table"
        />
      </Card>
    );
  }
}
Order.propTypes = {
  order: PropTypes.array,
};
export default Order;
