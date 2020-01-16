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
            path : '/graphExp01',
            name : '统计图标样例01',
            component : () => import('../components/charts/Exp01'),
            iconCls:'el-icon-collection',
        },
        {
            path : '/graphExp02',
            name : '统计图标样例02',
            component : () => import('../components/charts/Exp02'),
            iconCls:'el-icon-collection',
        }
    ]
}); 






















