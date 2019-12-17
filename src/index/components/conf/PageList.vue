<template>
    <div class="box-block">
      <div style="width:45%;">
        <div style="float:left;margin-top:15px;margin-left:30px;">
          <span  style="margin-right:15px;">
              <el-input v-model="search" placeholder="请输入内容"  style="width:200px;"></el-input>
          </span>
          <span>
              <el-button type="primary">查询</el-button>
              <el-button type="primary">删除</el-button>
          </span>           
          <TableList :tableParam="tableParam"></TableList>
        </div>
        
      </div>
  
    </div>
</template>
<script>
 import TableList from '../common/TableList';

 export default {
    data(){
      return {
        search:'',
        tableParam:{}

      }
    },
    components:{
      TableList,
    },
    created(){
      this.initTable();
    },
    methods:{
      handleClick:function(row){
         console.log('handleClick');
         console.log(row);
      },
      handleEdit : function(row){
          console.log('handleEdit');
          console.log(row);
      },
      initTable : function(){
        var that = this;
          this.tableParam = {
            border:true,//是否有边框
            script:true,
            highlightCurrentRow:true,//单行选择
            height:200+'px',//高度,固定表头
            maxHeight:"250",//最大高度
            multi:true,//是否为多选
            defaultSort:{//默认排序参数
              // prop: 'date', order: 'descending'
            },
            columns:[{
                prop : 'date',
                label : '日期',
                width :'150',
             },{
                prop : "name",
                label : "姓名",
                width : "120"
             },{
                prop:"province",
                label:"省份",
                width:"120",
             },{
                prop : "city",
                label : "市区",
                width : "120",
             },{
                prop : "address",
                label : "地址",
                width : "300",
             },{
                 prop : "zip",
                 label : "邮编",
                 width : "120",
             },{
                prop : "cz",
                label : "操作",
                width : "170",
                sortable:'',
                opers:[
                  {
                    name:"查看",
                    click:function(row){
                      that.handleClick(row);
                    }
                  },
                  {
                    name:"编辑",
                    click:function(row){
                        that.handleEdit(row);
                    }
                  }   
                ]
             }
             ],
             tableData:[{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
              }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
              }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
              }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
              }],
             initData:{
               url:'',
               param:{},
               method:''
             },
          }

      }
    }






 }


</script>
<style scoped>
.box-block {
    display: table;
    width: 100%;
}

.box-block div {
    display: table-cell;
    word-wrap: break-word;
    width: 33.33%;
    text-align: center;
    padding: 10px;
}

</style>





























