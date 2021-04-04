import React, { Component } from 'react'
import Header from './Header/Header'
import { Form, Icon, Input, Button } from 'antd';
import './login.css'

 class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    render() {
    const { getFieldDecorator } = this.props.form;
    return (
            <div className="login">
                <Header/>
                <div className="content">
                    <h3>用户登录</h3>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [
                            { required: true, message: '请输入用户名' },
                            {min:4,message:"最少4位"},
                            {max:8,message:"最多8位"}
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
                        rules: [{ required: true, message: '请输入密码' }],
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
                </div>
            </div>
        )
    }
 }
export default Form.create()(Login)
