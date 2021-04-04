import React, { Component } from 'react'
import './index.css'

export default class TabDemo extends Component {
  constructor(){
    super()
    this.state = {
      idx:0,
      tabs:['首页','商品','分类','新闻']
    }
  }
  handleTab=(idx)=>{
    this.setState({
      idx
    })
  }
  render() {
    let {idx,tabs} = this.state; //提取state中的状态数据
    return (
      <div>
        <ul>
          {
            tabs.map((item,index)=>{
              return (
                <li
                  className={index===idx ? 'active' : ''}
                  onClick={() => { this.handleTab(index) }} 
                  key={index}
                >
                  {item}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
