import Vue from 'vue'
import App from './App.vue';
import store from  '../store/index';
import router from './routers/ConfigRouter';
import i18n from "../i18n/i18n";
import '../plugin/ComBindPlugin';
import '../plugin/index';//注册基础组件
import '../util/base/commonUtil';//全局通用方法
import '../util/com-filter';//通用filter
import './element-variables.scss';
import '../style/theme/index.css';
import '../util/el-components';
import 'video.js/dist/video-js.css';
import ElementUI from 'element-ui';
import VueAxiosPlugin from 'vue-axios-plugin';


i18n.locale = store.state.lang || 'zh-cn';

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')

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
    console.log(err);
    let message = "";
    //服务器出错的话，先清除token
    if(err.response.status === 500 || err.response.status === 504){
       store.state.token = '';
       localStorage.setItem("token","");
    }
    if (err.response.status == 504 || err.response.status == 404) {
      message = '服务器被吃了⊙﹏⊙∥';
    } else if (err.response.status == 403) {
      ElementUI.Message({
        message: '无访问权限，请先登录',
        type: 'error'
      });
      store.state.token = "" ;
      localStorage.setItem("token","");//本地保存的token设置为空

    } else if (err.response.status == 401) {
      message = err.response.data.msg ;
    } else {
      if (err.response.data.msg) {
        message = err.response.data.msg;
      }else{
        message = '服务器异常，请稍后重试!' ;
        // router.push({path : "/"});
      }
    }
    ElementUI.Message({
      message: message,
      type: 'warning'
    });
    if(!store.state.token){
      router.push({path : "/"});
    }
    return err ;
  }
});








