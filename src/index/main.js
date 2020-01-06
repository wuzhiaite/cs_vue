import Vue from 'vue'
import App from './App.vue';
import ElementUI from 'element-ui';
import './element-variables.scss';
import '../style/theme/index.css';
import '../util/el-components';
import store from  '../store/index';
import router from './routers/ConfigRouter';
import '../plugin/ComBindPlugin';
import '../plugin/index';
import '../plugin/VueAxiosPlugin';

Vue.use(ElementUI);


Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


// router.beforeEach((to, from, next) => {
//   // 重新提交mutation，设置state.userInfo.uid
//   var menus = store.state.cs.menus;
//   router.addRoutes(menus)  // 添加动态路由
//   // console.log(router);
// });





