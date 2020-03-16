
import G2 from  '@antv/g2'
import {DataSet} from '@antv/data-set';
import Vue from 'vue'
import * as lodash from 'lodash';
import axios from 'axios'


let ComBindPlugin = {};

ComBindPlugin.install = function(Vue,options){
    Vue.prototype.$G2 = G2;
    window.G2 = G2;
    window.DataSet = DataSet;
    window.lodash = lodash;//注册使用lodash
    Vue.prototype.$lodash = lodash;//注册使用lodash
    Vue.prototype.axios = axios;
    Vue.prototype.$http = axios ;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    
}

Vue.use(ComBindPlugin);


export default ComBindPlugin;






































