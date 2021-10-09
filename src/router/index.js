import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../views/HelloWorld'
import Login from '../views/Login'
import Sheet from '../views/Sheet'
import Main from '../components/Main'
import Add from '../views/EmployeeManage/Add'
import Delete from '../views/EmployeeManage/Delete'
import Edit from '../views/EmployeeManage/Edit'
import Query from '../views/EmployeeManage/Query'

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
          path: '/employee/delete',
          component: Delete
        },
        {
          path: '/employee/edit',
          component: Edit
        },
        {
          path: '/employee/query',
          component: Query
        },
      ],
    },
  ]
})
