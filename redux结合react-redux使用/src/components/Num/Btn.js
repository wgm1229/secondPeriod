import React, { Component } from 'react'
import {connect} from 'react-redux'

class Btn extends Component {
  render() {
    let {incre,decre,children} = this.props //从props中提取方法与children参数
    return (
      <div>
        <button onClick={()=>{
          // console.log(this.props);
          children=='+' ? incre() : decre()
        }}>{children}</button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch)=>{  //此处的dispatch就是能够触发状态机变化的方法
  return { //此处return的对象，将会被注入到Btn组件的props中
    'incre':()=>{   
      return dispatch({ type: 'increment' })
    },
    'decre':()=>{
      return dispatch({type:'decrement'})
    }
  };
}

export default connect(null,mapDispatchToProps)(Btn)
