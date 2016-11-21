import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'antd';
import Echarts from 'components/Echarts';
import { getHome } from 'store/actions/home';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { query } = this.props;
    query();
  }
  // 30新增
  newUsers() {
    const { homes } = this.props;
    const thirtyAdds = homes.data.thirtyAdds;
    const addsData = [];
    thirtyAdds.forEach((item) => {
      addsData.push(item.counts);
    });
    const DATA_NEW = {
      color: ['#00b4ff'],
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
        data: thirtyAdds.map(item => item.date),
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
          name: '新增用户数',
          type: 'line',
          smooth: true,
          stack: '总量',
          data: addsData,
          lineStyle: {
            normal: {
              width: 4,
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
    return DATA_NEW;
  }
  // 30登录
  logins() {
    const { homes } = this.props;
    const thirtyLogins = homes.data.thirtyLogins;
    const loginDate = [];
    thirtyLogins.forEach((item) => {
      loginDate.push(item.counts);
    });
    const DATA_LOGIN = {
      color: ['#00b4ff'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        top: '6%',
        left: '0%',
        right: '1%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: thirtyLogins.map(item => item.appName),
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '访问人数',
          type: 'bar',
          barWidth: '60%',
          data: loginDate,
        },
      ],
    };
    return DATA_LOGIN;
  }
  // 用户地图
  userMaps(datas) {
    const option = {
      tooltip: {
        trigger: 'item',
      },
      visualMap: {
        min: 0,
        max: 2500,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],           // 文本，默认为数值文本
        calculable: true,
        color: ['#00b4ff', '#D2F1FF'],
      },
      series: [
        {
          name: '注册人数',
          type: 'map',
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          data: datas,
        },
      ],
    };
    return option;
  }
  render() {
    const { homes } = this.props;
    // console.log(homes);
    // 实时数据
    const actualTime = homes.data.actualTime;
    // 7天
    const seven = homes.data.seven;
    // 30天新增
    const thirtyNew = this.newUsers();
    // 30天登录
    const thirtyLogin = this.logins();
    // map
    const userMap = homes.data.userMap || [];
    const map = this.userMaps(userMap);
    return (
      <Card loading={homes.fetching}>
        <Row className="ant-title-row">
          <Col span={24}>
            <span className="title-message">实时用户数据</span>
          </Col>
        </Row>
        <Row className="title-summary">
          <Col span={6} className="title-summary-col">
            <p>全网总人数</p>
            <p className="font-red">{actualTime.headcounts ? actualTime.headcounts : '--'}</p>
          </Col>
          <Col span={6} className="title-summary-col">
            <p>全网发放的总积分数</p>
            <p className="font-yellow">{actualTime.integrals ? actualTime.integrals : '--'}</p>
          </Col>
          <Col span={6} className="title-summary-col">
            <p>全网服务总数</p>
            <p className="font-green">{actualTime.services ? actualTime.services : '--'}</p>
          </Col>
          <Col span={6} className="title-summary-col">
            <p>绑定设备数</p>
            <p className="font-blue">{actualTime.clients ? actualTime.clients : '--'}</p>
          </Col>
        </Row>
        <Row className="ant-title-row">
          <Col span={24}>
            <span className="title-message">最近7天用户概况</span>
          </Col>
        </Row>
        <Row className="title-summary">
          <Col span={4} className="title-summary-col">
            <p>登录用户数</p>
            <p className="font-seven">{seven.logins ? seven.logins : '--'}</p>
          </Col>
          <Col span={4} className="title-summary-col">
            <p>新增用户数数</p>
            <p className="font-seven">{seven.adds ? seven.adds : '--'}</p>
          </Col>
          <Col span={4} className="title-summary-col">
            <p>日活跃用户数</p>
            <p className="font-seven">{seven.actives ? seven.actives : '--'}</p>
          </Col>
          <Col span={4} className="title-summary-col">
            <p>流失用户数</p>
            <p className="font-seven">{seven.runOff ? seven.runOff : '--'}</p>
          </Col>
          <Col span={4} className="title-summary-col">
            <p>日活率</p>
            <p className="font-seven">{seven.activesRate ? seven.activesRate : '--'}</p>
          </Col>
          <Col span={4} className="title-summary-col">
            <p>流失率</p>
            <p className="font-seven">{seven.runOffRate ? seven.runOffRate : '--'}</p>
          </Col>
        </Row>
        <Row className="ant-title-row ant-title-row-30">
          <Col span={24}>
            <span className="title-message">最近30天新增用户趋势图</span>
          </Col>
          <Col span={24}>
            <Echarts
              options={thirtyNew}
              type="line"
              height="250px"
            />
          </Col>
        </Row>
        <Row className="ant-title-row ant-title-row-top">
          <Col span={24}>
            <span className="title-message">最近30天应用登录人数TOP10</span>
          </Col>
          <Col span={24}>
            <Echarts
              options={thirtyLogin}
              type="bar"
              height="250px"
            />
          </Col>
        </Row>
        <Row className="ant-title-row ant-title-row-top">
          <Col span={24}>
            <span className="title-message">用户地图</span>
          </Col>
          <Col span={18}>
            <Echarts
              options={map}
              type="map"
              height="500px"
            />
          </Col>
          <Col span={6} className="map-range">
            <p>注册人数排行TOP10</p>
            <p><span>地域</span><span>注册人数</span></p>
            {
              userMap.map((item, index) => {
                if (index < 10) {
                  return <p key={index}><span>{item.name}</span><span>{item.value}</span></p>;
                }
                return '';
              })
            }
          </Col>
        </Row>
      </Card>
    );
  }
}
Home.propTypes = {
  query: PropTypes.func,
  homes: PropTypes.object,
};
const mapDispatchToProps = {
  query: param => getHome(param),
};
const mapStateTopProps = state => ({
  homes: state.home,
});

export default connect(mapStateTopProps, mapDispatchToProps)(Home);
