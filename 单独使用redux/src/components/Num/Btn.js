import React, { Component } from 'react'
import store from '../../store'

export default class Btn extends Component {
  render() {
    return (
      <div>
        <button onClick={()=>{
          store.dispatch({
            type:'increment'
          })
        }}>+</button>
      </div>
    )
  }
}
