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
import VueDraggable from 'vue-draggable'
 
Vue.use(VueDraggable);//可拖动动画
Vue.use(ElementUI);


Vue.config.productionTip = false
// router.js文件
// 全局路由守卫，动态改变tille
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title || '配置管理系统';
  next();
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')






