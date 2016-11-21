import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Table, Row, Col, Button, DatePicker, Select } from 'antd';
import { getAppList } from 'store/actions/apps';
import { getLog } from './containers';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const columns = [
  {
    title: '用户名称',
    dataIndex: 'userName',
  }, {
    title: '用户ID',
    dataIndex: 'userId',
  }, {
    title: '应用名称',
    dataIndex: 'clientName',
  }, {
    title: '用户Ip',
    dataIndex: 'userIp',
  }, {
    title: '标签',
    dataIndex: '',
    render: (row) => {
      switch (row.userTag) {
        case 1:
          return '异地登录';
        case 2:
          return '频繁登录';
        case 3:
          return '异常登录';
        default:
          return '正常';
      }
    },
  }, {
    title: '登录时间',
    dataIndex: 'loginTime',
  },
];

const DATES = {};

const handleChange = (dates, dateStrings) => {
  DATES.loginDateFrom = dateStrings[0];
  DATES.loginDateTo = dateStrings[1];
};

class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginations: {
        pageSize: 10,
        pageNo: 1,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getApps = this.getApps.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    const { form, query } = this.props;
    const { paginations } = this.state;
    query(Object.assign(paginations, form.getFieldsValue()));
  }
  // 改变分页
  onChange(paginations) {
    const { form, query } = this.props;
    this.setState({
      pagination: {
        pageNo: paginations.current,
        pageSize: paginations.pageSize,
      },
    });
    const data = {
      pageNo: paginations.current,
      pageSize: paginations.pageSize,
    };
    const res = {
      ...form.getFieldsValue(),
      ...DATES,
      ...data,
    };
    query(res);
  }
  // 获取登录应用
  getApps() {
    const { getApp, apps } = this.props;
    if (!apps.data.length) {
      getApp();
    }
  }
  // 清除
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }
  // 搜索
  handleSubmit(e) {
    e.preventDefault();
    const { form, query } = this.props;
    const value = {
      ...DATES,
      ...form.getFieldsValue(),
      ...this.state.pagination,
    };
    query(value);
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    const { form, log, apps } = this.props;
    const { getFieldDecorator } = form;
    const pagination = {
      total: log.total,
      showSizeChanger: true,
    };
    return (
      <div>
        <Form horizontal onSubmit={this.handleSubmit}>
          <Row gutter={16}>
            <Col sm={6}>
              <FormItem
                label="用户名称"
                {...formItemLayout}
              >
                {
                    getFieldDecorator('userName')(
                      <Input type="text" placeholder="请填写" />
                    )
                }
              </FormItem>
            </Col>
            <Col sm={6}>
              <FormItem
                label="用户ID"
                {...formItemLayout}
              >
                {
                    getFieldDecorator('userId')(
                      <Input type="text" placeholder="请填写" />
                    )
                }
              </FormItem>
            </Col>
            <Col sm={6}>
              <FormItem
                label="登录应用"
                {...formItemLayout}
              >
                {
                    getFieldDecorator('clientName')(
                      <Select
                        name="clientName"
                        onFocus={this.getApps}
                        placeholder="请选择"
                      >
                        {
                          apps.data.map((item, index) =>
                             (<Option key={index} value={item.value}>{item.value}</Option>)
                          )
                        }
                      </Select>
                    )
                }
              </FormItem>
            </Col>
            <Col sm={6}>
              <FormItem
                label="用户IP"
                {...formItemLayout}
              >
                {
                    getFieldDecorator('userIp')(
                      <Input type="text" placeholder="请填写" />
                    )
                }
              </FormItem>
            </Col>
            <Col sm={6}>
              <FormItem
                label="标签"
                {...formItemLayout}
              >
                {
                    getFieldDecorator('userTag')(
                      <Select
                        name="userTag"
                        placeholder="请选择"
                      >
                        <Option value="1">异地登录</Option>
                        <Option value="2">频繁登录</Option>
                        <Option value="3">异常登录</Option>
                      </Select>
                    )
                }
              </FormItem>
            </Col>
            <Col sm={6}>
              <FormItem
                label="登录时间"
                {...formItemLayout}
              >
                <RangePicker
                  size="large"
                  format="YYYY-MM-DD"
                  style={{ width: '300px' }}
                  onChange={handleChange}
                />
              </FormItem>
            </Col>
            <Col sm={12} className="text-right">
              <Button
                type="primary"
                htmlType="submit"
                icon="search"
                className="margin-right-10"
              >搜索</Button>
              <Button
                onClick={this.handleReset}
                icon="close"
              >清除</Button>
            </Col>
          </Row>
        </Form>
        <Table
          loading={log.fetching}
          columns={columns}
          dataSource={log.data}
          pagination={pagination}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
Log.propTypes = {
  form: PropTypes.object,
  log: PropTypes.object,
  query: PropTypes.func,
  getApp: PropTypes.func,
  apps: PropTypes.object,
};

Log.defaultProps = {
  apps: {
    data: [],
  },
};

const mapDispatchToProps = {
  query: param => getLog(param),
  getApp: () => getAppList(),
};
const mapStateTopProps = state => ({
  log: state.log,
  apps: state.apps,
});
Log = Form.create()(Log);
export default connect(mapStateTopProps, mapDispatchToProps)(Log);
