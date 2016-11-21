import React, { PropTypes } from 'react';
import { Card, Row, Col, Modal, Table } from 'antd';
import './client.scss';

const server = [
  {
    title: '服务类型',
    dataIndex: 'serverType',
    key: 'serverType',
  },
  {
    title: '预约时间',
    dataIndex: 'appointment',
    key: 'appointment',
  },
  {
    title: '服务时间',
    dataIndex: 'serverTime',
    key: 'serverTime',
  },
  {
    title: '服务消费',
    dataIndex: 'serverConsume',
    key: 'serverConsume',
  },
  {
    title: '满意程度',
    dataIndex: 'evaluate',
    key: 'evaluate',
  },
];
const useLog = [
  {
    title: '使用频率',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: '使用人',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: '启用时间',
    dataIndex: 'startTime',
    key: 'startTime',
  },
  {
    title: '使用时长',
    dataIndex: 'timer',
    key: 'timer',
  },
];

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      id: '',
    };
    this.showModal = this.showModal.bind(this);    // 打开modal
    this.closeModal = this.closeModal.bind(this);  // 关闭modal
    this.onChange = this.onChange.bind(this);  // moddal 中的分页
  }
  // 监听分页
  onChange(pagination) {
    const { handleDetail } = this.props;
    const res = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      id: this.state.id,
      serverInfo: false,
    };
    handleDetail(res);
  }
  // 弹出modal
  showModal(e, id) {
    e.preventDefault();
    const { handleDetail } = this.props;
    this.setState({
      visible: true,
      id,
    });
    const res = {
      pageNo: 1,
      pageSize: 5,
      serverInfo: true,
    };
    handleDetail(Object.assign(res, { id }));
  }
  // 关闭modal
  closeModal() {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { client, useLogs, servers } = this.props;
    const pagination = {
      total: useLogs.total,
      showSizeChanger: true,
    };
    return (
      <Card className="client">
        <h3>我的设备</h3>
        <Row gutter={16} className="client-row" >
          {
            client.length ?
            client.map((item, index) =>
              (
                <Col sm={8} className="client-col" key={index}>
                  <p>
                    {
                      item.channel === '网器' ?
                        <span className="client-channel">{item.channel}</span>
                      : <span className="client-channel-no">{item.channel}</span>

                    }
                  </p>
                  <img src={item.picture} alt="暂无图片" />
                  <p>{item.type}</p>
                  <p><span>{item.location}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    {
                      item.status === '在线' ? <span className="online">{item.status}</span>
                      : <span className="offline">{item.status}</span>}
                  </p>
                  <p>
                    <a
                      href=""
                      className="client-detail"
                      onClick={e => this.showModal(e, item.id)}
                    >
                      设备详情
                    </a>
                  </p>
                  <p><span>管理员：</span>{item.admin}</p>
                  <p><span>成员：</span>{item.member}</p>
                </Col>
              )
            ) : <Col sm={24} className="text-center">暂无设备</Col>
          }
          <Modal
            title=""
            visible={this.state.visible}
            onCancel={this.closeModal}
            onOk={this.closeModal}
            className="detail-modal"
          >
            <p>设备服务信息</p>
            <Table
              columns={server}
              pagination={false}
              size="middle"
              className="server-table"
              dataSource={servers}
            />
            <hr />
            <p>设备使用日志</p>
            <Table
              columns={useLog}
              pagination={pagination}
              onChange={this.onChange}
              size="middle"
              className="log-table"
              defaultCurrent={1}
              dataSource={useLogs.data}
            />
          </Modal>
        </Row>
      </Card>
    );
  }
}
Client.propTypes = {
  client: PropTypes.array,
  handleDetail: PropTypes.func,
  useLogs: PropTypes.object,
  servers: PropTypes.array,
};
export default Client;
