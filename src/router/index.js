import Vue from 'vue'
import VueRouter from 'vue-router'
import ShoppingCart from '../views/ShoppingCart.vue'
import Cart from '../components/Cart.vue'
import Login from '../components/Login.vue'
import Admin from '../components/Admin.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/products',
    name: 'shopping-cart',
    component: ShoppingCart
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router