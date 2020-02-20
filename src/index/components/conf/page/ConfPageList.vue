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
              :btns="sqlForm.btns">
              </ComForm>
          </div>
          <span style="width:1px;"></span>
          <div style="float:right;">    
            <ComForm 
              :formDesign="pageDesignForm.formDesign"
              :form="pageDesignForm.form" 
              :btns="pageDesignForm.btns"></ComForm>
          </div> 
      </div>
       <ComDialog 
          :dialog="dialog"
          :visable.sync="isView">
          <ComForm 
              :formDesign="columnForm.formDesign"
              :form.sync="columnForm.form" 
              :btns="columnForm.btns"></ComForm>
      </ComDialog>
    </div> 

</template>
<script>
 export default {
    data : function(){
      return {
          id : 0,
          btns : [],
          disabled:true,
          tempArr : [],//用于临时存储SQL列填写信息
          sqlForm:{
            formDesign:{},
            btns:[],
            form:{},
          },
          pageDesignForm:{
            formDesign:{},
            btns:[],
            form:{},
          },
          columnForm:{
            formDesign:{},
            btns:[],
            form:{},
          },
          dialog:{},
          isView:false,
          tempForm:{},
      }
    },
    created : function(){
        this.id =  this.$route.params.id;
        this.initBtn();
        this.initSqlForm();
        this.initPageDesignForm();
        this.initDialog();
    },
    watch:{
        sqlForm:{
          deep:true,
          immediate:true,
          handler:function(n,o){
            if(n.form.SEARCH_SQL 
                      && n.form.SEARCH_SQL.length > 10
                      && n.form.SEARCH_SQL.toUpperCase().indexOf('FROM') > 0){
                this.sqlForm.btns[0].disabled = false ;
            }else{
                this.sqlForm.btns.length > 0 
                      ? this.sqlForm.btns[0].disabled = true 
                      : null;
            }
          }
        },
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
            ];
            this.sqlForm.formDesign = {
              disabled:false,  
              formItems : formItems,
            }
            this.sqlForm.btns = [{
                    id : 'confirm',
                    name : '确定',
                    type : 'primary',
                    icon : '',
                    disabled : true,
                    click : function(){
                        that.getSearchInfo();
                    }
                 }]
            this.sqlForm.form = {
                'SEARCH_SQL' :  "SELECT  SL.BH "
                 + ",SL.B_DWMC,SL.ZT,,RWQX，JBXX.XH AS LADJXH ,LCXX.BZMC , CASE WHEN LCXX.YWZT ='Finished' THEN '已结束' WHEN LCXX.YWZT ='Underway' THEN '正在办理' END AS YWZT  FROM T_XZCF_JBXX JBXX JOIN (SELECT distinct SL.BH" 
                 + ",SL.B_DWMC,SL.YWZT,BZDY.BZMC,RWQX FROM T_WORKFLOW_GZLCSL SL" 
                 + "LEFT JOIN (SELECT LCSLBH,BZDYBH FROM T_WORKFLOW_DQBZ WHERE SFZB != 'READER' GROUP BY LCSLBH,BZDYBH) DQBZ "
                 + "ON DQBZ.LCSLBH = SL.BH"	,
					  }     
        },
        initColumnForm : function(tempArr){//初始化列别名表单数据
          var  formItems = [];
          var  rules = {};
          var  tempForm = {}
          for(var i in tempArr){
              var temp = tempArr[i];
              var obj = {
                  prop: temp,
                  label:temp,
                  type:'input',
                  placeholder:"("+temp+")展示列名称"
              }
             tempForm[temp]=""; 
             formItems.push(obj);
             rules[temp] =  { required: true, message: '请输入列名', trigger: 'blur' };
          }
           this.columnForm.formDesign = {
              disabled:false,  
              inline:true,
              labelWidth:'0.4',
              formItems : formItems,
              rules : rules,
            }
            this.columnForm.form = tempForm ;
            this.isView = true;
        },
        initDialog : function(){
            var that = this;
            this.dialog = {
                width:'60%',
                titleSlot:'<strong>新增列展示名称</strong>',
                btns:[{
                    id : 'confirm',
                    name : '确定',
                    type : 'primary',
                    icon : '',
                    closed : true,
                    click : function(){
                        var form = that.columnForm.form ;
                        var flag = false;
                        for(var i in form ){
                            if( form[i] ){
                               flag = true ;
                            }else{
                               form[i] = i ; 
                            }
                        }
                        if(!flag){
                          that.$message({
                              message: '请最少为一个列设置别名！！！',
                              type: 'error'
                          });
                          return ;
                        }
                        that.tempArr = that.columnForm.form ;
                        that.isView = false;
                        that.pageDesignDataFormat();
                        that.pageDesignForm.formDesign.disabled = false;
                    }
                }],
            }
        },
        pageDesignDataFormat : function(){
            var temp = [];
            for(var i in this.tempArr){
                 var obj = {};
                 obj.label = this.tempArr[i];
                 obj.value = i ;
                 temp.push(obj);
            }
           this.pageDesignForm.formDesign = {};
           this.initPageDesignForm(temp);
        },
        initPageDesignForm : function(tempArr){
          var that = this;
          var  formItems = [{
                  prop:'CONFIG_NAME',
                  label:'台账名称:',
                  type:'input',
              },{
                  prop:'CONFIG_BTNS',
                  label:'按钮',
                  type:'input',
              },{
                  prop:'SEARCH_COLUMNS',
                  label:'模糊查询',
                  type:'select',
                  multiple:true,
                  options:tempArr
              },{
                  prop:'SEARCH_CONDITIONS',
                  label:'高级条件',
                  type:'input',
              },{
                  prop:'SHOW_COLUMNS',
                  label:'默认展示列',
                  type:'checkbox-button',
                  options:tempArr
              },{
                prop:'REQUES_URL',
                label:'请求url',
                type:'input',  
              },{
                prop:'INIT_PARAM',
                label:'初始化参数',
                type:'textarea',
                numbers:500,
              }
            ];
            this.pageDesignForm.formDesign = {
              disabled:true,  
              formItems : formItems,
            }
            this.pageDesignForm.form = {
              SHOW_COLUMNS:[],
              INIT_PARAM:"{\n\n\n}"
            }
        },
        getSearchInfo : function(){//获取数据
            if(!this.sqlForm.form.SEARCH_SQL)return;
            var sql =  this.sqlForm.form.SEARCH_SQL.toUpperCase();
            this.filedArr = [];
            var index = sql.indexOf('FROM');
            if(index == -1)return;
            var tempStr = sql.substring(0,index);
            var tempArr = tempStr.replace("，",",").split(",");
            var filedArr = [];
            for(var i in tempArr){
                var temp = tempArr[i].trim();
                if(temp.length == 0)continue;
                if(temp.indexOf('AS') != -1){
                    temp = temp.substring(temp.lastIndexOf('AS') + 2);
                    filedArr.push(temp);
                }else if(temp.indexOf('.') != -1 ){
                    index = temp.indexOf('.');
                    filedArr.push(temp.substring(index+1));
                }else if(temp.indexOf(' ') != -1){
                    temp = temp.substring(temp.lastIndexOf(' ') + 1);
                    filedArr.push(temp);
                }else{
                  filedArr.push(temp);
                }
            }
            if(filedArr.length > 0){
                this.initColumnForm(filedArr);
            }
          
        },
        doSave : function(){//保存数据
            // this.post("/pagelist/getSearchInfo",
            //           this.sqlForm.form)
            //     .then(res => {
            //         console.log(res);
            //     })
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
    box-shadow: 0px 0px 10px 5px #888888;
}
</style>





























