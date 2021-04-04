import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Singer from '../views/Singer.vue'
import Detail from '../views/Detail.vue'
import Player from '../views/Player.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/singer',
    name: 'singer',
    component: Singer
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/player/:id',
    name: 'player',
    component: Player
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
