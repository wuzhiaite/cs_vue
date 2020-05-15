import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
    mode:'history',
    base:'',
    routes :[
        {
            path : '/',
            name : '',
            component : () => import('../components/Login'), 
            hidden:true,
            meta:{
                title:'通用配置系统'
            },   
        },
        {
            path : '/home',
            name : '',
            component : () => import('../components/Home'), 
            hidden:true,
            children:[
                {
                    path : '/index',
                    name : '首页',
                    component : () => import('../components/Index'),
                    hidden:true,
                },
                // {
                //     path : '/confPageList/:id',
                //     name : '通用台账增加',
                //     component : () => import('../components/conf/page/ConfPageList'),
                //     hidden:true, 
                //     meta:{
                //         title:''
                //     },
                //     hidden:true,
                // },
            ]
        },
    ]
}); 






















