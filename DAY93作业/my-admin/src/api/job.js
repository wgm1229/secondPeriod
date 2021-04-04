import request from '../utils/request'



export const cfyPub = (data)=>{
  return request.post('/1.1/classes/cfy',data)
}

export const cfyList = ()=>{
  return request.get('/1.1/classes/cfy')
}

export const cfyUpdate = (objectId,data)=>{
  return request.put(`/1.1/classes/cfy/${objectId}`,data)
}