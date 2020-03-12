<template>
  <div :style="{height : screenHeight + 'px',padding:'0px' }">
    <el-container style="height: 100%; border: 1px solid #eee;"> 
      <el-aside :width="( collapse ? 64+'px' : '200px') " 
          style="background-color: ; " >
         
          <el-menu 
              :collapse=" collapse"
              background-color="" 
              text-color=""
              active-text-color=""
              style="border:0px;"
              :default-active="$route.path"
              unique-opened router>
              <div class="el-system">
                <i class="el-icon-eleme"/>
                <span class="el-title" v-show="!collapse">
                  {{systemName}}
                </span>
            </div>
 
              <el-submenu 
                  v-for="(item,index) in routes" v-if="!item.hidden" class="title"
                  :key="index" :index="index+''" style="text-align:left;">
                <template slot="title">
                  <el-tooltip v-if="item.iconCls" :content=" item.desc ? item.desc : item.name " placement="top">
                      <i :class="item.iconCls ? item.iconCls : '' "  class="el-icon"  />
                  </el-tooltip>    
                  <span slot="title">
                    {{item.name}}
                  </span>
                </template>
                <el-menu-item 
                      v-if="item.children"
                      style="padding-left: 30px;text-align: left"
                      v-for="child in item.children"
                      :index="child.path"
                      :key="child.path">      
                            {{child.name}}
                </el-menu-item>
              </el-submenu>
            </el-menu>
      </el-aside>
    
      <el-container>  
        <el-header class="system-header">
          <el-row>
            <el-col :span="2" >
                <div style="font-size:20px;text-align:left;" @click="collapse=!collapse">
                   <i v-show="collapse" class="el-icon-d-arrow-right"/>
                   <i v-show="!collapse" class="el-icon-d-arrow-left"/>
                </div>
            </el-col>
            <el-col :span="3" :offset="16">
                <div style="font-size:15px;text-align:left;">
                  <span class="el-title" >
                      <el-image 
                          class="el-img"
                          :src="url" >
                      </el-image>
                  </span>
                  <span>王小虎</span>
                </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">
                 <i class="el-icon-switch-button"/>
                退出登录
              </div>
            </el-col>
          </el-row>
        </el-header>
        
        <el-main>
          <el-header height="40px" style="line-height:40px;" >
             <el-breadcrumb separator-class="el-icon-arrow-right"  >
                <el-breadcrumb-item :to="{ path: '/index' }">
                    <i class="el-icon-house"/>&nbsp;首页
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
            </el-breadcrumb>
         </el-header>  
            <keep-alive>
                <router-view />
            </keep-alive>
        </el-main> 
      </el-container> 
    </el-container>
  </div>
</template>

<script>
  import {mapGetters} from  'vuex';

  export default {
    name:'home',
    data() {
      return {
        collapse: false,
        url: '',
        srcList: [],
      }
    },
    created:function(){
        var url = require('../img/logo.jpg');
        this.url = url;
        this.srcList.push(url);
        console.log(this.screenWidth);
    },
    computed:{
       ...mapGetters({
              screenHeight:'getScreenHeight',
              screenWidth:'getScreenWidth',
              routes:'cs/getMenus',
              systemName : 'getSystemName',
              username : 'getUsername'}),
    },
   watch:{
     screenWidth:function(n,o){
        if(n < 1000){
          this.collapse = true;
        }else{
          this.collapse = false ;
        }
     }
   },
    methods:{
      openSelfInfo(){
      },
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
i{
  font-size:20px;
}
.el-container{
  background-color:white ;
}
  .el-icon{
    margin-right:15px;
  }
  .el-breadcrumb{
    padding-bottom:15px;
  }
   .el-header {
    color: #333;
    box-shadow: 0 2px 12px 5 rgba(0, 0, 0, 0.1);
    vertical-align:middle;
  }
  .el-row{
    cursor:pointer;
  }
  .system-header{
      font-size:13px;
      color:white;
      text-align:right;
      height:60px;
      line-height:60px;
      text-align:right;
      padding:5px;
      background-color:#409EFF;
  }
  .el-img{
     border-radius:50%;
     width:30px;
     height:30px;
     margin-right:10px;
     cursor:pointer;
  }
  .el-header .el-title{
    font-size:22px;
    font-weight:weight;
    font-family:'微软雅黑';
    color:white;
    float:left;
    vertical-align:middle;
    cursor:pointer;
  }
  .el-header .el-user {
      font-size: 13px;
      float:right;
      color:white;
      cursor:pointer;
  }
  .el-aside {
    color: #333;
  };
  .el-tooltip{
    margin-right:10px;
    padding-right:10px;
  }
  .el-system{
    background-color: #409EFF;
    line-height:60px;
    font-size:20px;
    color:white;
    height:60px;
    box-shadow: 0 2px 12px 5 rgba(0, 0, 0, 0.1);
}
  .el-main{
     vertical-align:middle;
     border-left: 1px solid #eee;
  }

  el-header el-row el-col{
    line-height:60px;
  }
</style>