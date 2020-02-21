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
            :label="item.label">
        <el-input v-if="item.type=='input'" 
            :placeholder="item.placeholder ? item.placeholder : '' "
            :disabled="item.disabled ? item.disabled : false"
            v-model="form[item.prop]"></el-input>
        <el-select v-if="item.type == 'select' "
                  v-model="form[item.prop]" 
                  :disabled="item.disabled ? item.disabled : false"
                  :multiple = "item.multiple ? item.multiple : false "
                  :placeholder="item.placeholder?item.placeholder:'请选择'">
            <el-option  v-for="opt in  item.options"
                  :label="opt.label" :value="opt.value"/>
        </el-select>
        <span v-if="item.type=='dateInterval'">
          <el-col :span="11">
              <el-date-picker type="date" 
                :disabled="item.disabled ? item.disabled : false"
                :placeholder="item.placeholder ? item.placeholder : '选择日期' " 
                v-model="form[item.prop+'start_time']" 
                style="width: 100%;"/>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker 
                :disabled="item.disabled ? item.disabled : false"
                :placeholder="item.placeholder ? item.placeholder : '选择日期' " 
                v-model="form[item.prop+'end_time']" 
                style="width: 100%;" />
          </el-col>
      </span>
      <span v-if="item.type == 'btns'" style="float:left;">
          <Buttons :btns="item.btns ? item.btns : null" />
          <Buttons  :btns="form[item.prop] ? form[item.prop] : null" ></Buttons>
          <el-button type="primary" 
              style="margin-left:15px;"
              icon="el-icon-plus" 
              @click="item.click()" plain circle>
          </el-button>
      </span>  
      <el-switch v-if="item.type=='switch'"
          size="mini"
          style="width:100%;padding:0px;"
          :disabled="item.disabled ? item.disabled : false"
          v-model="form[item.prop]" 
          :active-text="item.active"
          :inactive-text="item.inactive" />
      <span v-if="item.type=='checkbox' || item.type=='checkbox-button'">
          <el-checkbox-group 
                    style="float:left;"
                    v-model="form[item.prop]" 
                    size="mini">
                <el-checkbox 
                    v-if="item.type=='checkbox'"
                    size="mini"
                    :disabled="item.disabled ? item.disabled : false"
                    v-for="opt in item.options" 
                    :label="opt.value" :key="opt.value">{{opt.label}}</el-checkbox>
                <el-checkbox-button
                    v-if="item.type=='checkbox-button'"
                    size="mini"s
                    v-for="opt in item.options"  
                    :label="opt.value" :key="opt.value">{{opt.label}}</el-checkbox-button>
            </el-checkbox-group> 
        </span>
        <span v-if="item.type=='radio'|| item.type == 'radio-button'">
          <el-radio-group  
                size="mini" 
                v-model="form[item.prop]" >
              <el-radio v-if="item.type=='radio'"
                 :border="item.border ? item.border : false"
                  size="mini"
                  :disabled="item.disabled ? item.disabled : false"
                  v-for="opt in item.options"         
                  :label="opt.value">{{opt.label}}</el-radio>

              <el-radio-button v-if=" item.type == 'radio-button' "
                  size="mini"
                  :disabled="item.disabled ? item.disabled : false"
                  v-for="opt in item.options" 
                  :label="opt.value" >{{ opt.label }}</el-radio-button>
          </el-radio-group>
        </span> 
        <span v-if="item.type=='rate'">
          <el-rate
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
                :disabled="item.disabled ? item.disabled : false"
                style="width:100%;padding:0px;"
                :rows="item.numbers ? item.numbers/100 : 5"
                v-model="form[item.prop]"></el-input>
        </span>  
        <span v-if="item.type=='date'">
            <el-date-picker
                v-model="form[item.prop]"
                size="mini"
                style="width:100%;padding:0px;"
                type="date"
                :disabled="item.disabled ? item.disabled : false"
                :placeholder="item.placeholder ? item.placeholder : '选择日期' ">
            </el-date-picker>    
        </span>
    </el-form-item>  
    <el-form-item> 
      <slot></slot>
    </el-form-item>  
      <br/>
     <el-form-item v-if="btns.length > 0">
         <el-button  v-for="btn in btns" 
            :disabled = "btn.disabled ? btn.disabled : false"
            :type=" btn.type ? btn.type : '' "
            @click="btn.click()">
             {{btn.name}}
         </el-button>
    </el-form-item>
  </el-form>
 </span>        

</template>
<script>
 

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





























