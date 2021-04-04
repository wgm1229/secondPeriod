import './App.css';
import {Link,Route} from './myRouter'
import Home from './components/Home'
import Product from './components/Product'
import Contact from './components/Contact'
import Num from './components/Num'
import Btn from './components/Btn'

function App() {
  return (
    <div>
      <h1>手写react-router演示</h1>
      <Link to="/home">首页</Link>
      <Link to="/product">产品</Link>
      <Link to="/contact">联系我们</Link>

      <Route path='/home' component={Home} />
      <Route path='/product' component={Product} />
      <Route path='/contact' component={Contact} />

      <h1>-------手写redux演示----------</h1>
      <Btn>-</Btn>
      <Num/>
      <Btn>+</Btn>
    </div>
  );
}

export default App;
