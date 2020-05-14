<template>
  <div>
    <el-card class="box-card" >
        <CommonPage :pageParam="pageParam"></CommonPage>
    </el-card>
    <ComDialog
      :dialog="dialog"
      :visable.sync="visable">
    </ComDialog>

  </div>
</template>
<script>

 export default {
    data(){
      return {
        visable:false,
        tableParam:{},
        btns:[],
        conditions:[],
        pageParam:{},
        searchParam :{},
        dialog:{} 
      }
    },
    components:{
    },
    created(){
      this.initPageParam();
      this.initDialog();
    },
    methods:{
      initDialog(){
          this.dialog={
              title:'测试列表数据',
              modal:true,
              fullscreen:false,
              appendToBody:true,
              localScroll:false,
              closeOnModal:true,
              closeOnEscape:true,
              center:true,
              close:function(){
                // alert('close');
              },
              closed:function(){
                // alert('closed');
              },
              opened:function(){
                //  alert('opened'); 
              },
              open:function(){
                // alert('open');
              }
            } 
      },
      onSubmit() {
          console.log('submit!');
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
                          width :'15',
                          icon : 'el-icon-time',
                      },{
                          prop : "TABLE_NAME",
                          label : "表名",
                          fixedDirect : 'left',
                          width : "10"
                      },{
                          prop : "TABLE_COMMENT",
                          label : "表别名",
                          fixed : 'left',
                          width : "10"
                      },{
                          prop:"TABLE_ROWS",
                          label:"数据行数",
                          width:"10",
                      },{
                          prop : "AVG_ROW_LENGTH",
                          label : "平均行长度",
                          width : "10",
                      },{
                          prop : "DATA_LENGTH",
                          label : "数据长度",
                          width : "10",
                      },{
                          prop : "INDEX_LENGTH",
                          label : "索引长度",
                          width : "10",
                      },{
                          prop : "CREATE_TIME",
                          label : "创建时间",
                          width : "10",
                      },{
                          prop : "UPDATE_TIME",
                          label : "更新时间",
                          width : "17",
                      },{
                          prop : "",
                          label : "操作",
                          width : "17",
                          sortable:'',
                          fixedDirect:'right',
                          opers:[
                            {
                              name:"查看列",
                              type:'',
                              click:function(row){
                                that.handleClick(row);
                              }
                            },
                            {
                              name:"生成代码",
                              type:'danger',
                              icon:'el-icon-edit',
                              click:function(row){
                                  that.handleEdit(row);
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
      handleClick:function(row){
        this.visable = true;
      },
      handleEdit : function(row){
         alert(JSON.stringify(row));
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





























