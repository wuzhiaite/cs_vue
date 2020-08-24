import Vue from 'vue'
import App from './App.vue';
import './element-variables.scss';
import '../style/theme/index.css';
import '../util/el-components';
import store from  '../store/index';
import router from './routers/ConfigRouter';
import '../plugin/ComBindPlugin';
import '../plugin/index';
import VueAxiosPlugin from 'vue-axios-plugin';
import '../util/axios';
import '../util/base/commonUtil';
import 'video.js/dist/video-js.css'
import i18n from "../i18n/i18n";
import '../util/com-filter';//通用filter



i18n.locale = store.state.lang || 'zh-cn';

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')










