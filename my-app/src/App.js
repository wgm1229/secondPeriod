import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'antd/dist/antd.css'  //你可以在index.js里面引入这个样式也可以在appjs里面引入
import Admin from './pages/admin/admin';  //自动引入
import Login from './pages/login/login';
// App是根组件
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Admin} />
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
