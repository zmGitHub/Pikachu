import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Table, Row, Col, Button, Pagination, Modal } from 'antd';
import { getSensitive, add, del } from './containers';

const FormItem = Form.Item;
const confirm = Modal.confirm;

class Sensitive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        pageSize: 10,
        pageNo: 1,
      },
      visible: false,
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleDel = this.handleDel.bind(this);  // 删除
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentWillMount() {
    const { query } = this.props;
    const { params } = this.state;
    query(params);
  }
    // 分页条数
  onShowSizeChange(current, size) {
    const { params } = this.state;
    const { form, query } = this.props;
    params.pageSize = size;
    params.pageNo = current;
    const req = () =>
      Object.assign(params, form.getFieldsValue());
    query(req());
  }
   // 分页
  onChange(page) {
    const { params } = this.state;
    const { form, query } = this.props;
    params.pageNo = page;
    const req = () =>
       Object.assign(params, form.getFieldsValue());
    query(req());
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
    const { params } = this.state;
    const value = () =>
      Object.assign(params, form.getFieldsValue());
    query(value());
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  // 添加敏感词
  handleOk() {
    const { addPost, form, query } = this.props;
    const { params } = this.state;
    const res = {};
    res.sensitiveWord = form.getFieldsValue().sensitiveWord;
    this.props.form.validateFields((err) => {
      if (!err) {
        addPost(res).then((resp) => {
          if (resp.success) {
            const success = Modal.success({
              title: '添加成功',
            });
            setTimeout(() => success.destroy(), 2000);
            query(Object.assign(params, form.getFieldsValue()));
            this.handleCancel();
            this.props.form.resetFields();
          } else {
            const error = Modal.error({
              title: '添加失败',
              content: resp.error,
            });
            setTimeout(() => error.destroy(), 3000);
            this.handleCancel();
          }
        });
      }
    });
  }
  // 清除
  handleCancel() {
    this.props.form.resetFields();
    this.setState({
      visible: false,
    });
  }
  // 删除
  handleDel(e, param) {
    e.preventDefault();
    const { delPost } = this.props;
    confirm({
      title: '确认加入黑名单吗?',
      onOk() {
        delPost(param);
      },
      onCancel() {},
    });
  }
  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'id',
      }, {
        title: '敏感词',
        dataIndex: 'sensitiveWord',
      }, {
        title: '创建时间',
        dataIndex: 'createdAt',
      }, {
        title: '创建人',
        dataIndex: 'createdBy',
      }, {
        title: '操作',
        dataIndex: '',
        render: locked =>
          (<a href="" onClick={e => this.handleDel(e, locked.id)}>删除</a>),
      },
    ];
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };
    const addFormItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { form, sensitives } = this.props;
    const { getFieldDecorator } = form;
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
                    getFieldDecorator('word')(
                      <Input type="text" placeholder="请填写" />
                    )
                }
              </FormItem>
            </Col>
            <Col sm={6}>
              <FormItem
                label="创建人"
                {...formItemLayout}
              >
                {
                    getFieldDecorator('createdBy')(
                      <Input type="text" placeholder="请填写" />
                    )
                }
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
          columns={columns}
          dataSource={sensitives.data}
          size="middle"
          pagination={false}
          loading={sensitives.fetching}
        />
        <Row gutter={16} className="margin-top-15">
          <Col sm={12}>
            <Button htmlType="button" type="primary" onClick={this.showModal}>添加敏感词</Button>
            <Modal
              title=""
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Form horizontal style={{ marginTop: '50px' }}>
                <FormItem
                  label="添加敏感词"
                  {...addFormItemLayout}
                >
                  {
                    getFieldDecorator('sensitiveWord', {
                      rules: [{ required: true, message: '请填写要添加的敏感词' }],
                    })(
                      <Input type="text" placeholder="请填写" />
                    )
                  }
                </FormItem>
              </Form>
            </Modal>
          </Col>
          <Col sm={12}>
            <Pagination
              showSizeChanger
              defaultCurrent={1}
              total={100}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onChange}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

Sensitive.propTypes = {
  form: PropTypes.object,
  query: PropTypes.func,
  addPost: PropTypes.func,
  delPost: PropTypes.func,
  sensitives: PropTypes.object,
};
const mapDispatchToProps = {
  query: param => getSensitive(param),
  addPost: param => add(param),
  delPost: param => del(param),
};
const mapStateTopProps = state => ({
  sensitives: state.sensitive,
});
Sensitive = Form.create()(Sensitive);
export default connect(mapStateTopProps, mapDispatchToProps)(Sensitive);
