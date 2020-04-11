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
import VueDraggable from 'vue-draggable'
import VueAxiosPlugin from 'vue-axios-plugin';
import filters from '../util/com-filter';//通用filter
import '../util/base/commonUtil';


Vue.use(VueDraggable);//可拖动动画
Vue.use(ElementUI);


//全局filter注册
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')


//页面跳转处理
Vue.config.productionTip = false
window.document.title = '配置管理系统';

// router.js文件
// 全局路由守卫，动态改变tille
router.beforeEach((to, from, next) => {
  console.log(store.state.token);
  if(store.state.token ){
    if(to.path === '/'){
      //登录状态下 访问login.vue页面 会跳到index.vue
      next({path: '/index'});
     }else{
      next();
     }
  }else{
    if (to.path === '/') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
      next();
     } else { // 否则 跳转到登录页面
      next({ path: '/' });
     }
  }
})



//axios请求拦截处理
Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config =>{
    let token = store.state.token;
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = "Bearer "+token;
    }
    return config ;
  },
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => {
    return response ;
  },
  resErrorFunc: err => {
    let message = "";
    if (err.response.status == 504 || err.response.status == 404) {
      message = '服务器被吃了⊙﹏⊙∥';
    } else if (err.response.status == 403) {
      ElementUI.Message({
        message: '无访问权限，请先登录',
        type: 'error'
      });
      localStorage.setItem("token","");//本地保存的token设置为空
      router.push({path : "/"});
    } else if (err.response.status == 401) {
      message = err.response.data.msg ;
    } else {
      if (err.response.data.msg) {
        message = err.response.data.msg;
      }else{
         message = '未知错误!' ;
      }
    }
    ElementUI.Message({
        message: message,
        type: 'warning'
    });
    return err ;
  }
});





