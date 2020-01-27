<template>
  <div :style="{height : screenHeight + 'px' }">
    <transition>
      <el-container>
        <el-header>
          <span class="el-title">
              <el-image 
                  class="el-img"
                  :src="url" 
                  :preview-src-list="srcList">
                </el-image>
            <!-- <img src="../img/logo.jpg" class="el-img"/> -->
          </span>
          <span class="el-title">
            {{systemName}}
          </span>
          <span class="el-user">       
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              {{username}}
            </span>
        </el-header>
      </el-container>  
    </transition>
    <el-container style="height: 93%; border: 1px solid #eee;width:100%;"> 
      <el-aside width="14%" style="background-color: #eee;" 
          router="true" mode="horizontal" >
       <el-menu style="background: #ececec;width: 180px;" 
              :default-active="$route.path"
              unique-opened router>
              <template v-for="(item,index) in routes" v-if="!item.hidden">
                <el-submenu :key="index" :index="index+''" style="text-align:left;">
                  <template slot="title">
                    <el-tooltip content="Top center" placement="top">
                        <i :class="item.iconCls" style="color: #20a0ff;width: 14px;" />
                    </el-tooltip>    
                    <span slot="title">{{item.name}}</span>
                  </template>
                  <el-menu-item width="180px"
                        v-if="item.children"
                        style="padding-left: 30px;padding-right:0px;margin-left: 0px;width: 170px;text-align: left"
                        v-for="child in item.children"
                        :index="child.path"
                        :key="child.path">
                         <el-tooltip content="Top center" placement="top">
                            <i :class="child.iconCls ? child.iconCls : 'el-icon-info'" 
                                style="color: #20a0ff;width: 14px;"/>
                         </el-tooltip>       
                            {{child.name}}
                  </el-menu-item>
                </el-submenu>
              </template>
            </el-menu>
      </el-aside>
      <el-main >
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/firstPage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <keep-alive>
               <router-view/>
          </keep-alive>
      </el-main>  
    </el-container>
  </div>
</template>

<script>
  import {mapGetters} from  'vuex';

  export default {
    name:'home',
    data() {
      return {
        isCollapse: false,
        url: '../img/logo.jpg',
        srcList: [
          '../img/logo.jpg',
        ]
      }
    },
    computed:{
       ...mapGetters({
              routes:'cs/getMenus',
              systemName : 'getSystemName',
              username : 'getUsername'}),
       screenHeight:{
          get(){
             return this.$store.state.screenHeight ;
          },
          set(value){
             this.$store.state.screenHeight = value ;
          }
       },
      screenWidth:{
          get(){
             return this.$store.state.screenWidth ;
          },
          set(value){
             this.$store.state.screenWidth = value ;
          }
       },  
       
     
    },
    mounted(){
      const that = this
      window.onresize = () => {
          return (() => {
              window.screenHeight = window.screen.availHeight - 100  ;
              that.screenHeight = window.screenHeight;
              that.screenWidth = window.screen.availWidth;
          })()
      }
    },
    watch:{
        screenHeight(val){
          // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
          if(!this.timer){
              // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
              this.screenHeight = val
              this.timer = true
              let that = this
              this.$store.dispatch("setScreenHeight",this.screenHeight);
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
    line-height: 70px;
    background-color: #409EFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    vertical-align:middle;
  }
  .el-img{
     border-radius:50%;
     width:55px;
     height:55px;
     margin:2.5px;
     margin-right:10px;
  }
  .el-header .el-title{
    font-size:30px;
    font-weight:weight;
    font-family:'微软雅黑';
    color:white;
    float:left;
  }
  .el-header .el-user {
      font-size: 13px;
      float:right;
      color:white;
  }
  .el-aside {
    color: #333;
  };

</style>