import React, { Component } from 'react'
import {connect} from 'react-redux'
 class Num extends Component {
  render() {
    console.log('Num组件的props',this.props);
    return (
      <div>
        <h2>{this.props.count}</h2>
      </div>
    )
  }
}
// export default Num   //直接抛出Num组件，则this.props为空对象
const mapStateToProps = (state)=>{ //此处的state就是Provider注入的store提供的数据
  return {  //return的内容，就是设置给Num组件的props
    count:state
  }
}
export default connect(mapStateToProps)(Num)
