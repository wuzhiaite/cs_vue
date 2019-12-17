import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    routes :[
        {
            path : '/',
            name : '首页',
            component : () => import('../components/Index'), 
        },
        {
            path :'/config/pagelist',
            name:'台账配置页面',
            component : () => import('../components/conf/PageList'),
        },
    ]
}); 






















