import React from 'react';
import { Row, Col, Radio, Badge, Card } from 'antd';
import Echarts from 'components/Echarts';
import './Home.scss';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const DATA_COUNT = {
  color: ['#f35651', '#fe8633', '#00b4ff'],
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: '6%',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '进货总数量',
      type: 'line',
      stack: '总量',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '销售总数量',
      type: 'line',
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '库存总数量',
      type: 'line',
      stack: '总量',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
  ],
};

const DATA_STRUCT = {
  color: ['#fb4972', '#ffc760', '#5edc81', '#73d6ff', '#4d7bf3', '#214e9f'],
  title: {
    text: '库存结构',
    textStyle: {
      color: '#666',
      fontFamily: 'MicrosoftYaHei',
      fontSize: '14px',
    },
    x: 'left',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    top: '20%',
    right: '22%',
    data: [
      {
        name: '洗衣机',
        icon: 'circle',
        textStyle: {
          color: '#999',
        },
      }, {
        name: '电冰箱',
        icon: 'circle',
        textStyle: {
          color: '#999',
        },
      }, {
        name: '空调',
        icon: 'circle',
        textStyle: {
          color: '#999',
        },
      }, {
        name: '热水器',
        icon: 'circle',
        textStyle: {
          color: '#999',
        },
      }, {
        name: '抽油烟机',
        icon: 'circle',
        textStyle: {
          color: '#999',
        },
      }, {
        name: '净化器',
        icon: 'circle',
        textStyle: {
          color: '#999',
        },
      }],
  },
  calculable: true,
  series: [
    {
      name: '库存结构',
      type: 'pie',
      radius: [40, 160],
      center: ['40%', '50%'],
      roseType: 'radius',
      label: {
        normal: {
          show: false,
        },
        emphasis: {
          show: true,
        },
      },
      lableLine: {
        normal: {
          show: false,
        },
        emphasis: {
          show: true,
        },
      },
      data: [
        { value: 50, name: '洗衣机' },
        { value: 25, name: '电冰箱' },
        { value: 20, name: '空调' },
        { value: 35, name: '热水器' },
        { value: 30, name: '抽油烟机' },
        { value: 10, name: '净化器' },
      ],
    },
  ],
};


const Home = () => (
  <Card>
    <Row type="flex" justify="center" align="middle" className="ant-home-style">
      <Col span={12}>
        <RadioGroup defaultValue="month">
          <RadioButton value="month">月度统计</RadioButton>
          <RadioButton value="year">年度统计</RadioButton>
        </RadioGroup>
      </Col>
      <Col span={12} className="text-right">
        <Badge status="error" text="进货总数量" />
        <Badge status="warning" text="销售总数量" />
        <Badge status="processing" text="库存总数量" />
      </Col>
      <Col span={24}>
        <Echarts
          type="line"
          options={DATA_COUNT}
          height="360px"
        />
      </Col>
      <Col span={24}>
        <Echarts
          type="pie"
          options={DATA_STRUCT}
          height="360px"
        />
      </Col>
    </Row>
  </Card>

);
export default Home;
