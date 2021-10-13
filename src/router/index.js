import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../views/HelloWorld'
import Login from '../views/Login'
import Sheet from '../views/Sheet'
import Main from '../components/Main'
import Add from '../views/EmployeeManage/Add'
import Query from '../views/EmployeeManage/Query'
import OrderAdd from  '../views/OrderManage/OrderAdd'
import OrderQuery from "../views/OrderManage/OrderQuery";
import Admin from '../views/PayRoll/Admin'

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
      children: [
        {
          path: '/Sheet',
          component: Sheet
        },
        {
          path: '/employee/add',
          component: Add
        },
        {
          path: '/employee/query',
          component: Query
        },
        {
          path: '/order/add',
          component: OrderAdd
        },
        {
          path:'/order/query',
          component:OrderQuery
        },
        {
          path:'/payroll',
          component:Admin
        },
      ],
    },
  ]
})
