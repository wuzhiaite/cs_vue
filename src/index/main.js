import Vue from 'vue'
import App from './App.vue';
import store from  '../store/index';
import router from './routers/ConfigRouter';
import i18n from "../i18n/i18n";
import '../plugin/ComBindPlugin';
import '../plugin/index';//注册基础组件
import '../util/axios';//axios拦截器处理
import '../util/base/commonUtil';//全局通用方法
import '../util/com-filter';//通用filter
import './element-variables.scss';
import '../style/theme/index.css';
import '../util/el-components';
import 'video.js/dist/video-js.css'


i18n.locale = store.state.lang || 'zh-cn';

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')










