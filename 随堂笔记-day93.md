## 登录成功后续逻辑

1. 重新跳转到 根路由 '/'
+ login.jsx 中向loginActSync传递this.props
+ action/index.js/loginActSync方法中实现路由跳转
```
this.props.history.push()
```
+ admin.jsx中提取isLogin数据，作为判断依据
```
import {connect} from 'react-redux'

let {isLogin} = this.props.user  //提取状态机中的登录状态
if (!isLogin) {
  // 回到登陆页面
  return <Redirect to="/login" />;
}
const mapStateToProps = (state)=>{
  return {
    'user': state.user   //将模块化的状态机中，需要使用的user数据包提取出来，注入到当前组件的props中
  }
}
export default connect(mapStateToProps)(Admin); 
```
2. 记录用户登录状态
  + reducer/user.js 
    - 在LOGIN_SUCCESS状态下，向本地存储写入用户信息
    - 在user.js模块每次调用的时候，尝试从本地提取用户信息
```
import locStore from '../utils/storeUtils'

console.log('本地存储用户信息',locStore.getUser('userInfo'));
let uinfo = locStore.getUser();
if(uinfo){ //如果本地存储有内容，说明用户已经成功登录过
  iniState.isLogin = true;
  iniState.userInfo = uinfo
}

case LOGIN_SUCCESS:
locStore.saveUser(action.payload)  //将用户信息写入本地存储
```

## 使用状态机完成退出登录

+ reducer/user.js 中，跳转LOGIN_FAIL的逻辑，清除本地存储
```
case LOGIN_FAIL:   //点击登录按钮后，会触发 , 也可以用来做退出登录的功能
  state.isLoading = false; //关闭loading动画
  state.isLogin = false; //修改登录状态
  state.userInfo = null;  //清空用户信息
  locStore.removeUser()  //*清空本地存储的用户信息
  return {...state}
```
+ components/header  中，调整退出的登录逻辑
  - 调用状态机方法，完成退出逻辑
```
// 点击确定
handleOk = () => {  
  this.props.loginFail()  //触发reducer中的登录失败的逻辑

  // 跳转到首页重新判断
  this.props.history.push("/");
};
```
## 使用redux完成登录功能的目的

+ 不使用redux，用localStorage完全能实现登录功能

+ redux实现登录后，用户信息跨组件实时同步，更加方便

+ 为了以此功能为契机，训练redux真实使用流程 

## 登录状态的存储形式

+ 记住密码，持久存储  localStorage
+ 不记住密码，临时存储 sessionStorage

## 用户角色控制

1. 角色划分
> roles
  + root   访问项目所有功能
  + admin  不允许访问用户管理面板、角色管理面板
  + worker 只能访问首页、分类管理

2. 分配角色
  + 正常的操作，是由root超级管理员，在管理面板中录入
    - admin
    - worker
  + 可以在数据库中直接新增用以测试的不同角色账号

3. 不同的权限控制手段
  + 动态控制菜单栏的显示 【用户看不到权限之外的菜单】
  + 动态控制Route的渲染  【用户无法访问权限之外的路由】
  + 后端根据不同的角色，动态下发路由配置数据包 【后端开发完成数据下发】
  + 按钮级别的权限控制 【根据实际情况决定是否添加】

## 实现权限管理的流程

+ 调整config/menuConfig.js数据包
```
roles: ['root', 'admin']
```
+ 在LeanCloud数据库，设置几个拥有不同权限的用户角色
```
role  username   pwd
root  超级管理员 123456
admin 管理员     123456
worker 打工人    123456
```
+ 根据用户角色，动态渲染Menu菜单
leftNav.jsx
```
// 在渲染菜单前，做一个权限判断
// 1. 当前菜单对应的路由数据包中 roles数组
// 2. 状态机中，用户角色 role    this.props.user.userInfo.role
return menuList.map((item) => {
  if (!item.children) {
    //如果不存在子菜单，说明只有一级菜单
    let { role } = this.props.user.userInfo //当前用户的角色
    let bool = item.roles.includes(role)  //判断当前用户是否由权限访问当前菜单
    return (
      bool 
      ?
      <Menu.Item key={item.key}>
        <Link to={item.key}>
          <Icon type={item.icon} />
          <span>{item.title}</span>
        </Link>
      </Menu.Item>
      : ''
    );
  } 
```
此时还是可以根据路由访问到权限之外的路由

+ 根据用户角色，动态渲染Route组件
只渲染权限之内的路由

config/menuConfig.js
```
import Home from "../pages/admin/home/home";
...   //引入所有组件

{
component:Home,//给每个对象添加component
}
```
admin.jsx
```
import {connect} from 'react-redux'

this.state = {
      routeList:[]
    };

componentDidMount(){
  let arr = [];  //将菜单数据包整合成以为数组格式
  menuList.forEach(item=>{
    if(!item.children){
      arr.push(item)
    }else{
      arr = [...arr,...item.children]
    }
  })
  console.log('一维数据包',arr);
  this.setState({
    routeList:arr
  })
}
render(){
  //判断是否登录代码
  let { role } = this.props.user.userInfo;  
  return (
    ....
    <Switch>
     {      
      this.state.routeList.map(item=>{
        let bool = item.roles.includes(role)
        return bool 
                ?
                <Route path={item.key} component={item.component} /> 
                :
                ''
        })
      }
      <Redirect from="*" to="/home" />
    </Switch>
  )
}
const mapStateToProps = (state)=>{
  return {
    'user': state.user   //将模块化的状态机中，需要使用的user数据包提取出来，注入到当前组件的props中
  }
}
export default connect(mapStateToProps)(Admin);
```

