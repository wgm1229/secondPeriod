# React梳理

## React核心知识
1. JSX作用及其语法
  + 语法糖
  + 虚拟DOM与Diff算法 ？
  + 属性动态绑定  <div className={isActive?'active':''}></div>
  + 数据的动态绑定

2. 组件分类
  + 函数式组件，在以前的版本中，曾经叫无状态组件
  + 类组件
    - state  组件内部定义使用
    - props  组件外部传入使用
    - propTypes类型验证，需要安装propTypes验证包
    [props验证文档](https://react.docschina.org/docs/typechecking-with-proptypes.html)
  
3. 组件通信
  + 父子通信   父级---props数据包---子级
  + 子父通信   父级---props事件函数---子级
  + 非父子关系的通信    [Context](https://react.docschina.org/docs/context.html)
  + Redux

4. 数据渲染处理的方式
  + 如非必要、勿增实体
  + 大量采用了原生js完成数据的处理
  + 使用率比较高的原生js方法 (map、filter、forEach、splice、三目运算)
  + 多回顾原生js的数组、对象操作相关方法

5. React生命周期函数
  + 初始化   constructor render componentDidMount
  + 更新阶段  render  componentDidUpdate  
      - shouldComponentUpdate (优化，根据此生命周期函数返回的布尔值，决定要不要重新渲染组件)
  + 销毁阶段
      - componentDidUnmount

6. 表单的操作
  + 非受控组件， 通过ref的方式操作表单元素
  + 受控组件，   通过数据驱动+onChange事件的方式操作表单元素
    - react中通过受控方式操作input，就是vue中v-model的实现原理

7. 事件定义及使用
  + 普通事件函数   需要在constructor中修正this指向
  + 箭头函数 

## 拓展方法
  + createRef  获取真实DOM（集成第三方库，Echarts、富文本编辑器）
  + Context  组件通信  
  + Fragment  代码片段   可以简写为 <></>
  + HOC 高阶组件，本质是函数，可以对传入的组件做处理后，抛出新的组件
    - withRouter  向指定组件中注入路由对象
    - connect     react-redux提供的方法，向指定组件中注入状态机的state与dispatch

## Hooks新特性
  + useState  使得函数式组件内部拥有state状态
  + useEffect 使得函数式组件内部能够模拟生命周期效果
  + useRef    在函数式组件中获取真实DOM
  ...

# React-Router-Dom
> 通过组件化的方式、实现路由管理
1. 基本使用流程
  + 安装
  + BrowserRouter/HashRouter 包裹根组件
  + Route组件映射路由关系
  + Link、NavLink实现路由跳转
2. 编程式导航
  + this.props.history.push(路径)
  + this.props.history.push({pathname:'',state:{数据包}})
  + 在目标组件中提取路由参数  this.props.location/match
3. 路由守卫
  ```
  <Route path="/" render={()=>{
    在此处做判断后，决定需要渲染的组件
  }}/>
  ```
4. 路由嵌套
  + 在不同层级的组件中新增Route
  + Route的路径必须是全路径
5. Switch
  + 实现Route组件单一匹配
  + 实战中，可以用了处理404组件引导
  ```
  <Switch>
    <Route path="/home" component={}/>
    <Route path="/product" component={}/>
    <Route path="*" component={NotFound}/>
  </Switch>
  ```
6. withRouter

7. Redirect 重定向

## 路由知识点面试套路
  + react-router 使用的如何？
  + withRouter具体是做什么用的？在什么场景下使用过他？
  + 问原理
    - withRouter背后实现的原理？  HOC高阶组件withRouter(Home)
    - 手写简单react-router方法模块？ Route、Link

## Redux

1. Flux架构  单向数据流思想
  + 能够进行理论阐述
  + 能够完整描述Flux架构数据流程图
    - store  状态机
    - view   视图
    - action  动作描述
    - dispatch  派发action到store

2. Redux使用
> 如果你不太确定是否要用Redux，可能你就不需要用
> Redux是使用原生js封装而成的，与React没有强绑定关系
> 在普通的html中也能使用
 + 发布订阅模式

3. Redux + React-Redux  【重难点】
> react-redux可以让我们更方便的在React中使用Redux
  + reducer  纯函数，作用是根据action处理得到对应数据
    - combinReducers   整合多个reducer
  + Redux.createStore(reducers)  定义状态机
  + Provider  在根组件全局注入状态机
  + connect(mapStateToProps,mapDispatchToProps)(组件)

4. Redux + React-Redux + Redux-Thunk  实现状态机的异步操作
  - applyMiddleware

5. 【拓展】Redux + React-Redux + dva或@rematch/core

6. 手写Redux？

## 设计模式与算法
  + 设计模式  （常见的设计模式）
    - 《JavaScript设计模式与开发实践》[豆瓣介绍](https://book.douban.com/subject/26382780/)
    - [参考文章](https://juejin.cn/post/6844903751225081864)
  + 算法
    - 处理数据包的思路
    - [常见算法参考文章](https://juejin.cn/post/6844903955592380424)
    - [leetCode](https://leetcode-cn.com/) 


## vue项目部署

1. 一台云服务器
> CentOS系统7.8

2. FTP工具
> 向远程服务器上传文件的工具
[官网下载](https://filezilla-project.org/)

3. 在云服务安装相关环境(node环境)

4. 使用FTP工具登录并链接云服务
 + 向云服务器上传项目服务端代码
 + 安装node服务端项目依赖
 + 启动node项目

5. 服务端项目静态资源
> 存放在当前Node项目public下的资源文件（html、css、js）
> 静态资源文件，可以被客户端浏览器直接加载渲染

6. 对vue或react项目执行打包操作
  + 在vue.config.js中配置publicPath  （参考vue-cli官方文档）
  + 执行npm run build

7. 将打包后的vue项目文件通过FTP上传到node服务的public目录下

8. 在浏览器端，通过  公网ip:3300 访问vue项目的打包资源

9. 打包后vue本地配置的代理会失效
解决方案，添加node服务端代理
[http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)
```
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('/api', createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true }));
```