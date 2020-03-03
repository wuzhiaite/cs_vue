<template>
  <div id="app" >
    <router-view  />
  </div>
</template>

<script>

import { mapGetters,mapActions,mapMutations } from 'vuex';
import  {formatRoutes}  from  './menus-util';


export default {
  name: 'app',
  created(){
    this.login();
    this.menusInfo();
  },
  methods:{  
    ...mapActions(['setUserAction','setSystemName']),
    login(){
        var user= {
          userId : '20191227',
          username : '罗小黑',
          token : '987654321',
          englishName:'cat luo',
        };
      this.setUserAction(user);
      var systemName = '通用配置系统';
      this.setSystemName(systemName);
    },
    menusInfo(){
      var csMenus = [     
          {
            path:'/home',
            name:'通用配置管理',  
            iconCls:'el-icon-setting',
            realPath:'Home',
            children : [
                {
                    path :'/pagelist',
                    name:'通用台账配置',
                    iconCls:'el-icon-picture-outline-round',
                    realPath:'conf/page/PageList',
                },{
                    path :'/tableconf',
                    name:'展示列表配置',
                    iconCls:'el-icon-picture-outline-round',
                    realPath:'conf/page/ConfTable',
                },{
                    path : '/comPageList/:id',
                    name : '通用台账样例',
                    iconCls:'el-icon-s-opportunity',
                    realPath:'conf/page/ComPageList',
                },
                {
                    path : '/comTable',
                    name : '通用表单样例01',
                    iconCls:'el-icon-s-release',
                    realPath:'conf/form/ComTable',
                },
                {
                    path : '/comform',
                    name : '通用表单样例02',
                    iconCls:'el-icon-s-order',
                    realPath:'conf/form/ComFormExp01',
                }]

          } ,
          {
            path:'/home',
            name:'图表样式',  
            iconCls:'el-icon-s-shop',
            realPath:'Home',
            children : [
                {
                    path :'/graphExp01',
                    name:'统计图标样例01',
                    iconCls:'el-icon-s-marketing',
                    realPath:'charts/Exp01',
                },
                {
                    path :'/graphExp02',
                    name:'统计图标样例02',
                    iconCls:'el-icon-tickets',
                    realPath:'charts/Exp02',
                }
            ]  
          } 
        ];
       csMenus = formatRoutes( csMenus );
       this.$store.dispatch("cs/setMenusAction",csMenus);
       this.$router.addRoutes(csMenus);
    }


  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}
</style>
