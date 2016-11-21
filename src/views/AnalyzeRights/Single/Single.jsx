import React, { Component, PropTypes } from 'react';
import { Row, Col, DatePicker, Checkbox, Table } from 'antd';
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
import Echarts from 'components/Echarts';
import { connect } from 'react-redux';
import { getSingle } from './containers';

import './Single.scss';

const out = [
  {
    title: '积分发放类型',
    dataIndex: 'outType',
  },
  {
    title: '积分数',
    dataIndex: 'integrals',
  },
  {
    title: '参与人数',
    dataIndex: 'peoples',
    sorter: (a, b) => a.peoples - b.peoples,
  },
];
const use = [
  {
    title: '积分使用类型',
    dataIndex: 'useType',
  },
  {
    title: '积分数',
    dataIndex: 'integrals',
  },
  {
    title: '参与人数',
    dataIndex: 'peoples',
    sorter: (a, b) => a.peoples - b.peoples,
  },
];
const RangePicker = DatePicker.RangePicker;

class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outUse: {},
      uses: true,
      outs: true,
    };
    this.handleOut = this.handleOut.bind(this);
    this.handleUse = this.handleUse.bind(this);
  }
  componentDidMount() {
    this.props.querySingle();
  }
  handleOut() {
    this.setState({
      outs: !this.state.outs,
    });
  }
  handleUse() {
    this.setState({
      uses: !this.state.uses,
    });
  }
  handleDate(dates, dateString) {
    const { querySingle } = this.props;
    const res = {
      startDate: dateString[0],
      endDate: dateString[1],
    };
    querySingle(res);
  }
  optionInit(data1, data2) {
    // console.log(data1);
    const option = {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: '6%',
        left: '0%',
        right: '1%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data1.map(item => item.key) || [],
      },
      yAxis: {
        type: 'value',
        axisLine: { onZero: false },
        axisLabel: {
          formatter: '{value} w',
        },
        boundaryGap: false,
      },
      series: [
        {
          color: ['#ff4d4d'],
          name: '使用',
          type: 'line',
          smooth: true,
          data: data2.map(item => item.value) || [],
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
        {
          color: ['#4f7dff'],
          name: '发放',
          type: 'line',
          smooth: true,
          data: data1.map(item => item.value) || [],
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
    const { singles } = this.props;
    const { uses, outs } = this.state;
    const data1 = () => {
      if (outs) {
        return singles.data.out;
      }
      return [];
    };
    const data2 = () => {
      if (uses) {
        return singles.data.use;
      }
      return [];
    };
    const init = this.optionInit(data1(), data2());
    return (
      <section className="analyze-single">
        <Row type="flex" align="middle" justify="center">
          <Col span={24}>
            <h2 className="title-start-tag-blue">单应用分析</h2>
          </Col>
        </Row>
        <Row type="flex" align="middle" justify="center">
          <Col span={24} className="title-spacing">
            <span className="title-spacing message">所选应用:</span>
            <span className="title-spacing message message-spacing">海尔商城</span>
          </Col>
        </Row>
        <Row type="flex" align="middle" justify="center">
          <Col span={24} className="title-spacing">
            <span className="title-spacing message">所选时间:</span>
            <RangePicker
              style={{ paddingLeft: 5 }}
              format="YYYY-MM-DD"
              locale={zhCN}
              onChange={this.handleDate.bind(this)}
            />
          </Col>
        </Row>
        <Row type="flex" align="middle" justify="center">
          <Col span={24} className="title-spacing">
            <span className="title-spacing message">会员等级:</span>
            <Checkbox
              className="check-spacing"
              onChange={this.handleOut}
              checked={outs}
            >
              积分发放数
            </Checkbox>
            <Checkbox
              className="check-spacing"
              onChange={this.handleUse}
              checked={uses}
            >
              积分使用数
            </Checkbox>
          </Col>
        </Row>
        <Row className="title-spacing">
          <Echarts
            type="line"
            height="250px"
            options={init}
            isLoading={singles.fetching}
          />
        </Row>
        <Row type="flex" align="middle" justify="center" className="single-table">
          <Col span={12}>
            <Table
              columns={out}
              dataSource={singles.out}
              pagination={false}
              className="out-table"
              loading={singles.fetching}
            />
          </Col>
          <Col span={11} offset={1}>
            <Table
              columns={use}
              dataSource={singles.use}
              pagination={false}
              className="use-table"
              loading={singles.fetching}
            />
          </Col>
        </Row>
      </section>
    );
  }
}
Single.propTypes = {
  querySingle: PropTypes.func,
  singles: PropTypes.object,
};

const mapDispatchToProps = {
  querySingle: param => getSingle(param),
};

const mapStateToProps = state => ({
  singles: state.single,
});

export default connect(mapStateToProps, mapDispatchToProps)(Single);

