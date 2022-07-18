import Vue from 'vue'
import VueRouter from 'vue-router'
import ShoppingCart from '../views/ShoppingCart.vue'
import Cart from '../components/Cart.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'shopping-cart',
    component: ShoppingCart
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router