import React, { Component, PropTypes } from 'react';
import { Row, Col, DatePicker, Table } from 'antd';
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
import Echarts from 'components/Echarts';
import { connect } from 'react-redux';
import { getDetail } from './containers';
import '../server.scss';

const RangePicker = DatePicker.RangePicker;
const columns = [
  {
    title: '服务类型',
    dataIndex: 'type',
  },
  {
    title: '用户名',
    dataIndex: 'name',
  },
  {
    title: '服务内容',
    dataIndex: 'content',
  },
  {
    title: '是否满意',
    dataIndex: 'isNo',
  },
  {
    title: '备注',
    dataIndex: 'comment',
  },
];

class Detail extends Component {
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
  handleTableChange(pagination) {
    const { query } = this.props;
    const page = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
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
  optionInit() {
    const { details } = this.props;
    const option = {
      color: ['#87c64d'],
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: '6%',
        left: '0%',
        right: '2%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: details.echarts.map(item => item.key) || [],
      },
      yAxis: {
        show: false,
        type: 'value',
        axisLine: { onZero: false },
        axisLabel: {
          formatter: '{value} w',
        },
        boundaryGap: false,
      },
      series: [
        {
          name: '极速退换货',
          type: 'line',
          smooth: true,
          stack: '总量',
          data: details.echarts.map(item => item.value) || [],
          lineStyle: {
            normal: {
              width: 1,
            },
          },
          itemStyle: {
            normal: {
              opacity: 0,
            },
          },
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
      ],
    };
    return option;
  }
  render() {
    const init = this.optionInit();
    const { details } = this.props;
    const pagination = {
      total: details.total,
      showSizeChanger: true,
    };
    return (
      <section className="analyze-server">
        <Row type="flex" align="middle" justify="center" className="server-title">
          <Col span={24} className="margin-bottom-12">
            <h2 className="title-start-tag-green">服务概况</h2>
          </Col>
          <Col span={24} className="title-message-detail">
            <span className="title-message">所选服务: 极速退换货次数</span>
          </Col>
          <Col span={24} className="title-message-detail">
            <span className="title-message">所选时间: </span>
            <RangePicker
              format="YYYY-MM-DD"
              locale={zhCN}
              onChange={this.handleDateChange}
            />
          </Col>
        </Row>
        <Row>
          <Echarts
            type="line"
            height="250px"
            options={init}
          />
        </Row>
        <Table
          columns={columns}
          className="detail-table"
          dataSource={details.data}
          pagination={pagination}
          onChange={
              this.handleTableChange
          }
        />
      </section>
    );
  }
}
Detail.propTypes = {
  query: PropTypes.func,
  details: PropTypes.object,
};
const mapDispatchToProps = {
  query: param => getDetail(param),
};
const mapStateToProps = state => ({
  details: state.analyzeDetail,
});
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
