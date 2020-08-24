import Vue from "vue";
import VueAxiosPlugin from "vue-axios-plugin";
import store from "../store";
import router from "../index/routers/ConfigRouter";
import { MessageBox, Message } from 'element-ui'



//axios请求拦截处理
Vue.use(VueAxiosPlugin, {
    // 请求拦截处理
    reqHandleFunc: config =>{
        let token = store.state.token;
        if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = "Bearer "+token;
        }
        return config ;
    },
    reqErrorFunc: error => Promise.reject(error),
    // 响应拦截处理
    resHandleFunc: response => {
        console.log(response);
        return response ;
    },
    resErrorFunc: err => {
        console.log(err);
        let message = "";
        if (err.response.status == 504 || err.response.status == 404) {
            message = '服务器被吃了⊙﹏⊙∥';
        } else if (err.response.status == 403) {
            ElementUI.Message({
                message: '无访问权限，请先登录',
                type: 'error'
            });
            store.state.token = "" ;
            localStorage.setItem("token","");//本地保存的token设置为空
            router.push({path : "/"});
        } else if (err.response.status == 401) {
            message = err.response.data.msg ;
        } else {
            if (err.response.data.msg) {
                message = err.response.data.msg;
            }else{
                message = '服务器异常，请稍后重试!' ;
                // router.push({path : "/"});
            }
        }
        Message({
            message: message,
            type: 'warning'
        });
        return err ;
    }
});




