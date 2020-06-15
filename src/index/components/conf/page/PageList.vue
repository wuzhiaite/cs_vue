<template>
<div>
  <el-row>
    <el-col :span="12">
      <el-card>
        <CommonPage :pageParam="pageParam"></CommonPage>
      </el-card>
    </el-col>
    <el-col :span="11" :offset="1">  
      <el-card>  
      <ComForm 
          :formDesign="formStyle.formDesign"
          :form="formStyle.form" 
          :btns="formStyle.btns"></ComForm>
      </el-card>
    </el-col> 
  </el-row>
    <ComDialog 
          :dialog="dialog"
          :visable.sync="viewParam.isView" >
          <ComPageList :pageParam="viewParam.pageParam" />
    </ComDialog>
</div>        
</template>
<script>
import {format} from '@/util/base/commonUtil';
import ComPageList from './ComPageList'
 export default {
    data(){
      return {
        tableParam:{},
        pageParam:{},
        formStyle:{
            formDesign:{},
            btns:[],
            form:{},
        },
        viewParam:{
            isView:false,
            pageParam:{}
        },
        dialog:{},
        tempArr:[],
      }
    },
    created(){
      this.initTable();
      this.initPageParam();
      this.initDialog();
    },
    components:{
      ComPageList,
    },
    methods:{
      initDialog : function(){
          var that = this ;
          this.dialog = {
            width : '80%',
            events:{
              closed:function(){//关闭页面后，页面重新初始化
                  that.viewParam.pageParam = {};
              }
            }
        }
      },
      initForm : function(){
          var that = this;
          var formItems = [{
                prop:'CONFIG_NAME',
                label:'台账名称:',
                type:'input',
            },{
                prop:'SEARCH_FILEDS',
                label:'查询条件:',
                multiple:true,
                type:'select',
                options:that.tempArr,
              },{
                prop:'CONDITION_FILEDS',
                label:'高级查询:',
                type:'conditions',
              },{
                prop:'SHOW_COLUMNS',
                label:'展示列:',
                multiple:true,
                type:'select',
                options:that.tempArr
              },{
                prop:'SEARCH_SQL',
                label:'查询SQL:',
                type:'textarea',
                numbers:1500,
              }
          ];
         
          this.formStyle.formDesign = {
              disabled : true,  
              formItems : formItems,
              form:{
                CONDITION_FILEDS:[],   
              }

          }
       },
      initPageParam : function(){
           var that = this;
           this.pageParam = {     
                isPagination:true,//是否分页
                isQualitySearch:false,//是否高级查询
                tableParam : this.tableParam,//表单参数
                btns : [{
                  name : '新增',
                  type : 'primary',
                  hasPermission:['can_add'],
                  icon : 'el-icon-circle-plus-outline',
                  disabled : false,
                  click : function(){
                    var id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) ;
                    that.$router.push({path:`/confPageList/${id}`});
                  }
                }],
                initData:{
                  url:'/api/pagelist/getpagelist',
                  params:{
                    "pageNum":1,
                    "pageSize":10,
                  },
                },
                events : {
                   initCallback : function(response){
                        if(response.result.list.length > 0){
                           var columnForm = response.result.list[0].COLUMN_FORM ;
                           var options = JSON.parse(columnForm); 
                           var arr = [] ;
                           for(var i in options){
                             var obj = {
                               value : i ,
                               label : options[i] ,
                             };
                             arr.push(obj);  
                           }
                          that.tempArr = arr ;
                          that.formStyle.form = format.formatJSON(response.result.list[0]);
                        }else{
                          that.formStyle.form = {};
                        }
                        that.initForm();
                    }
                }
           }
      },
      handleDelete:function(row){
         this.$confirm("请确定是否要删除？")
          .then(()=>{
               this.$axios
                  .post("/api/pagelist/deletepage/"+row.ID)
                    .then(res => {
                        if(res.status == 200 && res.data.result == 2){
                            this.$message({
                              type:"success",
                              message:"删除成功"
                            });
                            setTimeout(function(){
                               window.location.reload();
                            },500);
                        }else{
                          this.$message({
                            type:"error",
                            message:'删除失败，请稍后重试！！！'
                          });
                        }
                    });
          });
         
      },
      handleEdit : function(row){
          this.$router.push({path:`/confPageList/`+row.ID});
      },
      initTable : function(){
          var that = this;
          this.tableParam = {
            script:true,
            highlightCurrentRow:true,//单行选择
            maxHeight:"1500",//最大高度
            multi:false,//是否为多选
            height:'500px',
            defaultSort:{//默认排序参数
              // prop: 'date', order: 'descending'
            },
            searchParam:{
              placeholder:'请输入台账名称',
            },
            columns:[{
              prop : "ID",
              label : "台账ID",
              width : "10",
              fixedDirect : 'left' ,
            },{
                prop : "CONFIG_NAME",
                label : "台账名称",
                width : "10",
             },{
                prop : "",
                label : "台账预览",
                width : "10",
                opers:[
                  {
                    name:"台账预览",
                    type:'text',
                    icon : 'el-icon-view',
                    click:function(row){
                      that.viewParam.pageParam = JSON.parse(row.PAGE_PARAM) ;
                      that.dialog.title = row.CONFIG_NAME;
                      that.viewParam.isView = true;
                    }
                  }   
                ]
             },{
                prop : "cz",
                label : "操作",
                width : "20",
                fixedDirect:'right',
                opers:[
                  {
                    name:"删除",
                    type:'danger',
                    hasPermission:['can_delete'],
                    icon : 'el-icon-delete',
                    click:function(row){
                      that.handleDelete(row);
                    }
                  },
                  {
                    name:"编辑",
                    type:'',
                    icon:'el-icon-edit',
                    hasPermission:['can_edit'],
                    click:function(row, column, event){
                        that.handleEdit(row);
                    }
                  }   
                ]
             }],
             events:{
                rowClick : function(row, column, event){
                  that.formStyle.form =  format.formatJSON(row);
                },
             },
            
          }

      },
    }

 }


</script>
<style scoped>
.el-select{
  width:100%;
} 
.box-block {
    width: 100%;
}
.box-block div {
    display: inline-block;   
    word-wrap: break-word;
    width: 48%;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #eaeaea;
    background-color:white;
}
span{
  width:50px;
  font-size:12px;
  padding:0px;
}
 table{
  border-collapse: collapse;
  margin: 0 auto;
  margin-top:10px;
  text-align: center;
  width:100%;
}
table td, table th{
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
  width:30%;
  background-color:#D1E7FE;
}
.td-form{
  width:70%;
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





























