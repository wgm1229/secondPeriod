import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import StoreUtils from "../../utils/storeUtils";
import { Layout } from "antd";
import Header from "../../components/header";
import Aheader from "./components/header/header";
import Leftnav from "./components/leftnav/leftnav";
// import Home from "./home/home";
// import Category from "./product/category";
// import CateList from "./product/catelist";
// import CateUpdate from "./product/cateupdate";
// import Product from "./product/product";
// import User from "./user/user";
// import Role from "./role/Role";
// import Bar from "./charts/bar";
// import Pie from "./charts/pie";
// import Line from "./charts/line";
import menuList from "../../config/menuConfig";
import {connect} from 'react-redux'
const { Footer, Sider, Content } = Layout;
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeList:[]
    };
  }
  componentDidMount(){
    let arr = [];  //将菜单数据包整合成以为数组格式
    menuList.forEach(item=>{
      if(!item.children){
        arr.push(item)
      }else{
        arr = [...arr,...item.children]
      }
    })
    console.log('一维数据包',arr);
    this.setState({
      routeList:arr
    })
  }
  render() {
    // 从状态机中获取isLogin，并由此判断，是否允许用户进入管理面板 ？
    // const user = StoreUtils.getUser();
    let {isLogin} = this.props.user  //提取状态机中的登录状态
    if (!isLogin) {
      // 回到登陆页面
      return <Redirect to="/login" />;
    }
    let { role } = this.props.user.userInfo;  
    console.log('admin组件props',this.props);
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
              {/* <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/catelist" component={CateList} />
              <Route path="/cateupdate" component={CateUpdate} />
              <Route path="/product" component={Product} />
              <Route path="/user" component={User} />
              <Route path="/role" component={Role} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/line" component={Line} /> */}
              {
                
                this.state.routeList.map(item=>{
                  let bool = item.roles.includes(role)
                  return bool 
                         ?
                         <Route path={item.key} component={item.component} /> 
                         :
                         ''
                })
              }
              <Redirect from="*" to="/home" />
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = (state)=>{
  return {
    'user': state.user   //将模块化的状态机中，需要使用的user数据包提取出来，注入到当前组件的props中
  }
}
export default connect(mapStateToProps)(Admin);
