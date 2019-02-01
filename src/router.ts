import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/sshmain',
      name: 'sshmain',
      // route level code-splitting
      // this generates a separate chunk (sshmain.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "sshmain" */ './views/sshmain.vue')
    }
  ]
})
