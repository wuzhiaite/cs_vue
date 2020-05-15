<template>
<div class="ioc-tab" v-model="form[item.prop]"
    :style="{'cursor': (item.disabled || disabled) ? 'not-allowed' : 'pointer' }">
    <span v-for="(ico,idx) in iocList" 
            @click=" (item.disabled || disabled) ? null : current = ico"   
            :class="{'active':current == ico}">
        <i :class="ico" />
    </span>       
</div>
</template>
<script>
export default {
   data(){ 
     return{
       iocList:[],
       current:''
     }
   },
   props:{
        item:{
            required:true,
            type:Object
        },
        form:{
            required:true,
            type:Object,
        },
        disabled:{
            required:true,
            type:Object,
        }
    },
    created(){
      this.initIocList();
    } ,
    watch:{
        current(n,o){
            this.form[this.item.prop] = n ;   
        }
    },
    methods:{
      initIocList(){
        this.iocList = require("../Json/ioc.json");
      }
    }
}
</script>
<style scoped>
  .ioc-tab{
    border-radius: 5px;
    border:1px solid #DCDFE6;
    height:150px;
    overflow-y:auto;
    padding:10px;
  }
  .ioc-tab span{
    float:left;
    padding:5px 5px 0px 5px;
    margin:5px; 
    border-radius: 5px;
    border: 1px solid #DCDFE6 ;
  }
  .ioc-tab span i{
      margin:0px;
  }
  .active{
      background-color:red;
  }
</style>