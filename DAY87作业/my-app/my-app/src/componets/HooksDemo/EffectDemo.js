import './index.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function EffectDemo(){
    let [banner,setBanner] = useState([])
    useEffect(()=>{
        let url = '/product/home'
        axios.get(url).then(res=>{
            console.log(res)
            setBanner(res.data.data.home_carousel)
        })
    },[])
    let [num,setNum] = useState(233)
    useEffect(()=>{
        console.log('组件更新了num',num)
    },[num])
    return (
        <div>
            <div>
                <button onClick={()=>{
                    setNum(num+1)
                }}>
                按钮{num}
                </button>
            </div>
            {
                banner.map((item,index)=>{
                    return <img src={item.image[0]} key={index} ></img>
                })
            }
        </div>
    )
}
