<template>
  <div id="app" >
    <router-view  />
  </div>
</template>

<script>
import {mapGetters,mapMutations} from  'vuex';
 import  {formatRoutes}  from  './menus-util';
import store from "../store";

export default {
  name: 'app',
  computed:{
    ...mapGetters({ routes:'cs/getMenus'})
  },
  created:function(){
    if(! this.$store.state.token){
      this.$router.push({path:"/"});
    }
    var csMenus = formatRoutes( this.routes );
    this.$router.addRoutes(csMenus);
  },
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
  background-repeat: no-repeat;  
  background-size: 100% 100%;  
  overflow:hidden;  
}

body,html{
  margin: 0;
  padding: 0;
  border: 0;
  height:100%;
  background-color:rgb(238, 238, 238);
}
</style>
