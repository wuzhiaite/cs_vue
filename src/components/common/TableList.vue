<template>
    <!-- 全表样式设置 -->
    <el-table 
        :data="tableData"
        :size="tableParam.size ? tableParam.size : 'mini'"
        :border="tableParam.border ? true:false"
        :script="tableParam.script ? tableParam.script : true"
        :highlight-current-row="tableParam.highlightCurrentRow ? true:false"
        :default-sort="tableParam.defaultSort ?tableParam.defaultSort :{} "
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
        :height="tableParam.rate ? tableParam.rate * height : ( tableParam.height ? tableParam.height : height*0.6)"
        :max-height="tableParam.maxHeight ? tableParam.maxHeight : 5000 "
        @row-click="rowClick"
        style="width: 100%;height:100px;">
        
        <!-- 是否多选 -->
        <el-table-column v-if="tableParam.multi ? tableParam.multi : false" type="selection"  width="55"></el-table-column>  
        <!-- 数据列遍历 -->
        <el-table-column v-for="(item,index) in tableParam.columns"
            :type="item.expand ? item.expand : null "
            :fixed="item.fixedDirect?item.fixedDirect:false"
            :prop="item.prop?item.prop:''"
            :label="item.label?item.label:''"
            :width="item.width?item.width/100*width:0.25*width" 
            :sortable="item.sortable ? item.sortable : false"
            :filters="item.filters ? item.filters : null"
            :filter-method="item.filters ? item.filterTag : null "
            :formatter="item.formatter ? item.formatter : null">
            <template slot-scope="scope" v-if="(item.isShow ? item.isShow : true )">
                <!-- 普通数据渲染 -->
                 <i v-if="item.icon" :class="item.icon"></i>
                 <span v-if="item.prop&&!item.types" style="margin-left: 10px">
                    {{ item.formatter ? item.formatter(scope.row) : scope.row[item.prop] }}
                 </span>
                 <!-- 按钮操作渲染 -->
                 <el-button  v-if="item.opers.length>0"
                       size="mini" :type="oper.type?oper.type:''"
                       :icon="oper.icon ? oper.icon:''"
                       v-for="(oper,index)  in item.opers"
                       v-hasPermission="oper.hasPermission && oper.hasPermission.length > 0 ? oper.hasPermission : [] "
                       @click="oper.click(scope.row)" >

                       {{ oper.name }}
                 </el-button>  
                 <!-- 标签过滤 -->
                 <el-tag  v-if="item.types === 'tag'"
                    size="mini"
                   :type="item.types[scope.row[item.prop]]"
                    close-transition>
                    {{scope.row[item.prop]}}
                 </el-tag>
                <span v-if="item.types==='switch' ">
                      <el-switch
                              v-model="scope.row[v.prop]"
                              active-color="#13ce66"
                              inactive-color="#ff4949">
                      </el-switch>
                </span>
                <ComForm v-if="item.types== 'expand'"
                        :form="props" ></ComForm>
            </template>
        </el-table-column>
    </el-table> 
    
</template>
<script>
import {mapGetters} from 'vuex';
import ComForm from "./ComForm";

 export default {
     components: {ComForm},
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
             required:false
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
            this.$emit('callbackParam:update',this.callbackParam)
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






























