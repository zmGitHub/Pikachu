import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getTagList } from 'store/actions/tags';
import { getAppList } from 'store/actions/apps';
import {Col, Row, Button, Form, Input, Radio, InputNumber} from 'antd';
import { getSmsConfig, getEmailConfig, updateSmsConfig, updateEmailConfig} from "./containers"

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

import './register.scss';
const _ = require("lodash");

class Register extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isMessageConfig: true,
      validateMessageCodeTime: 30,
      validateMessageCodeTimeDefine: 0,
      reMessageGapTime: 30,
      reMessageGapTimeDefine: 0,
      personGainMessageCount: 5,
      personGainMessageCountDefine: 0,
      validateLinkEmailExpiry: 12,
      validateLinkEmailExpiryDefine: 0,
    }
    this.messageFormSubmit = this.messageFormSubmit.bind(this);
    this.emailFormSubmit = this.emailFormSubmit.bind(this);
    this.resetMessage = this.resetMessage.bind(this);
    this.resetEmail = this.resetEmail.bind(this);
  }

  componentWillMount() {
    const { query, getEmailConfig } = this.props;
    query();
    getEmailConfig();
  }

  componentWillReceiveProps (nextProps) {
    let sms = nextProps.sms,
        email = nextProps.email
    let smsDefine = this.getSmsDefine(sms)
    let emailDefine = this.getEmailDefine(email)
    this.setState({
      isMessageConfig: sms.needCheck == 0 ? false : true,
      validateMessageCodeTime: sms.effectiveTime || 30,
      reMessageGapTime: sms.reSendInterval || 30,
      personGainMessageCount: sms.maxSendTimesPerDay || 5,
      validateLinkEmailExpiry: email.effectiveTime || 12,
      validateMessageCodeTimeDefine: smsDefine.validateMessageCodeTimeDefine,
      reMessageGapTimeDefine: smsDefine.reMessageGapTimeDefine,
      personGainMessageCountDefine: smsDefine.personGainMessageCountDefine,
      validateLinkEmailExpiryDefine: emailDefine.validateLinkEmailExpiryDefine
    })
  }

  getSmsDefine(sms) {
    const validateMessageCodeTimeLists = _.map(this.getValidateMessageCodeTime(), list => list.value);
    const reMessageGapTimeLists = _.map(this.getReMessageGapTime(), list => list.value);
    const personGainMessageCountList = _.map(this.getPersonGainMessageCount(), list => list.value);
    let validateMessageCodeTimeDefine = _.indexOf(validateMessageCodeTimeLists, sms.effectiveTime) > -1 ? 0 : ms.effectiveTime;
    let reMessageGapTimeDefine = _.indexOf(reMessageGapTimeLists, sms.reSendInterval) > -1 ? 0 : sms.reSendInterval;
    let personGainMessageCountDefine = _.indexOf(personGainMessageCountList, sms.maxSendTimesPerDay) > -1 ? 0 : sms.maxSendTimesPerDay;
    return {validateMessageCodeTimeDefine, reMessageGapTimeDefine, personGainMessageCountDefine};
  }

  getEmailDefine(email) {
    const validateLinkEmailExpiryList = _.map(this.getValidateLinkEmailExpiry(), list => list.value);
    let validateLinkEmailExpiryDefine = _.indexOf(validateLinkEmailExpiryList, email.effectiveTime) > -1 ? 0 : email.effectiveTime;
    return {validateLinkEmailExpiryDefine}
  }

  render() {
    return (
      <div className="register-configs">
        {this.renderMessageConfig()}
        {this.renderEmailConfig()}
      </div>
    )
  }

  resetMessage() {
    this.setState({
      isMessageConfig: true,
      validateMessageCodeTime: 30,
      validateMessageCodeTimeDefine: 0,
      reMessageGapTime: 30,
      reMessageGapTimeDefine: 0,
      personGainMessageCount: 5,
      personGainMessageCountDefine: 0,
      validateLinkEmailExpiry: 12
    })
  }

  //短信配置
  renderMessageConfig() {
    return (
      <Col className="config" span="24">
        <h3>注册短信验证配置</h3>
        <Form onSubmit={this.messageFormSubmit}>
          {
            this.renderConfigs("是否需要注册短信验证", this.state.isMessageConfig, "isMessageConfig", this.getMessageConfig())
          }
          {
            this.renderConfigs("短信验证码有效时间", this.state.validateMessageCodeTime, "validateMessageCodeTime", this.getValidateMessageCodeTime(), true, this.state.validateMessageCodeTimeDefine, "秒")
          }
          {
            this.renderConfigs("重获短信验证间隔时间", this.state.reMessageGapTime, "reMessageGapTime", this.getReMessageGapTime(), true, this.state.reMessageGapTimeDefine, "秒 ")
          }
          {
            this.renderConfigs("单人单天验证码发送次数", this.state.personGainMessageCount, "personGainMessageCount", this.getPersonGainMessageCount(), true, this.state.personGainMessageCountDefine, "次")
          }
          <Col className="submits" span="24">
            <Button type="primary" htmlType="submit">保存</Button>
            <Button type="ghost" htmlType="button" onClick={this.resetMessage}>重置</Button>
          </Col>
        </Form>
      </Col>
    )
  }

  //初始化短信配置
  getMessageConfig() {
    return [
      {
        name: "是",
        value: true
      },
      {
        name: "否",
        value: false
      }
    ]
  }

  //短信验证码有效时间
  getValidateMessageCodeTime() {
    return [
      {
        name: "30s",
        value: 30
      },
      {
        name: "60s",
        value: 60
      },
      {
        name: "90s",
        value: 90
      }
    ]
  }

  //重新获取短信间隔时间
  getReMessageGapTime() {
    return [
      {
        name: "30s",
        value: 30
      },
      {
        name: "60s",
        value: 60
      },
      {
        name: "90s",
        value: 90
      }
    ]
  }

  getPersonGainMessageCount() {
    return [
      {
        name: "5次",
        value: 5
      },
      {
        name: "10次",
        value: 10
      },
      {
        name: "20次",
        value: 20
      }
    ]
  }

  //短信更新配置
  messageFormSubmit(evt) {
    evt.preventDefault()
    let params = {
      needCheck: this.state.isMessageConfig ? 1 : 0,
      effectiveTime: this.state.validateMessageCodeTime,
      reSendInterval: this.state.reMessageGapTime,
      maxSendTimesPerDay: this.state.personGainMessageCount
    }
    this.props.updateSmsConfig(params)
  }

  //邮件配置
  renderEmailConfig() {
    return (
      <Col className="config" span="24">
        <h3>注册邮件配置</h3>
        <Form onSubmit={this.emailFormSubmit}>
          {
            this.renderConfigs("邮箱验证链接有效时间", this.state.validateLinkEmailExpiry, "validateLinkEmailExpiry", this.getValidateLinkEmailExpiry(), true, this.state.validateLinkEmailExpiryDefine, "小时")
          }
          <Col className="submits" span="24">
            <Button type="primary" htmlType="submit">保存</Button>
            <Button type="ghost" htmlType="button" onClick={this.resetEmail}>重置</Button>
          </Col>
        </Form>
      </Col>
    )
  }

  resetEmail() {
    this.setState({
      validateLinkEmailExpiry: 12,
      validateLinkEmailExpiryDefine: 0,
    })
  }

  getValidateLinkEmailExpiry() {
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
        name: "48小时",
        value: 48
      }
    ]
  }

  emailFormSubmit(evt) {
    evt.prevenetDefault()
    let params = {
      effectiveTime: this.state.validateLinkEmailExpiry
    }
    this.props.updateSmsConfig(params)
  }

  renderConfigs(label, value, name, lists, define, defineValue, unit) {
    return (
      <Col span="24" className="control-group">
        <Col span="4">{label}:</Col>
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

Register.propTypes = {
  form: PropTypes.object,
  query: PropTypes.func,
  getEmailConfig: PropTypes.func,
  updateEmailConfig: PropTypes.func,
  updateSmsConfig: PropTypes.func,
  sms: PropTypes.object,
  email: PropTypes.object,
  getTag: PropTypes.func,
  getApp: PropTypes.func,
  tags: PropTypes.object,
  apps: PropTypes.object,
};

const mapDispatchToProps = {
  query: param => getSmsConfig(param),
  getEmailConfig: () => getEmailConfig(), 
  updateEmailConfig: (params) => updateEmailConfig(params),
  updateSmsConfig: (params) => updateSmsConfig(params),
  getTag: () => getTagList(),
  getApp: () => getAppList(),
};

const mapStateToProps = state => ({
  sms: state.register.sms || {},
  email: state.register.email || {},
  tags: state.tags,
  apps: state.apps,
});

Register = Form.create()(Register);

export default connect(mapStateToProps, mapDispatchToProps)(Register);

