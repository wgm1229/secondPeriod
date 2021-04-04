import React, { Component } from 'react'
import { Form, Select, Input, Button,message } from 'antd';
import {cfyPub} from '../../../api/job';
const { Option } = Select;

class Category extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        cfyPub(values).then(res=>{
          console.log(res)
          if(res.status===200){
            message.success('录入成功');
          }
        })
      }
    });
  };



  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="分类名称">
          {getFieldDecorator('cfyname', {
            rules: [{ required: true, message: '请输入分类名称' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="归属分类">
          {getFieldDecorator('cfytype', {
            rules: [{ required: true, message: '请选择归属分类' }],
          })(
            <Select
              placeholder="请选择归属岗位类型"
            >
              <Option value={0}>实习</Option>
              <Option value={1}>兼职</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedApp = Form.create({ name: 'coordinated' })(Category);

export default WrappedApp