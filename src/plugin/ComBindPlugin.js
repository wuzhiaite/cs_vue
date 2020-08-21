
import G2 from  '@antv/g2'
import {DataSet} from '@antv/data-set';
import Vue from 'vue'
import * as lodash from 'lodash';
import axios from 'axios'
import Video from 'video.js'
import VueDraggable from 'vue-draggable'
import ElementUI from 'element-ui';
import {hasPermission, hasNoPermission, hasAnyPermission, hasRole, hasAnyRole} from '../util/permission-directive';



let ComBindPlugin = {};

ComBindPlugin.install = function(Vue,options){
    //页面跳转处理
    Vue.config.productionTip = false
    window.document.title = 'cs-lpf';
    Vue.prototype.$G2 = G2;
    window.G2 = G2;
    window.DataSet = DataSet;
    window.lodash = lodash;//注册使用lodash
    Vue.prototype.$lodash = lodash;//注册使用lodash
    window.axios = axios ;
    Vue.prototype.axios = axios;
    Vue.prototype.$http = axios ;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    Vue.prototype.$video = Video //引入Video播放器
    Vue.use(VueDraggable);//可拖动动画
    Vue.use(ElementUI);
    Vue.use(hasPermission);
    Vue.use(hasNoPermission);
    Vue.use(hasAnyPermission);
    Vue.use(hasRole);
    Vue.use(hasAnyRole);
    
}

Vue.use(ComBindPlugin);


export default ComBindPlugin;






































