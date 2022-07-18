import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueToastr from "vue-toastr"
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueSweetalert2);

Vue.use(VueToastr, {
  defaultTimeout: 3000,
  defaultProgressBar: false,
  defaultPosition: 'toast-top-right',
  defaultCloseOnHover: false,
  defaultClassNames: ["animated", "zoomInUp"]
});

Vue.config.productionTip = false

new Vue({
  VueToastr,
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')