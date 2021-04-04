import React, { Component } from 'react'

export default class Route extends Component {
  constructor(){
    super()
    this.state = {
      hash:''  //存放浏览器地址栏路径
    }
  }
  componentDidMount(){
    let hash = window.location.hash.split('#')[1];  //提取浏览器地址栏中的hash路径
    this.setState({hash})
    // console.log(hash);
    window.addEventListener('hashchange',()=>{
      console.log('浏览器哈希值发生了变化');
      let hash = window.location.hash.split('#')[1];  //提取浏览器地址栏中的hash路径
      this.setState({ hash })
    })
  }
  render() {
    let Comp = this.props.component;
    let path = this.props.path; //获取Route组件path路径参数
    return (
      <>
        {
          this.state.hash==path
          ?
          <Comp />
          :
          ''
        }
      </>
    )
  }
}
