import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Table, Row, Col, Button, Modal, Select, notification } from 'antd';
import { getBlack, addBlack, delBlack } from './containers';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const info = Modal.info;
const Option = Select.Option;

class Blacklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      pagination: {
        pageSize: 10,
        pageNo: 1,
      },
      mulDel: {
        userIds: [],
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.delMul = this.delMul.bind(this);   // 批量移除黑名单
    this.showModal = this.showModal.bind(this);  // modal显示
    this.onChange = this.onChange.bind(this);   // 页码改变
    this.handleCancel = this.handleCancel.bind(this);  // 关闭modal
    this.handleOk = this.handleOk.bind(this);
  }
  componentDidMount() {
    const { form, query } = this.props;
    const { pagination } = this.state;
    query(Object.assign(pagination, form.getFieldsValue()));
  }
  // 改变页码
  onChange(pagination, filters, sorter) {
    const { form, query } = this.props;
    this.setState({
      pagination: {
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
        order: sorter.order,
        field: sorter.field,
      },
    });
    const data = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      order: sorter.order,
      field: sorter.field,
    };
    const res = {
      ...form.getFieldsValue(),
      ...data,
    };
    query(res);
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
    const res = {
      ...this.state.pagination,
      ...form.getFieldsValue(),
    };
    query(res);
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  // 移出黑名单
  del(e, id) {
    e.preventDefault();
    const { delFuc } = this.props;
    const delDate = {
      userIds: [],
    };
    delDate.userIds.push(id);
    confirm({
      title: '确认移除黑名单吗?',
      onOk() {
        delFuc(delDate);
      },
      onCancel() {},
    });
  }
  // 批量移除黑名单
  delMul() {
    const { mulDel } = this.state;
    const { delFuc } = this.props;
    if (!mulDel.userIds.length) {
      info({
        title: '至少选择一个用户',
        onOk() {},
      });
    } else {
      delFuc(mulDel);
    }
  }
  // modal提交
  handleOk() {
    const { addFuc, form, query } = this.props;
    const { pagination } = this.state;
    const IP = this.refs.ip.refs.input.value;
    if (IP) {
      addFuc({ ip: IP }).then(() => {
        notification.success({
          message: '温馨提示',
          description: '添加成功',
        });
        this.handleCancel();
        query(Object.assign(pagination, form.getFieldsValue()));
        this.refs.ip.refs.input.value = '';
      });
    } else {
      notification.info({
        message: '温馨提示',
        description: 'IP不能为空',
      });
    }
  }
    // 清除
  handleCancel() {
    this.refs.ip.refs.input.value = '';
    this.setState({
      visible: false,
    });
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    const addFormItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { blacklist, form } = this.props;
    const { getFieldDecorator } = form;
    const { mulDel } = this.state;
    const columns = [
      {
        title: '用户名称',
        dataIndex: 'userName',
      }, {
        title: '用户ID',
        dataIndex: 'userId',
      }, {
        title: '用户IP',
        dataIndex: 'userIp',
      }, {
        title: '最近登录',
        dataIndex: 'loginTime',
        key: 'loginTime',
        sorter: true,
      }, {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: item =>
           (<a
             onClick={e => this.del(e, item.userId)}
             href=""
           >移除黑名单</a>)
        ,
      },
    ];
    const rowSelection = {
      onChange(selectedRowKeys, selectedRows) {
        mulDel.userIds = [];
        selectedRows.forEach((item) => {
          mulDel.userIds.push(item.userId);
        });
      },
      onSelectAll(selected, selectedRows) {
        mulDel.userIds = [];
        selectedRows.forEach((item) => {
          mulDel.userIds.push(item.userId);
        });
      },
    };
    const pagination = {
      total: blacklist.total,
      showSizeChanger: true,
    };
    return (
      <div>
        <Modal
          title=""
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <FormItem
            label="添加黑名单IP"
            {...addFormItemLayout}
            style={{ marginTop: '40px' }}
          >
            <Input type="text" ref="ip" placeholder="请填写" name="ip" />
          </FormItem>
        </Modal>
        <Form horizontal onSubmit={this.handleSubmit}>
          <Row gutter={16}>
            <Col sm={6}>
              <FormItem
                label="用户IP"
                {...formItemLayout}
              >
                {getFieldDecorator('userIp')(
                  <Input
                    type="text"
                    placeholder="请填写"
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={6}>
              <FormItem
                label="用户ID"
                {...formItemLayout}
              >
                {getFieldDecorator('userId')(
                  <Input
                    type="text"
                    placeholder="请填写"
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={6}>
              <FormItem
                label="用户名称"
                {...formItemLayout}
              >
                {getFieldDecorator('userName')(
                  <Input
                    type="text"
                    placeholder="请填写"
                  />
                )}
              </FormItem>
            </Col>
            <Col sm={6}>
              <FormItem
                label="用户类型"
                {...formItemLayout}
              >
                {getFieldDecorator('userType')(
                  <Select
                    placeholder="请填写"
                  >
                    <Option value="0">线 下</Option>
                    <Option value="1">线 上</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col sm={24} className="text-right">
              <FormItem
                span={24}
              >
                <Button
                  type="primary"
                  size="default"
                  className="margin-right-10"
                  onClick={this.showModal}
                >
                  添加黑名单
                </Button>
                <Button
                  onClick={this.delMul}
                  size="default"
                  className="margin-right-10"
                >
                  批量移除黑名单
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="default"
                  icon="search"
                  className="margin-right-10"
                >
                    搜 索
                  </Button>
                <Button
                  onClick={this.handleReset}
                  size="default"
                  icon="close"
                >
                    清 除
                  </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Table
          columns={columns}
          dataSource={blacklist.data}
          rowSelection={rowSelection}
          loading={blacklist.fetching}
          onChange={this.onChange}
          pagination={pagination}
        />
      </div>
    );
  }
}

Blacklist.propTypes = {
  form: PropTypes.object,
  query: PropTypes.func,
  blacklist: PropTypes.object,
  addFuc: PropTypes.func,
  delFuc: PropTypes.func,

};

const mapDispatchToProps = {
  query: param => getBlack(param),
  addFuc: param => addBlack(param),
  delFuc: param => delBlack(param),
};

const mapStateTopProps = state => ({
  blacklist: state.blacklist,
});

Blacklist = Form.create()(Blacklist);

export default connect(mapStateTopProps, mapDispatchToProps)(Blacklist);
