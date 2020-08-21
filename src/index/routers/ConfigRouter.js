import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "../../store";

Vue.use(VueRouter);

const Login = () => import('../components/Login');
const Home = () => import('../components/Home');
const Index = () => import('../components/com/Index');

export const router =  new VueRouter({
    mode:'history',
    base:'',
    routes :[
        {
            path : '/',
            name : '',
            component : Login,
            hidden:true,
            meta:{
                title:'通用配置系统'
            },   
        },
        {
            path : '/home',
            name : '',
            component : Home,
            hidden:true,
            children:[
                {
                    path : '/index',
                    name : '首页',
                    component : Index,
                    hidden:true,
                },

            ]
        },
    ]
});



export default router ;




















