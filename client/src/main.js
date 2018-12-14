import Vue from 'vue'
import ElementUI from 'element-ui';
import axios from 'axios'
import Qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/assets/font/iconfont.css'

//QS是axios库中带的，不需要我们再npm安装一个
 
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
