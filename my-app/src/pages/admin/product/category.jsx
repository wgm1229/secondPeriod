import React from 'react'
import { Form, Select, Input, Button,message} from 'antd';
import {cfyPub} from '../../../api/job.js'
const { Option } = Select;

class Category extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        cfyPub(values).then(res=>{  //向LeanCloud发送数据
          console.log(res);
          if (res.status===201){
            message.success('分类录入成功');
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
        <Form.Item label="归属分类" name="cfytype">
          {getFieldDecorator('cfytype', {
            rules: [{ required: true, message: '请选择归属分类' }],
          })(<Select
            placeholder="请选择归属岗位类型"
          >
            <Option value={0}>实习</Option>
            <Option value={1}>兼职</Option>
          </Select>)},
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            确定录入
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedApp = Form.create({ name: 'coordinated' })(Category);

export default WrappedApp