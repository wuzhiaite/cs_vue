<template>
  <div :style="{height : screenHeight + 'px' }">
    <el-container style="height: 100%; border: 1px solid #eee">     
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)" 
          router="true" mode="horizontal" >
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>   -->
        <el-menu  router unique-opened  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">              
              <i class="el-icon-setting"></i>
                <span slot="title"> 页面配置 </span>
            </template>
               <el-menu-item-group>
                   <el-menu-item index="/config/pagelist" key="pageList">台账页面配置</el-menu-item>
                </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        <router-view  />
      </el-main>  
    </el-container>
  </div>
</template>

<script>
  import router from '../routers/ConfigRouter';
  export default {
    name:'home',
    router,
    data() {
      return {
        screenHeight: window.screen.availHeight - 100,
        isCollapse: false,
      }
    },
    mounted(){
      console.log(this.$router.currentRoute);
      const that = this
      window.onresize = () => {
          return (() => {
              window.screenWidth = document.body.clientWidth
              that.screenWidth = window.screenWidth
          })()
      }
    },
    watch:{
        screenHeight(val){
          // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
          if(!this.timer){
              // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
              this.screenWidth = val
              this.timer = true
              let that = this
              setTimeout(function(){
                  // 打印screenWidth变化的值
                  console.log(that.screenWidth)
                  that.timer = false
              },400)
          }
      }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }




    }


  }
</script>

<style>
   .el-header {
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>