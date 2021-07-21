import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Remindpassword from '../views/Remindpassword.vue'
import Menu from '../views/Menu.vue'
import CartPage from '../views/CartPage.vue'
import Reservation from '../views/Reservation.vue'
import FoodDetails from '../views/FoodDetails.vue'

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
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: Reservation
  },
  {
    path: '/menu/food-details',
    name: 'food-details',
    component: FoodDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
