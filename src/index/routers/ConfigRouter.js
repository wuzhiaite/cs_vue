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

// 全局路由守卫，动态改变tille
router.beforeEach((to, from, next) => {
    console.log(to.path);
    if(store.state.token ){
        if(to.path === '/'){
            //登录状态下 访问login.vue页面 会跳到index.vue
            next({path: '/index'});
        }else{
            next();
        }
    }else{
        if (to.path === '/') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
            next();
        } else { // 否则 跳转到登录页面
            next({ path: '/' });
        }
    }
})

export default router ;




















