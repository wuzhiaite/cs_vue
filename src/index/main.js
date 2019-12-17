import Vue from 'vue'
import App from './App.vue';
import * as lodash from 'lodash';
import ElementUI from 'element-ui';
import './element-variables.scss';
import '../style/theme/index.css';


Vue.use(ElementUI);
window.lodash = lodash;//注册使用lodash
Vue.prototype.$lodash = lodash;//注册使用lodash





Vue.config.productionTip = false



new Vue({
  render: h => h(App),
}).$mount('#app')
