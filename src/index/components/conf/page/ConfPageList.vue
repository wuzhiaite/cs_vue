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
          :visable.sync="qualityConditionsForm.isView">
          <ComForm 
              :formDesign="qualityConditionsForm.formDesign"
              :form.sync="qualityConditionsForm.form" 
              :btns="qualityConditionsForm.btns"></ComForm> 
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
          tempArr : [],//用于临时存储SQL列填写信息
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
          dialog:{},
          isView:false,
          bol:{
            isColumnPage:false,
            isBtnsPage:false,
          },
          tempForm:{},
          qualityConditionsForm : {}//高级条件项查询表单
      }
    },
    created : function(){
        this.id =  this.$route.params.id;
        this.initBtn();
        this.initSqlForm();
        this.initPageDesignForm();
        this.initBtnForm();
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
        disabled:function(n,o){
            if(n){
                this.initQualityConditionsForm();
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
                    icon : '',
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
            this.columnForm.btns
                =[{
                    id : 'confirm',
                    name : '确定',
                    type : 'primary',
                    icon : '',
                    closed : true,
                    click : function(){
                        var form = that.columnForm.form ;
                        var temp = {};
                        var flag = false;
                        for(var i in form ){
                            if( form[i] ){
                               flag = true ;
                               temp[i] = form[i]
                            }else{
                               temp[i] = i ; 
                            }
                        }
                        if(!flag){
                          that.$message({
                              message: '请最少为一个列设置别名！！！',
                              type: 'error'
                          });
                          return ;
                        }else{
                            that.tempArr = temp ;
                            that.isView = false;
                            that.pageDesignDataFormat();
                            that.pageDesignForm.formDesign.disabled = false;
                        }
                    }
                }]
            this.columnForm.form = tempForm ;
            this.isView = true;
            this.bol.isColumnPage = true;
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
                  prop:'SEARCH_COLUMNS',
                  label:'模糊查询',
                  type:'select',
                  multiple:true,
                  options:tempArr
              },{
                  prop:'CONFIG_BTNS',
                  label:'按钮',
                  type:'btns',
                  hoverId:-1,
                  events:{
                      editBtn:function(index){
                        console.log(index);
                         if(index != -1){
                              var form = that.pageDesignForm.form.CONFIG_BTNS[index];
                              console.log(form);
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
                    clickBtn:function(){
                        that.qualityConditionsForm.isView = true ;
                    }
                  }
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
              disabled:false,  
              formItems : formItems,
            }
            this.pageDesignForm.form = {
                SHOW_COLUMNS:[],
                INIT_PARAM:"{\n\n\n}",
                CONFIG_BTNS:[],
                SEARCH_CONDITIONS:[],
            }
        },
        getSearchInfo : function(){//获取数据
            this.dialog.width = '60%',
            this.dialog.titleSlot = '<strong>新增列展示名称</strong>'
            this.bol.isBtnsPage = false;
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
                  prop:'label',
                  label:'条件项名称',
                  type:'input',
                  placeholder:'请输入条件项名称',
              },{
                  prop:'prop',
                  label:'查询字段',
                  type:'select',
                  placeholder:'请输入需要查询的字段',
                  options:that.tempForm,
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
                    {label:'单选',value:'radio'},
                    {label:'多选',value:'checkbox'},
                    {label:'多选按钮',value:'checkbox-buttons'},
                    {label:'比率',value:'rate'},
                  ],
                  events:{
                    checkChange : function(){
                       var type = that.qualityConditionsForm.form.type ;
                       if( type == 'select' ){
                         that.qualityConditionsForm.formDesign.formItems[4].show = true;
                       }
                    }
                  }
              },{
                 prop:'options',
                  label:'字段映射',
                  type:'child-form',
                  show:false,
                  items:[
                    {label:'标签名',value:'label'},
                    {label:'对应值',value:'value'},
                  ]
              }],
            },
            btns:[{
                    id : 'confirm',
                    name : '确定',
                    type : 'primary',
                    icon : '',
                    disabled : false,
                    click : function(){
                        this.isView = false;
                        that.pageDesignForm.form.SEARCH_CONDITIONS.push(this.form);
                    }
                 }],
            form:{
              id:(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
              options:[],
              type:[],

            },
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
    border-radius: 5px;
    border: 1px solid #ebebeb;
    box-shadow: 0px 0px 10px 5px #888888;
}
</style>





























