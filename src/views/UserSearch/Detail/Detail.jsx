import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Table, Modal } from 'antd';
import Client from './conponents/Client/Client';
import Order from './conponents/Order/Order';
import { Portrayal } from './conponents/Portrayal/Portrayal';
import { getUserDetail, clientDetail, integralDetail, actionDetail, commentDetail, customDetail, intagralFreeze } from './containers';
import './detail.scss';

// 用户积分
const integral = [
  {
    title: '',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '',
    dataIndex: 'reason',
    key: 'reason',
  },
  {
    title: '',
    dataIndex: 'count',
    key: 'count',
  },
];
// 用户行为
const behavior = [
  {
    title: '',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '',
    dataIndex: 'loaction',
    key: 'loaction',
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
  },
];
const confirm = Modal.confirm;

// 用户评论
const comment = [
  {
    title: '',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: '',
    dataIndex: 'comment',
    key: 'comment',
  },
];
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.params.id,
      params: {
        pageSize: 10,
        pageNo: 1,
      },
      integrals: {     // 用户积分信息
        pageNo: 2,
        pageSize: 4,
      },
      actions: {     // 用户行为信息
        pageNo: 2,
        pageSize: 4,
      },
    };
    this.freezeScore = this.freezeScore.bind(this);        // 积分冻结
    this.handleDetail = this.handleDetail.bind(this);      // 订单详情
    this.integralMore = this.integralMore.bind(this);      // 积分信息
    this.actionMore = this.actionMore.bind(this);          // 行为信息
    this.commentMore = this.commentMore.bind(this);        // 评论信息
    this.customMore = this.customMore.bind(this);        // 定制信息
  }
  componentDidMount() {
    const { query } = this.props;
    const { userId } = this.state;
    query(userId);
  }
  // 冻结积分
  freezeScore(e) {
    e.preventDefault();
    const { queryFreeze } = this.props;
    const id = this.state.userId;
    confirm({
      title: '确认冻结此用户积分吗?',
      onOk() {
        queryFreeze(id);
      },
      onCancel() {},
    });
  }
  // 用户积分信息
  integralMore(e) {
    e.preventDefault();
    const { integrals } = this.state;
    const { queryIntegral } = this.props;
    this.setState({
      integrals: {
        pageNo: integrals.pageNo + 1,
        pageSize: 4,
      },
    });
    const res = {
      pageNo: integrals.pageNo,
      pageSize: integrals.pageSize,
    };
    queryIntegral(res);
  }
  // 用户行为信息
  actionMore(e) {
    e.preventDefault();
    const { actions } = this.state;
    const { queryAction } = this.props;
    this.setState({
      actions: {
        pageNo: actions.pageNo + 1,
        pageSize: 4,
      },
    });
    const res = {
      pageNo: actions.pageNo,
      pageSize: actions.pageSize,
    };
    queryAction(res);
  }

    // 用户评论信息
  commentMore(e) {
    e.preventDefault();
    const { queryComment } = this.props;
    queryComment();
  }
  customMore(e) {
    e.preventDefault();
    const { queryCustom } = this.props;
    queryCustom();
  }
  // 订单详情
  handleDetail(id) {
    const { queryClient } = this.props;
    queryClient(id);
  }
  render() {
    const { details } = this.props;
    const datas = details.result;
    const freezeScore = details.freezes;
    // 基础信息
    const basic = datas.basicInfo;
    // 定制信息
    const custom = datas.customInfo.basicInfo;
    return (
      <div className="detail-background">
        <div className="detail-content">
          <Row gutter={16}>
            <Col sm={6} md={6}>
              <Card className="basic">
                <h3>用户基本信息</h3>
                <img src={basic.headshot} alt="暂无图片" />
                <p><span>用户名：</span>{basic.username ? basic.username : '暂无'}</p>
                <p><span>真是姓名：</span>{basic.realName ? basic.realName : '暂无'}</p>
                <p><span>用户昵称：</span>{basic.nickname ? basic.nickname : '暂无'}</p>
                <p><span>性别：</span>{basic.gender ? basic.gender : '暂无'}</p>
                <p><span>生日：</span>{basic.birthday ? basic.birthday : '暂无'}</p>
                <hr />
                <p><span>会员等级：</span>{basic.grade ? basic.grade : '暂无'}</p>
                <p>
                  <span>积分：</span>
                  {freezeScore.pointScore ? freezeScore.pointScore : '暂无'}
                  <a href="" className="freeze-btn" onClick={this.freezeScore}>冻结</a>
                </p>
                <p><span>累计冻结积分：</span>{freezeScore.freezePointScore ? freezeScore.freezePointScore : '暂无'}</p>
                <p><span>会员特权：</span>{basic.privilege ? basic.privilege : '暂无'}</p>
                <hr />
                <p><span>手机号码：</span>{basic.phone ? basic.phone : '暂无'}</p>
                <p><span>常用邮箱：</span>{basic.email ? basic.email : '暂无'}</p>
              </Card>
            </Col>
            <Col sm={18} md={18} lg={18}>
              <Portrayal portrayal={datas.portrayal} />
              <Client
                client={datas.myFacility}
                handleDetail={this.handleDetail}
                useLogs={details.useLog}
                servers={details.server}
              />
            </Col>
            <Col sm={24}>
              <Order order={datas.indentDetail} />
            </Col>
            <Col sm={12}>
              <Card>
                <h3>用户积分信息<a href="" className="pull-right" onClick={this.integralMore}>更多</a></h3>
                <Table
                  loading={details.intagrals.fetching}
                  columns={integral}
                  pagination={false}
                  dataSource={details.intagrals.intagrals}
                  size="middle"
                  className="integral-table"
                />
              </Card>
            </Col>
            <Col sm={12}>
              <Card>
                <h3>用户行为信息<a href="" className="pull-right" onClick={this.actionMore}>更多</a></h3>
                <Table
                  columns={behavior}
                  pagination={false}
                  dataSource={details.actions}
                  size="middle"
                  className="behavior-table"
                />
              </Card>
            </Col>
            <Col sm={24}>
              <Card>
                <h3>用户的评论<a href="" className="pull-right" onClick={this.commentMore}>更多</a></h3>
                <Table
                  columns={comment}
                  pagination={false}
                  dataSource={details.comments}
                  size="middle"
                  className="comment-table"
                />
              </Card>
            </Col>
            <Col sm={24}>
              <Card className="customization-card">
                <h3>用户定制信息</h3>
                <p className="ranges">
                  <span>排名：</span><span className="customization-data">{custom.range ? custom.range : '暂无'}</span>
                  <span>评分：</span><span className="customization-data">{custom.score ? custom.score : '暂无'}</span>
                  <span>众筹：</span><span className="customization-data">{custom.crowdfunding ? custom.crowdfunding : '暂无'}</span>
                  <span>作品：</span><span className="customization-data">{custom.production ? custom.production : '暂无'}</span>
                  <span>粉丝</span><span className="customization-data">{custom.fans ? custom.fans : '暂无'}</span>
                </p>
                {
                  details.customs.length ?
                  details.customs.map((item, index) => (
                    <Row gutter={16} key={index} className="margin-bottom-20">
                      <Col sm={7}>
                        <Col sm={10}>
                          <img src={item.picture} className="customization-img" alt="暂无图片" />
                        </Col>
                        <Col sm={14}>
                          <p className="customization-title">{item.type ? item.type : '暂无'}</p>
                          <p><span>参考价：<span>{item.price ? item.price : '0'}</span>元</span></p>
                          <p><span>月销量：<span>{item.sales ? item.sales : '0'}</span>台</span></p>
                        </Col>
                      </Col>
                      <Col sm={1} className="border-right">&nbsp;</Col>
                      <Col sm={5}>
                        <p className="customization-title">主要参数：</p>
                        <p><span>空调类型：</span>{item.airType ? item.airType : '暂无'}</p>
                        <p><span>产品功率：</span>{item.power ? item.power : '暂无'}</p>
                        <p><span>变频：</span>{item.change ? item.change : '暂无'}</p>
                        <p><span>冷暖类型：</span>{item.coldtype ? item.coldtype : '暂无'}</p>
                        <p><span>能效级别：</span>{item.powerGrade ? item.powerGrade : '暂无'}</p>
                      </Col>
                      <Col sm={1} className="border-right">&nbsp;</Col>
                      <Col sm={6}>
                        <p className="customization-title">定制类型：</p>
                        <Col sm={12}><p><span>热门定制：</span><span className="type-color">{item.hot ? item.hot : '暂无'}</span></p></Col>
                        <Col sm={12}><p><span>众筹状态：</span><span className="type-color">{item.status ? item.status : '暂无'}</span></p></Col>
                        <Col sm={12}><p><span>众筹开始：</span><span className="type-color">{item.start ? item.start : '暂无'}</span></p></Col>
                        <Col sm={12}><p><span>众筹结束：</span><span className="type-color">{item.stop ? item.stop : '暂无'}</span></p></Col>
                        <Col sm={12}><p><span>众筹需要：</span><span className="type-color">{item.need ? item.need : '暂无'}</span></p></Col>
                        <Col sm={12}><p><span>众筹参与：</span><span className="type-color">{item.participation ? item.participation : '暂无'}</span></p></Col>
                      </Col>
                    </Row>
                    )
                  ) : <Row className="text-center">暂无数据</Row>
                }
                <Col sm={24}>
                  <a
                    href=""
                    className="pull-right margin-bottom-20"
                    onClick={this.customMore}
                  >
                    更多产品
                  </a>
                </Col>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  params: PropTypes.object,
  query: PropTypes.func,
  details: PropTypes.object,
  queryClient: PropTypes.func,
  queryIntegral: PropTypes.func,
  queryAction: PropTypes.func,
  queryComment: PropTypes.func,
  queryCustom: PropTypes.func,
  queryFreeze: PropTypes.func,
};
const mapDispatchToProps = {
  query: param => getUserDetail(param),
  queryClient: param => clientDetail(param),
  queryIntegral: param => integralDetail(param),
  queryAction: param => actionDetail(param),
  queryComment: () => commentDetail(),
  queryCustom: () => customDetail(),
  queryFreeze: param => intagralFreeze(param),
};
const mapStateTopProps = state => ({
  details: state.detail,
});

export default connect(mapStateTopProps, mapDispatchToProps)(Detail);

