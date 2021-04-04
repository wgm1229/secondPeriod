import React,{Component} from 'react'
import { Table, Button, Tag,Card } from 'antd';
import { cfyList } from '../../../api/job.js'
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
    render: tags => (
      <span>
        {/* {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })} */}
      </span>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button type="danger">删除</Button>
        <Button type="primary">编辑</Button>
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