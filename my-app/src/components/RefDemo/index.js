import React, { Component, createRef } from 'react'

export default class RefDemo extends Component {
  state = {
    msglist:[
      '你好',
      '在吗？'
    ]
  }
  myInput = React.createRef() //【1】定义获取DOM的属性对象
  myDiv = createRef()
  handleInput = (ev)=>{
    console.log(ev);
    if(ev.keyCode===13){
      let { msglist } = this.state;
      let v = this.myInput.current.value; //【3】提取input节点的value
      msglist.push(v)
      this.setState({
        msglist
      })
      this.myInput.current.value = '' //清空input的内容
    }
  }
  handleBorder=()=>{
    this.myDiv.current.style.border = '5px solid orange'
  }
  render() {
    return (
      <div>
        {/* 【2】将属性通过ref绑定给某个dom元素 */}
        <input 
          type="text" 
          ref={this.myInput} 
          onKeyUp={this.handleInput}
        />
        <div ref={this.myDiv} onClick={this.handleBorder}>
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
