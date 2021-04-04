import './index.css';
let str = 'hello'
function sum(a,b){
    return a+b
}
let ele = <h1>独立的jsx结构</h1>
let isActive = false
function JsxDemo(){
    return (
        <div>
            <h1>使用JSX渲染数据</h1>
            <p>{str}</p>
            <p>{10%3}</p>
            <p>{`这是一个模板字符串${str}`}</p>
            <p>{1>3? '1大于3':'1大于3不成立'}</p>
            <p>{sum(123,45)}</p>
            <p>{'你好'||'React'}</p>
            <p>{ele}</p>
            <div className={`box ${isActive?'active':''}`}></div>
            <input value={str}/>
            <input defaultValue={str}/>
        </div>
    );
}
export default JsxDemo