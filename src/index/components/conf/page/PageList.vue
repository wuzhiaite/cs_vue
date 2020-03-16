<template>
<div>
  <div class="box-block">
        <div style="border:0px;">
          <CommonPage :pageParam="pageParam"></CommonPage>
        </div>
        <div style="width:1px;border:0px ;"></div>
        <div style="float:right;">    
          <ComForm 
              :formDesign="formStyle.formDesign"
              :form="formStyle.form" 
              :btns="formStyle.btns"></ComForm>
        </div> 
    </div>
    <ComDialog 
          :dialog="dialog"
          :visable.sync="viewParam.isView" >
          <CommonPage :pageParam="viewParam.pageParam" />
    </ComDialog>
</div>        
</template>
<script>


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
        dialog:{}
      }
    },
    created(){
      this.initTable();
      this.initPageParam();
      this.initForm();
      this.initDialog();
    }, 
    methods:{
      onSubmit() {
          console.log('submit!');
      },
      initDialog : function(){
          this.dialog = {
            width : '80%'
        }
      },
      initForm : function(){
          var formItems = [{
                prop:'CONFIG_NAME',
                label:'台账名称:',
                type:'input',
            },{
                prop:'SEARCH_FILEDS',
                label:'查询条件:',
                type:'input',
              },{
                prop:'CONDITION_FILEDS',
                label:'高级查询:',
                type:'input',
              },{
                prop:'COLUMN_FILEDS',
                label:'展示列:',
                type:'input',
              },{
                prop:'SEARCH_SQL',
                label:'查询SQL:',
                type:'textarea',
                numbers:1500,
              }
          ];
         
          this.formStyle.formDesign = {
              disabled:true,  
              formItems : formItems,
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
                  icon : 'el-icon-circle-plus-outline',
                  disabled : false,
                  click : function(){
                    var id = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) ;
                    that.$router.push({path:`/confPageList/${id}`});
                  }
                }],
                initData:{
                  url:'/pagelist/getpagelist',
                  params:{
                    "pageNum":1,
                    "pageSize":10,
                  },
                },
                events : {
                   initCallback : function(response){
                        if(response.result.list.length > 0){
                           that.formStyle.form = response.result.list[0] ;
                        }else{
                          that.formStyle.form = {};
                        }
                    }
                }
           }
      },
      handleDelete:function(row){
         alert(JSON.stringify(row));
      },
      handleEdit : function(row){
           alert(JSON.stringify(row));
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
                prop : "CONFIG_NAME",
                label : "台账名称",
                width : "10"
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
                      that.viewParam.pageParam = JSON.parse(row.FORM_DESIGN) ;
                      that.dialog.title = row.CONFIG_NAME;
                      that.viewParam.isView = true;
                    }
                  }   
                ]
             },{
                prop : "cz",
                label : "操作",
                width : "20",
                fixed:'right',
                opers:[
                  {
                    name:"删除",
                    type:'danger',
                    icon : 'el-icon-delete',
                    click:function(row){
                      that.handleDelete(row);
                    }
                  },
                  {
                    name:"编辑",
                    type:'',
                    icon:'el-icon-edit',
                    click:function(row, column, event){
                        that.handleEdit(row);
                    }
                  }   
                ]
             }],
             events:{
                rowClick : function(row, column, event){
                  that.formStyle.form = row ;
                },
             },
            
          }

      }
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





























