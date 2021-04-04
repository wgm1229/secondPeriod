import React, { Component } from 'react'
import { Redirect,Switch,Route} from 'react-router-dom';
import StoreUtils from "../../utils/storeUtils";
import { Layout } from 'antd';
import HeaderC from '../../componets/Header';
import SiderTop from '../../componets/SiderTop';
import LeftNav from '../../componets/LeftNav';
// import Home from './Home';
// import Category from './Product/Category';
// import CateList from './Product/CateList';
// import Cateupdate from './Product/Cateupdate';
// import Role from './Role';
// import User from './User';
// import Bar from './Charts/Bar';
// import Line from './Charts/Line';
// import Pie from './Charts/Pie';
// import Order from './Order';
import { connect } from 'react-redux';
import { loginStart, loginActSync } from '../../action/index';
import menuList from '../../config/menuConfig'

const {  Footer, Sider, Content } = Layout;

class Admin extends Component {
    state = {
        routeList:[]
    }
    componentDidMount(){
        let arr = []
        menuList.forEach(item=>{
            if(!item.children){
                arr.push(item)
            }else{
                arr=[...arr,...item.children]
            }
        })
        console.log('routeList数据包',arr)
        this.setState({
            routeList:arr
        })
    }
    render() {
        let {isLogin} = this.props.user

        if (!isLogin) {
            return <Redirect to="/login" />
        }
        let {role} = this.props.user.userInfo
        console.log('admin组件props',this.props)
        return (
            
            <Layout style={{height:"100%"}}>
                <Sider>
                    <SiderTop />
                    <LeftNav />
                </Sider>
                <Layout>
                    <HeaderC></HeaderC>
                    <Content>
                        <Switch>
                            {/* <Route path="/home" component={Home} />
                            <Route path="/category" component={Category} />
                            <Route path="/catelist" component={CateList} />
                            <Route path="/cateupdate" component={Cateupdate} />
                            <Route path="/role" component={Role} />
                            <Route path="/user" component={User} />
                            <Route path="/charts/bar" component={Bar} />
                            <Route path="/charts/line" component={Line} />
                            <Route path="/charts/pie" component={Pie} />
                            <Route path="/order" component={Order} /> */}

                            {
                                this.state.routeList.map(item=>{
                                    let bool = item.roles.includes(role)
                                    return  bool
                                            ?
                                            <Route path={item.key} component={item.component} /> 
                                            :''
                                })
                            }
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
            
            
        )
    }
}
const mapStateToProps = (state) => {
    return {
        'user': state.user
    }
}
export default connect(mapStateToProps)(Admin)