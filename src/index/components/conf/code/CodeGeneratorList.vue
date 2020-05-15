<template>
  <div>
    <el-card class="box-card" >
        <CommonPage :pageParam="pageParam"></CommonPage>
    </el-card>
    <ComDialog
      :dialog="dialog.columnDialog"
      :visable.sync="bol.generatorView">
       <ComForm 
            :formDesign="generator.formDesign" 
            :form.sync="generator.form"
            :btns="generator.btns"></ComForm>
    </ComDialog>
    <el-drawer
       title="列明细数据"
      :visible.sync="bol.visable"
      direction="ltr"
      size="60%">
      <CommonPage :pageParam="columnParam" ></CommonPage>
    </el-drawer>

  </div>
</template>
<script>

 export default {
    data(){
      return {
        generator:{
          formDesign:{},
          form:{},
          btns:[]
        },
        pageParam:{},
        columnParam : {},
        dialog:{
          columnDialog:{
            title:"代码生成",
          }
        },
        bol:{
          visable:false,
          generatorView:false
        },
      }
    },
    created(){
      this.initPageParam();
      this.initGeneratorForm();
    },
    methods:{
      initGeneratorForm(){
          var that = this ;
          this.generator = {
              formDesign:{
                  disabled : false,  
                  rules : { },
                  formItems : [
                            {
                                prop:'tablenames',
                                label:'表名',
                                type:'input',
                                disabled:true,
                            },
                            {
                                prop:'author',
                                label:'作者',
                                type:'input',
                            },{
                                prop:'packageName',
                                label:'包名',
                                type:'input',
                            },{
                                prop:'module',
                                label:'模块',
                                type:'input',
                            }
                        ],
              },
              btns:[{
                  name:'代码生成',
                  disabled: false,
                  type:'primary',
                  click:function(){
                    that.doGenerator();
                  }
               }],
              form:{

              }
          }
      },
      doGenerator(){
         this.$axios.post("/api/codegenerator/generatorCode",this.generator.form)
            .then(res=>{
                if(res.status == 200 && res.data.code == 1){
                    this.$message({
                          message: '代码生成成功！！！' ,
                          type : 'success'
                      });  
                  }else{
                      this.$message({
                        message:res.data.message ,
                        type : 'error'
                    });
                  }
            });
      },
      initColumnParam : function(){
          var that = this ;
           this.columnParam = {     
                isPagination:false,//是否分页
                canSearch:false,
                tableParam : {//表单参数
                      border:false,//是否有边框
                      script:true,
                      rate:0.9,
                      highlightCurrentRow:true,//单行选择
                      columns:[{
                          prop : 'TABLE_NAME',
                          label : '表名',
                          width :'20',
                      },{
                          prop : "COLUMN_NAME",
                          label : "列名",
                          fixedDirect : 'left',
                          width : "20"
                      },{
                          prop : "COLUMN_COMMENT",
                          label : "列别名",
                          fixed : 'left',
                          width : "15"
                      },{
                          prop:"IS_NULLABLE",
                          label:"可否为空",
                          width:"7",
                      },{
                          prop : "COLUMN_TYPE",
                          label : "列类型",
                          width : "10",
                      }],
                    },
                initData:{
                    url:'/api/codegenerator/getColumnsInfo',
                    params:{
                      tableName:'',
                    },
                  },
           }
      },
      initPageParam : function(){
           var that = this ;
           this.pageParam = {     
                isPagination:true,//是否分页
                isQualitySearch:false,//是否高级查询
                searchParam : {
                    placeholder:'请输入表名',
                    maxlength:50,
                },
                conditions:this.conditions,//高级查询项
                tableParam : {//表单参数
                      border:true,//是否有边框
                      script:true,
                      highlightCurrentRow:true,//单行选择
                      maxHeight:"1500",//最大高度
                      multi:false,//是否为多选
                      // height:'600px',
                      columns:[{
                          prop : 'TABLE_SCHEMA',
                          label : '数据库',
                          sortable : true,
                          width :'10',
                          icon : 'el-icon-time',
                      },{
                          prop : "TABLE_NAME",
                          label : "表名",
                          fixedDirect : 'left',
                          width : "20"
                      },{
                          prop : "TABLE_COMMENT",
                          label : "表别名",
                          fixed : 'left',
                          width : "10"
                      },{
                          prop:"TABLE_ROWS",
                          label:"数据行数",
                          width:"7",
                      },{
                          prop : "AVG_ROW_LENGTH",
                          label : "平均行长度",
                          width : "7",
                      },{
                          prop : "DATA_LENGTH",
                          label : "数据长度",
                          width : "10",
                      },{
                          prop : "INDEX_LENGTH",
                          label : "索引长度",
                          width : "7",
                      },{
                          prop : "CREATE_TIME",
                          label : "创建时间",
                          width : "10",
                      },{
                          prop : "UPDATE_TIME",
                          label : "更新时间",
                          width : "10",
                      },{
                          prop : "",
                          label : "操作",
                          width : "20",
                          sortable:'',
                          fixedDirect:'right',
                          opers:[
                            {
                              name:"查看列",
                              type:'el-icon-view',
                              icon:'el-icon-edit',
                              click:function(row){
                                that.viewColumn(row);
                              }
                            },
                            {
                              name:"生成代码",
                              type:'danger',
                              icon:'el-icon-edit',
                              click:function(row){
                                  that.generatorCode(row);
                              }
                            }   
                          ]
                      }],
                    },
                    initData:{
                        url:'/api/codegenerator/getTableList',
                        params:{
                          "pageNum":1,
                          "pageSize":10,
                        },
                      },
           }
      },
      viewColumn : function(row){
        this.initColumnParam();
        this.columnParam.initData.params.tableName = row.TABLE_NAME ;
        this.bol.visable = true;
      },
      generatorCode : function(row){
         this.bol.generatorView = true ;
         this.generator.form.tablenames = row.TABLE_NAME ;
      }
    }

 }


</script>
<style scoped>
.box-block {
    width: 100%;
}
.box-block div {
    display: inline-block;   
    word-wrap: break-word;
    width: 45%;
    text-align: center;
    padding: 10px;
}
span{
  width:50px;
  font-size:12px;
  padding:0px;
}
 table{
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
    }
table td, table th{
  border: 1px solid #cad9ea;
  color: #666;
  height: 30px;
}
table thead th{
  background-color: #CCE8EB;
  width: 100px;
}
table tr:nth-child(odd){
  background: #fff;
}

table tr:nth-child(even){
  background: #F5FAFA;
}

.td-label{
  width:20%;
  background-color:#D1E7FE;
}
.td-form{
  width:30%;
}
.el-tb-common{
  width:100%;
  padding:0px;
  border:0px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }



</style>





























