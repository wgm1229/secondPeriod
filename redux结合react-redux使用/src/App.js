import Num from './components/Num/Num.js'
import Login from './components/Login.js'
import Btn from './components/Num/Btn.js'
function App() {
  return (
    <div className="App">
      <Btn>-</Btn>
      <Num/>
      <Btn>+</Btn>
      <Login/>
    </div>
  );
}

export default App;
