import React, { Component } from "react";
import Header from "./header/header";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, message,Spin } from "antd"; //引入表单
import "./login.css";
import { reqLogin } from "../../api";
import StoreUtils from "../../utils/storeUtils";
import {connect} from 'react-redux'
import { loginStart, loginActSync} from '../../action/index.js'  //引入actionCreator方法函数
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let { loginStart, loginActSync } = this.props;  //此处的loginStart已经变成了一个能够直接触发的dispatch方法
        // loginStart()  //测试，触发开始登录的操作
        loginActSync(values,this.props)  //触发真实异步登录操作
        //表示验证通过
        console.log("Received values of form: ", values);
        // const { username, password } = values;
        // const result = await reqLogin(username, password);
        // if (result.data.status === 0) {
        //   // 登陆成功提示
        //   message.success("登陆成功", 1);
        //   const user = result.data.data;
        //   StoreUtils.saveUser(user);
        //   // 如果接口请求成功页面跳转
        //   this.props.history.replace("/");
        // }
      }
    });
  };
  // 自定义验证密码 验证密码
  validatePwd = (rule, value, callback) => {
    if (!value) {
      callback("密码必须输入");
    } else if (value.length < 4) {
      callback("密码最少4位");
    } else if (value.length > 8) {
      callback("密码不得超过8位");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("密码必须是字母数字下划线");
    } else {
      callback();
    }
  };
  render() {
    // 进行判断,如果登陆过了就直接跳转到首页，如果没有登录，跳转到登陆页面
    const user = StoreUtils.getUser();
    if (user && user._id) {
      //证明已经登陆过了,跳转到首页
      return <Redirect to="/" />;
    }
    console.log('login组件props',this.props);
    let {isLoading} = this.props.user //提取connect注入到props中的状态机数据
    const { getFieldDecorator } = this.props.form;
    return (
        <div className="login">
          <Header />
              <div className="login-content">
                <Spin spinning={isLoading}>
                  <h3>用户登录</h3>
                  <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                      {getFieldDecorator("username", {
                        rules: [
                          { required: true, message: "请输入用户名" },
                          // { min: 4, message: "最少4位" },
                          { max: 8, message: "最多8位" },
                        ],
                        initialValue: "admin",
                      })(
                        <Input
                          prefix={
                            <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                          }
                          placeholder="Username"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator("password", {
                        rules: [
                          // { required: true, message: "请输入密码" },
                          // { min: 4, message: "密码至少4位" },
                          // { max: 8, message: "密码最多8位" },
                          // {
                          //   pattern: /^[a-zA-Z0-9_]+$/, //正则校验(密码必须是字母数字下划线)
                          //   message: "用户名必须是字母数字下划线",
                          // },
                          {
                            validator: this.validatePwd,
                          },
                        ],
                      })(
                        <Input
                          prefix={
                            <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                          }
                          type="password"
                          placeholder="Password"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Log in
                    </Button>
                    </Form.Item>
                  </Form>
                </Spin>
              </div>
        </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    'user':state.user
  }
}
let FormLogin = Form.create()(Login)
export default connect(mapStateToProps, { loginStart, loginActSync })(FormLogin);
// loginStart 被传入connect之前，是一个actionCreator
// loginStart 被connect注入到Login组件中后，就变成了一个可以直接调用的dispatch
