import React, { Component } from 'react'
import JobItem from './JobItem'
import JobItemFC from './JobItemFC'

export default class JobList extends Component {
  state = {
    jobdata:[
      { jobname: '前端开发', salary: 10 },
      { jobname: '切图仔', salary: 6 },
      {jobname:'高级前端开发工程师',salary:20}
    ]
  }
  render() {
    return (
      <div>
        {/* 调用类组件并传递props参数 */}
        {
          this.state.jobdata.map((item,index)=>{
            // 方法1：
            // return <JobItem 
            //          jobname={item.jobname} 
            //          salary={item.salary} 
            //          key={index}
            //         />
            // 方法2：
            return <JobItem {...item} key={index}/>
          })
        }

        {/* 调用函数式组件并传递props参数 */}
        <JobItemFC jobname="Java开发工程师" salary="9"/>

      </div>
    )
  }
}
