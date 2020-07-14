<template>
<span>
      <el-input v-if="item.type=='input'" 
          size="mini"
          :placeholder="item.placeholder ? item.placeholder : '' "
          :disabled="item.disabled ? item.disabled : false"
          :show-password="item.password ? item.password : false"
          v-model="form[item.prop]">
      </el-input>
      <span v-if="item.type == 'select' ">
          <ComSelect :item="item" :form="form"/>
      </span>
      <span v-if="item.type=='dateInterval'">
        <el-col :span="11">
            <el-date-picker type="date" 
              size="mini"
              :disabled="item.disabled ? item.disabled : false"
              :placeholder="item.placeholder ? item.placeholder : '选择日期' " 
              v-model="form[item.prop+'start_time']" 
              style="width: 100%;"/>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker 
              size="mini"
              :disabled="item.disabled ? item.disabled : false"
              :placeholder="item.placeholder ? item.placeholder : '选择日期' " 
              v-model="form[item.prop+'end_time']" 
              style="width: 100%;" />
        </el-col>
      </span>
      <!-- 条件项配置 -->
      <div v-if="item.type == 'conditions' ">
          <div style="height:100%;border:1px solid #DCDFE6;border-radius: 5px;margin-right:10px;">
              <Conditions :conditions="form[item.prop]">
                <span slot="footer"
                      slot-scope="data"
                      v-if="item.events"
                      style="opacity:0.6;font-size:10px;cursor:pointer;">
                  <span  @click="item.events.editBtn(data.index)">编辑</span>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                  <span @click="item.events.deleteBtn(data.index)">删除</span>
                </span>
              </Conditions>
              <el-button type="primary" 
                v-if="item.events && item.events.editBtn"
                size="mini"
                style="float:right;margin-top:5px;"
                icon="el-icon-edit-outline" 
                @click="item.events.editBtn(-1)" plain/>
          </div>
      </div> 
      <span v-if="item.type=='switch'">
        <el-switch 
            size="mini"
            style="width:100%;padding:0px;"
            :disabled="item.disabled ? item.disabled : false"
            v-model="form[item.prop]" 
            :active-text="item.active"
            :inactive-text="item.inactive" >
        </el-switch>  
      </span>
      <span v-if="item.type=='checkbox' || item.type=='checkbox-button'" style="float:left;">
          <ComCheckbox :item="item" :form="form" />
      </span>
      <span v-if="item.type=='radio'|| item.type == 'radio-button'">
            <ComRadio :item="item" :form="form" />
      </span> 
      <span v-if="item.type=='rate'">
        <el-rate
          size="mini"
          :show-text="item.showText ? item.showText : true"
          v-model="form[item.prop]" >
        </el-rate>
      </span>  
      <span  v-if="item.type=='signature'">
        <Signature :sign="form[item.prop]"></Signature> 
      </span>   
      <span v-if="item.type=='BrushSignature'">
        <BrushSignature :sign="form[item.prop]"></BrushSignature> 
      </span>  
      <span v-if="item.type=='textarea'">
          <el-input type="textarea" 
               size="mini"
              :disabled="item.disabled ? item.disabled : false"
              style="width:100%;padding:0px;"
              :rows="item.numbers ? item.numbers/100 : 5"
              v-model="form[item.prop]"></el-input>
      </span>  
      <!-- 日期 -->
      <span v-if="item.type=='date'">
          <el-date-picker
              v-model="form[item.prop]"
              size="mini"
              style="width:100%;padding:0px;"
              type="date"
              :format="item.format ? item.format : 'yyyy 年 MM 月 dd 日'"
              :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd HH:mm:ss'"
              :disabled="item.disabled ? item.disabled : false"
              :placeholder="item.placeholder ? item.placeholder : '选择日期' ">
          </el-date-picker>    
      </span>
       <!--  带具体的事件的日期选择器  -->
       <span v-if="item.type=='dateTime'">
           <el-date-picker
                v-model="form[item.prop]"
                size="mini"
                style="width:100%;padding:0px;"
                type="datetime"
                :placeholder="item.placeholder ? item.placeholder : '选择日期' ">
            </el-date-picker>
       </span>
       <!-- 按钮配置 -->
      <ButtonsAdd v-if="item.type == 'btns'" :item="item" :form="form" />

 </span>        

</template>
<script>
import Buttons from './Buttons'; 
import ButtonsAdd from './ButtonsAdd';
import ComCheckbox from "./ComCheckbox";


 export default {
    props:{
      item :{
          required:true,
          type:Object,
      },
      form:{
          required:true,
          type:Object,
      }
    },
    data(){
      return {
        formStyle:{},
      }
    },
    components:{
        ComCheckbox,
      Buttons,
      ButtonsAdd,
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





























