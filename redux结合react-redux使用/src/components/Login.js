import React, { Component } from 'react'
import {connect} from 'react-redux'
class Login extends Component {
	
	render() {
		return (
			<div>
				登录页面
				<button>点击登录{this.props.count}</button>
			</div>
		)
	}
}

const mapStateToProps = (state) => { //此处的state就是Provider注入的store提供的数据
	return {  //return的内容，就是设置给Num组件的props
		count: state
	}
}

export default connect(mapStateToProps)(Login)
