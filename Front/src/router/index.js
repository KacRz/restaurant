import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Remindpassword from '../views/Remindpassword.vue'
import Menu from '../views/Menu.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    alias: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    alias: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/remindpassword',
    name: 'Remindpassword',
    component: Remindpassword
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
