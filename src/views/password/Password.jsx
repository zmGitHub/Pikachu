import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Col, Row, Button, Form, Input, Radio, InputNumber, Checkbox, notification} from 'antd';
import {getPassword, updatePassword} from "./containers"

const _ = require("lodash");
import "./password.scss";

const STRENGTH = {
  hasUpperCase: false,
  hasLowerCase: false,
  hasNumber: false,
  hasSpecialChar: false,
  lengthFrom: 1,
  lengthTo: 1
}
const MIN = 1
const MAX = Number.MAX_VALUE

class Password extends Component {
  constructor(props) {
    super(props);
    let good =  _.extend(_.clone(STRENGTH), {strength: -1}),
        better = _.extend(_.clone(STRENGTH), {strength: 0}),
        best = _.extend(_.clone(STRENGTH), {strength: 1})
    this.state = {
      limit: {
        lengthMin: 1,
        lengthMax: 1
      },
      goodStrengthList: [good],
      betterStrengthList: [better],
      bestStrengthList: [best],
    }
    this.formSubmit = this.formSubmit.bind(this);
  } 

  componentWillMount() {
    this.props.query()
  } 
  
  componentWillReceiveProps(nextProps) {
    this.initLimit(nextProps.limit)
    this.initStrengths(nextProps.strengths)
  }

  initLimit(limit = this.state.limit) {
    this.setState({
      limit: limit
    })
  }

  initStrengths(strengths) {
    let good = [], better = [], best = []
    _.each(strengths, (strength) => {
      switch(strength.strength) {
        case -1: 
          good.push(strength)
          break
        case 0:
          better.push(strength)
          break
        case 1:
         best.push(strength)
         break
        default:
      }
    })

    if(good.length > 0) {
      this.setState({
        goodStrengthList: good
      })
    }

    if(better.length > 0) {
      this.setState({
        betterStrengthList: better
      })
    }

    if(best.length > 0) {
      this.setState({
        bestStrengthList: best
      })
    }
  }

  render () {
    return (
      <Form onSubmit={this.formSubmit} className="password-container">
        {this.renderPasswordLength()}
        {this.renderPasswordReg()}
        {this.renderPasswordStrengths()}
        {this.renderSubmit()}
      </Form>
    )
  }

  renderPasswordLength() {
    let {limit} = this.state;
    let lengthMin = limit.lengthMin ? limit.lengthMin : MIN
    let lengthMax = limit.lengthMax ? limit.lengthMax : MIN
    return (
      <div className="control-group">
        <label>密码长度配置：</label>
        <div className="group-content">
          <InputNumber size="small" min={MIN} value={lengthMin} max={MAX} onChange={this.limitLengthChange.bind(this, "lengthMin", MIN)} />位
          &nbsp;&nbsp; - &nbsp;&nbsp;
          <InputNumber size="small" min={lengthMin} max={MAX} value={lengthMax} onChange={this.limitLengthChange.bind(this, "lengthMax", lengthMin)}/>位
        </div>
      </div>
    )
  }

  limitLengthChange(name, min, value) {
    let limit = _.clone(this.state.limit)
    limit = _.extend(limit, {[name]: value || min})
    this.setState({
      limit
    })
  }

  renderPasswordReg() {
    let {limit} = this.state; 
    return (
      <div className="control-group">
        <label className="top">
          密码复杂度配置：
          <br />
          <span className={this.getRegClasss()}>（至少选择2项）</span>
        </label>
        <div className="group-content">
          <div>
            <Col span="4"><Checkbox checked={limit.hasUpperCase} onChange={this.limitRegChange.bind(this, "hasUpperCase")}>英文大写（A-Z）</Checkbox></Col>
            <Col span="20"><Checkbox checked={limit.hasLowerCase} onChange={this.limitRegChange.bind(this, "hasLowerCase")}>英文小写（a-z）</Checkbox></Col>
          </div>
          <div className="margin-top-30">
            <Col span="4"><Checkbox checked={limit.hasNumber} onChange={this.limitRegChange.bind(this, "hasNumber")}>数字（0-9）</Checkbox></Col>
            <Col span="20"><Checkbox checked={limit.hasSpecialChar} onChange={this.limitRegChange.bind(this, "hasSpecialChar")}>特殊字符（~，!，@，#，$，%，^，&，*）</Checkbox></Col>
          </div>
        </div>
      </div>
    )
  }

  getRegClasss() {
    let {hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar} = this.state.limit
    let count = this.checkTrue(hasUpperCase) + this.checkTrue(hasLowerCase) + this.checkTrue(hasNumber) + this.checkTrue(hasSpecialChar)
    if(count < 2) {
      return "error-span"
    }
  }

  checkTrue(value) {
    if(value) {
      return 1
    }
    else {
      return 0
    }
  }

  limitRegChange(name, e) {
    let limit = _.clone(this.state.limit)
    limit = _.extend(limit, {[name]: e.target.checked})
    this.setState({
      limit
    })
  }

  renderPasswordStrengths() {
    return (
      <div className="control-group">
        <label>密码强度配置：</label>
        <div className="group-content">
          <div className="items">
            <label className="good">弱</label>
            {this.renderItems(this.state.goodStrengthList, "goodStrengthList")}
          </div>
          <div className="items">
            <label className="better">中</label>
            {this.renderItems(this.state.betterStrengthList, "betterStrengthList")}
          </div>
          <div className="items">
            <label className="best">强</label>
            {this.renderItems(this.state.bestStrengthList, "bestStrengthList")}
          </div>
        </div>
      </div>
    )
  }

  renderItems(lists, name) {
    let length = lists.length;
    return (
      <div className="item-content">
        {
        lists.map((list, key) => {
           return this.renderItem(list, key, (key == length - 1), name)
          }) 
        }
      </div>
    )
  }

  renderItem(list, key, last, name) {
    let {lengthFrom, lengthTo} = list
    return (
      <div className="item" key={key}>
        <span>{key+1}.密码位数</span>
        <span className="margin-right-20">
          <InputNumber size="small" min={MIN} value={lengthFrom} max={MAX} onChange={this.strengthLengthChange.bind(this, name, key, "lengthFrom", MIN)}/>位 
          &nbsp;&nbsp; - &nbsp;&nbsp; 
          <InputNumber size="small" min={lengthFrom || MIN} max={MAX} value={lengthTo} onChange={this.strengthLengthChange.bind(this, name, key, "lengthTo", lengthFrom || MIN)}/>位
        </span>
        <span>字符项</span>
        <Checkbox checked={list.hasUpperCase} onChange={this.strengthRegChange.bind(this, name, key, "hasUpperCase")}>英文大写</Checkbox>
        <Checkbox checked={list.hasLowerCase} onChange={this.strengthRegChange.bind(this, name, key, "hasLowerCase")}>英文小写</Checkbox>
        <Checkbox checked={list.hasNumber} onChange={this.strengthRegChange.bind(this, name, key, "hasNumber")}>数字</Checkbox>
        <Checkbox checked={list.hasSpecialChar} onChange={this.strengthRegChange.bind(this, name, key, "hasSpecialChar")}>特殊字符</Checkbox>
        <span className="operate">
          {this.renderStrengthDelete(name, key, last)}
          {this.renderStrengthAdd(name, last)}
        </span>
      </div>
    )
  }

  strengthLengthChange(name, key, subKey, min, value) {
    value = value || min
    let strengthList = _.clone(this.state[name])
    let strength = strengthList[key]
    strength = _.extend(strength, {[subKey]: value})
    strengthList[key] = strength
    this.setState({
      [name]: strengthList
    })
  }

  strengthRegChange(name, key, subKey, e) {
    let strengthList = _.clone(this.state[name])
    let strength = strengthList[key]
    strength = _.extend(strength, {[subKey]: e.target.checked})
    strengthList[key] = strength
    this.setState({
      [name]: strengthList
    })
  }

  renderStrengthDelete(name, key, last) {
    if(key == 0 && last) {
      return ""
    }
    else {
      return (
        <a href="javascript:;" onClick={this.deleteStrength.bind(this, name, key)}>删除</a>
      )
    }
  }

  renderStrengthAdd(name, last) {
    if(last) {
      return (
        <a href="javascript:;" onClick={this.addStrength.bind(this, name)}>添加 </a>
      )
    }
  }

  deleteStrength(name, key) {
    let lists = _.clone(this.state[name])
    _.remove(lists, (value, index) => {
      return key == index
    })
    this.setState({
      [name]: lists
    })
  }

  addStrength(name) {
    let strength  = this.switchStength(name)
    let lists = _.clone(this.state[name])
    lists.push(_.extend(_.clone(STRENGTH), {strength}))
    this.setState({
      [name]: lists
    })
  }

  switchStength(name) {
    switch(name) {
      case "goodStrengthList":
        return -1
        break
      case "betterStrengthList":
        return 0
        break
      case "bestStrengthList":
        return 1
        break
      default:
    }
  }

  renderSubmit() {
    return (
      <div className="submits">
        <Button type="primary" htmlType="submit">保存</Button>
      </div>
    )
  }

  formSubmit(evt) {
    evt.preventDefault()
    if(this.checkLimit() && this.checkStrengths()) {
      this.formRealSubmit()
    }
  }

  formRealSubmit() {
    console.log(this.state)
    let passwordStrengthList = _.concat(this.state.goodStrengthList, this.state.betterStrengthList, this.state.bestStrengthList)
    let passwordLimit = this.state.limit
    console.log(passwordStrengthList, passwordLimit)
  }

  showNotification(message, description) {
    notification.error({
      message,
      description
    })
  }

  checkLimit() {
    let {limit} = this.state
    return this.checkLimitLength(limit) && this.checkLimitRegs(limit)
  }

  checkLimitLength(limit) {
    let {lengthMin, lengthMax} = limit
    if(lengthMax >= lengthMin) {
      return true
    }
    else {
      this.showNotification("密码长度", "输入密码长度，后面数值要大于等于前面数值哦！")
    }
  }

  checkLimitRegs() {
    if(!this.getRegClasss()) {
      return true
    }
    else {
      this.showNotification("密码规则", "密码规则最少选择两项哦！")
    }
  }

  checkStrengths() {
    return this.checkStrengthsRegs("弱密码", this.state.goodStrengthList) && this.checkStrengthsRegs("中密码", this.state.betterStrengthList) && this.checkStrengthsRegs("强密码", this.state.bestStrengthList)
  }

  checkStrengthsRegs(title, strengths) {
    let flag = true
    _.each(strengths, (strength, key) => {
      if(strength.lengthFrom > strength.lengthTo || strength.lengthTo < 1) {
        flag = false
        this.showNotification(title, `位置:第${key + 1}条，密码位数后面数值要大于等于前面数值哦！`)
      }
    })
    return flag
  }
}

Password.propTypes = {
  form: PropTypes.object,
  query: PropTypes.func,
  updatePassword: PropTypes.func,
  limit: PropTypes.object,
  strengths: PropTypes.array
};

const mapDispatchToProps = {
  query: () => getPassword(),
  update: (params) => updatePassword(params)
};

const mapStateToProps = state => ({
  limit: state.password.limit,
  strengths: state.password.strengths
});

Password = Form.create()(Password);

export default connect(mapStateToProps, mapDispatchToProps)(Password);