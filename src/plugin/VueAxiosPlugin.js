'use strict'

import Vue from 'vue';
import VueAxiosPlugin from 'vue-axios-plugin';
import axios from 'axios'


Vue.use(VueAxiosPlugin ,{
    reqHandleFunc:config => {//请求拦截处理
        console.log(config);
        return config;
        }, 

    reqErrorFunc:error => Promise.reject(error),//请求错误处理
    //响应拦截处理
    resHandleFunc:response => {
        console.log(response);
        return response;
    },

    resErrorFunc : error => Promise.reject(error)
});

//对全局axios的属性进行设置
axios.defaults.baseURL='/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//绑定
Vue.prototype.$http = axios;

export default VueAxiosPlugin;
















