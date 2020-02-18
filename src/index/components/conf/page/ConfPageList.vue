<template>
<!-- 台账配置页面 -->
    <div >
      <div style="float:left;">
          <Buttons 
              style="position:absolute;"
              :btns="btns"/>
      </div>
      <div style="height:20px;"/>
      <div class="box-block">
          <div style="float:left;">
            <ComForm 
              :formDesign="sqlForm.formDesign"
              :form.sync="sqlForm.form" 
              :btns="sqlForm.btns"></ComForm>
          </div>
          <div style="width:1px;"></div>
          <div style="float:right;">    
            <ComForm 
              :formDesign="pageDesignForm.formDesign"
              :form="pageDesignForm.form" 
              :btns="pageDesignForm.btns"></ComForm>
          </div> 
      </div>
    </div> 
</template>
<script>
 export default {
    data : function(){
      return {
          id : 0,
          btns : [],
          sqlForm:{
            formDesign:{},
            btns:[],
            form:{},
          },
          pageDesignForm:{
            formDesign:{},
            btns:[],
            form:{},
          }
      }
    },
    created : function(){
        this.id =  this.$route.params.id;
        this.initBtn();
        this.initSqlForm();
        this.initPageDesignForm();
    },
    methods : {
        initBtn : function(){
            var that = this;
            this.btns = [
              {
                    name : '返回',
                    type : 'primary',
                    icon : '',
                    disabled : false,
                    click : function(){
                        that.$router.go(-1);
                    }
               },
                {
                  name : '保存',
                  type : 'primary',
                  icon : '',
                  disabled : false,
                  click : function(){
                      that.doSave();
                  }
              }
            ];


        },
        initSqlForm : function(){//SQL查询页面
         var that = this;
         var  formItems = [{
                  prop:'SEARCH_SQL',
                  label:'查询SQL:',
                  type:'textarea',
                  numbers:2500,
                },
                {
                  prop:'SEARCH_TABLE',
                  disabled:true,
                  label:'SQL查询列',
                  type:'textarea',
                  numbers:400,
                }
            ];
            this.sqlForm.formDesign = {
              disabled:false,  
              formItems : formItems,
            }
            this.sqlForm.btns = [{
                    name : '查看表格',
                    type : 'primary',
                    icon : 'el-icon-circle-plus-outline',
                    disabled : false,
                    click : function(){
                      that.getSearchInfo();
                    }
                  }];
        },
        initPageDesignForm : function(){
          var that = this;
          var  formItems = [{
                  prop:'CONFIG_NAME',
                  label:'台账名称:',
                  type:'input',
              },{
                  prop:'CONFIG_BTNS',
                  label:'按钮:',
                  type:'input',
              },{
                  prop:'SEARCH_COLUMNS',
                  label:'模糊查询:',
                  type:'input',
              },{
                  prop:'SEARCH_CONDITIONS',
                  label:'高级条件:',
                  type:'input',
              },{
                  prop:'SHOW_COLUMNS',
                  label:'展示列',
                  type:'input',
              },{
                prop:'REQUES_URL',
                label:'请求url',
                type:'input',  
              },{
                prop:'INIT_PARAM',
                label:'初始化参数',
                type:'textarea',
                numbers:500,
              },{
                prop:'INIT_SCRIPT',
                label:'脚本',
                type:'textarea',
                numbers:1500,
              }
            ];
            this.pageDesignForm.formDesign = {
              disabled:false,  
              formItems : formItems,
            }

        },
        getSearchInfo : function(){//获取数据
            this.post("/pagelist/getSearchInfo",
                      this.sqlForm.form)
                .then(res => {
                    console.log(res);
                })
        },
        doSave : function(){//保存数据

        }


    }



 }



</script>
<style scoped>
.box-block {
    width: 100%;
    position:relative;
}
.box-block div {
    display: inline-block;   
    word-wrap: break-word;
    width: 48%;
    text-align: center;
    margin-top: 15px;
    padding: 5px;
}
</style>





























