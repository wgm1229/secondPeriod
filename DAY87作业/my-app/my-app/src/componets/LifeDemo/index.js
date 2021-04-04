import './index.css'
import React, { Component } from 'react'
import axios from 'axios'

export default class LifeDemo extends Component {
    constructor() {
        super()
        this.state = {
            num:110,
            banner:[]
        }
        console.log('函数的constructor执行')
    }
    componentDidMount(){
        console.log('组件初次渲染')
        let url = '/product/home'
        axios.get(url).then(res=>{
            console.log(res)
            this.setState({
                banner:res.data.data.home_carousel
            })
        })
    }
    componentDidUpdate(){
        console.log('组件更新')
    }
    // componentWillMount(){
    //     console.log('组件即将卸载')
    // }

    handleNum=()=>{
        let {num} = this.state
        this.setState({
            num:++num
        })
    }
    render() {
        console.log('函数的render执行')
        let {num,banner} = this.state
        return (
            <div>
                <button onClick={this.handleNum}>
                    按钮{num}
                </button>
                
                {
                    banner.map((item,index)=>{
                        return <img src={item.image[0]} key={index}></img>
                    })
                }
            </div>
        )
    }
}
