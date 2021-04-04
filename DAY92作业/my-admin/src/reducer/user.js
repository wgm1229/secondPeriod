import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../action/actionTypes';

let iniState = {
  isLoading: false,
  isLogin: false,
  userInfo: null
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
      console.log('success',state)
      return { ...state }
    case LOGIN_FAIL:
      state.isLoading = false
      state.isLogin = false
      state.iniState = null
      return { ...state }
    default:
      return state
  }
}