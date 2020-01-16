
import G2 from  '@antv/g2'
import {DataSet} from '@antv/data-set';
import Vue from 'vue'
import {get,post} from '../util/api'
import * as lodash from 'lodash';

let ComBindPlugin = {};

ComBindPlugin.install = function(Vue,options){
    Vue.prototype.$G2 = G2;
    window.G2 = G2;
    window.DataSet = DataSet;
    window.lodash = lodash;//注册使用lodash
    Vue.prototype.$lodash = lodash;//注册使用lodash
    Vue.prototype.get = get;
    Vue.prototype.post = post;
}

Vue.use(ComBindPlugin);


export default ComBindPlugin;






































