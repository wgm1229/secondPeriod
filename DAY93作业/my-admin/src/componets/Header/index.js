import React, { Component } from 'react'
import './index.css'
import StoreUtils from "../../utils/storeUtils";
import { Modal, Button } from 'antd';
import {withRouter} from "react-router-dom"
import {formateDate} from "../../utils/dateUtils"
import {connect} from 'react-redux'
import {loginFail} from '../../action/index'
class HeaderC extends Component {
  state = {
    visible:0,
    currentTime:formateDate(Date.now())
  }
  loginOut=()=>{
    this.setState({
      visible:1
    })
    console.log('visible',this.state.visible)
  }
  showModal = () => {
    
  };

  handleOk = () => {
    this.props.loginFail()
    this.setState({
      visible:0
    })
    this.props.history.push("/")
  };

  handleCancel = () => {
    this.setState({
      visible:0
    })
  };
  updateTime=()=>{
    setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({
        currentTime
      })
    }, 1000);
  }
  componentDidMount(){
    this.updateTime()
  }
  render() {
    const user = StoreUtils.getUser()
    const {visible,currentTime} = this.state
    return (
      <div>
        <div className="header-top">
          <span>欢迎:{user.username}</span>&nbsp;&nbsp;
          {/* <span>欢迎:</span>&nbsp;&nbsp; */}
          <span onClick={this.loginOut}>退出登录</span>
        </div>
        <div className="header-bttom">
          当前时间:{currentTime}
        </div>
        <Modal
          visible={visible === 1}
          title="退出登录"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary"  onClick={this.handleOk}>
              确定
            </Button>,
          ]}
        >
          <p>你确定要退出吗？</p>
          
        </Modal>
      </div>
    )
  }
}

export default connect(null, {loginFail})(withRouter(HeaderC))