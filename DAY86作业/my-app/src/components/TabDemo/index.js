import React, { Component } from 'react'
import './index.css';
export default class TabDemo extends Component {
    constructor() {
        super()
        this.state = {
            idx: 0,
            tabs: ['首页', '商品', '分类', '新闻']
        }
    }
    handleTab = (idx) => {
        this.setState({
            idx
        })
        // console.log(this.state.tabs)
    }
    render() {
        let { tabs,idx } = this.state
        return (
            <div>
                <ul>
                    {
                        tabs.map((item, index) => {
                            return (
                                <li
                                    className={index===idx ? 'active' : ''}
                                    onClick={() => { this.handleTab(index) }}
                                    key={index}
                                >
                                    {item}
                                </li>
                            )
                        })
                    }


                </ul>
                
            </div>
        )
    }
}
