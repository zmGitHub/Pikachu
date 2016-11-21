import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, DatePicker } from 'antd';
import Echarts from 'components/Echarts';
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
import { getAMBDetail } from './containers';
import '../AnalyzeMembers.scss';

const RangePicker = DatePicker.RangePicker;

class Detial extends Component {
  componentDidMount() {
    const { getDetail, params } = this.props;
    getDetail(params.id);
  }
  echartsOptions() {
    const { detail } = this.props;
    const option = {
      color: ['#fb4972', '#ffc760', '#5edc81', '#73d6ff', '#4d7bf3', '#214e9f'],
      title: {
        text: '会员等级:',
        textStyle: {
          color: '#666',
          fontSize: '14px',
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        selectedMode: 'single',
        left: '6%',
        data: [
          { name: '登录会员数', icon: 'circle' },
          { name: '新增会员数', icon: 'circle' },
          { name: '日活跃会员数', icon: 'circle' },
          { name: '流失会员数', icon: 'circle' },
          { name: '日活率', icon: 'circle' },
          { name: '流失率', icon: 'circle' },
        ],
      },
      grid: {
        left: 0,
        right: 0,
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: detail.logins.map(item => item.name) || [],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '登录会员数',
          type: 'line',
          stack: '总量',
          data: detail.logins,
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
        {
          name: '新增会员数',
          type: 'line',
          stack: '总量',
          data: detail.adds,
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
        {
          name: '日活跃会员数',
          type: 'line',
          stack: '总量',
          data: detail.actives,
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
        {
          name: '流失会员数',
          type: 'line',
          stack: '总量',
          data: detail.loss,
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
        {
          name: '日活率',
          type: 'line',
          stack: '总量',
          data: detail.activeRate,
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
        {
          name: '流失率',
          type: 'line',
          stack: '总量',
          data: detail.lossRate,
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
  handlePickerChange(dates, dateString) {
    const { getDetail, params } = this.props;
    getDetail(params.id, { dateRange: dateString.join('/') });
  }
  render() {
    const echartsOptions = this.echartsOptions();
    const detail = this.props.detail;
    return (
      <section className="analyze-detail">
        <Row type="flex" align="middle" justify="center" >
          <Col span={24} className="margin-bottom-12">
            <h2 className="title-start-tag-orange">
              单应用分析
            </h2>
          </Col>
          <Col span={24} className="choice-app">
            <p className="">所选应用: {detail.name}</p>
          </Col>
          <Col span={24} className="choice-app">
            <span>设置警戒值: </span>
            <RangePicker
              format="YYYY-MM-DD"
              locale={zhCN}
              onChange={
                (dates, dateString) => {
                  this.handlePickerChange(dates, dateString);
                }
              }
            />
          </Col>
          <Col span={24}>
            <Echarts
              type="line"
              options={echartsOptions}
              isLoading={detail.fetching}
            />
          </Col>
        </Row>
      </section>
    );
  }
}

Detial.propTypes = {
  params: PropTypes.object,
  detail: PropTypes.object,
  getDetail: PropTypes.func,
};

const mapDispatchToProps = {
  getDetail: (id, date) => getAMBDetail(id, date),
};

const mapStateTopProps = state => ({
  detail: state.AMBDetail,
});

export default connect(mapStateTopProps, mapDispatchToProps)(Detial);
