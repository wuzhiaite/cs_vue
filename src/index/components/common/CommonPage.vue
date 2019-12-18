<template>
 <div>          
    <el-row>
        <el-input v-model="search" placeholder="请输入内容"
            size="small"
            prefix-icon="el-icon-search"
            style="width:100%;"></el-input>
    </el-row> 
    <Buttons :btns="pageParam.btns"></Buttons>  
    <Conditions :conditions.sync="pageParam.conditions" 
            @changeCondition="changeCondition" 
            :show="show"></Conditions>  
    <TableList :tableParam="pageParam.tableParam"></TableList>
    <el-pagination v-if="pageParam.isPagination "
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40">
    </el-pagination>
   <div>     
</template>
<script>
 import TableList from '../common/TableList';
 import Buttons from '../common/Buttons';
 import Conditions from '../common/Conditions'; 
 
 export default {
    data(){
      return {
          show : false,
          search:'',
          tableParam:{
              tableData:[]
          },
          reqParam:{},      
      }
    },
    props:{
        pageParam:{
            type:Object,
            default:{
                isPagination:true,
                isQualitySearch:true,
                conditions:[],
                url:'',
                result:{},
                tableParam:{}
            }
        }
    },
    components:{
      TableList,
      Buttons,
      Conditions,
    },
    created(){
        this.tableParam = this.pageParam.tableParam ;
        if(this.pageParam.isQualitySearch){
             this.addQualitySearch();//判断是否有高级查询需求
        }    
        this.initData();//初始化数据
    },
    methods:{
        addQualitySearch:function(){//增加高级查询,和普通查询
         var that = this;
         var quailtyBtn = {
                name : '高级查询',
                type : 'primary',
                icon : 'el-icon-s-promotion',
                disabled : false,
                click : function(){
                    that.show = ! that.show;
                }
            };
          var selectBtn = {
              name : '查询',
              type : 'primary',
              icon : 'el-icon-search',
              disabled : false,
              click : function(){
                 alert('嘿嘿嘿！！！'+this.search);
                 that.reqParam.search = this.search;
                 that.getTableData();
              }
            };
            if(this.pageParam.quailtySearch){               
                var btns = this.pageParam.btns;
                this.pageParam.btns = lodash.concat( quailtyBtn,selectBtn,btns );
            }
        },
        initData:function(){//初始化渲染数据
            this.reqParam = this.pageParam.tableParam.initData.param;
            this.url = this.pageParam.tableParam.initData.url;
            this.getTableData();
        },
        getTableData:function(){//获取表单数据
            if(true){this.virtueData();}
            this.post(this.url,this.reqParam)
                .then(res =>{
                    if(res.code == 200){
                            var data = res.data ;
                        if(this.pageParam.isPagination){ 
                            this.tableData = data; 
                        }else{
                            this.tableData = data;
                        }     
                        this.tableParam.tableData =          
                    }   
                }).catch(error => {
                    this.$notify(error.message);
                })
        },
        handleSizeChange : function(val) {//pageSize调整
            console.log(`每页 ${val} 条`);
            this.reqParam.pageSize = val;
            this.getTableData();
        },
        handleCurrentChange : function(val) {//currentPage调整
            console.log(`当前页: ${val}`);
             this.reqParam.pageNum = val;
             this.getTableData();
        },
        changeCondition:function(index,item){
            this.reqParam[item.prop] = item.value;
            this.getTableData();

        },
        virtueData : function(){
            var data = {
                    "total": 8, //总记录
                    "list": [{ //列表数据
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
                    "pageNum": 1,//当前页码
                    "pageSize": 3,//每页数量
                    "size": 3,//当页数量
                    "startRow": 1,//开始行数
                    "endRow": 3,//结束行数
                    "pages": 3,//总页数
                    "prePage": 0,//前一页页码
                    "nextPage": 2,//下一页页码
                    "isFirstPage": true,//是否首页
                    "isLastPage": false,//是否是最后一夜
                    "hasPreviousPage": false,//是否有上一页
                    "hasNextPage": true,//是否有下一页
                    "navigatePages": 8,
                    "navigatepageNums": [//页码列表
                        1,
                        2,
                        3
                    ],
                    "navigateFirstPage": 1,//第一页
                    "navigateLastPage": 3 //最后一页
                };

        }
    },


 }


</script>
<style scoped>



</style>














