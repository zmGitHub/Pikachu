import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { Row, Col, Button, DatePicker, Form, Input, Table, Modal, notification } from 'antd';
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
import { getAMB, getAMBApp, getAMBGeneral, setAlert } from './containers';
import '../AnalyzeMembers.scss';

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;

const COLUMNS = [{
  title: '序 号',
  dataIndex: 'id',
}, {
  title: '应用名称',
  dataIndex: 'name',
}, {
  title: '登录会员数',
  dataIndex: 'logins',
  sorter: true,
}, {
  title: '新增会员数',
  dataIndex: 'new',
  sorter: true,
}, {
  title: '日活跃会员数',
  dataIndex: 'actives',
  sorter: true,
}, {
  title: '流失会员数',
  dataIndex: 'loss',
  sorter: true,
}, {
  title: '日活率',
  dataIndex: 'activeRate',
  sorter: true,
}, {
  title: '流失率',
  dataIndex: 'lossRate',
  sorter: true,
}, {
  title: '操 作',
  key: 'operation',
  render: (text, item) => <Link to={`analyzeMembers/detial/${item.id}`}>单应用分析</Link>,
}];

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {},
      visible: false,
    };
  }
  componentDidMount() {
    this.props.getAnalyzeMembers();
  }
  // 验证表单数据格式
  checkAlertvalue(rule, value, callback) {
    const reg = /^((?!0)\d+(\.\d{1,2})?)$/g;
    if (!!value && !reg.test(value)) {
      callback('值必须为正数且最多有两位小数');
    } else {
      callback();
    }
  }
  // 监听时间变化
  handlePickerChange(dates, dateString, type) {
    const { pagination, sorter } = this.state;
    const { getAnalyzeMembersApp, getAnalyzeMembersGen } = this.props;
    const params = {
      ...pagination,
      ...sorter,
      dateRange: dateString.join('/'),
    };
    const methods = {
      situation: getAnalyzeMembersGen,
      app: getAnalyzeMembersApp,
    };
    methods[type](params);
    this.setState({
      dateRange: dateString.join('/'),
    });
  }
  // 警戒值
  showModal() {
    this.setState({
      visible: true,
    });
  }
  // 警戒值提交
  handleSubmit(e) {
    e.preventDefault();
    const { setAnalyzeMembersAlert, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        setAnalyzeMembersAlert(values).then(() => {
          this.handleCancel();
          notification.success({
            message: '操作成功',
            description: '警戒值设置成功',
          });
        }, (error) => {
          notification.error({
            message: '操作失败',
            description: error || '警戒值设置失败',
          });
        });
      }
    });
  }
  // 关闭 modal
  handleCancel() {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();
  }
  // 分页和过滤事件
  handleTableChange(pagination, filters, sorter) {
    const { current, pageSize } = pagination;
    const { field, order } = sorter;
    const { dateRange } = this.state;
    this.setState({
      pagination: {
        current,
        pageSize,
      },
      sorter: {
        field,
        order,
      },
    });
    this.props.getAnalyzeMembersApp({
      current,
      pageSize,
      field,
      order,
      dateRange,
    });
  }
  render() {
    const { analyzeMembers, form } = this.props;
    const { getFieldDecorator } = form;
    const { general, app } = analyzeMembers;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 24,
      },
    };
    const pagination = {
      total: app.total || 0,
      showSizeChanger: true,
    };
    return (
      <section className="analyze-members">
        <Modal
          closable={false}
          maskClosable={false}
          visible={this.state.visible}
          onCancel={
            () => {
              this.handleCancel();
            }
          }
          footer={null}
        >
          <Form horizontal onSubmit={(e) => { this.handleSubmit(e); }}>
            <FormItem
              {...formItemLayout}
              label="登录用户数对比上一周期变化率"
            >
              {getFieldDecorator('loginRate', {
                rules: [{
                  validator: this.checkAlertvalue,
                }],
              })(
                <Input addonAfter={<i>%</i>} placeholder="请输入正数,小数最多两位" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="新增用户数对比上一周期变化率"
            >
              {getFieldDecorator('addRate', {
                rules: [{
                  validator: this.checkAlertvalue,
                }],
              })(
                <Input addonAfter={<i>%</i>} placeholder="请输入正数,小数最多两位" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="日活率"
            >
              {getFieldDecorator('activeRate', {
                rules: [{
                  validator: this.checkAlertvalue,
                }],
              })(
                <Input addonAfter={<i>%</i>} placeholder="请输入正数,小数最多两位" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="流失率"
            >
              {getFieldDecorator('lossRate', {
                rules: [{
                  validator: this.checkAlertvalue,
                }],
              })(
                <Input addonAfter={<i>%</i>} placeholder="请输入正数,小数最多两位" />
              )}
            </FormItem>
            <FormItem
              {...tailFormItemLayout}
              className="text-right"
            >
              <Button type="ghost" onClick={() => { this.handleCancel(); }}>取 消</Button>
              <Button type="primary" className="margin-left-10" htmlType="submit">确 定</Button>
            </FormItem>
          </Form>
        </Modal>
        <Row type="flex" align="middle" justify="center" >
          <Col span={24} className="margin-bottom-12">
            <h2 className="title-start-tag-orange">
              会员概况
              {general.warning ? <span className="title-warring">警告：日活率超出警戒线</span> : ''}
            </h2>
          </Col>
          <Col span={12}>
            <span className="title-message">截止至最近一天全网用户总数为: </span>
            <span className="title-count">{general.amounts || '--'}</span>
          </Col>
          <Col span={12} className="text-right">
            <Button
              type="ghost"
              icon="setting"
              className="margin-right-19"
              onClick={
                () => {
                  this.showModal();
                }
              }
            >
              设置警戒值
            </Button>
            <RangePicker
              format="YYYY-MM-DD"
              locale={zhCN}
              onChange={
                (dates, dateString) => {
                  this.handlePickerChange(dates, dateString, 'situation');
                }
              }
            />
          </Col>
        </Row>
        <Row type="flex" align="middle" justify="center" className="title-summary">
          <Col span={4}>
            <p>登录会员数</p>
            <p className="font-red">{general.logins.amounts || '--'}</p>
            <div>
              <span>{general.logins.compare || '--'}</span>
              <span>
                <i className={general.logins.isRate ? 'icons up' : 'icons down'} />{general.logins.rate || '--'}
              </span>
            </div>
          </Col>
          <Col span={4}>
            <p>新增会员数</p>
            <p>{general.adds.amounts || '--'}</p>
            <div>
              <span>{general.adds.compare || '--'}</span>
              <span>
                <i className={general.adds.isRate ? 'icons up' : 'icons down'} />{general.adds.rate || '--'}
              </span>
            </div>
          </Col>
          <Col span={4}>
            <p>日活跃会员数</p>
            <p>{general.actives.amounts || '--'}</p>
            <div>
              <span>{general.actives.compare || '--'}</span>
              <span>
                <i className={general.actives.isRate ? 'icons up' : 'icons down'} />{general.actives.rate || '--'}
              </span>
            </div>
          </Col>
          <Col span={4}>
            <p>流失会员数</p>
            <p>{general.loss.amounts || '--'}</p>
            <div>
              <span>{general.loss.compare || '--'}</span>
              <span>
                <i className={general.loss.isRate ? 'icons up' : 'icons down'} />{general.loss.rate || '--'}
              </span>
            </div>
          </Col>
          <Col span={4}>
            <p>日活率</p>
            <p>{general.activeRate.amounts || '--'}</p>
            <div>
              <span>{general.activeRate.compare || '--'}</span>
              <span>
                <i className={general.activeRate.isRate ? 'icons up' : 'icons down'} />{general.activeRate.rate || '--'}
              </span>
            </div>
          </Col>
          <Col span={4}>
            <p>流失率</p>
            <p>{general.lossRate.amounts || '--'}</p>
            <div>
              <span>{general.lossRate.compare || '--'}</span>
              <span>
                <i className={general.lossRate.isRate ? 'icons up' : 'icons down'} />{general.lossRate.rate || '--'}
              </span>
            </div>
          </Col>
        </Row>
        <Row type="flex" align="middle" justify="center" >
          <Col span={12}>
            <h2 className="title-start-tag-orange">
              应用分析
            </h2>
          </Col>
          <Col span={12} className="text-right">
            <RangePicker
              format="YYYY-MM-DD"
              locale={zhCN}
              onChange={
                (dates, dateString) => {
                  this.handlePickerChange(dates, dateString, 'app');
                }
              }
            />
          </Col>
        </Row>
        <Row type="flex" align="middle" justify="center" className="title-summary">
          <Col span={4}>
            <p>登录会员数</p>
            <p className="title-summary-app">
              <span>最高</span>
              <span>{app.logins.max || '--'}</span>
            </p>
            <p className="title-summary-app">
              <span>最低</span>
              <span>{app.logins.min || '--'}</span>
            </p>
          </Col>
          <Col span={4}>
            <p>新增会员数</p>
            <p className="title-summary-app">
              <span>最高</span>
              <span>{app.adds.max || '--'}</span>
            </p>
            <p className="title-summary-app">
              <span>最低</span>
              <span>{app.adds.min || '--'}</span>
            </p>
          </Col>
          <Col span={4}>
            <p>日活跃会员数</p>
            <p className="title-summary-app">
              <span>最高</span>
              <span>{app.actives.max || '--'}</span>
            </p>
            <p className="title-summary-app">
              <span>最低</span>
              <span>{app.actives.max || '--'}</span>
            </p>
          </Col>
          <Col span={4}>
            <p>流失会员数</p>
            <p className="title-summary-app">
              <span>最高</span>
              <span>{app.loss.max || '--'}</span>
            </p>
            <p className="title-summary-app">
              <span>最低</span>
              <span>{app.loss.max || '--'}</span>
            </p>
          </Col>
          <Col span={4}>
            <p>日活率</p>
            <p className="title-summary-app">
              <span>最高</span>
              <span>{app.activeRate.max || '--'}</span>
            </p>
            <p className="title-summary-app">
              <span>最低</span>
              <span>{app.activeRate.min || '--'}</span>
            </p>
          </Col>
          <Col span={4}>
            <p>流失率</p>
            <p className="title-summary-app">
              <span>最高</span>
              <span>{app.lossRate.max || '--'}</span>
            </p>
            <p className="title-summary-app">
              <span>最低</span>
              <span>{app.lossRate.max || '--'}</span>
            </p>
          </Col>
        </Row>
        <Table
          columns={COLUMNS}
          rowKey={record => record.id}
          dataSource={app.data}
          pagination={pagination}
          loading={analyzeMembers.fetching}
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
Members.propTypes = {
  analyzeMembers: PropTypes.object,
  getAnalyzeMembers: PropTypes.func,
  getAnalyzeMembersApp: PropTypes.func,
  getAnalyzeMembersGen: PropTypes.func,
  setAnalyzeMembersAlert: PropTypes.func,
  form: PropTypes.object,
};
const mapDispatchToProps = {
  getAnalyzeMembers: () => getAMB(),
  getAnalyzeMembersApp: params => getAMBApp(params),
  getAnalyzeMembersGen: params => getAMBGeneral(params),
  setAnalyzeMembersAlert: params => setAlert(params),
};

const mapStateTopProps = state => ({
  analyzeMembers: state.analyzeMembers,
});
Members = Form.create()(Members);
export default connect(mapStateTopProps, mapDispatchToProps)(Members);
