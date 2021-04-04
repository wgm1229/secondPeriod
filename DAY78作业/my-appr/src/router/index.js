import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWord from '@/components/HelloWorld'
import Home from '@/views/Home'
import Product from '@/views/Product'
import Prod1 from '@/views/Product/Prod1'
import Prod2 from '@/views/Product/Prod2'
import Prod3 from '@/views/Product/Prod3'
import Ad from '@/views/Ad'

Vue.use(VueRouter)

var router = new VueRouter({
    mode:'history',
    routes: [
        {
            path: '/',
            alias:'/hello',
            component: HelloWord
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/home/:id/:name',
            component: Home
        },
        {
            path: '/redirect',
            redirect: '/product'
        },
        {
            path:'/product',
            component:Product,
            children:[
                {
                    path: '/',
                    name:'pro1',
                    component: Prod1
                },
                {
                    path: 'prod2',
                    name:'pro2',
                    component: Prod2
                },
                {
                    path: 'prod3',
                    name:'pro3',
                    components: {
                        default:Prod3,
                        ad:Ad
                    }
                },
            ]
        }
    ]
})

export default router