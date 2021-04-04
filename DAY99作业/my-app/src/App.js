import {Link,Route} from './myRouter'
import Home from './components/Home'
import Product from './components/Product'
import Num from './components/Num'
import Btn from './components/Btn'

function App() {
  return (
    <div className="App">
      <Link to="/home">首页</Link>
      <Link to="/product">产品</Link>

      <Route path="/home" component={Home} />
      <Route path="/product" component={Product} />
      <h1>-------手写redux演示----------</h1>
      <Btn>-</Btn>
      <Num/>
      <Btn>+</Btn>
    </div>
  );
}

export default App;
