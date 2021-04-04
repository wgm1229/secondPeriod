import request from '../utils/request.js'

export const cfyPub = (data)=>{  //录入岗位分类
  return request.post('/1.1/classes/cfy',data)
}

export const cfyList = () => {  //加载分类列表
  return request.get('/1.1/classes/cfy')
}

export const cfyUpdate = (objectId,data) => {  //编辑某个分类
  return request.put(`/1.1/classes/cfy/${objectId}`,data)
}