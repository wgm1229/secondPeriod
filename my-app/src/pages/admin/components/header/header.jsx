import React from "react";
import logo from "../../../../assets/images/logo.png";
import "./header.css";
/*
  header组件
*/
export default function Header() {
  return (
    <header className="aheader">
      <img src={logo} alt="" />
      <span>管理后台</span>
    </header>
  );
}
