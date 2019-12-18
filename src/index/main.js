import Vue from 'vue'
import App from './App.vue';
import * as lodash from 'lodash';
import ElementUI from 'element-ui';
import './element-variables.scss';
import '../style/theme/index.css';
import '../util/el-components';
import {get,post} from '../util/api'


Vue.use(ElementUI);
window.lodash = lodash;//注册使用lodash
Vue.prototype.$lodash = lodash;//注册使用lodash
Vue.prototype.get = get;
Vue.prototype.post = post;




Vue.config.productionTip = false



new Vue({
  render: h => h(App),
}).$mount('#app')
