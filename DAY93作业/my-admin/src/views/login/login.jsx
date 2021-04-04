import React, { Component, useCallback } from 'react'
import Header from './Header/Header'
import { Form, Icon, Input, Button, Spin } from 'antd';
import './login.css'
import { reqLogin } from '../../api';
import StoreUtils from '../../utils/storeUtils';
import storeUtils from '../../utils/storeUtils';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { loginStart, loginActSync } from '../../action/index';

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let { loginStart, loginActSync } = this.props
                // loginStart()
                // console.log('开始登陆')
                loginActSync(values,this.props)
                console.log('Received values of form: ', values);
                
                // const {username,password} = values
                // const result = await reqLogin(username,password)
                // console.log(result)
                // if(result.data.status===0){
                //     message.success('登录成功')
                //     const user = result.data.data
                //     StoreUtils.saveUser(user)
                //     this.props.history.replace("/")
                // }
            }
        });
    };
    validatePwd = (rules, value, callback) => {
        if (!value) {
            callback("密码必须输入")
        } else if (value.length < 4) {
            callback("密码最少4位")
        } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
            callback("密码必须是字母数字下划线")
        } else {
            callback()
        }

    }
    render() {
        const user = storeUtils.getUser()
        if(user&&user._id){
            return <Redirect to="/"/>
        }

        console.log('login组件user',this.props.user)
        let {isLogin} = this.props.user
        if(isLogin){
            return <Redirect to="/"/>
        }
        // console.log('login组件props', this.props)
        let { isLoading } = this.props.user
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <Header />
                <div className="content">
                    <Spin tip="正在登陆..." spinning={isLoading}>
                        <h3>用户登录</h3>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [
                                        { required: true, message: '请输入用户名' },

                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [
                                        { required: true, message: '请输入密码' },
                                        // { min: 4, message: "最少4位" },
                                        // { max: 8, message: "最多8位" },
                                        // {
                                        //     pattern:/^[a-zA-Z0-9]+$/,
                                        //     message:"用户名必须是字母数字下划线"
                                        // }
                                        {
                                            validator: this.validatePwd
                                        }
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>

                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
            </Button>
                            </Form.Item>
                        </Form>
                    </Spin>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        'user': state.user
    }
}
let FormLogin = Form.create()(Login)
export default connect(mapStateToProps, { loginStart, loginActSync })(FormLogin)
