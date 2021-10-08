import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../views/HelloWorld'
import Login from '../views/Login'
import Sheet from "../views/Sheet";
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
