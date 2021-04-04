// 
import request from '../utils/request.js'

export const userLogin = (data) => {  //录入岗位分类
  return request.post('/1.1/login', data)
}