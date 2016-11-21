import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, DatePicker, Form, Input, Table, Modal } from 'antd';
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
import { getAbnormalUsers } from './containers';
import './abnormalUser.scss';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const COLUMNS = [{
  title: '用户名称',
  dataIndex: 'name',
}, {
  title: '已获积分数',
  dataIndex: 'getIntegral',
}, {
  title: '已使用积分数',
  dataIndex: 'useIntegral',
}, {
  title: '累计冻结积分数',
  dataIndex: 'freezeIntegral',
}, {
  title: '异常操作时间',
  dataIndex: 'abnormalTime',
}, {
  title: '操作',
  dataIndex: '',
  render: (text, record) => {
    const lock = record.locked;
    const id = record.id;
    return lock ?
      <a href="" onClick={e => this.unfreeze(e, id)}>解冻</a>
      :
      <a href="" onClick={e => this.freeze(e, id)}>冻结</a>;
  },
}, {
  title: '备注',
  dataIndex: '',
}];

class AbnormalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {},
    };
  }

  componentDidMount() {
    this.props.getAbnormalUsers();
  }

  handlePickerChange() {
    console.log('RangePicker change');
  }

  render() {
    const { users } = this.props;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    const footerFormItemLayout = {
      wrapperCol: {
        span: 24,
      },
    };
    const pagination = {
      total: users.total || 0,
      showSizeChanger: true,
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <section className="abnormal-user">
        <Modal>
          <Form horizontal onSubmit={(e) => { this.handleSubmit(e); }}>
            <FormItem
              {...formItemLayout}
              label="单日获取积分数"
            >
              {getFieldDecorator('getIntegral', {
                rules: [{
                  validator: this.checkAlertvalue,
                }],
              })(
                <Input placeholder="请输入" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="单日使用积分数"
            >
              {getFieldDecorator('useIntegral', {
                rules: [{
                  validator: this.checkAlertvalue,
                }],
              })(
                <Input placeholder="请输入" />
              )}
            </FormItem>
            <FormItem
              {...footerFormItemLayout}
              className="text-right"
            >
              <Button type="ghost" onClick={() => { this.handleCancel(); }}>取 消</Button>
              <Button type="primary" className="margin-left-10" htmlType="submit">确 定</Button>
            </FormItem>
          </Form>
        </Modal>
        <Row type="flex" align="middle" justify="center" className="title-top">
          <Col span={24} className="margin-bottom-12">
            <h2 className="title-start-tag-blue">
              异常用户分析
            </h2>
          </Col>
          <Col span={12}>
            <span className="title-message">最近三十天内异常用户数为:</span>
            <span className="title-count">271</span>
          </Col>
          <Col span={12} className="text-right">
            <Button
              type="ghost"
              icon="setting"
              className="margin-right-19"
            >
              设置警戒值
            </Button>
            <RangePicker
              format="YYYY-MM-DD"
              locale={zhCN}
            />
          </Col>
        </Row>
        <Table
          columns={COLUMNS}
          pagination={pagination}
          loading={users.fetching}
          dataSource={users.data}
        />
      </section>
    );
  }
}

AbnormalUser.propTypes = {
  form: PropTypes.object,
  users: PropTypes.object,
  getAbnormalUsers: PropTypes.func,
};

AbnormalUser = Form.create()(AbnormalUser);

const mapDispatchToProps = {
  getAbnormalUsers: () => getAbnormalUsers(),
};
const mapStateTopProps = state => ({
  users: state.abnormalUser,
});

export default connect(mapStateTopProps, mapDispatchToProps)(AbnormalUser);
