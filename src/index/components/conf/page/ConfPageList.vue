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
       <ComDialog 
          :dialog="dialog"
          :visable.sync="isView">
          <!-- 列别名配置表单 -->
          <ComForm v-if="bol.isColumnPage"
              :formDesign="columnForm.formDesign"
              :form.sync="columnForm.form" 
              :btns="columnForm.btns"></ComForm>
           <!-- 按钮配置页面 -->
           <ComForm v-if="bol.isBtnsPage"
              :formDesign="btnForm.formDesign"
              :form.sync="btnForm.form" 
              :btns="btnForm.btns">
              <span style="padding:15px;border:1px solid #DCDFE6;margin:15px;">
                  <label><strong>按钮样例：</strong></label>
                  <Button :btn="btnForm.form" />
                </span>
            </ComForm>    
      </ComDialog>
      <!-- 高级条件配置页面 -->
       <ComDialog 
          :dialog="dialog"
          :visable.sync="canView">
          <ComForm 
              :formDesign="qualityConditionsForm.formDesign"
              :form.sync="qualityConditionsForm.form" 
              :btns="qualityConditionsForm.btns">
          </ComForm> 
      </ComDialog>
    </div> 

</template>
<script>
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
          btnForm:{
            formDesign:{},
            btns:[],
            form:{},  
          },
          baseForm:{
            formDesign:{},
          },
          dialog:{},
          isView:false,
          bol:{
            isColumnPage:false,
            isBtnsPage:false,
          },
          tempForm:{},
          tempArr : [],//用于临时存储SQL列填写信息
          tempSQL : '',
          canView:false,
          qualityConditionsForm : {//高级条件项查询表单
            formDesign:{},
            btns:[],
            form:{}, 
          }
      }
    },
    created : function(){
        this.id = this.$route.params.id;//台账页面的唯一ID
        this.initBtn();//初始化主按钮
        this.initSqlForm();//初始化SQL表单
        this.initPageDesignForm();//初始化配置设计页面,
        this.initBaseForm();//表单配置基本页面
        this.initQualityConditionsForm();//初始化高级查询配置表
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
        isView:function(n,o){
            if(!n){
                this.bol.isColumnPage = false ;
                this.bol.isBtnsPage = false ;
            }
        },
        canView:function(n,o){
          if(!n){
              this.qualityConditionsForm.form = {
                      id:(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
                      options : [{label:'',value:''}],
                      type:'',
                 };
          }
        },
        tempArr:{
          deep:true,
          immediate:true,
          handler:function(n,o){//选中的数组大于0时，配置页面才可见
             if(n.length > 0){
                this.initPageDesignForm();
                this.initQualityConditionsForm();
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
        }
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
        initBtnForm : function(){
            var that = this;
            var  formItems = [
                  {
                    prop:'id',
                    label:'按钮ID',
                    type:'input',
                    disabled:true,
                    placeholder:'按钮ID',
                  },{
                    prop:'name',
                    label:'按钮名称:',
                    type:'input',
                    placeholder:'按钮名称',
                  },{
                    prop:'icon',
                    label:'按钮icon',
                    type:'select',
                    options:[
                      {label:'编辑',value:'el-icon-edit'},
                      {label:'分享',value:'el-icon-share'},
                      {label:'删除',value:'el-icon-delete'},
                      {label:'查找',value:'el-icon-search'},
                      {label:'设置',value:'el-icon-setting'},
                      {label:'省略号',value:'el-icon-more-outline'},
                      {label:'图片',value:'el-icon-picture-outline-round'},
                      {label:'播放',value:'el-icon-video-play'},
                      {label:'查看',value:'el-icon-view'},
                    ],
                  },{
                    prop:'type',
                    label:'按钮类型:',
                    type:'select',
                    options:[
                      {label:'重要',value:'primary'},
                      {label:'成功',value:'success'},
                      {label:'信息',value:'info'},
                      {label:'警告',value:'warning'},
                      {label:'危险',value:'danger'},
                      {label:'文本',value:'text'},
                    ]  
                  },{
                    prop:'style',
                    label:'按钮样式:',
                    type:'select',
                    multiple:true,
                    options:[
                      {label:'默认按钮',value:''},
                      {label:'朴素按钮',value:'plain'},
                      {label:'圆角按钮',value:'round'},
                      {label:'原型按钮',value:'circle'},
                    ]  
                  },{
                    prop:'script',
                    label:'按钮脚本:',
                    type:'textarea',
                    numbers:1000,
                  }
              ];
            this.btnForm.formDesign = {
              disabled:false, 
              inline:false, 
              formItems : formItems,
            }
            this.btnForm.form = {
                id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
                script:"{\n\tclick:function(){\n\n\n\n\t},\n\thover:function(){\n\n\n\n\t}\n}"
            }
            this.btnForm.btns = [{
                    id : 'confirm',
                    name : '确定',
                    type : 'primary',
                    icon : 'el-icon-check',
                    labelWidth:'0.4',
                    disabled : false,
                    click : function(){
                       var form = that.btnForm.form ;
                       var flag = false ;
                       for(var i in form){
                         if( i == 'script' )continue;
                          flag = true;
                          break;
                       } 
                       if(flag){
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
                          that.btnForm.form ={
                              id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
                              script:"{\n\tclick:function(){\n\n\n\n\t},\n\thover:function(){\n\n\n\n\t}\n}"
                          } ;
                       }else{
                          that.$message({
                              message: '请确定按钮是否配置！',
                              type: 'error'
                          });
                       }
                       
                    }
                 }];

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
                          that.isView = false;
                      }
                  }
              }]
            this.columnForm.form = tempForm ;
            this.isView = true;
            this.bol.isColumnPage = true;
        },
        initDialog : function(){
            this.dialog = {
                width:'60%',
                titleSlot:'<strong>新增列展示名称</strong>',
            }
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
                              that.btnForm.form = form;
                          }
                          that.dialog.width='50%';
                          that.dialog.titleSlot='<strong>按钮设计</strong>';
                          that.bol.isBtnsPage = true ;
                          that.isView = true;
                          that.bol.isColumnPage = false; 
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
                            that.qualityConditionsForm.form = 
                                  that.pageDesignForm.form.SEARCH_CONDITIONS[index] ;
                        }
                        that.dialog.title="高级查询条件配置";
                        that.canView = true;
                        that.isView = false;
                    },
                    deleteBtn : function(index){
                        that.pageDesignForm.form.SEARCH_CONDITIONS.splice(index,1);
                    }
                  }
              },{
                  prop:'SHOW_COLUMNS',
                  label:'默认展示列',
                  type:'checkbox-button',
                  options:that.tempArr
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
            }
        },
        getSearchInfo : function(){//获取数据
            this.dialog.width = '60%',
            this.dialog.titleSlot = '<strong>新增列展示名称</strong>'
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
        initQualityConditionsForm : function(){
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
                  type:'child-form',
                  rows:[
                    [
                      {'标签名':'label'},
                      {'对应值':'value'},
                    ]
                  ],
                  events:{
                     addColumn : function(){
                        var columns  = that.qualityConditionsForm.formDesign.formItems;
                        for( var i in columns ){
                            var column = columns[i];
                            if( column.prop == 'options' ){
                                var row = column.rows[0];
                                column.rows.push(row);
                            }
                        }
                        that.qualityConditionsForm.formDesign.formItems = columns ;
                        var obj = {label:'',value:''} ;
                        that.qualityConditionsForm.form.options.push(obj) ;
                     },
                     deleteColumn : function(index){
                       if(index == 0) return;
                      var columns  = that.qualityConditionsForm.formDesign.formItems;
                        for( var i in columns ){
                            var column = columns[i];
                            if( column.prop == 'options' ){
                                column.rows.splice(index,1);
                            }
                        }
                        that.qualityConditionsForm.formDesign.formItems = columns ;
                        that.qualityConditionsForm.form.options.splice(index,1);
                     },
                     isShow : function(){//
                        var type = that.qualityConditionsForm.form.type ;   
                        var flag = ( type == 'select' 
                                        || type == 'radio-buttons' );  
                        return flag;    
                     }
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
                        var searchConditions = that.pageDesignForm.form.SEARCH_CONDITIONS ;
                        var flag = false ;
                        for(var i in searchConditions){
                            if(searchConditions[i].id == form.id){
                                flag = true ;
                                searchConditions[i] = form ;
                            }
                        }
                        if(!flag){
                            that.pageDesignForm.form.SEARCH_CONDITIONS.push(that.qualityConditionsForm.form);
                        }
                        that.canView = false;
                    }
                 }],
            form:{
              id:(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
              options : [{label:'',value:''}],
              type:'',
            },
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
    border: 1px solid #ebebeb;
    padding-top:15px;
    box-shadow: 0px 0px 10px 5px #888888;
}
</style>





























