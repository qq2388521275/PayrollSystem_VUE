import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/Login'
import Sheet from "../components/Sheet";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Sheet',
      component: Sheet
    },
  ]
})
