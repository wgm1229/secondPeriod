import {  } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react'
import { BrowserRouter as Router, Route,Switch, } from "react-router-dom";
import Admin from './views/admin';
import login from './views/login/login';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
         <Route path="/login" component={login} />
         <Route path="/" component={Admin} />
         </Switch>
      </Router>
    ) 
  }
}

