import Vue from 'vue'
import App from './App.vue'
import {MenuRouter} from './routers/MenuRouter';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);//使用ui框架
Vue.config.productionTip = false




new Vue({
  MenuRouter,
  render: h => h(App),
}).$mount('#app')
