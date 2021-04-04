import React,{Component} from 'react';
import {Route,Link} from 'react-router-dom'
import Prod1 from './Prod/Prod1.js'
import Prod2 from './Prod/Prod2.js'
import Prod3 from './Prod/Prod3.js'

export default class Product extends Component{
	handleTab = (target)=>{
		// console.log(target,this.props)
		// 方法1: 不需要参数传递的时候使用
		// this.props.history.push(target)
		
		// 方法2: 编程式导航传参
		this.props.history.push({
			pathname:target,
			state:{
				id:6666,
				title:'Hello'
			}
		})
	}
	render(){
		return (
			<div>
				主产品页面
				<div>
					<span onClick={()=>{this.handleTab('/product')}}>产品1</span>
					<span onClick={()=>{this.handleTab('/product/prod2')}}>产品2</span>
					<span onClick={()=>{this.handleTab('/product/prod3')}}>产品3</span>
				</div>
				<Route path="/product" exact component={Prod1}/>
				<Route path="/product/prod2" component={Prod2}/>
				<Route path="/product/prod3" component={Prod3}/>
			</div>
		)
	}
}