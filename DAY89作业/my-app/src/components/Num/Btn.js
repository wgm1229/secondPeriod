import React, { Component } from 'react'
import { connect } from 'react-redux';
class Btn extends Component {
  render() {
    let { incre,decre,children } = this.props
    return (
      <div>
        <button onClick={() => {
          console.log('Btn组件thi.props', this.props.children)

          children==="+"?incre():decre()
        }}
        >{children}</button>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    'incre': () => {
      return dispatch({ type: 'increment' })
    },
    'decre': () => {
      return dispatch({ type: 'decrement' })
    }
  }
}
export default connect(null, mapDispatchToProps)(Btn)
