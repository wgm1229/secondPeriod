import React, { Component } from "react";
import {Button} from 'antd'
import axios from 'axios'
import request from '../../../utils/request.js'
import {cfyPub} from '../../../api/job.js'
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handlePub = ()=>{
    // 方法1：
    // let url = 'https://ed0sfmxd.lc-cn-n1-shared.com/1.1/classes/cfy'
    // axios({
    //   url,
    //   method:'POST',
    //   headers:{
    //     'X-LC-Id': 'ed0SfMxDkgLHKOMsPIoNiTlB-gzGzoHsz',
    //     'X-LC-Key': 'bBFIjH7SdBXNGYqVTXj5282M',
    //     'Content-Type': 'application/json'
    //   },
    //   data:{
    //     cfyname:'餐饮服务',
    //     cfytype:0
    //   }
    // }).then(res=>{
    //   console.log(res);
    // })

    // 方法2：
    // request.post('/1.1/classes/cfy',{
    //   cfyname:'市场推广',
    //   cfytype:0
    // }).then(res=>{
    //   console.log(res);
    // })

    // 方法3：
    cfyPub({
      cfyname:'展会演出',
      cfytype:0
    }).then(res=>{
      console.log(res);
    })
  }
  render() {
    return <div>
      Category
              <Button type="primary" onClick={this.handlePub}>发送数据至LeanCloud</Button>
          </div>;
  }
}

export default Category;
