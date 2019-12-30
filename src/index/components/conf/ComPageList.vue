<template>
  <div>
    <CommonPage :pageParam="pageParam"></CommonPage>
  </div>
</template>
<script>
 

 export default {
    data(){
      return {
        tableParam:{},
        btns:[],
        conditions:[],
        pageParam:{},
      }
    },
    components:{
    },
    created(){
      this.initTable();
      this.initBtns();
      this.initConditions();
      this.initPageParam();
    },
    methods:{
      onSubmit() {
          console.log('submit!');
      },
      initPageParam : function(){
           this.pageParam = {     
                isPagination:true,//是否分页
                isQualitySearch:true,//是否高级查询
                conditions:this.conditions,//高级查询项
                btns:this.btns,//按钮
                tableParam : this.tableParam//表单参数
           }
      },
      initConditions :function(){
          this.conditions = [
            {
              type:'select',
              label:'喜欢的水果',
              prop:'fruit',
              ismulti:false,
              options:[
                {
                  label:'苹果',
                  value:'apple',
                  disabled:true,  
                },{
                  label:'香蕉',
                  value:'banana',
                  disabled:false,
                },{
                   label:'橘子',
                   value:'orange',
                   disabled:false, 
                }
              ],
            },{
              type:'date',
              label:'开始时间',
              prop:'fruit',
            },{
              type:'bol',
              label:'是否为女',
              prop:'gender',
              activeText:'是',
              inactiveText:'否'
            },{
              type:'interval',
              label:'时间段',
              prop:'interval',
            },{
              type:'buttons',
              label:'所在区域',
              prop:'button',
              value:'西安',
              options:[
                {name:'上海',value:'shanghai'},
                {name:'北京',value:'beijing'},
                {name:'深圳',value:'shenzhen'},
                {name:'西安',value:'xian'}],
            }
          ];
      },
      initBtns:function(){
          var that = this;
          this.btns = [{
                name : '删除',
                type : 'primary',
                icon : 'el-icon-delete',
                disabled : false,
                click : function(){
                  alert('嘻嘻嘻！！！!');
                }
              },]
      },
      handleClick:function(row){
         console.log('handleClick');
         console.log(row);
         alert(JSON.stringify(row));
      },
      handleEdit : function(row){
          console.log('handleEdit');
          console.log(row);
           alert(JSON.stringify(row));
      },
      initTable : function(){
          var that = this;
          this.tableParam = {
            border:true,//是否有边框
            script:true,
            highlightCurrentRow:true,//单行选择
            maxHeight:"1500",//最大高度
            multi:true,//是否为多选
            height:'600px',
            defaultSort:{//默认排序参数
              // prop: 'date', order: 'descending'
            },
            columns:[{
                prop : 'date',
                label : '日期',
                width :'120',
                icon : 'el-icon-time',
             },{
                prop : "name",
                label : "姓名",
                width : "80"
             },{
                prop:"province",
                label:"省份",
                width:"80",
             },{
                prop : "city",
                label : "市区",
                width : "80",
             },{
                prop : "address",
                label : "地址",
                width : "250",
             },{
                 prop : "zip",
                 label : "邮编",
                 width : "120",
             },{
                prop : "cz",
                label : "操作",
                width : "200",
                sortable:'',
                fixed:'right',
                opers:[
                  {
                    name:"查看",
                    type:'',
                    click:function(row){
                      that.handleClick(row);
                    }
                  },
                  {
                    name:"编辑",
                    type:'danger',
                    icon:'el-icon-edit',
                    click:function(row){
                        that.handleEdit(row);
                    }
                  }   
                ]
             }],
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





























