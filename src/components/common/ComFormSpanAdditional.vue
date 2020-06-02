<template>
  <span>
      <span v-if="item.type == 'ioc-select' " >
        <IocSelect :item="item" :form="form" :disabled="disabled"/>
     </span>
      <span v-if="item.type == 'com-tree-select'">
          <ComTreeSelect :item="item" :form="form" ></ComTreeSelect>
      </span>
   
  </span>    
</template>
<script>


export default {
   data(){
     return{
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
            type:Boolean,
            default:false,
        }
    },
    created(){
    } ,
    methods:{
    }
}
</script>
<style scoped>
  
</style>