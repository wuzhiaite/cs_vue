<template>
  <div :style="{height : screenHeight + 'px' }">
    <el-container style="height: 100%; ">
    <el-aside :width="( collapse ? 64 +'px' : '200px') "  >
        <el-menu
            @close="handleClose"
            :collapse=" collapse"
            background-color=""
            text-color=""
            active-text-color=""
            style="border:0px;"
            :default-active="$route.path"
            unique-opened router>
            <el-menu-item  class="el-system" style="padding-left:10px;">
                <img src="@/assets/base/logo.png" height="50px" width="50px"/>
                <span  >
                  <img src="@/assets/base/system.png" style="height:60px;" />
                </span>
            </el-menu-item >
            <template v-for="(item,index) in routes" >
                <template v-if="!item.children">
                    <el-menu-item :index="item.path"
                                  :key="item.path" v-if="item.hidden">
                        <i :class="item.iconCls ? item.iconCls : '' "  class="el-icon"  style="margin-right: 10px;padding-right: 10px"/>
                        <span slot="title" style="padding:5px;">{{item.name}}</span>
                    </el-menu-item>
                </template>
                <template v-else>
                    <el-submenu
                            v-if="item.hidden" class="title"
                            :key="index" :index="index+''" style="text-align:left; ">
                        <template slot="title">
                            <el-tooltip v-if="item.iconCls" :content=" item.desc ? item.desc : item.name " placement="top">
                                <i :class="item.iconCls ? item.iconCls : '' "  class="el-icon"  />
                            </el-tooltip>
                            <span slot="title">
                              {{item.name}}
                            </span>
                        </template>
                        <el-menu-item
                                v-if="item.children && child.hidden"
                                style=""
                                v-for="child in item.children"
                                :index="child.path"
                                :key="child.path">
                            <i :class="child.iconCls ? child.iconCls : '' " v-if="child.iconCls"  />
                            <span slot="title">{{child.name}}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
            </template>

          </el-menu>
    </el-aside>
    
      <el-container style="background-color:#f6f6f6;">  
        <el-header class="system-header">
          <el-row>
            <el-col :span="2" >
                <div style="font-size:20px;text-align:left;" @click="collapse=!collapse">
                   <i v-show="collapse" class="el-icon-d-arrow-right"/>
                   <i v-show="!collapse" class="el-icon-d-arrow-left"/>
                </div>
            </el-col>
            <el-col :span="22" >
                <div class="header-span" >
                    <span class="el-title" >
                      <img   @click="jumpToGitee()"
                             class="el-img"
                             src="@/assets/img/home/gitee.png" >
                      </img>
                    </span>
                    <el-dropdown @command="changI18n" style="float:left">
                      <span class="system-header-name">
                        {{$t( lang || 'zh-cn' ) }}<i class="el-icon-arrow-down" style="margin-left:7px;"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                v-for="v in i18nList"
                                :command="v.label"
                           >{{$t(v.label)}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span class="el-title" >
                      <img
                            class="el-img"
                            src="@/assets/base/logo.png" >
                      </img>
                    </span>
                    <el-dropdown  @command="handleCommand">
                       <span class="system-header-name">
                           {{username}}
                       </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                    :icon="v.icon"
                                    v-for="v in dropDownList"
                                    :command="v.value"
                                >{{v.label}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span class="grid-content bg-purple" @click="logout" >
                     <i class="el-icon-switch-button"/>
                        {{$t('home.logout')}}
                    </span>
                </div>
            </el-col>
          </el-row>
        </el-header>
        <el-header class="el-baber-title" height="50px">
            <el-breadcrumb separator="/" style="padding:15px;">
              <el-breadcrumb-item :to="{ path: '/index' }">{{$t('menus.index')}}</el-breadcrumb-item>
              <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
            </el-breadcrumb>
         </el-header> 
         <div style="overflow-y:auto;overflow-x:auto;">
            <el-main :style="{ height : screenHeight - 110 +'px'}">
                <transition name="el-zoom-in-center">
                    <router-view v-if="isRouterAlive"/>
                </transition>
            </el-main>
         </div>
      </el-container> 
    </el-container>
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from  'vuex';
  import  {formatRoutes}  from  '../menus-util';



  export default {
    name:'home',
    data() {
      return {
        collapse: false,
        url: '',
        srcList: [],
        isRouterAlive:true,
        screenHeight : document.body.clientHeight,
        screenWidth : document.body.clientWidth,
        dropDownList : [
            {
                icon:'',
                label:'个人账户设置',
            },{
                icon:'',
                label:'密码修改',
            },{
                icon:'',
                label:'个人履历',
            }
        ],
        i18nList:[
            {
                label:'zh-cn',
            },{
                label:'zh-hk',
            },{
                label:'en-us',

            }]
      }
    },
    provide(){
        return {
            reload:this.reload ,
        }
    },
    created:function(){
      this.menusInfo();
      let that = this;
    },
    mounted:function(){
        const that = this
        window.onresize = () => {
            return (() => {
                that.screenHeight = document.body.clientHeight;
                that.screenWidth = document.body.clientWidth;
            })()
        }
    },
    computed:{
        ...mapGetters({
              lang:'lang',
              routes:'cs/getMenus',
              systemName : 'getSystemName',
              username : 'getUsername'}),
    },
   watch:{
     screenWidth:function(n,o){
        this.setScreenWidth(n);
        if(n < 1000){
          this.collapse = true;
        }else{
          // this.collapse = false ;
        }
     },
    screenHeight:function(n,o){
      this.setScreenHeight(n);
    },
   },
    methods:{
      ...mapMutations(['setScreenHeight','setScreenWidth',
                        'setLang',
                        'setToken','setUser','setSystemName','setUsername']),
        changI18n(command) {
          this.$i18n.locale = command ;
          this.setLang(command);
          this.reload();
        },
        reload(){
            this.isRouterAlive = false;
            this.$nextTick(function(){
                this.isRouterAlive = true;
            })
        },
        handleCommand(command) {
            this.$message('click on item ' + command);
        },
      menusInfo(){
          this.$axios
           .post("/api/sys/menus/getUserMenu")
                .then(res => {
                    if(res.status == 200 && res.data.code == 1){
                          var data = res.data.result ;
                          var csMenus = data[0].children ;
                          this.$store.dispatch("cs/setMenusAction",csMenus);
                          csMenus = formatRoutes( csMenus );
                          this.$router.addRoutes(csMenus);
                    }else{
                      this.$message({
                        type:"error",
                        message:this.$t('messages.query_failed_pls_check_later')
                      });
                    }
                });
    
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
         setTimeout(function(){},1500);
      },
      jumpToGitee(){
          window.open("https://gitee.com/wuzhiaite");
      },
      logout(){
          this.$axios
              .post("/api/user/logout")
              .then(res => {
                  if(res.status == 200 && res.data.code == 1){
                      this.$store.dispatch("clearSession");
                      this.$router.push({path:"/"});
                      this.$message({
                          type:"success",
                          message:this.$t('messages.logout_success')
                      });
                  }else{
                      this.$message({
                          type:"error",
                          message:this.$t('messages.logout_fail_pls_refresh')
                      });
                  }
              });
      }
    }
  }
</script>
<style>
.system-header-name{
    font-size:14px;
    margin-right:10px;
    color:white;
}
.header-span{
    font-size:13px;
    text-align:left;
    float:right;
    margin-right:25px;
}
.el-menu-item{
    padding-left: 30px;
    text-align: left;


}

.el-button--mini{
    padding:3px 10px;
    font-size:12px;
    border-radius:3px;
    line-height: 20px;
}

.el-baber-title{
  line-height:50px;
  border-left: 1px solid  #d9d9d9;
  border-bottom:1px solid  #d9d9d9;
  background-color:white;
}
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

     background: #c0c4cc;
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
    line-height:60px;
  }
  .el-header .el-user {
      font-size: 13px;
      float:right;
      color:white;
      cursor:pointer;
  }
  .el-aside {
    color: #333;
  }
  .el-tooltip{
    margin-right:10px;
    padding-right:10px;
  }
  .el-system{
    background-color: #409EFF !important;
    line-height:60px;
    font-size:20px;
    color:white;
    height:60px;
    border:0px !important;
  }
  .el-system:hover{
      background-color:#409EFF !important;
  }
  el-header el-row el-col{
    line-height:60px;
  }
  .el-breadcrumb-item {
      height:60px;
      line-height:60px;
  }
.el-step__title {
    font-size: 14px !important;
    line-height: 38px;
}
.el-step__description {
    padding-right: 10%;
    margin-top: -5px;
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>