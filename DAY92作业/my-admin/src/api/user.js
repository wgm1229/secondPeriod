import request from '../utils/request';

export const userLogin = (data)=>{
  return request.post('/1.1/login',data)
}
