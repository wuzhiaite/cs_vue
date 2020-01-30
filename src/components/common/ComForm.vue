<template>
  <el-form  ref="form" 
            :model="form" 
            size="mini"
            :hide-required-asterisk="formStyle.asterisk ? formStyle.asterisk  : true"
            :rules=" formStyle.rules ? formStyle.rules : {} "
            :disabled="formStyle.disabled ? formStyle.disabled : false "
            :label-width="formStyle.labelWidth ? formStyle.labelWidth : '20%' ">
    <el-form-item v-for="(item,index)  in  formStyle.formItems"  
            :label="item.label">
        <el-input v-if="item.type=='input'" v-model="form[item.prop]"></el-input>
        <el-select v-if="item.type == 'select' "
                  v-model="form[item.prop]" 
                  :multiple = "item.multiple ? item.multiple : false "
                  :placeholder="item.placeholder?item.placeholder:'请选择'">
            <el-option  v-for="opt in  item.options"
                  :label="opt.label" :value="opt.value"/>
        </el-select>
        <span v-if="item.type=='dateInterval'">
          <el-col :span="11">
              <el-date-picker type="date" 
                :placeholder="item.placeholder ? item.placeholder : '选择日期' " 
                v-model="form[item.prop+'start_time']" 
                style="width: 100%;"/>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker 
                :placeholder="item.placeholder ? item.placeholder : '选择日期' " 
                v-model="form[item.prop+'end_time']" 
                style="width: 100%;" />
          </el-col>
      </span>
      <el-switch v-if="item.type=='switch'"
          size="mini"
          style="width:100%;padding:0px;"
          v-model="form[item.prop]" 
          :active-text="item.active"
          :inactive-text="item.inactive" />
      <span v-if="item.type=='checkbox' || item.type=='checkbox-button'">
          <el-checkbox-group 
                    v-model="form[item.prop]" 
                    size="mini">
                <el-checkbox 
                    v-if="item.type=='checkbox'"
                    size="mini"
                    v-for="opt in item.options" 
                    :label="opt.value" :key="opt.value">{{opt.label}}</el-checkbox>

                <el-checkbox-button
                    v-if="item.type=='checkbox-button'"
                    size="mini"
                    v-for="opt in item.options"  
                    :label="opt.value" :key="opt.value">{{city}}</el-checkbox-button>
            </el-checkbox-group> 
        </span>
        <span v-if="item.type=='radio'|| item.type == 'radio-button'">
          <el-radio-group  
                size="mini" 
                v-model="form[item.prop]" >
              <el-radio v-if="item.type=='radio'"
                 :border="item.border ? item.border : false"
                  size="mini"
                  v-for="opt in item.options"         
                  :label="opt.value">{{opt.label}}</el-radio>

              <el-radio-button v-if=" item.type == 'radio-button' "
                  size="mini"
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
                :placeholder="item.placeholder ? item.placeholder : '选择日期' ">
            </el-date-picker>    
        </span>  
    </el-form-item>     
     <el-form-item v-if="btns.length > 0">
         <el-button  v-for="btn in btns" 
            :type=" btn.type ? btn.type : '' "
            @click="btn.click()">
             {{btn.name}}
         </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
 

 export default {
    props:{
      formDesign:{
        type:Object,
        default:[],
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
        form:{}
      }
    },
    created:function(){
      //  this.formatForm()
      //   if( Object.keys(this.form).length == 0 ) {
      //       this.formatForm()
      //     };
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
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .2s;
  padding:15px;
  box-shadow: 0px 0px 10px 5px #888888;
} 

    
</style>





























