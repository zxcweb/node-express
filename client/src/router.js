import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/Home.vue'
import Login from './views/Login/Login.vue'
import Register from './views/Register/Register.vue'
import MapView from './views/MapView/MapView.vue'
import Manage from './views/Manage/Manage.vue'
import Weather from './views/Weather/Weather.vue'
import Collect from './views/Collect/Collect.vue'

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
      component: Collect
    },
    {
      path: '/mapView',
      name: 'mapView',
      component: MapView
    },
    {
      path: '/weather',
      name: 'weather',
      component: Weather
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage
    },
    
  ]
})
