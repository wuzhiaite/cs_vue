<template>
    <!-- 全表样式设置 -->
    <el-table 
        :data="tableData"
        :size="tableParam.size ? tableParam.size : 'mini'"
        :border="tableParam.border ? true:false"
        :script="tableParam.script ? true:false"
        :highlight-current-row="tableParam.highlightCurrentRow ? true:false"
        :default-sort="tableParam.defaultSort ?tableParam.defaultSort :{} "
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
        :height="tableParam.height ? tableParam.height : height*0.6"
        :max-height="tableParam.maxHeight ? tableParam.maxHeight : 1000 "
        @row-click="rowClick"
        style="width: 100%;height:100px;">
        <!-- 是否多选 -->
        <el-table-column v-if="tableParam.multi ? tableParam.multi : false" type="selection"  width="55"></el-table-column>  
        <!-- 数据列遍历 -->
        <el-table-column v-for="(item,index) in tableParam.columns"
            :fixed="item.fixedDirect?item.fixedDirect:false"
            :prop="item.prop?item.prop:''"
            :label="item.label?item.label:''"
            :width="item.width?item.width/100*width:0.25*width" 
            :sortable="item.sortable ? item.sortable : false"
            :filters="item.filters ? item.filters : null"
            :filter-method="item.filters ? item.filterTag : null "
            :formatter="item.formatter ? item.formatter : null"> 
            <template slot-scope="scope" v-if="item.isShow ? item.isShow : true ">   
                <!-- 普通数据渲染 -->
                 <i v-if="item.icon" :class="item.icon"></i>
                 <span v-if="item.prop&&!item.types" style="margin-left: 10px"> {{scope.row[item.prop]}}</span>   
                 <!-- 按钮操作渲染 -->
                 <el-button  v-if="item.opers.length>0"
                       size="mini" :type="oper.type?oper.type:''"
                       :icon="oper.icon ? oper.icon:''"
                       v-for="(oper,index)  in item.opers" @click="oper.click(scope.row)" >
                       {{ oper.name }}
                 </el-button>  
                 <!-- 标签过滤 -->
                 <el-tag  v-if="item.types"
                    size="mini"
                   :type="item.types[scope.row[item.prop]]"
                    close-transition>
                    {{scope.row[item.prop]}}
                 </el-tag>   
            </template>
        </el-table-column>
    </el-table> 
    
</template>
<script>
import {mapGetters} from 'vuex';

 export default {
    props:{
         tableParam:{
             type:Object,
             default:{}
         },
         tableData:{
             type:Array,
             default:[],
         },
         callbackParam:{
             multipleSelection:[],
         }   
    },
    computed:{
        ...mapGetters({height:'getScreenHeight',width:'getScreenWidth'}),
    },
    methods:{
        sortChange:function(row){//监听排序事件
            console.log(row);       
        },
        handleSelectionChange(val) {
            this.callbackParam.multipleSelection = val ;
            this.$emti('callbackParam:update',this.callbackParam)
       },
       filterTag(value, row) {
            return row.tag === value;
       },
       rowClick:function(row, column, event){//行点击事件
           if(this.tableParam.events){
               var events = this.tableParam.events ;
               if( typeof events == 'string')
               this.tableParam.events= (new Function( 'return '+events ))();
               if(this.tableParam.events.rowClick){
                   this.tableParam.events.rowClick(row,column,event);
               }
           }
       }
    }
 }


</script>






























