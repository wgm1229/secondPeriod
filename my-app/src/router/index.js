import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/Home'
import Product from '@/views/Product'
import Prod1 from '@/views/Product/Prod1'
import Prod2 from '@/views/Product/Prod2'
import Prod3 from '@/views/Product/Prod3'
import Ad from '@/views/Ad'
Vue.use(VueRouter) //在Vue中引入插件的方式

var router = new VueRouter({ //定义路由实例对象
  mode: 'history',
  routes: [ //存放路由映射关系   路径 --> 组件
    {
      path: '/',
      alias: '/hello',
      component: HelloWorld
    },
    {
      path: '/redirect',
      redirect: '/product' //重定向
    },
    {
      path: '/home/:id/:num',
      component: Home
    },
    {
      path: '/product',
      component: Product,
      children: [ //子路由配置
        {
          // path: '/prod1', //这么写会出错

          path: '/',  //默认显示这个子组件
          name: 'pro1',
          component: Prod1
        },
        {
          path: 'prod2',  //子路由路径前，不能带 / 
          name: 'pro2',
          component: Prod2
        },
        {
          path: 'prod3',
          name: 'pro3',
          components: {
            default: Prod3, //默认加载的组件
            ad: Ad  //两个以上的组件中，第二个组件
          }
        }
      ]
    },
  ]
})
export default router
// 导出组件