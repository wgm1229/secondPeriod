import React, { Component } from 'react'
import store from '../store/index';
export default class Num extends Component {
  constructor() {
    super()
    this.state = {
      count:0
    }
  }
  componentDidMount(){
    this.setState({
      count:store.getState()
    })
    store.subscribe(()=>{
      console.log('Login组件订阅到了store的变化',store.getState())
      this.setState({
        count:store.getState()
      })
    })
  }
  render() {
    console.log(store.getState())
    return (
      <div>
        登录页面
        <button>登录{this.state.count}
      </button>
      </div>       
    )
  }
}