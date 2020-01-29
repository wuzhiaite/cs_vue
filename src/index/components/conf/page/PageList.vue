<template>
  <div class="box-block">
        <div>
          <CommonPage :pageParam="pageParam"></CommonPage>
        </div>
        <div style="width:1px;"></div>
        <div style="float:right;margin-top:20px;">    
          <PageListDetail :form="form"></PageListDetail>
        </div> 
    </div>
</template>
<script>
 import PageListDetail from './PageListDetail'

 export default {
    data(){
      return {
        tableParam:{},
        btns:[],
        conditions:[],
        pageParam:{},
        form:{},
        disabled:false,
        conditionSelect:['name','area','age'],
        options:[
          {
            name:'名称',
            value:'name'
          },{
            name:'区域',
            value:'area',
          },{
            name:'年龄',
            value:'age',
          }
        ],
      }
    },
    components:{
       PageListDetail,
    },
    created(){
      this.initTable();
      this.initBtns();
      this.initPageParam();
    },
    methods:{
      onSubmit() {
          console.log('submit!');
      },
      initPageParam : function(){
           this.pageParam = {     
                isPagination:true,//是否分页
                isQualitySearch:false,//是否高级查询
                btns:this.btns,//按钮
                tableParam : this.tableParam//表单参数
           }
      },
      handleClick:function(row){
         alert(JSON.stringify(row));
      },
      handleEdit : function(row){
           alert(JSON.stringify(row));
      },
       initBtns:function(){
          var that = this;
          this.btns = [
            {
                name : '新增',
                type : 'primary',
                icon : 'el-icon-delete',
                disabled : false,
                click : function(){
                   
                }
              }]
      },
      initTable : function(){
          var that = this;
          this.tableParam = {
            script:true,
            highlightCurrentRow:true,//单行选择
            maxHeight:"1500",//最大高度
            multi:false,//是否为多选
            height:'600px',
            defaultSort:{//默认排序参数
              // prop: 'date', order: 'descending'
            },
            columns:[{
                prop : "name",
                label : "姓名",
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
                      that.handleClick(row);
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
                      that.handleClick(row);
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
                  // alert(JSON.stringify(row));
                  that.form = row ;
                }
             },
             initData:{
               url:'',
               param:{},
             },
          }

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
  margin-top:10px;
  text-align: center;
  width:100%;
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





























