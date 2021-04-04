import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Menu, Icon, Button } from "antd";
import menuList from "../../../../config/menuConfig";
import {connect} from 'react-redux'

const { SubMenu } = Menu;
class Leftnav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getMenuList = (menuList) => {
    const path = this.props.location.pathname;
    // 在渲染菜单前，做一个权限判断
    // 1. 当前菜单对应的路由数据包中 roles数组
    // 2. 状态机中，用户角色 role    this.props.user.userInfo.role
    return menuList.map((item) => {
      if (!item.children) {
        //如果不存在子菜单，说明只有一级菜单
        let { role } = this.props.user.userInfo //当前用户的角色
        let bool = item.roles.includes(role)  //判断当前用户是否由权限访问当前菜单
        return (
          bool 
          ?
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
          : ''
        );
      } else {
        //如果有children，说明是有子菜单的
        const cItem = item.children.find((cItem) => cItem.key === path);
        if (cItem) {
          this.openKey = item.key;
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuList(item.children)}
          </SubMenu>
        );
      }
    });
  };
  // 这个生命周期函数是在render之前执行的
  componentWillMount() {
    this.getNodes = this.getMenuList(menuList);
  }
  render() {
    const path = this.props.location.pathname;
    const getNodes = this.getNodes;
    const openKey = this.openKey;
    return (
      <div>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {getNodes}
        </Menu>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    'user': state.user   //将模块化的状态机中，需要使用的user数据包提取出来，注入到当前组件的props中
  }
}
export default connect(mapStateToProps)(withRouter(Leftnav));
