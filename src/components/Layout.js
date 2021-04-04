import React,{Component} from 'react';
import {Route,Link,Switch,withRouter} from 'react-router-dom'
import './index.css';
import Home from './Home.js'
import Contact from './Contact.js'
import Product from './Product.js'
import Login from './Login.js'
import NotFound from './NotFound.js'
let isLogin = false; //模拟登录状态的
class Layout extends Component{
	
	render(){
		console.log('Layout组件',this.props)
		return (
			<div>
				<div>
					<Link to="/home"><span>首页</span></Link>
					<Link to="/contact/13966668888"><span>联系我们</span></Link>
					<Link to="/product"><span>公司产品</span></Link>
					
				</div>
				<Switch>
					<Route path="/home" render={()=>{
						if(isLogin){
							return <Home />
						}
						return <Login />
					}}/>
					<Route path="/contact/:tel" component={Contact}/>
					<Route path="/product" component={Product}/>
					<Route path="*" component={NotFound}/>
				</Switch>
			</div>
		)
	}
}

export default withRouter(Layout)