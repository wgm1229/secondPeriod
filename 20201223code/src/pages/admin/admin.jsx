import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import StoreUtils from "../../utils/storeUtils";
import { Layout } from "antd";
import Header from "../../components/header";
const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // 如果user不存在或者user._id不存在，让他回到登陆页面
    const user = StoreUtils.getUser();
    if (!user || !user._id) {
      // 回到登陆页面
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>Sider</Sider>
        <Layout>
          <Header></Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;
