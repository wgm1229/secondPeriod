import React,{Component} from 'react'
import { Table, Button, Tag,Card } from 'antd';
import { cfyList } from '../../../api/job.js'

let routeObj = null;  //保存路由对象信息
const columns = [ //配置表格列表外观
  {
    title: '分类ID',
    dataIndex: 'objectId',  //需要跟数据包中的字段对应
    key: 'objectId',
  },
  {
    title: '分类名称',
    dataIndex: 'cfyname',
    key: 'cfyname',
  },
  {
    title: '归属分类',
    key: 'cfytype',
    dataIndex: 'cfytype',
    render: (ctype,record) => {
      // console.log('表格render方法函数', ctype);  //渲染当前这一格所对应的数据
      // console.log('表格render方法函数', record); //渲染当前这一行所对应的数据包
      let color = ctype == 0 ? 'geekblue' : 'green';
      let text = ctype == 0 ? '实习' : '兼职';
      return (
        <span>
            <Tag color={color}>
              { text }
            </Tag>
        </span>
      )
    },
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button type="danger">删除</Button>
        <Button type="primary" onClick={()=>{
          // console.log(routeObj);  
          routeObj.history.push({
            pathname:'/cateupdate',
            state:record
          })
        }}>编辑</Button>
      </span>
    ),
  },
];

// const data = [
//   {
//     objectId: '1',
//     cfyname: 'John Brown',
//     cfytype: 32
//   }
// ];

export default class CateList extends Component{
  constructor(){
    super()
    this.state = {
      data:[]
    }
  }
  componentDidMount(){
    routeObj = this.props;   //提升props的存储位置
    cfyList().then(res=>{
      console.log(res);
      this.setState({
        data:res.data.results
      })
    })
  }
  render(){
    return  <Card>
              <Table columns={columns} dataSource={this.state.data} />
            </Card>
  }
}