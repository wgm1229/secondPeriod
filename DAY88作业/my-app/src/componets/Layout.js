import React, { Component } from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import './index.css'
import Home from './Home'
import Contact from './Contact'
import Product from './Product'
import Login from './Login';
import NotFound from './NotFound';

let isLogin = false
class Layout extends Component {
  
  render() {
    console.log("Layou组件",this.props)
    return (
      <div>
        <div>
        <h4>Layout</h4>
          <Link to="/home"><span>首页</span></Link>
          <Link to="/contact/1336668888"><span>联系我们</span></Link>
          <Link to="/product"><span>公司产品</span></Link>
       
        </div>

        <Switch>
          <Route path="/home" render={()=>{
            if(isLogin){
              return <Home/>
            }
            return <Login/>
          }} />
          <Route path="/contact/:tel" component={Contact} />
          <Route path="/product" component={Product} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(Layout)