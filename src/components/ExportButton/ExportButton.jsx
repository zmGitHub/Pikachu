import { Button, Icon, message } from 'antd';
import React, { Component, PropTypes } from 'react';

class ExportButton extends Component {
  constructor(props) {
    super(props);
    this.exportTable = this.exportTable.bind(this);
    this.exportValues = this.exportValues.bind(this);
  }
  exportTable() {
    const { onClick } = this.props;
    onClick(this.exportValues);
  }

  exportValues(values) {
    const { url } = this.props;
    const obj = values;
    let href = url;
    let i = 0;
    let warn = true;
    for (const attr of Object.keys(obj)) {
      if (!!attr && !!obj[attr]) {
        warn = false;
        if (i === 0) {
          href = `${href}?${attr}=${obj[attr]}`;
        } else {
          href = `${href}?${attr}=${obj[attr]}`;
        }
        i += 1;
      }
    }
    if (warn) {
      message.warning('查询条件不能为空');
      return;
    }
    window.location.href = href;
  }


  render() {
    return (
      <Button type="primary" onClick={this.exportTable} className="margin-right-10">
        <Icon type="download" />
        导 出
      </Button>
    );
  }
}

ExportButton.propTypes = {
  onClick: PropTypes.func,
  url: PropTypes.string,
};


export default ExportButton;


