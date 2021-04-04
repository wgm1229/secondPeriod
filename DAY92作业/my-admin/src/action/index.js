import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './actionTypes';
import {userLogin} from '../api/user';

export const loginStart = ()=>{
  return {
    type:LOGIN_START
  }
}

export const loginSuccess = (payload)=>{
  return {
    type:LOGIN_SUCCESS,
    payload
  }
}

export const loginFail = ()=>{
  return {
    type:LOGIN_FAIL
  }
}

export const loginActSync = (data,props)=>{
  return (dispatch)=>{
    dispatch(loginStart())
    userLogin(data).then(res=>{
      console.log(res)
      if(res.status==200){
        dispatch(loginSuccess(res.data))
        props.history.push('/')
      }
    }).catch(err=>{
      console.log('用户名或密码错误')
      console.log(err)
      dispatch(loginFail())
      alert('用户名或密码错误')
    })
  }
}