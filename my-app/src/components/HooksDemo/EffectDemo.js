import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './index.css'
export default function EffectDemo() {
  let [banner,setBanner] = useState([])
  useEffect(() => { //模拟componentDidMount效果
    let url = 'https://shopapi.smartisan.com/product/home'
    axios.get(url).then(res => {
      console.log(res);
      setBanner(res.data.data.home_carousel)
    })
  }, [])

  let [num,setNum] = useState(233)
  useEffect(()=>{ //模拟componentDidUpdate效果
    console.log('组件更新了num',num);
  },[num])
  
  return (
    <div>
      <div>
        <button onClick={() => {
          setNum(num + 1)
        }}>
          按钮{num}
        </button>
      </div>
      {
        banner.map((item, index) => {
          return <img src={item.image[0]} key={index} alt="" />
        })
      }
    </div>
  )
}