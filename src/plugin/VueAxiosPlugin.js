'use strict'

import Vue from 'vue';
import VueAxiosPlugin from 'vue-axios-plugin';
import axios from 'axios'

//loading框设置局部刷新，且所有请求完成后loading框关闭
let loading;
function startLoading(){
    loading = Vue.prototype.$loading({
            lock:true,
            text:'加载中....',
            target: document.querySelector('.loading-area')
    });
}

function endLoading(){
    loading.close();
}
//声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;
function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
};
function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
      endLoading();
    }
};


Vue.use(VueAxiosPlugin ,{
    reqHandleFunc:config => {//请求拦截处理
        showFullScreenLoading();
        console.log(config);
        return config;
    }, 
    reqErrorFunc:error => {   //请求错误处理    
        tryHideFullScreenLoading();
        Promise.reject(error)
    },
    //响应拦截处理
    resHandleFunc:response => {
        tryHideFullScreenLoading();
        console.log(response);
        return response;
    },

    resErrorFunc : error => {
        tryHideFullScreenLoading();
        if (err.response.status == 504 || err.response.status == 404) {
            Message.error({ message: '服务器被吃了⊙﹏⊙∥' });
        } else if (err.response.status == 403) {
            Message.error({ message: '权限不足,请联系管理员!' });
        } else {
            Message.error({ message: '未知错误' });
        }
        Promise.reject(error)
    }
});

//对全局axios的属性进行设置
axios.defaults.baseURL='/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//绑定
Vue.prototype.$http = axios;

export default VueAxiosPlugin;
















