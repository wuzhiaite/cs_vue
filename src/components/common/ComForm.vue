<template>
<span>
  <el-form  ref="dynamicform"
            :model="form" 
            size="mini"
            :hide-required-asterisk="formStyle.asterisk ? formStyle.asterisk  : true"
            status-icon
            :rules=" formStyle.rules ? formStyle.rules : {} "
            :inline="formStyle.inline ? formStyle.inline : false"
            :disabled="formStyle.disabled ? formStyle.disabled : false "
            :label-width="formStyle.labelWidth ? formStyle.labelWidth : '20%' ">
    <el-form-item v-for="(item,index)  in  formStyle.formItems"  
            style="font-size:10px;"
             :prop="item.prop"
             :rules="item.rules ? item.rules : []"
            :label="( item.events && item.events.isShow ? item.events.isShow() : true) ? item.label : '' ">
            <!-- 通用组件 -->
            <ComFormSpan :item="item" :form="form" ></ComFormSpan>
            <!-- 通用组件增加项 -->
            <ComFormSpanAdditional :item="item" :disabled="formStyle.disabled" :form="form" />
            <!-- 横向子表-->
            <SelectForm v-if="item.type=='select-form'" :item="item" :form="form"  />
            <!-- 列展示子表 -->
            <ChildTable v-if="item.type=='child-form'" :disabled="formStyle.disabled"  :item="item" :form="form"/>
            <span v-if="item.type=='slot-form'">
                <slot :name="item.prop" :item="item" :form="form" ></slot>
            </span>
    </el-form-item>
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
        default:()=>{},
        required:true
      },
      btns:{
        type:Array,
        default:()=>[],
        required:false,
      },
      form:{
        type : Object,
        default:()=>{},
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
        validateForm : function(){
            var result ;
           this.$refs.dynamicform.validate((validate)=>{
               result = validate;
           });
           return result ;
        },
        resetForm() {
            this.$refs['dynamciform'].resetFields();
        }
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





























