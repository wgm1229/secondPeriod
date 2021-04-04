//专门用以处理用户登录等信息相关的reducer模块
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../action/actionTypes'
import locStore from '../utils/storeUtils'

let iniState = {  //预设用户状态信息数据
  isLoading:false, 
  isLogin:false,
  userInfo: null
}

console.log('本地存储用户信息',locStore.getUser('userInfo'));
let uinfo = locStore.getUser();
if(uinfo){ //如果本地存储有内容，说明用户已经成功登录过
  iniState.isLogin = true;
  iniState.userInfo = uinfo
}

export const user = (state = iniState,action)=>{
  switch (action.type) {
    case LOGIN_START:   //点击登录按钮后，会触发
      state.isLoading = true; //开启loading动画
      return {...state}
    case LOGIN_SUCCESS:   //异步登录成功后，会触发
      state.isLoading = false; //关闭loading动画
      state.isLogin = true; //修改登录状态
      state.userInfo = action.payload;  //记录用户信息
      locStore.saveUser(action.payload)  //将用户信息写入本地存储
      // console.log('success',state);
      return {...state}
    case LOGIN_FAIL:   //点击登录按钮后，会触发 , 也可以用来做退出登录的功能
      state.isLoading = false; //关闭loading动画
      state.isLogin = false; //修改登录状态
      state.userInfo = null;  //清空用户信息
      locStore.removeUser()  //清空本地存储的用户信息
      return {...state}
    default:
      return state
  }
}