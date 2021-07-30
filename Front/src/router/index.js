import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Remindpassword from '../views/Remindpassword.vue'
import Menu from '../views/Menu.vue'
import CartPage from '../views/CartPage.vue'
import Reservation from '../views/Reservation.vue'
import FoodDetails from '../views/FoodDetails.vue'
import Settings from '../views/Settings.vue'
import Staff from '../views/Staff.vue'
import Order from '../views/Order.vue'
import OrderStaff from '../views/OrderStaff.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/settings',
    name: 'Settings',
    component: Settings
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
    path: '/order',
    name: 'Order',
    component: Order
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
  },
  {
    path: '/staff',
    name: 'staff',
    component: Staff
  },
  {
    path: '/orderstaff',
    name: 'Orderstaff',
    component: OrderStaff
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
