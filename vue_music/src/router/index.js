import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home',
    // name: 'Recommend',
    // component: Recommend
  },
  {
    path: '/home',
    name: 'Recommend',
    component: Recommend,
    meta:{showNav:true}  //meta路由原信息.
  },
  {
    path: '/hot',
    name: 'Hot',
    component: ()=>import('../views/Hot'),
    meta:{showNav:true}  //meta路由原信息.
  },
  {
    path: '/hot/:num',
    name: 'Hot',
    component: ()=>import('../views/Hot'),
    meta:{showNav:true}  //meta路由原信息.
  },
  {
    path:'/musiclist/:musicid',
    name:'MusicList',
    component:()=>import('../views/MusicList'),
    meta:{showNav:false}
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta:{showNav:true}  //meta路由原信息.
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue'),
    meta:{showNav:true}  //meta路由原信息.
  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import('../views/Rank.vue'),
    // meta:{showNav:true}  //meta路由原信息.
  },
]

const router = new VueRouter({
  mode: 'hash',
  linkActiveClass:'link-active',
  base: process.env.BASE_URL,
  routes
})

export default router
