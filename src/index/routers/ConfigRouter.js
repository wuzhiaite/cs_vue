import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    routes :[
        {
            path : '/index',
            name : '首页',
            component : () => import('../components/Index'), 
        },{
            path : '/home',
            name : '',
            component : () => import('../components/Home'), 
        },{
            path :'/pagelist',
            name:'通用台账',
            component : () => import('../components/conf/PageList'),
        },{
            path : '/commonform',
            name : '通用表单',
            component : () => import('../components/conf/CommonForm'),
        },{
              path:'/commonComponent',
              name : '通用组件',
              component : () => import('../components/BrushSignature'),
              iconCls:'el-icon-collection',
           }, 
    ]
}); 






















