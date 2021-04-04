import React, { Component } from 'react'
import store from '../../store/index.js' 
export default class Num extends Component {
  constructor(){
    super()
    this.state = {
      count:0
    }
  }
  componentDidMount(){
    this.setState({
      count:store.getState()  //提取状态机中初始化数据，设置给当前组件的state数据包
    })
    store.subscribe(()=>{
      console.log('Num组件订阅到了数据的变化',store.getState());
      this.setState({
        count: store.getState()  //提取状态机中新数据，设置给当前组件的state数据包
      })
    })
  }
  render() {
    // console.log(store.getState());
    return (
      <div>
        <h2>{this.state.count}</h2>
      </div>
    )
  }
}
