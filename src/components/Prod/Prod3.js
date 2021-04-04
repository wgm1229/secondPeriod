import React,{Component} from 'react';

export default class Prod3 extends Component{
	render(){
		console.log('Prod3组件',this.props)
		return <div>3号产品</div>
	}
}