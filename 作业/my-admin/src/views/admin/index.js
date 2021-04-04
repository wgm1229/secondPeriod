import React, { Component } from 'react'
import { Redirect } from 'react-router';
import StoreUtils from "../../utils/storeUtils";
import { Layout } from 'antd';
import HeaderC from '../../componets/Header';
const { Header, Footer, Sider, Content } = Layout;

export default class Admin extends Component {

    render() {
        const user = StoreUtils.getUser()
        if (!user) {
            return <Redirect to="/login" />
        }
        return (
            
            <Layout style={{height:"100%"}}>
                <Sider>Sider</Sider>
                <Layout>
                    <HeaderC></HeaderC>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
            
            
        )
    }
}
