<template>
 <div style="width:100%;margin:10px;">
     <!-- 搜索框 -->
    <el-row v-if="!(typeof pageParam.canSearch == 'undefined')? pageParam.canSearch : true">      
        <el-input v-model="search" 
            :placeholder=" pageParam.searchParam && pageParam.searchParam.placeholder 
                                ? pageParam.searchParam.placeholder 
                                : '请输入内容' "
            :clearable=" pageParam.searchParam && pageParam.searchParam.clearable 
                                ? pageParam.searchParam.clearable : true"
            size="mini"
            :maxlength="pageParam.searchParam && pageParam.searchParam.maxlength
                                    ? pageParam.searchParam.maxlength : 1000"
            :prefix-icon="pageParam.searchParam && pageParam.searchParam.icon 
                                    ? pageParam.searchParam.icon : 'el-icon-search'"
            style="width:40%;margin-right:15px;"></el-input>  
        <!-- 搜索框点击事件 -->
        <Buttons  :btns="pageParam.btns" :callbackParam.sync="callbackParam"></Buttons> 
    </el-row> 
     <!-- 条件项 -->
     <div >
        <Conditions
                class="page-condition"
                v-if="pageParam.conditions" 
                :conditions.sync="pageParam.conditions" 
                @changeCondition="changeCondition" 
                :show="show"></Conditions> 
     </div>  
     
     <!-- 列表页面 -->
    <div v-loading="flag">
        <TableList 
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
          tableData:[],
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
    watch:{
        pageParam:{
            deep:true,
            immediate:true,
            handler(n,o){
                if(n != o){
                    this.addQualitySearch();
                    this.$nextTick();
                }  
            }
        },
        "pageParam.initData":function(){
            this.initData();
        }
    },
    created(){
        this.initData();//初始化数据
    },
    methods:{
        doSearch:function(){
            this.reqParam.entity.search = this.search;
            this.getTableData(); 
        },
        addQualitySearch:function(){//增加高级查询,和普通查询
          var that = this;
          var selectBtn = {
              name : '查询',
              type : 'primary',
              icon : 'el-icon-search',
              size: 'mini',
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
            var param = this.pageParam.initData.params ;
            if(! param) param ={};
            var flag = this.isJSON(param);
            if(flag){
                this.reqParam = JSON.parse(param) ;
            }else{
                this.reqParam = param ;
            }      
            this.url = this.pageParam.initData.url;
            this.getTableData();
        },
        getTableData:function(){//获取表单数据
            this.flag = true;
            this.$axios.post(this.url,this.reqParam)
                .then(result =>{
                    var res = result.data;
                    if(res.code == 1){
                        if(this.pageParam.isPagination){
                             this.pagination = res.result;
                             this.tableData = res.result.records;
                        }else{
                             this.tableData = res.result;     
                        }   
                        var events = this.pageParam.events ;
                        if( events ){
                            events = (typeof events == 'string')
                                         ? (new Function('return '+ events ))() : events ;
                            this.pageParam.events = events;
                            if(this.pageParam.events.initCallback){
                                 this.pageParam.events.initCallback(res);   
                            }
                        }  
                    }else{
                        this.$message({
                            message : res.message,
                            type: 'error',
                        });
                    } 
                    this.flag = false;  
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
            if(item.value){
                this.reqParam[item.prop] = item.value;
            }else{
                delete this.reqParam[item.prop] ;
            }
        }
    },


 }


</script>
<style scoped>
.el-row{
    margin:15px;
}
.page-condition{
    border : 1px solid #eaeaea;
    border-radius: 20px;
    margin:10px;
}
</style>














