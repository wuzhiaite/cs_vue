import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes :[
        {
            path : '/',
            name : '首页',
            component : () => import('../components/Index'), 
            meta:{
                title:'首页'
            }
        },{
            path : '/home',
            name : '',
            component : () => import('../components/Home'), 
            meta:{
                title:'配置系统'
            }
        }
        
        ,{
            path :'/pagelist',
            name:'配置页面',
            component : () => import('../components/conf/PageList'),
            meta:{
                title:'配置页面'
            }
        },{
            path : '/commonform',
            name : '通用表单',
            component : () => import('../components/conf/CommonForm'),
            meta:{
                title:'通用表单'
            }
        },{
              path:'/commonComponent',
              name : '通用组件',
              component : () => import('../components/conf/ComComponent'),
              iconCls:'el-icon-collection',
              meta:{
                title:'配置系统'
                }
        },{
            path : '/comPageList',
            name : '通用台账',
            component : () => import('../components/conf/ComPageList'),
            iconCls:'el-icon-collection',
            meta:{
                title:'通用台账'
            }
        },{
            path : '/graphExp01',
            name : '统计图标样例01',
            component : () => import('../components/charts/Exp01'),
            iconCls:'el-icon-collection',
            meta:{
                title:'统计图标样例01'
            }
        },
        {
            path : '/graphExp02',
            name : '统计图标样例02',
            component : () => import('../components/charts/Exp02'),
            iconCls:'el-icon-collection',
            meta:{
                title:'统计图标样例02'
            }
        }
    ]
}); 






















