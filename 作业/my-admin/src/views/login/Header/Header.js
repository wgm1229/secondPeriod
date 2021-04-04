import React, { Component } from 'react'
import './header.css'
import logo from '../../../assets/images/logo.png';
export default class Header extends Component {
    render() {
        return (
            <header>
                <img src={logo} alt=""></img>
                <span>React项目:后台管理系统</span>
            </header>
        )
    }
}
