<template>
 <div>          
    <el-row>
        <el-input v-model="search" placeholder="请输入内容"
            size="small"
            prefix-icon="el-icon-search"
            style="width:100%;"></el-input>
    </el-row> 
    <Buttons :btns="pageParam.btns"></Buttons>    
    <TableList :tableParam="tableParam"></TableList>
    <el-pagination 
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
  
 


 export default {
    data(){
      return {
          show : false,
          
      }
    },
    props:{
        pageParam:{
            type:Object,
            default:{}
        }
    },
    components:{
      TableList,
      Buttons,
    },
    created(){
        this.addQualitySearch();//判断是否有高级查询需求
        
    },
    methods:{
        addQualitySearch:function(){//增加高级查询
         var that = this;
         var quailtyBtn = {
                name : '高级查询',
                type : 'primary',
                icon : 'el-icon-s-promotion',
                disabled : false,
                click : function(){
                    that.show = ! that.show;
                }
            },
            if(this.pageParam.quailtySearch){               
                var btns = this.pageParam.btns;
                this.pageParam.btns = lodash.concat( this.quailtyBtn , btns );
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },


 }


</script>
<style scoped>



</style>














