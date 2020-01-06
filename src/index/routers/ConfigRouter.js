import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    routes :[
        {
            path : '/',
            name : '首页',
            component : () => import('../components/Index'), 
        },{
            path : '/home',
            name : '',
            component : () => import('../components/Home'), 
        },{
            path :'/pagelist',
            name:'配置页面',
            component : () => import('../components/conf/PageList'),
        },{
            path : '/commonform',
            name : '通用表单',
            component : () => import('../components/conf/CommonForm'),
        },{
              path:'/commonComponent',
              name : '通用组件',
              component : () => import('../components/conf/ComComponent'),
              iconCls:'el-icon-collection',
        },{
            path : '/comPageList',
            name : '通用台账',
            component : () => import('../components/conf/ComPageList'),
            iconCls:'el-icon-collection',
        },{
            path : '/bargraph',
            name : '柱状统计图',
            component : () => import('../components/charts/BarGraph'),
            iconCls:'el-icon-collection',
        }
    ]
}); 






















