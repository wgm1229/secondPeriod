import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import StoreUtils from "../../utils/storeUtils";
import { Layout } from "antd";
import Header from "../../components/header";
import Aheader from "./components/header/header";
import Leftnav from "./components/leftnav/leftnav";
import Home from "./home/home";
import Category from "./product/category";
import CateList from "./product/catelist";
import CateUpdate from "./product/cateupdate";
import Product from "./product/product";
import User from "./user/user";
import Role from "./role/Role";
import Bar from "./charts/bar";
import Pie from "./charts/pie";
import Line from "./charts/line";
const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 如果user不存在或者user._id不存在，让他回到登陆页面
    // const user = StoreUtils.getUser();
    // if (!user || !user._id) {
    //   // 回到登陆页面
    //   return <Redirect to="/login" />;
    // }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <Aheader />
          <Leftnav />
        </Sider>
        <Layout>
          <Header></Header>
          <Content>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/catelist" component={CateList} />
              <Route path="/cateupdate" component={CateUpdate} />
              <Route path="/product" component={Product} />
              <Route path="/user" component={User} />
              <Route path="/role" component={Role} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/line" component={Line} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;
