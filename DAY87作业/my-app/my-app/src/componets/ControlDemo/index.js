import React, { Component,createRef } from 'react'

export default class ControlDemo extends Component {
    state = {
        msglist:[
            '你好',
        ],
        msg:'input默认内容'
    }
    myDiv = createRef()
    handleInput=(e)=>{
        // console.log(e)
        if(e.keyCode===13){
            let {msglist,msg} = this.state
            
            this.setState({
                msglist:[
                    ...msglist,
                    msg
                ],
                msg:''
            })
        }
        
    }
    handleChange=(e)=>{
        // console.log(e.target.value)
        this.setState({
            msg:e.target.value
        })
    }
    handleBorder=()=>{
        this.myDiv.current.style.border = '1px solid red'
    }
    render() {
        return (
            <div>
                <div>
                    <input
                    value={this.state.msg}
                    onChange={this.handleChange}
                    onKeyUp={this.handleInput}
                    ></input>
                </div>
                <div ref={this.myDiv} onClick={this.handleBorder}>
                    {
                        this.state.msglist.map((item,index)=>{
                            return <h4 key={index}>{item}</h4>
                        })
                    }
                </div>
            </div>
        )
    }
}
