import React, {Component} from 'react'

class ClassDemo extends Component{
  constructor(){
    super()
    this.state = {
      num:100
    }
    // this.handlePlus = this.handlePlus.bind(this) //修正普通事件函数内部this指向
  }
  // 方法1: 需要修正this指向
  // handlePlus(){
  //   let n = this.state.num + 1
  //   this.setState({
  //     num: n
  //   })
  // }
  // 方法2：
  handlePlus=()=>{
    let n = this.state.num + 1
    this.setState({
      num: n
    })
  }
  render(){
    let {num} = this.state;
    return (
      <div>
        <h2>我是类组件，{num}</h2>
        <button onClick={this.handlePlus}>按钮</button>
      </div>
    )
  }
}

export default ClassDemo