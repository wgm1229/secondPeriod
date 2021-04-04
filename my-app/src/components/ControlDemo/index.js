import React, { Component } from 'react'

export default class RefDemo extends Component {
  state = {
    msglist:[
      '你好',
      '在吗？'
    ],
    msg:'input默认数据' //【1】定义input同步展示的数据
  }
  handleInput = (ev)=>{ //【4】提取最新的msg，等同于提取最新的input内容，进行使用
    console.log(ev);
    if(ev.keyCode===13){
      let {msg,msglist} = this.state;
      this.setState({
        msglist:[
          ...msglist,  //展开旧数据包内容
          msg   //新数据内容
        ],
        msg:''   //清空input显示的value值
      })

    }
  }
  handleChange=(ev)=>{ //【3】只负责修改msg，从而引发input显示变化
    this.setState({
      msg:ev.target.value
    })
  }
  render() {
    return (
      <div>
        {/* 【2】通过value展示msg */}
        <input 
          type="text" 
          value={this.state.msg} 
          onChange={this.handleChange}
          onKeyUp={this.handleInput}
        />
        <div>
          {
            this.state.msglist.map((item,index)=>{
              return <h4 key={index}>{item}</h4>
            })
          }
        </div>
      </div>
    )
  }
}
