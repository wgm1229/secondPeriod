import React, { Component } from 'react'
import { Table, Divider, Tag, Card, Button } from 'antd';
import { cfyList } from '../../../api/job';

let routeObj = null
const columns = [
  {
    title: '分类ID',
    dataIndex: 'objectId',
    key: 'objectId',
    render: text => <a>{text}</a>,
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
    render: (ctype, record) => {
      // console.log('表格组件中ctype', ctype);
      // console.log('表格组件中record', record)
      let color = ctype == 0 ? 'geekblue' : 'green';
      let text = ctype == 0 ? '实习' : '兼职';
      return (
        <span>
          <Tag color={color}>
            {text}
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
          // console.log(routeObj)
          routeObj.history.push({
            pathname:'/cateupdate',
            state:record
          })
        }}>编辑</Button>
      </span>
    ),
  },
];




export default class CateList extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    routeObj = this.props
    cfyList().then(res => {
      console.log(res)
      this.setState({
        data: res.data.results
      })
    })
  }
  render() {
    return (
      <Card>
        <Table columns={columns} dataSource={this.state.data} />
      </Card>
    )
  }
}


