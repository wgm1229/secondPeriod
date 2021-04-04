import React,{Component} from 'react';

export default class Contact extends Component{
	render(){
		console.log('Contact组件',this.props)
		return <div>联系我们{this.props.match.params.tel}</div>
	}
}