import React, { Component } from 'react'
import store from '../store'
export default class Btn extends Component {
  render() {
    let { children } = this.props;
    let type = children == '+' ? 'increment' : 'decrement'
    return (
      <div>
        <button onClick={()=>{
          store.dispatch({
            type
          })
        }}>{children}</button>
      </div>
    )
  }
}
