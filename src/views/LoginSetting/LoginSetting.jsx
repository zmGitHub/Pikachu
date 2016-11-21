import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getTagList } from 'store/actions/tags';
import { getAppList } from 'store/actions/apps';
import {getLoginSetting, updateSetting} from "./containers"
import {Col, Row, Button, Form, Input, Radio, InputNumber} from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
import '../Register/register.scss';
import './loginSetting.scss';
const _ = require("lodash");

class LoginSetting extends Component{
  constructor(props) {
    super(props);
    this.state = {
      beforeShowVerificationCode: 3,
      beforeShowVerificationCodeDefine: 0,
      beforeFreeze: 5,
      beforeFreezeDefine: 0,
      freezeTime: 12,
      freezeTimeDefine: 0
    }
    this.loginSettingFormSubmit = this.loginSettingFormSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentWillMount() {
    this.props.query()
  }

  componentWillReceiveProps (nextProps) {
    let setting = nextProps.setting
    let define = this.getDefine(setting)
    this.setState({
      beforeShowVerificationCode: setting.beforeShowVerificationCode || 3,
      beforeShowVerificationCodeDefine: define.beforeShowVerificationCodeDefine,
      beforeFreeze: setting.beforeFreeze || 5,
      beforeFreezeDefine: define.beforeFreezeDefine,
      freezeTime: setting.freezeTime || 12,
      freezeTimeDefine: define.freezeTimeDefine
    })
  }

  getDefine(setting) {
    const beforeShowVerificationCodeLists = _.map(this.getBeforeShowVerificationCode(), list => list.value);
    const beforeFreezeLists = _.map(this.getBeforeFreeze(), list => list.value);
    const freezeTimeLists = _.map(this.getFreezeTime(), list => list.value);
    let beforeShowVerificationCodeDefine = _.indexOf(beforeShowVerificationCodeLists, setting.beforeShowVerificationCode) > -1 ? 0 : setting.beforeShowVerificationCode;
    let beforeFreezeDefine = _.indexOf(beforeFreezeLists, setting.beforeFreeze) > -1 ? 0 : setting.beforeFreeze;
    let freezeTimeDefine = _.indexOf(freezeTimeLists, setting.freezeTime) > -1 ? 0 : setting.freezeTime;
    return {beforeShowVerificationCodeDefine, beforeFreezeDefine, freezeTimeDefine};
  }

  render() {
    return (
      <div className="register-configs login-setting">
        {this.renderLoginSetting()}
      </div>
    )
  }

  renderLoginSetting() {
    return (
      <Col className="config" span="24">
        <Form onSubmit={this.loginSettingFormSubmit}>
          {
            this.renderConfigs("用户输入图形验证码的临界登录次数", this.state.beforeShowVerificationCode, "beforeShowVerificationCode", this.getBeforeShowVerificationCode(), true, this.state.beforeShowVerificationCodeDefine, "次")
          }
          {
            this.renderConfigs("用户账号被冻结的临界登录次数", this.state.beforeFreeze, "beforeFreeze", this.getBeforeFreeze(), true, this.state.beforeFreezeDefine, "次")
          }
          {
            this.renderConfigs("用户账号被冻结的时间", this.state.freezeTime, "freezeTime", this.getFreezeTime(), true, this.state.freezeTimeDefine, "小时")
          }
          <Col className="submits" span="24">
            <Button type="primary" htmlType="submit">保存</Button>
            <Button type="ghost" htmlType="button" onClick={this.reset}>重置</Button>
          </Col>
        </Form>
      </Col>
    )
  }

  reset() {
    this.setState({
      beforeShowVerificationCode: 3,
      beforeShowVerificationCodeDefine: 0,
      beforeFreeze: 5,
      beforeFreezeDefine: 0,
      freezeTime: 12,
      freezeTimeDefine: 0
    })
  }
  

  getBeforeShowVerificationCode() {
    return [
      {
        name: "3次",
        value: 3
      },
      {
        name: "5次",
        value: 5
      },
      {
        name: "7次",
        value: 7
      }
    ]
  }

  getBeforeFreeze() {
    return [
      {
        name: "5次",
        value: 5
      },
      {
        name: "7次",
        value: 7,
      },
      {
        name: "10次",
        value: 10
      }
    ]
  }

  getFreezeTime() {
    return [
      {
        name: "12小时",
        value: 12
      },
      {
        name: "24小时",
        value: 24
      },
      {
        name: "36小时",
        value: 36
      }
    ]
  }

  loginSettingFormSubmit(evt) {
    evt.preventDefault()
    let {beforeShowVerificationCode, beforeFreeze, freezeTime} = this.state
    let params = {
      beforeShowVerificationCode,
      beforeFreeze,
      freezeTime
    }
    this.props.update(params)
  }

  renderConfigs(label, value, name, lists, define, defineValue, unit) {
    return (
      <Col span="24" className="control-group">
        <Col span="5">{label}:</Col>
        <Col span="12">
          <RadioGroup value={value} onChange={this.onChange.bind(this, name)}>
            {
              lists.map(function(list, key) {
                return (<Radio key={key} value={list.value}>{list.name}</Radio>) 
              })
            }
            {
              define ? this.renderUserDefined(name, defineValue, unit) : ""
            }
          </RadioGroup>
        </Col>
      </Col>
    )
  }

  renderUserDefined(name, defineValue, unit) {
    return (
      <span>
        自定义 &nbsp;&nbsp;
        <InputNumber size="small" value={defineValue} onChange={this.defineInputChange.bind(this, name)} min={0} />
        {unit}
      </span>
    )
  }

  onChange(name, e) {
    let value = e.target.value
    this.setState({
      [name]: value,
      [`${name}Define`]: 0
    })
  }

  defineInputChange(name, value) {
    this.setState({
      [name]: value,
      [`${name}Define`]: value
    })
  }
}

LoginSetting.propTypes = {
  form: PropTypes.object,
  query: PropTypes.func,
  update: PropTypes.func,
  setting: PropTypes.object,
};

const mapDispatchToProps = {
  query: () => getLoginSetting(),
  update: (params) => updateSetting(),
};

const mapStateToProps = state => ({
  setting: state.loginsetting.setting || {}
});

LoginSetting = Form.create()(LoginSetting);

export default connect(mapStateToProps, mapDispatchToProps)(LoginSetting);