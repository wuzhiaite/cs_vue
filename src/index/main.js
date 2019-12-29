import Vue from 'vue'
import App from './App.vue';
import * as lodash from 'lodash';
import ElementUI from 'element-ui';
import './element-variables.scss';
import '../style/theme/index.css';
import '../util/el-components';
import {get,post} from '../util/api'
import '../plugin/index';
import store from  '../store/index'
import router from './routers/ConfigRouter';


Vue.use(ElementUI);
window.lodash = lodash;//注册使用lodash
Vue.prototype.$lodash = lodash;//注册使用lodash
Vue.prototype.get = get;
Vue.prototype.post = post;

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   // 重新提交mutation，设置state.userInfo.uid
//   var menus = store.state.cs.menus;
//   router.addRoutes(menus)  // 添加动态路由
//   // console.log(router);
// });



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

