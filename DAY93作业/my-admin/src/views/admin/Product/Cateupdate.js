import React, { Component } from 'react'
import { Form, Select, Input, Button,message } from 'antd';
import {cfyPub,cfyUpdate} from '../../../api/job';
import MyUpload from '../../../componets/MyUpload'
const { Option } = Select;

class Cateupdate extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let {objectId} = this.props.location.state
        values.cfyimg=this.state.cfyimg//将图片路径一同传到数据库中

        cfyUpdate(objectId,values).then(res=>{
          console.log(res)
          if(res.status===200){
            message.success('修改成功');
          }
        })
      }
    });
  };
  handleImg=(cfyimg)=>{
    console.log('编辑页面获取到的图片路径',cfyimg)
    this.setState({
      cfyimg
    })
  }
  componentDidMount(){
    console.log(this.props)
    this.props.form.setFieldsValue({
      'cfyname':this.props.location.state.cfyname,
      'cfytype':this.props.location.state.cfytype,
    })
  }

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
        <Form.Item label="分类图片">
          <MyUpload
          handleImg={this.handleImg}//获取到图片路径
          initImg={this.props.location.state.cfyimg}
          />
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

const WrappedApp = Form.create({ name: 'coordinated' })(Cateupdate);

export default WrappedApp