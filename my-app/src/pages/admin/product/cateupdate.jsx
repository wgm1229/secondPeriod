import React from 'react'
import { Form, Select, Input, Button,message} from 'antd';
import {cfyUpdate} from '../../../api/job.js'
import MyUpload from '../../../components/MyUpload'
const { Option } = Select;

class CateUpdate extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        let {objectId} = this.props.location.state //提取分类列表组件传递过来的objectId
        values.cfyimg = this.state.cfyimg // 为表单数据追加分类图片字段
        cfyUpdate(objectId,values).then(res=>{  //向LeanCloud发送更新数据的请求
          console.log(res);
          if (res.status===200){
            message.success('分类修改成功');
          }
        })
      }
    });
  };

  componentDidMount(){

    this.props.form.setFieldsValue({  //设置表单初始值
      'cfyname': this.props.location.state.cfyname,
      'cfytype': this.props.location.state.cfytype
    })
  }

  handleImg = (cfyimg)=>{ //用以接收MyUpload组件图片路径的方法函数
    console.log('编辑页面获取的图片路径',cfyimg);
    this.setState({cfyimg})
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    console.log('编辑分类组件props',this.props);
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
        <Form.Item label="分类图片">
          <MyUpload 
            handleImg={this.handleImg} 
            initimg={this.props.location.state.cfyimg}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            确定修改
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedApp = Form.create({ name: 'coordinated' })(CateUpdate);

export default WrappedApp