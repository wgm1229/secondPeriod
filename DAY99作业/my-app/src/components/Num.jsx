import React, { Component } from 'react'
import store from '../store';


export default class Num extends Component {
  constructor(){
    super()
    this.state={
      num:0
    }
  }
  componentDidMount(){
    this.setState({
      num:store.getState()
    })

    store.subscribe(()=>{
      this.setState({
        num:store.getState()
      })
    })
  }
  
  render() {
    return (
      <div>
        {this.state.num}
      </div>
    )
  }
}
