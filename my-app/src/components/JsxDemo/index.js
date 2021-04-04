import './index.css';
let str = 'Hello'

function sum(a,b){
  return a+b
}

let ele = <h1>独立的jsx结构</h1>

let isActive = true; 

function JsxDemo() {  //函数式组件
  return (
    <div>
      <h1>使用JSX渲染数据</h1>
      <p>{str}</p>
      <p>{10 % 3}</p>
      <p>{`这是一个模板字符串${str}`}</p>
      <p>{1 > 3 ? '1大于3' : '1不大于3'}</p>
      <p>{sum(123, 76)}</p>
      <p>{'你好' || 'React'}</p>
      <p>{ele}</p>
      <div className={`box ${isActive?'active':''}`}></div>
      {/* 通过value绑定的值，默认视图无法操作 */}
      <input value={str} />
      <input defaultValue={str}/>
    </div>
  );
}

export default JsxDemo;