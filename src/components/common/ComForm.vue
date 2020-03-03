<template>
<span>
  <el-form  ref="form" 
            :model="form" 
            size="mini"
            :hide-required-asterisk="formStyle.asterisk ? formStyle.asterisk  : true"
            :rules=" formStyle.rules ? formStyle.rules : {} "
            :inline="formStyle.inline ? formStyle.inline : false"
            :disabled="formStyle.disabled ? formStyle.disabled : false "
            :label-width="formStyle.labelWidth ? formStyle.labelWidth : '20%' ">
    <el-form-item v-for="(item,index)  in  formStyle.formItems"  
            style="font-size:10px;"
            :label="( item.events && item.events.isShow ? item.events.isShow() : true) ? item.label : '' ">
            <ComFormSpan :item="item" :form="form" ></ComFormSpan>
    </el-form-item>  
    <el-form-item> 
      <slot></slot>
    </el-form-item>  
      <br/>
     <el-form-item v-if="btns.length > 0">
         <Buttons  :btns="btns" ></Buttons>
    </el-form-item>
  </el-form>
 </span>        

</template>
<script>
import Buttons from './Buttons'; 
import ComFormSpan from './ComFormSpan';

 export default {
    props:{
      formDesign:{
        type:Object,
        default:{},
        required:true
      },
      btns:{
        type:Array,
        default:[],
        required:false,
      },
      form:{
        type : Object,
        default:{},
        required:false,  
      },
    },
    data(){
      return {
        formStyle:{},
      }
    },
    watch:{
        form :{
          deep:true,
          immediate:true,
          handler:function(n,o){
            this.$emit('update:form',this.form);
          }
        },
        formDesign:{
          deep:true,
          immediate:true,
          handler:function(n,o){
            this.formStyle = this.formDesign;
          }
        }

    },
    created:function(){
        this.formStyle = this.formDesign;
    },
    methods:{
        formatForm : function(){
            var items = this.formDesign.formItems;
            for(var i in items){
                var item = items[i];
                if(item.prop && item.default){
                    this.form[item.prop] = item.default ;
                }
            }
        },
    }

 }


</script>
<style scoped>
.el-select{
  width:100%;
}
.el-form{
  font-size:10px;
  border-radius: 3px;
  transition: .2s;
  padding:25px;
} 
.el-form-item_label{
  font-size:7px;
}
.el-input__inner{
  display:block !important;
}
    
</style>





























