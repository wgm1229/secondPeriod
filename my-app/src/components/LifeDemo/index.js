import React, { Component } from 'react'
import axios from 'axios'
import './index.css'
export default class LifeDemo extends Component {
  constructor(){
    super()
    this.state = {
      num: 110,
      banner:[]
    }
    console.log('函数的constructor执行');
    
  }
  componentDidMount(){ //用以初始化加载数据包
    console.log('组件初次渲染');
    let url = 'https://shopapi.smartisan.com/product/home'
    axios.get(url).then(res=>{
      console.log(res);
      this.setState({
        banner: res.data.data.home_carousel
      })
    })
  }
  componentDidUpdate(){
    console.log('组件更新');
  }
  componentWillUnmount() {
    console.log('组件即将卸载');
  }
  render() {
    console.log('函数的render执行');
    let {num,banner} = this.state
    return (
      <div>
        <button onClick={()=>{
          this.setState({
            num:num+1
          })
        }}>按钮:{num}</button>
        {
          banner.map((item,index)=>{
            return <img src={item.image[0]} key={index} alt=""/>
          })
        }
      </div>
    )
  }
}
