import React, { Component } from 'react'
import JobItem from './JobItem'

export default class JobList extends Component {
    state = {
        jobdata: [
            { jobname: '前端开发', salary: 10 },
            { jobname: '切图仔', salary: 6 },
            { jobname: '高级前端开发工程师', salary: 20 }
        ]
    }
    handleSalary=(idx)=>{
        console.log(idx)
        let {jobdata} = this.state
        jobdata[idx].salary +=1
        this.setState({
            jobdata
        })
    }
    render() {
        return (
            <div>
                {
                this.state.jobdata.map((item,index)=>{
                   return <JobItem {...item}
                   handleSalary={this.handleSalary}
                   idx={index}
                   key={index}/>
                })
                }
            </div>
        )
    }
}
