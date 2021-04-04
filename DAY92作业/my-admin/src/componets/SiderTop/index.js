import React, { Component } from 'react'
import logo from '../../assets/images/logo.png'
import './index.css'

export default class SiderTop extends Component {
  render() {
    return (
      <div className="siderHeader">
        <img src={logo} alt=""></img>
        <span>管理后台</span>
      </div>
    )
  }
}
