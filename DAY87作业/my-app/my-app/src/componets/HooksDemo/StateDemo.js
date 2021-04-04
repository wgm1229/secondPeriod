import React, { useState } from 'react'

export default function StateDemo() {
    let [num,setNum] = useState(666)
    
    return (
        <div>
            <button onClick={()=>{
                setNum(num+1)
            }}>
                按钮{num}
            </button>
        </div>
    )
    
}
