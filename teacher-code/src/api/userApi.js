// 
import request from '../utils/request.js'

export const userLogin = (data) => {  //请求登陆
  return request.post('/1.1/login', data)
}