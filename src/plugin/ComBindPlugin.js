
import G2 from  '@antv/g2'
import {DataSet} from '@antv/data-set';
import Vue from 'vue'
import * as lodash from 'lodash';
import axios from 'axios'
import {hasPermission, hasNoPermission, hasAnyPermission, hasRole, hasAnyRole} from '../util/permission-directive';



let ComBindPlugin = {};

ComBindPlugin.install = function(Vue,options){
    Vue.prototype.$G2 = G2;
    window.G2 = G2;
    window.DataSet = DataSet;
    window.lodash = lodash;//注册使用lodash
    Vue.prototype.$lodash = lodash;//注册使用lodash
    window.axios = axios ;
    Vue.prototype.axios = axios;
    Vue.prototype.$http = axios ;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    Vue.use(hasPermission);
    Vue.use(hasNoPermission);
    Vue.use(hasAnyPermission);
    Vue.use(hasRole);
    Vue.use(hasAnyRole);
    
}

Vue.use(ComBindPlugin);


export default ComBindPlugin;






































