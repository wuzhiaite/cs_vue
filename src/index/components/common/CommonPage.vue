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
    <TableList :tableParam="tableParam"></TableList>
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
          tableData:[],
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
                url:''

            }
        }
    },
    components:{
      TableList,
      Buttons,
      Conditions,
    },
    created(){
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
            this.post(this.url,this.reqParam)
                    .then(res =>{
                        if(res.code == 200){
                             var data = res.data ;
                            if(this.pageParam.isPagination){
                               this.tableData = data.listData; 
                            }else{
                                this.tableData = data;
                            }              
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

        }
    },


 }


</script>
<style scoped>



</style>














