import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import { browserHistory } from 'react-router';
import logImage from 'static/turbo.png';
import { loginAction } from './containers';
import './Login.scss';

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.user;
    if (!user.error && !!user.data) {
      browserHistory.push('/');
    } else {
      notification.error({
        message: '登录失败',
        description: '用户名或密码错误',
      });
    }
  }

  handleLogin(e) {
    e.preventDefault();
    const { form, login } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      login(values);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row className="login-row" type="flex" justify="space-around" align="middle">
        <Col span="8">
          <p className="login-log"><img src={logImage} alt="我是一条寻水的鱼" /></p>
          <p className="login-name">我是一条寻水的鱼</p>
          <Form onSubmit={this.handleLogin} className="login-form">
            <div className="login-fields">
              <h3>登 录</h3>
              <FormItem>
                {getFieldDecorator('nickname', {
                  rules: [{ required: true, message: '用户名不能为空' }],
                })(
                  <Input
                    addonBefore={<Icon type="user" />}
                    type="text"
                    className="login-form-user"
                    placeholder="请填写用户名"
                  />
                ) }
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '密码不能为空' }],
                })(
                  <Input
                    addonBefore={<Icon type="lock" />}
                    type="password"
                    placeholder="请填写密码"
                  />
                ) }
              </FormItem>
              <FormItem className="login-form-tool">
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox> 记住密码</Checkbox>
                ) }
                <a className="login-form-forgot pull-right">忘记密码</a>
              </FormItem>
            </div>
            <Button type="primary" htmlType="submit" className="login-form-button">
              立即登录
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}
Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.func,
};
const mapDispatchToProps = {
  login: param => loginAction(param),
};

const mapStateTopProps = state => ({
  user: state.user,
});

Login = Form.create()(Login);
export default connect(mapStateTopProps, mapDispatchToProps)(Login);
