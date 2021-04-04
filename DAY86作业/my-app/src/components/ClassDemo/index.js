import React, { Component } from 'react';

class ClassDemo extends Component {
    constructor() {
        super()
        this.state = {
            num: 100
        }
        // this.handlePlus = this.handlePlus.bind(this)
    }
    // handlePlus(){
    //     let n = this.state.num + 1
    //     this.setState({
    //         num:n
    //     })
    // }
    handlePlus=()=>{
        let n = this.state.num + 1
        this.setState({
            num:n
        })
    }
    render() {
        let { num } = this.state
        return (
            <div>
                <h2>我是类组件{this.state.num}</h2>
                <button onClick={this.handlePlus}>按钮</button>
            </div>
        )
    }
}
export default ClassDemo