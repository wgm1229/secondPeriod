import React, { Component } from 'react'
import store from '../store'
export default class Num extends Component {
  constructor(){
    super()
    this.state = {
      num:0   //存放状态机提供的数据
    }
  }
  componentDidMount(){
    this.setState({
      num: store.getState()  //从状态机中提取初始值，并赋值给num
    })

    store.subscribe(()=>{  //订阅store中的数据变化，并触发相应的回调函数
      this.setState({
        num: store.getState()  //从状态机中提取初始值，并赋值给num
      })
    })
  }
  render() {
    return (
      <div>
        <h1>{this.state.num}</h1>
      </div>
    )
  }
}
