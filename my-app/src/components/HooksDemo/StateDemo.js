import React,{useState} from 'react'
export default function StateDemo(){
  let [num,setNum] = useState(666); 
  //使用useState，生成了一个响应式数据，已经操作该数据的方法
  return (
    <button onClick={()=>{
      setNum(num + 1)
    }}>
      按钮{num}
    </button>
  )
}