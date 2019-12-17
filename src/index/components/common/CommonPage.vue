<template>
 <div>          
    <el-row>
        <el-input v-model="search" placeholder="请输入内容"
        size="small"
        prefix-icon="el-icon-search"
        style="width:100%;"></el-input>
    </el-row> 
    <Buttons :btns="btns"></Buttons>  
    <div>     
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
      return {}
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




        }
    }


 }


</script>
<style scoped>



</style>














