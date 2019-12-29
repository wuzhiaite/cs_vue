<template>
    <!-- 全表样式设置 -->
    <el-table 
        v-loading="loading"
        :data="tableData"
        :size="tableParam.size? tableParam.size:'mini'"
        :border="tableParam.border?true:false"
        :script="tableParam.script?true:false"
        :highlight-current-row="tableParam.highlightCurrentRow?true:false"
        :default-sort="tableParam.defaultSort ?tableParam.defaultSort :{} "
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
        :height="tableParam.height ? tableParam.height : 600+'px'"
        :max-height="tableParam.maxHeight"
        style="width: 100%;height:100px;">
        <!-- 是否多选 -->
        <el-table-column v-if="tableParam.multi" type="selection"  width="55"></el-table-column>  
        <!-- 数据列遍历 -->
        <el-table-column v-for="(item,index) in tableParam.columns"
            :fixed="item.fixed?item.fixed:false"
            :prop="item.prop?item.prop:''"
            :label="item.label?item.label:''"
            :width="item.width?item.width:80" 
            :sortable="item.sortable ? item.sortable:'custom'"> 
            <template slot-scope="scope" >   
                <!-- 普通数据渲染 -->
                 <i v-if="item.icon" :class="item.icon"></i>
                 <span v-if="item.prop" style="margin-left: 10px"> {{scope.row[item.prop]}}</span>   
                 <!-- 按钮操作渲染 -->
                 <el-button  v-if="item.opers.length>0"
                       size="mini" :type="oper.type?oper.type:''"
                       :icon="oper.icon ? oper.icon:''"
                       v-for="(oper,index)  in item.opers" @click="oper.click(scope.row)" >
                   {{ oper.name }}
                   </el-button>                  
            </template>
        </el-table-column>
    </el-table> 
    
</template>
<script>


 export default {
    props:{
         tableParam:{
             type:Object,
             default:{}
         },
         callbackParam:{
             multipleSelection:[],
         }   
    },
    data(){
        return {
            loading : true, 
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
            }
            this.loading = false;
        },
        sortChange:function(row){//监听排序事件
            console.log(row);
            
        },
        handleSelectionChange(val) {
            this.callbackParam.multipleSelection = val ;
            this.$emti('callbackParam:update',this.callbackParam)
       }
    }
 }


</script>






























