import React, { Component, PropTypes } from 'react';
import { Row, Col, DatePicker, Table } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
import { getServers } from './containers';
import '../server.scss';

const RangePicker = DatePicker.RangePicker;

class Server extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {},
      dates: {},
    };
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  componentDidMount() {
    const { query } = this.props;
    query();
  }
  // 分页、排序
  handleTableChange(pagination, filters, sorter) {
    const { query } = this.props;
    const page = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      field: sorter.field,
      order: sorter.order,
    };
    this.setState({
      pagination: page,
    });
    query(page);
  }
  // 时间监听
  handleDateChange(date, dataString) {
    const { query } = this.props;
    this.setState({
      dates: {
        startDate: dataString[0],
        endDate: dataString[1],
      },
    });
    const res = {
      startDate: dataString[0],
      endDate: dataString[1],
    };
    query(res);
  }
  render() {
    const columns = [
      {
        title: '服务类型',
        dataIndex: 'type',
      }, {
        title: '服务次数',
        dataIndex: 'counts',
        sorter: true,
      }, {
        title: '满意次数',
        dataIndex: 'satisfactions',
        sorter: true,
      }, {
        title: '二次上门次数',
        dataIndex: 'seconds',
      }, {
        title: '投诉次数',
        dataIndex: 'complains',
      }, {
        title: '操作',
        dataIndex: '',
        render: row =>
          <Link to={`analyzeServers/detail`}>详情信息</Link>,
      },
    ];
    const { servers } = this.props;
    const pagination = {
      total: servers.total,
      showSizeChanger: true,
    };
    return (
      <section className="analyze-server">
        <Row type="flex" align="middle" justify="center" className="server-title">
          <Col span={24} className="margin-bottom-12">
            <h2 className="title-start-tag-green">服务概况</h2>
          </Col>
          <Col span={8}>
            <span className="title-message">截止至最近一天全网服务总次数为: </span>
            <span className="title-count">7890</span>
          </Col>
          <Col span={8}>
            <span className="title-message">全网评价满意总次数为: </span>
            <span className="title-count">76890</span>
          </Col>
          <Col span={8} className="text-right">
            <RangePicker
              format="YYYY-MM-DD"
              locale={zhCN}
              onChange={this.handleDateChange}
            />
          </Col>
        </Row>
        <Table
          columns={columns}
          loading={servers.fetching}
          dataSource={servers.data}
          pagination={pagination}
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
  query: PropTypes.func,
  servers: PropTypes.object,
};
const mapDispatchToProps = {
  query: param => getServers(param),
};
const mapStateToProps = state => ({
  servers: state.analyzeServers,
});
export default connect(mapStateToProps, mapDispatchToProps)(Server);
