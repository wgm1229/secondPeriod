### 1 创建项目

create-react-app projectName
1 安装 create-react-app 方式是 npm/cnpm/yarn i create-react-app -g
2 如果没有安装的话
npx create-react-app projectName
3 创建好之后启动项目
npm/yarn start
4 后管 采用 cli + antd + axios+nodejs+es6...
5 入口文件是 index.js,App.js 是根组件
6 react----->开发 web  
 ------>开发原生 react-native(js 开发原生)
7 安装 simple react snippets
8 reset.css 对样式进行重置
在 public 目录下面创建 css/reset.css
9 项目中登陆页面静态编码
10 安装 antd ui 框架
yarn add antd@3.26.19
cnpm i antd@3.26.19 --save
11 配置一下按需加载,具体参考文档

```
根目录创建一个 config-overrides.js 用于修改默认配置

```

12 设计两个一级路由
分别是/login 和/
13 引入 react-router/react-router-dom
14 创建 admin 首页和 login 组件(就是一级路由组件)
15 创建 assets 文件夹
16 高阶组件，我在使用 form 表单的时候用到了高阶组件,api 文档给咱们提供了处理方案
17 校验规则

```
ps: 按需加载，说白了就是使用哪些组件，就只需要加载哪些，没用到的不需要加载
    vue路由  npm i vue-router --save
    import Vue from 'vue
    import VueRouter from 'vue-router'
    Vue.use(VueRouter)
    const router = new VueRouter({
      mode:'history/hash',
      routes:[
        {
          path:'/xxx'
        }
      ]
    })
```

# day02

## 回顾

```
1 安装创建脚手架
2 依照官网安装配置antd
3 引入路由模块
4 配置路由(login/admin)
```

### 1 表单校验(自定义校验和 rule 校验)

# 20201223---day

### 登录调用接口跳转到 admin 首页

创建 api 目录,封装 ajax
github.com
npmjs.com 找到对应的 axios 模块
返回 promise 对象的时候你才可以使用 async 和 await 组合进行使用
js-cookie yarn add js-cookie
store yarn add store

## day20201224

### 17.0 以后被弃用的生命周期函数

componentWillMount
componentWillreceiveProps
componentWillUnMount

### 组件传参

父传子：属性
子传父:方法
redux:状态管理

### leftnav 不是路由组件，所以如果想使用路由功能的话，需要 withRouter 对其进行包装，将其转换成路由组件，方可使用

### 左侧菜单需要和路由配置一一对应,组要使用 link 标签使其点击进行跳转

### 路由对象有三大属性

history
location
match

### 在生命周期里面 componentDidMount 是在 render()之后执行的,componentWillMount 是在 render()之前执行的,而且他们都是执行一次

### 重点难点

递归获取一级菜单和二级菜单(为什么要递归),因为牵涉到二级菜单，我们不能直接把菜单写死在页面上，这样的话程序没有扩展性，
根据当前的 pathname 使对应的菜单选中，如果当前 pathname 有父亲的话，需要让父亲折叠状态变为打开状态，其余二级菜单合并起来
我在动态获取（遍历）菜单的时候，如果在 render 里面调用的话，那么我是拿不到 openKey,所以说我没有在 render 里面调用，而是在 conponentWillMount 里面执行获取动态菜单，从而在生命周期 conponentWillMount 阶段获取 this.openKey,因为 componentWillMount 是在 render 函数执行之前执行的,我也没有在 componentDidMount 里面调用,因为 componentDidMount 是在 render 函数之后执行的,如果在这个阶段(componentDidMount)执行,那么你也就错过了获取 openkey 的时机,就是说折叠菜单是再也打不开的,所以说，要理解生命周期的正确使用方式，从而可以解决问题,这些东西实际上是牵涉执行流程的。
对于 api 文档，大家要自己使用一下
