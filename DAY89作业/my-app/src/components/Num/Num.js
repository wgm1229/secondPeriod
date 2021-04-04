import React, { Component } from 'react'
import {connect} from 'react-redux';
class Num extends Component {
  
  render() {
    console.log('Num组件的props',this.props)
    return (
      <div>
        {this.props.count}
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return {
    count:state
  }
}
export default connect(mapStateToProps)(Num)