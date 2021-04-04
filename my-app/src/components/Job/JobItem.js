import React, { Component } from 'react'

export default class JobItem extends Component {
  render() {
    return (
      <div>
        <h3>岗位名称：{this.props.jobname}</h3>
        <p>薪资待遇:{this.props.salary}k</p>
      </div>
    )
  }
}
