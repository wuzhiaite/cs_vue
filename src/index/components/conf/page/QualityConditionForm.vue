<template>
<!-- 高级条件项配置表 -->
    <ComForm 
        :formDesign="qualityConditionsForm.formDesign"
        :form.sync="qualityConditionsForm.form" 
        :btns="qualityConditionsForm.btns">
    </ComForm> 
</template>
<script>
export default {
    data:function(){
        return{
            qualityConditionsForm :{}
        }
    },
    props:{
        form:{
           required:true,
           type:Object,
        },
        tempArr:{
            required:false,
            type:Array,
            default:[],
        }
    },
    watch:{
        form:{
            deep:true,
            immediate:true,
            handler:function(n,o){
                 this.initForm(); 
                 if(JSON.stringify(n) != "{}"){
                    this.qualityConditionsForm.form = n ;
                 }
            }
        }
    },
    methods:{
        initForm : function(){
          var that = this;
          this.qualityConditionsForm = {//高级条件项查询表单
            isView:false,
            labelWidth:'0.4',
            formDesign:{
              disabled:false, 
              inline:false, 
              formItems : [
                {
                  prop:'id',
                  label:'条件项ID',
                  type:'input',
                  disabled:true,
              },{
                  prop:'prop',
                  label:'查询字段',
                  type:'select',
                  placeholder:'请输入需要查询的字段',
                  options:that.tempArr,
                  events:{
                    changeSelect : function(){
                        var prop = that.qualityConditionsForm.form.prop;
                        var items = that.qualityConditionsForm.formDesign.formItems;
                        for(var i in items){
                            var item = items[i];
                            if(item.prop == 'prop'){
                                var options = item.options;
                                for(var j in  options){
                                      var opt = options[j];
                                      if(opt.value == prop){
                                          that.qualityConditionsForm.form.label = opt.label;
                                      }
                                }
                            }
                        }
                    }
                  }
              },{
                  prop:'type',
                  label:'类型',
                  type:'select',
                  options:[
                    {label:'选择框',value:'select'},
                    {label:'日期',value:'date'},
                    {label:'正负',value:'bol'},
                    {label:'日期区间',value:'interval'},
                    {label:'单选按钮',value:'radio-buttons'},
                  ],
              },{
                  prop:'options',
                  label:'字段映射',
                  type:'select-form',
                  form:[{
                       prop:'label',
                       label:'标签',
                       type:'input',  
                    },{
                       prop:'value',
                       label:'对应值',
                       type:'input', 
                    }],
                  events:{
                     isShow : function(){//
                        var type = that.qualityConditionsForm.form.type ;   
                        var flag = ( type == 'select' 
                                        || type == 'radio-buttons' );  
                        return flag;    
                     },
                  }
              }],
            },
            btns:[{
                    id : 'confirm',
                    name : '确定',
                    type : 'primary',
                    icon : 'el-icon-check',
                    disabled : false,
                    click : function(){
                        var form = that.qualityConditionsForm.form ;
                        that.$emit('callback',form);
                    }
                 }],
            form:{
              id:(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
              options:[],
              type:'',
            },
          }
        }

    }


}
</script>
<style scoped>

</style>
















