<template>
 <div style="width:100%;">
     <!-- 搜索框 -->
     <el-row>      
        <el-input v-model="search" 
            :placeholder=" pageParam.searchParam && pageParam.searchParam.placeholder 
                                ? pageParam.searchParam.placeholder 
                                : '请输入内容' "
            :clearable=" pageParam.searchParam && pageParam.searchParam.clearable 
                                ? pageParam.searchParam.clearable : true"
            size="small"
            :maxlength="pageParam.searchParam && pageParam.searchParam.maxlength
                                    ? pageParam.searchParam.maxlength : 1000"
            :prefix-icon="pageParam.searchParam && pageParam.searchParam.icon 
                                    ? pageParam.searchParam.icon : 'el-icon-search'"
            style="width:40%;margin-right:15px;"></el-input>  
            <!-- 搜索框点击事件 -->
      <Buttons :btns="pageParam.btns" :callbackParam.sync="callbackParam"></Buttons> 
     </el-row> 
     <!-- 条件项 -->
     <div style="height:100%;background-color:#DCDFE6;">
        <Conditions v-if="pageParam.conditions" 
                :conditions.sync="pageParam.conditions" 
                @changeCondition="changeCondition" 
                :show="show"></Conditions> 
     </div>  
     <!-- 列表页面 -->
    <div v-loading="!flag">
        <TableList 
            v-if="flag"
            :tableParam="pageParam.tableParam" 
            :tableData="tableData"
            ></TableList>
    </div>    
    <!-- 分页组件 -->
    <el-pagination 
    style="float:right;"
        v-if=" pageParam.isPagination != null
                             ? pageParam.isPagination 
                             : true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
    </el-pagination>
   </div>     
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
          reqParam:{},
          callbackParam:{
              multipleSelection:[],
          } ,
          flag:false ,
          pagination:{},    
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
                tableParam:{},
            }
        }
    },
    components:{
      TableList,
      Buttons,
      Conditions,
    },
    created(){
        this.addQualitySearch();//判断是否有高级查询需求 
        this.initData();//初始化数据
    },
    methods:{
        doSearch:function(){
            this.reqParam.search = this.search;
            this.getTableData(); 
        },
        addQualitySearch:function(){//增加高级查询,和普通查询
          var that = this;
          var selectBtn = {
              name : '查询',
              type : 'primary',
              icon : 'el-icon-search',
              disabled : false,
              click : function(){
                 that.doSearch();   
              }
            };
            if(lodash.findIndex(this.pageParam.btns,{ name : '查询'}) == -1){
                 this.pageParam.btns = lodash.concat(selectBtn,this.pageParam.btns );
            }  
            if(this.pageParam.isQualitySearch){  
                 var quailtyBtn = {
                        name : '高级查询',
                        type : 'primary',
                        icon : 'el-icon-s-promotion',
                        disabled : false,
                        click : function(){
                            that.show = ! that.show;
                        }
                    };     
                if(lodash.findIndex(this.pageParam.btns,{ name : '高级查询'}) == -1){
                    this.pageParam.btns = lodash.concat(quailtyBtn,this.pageParam.btns );
                }     
            }
        },
        initData:function(){//初始化渲染数据
            this.reqParam = this.pageParam.initData.params;
            this.url = this.pageParam.initData.url;
            this.getTableData();
        },
        getTableData:function(){//获取表单数据
            this.post(this.url,this.reqParam)
                .then(res =>{
                    if(res.code == 1){
                        if(this.pageParam.isPagination){
                             this.pagination =   res.result;
                             this.tableData = res.result.list; 
                        }else{
                             this.tableData = res.result;     
                        }
                        this.flag = true;   
                        if(this.pageParam.events.initCallback){
                            this.pageParam.events.initCallback(res);
                        }  
                          
                    }   
                });    
        },
        handleSizeChange : function(val) {//pageSize调整
            this.reqParam.pageSize = val;
            this.getTableData();
        },
        handleCurrentChange : function(val) {//currentPage调整
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
.el-row{
    margin:15px;
}
</style>














