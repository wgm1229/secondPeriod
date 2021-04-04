import React, { Component } from 'react'
import { Button } from 'antd'
import axios from 'axios'
import request from '../../../utils/request'
import {cfyPub} from '../../../api/job'
export default class Category extends Component {
  handlePub = () => {
    // let url = 'https://iaqhvhzs.lc-cn-n1-shared.com/1.1/classes/cfy'
    // axios({
    //   url,
    //   method: 'POST',
    //   headers: {
    //     'X-LC-Id': 'iaqHVhzSwqXu9PcDPooWgf2c-gzGzoHsz',
    //     'X-LC-Key': 'cfjcMi0tm3MOFGXzor059wW2',
    //     'Content-Type': 'application/json',
    //   },
    //   data:{
    //     cfyname:'餐饮服务',
    //     cfytype:0
    //   }
    // }).then(res=>{
    //   console.log(res)
    // })

    // request.post('/1.1/classes/cfy',{
    //   cfyname:'市场推广',
    //   cfytype:0
    // }).then(res=>{
    //   console.log(res)
    // })

    cfyPub({
      cfyname:'展会演出',
      cfytype:0
    }).then(res=>{
      console.log(res)
    })
  }
render() {
  return (
    <div>
      Category
      <Button type="primary" onClick={this.handlePub}>发送数据至LeanCloud</Button>
    </div>
  )
}
}
