import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    let token = store.getters.token;
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = "Bearer "+token;
    }
    return config ;
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
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
    return Promise.reject(error)
  }
)

export default service
