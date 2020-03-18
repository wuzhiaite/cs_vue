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
            hidden:false, 
            children : [
                {
                    path :'/pagelist',
                    name:'通用台账配置',
                    iconCls:'el-icon-picture-outline-round',
                    realPath:'conf/page/PageList',
                     hidden:false, 
                }]
          } ,
          {
            path:'/home',
            name:'图表样式',  
            iconCls:'el-icon-s-shop',
            realPath:'Home',
            hidden:false, 
            children : [
                {
                    path :'/graphExp01',
                    name:'统计图标样例01',
                    iconCls:'el-icon-s-marketing',
                    realPath:'charts/Exp01',
                    hidden:false, 
                },
                {
                    path :'/graphExp02',
                    name:'统计图标样例02',
                    iconCls:'el-icon-tickets',
                    realPath:'conf/form/GrantPaper',
                    hidden:false, 
                },
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
  padding:0px;
  margin:0px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:rgb(238, 238, 238);;
  background-repeat: no-repeat;  
  background-size: 100% 100%;    
}

body,html{
	margin: 0; 
	padding: 0;
	border: 0;
  height:100%;
}
</style>
