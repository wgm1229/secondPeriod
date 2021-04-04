## redux方案选型
1. Redux + React-Redux + Redux-thunk 【选择此方案】
'redux-thunk'  //引入异步action操作的中间件
```
yarn add redux react-redux redux-thunk
```
2. Redux + React-Redux + @rematch/core
[@rematch/core](https://rematch.gitbook.io/handbook/)

3. Redux + React-Redux + dva
[dva](https://dvajs.com/)

> @rematch/core跟dva都是为了进一步简化开发者使用Redux的语法


## 创建状态机
> 进入管理面板登录状态判断、个人中心展示并编辑用户信息、删除操作前判断用户权限...

1. store 状态机

2. reducer
> combinReducers  可以将多个纯函数进行整合后，给createStore使用

store/index.js
```
import {createStore,combineReducers} from 'redux'
import reducers from '../reducer'
const store = createStore(combineReducers(reducers))
export default store
```

3. action
> 描述用户操作行为的对象
> actionCreator 生成action的方法函数

action/actionType.js
```
// 同意管理所有action的type常量

//用户登录相关
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
```
action/index.js
```
// 存放所有actionCreator
// 用以生成状态机所需action的 
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './actionTypes'

export const loginStart = ()=>{  //创造开启登录action的方法函数，同步action
  return {
    type:LOGIN_START
  }
}
export const loginSuccess = (payload) => {  //触发登录成功的action，同步action
  return {
    type: LOGIN_SUCCESS,
    payload
  }
}
export const loginFail = () => {  //触发登录失败的action，同步action
  return {
    type: LOGIN_FAIL
  }
}
```
## 登录状态及流程思考

1. 开始登录  
> 对应action中的  loginStart
 + isLoading   效果开启  true
 + isLogin     用户是否登录成功 false
 + userInfo    空对象

2. 登录成功
> 对应action中的  loginSuccess
 + isLoading   效果开启  false
 + isLogin     用户是否登录成功 true
 + userInfo    后端下发（本地提取）用户信息对象

3. 登录失败
> 对应action中的  loginFail
 + isLoading   效果开启  false
 + isLogin     用户是否登录成功 false
 + userInfo    空对象

reducer/user.js
```
//专门用以处理用户登录等信息相关的reducer模块
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../action/actionTypes'

let iniState = {
  isLoading:false, 
  isLogin:false,
  userInfo: null
}

export const user = (state = iniState,action)=>{
  switch (action.type) {
    case LOGIN_START:   //点击登录按钮后，会触发
      state.isLoading = true; //开启loading动画
      return {...state}//可以将实时的state放进去
    case LOGIN_SUCCESS:   //异步登录成功后，会触发
      state.isLoading = false; //关闭loading动画
      state.isLogin = true; //修改登录状态
      state.userInfo = action.payload;  //记录用户信息
      // console.log('success',state);
      return {...state}
    case LOGIN_FAIL:   //点击登录按钮后，会触发
      state.isLoading = false; //关闭loading动画
      state.isLogin = false; //修改登录状态
      state.userInfo = null;  //清空用户信息
      return {...state}
    default:
      return state
  }
}
```
reducer/index.js
```
import {user} from './user.js'

export default {
  user
}
```

## LeanCloud用户登录

1. 在_User表中新增一个用户
admin/123456
2. 在api/userApi.js中新增发起登录的方法
```
import request from '../utils/request.js'

export const userLogin = (data) => {  //请求登陆
  return request.post('/1.1/login', data)
}
```
3. 在action/index.js中加入异步action
```
import {userLogin} from '../api/userApi.js'

export const loginActSync = (data,props)=>{  //用以发起用户登录异步请求的action
  return (dispatch)=>{  // 将action自动dispatch的动作拦截到此处
    dispatch(loginStart())  //【1】手动dispatch，开启用户登录
      userLogin(data).then(res => {  //发起用户登录请求
        console.log(res);
        if(res.status==200){
          dispatch(loginSuccess(res.data))   //【2】手动触发登录成功的dispatch
          // 此处可以触发路由的重新跳转  /
          // props.history.push('/')
        }
      }).catch(err=>{
        console.log('用户名或密码错误');
        console.log(err);
        dispatch(loginFail())   //【3】手动触发登录失败的dispatch
      })   
  }
}
```
4.在login.jsx中调用store.user中的请求登陆方法loginActSync(data)
```
import { loginStart, loginActSync} from '../../action/index.js'  //引入actionCreator方法函数

let { loginActSync } = this.props;  //此处的loginStart已经变成了一个能够直接触发的dispatch方法
loginActSync(values)  //触发真实异步登录操作
//表示验证通过

export default connect(mapStateToProps, { loginActSync })(FormLogin);
// loginActSync 被传入connect之前，是一个actionCreator
// loginActSync 被connect注入到Login组件中后，就变成了一个可以直接调用的dispatch
```

 ## 配置redux-thunk一部模块
 
 1. 不配置redux-thunk的报错信息
 ```
 : Actions must be plain objects. Use custom middleware for async actions.
 ```

 2. 配置redux-thunk的方式
 > store/index.js
 ```
 import {createStore,combineReducers,applyMiddleware} from 'redux'
import reducers from '../reducer'
import thunk from 'redux-thunk'  //【1】引入异步action操作的中间件
const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk) //【2】将异步模块集成到redux中去
)
export default store
 ```

 3. 异步action的定义方式
 ```
export const loginActSync = ()=>{  //用以发起用户登录异步请求的action
  return (dispatch)=>{  // 将action自动dispatch的动作拦截到此处
    dispatch(loginStart())  //手动dispatch，开启用户登录
  }
}
 ```


 ## 任务
> 今天的内容是重点也是难点
1. 掌握combinReducer的使用

2. 掌握applayMiddleware 向redux集成redux-thunk的过程

3. 思考独立action模块的作用
  - actionTypes.js
  - index.js         actionCreator

4. 梳理登录目前实现的功能流程【画一个流程图】