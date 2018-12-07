import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/Home.vue'
import Login from './views/Login/Login.vue'
import Register from './views/Register/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/collect',
      name: 'collect',
      // route level code-splitting
      // this generates a separate chunk (collet.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "collet" */ './views/Collect/Collect.vue')
    },
    {
      path: '/mapView',
      name: 'mapView',
      component: () => import('./views/MapView/MapView.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('./views/Manage/Manage.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('./views/Weather/Weather.vue')
    },
  ]
})
