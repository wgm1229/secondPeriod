import Num from './components/Num/Num'
import Btn from './components/Num/Btn'
import Login from './components/Login';
function App() {
  return (
    <div className="App">
      <Btn>-</Btn>
      <Num />
      <Btn>+</Btn>
      <Login />
    </div>
  );
}

export default App;
