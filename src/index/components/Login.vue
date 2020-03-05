<template>
  <div id="login"  :style="{'height': screenHeight - 90 + 'px'}">

      <div class="login-form">
          <el-form :rules="rules" class="login-container" label-position="left" :model="loginForm"
                label-width="0px" v-loading="loading">
              <h3 class="login_title">系统登录</h3>
              <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username"
                          auto-complete="off" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password"
                          auto-complete="off" placeholder="密码"></el-input>
              </el-form-item>
              <el-checkbox class="login_remember" v-model="checked"
                          label-position="left">记住密码</el-checkbox>
              <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%" @click="submit">登录</el-button>
              </el-form-item>
          </el-form>
      </div>
 
</div>
</template>
<script>
 

  export default{
    data(){
      return {
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: 'admin',
          password: '123'
        },
        loading: false,
        screenHeight :  window.screen.availHeight,
      }
    },
     mounted(){
      const that = this
      window.onresize = () => {
          return (() => {
              that.screenHeight = window.screen.availHeight ;
          })()
      }
    },
    methods: {
      submit: function () {
        var path = this.$route.query.redirect;
        this.$router
              .replace({path: path == '/' || path == undefined ? '/index' : path});
      }
    }
  }
</script>
<style scoped>
  #login{
    display:block;
    background-image: url("../../../static/img/login.jpg");
    background-repeat: no-repeat;  
    background-size: 100% 100%;    
  } 
  .login-form{
    background:transparent;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
 
</style>
