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
// router.js文件
// 全局路由守卫，动态改变tille
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title || '默认'
  next()
})

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





