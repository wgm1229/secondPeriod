import React, { Component } from 'react'
import store from '../store/index.js'
export default class Login extends Component {
	constructor() {
		super()
		this.state = {
			count: 0
		}
	}
	componentDidMount() {
		this.setState({
			count: store.getState()  //提取状态机中初始化数据，设置给当前组件的state数据包
		})
		store.subscribe(() => {
			console.log('Num组件订阅到了数据的变化', store.getState());
			this.setState({
				count: store.getState()  //提取状态机中新数据，设置给当前组件的state数据包
			})
		})
	}
	render() {
		// console.log(store.getState());
		return (
			<div>
				登录页面
				<button>点击登录{this.state.count}</button>
			</div>
		)
	}
}
