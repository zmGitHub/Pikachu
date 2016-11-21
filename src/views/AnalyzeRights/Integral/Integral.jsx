import React, { Component, PropTypes } from 'react';
import { Row, Col, DatePicker, Table } from 'antd';
import { Link } from 'react-router';
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
import { connect } from 'react-redux';
import { getIntegral, getAll, getClient } from './containers';
import './integral.scss';

const RangePicker = DatePicker.RangePicker;
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
  },
  {
    title: '应用名称',
    dataIndex: 'appName',
  },
  {
    title: '积分发放数',
    dataIndex: 'out',
    sorter: true,
  },
  {
    title: '积分使用数',
    dataIndex: 'use',
    sorter: true,
  },
  {
    title: '兑换商品数',
    dataIndex: 'shop',
    sorter: true,
  },
  {
    title: '兑换人数',
    dataIndex: 'peoples',
    sorter: true,
  },
  {
    title: '操作',
    dataIndex: '',
    render: row =>
       (<Link to={{ pathname: `/analyzeRights/single/${row.id}`, query: { appName: row.appName } }}>单应用分析</Link>)
    ,
  },
];

class Server extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {},
      dateClient: {},
      dateIntagral: {},
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }
  componentDidMount() {
    const { queryAll } = this.props;
    queryAll();
  }
  handleIntegralChange(dates, dateString) {
    const { queryIntegral } = this.props;
    const dateIntagral = {
      startDate: dateString[0],
      endDate: dateString[1],
    };
    queryIntegral(dateIntagral);
  }
  handleClientChange(dates, dateString) {
    const { queryClient } = this.props;
    this.setState({
      dateClient: {
        startDate: dateString[0],
        endDate: dateString[1],
      },
    });
    const res = {
      startDate: dateString[0],
      endDate: dateString[1],
      ...this.state.pagination,
    };
    queryClient(res);
  }
   // 分页、排序
  handleTableChange(pagination, filters, sorter) {
    const { queryClient } = this.props;
    const page = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    };
    const sort = {
      field: sorter.field,
      order: sorter.order,
    };
    this.setState({
      pagination: page,
      order: sort,
    });
    const res = {
      ...sort,
      ...page,
    };
    queryClient(res);
  }
  render() {
    const { integrals } = this.props;
    const general = integrals.integrals;
    const out = general.out;  // 发放
    const useAmounts = general.useAmounts;  // 使用数
    const exchange = general.exchange;  // 兑换
    const users = general.users;  // 兑换总人数
    const pagination = {
      total: integrals.total,
      showSizeChanger: true,
    };
    return (
      <section className="analyze-integral">
        <Row type="flex" align="middle" justify="center" >
          <Col span={24} className="margin-bottom-12">
            <h2 className="title-start-tag-orange">积分概况</h2>
          </Col>
          <Col span={12}>
            <span className="title-message">截止至最近一天全网积分留存总数为: </span>
            <span className="title-count">{general.obligate}</span>
          </Col>
          <Col span={12} className="text-right">
            <RangePicker
              format="YYYY-MM-DD"
              locale={zhCN}
              onChange={
                (dates, dateString) => {
                  this.handleIntegralChange(dates, dateString);
                }
              }
            />
          </Col>
        </Row>
        <Row type="flex" align="middle" justify="start" className="title-summary">
          <Col span={4}>
            <p>积分发放数</p>
            <p className={out.isRate ? 'font-red' : 'font-green'}>{out.amounts}</p>
            <div>
              <span>{out.compare}</span>
              <span>
                <i className={out.isRate ? 'icons up' : 'icons down'} />{out.rate}
              </span>
            </div>
          </Col>
          <Col span={4}>
            <p>积分使用数</p>
            <p className={useAmounts.isRate ? 'font-red' : 'font-green'}>{useAmounts.amounts}</p>
            <div>
              <span>{useAmounts.compare}</span>
              <span>
                <i className={useAmounts.isRate ? 'icons up' : 'icons down'} />{useAmounts.rate}
              </span>
            </div>
          </Col>
          <Col span={4}>
            <p>兑换商品数</p>
            <p className={exchange.isRate ? 'font-red' : 'font-green'}>{exchange.amounts}</p>
            <div>
              <span>{exchange.compare}</span>
              <span>
                <i className={exchange.isRate ? 'icons up' : 'icons down'} />{exchange.rate}
              </span>
            </div>
          </Col>
          <Col span={4}>
            <p>兑换人数</p>
            <p className={users.isRate ? 'font-red' : 'font-green'}>{users.amounts}</p>
            <div>
              <span>{users.compare}</span>
              <span>
                <i className={users.isRate ? 'icons up' : 'icons down'} />{users.rate}
              </span>
            </div>
          </Col>
        </Row>
        <Row type="flex" align="middle" justify="center" >
          <Col span={24} className="margin-bottom-12">
            <h2 className="title-start-tag-orange">
              应用分析
            </h2>
          </Col>
          <Col span={8}>
            <span className="title-message">最近30天积分发放最多的为: </span>
            <span className="title-count">团海尔</span>
          </Col>
          <Col span={8}>
            <span className="title-message">最近30天积分使用最多的为: </span>
            <span className="title-count">日日顺</span>
          </Col>
          <Col span={8} className="text-right">
            <RangePicker
              format="YYYY-MM-DD"
              locale={zhCN}
              onChange={
                (dates, dateString) => {
                  this.handleClientChange(dates, dateString);
                }
              }
            />
          </Col>
        </Row>
        <Table
          className="integral-table"
          columns={columns}
          dataSource={integrals.data}
          pagination={pagination}
          loading={integrals.fetching}
          onChange={
            (paginations, filters, sorter) => {
              this.handleTableChange(paginations, filters, sorter);
            }
          }
        />
      </section>
    );
  }
}

Server.propTypes = {
  queryClient: PropTypes.func,
  queryAll: PropTypes.func,
  queryIntegral: PropTypes.func,
  integrals: PropTypes.object,
};
const mapDispatchToProps = {
  queryClient: param => getClient(param),
  queryAll: param => getAll(param),
  queryIntegral: param => getIntegral(param),
};
const mapStateToProps = state => ({
  integrals: state.analyzeRights,
});
export default connect(mapStateToProps, mapDispatchToProps)(Server);
