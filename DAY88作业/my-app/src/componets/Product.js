import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './index.css'
import Prod1 from './Prod/Prod1'
import Prod2 from './Prod/Prod2'
import Prod3 from './Prod/Prod3'

export default class Product extends Component {
  handleTab=(target)=>{
    console.log(this.props)
    this.props.history.push({
      pathname:target,
      state:{
        id:666,
        title:'传参'
      }
    })

  }
  render() {
    return (
      <div>
        <div>
          <span onClick={()=>{this.handleTab('/product')}}>产品1</span>
          <span onClick={()=>{this.handleTab('/product/prod2')}}>产品2</span>
          <span onClick={()=>{this.handleTab('/product/prod3')}}>产品3</span>
        </div>
        
        <Route path="/product" exact component={Prod1} />
        <Route path="/product/prod2" component={Prod2} />
        <Route path="/product/prod3" component={Prod3} />
      </div>
    )
  }
}
