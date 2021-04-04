import React, { Component } from 'react'
import { Menu, Icon, Button } from 'antd';
import { withRouter,Link } from 'react-router-dom';
import menuList from '../../config/menuConfig';
const { SubMenu } = Menu;

class LeftNav extends Component {
  getMenuList = (menuList)=>{
    const path = this.props.location.pathname

    return menuList.map((item)=>{
      if(!item.children){
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key} />
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Menu.Item>
        )
      }else{
        const cItem = item.children.find((cItem)=>cItem.key===path)
        if(cItem){
          this.openKey = item.key
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
        )
      }
    })
  }
  componentWillMount(){
    this.getNodes = this.getMenuList(menuList)
  }
  render() {
    const path = this.props.location.pathname
    // console.log(this.props)
    const openKey = this.openKey
    return (
      <div>        
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"          
        >
          {this.getNodes}

          {/* {this.getMenuList(menuList)} */}
          {/* <Menu.Item key="1">
            <Link to="/home" />
            <Icon type="pie-chart" />
            <span>首页</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="5">
              <Link to="/category" />
              品类管理
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/product" />
              商品管理
            </Menu.Item>
            </SubMenu>
          <Menu.Item key="2">
            <Link to="/user" />
            <Icon type="desktop" />
            <span>用户管理</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/role" />
            <Icon type="inbox" />
            <span>角色管理</span>
          </Menu.Item>
          
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>图形图表</span>
              </span>
            }
          >
            <Menu.Item key="9">
              <Link to="/charts/bar" />
              柱形图</Menu.Item>
            <Menu.Item key="10">
              <Link to="/charts/line" />
              折线图</Menu.Item>
            <Menu.Item key="11">
              <Link to="/charts/pie" />
              饼图</Menu.Item>
            
          </SubMenu> */}
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav)