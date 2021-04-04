import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../action/actionTypes';
import locStore from '../utils/storeUtils'

let iniState = {
  isLoading: false,
  isLogin: false,
  userInfo: null
}
console.log('本地存储用户信息',locStore.getUser())
let uinfo = locStore.getUser()
if(uinfo){
  iniState.isLogin=true
  iniState.userInfo = uinfo
}

export const user = (state = iniState, action) => {
  switch (action.type) {
    case LOGIN_START:
      state.isLoading = true
      return { ...state }
    case LOGIN_SUCCESS:
      state.isLoading = false
      state.isLogin = true
      state.userInfo = action.payload
      locStore.saveUser(action.payload)
      console.log('success',state)
      return { ...state }
    case LOGIN_FAIL:
      state.isLoading = false
      state.isLogin = false
      state.iniState = null
      locStore.removeUser()
      return { ...state }
    default:
      return state
  }
}