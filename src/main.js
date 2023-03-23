import Vue from 'vue'
import App from './App.vue'
// 完整引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//按需引入
// import { Button, Select } from 'element-ui';

import router from './router';
import store from './store'
import './api/mock'
Vue.config.productionTip = false

Vue.use(ElementUI);
// Vue.use(Button)
// Vue.use(Select)
new Vue({
  render: h => h(App),
  router,
  store,  
  created(){
    store.commit('tab/ADD_MENU',router)
  }
}).$mount('#app')
