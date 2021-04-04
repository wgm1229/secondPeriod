import React, { Component } from 'react'
import JobItem from './JobItem'
import JobItemFC from './JobItemFC'

export default class JobList extends Component {
    state = {
        jobdata: [
            { jobname: '前端开发', salary: 10 },
            { jobname: '切图仔', salary: 6 },
            { jobname: '高级前端开发工程师', salary: 20 }
        ]
    }
    render() {
        return (
            <div>
                {
                this.state.jobdata.map((item,index)=>{
                    // return (
                    //     <JobItem 
                    //     jobname={item.jobname}
                    //     salary={item.salary}
                    //     ></JobItem>

                    // )
                    return <JobItem {...item} key="index"/>
                })
                }
                <JobItemFC jobname="java开发工程师" salary="9"></JobItemFC>
            </div>
        )
    }
}
