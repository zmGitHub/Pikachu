import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getTagList } from 'store/actions/tags';
import { getAppList } from 'store/actions/apps';
import { Table, Col, Row, Button, Form, Modal, Input, DatePicker, Select, Pagination } from 'antd';
import { getSearch, freeze, unFreeze } from './containers';
import '../search.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const confirm = Modal.confirm;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        pageSize: 10,
        pageNo: 1,
      },
      selectedTag: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);   // 搜索
    this.handleReset = this.handleReset.bind(this);    // 清除
    this.handleTag = this.handleTag.bind(this);    // 监听用户选中标签
    this.handleFreeze = this.handleFreeze.bind(this);  // 冻结用户
    this.handleUnfreeze = this.handleUnfreeze.bind(this);  // 解冻用户
    this.handleChange = this.handleChange.bind(this);  // 日期监听
    this.onChange = this.onChange.bind(this);   // 分页
    this.getTags = this.getTags.bind(this);   // 监听标签获取
    this.getApps = this.getApps.bind(this);   // 监听应用获取
  }
  componentWillMount() {
    const { form, query } = this.props;
    query(form.getFieldsValue());
  }
  // 分页,排序
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
      ...data,
    };
    query(res);
  }
  // 获取标签
  getTags() {
    const { getTag, tags } = this.props;
    if (!tags.data.length) {
      getTag();
    }
  }
  // 获取登录应用
  getApps() {
    const { getApp, apps } = this.props;
    if (!apps.data.length) {
      getApp();
    }
  }
  // 获取标签
  handleTag(value) {
    this.setState({
      selectedTag: value,
    });
  }
  // 冻结
  handleFreeze(e, id) {
    e.preventDefault();
    const { frozen } = this.props;
    confirm({
      title: '确认冻结此用户吗?',
      onOk() {
        frozen(id);
      },
      onCancel() {},
    });
  }
  // 解冻
  handleUnfreeze(e, id) {
    e.preventDefault();
    const { unFrozen } = this.props;
    confirm({
      title: '确认解冻此用户吗?',
      onOk() {
        unFrozen(id);
      },
      onCancel() {},
    });
  }
  handleChange(dates, dateStrings) {
    this.setState({
      date: {
        loginDateFrom: dateStrings[0],
        loginDateTo: dateStrings[1],
      },
    });
  }
    // 清除
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }
  // 搜索
  handleSubmit(e) {
    e.preventDefault();
    const { date } = this.state;
    const { form, query } = this.props;
    const res = {
      ...this.state.pagination,
      ...date,
      ...form.getFieldsValue(),
    };
    query(res);
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    const { form, users, tags, apps } = this.props;
    const { getFieldDecorator } = form;
    const { selectedTag } = this.state;
    const columns = [
      {
        title: '用户名称',
        dataIndex: '',
        render: (row) => {
          const lock = row.locked;
          return lock ?
            <span><span className="freeze-text">冻</span><span className="freeze-text-relative">{row.username}</span></span>
          : <span className="freeze-text-relative">{row.username}</span>;
        },
      }, {
        title: '用户ID',
        dataIndex: 'userId',
      }, {
        title: '应用名称',
        dataIndex: 'clientName',
      }, {
        title: '用户积分',
        dataIndex: 'pointScore',
      }, {
        title: '累计冻结积分',
        dataIndex: 'freezePointScore',
      }, {
        title: '注册时间',
        dataIndex: 'registerDate',
        // sorter: true,
      }, {
        title: '最近登录',
        dataIndex: 'lastLogin',
        // sorter: true,
      }, {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (row) => {
          const lock = row.locked;
          const id = row.userId;
          return lock ?
            <span>
              <Link to={`/search/detail/${row.userId}`} className="margin-right-10">用户详情</Link>
              <a href="" onClick={e => this.handleUnfreeze(e, id)}>解冻</a>
            </span>
            : <span>
              <Link to={`/search/detail/${row.userId}`} className="margin-right-10">用户详情</Link>
              <a href="" onClick={e => this.handleFreeze(e, id)}>冻结</a>
            </span>;
        },
      },
    ];
    const pagination = {
      total: users.total || 0,
      showSizeChanger: true,
    };
    return (
      <div>
        <Form horizontal onSubmit={this.handleSubmit}>
          <Row type="flex" align="middle" justify="space-around" gutter={16}>
            <Col sm={6}>
              <FormItem
                label="用户名称"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('userName')(
                    <Input type="text" placeholder="请输入" />
                  )
                }
              </FormItem>
            </Col>
            <Col sm={6}>
              <FormItem
                label="应用名称"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('clientName')(
                    <Select
                      name="clientName"
                      onFocus={this.getApps}
                      placeholder="请选择"
                      notFoundContent="暂无数据"
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
                label="用户ID"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('userId')(
                    <Input type="text" placeholder="请输入" />
                  )
                }
              </FormItem>
            </Col>
            <Col sm={6}>
              <FormItem
                label="用户分类"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('type')(
                    <Select
                      name="type"
                      placeholder="请选择"
                    >
                      <Option value="0">线下</Option>
                      <Option value="1">线上</Option>
                    </Select>
                  )
                }
              </FormItem>
            </Col>
            <Col sm={6} className="display-none">
              <FormItem
                label="用户标签"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('userTag')(
                    <Select
                      multiple
                      name="userTag"
                      onFocus={this.getTags}
                      placeholder="请选择"
                      notFoundContent="暂无数据"
                      onChange={this.handleTag}
                    >
                      {
                        tags.data.map((item, index) =>
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
                label="注册时间"
                {...formItemLayout}
              >
                <RangePicker
                  size="large"
                  showtime
                  format="YYYY-MM-DD"
                  onChange={this.handleChange}
                  style={{ width: '300px' }}
                />
              </FormItem>
            </Col>
            <Col sm={18} className="text-right">
              <Button
                type="primary"
                htmlType="submit"
                icon="search"
                className="margin-right-10"
              >
               搜 索
              </Button>
              <Button icon="close" onClick={this.handleReset}>
               清 除
              </Button>
            </Col>
          </Row>
          <Row gutter={16} className="display-none">
            <Col sm={6}>
              <FormItem
                label="所选标签"
                {...formItemLayout}
              >
                <div style={{ width: '600px' }}>
                  {
                    selectedTag.length ?
                    selectedTag.map((item, index) =>
                      <Button
                        key={index}
                        type="primary"
                        size="small"
                        className="border-radius margin-right-20"
                      >
                        {item}
                      </Button>
                    ) : '未选择'
                  }
                </div>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Table
          columns={columns}
          loading={users.fetching}
          pagination={pagination}
          dataSource={users.data}
          onChange={this.onChange}
          className="search-table"
        />
      </div>
    );
  }
}

Search.propTypes = {
  form: PropTypes.object,
  query: PropTypes.func,
  frozen: PropTypes.func,
  unFrozen: PropTypes.func,
  users: PropTypes.object,
  getTag: PropTypes.func,
  getApp: PropTypes.func,
  tags: PropTypes.object,
  apps: PropTypes.object,
};
const mapDispatchToProps = {
  query: param => getSearch(param),
  frozen: param => freeze(param),
  unFrozen: param => unFreeze(param),
  getTag: () => getTagList(),
  getApp: () => getAppList(),
};
const mapStateTopProps = state => ({
  users: state.search,
  tags: state.tags,
  apps: state.apps,
});
Search = Form.create()(Search);

export default connect(mapStateTopProps, mapDispatchToProps)(Search);

