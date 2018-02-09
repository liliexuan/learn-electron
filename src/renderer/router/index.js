import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/login').default
    },
    {
      path: '*',
      redirect: '/'
    }
    /**
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
     */
  ]
})
