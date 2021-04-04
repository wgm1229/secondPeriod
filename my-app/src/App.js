import Job from './components/Job'
// import JobDemo from './components/JobDemo'
// import RefDemo from './components/RefDemo'
// import ControlDemo from './components/ControlDemo'
// import LifeDemo from './components/LifeDemo'
import StateDemo from './components/HooksDemo/StateDemo'
import EffectDemo from './components/HooksDemo/EffectDemo'
function App() {
  return (
    <div className="App">
      {/* <Job/> */}
      {/* <JobDemo /> */}
      {/* <RefDemo/> */}
      {/* <ControlDemo/> */}
      {/* {true ? <LifeDemo /> : ''} */}
      <StateDemo/>
      <EffectDemo/>
    </div>
  );
}

export default App;
