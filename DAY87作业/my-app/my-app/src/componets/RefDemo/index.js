import React, { Component,createRef } from 'react'

export default class RefDemo extends Component {
    state = {
        msglist:[
            '你好',
        ]
    }
    myInput = React.createRef()
    myDiv = createRef()
    handleInput=(e)=>{
        // console.log(e)
        if(e.keyCode===13){
            let {msglist} = this.state
            let v = this.myInput.current.value
            msglist.push(v)
            this.setState({
                msglist
            })
            this.myInput.current.value = ''
        }
        
    }
    handleBorder=()=>{
        this.myDiv.current.style.border = '1px solid red'
    }
    render() {
        return (
            <div>
                <div>
                    <input
                    ref={this.myInput}
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
