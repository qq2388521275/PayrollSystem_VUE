import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Login from '../components/Login'
import Sheet from "../components/Sheet";
import Main from "../components/Main";

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
    // {
    //   path: '/Sheet',
    //   component: Sheet
    // },
    {
      path: '/Main',
      component: Main,
      children: [{
        path: '/Sheet',
        component: Sheet
      }],
    },
  ]
})
