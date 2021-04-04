import React, { Component } from "react";
import "./header.css";
import logo from "../../../assets/images/logo.png";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <header className="header">
        <img src={logo} alt="" />
        <span>React项目: 后台管理系统</span>
      </header>
    );
  }
}

export default Header;
