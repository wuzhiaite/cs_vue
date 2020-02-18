<template>
  <div :style="{height : screenHeight + 'px' }">
    <el-container style="height: 100%; border: 1px solid #eee;margin:0px;"> 
      <el-aside :width="( collapse ? 64+'px' : screenWidth * 0.16 + 'px') " 
          style="background-color: #eee;" 
          router="true" mode="horizontal" >
          <div class="el-system">
              <span class="el-title" >
                  <el-image 
                      class="el-img"
                      :src="url" >
                    </el-image>
              </span>
              <br/>
              <span class="el-title" v-show="!collapse">
                {{systemName}}
              </span>
              <br/><br/>
              <span class="el-user" 
                  v-show="!collapse"
                  style="font-size:12px;cursor:pointer;" 
                  @click="openSelfInfo">       
                <i class="el-icon-setting" ></i>
                  {{username}}
              </span>
          </div>
          <el-menu 
              :collapse=" collapse"
              background-color="#eee" 
              text-color=""
              active-text-color=""
              :default-active="$route.path"
              unique-opened router>
              <el-submenu 
                  v-for="(item,index) in routes" v-if="!item.hidden" class="title"
                  :key="index" :index="index+''" style="text-align:left;">
                <template slot="title">
                  <el-tooltip v-if="item.iconCls" :content=" item.desc ? item.desc : item.name " placement="top">
                      <i :class="item.iconCls ? item.iconCls : '' "  class="el-icon"  />
                  </el-tooltip>    
                  <span slot="title">
                    <strong>{{item.name}}</strong>
                  </span>
                </template>
                <el-menu-item 
                      v-if="item.children"
                      style="padding-left: 30px;text-align: left"
                      v-for="child in item.children"
                      :index="child.path"
                      :key="child.path">
                        <el-tooltip :content=" child.desc ? child.desc : child.name " placement="top">
                          <i :class="child.iconCls ? child.iconCls : ''" class="el-icon"/>
                        </el-tooltip>       
                            {{child.name}}
                </el-menu-item>
              </el-submenu>
            </el-menu>
      </el-aside>
    
      <el-container>  
        <el-header height="20px"  style="vertical-align:middle;margin-top:10px;">
             <el-breadcrumb separator-class="el-icon-arrow-right"  >
                <el-breadcrumb-item :to="{ path: '/index' }">
                    <i class="el-icon-s-home"/>首页
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>  
        <el-main>
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
        screenWidth:document.body.clientWidth,
      }
    },
    created:function(){
        var url = require('../img/logo.jpg');
        this.url = url;
        this.srcList.push(url);
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
    },
    mounted(){
      const that = this
      window.onresize = () => {
          return (() => {
              window.screenHeight = window.screen.availHeight  ;
              that.screenHeight = window.screenHeight - 90 ;
              that.screenWidth = document.body.clientWidth;
              that.$store.state.screenWidth = that.screenWidth ;

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
        },
        screenWidth(){
          this.collapse = this.screenWidth * 0.16 < 180 
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
  .el-img{
     border-radius:50%;
     width:55px;
     height:55px;
     margin:2.5px;
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
    background-color: #409EFF;padding:5px;
    font-size:20px;
    color:white;
    box-shadow: 0 2px 12px 5 rgba(0, 0, 0, 0.1);
}
  
</style>