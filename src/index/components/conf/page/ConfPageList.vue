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
          <div style="float:left;width:35%;">
            <label><strong> 台账查询SQL </strong></label>
            <ComForm 
              :formDesign="sqlForm.formDesign"
              :form.sync="sqlForm.form" 
              :btns="sqlForm.btns">
            </ComForm>
          </div>
          <span style="width:1px;"></span>
          <div style="margin-left:20px;float:left;width:60%;">  
            <label><strong> 台账页面样式配置 </strong></label>  
            <ComForm 
              :formDesign="pageDesignForm.formDesign"
              :form="pageDesignForm.form" 
              :btns="pageDesignForm.btns"></ComForm>
          </div> 
      </div>
       <!-- 列别名配置表单 -->
       <ComDialog 
          :dialog="dialog.columns"
          :visable.sync="bol.isColumnPage">
          <ComForm 
              :formDesign="columnForm.formDesign"
              :form.sync="columnForm.form" 
              :btns="columnForm.btns"></ComForm>
      </ComDialog>

      <!-- 高级条件配置页面 -->
       <ComDialog 
          :dialog="dialog.quality"
          :visable.sync="bol.isQualityPage">
          <QualityConditionForm :tempArr="tempArr" :form.sync="qualityConditionsForm" @callback="qualityConfirm"/>
      </ComDialog>
      <!-- 配置列信息 -->
      <ComDialog  
            :dialog="dialog.confTable"
            :visable.sync="bol.isConfTablePage">
            <ConfTable  
                :tempArr="tempArr" 
                :form="pageDesignForm.form" 
                @callback="confTableConfirm" />
      </ComDialog>     
    </div> 

</template>
<script>

import QualityConditionForm  from './QualityConditionForm';
import ConfTable from './ConfTable';

 export default {
    data : function(){
      return {
          id : 0,//当前页面的id
          btns : [],//页面的按钮
          disabled:true,
          sqlForm:{//SQL新增文本域
            formDesign:{},
            btns:[],
            form:{},
          },
          pageDesignForm:{//页面设计表单
            formDesign:{},
            btns:[],
            form:{},
          },
          columnForm:{
            formDesign:{},
            btns:[],
            form:{},
          },
          tableForm:{},
          btnForm:{},
          dialog:{
            columns:{
                width:'60%',
                titleSlot:'<strong>配置列别名</strong>',
              },
            btns:{
              width:'60%',
              titleSlot:'<strong>新增按钮</strong>',
            },
            quality:{
              width:'60%',
              titleSlot:'<strong>高级查询</strong>',
            },
            confTable:{
                width:'80%',
                titleSlot:'<strong>展示列表配置</strong>',
                direction:'ltr'
            }
          },
          bol:{
            isColumnPage:false,
            isBtnsPage:false,
            isQualityPage:false,
            isConfTablePage:false,
          },
          tempForm:{},
          tempArr : [],//用于临时存储SQL列填写信息
          tempSQL : '',
          canView:false,
          qualityConditionsForm : {}
      }
    },
    components:{
        ConfTable,//列配置信息
        QualityConditionForm,//高级查询项表单
    },
    created : function(){
        this.id = this.$route.params.id;//台账页面的唯一ID
        this.initBtn();//初始化主按钮
        this.initSqlForm();//初始化SQL表单
        this.initPageDesignForm();//初始化配置设计页面,
        this.getFormData();//根据id判断是否存在配置页面，如果存在则进行数据回写，如果没有，则不用管
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
        tempArr:{
          deep:true,
          immediate:true,
          handler:function(n,o){//选中的数组大于0时，配置页面才可见
             if(n.length > 0){
                this.initPageDesignForm();
                this.pageDesignForm.formDesign.disabled = false ;
             }
          }  
        },
        tempForm:{
          deep:true,
          immediate:true,
          handler:function(n,o){
              this.pageDesignDataFormat();
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
                    icon : 'el-icon-back',
                    disabled : false,
                    click : function(){
                        that.$router.go(-1);
                    }
               },
                {
                  name : '保存',
                  type : 'primary',
                  icon : 'el-icon-star-off',
                  disabled : false,
                  click : function(){
                      that.doSave();
                  }
              },{
                  name : '预览',
                  type : 'success',
                  icon : 'el-icon-view',
                  disabled : true,
                  click : function(){

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
                    icon : 'el-icon-check',
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
        btnConfirm : function(form){
            var that = this;
            if(JSON.stringify(form) == "{}")return;//为空返回
            var items = that.pageDesignForm.form.CONFIG_BTNS;
            var isModify = false ;
            for(var i in items){
                if(items[i].id == form.id){
                    isModify = true;
                    items[i] = form;
                }
            }
            that.pageDesignForm.form.CONFIG_BTNS = items ;
            if(!isModify){
                that.pageDesignForm.form.CONFIG_BTNS.push(form) ;
            } 
            that.isView = false ;
        },
        qualityConfirm : function(form){
            var that = this;
            var searchConditions = that.pageDesignForm.form.SEARCH_CONDITIONS ;
            var flag = false ;
            for(var i in searchConditions){
                if(searchConditions[i].id == form.id){
                    flag = true ;
                    searchConditions[i] = form ;
                }
            }
            that.pageDesignForm.form.SEARCH_CONDITIONS = searchConditions ;
            if(!flag){
                that.pageDesignForm.form.SEARCH_CONDITIONS.push(form);
            }
            that.bol.isQualityPage = false;
        },
        confTableConfirm:function(form){//展示列配置
           this.pageDesignForm.form.columns = form.columns ;
           this.bol.isConfTablePage = false ;
        },
        initColumnForm : function(tempArr){//初始化列别名表单数据
          var that = this;
          var  formItems = [];
          var  rules = {};
          var  tempForm = {}
          //调整成需要的字段映射关系
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
          };
          this.columnForm.btns
              =[{
                  id : 'confirm',
                  name : '确定',
                  type : 'primary',
                  icon : 'el-icon-check',
                  closed : true,
                  click : function(){
                      var form = that.columnForm.form ;
                      var temp = {};
                      var flag = false;
                      for(var i in form ){
                          if( form[i] ){
                              flag = true ;
                              temp[i] = form[i].trim();
                          }else{
                              temp[i] = i.trim() ; 
                          }
                      }
                      if(!flag){
                        that.$message({
                            message: '请最少为一个列设置别名！！！',
                            type: 'error'
                        });
                        return ;
                      }else{
                          that.tempForm = temp ;
                          console.log(temp);
                          that.bol.isColumnPage = false;
                      }
                  }
              }]
            this.columnForm.form = tempForm ;
            this.bol.isColumnPage = true;
        },
        pageDesignDataFormat : function(){
            var temp = [];
            for(var i in this.tempForm){
                 var obj = {};
                 obj.label = this.tempForm[i];
                 obj.value = i ;
                 temp.push(obj);
            }
           this.tempArr = temp;      
        },
        initPageDesignForm : function(){
          var that = this;
          var  formItems = [{
                  prop:'CONFIG_NAME',
                  label:'台账名称:',
                  type:'input',
              },{
                  prop:'SEARCH_COLUMNS',
                  label:'模糊查询',
                  type:'select',
                  multiple:true,
                  options:that.tempArr
              },{
                  prop:'CONFIG_BTNS',
                  label:'按钮',
                  type:'btns',
                  hoverId:-1,
                  events:{
                      editBtn:function(index){
                         if(index != -1){
                              var form = that.pageDesignForm.form.CONFIG_BTNS[index];
                              form.isEdit = true ;
                              that.btnForm = form;
                          }else{
                             that.btnForm = {};
                          }
                          that.bol.isBtnsPage = true ;
                      },
                      deleteBtn:function(index){
                         that.pageDesignForm.form.CONFIG_BTNS.splice(index,1);
                      },
                  }
              },{
                  prop:'SEARCH_CONDITIONS',
                  label:'高级条件',
                  type:'conditions',
                  events:{
                    editBtn : function(index){
                        if(index != -1){
                            that.qualityConditionsForm = 
                                  that.pageDesignForm.form.SEARCH_CONDITIONS[index] ;
                        }else{
                           that.qualityConditionsForm = {};
                        }
                        that.bol.isQualityPage = true;
                    },
                    deleteBtn : function(index){
                        that.pageDesignForm.form.SEARCH_CONDITIONS.splice(index,1);
                    }
                  }
              },{
                  prop:'SHOW_COLUMNS',
                  label:'默认展示列',
                  type:'checkbox-button',
                  options:that.tempArr,
                  events:{
                    addClick:function(){
                        that.bol.isConfTablePage = true ;
                    }
                  }
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
                INIT_PARAM:"{\n\n\n}",
                CONFIG_BTNS:[],
                SEARCH_CONDITIONS:[],
                REQUES_URL:"/pagelist/commonpage/"+this.id,
                conlumns:[],
            }
        },
        getSearchInfo : function(){//获取数据
            this.bol.isBtnsPage = false;
            if(!this.sqlForm.form.SEARCH_SQL)return;
            var sql =  this.sqlForm.form.SEARCH_SQL.toUpperCase();
            if(this.tempSQL == ''){
                this.tempSQL = sql ;
            }else if( this.tempSQL == sql ){
                this.columnForm.form = this.tempForm ;
                this.isView = true;
                this.bol.isColumnPage = true;
                return ;
            }
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
                    filedArr.push(temp.trim());
                }else if(temp.indexOf('.') != -1 ){
                    index = temp.indexOf('.');
                    filedArr.push(temp.substring(index+1).trim());
                }else if(temp.indexOf(' ') != -1){
                    temp = temp.substring(temp.lastIndexOf(' ') + 1);
                    filedArr.push(temp.trim());
                }else{
                  filedArr.push(temp.trim());
                }
            }
            if(filedArr.length > 0){
                this.initColumnForm(filedArr);
            }
          
        },  
        doSave : function(){//保存数据
            var temp = {
                id: this.id,
                sqlForm: this.sqlForm.form,
                columnForm : this.tempForm,
                pageDesignForm : this.pageDesignForm.form ,
            };
            
            this.post("/pagelist/modifyPageList",
                      temp)
                .then(res => {
                    console.log(res);
                })
        },
        getFormData : function(){//根据id获取表单的数据
             this.post("/pagelist/addOrModifyPageList",
                      {id:this.id})
                .then(res => {
                    console.log(res);
                })
        },
    }
 }
</script>
<style scoped>
.box-block {
    width: 100%;
    position:relative;
    margin:0px;
}
.box-block div {
    display: inline-block;   
    word-wrap: break-word;
    width: 45%;
    text-align: center;
    margin-top: 15px;
    padding: 5px;
    border-radius: 5px;
    padding-top:15px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 5px 5px #cac6c6;
}
</style>





























