import React, { Component } from 'react'
import Cont1 from './Cont1'
import Cont2 from './Cont2'
import './index.css'

export default class TabDemo extends Component {
  constructor(){
    super()
    this.state = {
      isActive:true
    }
  }
  handleTab=(isActive)=>{
    this.setState({
      isActive
    })
  }
  render() {
    let {isActive} = this.state; //提取state中的状态数据
    return (
      <div>
        <ul>
          <li 
            className={isActive?'active':''} 
            onClick={() => { this.handleTab(true) }}
          >
            菜单1
          </li>
          <li 
            className={!isActive ? 'active' : ''}
            onClick={() => { this.handleTab(false) }}
          >
            菜单2
          </li>
        </ul>
        {
          isActive ? <Cont1 /> : <Cont2 />
        }
      </div>
    )
  }
}
