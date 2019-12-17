<template>
    <!-- 全表样式设置 -->
    <el-table 
        :data="tableData"
        :border="tableParam.border?true:false"
        :script="tableParam.script?true:false"
        :highlight-current-row="tableParam.highlightCurrentRow?true:false"
        :default-sort="tableParam.defaultSort ?tableParam.defaultSort :{} "
        @sort-change="sortChange"
        style="width: 100%">
        <!-- 是否多选 -->
        <el-table-column v-if="tableParam.multi" type="selection"  width="55">
        </el-table-column>  
        <!-- 数据列遍历 -->
        <el-table-column v-for="(item,index) in tableParam.columns"
            :fixed="item.fixed?item.fixed:false"
            :prop="item.prop?item.prop:''"
            :label="item.label?item.label:''"
            :width="item.width?item.width:100" 
            :sortable="item.sortable ? item.sortable:'custom'"> 
            <template slot-scope="scope" >   
                <!-- 普通数据渲染 -->
                 <span v-if="item.prop" style="margin-left: 10px"> {{scope.row[item.prop]}}</span>   
                 <!-- 按钮操作渲染 -->
                 <el-button type="" v-if="item.opers.length>0"
                       size="mini"
                        v-for="(oper,index)  in item.opers" @click="oper.click(scope.row)" >
                   {{ oper.name }}
                   </el-button>  
                   
            </template>
        </el-table-column>
        <!-- 具体行操作 -->
         <!-- <el-table-column v-for="(item,index) in tableParam.columnOper"
            :fixed="item.fixed?item.fixed:false"
            :prop="item.prop"
            :label="item.label"
            :width="item.width" > 
            <template slot-scope="scope" >
                <el-button type="text" v-for="(oper,index)  in item.opers" @click="oper.click(scope.row)" size="small">
                   {{ oper.name }}
                </el-button>
            </template>
        </el-table-column> -->
    </el-table> 
</template>
<script>


 export default {
    props:{
         tableParam:{
             type:Object,
             default:{}
         }   
    },
    data(){
        return {
            tableData:[],
        }
    },
    created:function(){
        this.initTableData();
    },
    methods:{
        initTableData:function(){//初始化展示列表的数据
            if(this.tableParam.tableData){
                this.tableData = this.tableParam.tableData;
            }else{
                var param = this.tableParam.initData    
                if(param){
                    //如果有请求参数，则发送请求后台数据
                }else{
                    this.tableParam = [];
                }
            }
        },
        sortChange:function(row){//监听排序事件
            console.log(row);
            
        }
    }
 }


</script>






























