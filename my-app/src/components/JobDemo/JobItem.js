import React, { Component } from 'react'

export default class JobItem extends Component {
  render() {
    let { jobname, salary, idx } = this.props
    let { handleSalary } = this.props
    return (
      <div>
        <h3>岗位名称：{jobname}</h3>
        <p>薪资待遇:{salary}k</p>
        <button onClick={()=>{
          handleSalary(idx)
        }}>加薪</button>
      </div>
    )
  }
}
