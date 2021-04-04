import React, { Component } from "react";
import { Modal } from "antd";
import { withRouter } from "react-router-dom";
import "./index.css";
import StoreUtils from "../../utils/storeUtils";
import { formateDate } from "../../utils/dateUtils";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 0, //控制弹框的显示和隐藏
      currentTime: formateDate(Date.now()),
    };
  }
  // 退出登录
  loginout = () => {
    // 弹出弹框
    this.setState({
      visible: 1,
    });
  };
  // 点击确定
  handleOk = () => {
    // 清空localstorage
    StoreUtils.removeUser();
    // 关闭弹框
    this.setState({
      visible: 0,
    });
    // 跳转到登陆页面
    this.props.history.push("/login");
  };
  // 点击取消
  handleCancel = () => {
    this.setState({
      visible: 0,
    });
  };
  // 处理时间
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({
        currentTime,
      });
    }, 1000);
  };
  // 生命周期componentDidMount
  componentDidMount() {
    // 获取当前的时间
    this.getTime();
  }
  render() {
    const user = StoreUtils.getUser(); //这里是有的，如果你没有登录，根本进不来
    const { visible, currentTime } = this.state;
    return (
      <div className="admin-header">
        <div className="admin-header-top">
          <span>欢迎{user.username}</span>&nbsp;&nbsp;&nbsp;
          <span onClick={this.loginout}>退出登录</span>
        </div>
        <div className="admin-header-bottom">当前的时间:{currentTime}</div>
        <Modal
          title="退出登录"
          visible={visible === 1}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>你确定要退出吗?</p>
        </Modal>
      </div>
    );
  }
}

export default withRouter(Header);
