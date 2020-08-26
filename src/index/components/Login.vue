<template>
  <div id="login" >

      <div class="login-form">
          <el-form :rules="rules" class="login-container" label-position="left" :model="loginForm"
                label-width="0px" v-loading="loading">
              <div>
                  <el-row>
                      <img src="@/assets/base/logo.png" height="50px" width="50px"/>
                  </el-row>
                  <el-row>
                      <img src="@/assets/base/system.png" style="height:60px;" />
                      <h4 style="font-weight:normal;"> 基础后台管理系统 </h4>
                  </el-row>
              </div>
              <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username"
                          auto-complete="off" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password"
                          auto-complete="off" placeholder="密码"></el-input>
              </el-form-item>
              <!-- <el-checkbox class="login_remember" v-model="checked"
                          label-position="left">记住密码</el-checkbox> -->
              <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%" @click="submit">登录</el-button>
              </el-form-item>
          </el-form>
      </div>
 
</div>
</template>
<script>
 import {mapActions, mapMutations} from 'vuex';

  export default{
    data(){
      return {
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: 'root',
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
      ...mapActions(["setUserAction"]),
      ...mapMutations(["setToken"]),
      submit: function () {
          localStorage.clear();
          this.$axios.post("/api/user/login",
          {
              username:this.loginForm.username,
              password:this.loginForm.password,
          }).then(res =>{
              var data = res.data ;
              console.log(data);
              if(data.code == 1){
                  var result = data.result ;
                  this.setToken(result.token);
                  this.setUserAction(result.user);
                  var path = this.$route.query.redirect;
                  this.$router
                        .replace({path: path == '/' || path == undefined ? '/index' : path});
              }else{
                  // this.$message.error(data.message + '');
              }


          });



        
      }
    }
  }
</script>
<style scoped>

  #login{
    background-repeat: no-repeat;  
    background-size: 100% 100%;
  } 
  .login-form{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
  }
  .login-container {
      background-color:white;
    border-radius: 15px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    border: 1px solid #eee;
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
