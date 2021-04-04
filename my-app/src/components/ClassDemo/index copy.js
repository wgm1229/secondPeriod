import React, {Component} from 'react'

class ClassDemo extends Component{
  constructor(){
    super()
    this.state = {
      num:100
    }
  }
  render(){
    let {num} = this.state;
    return (
      <div>
        <h2>我是类组件，{num}</h2>
        <button onClick={()=>{
          let n = num+1
          this.setState({
            num:n
          })
        }}>按钮</button>
      </div>
    )
  }
}

export default ClassDemo