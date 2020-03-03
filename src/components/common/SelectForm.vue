<template>
<div  style="border:1px solid #DCDFE6;padding:5px;border-radius: 5px;"  
                    v-show="item.events.isShow ? item.events.isShow() : true">
    <el-row v-for="(row,index) in getRows()" >
        <span v-for="(columns,key) in row" style="margin-left:10px;" >
            <template v-for="(k,v) in columns" >
                <label> {{v}}:</label>
                <ComFormSpan  :item="k"></ComFormSpan>
                <el-input 
                    style="width:25%;"
                    size="mini"
                    v-model="form[item.prop][index][k]"></el-input>   
            </template>
        </span> 
        <span style="margin-left:20px;">
            <el-button type="primary" size="mini" >
                <span @click="addRow" >新增</span> |
                <span @click="deleteRow"> 删除  </span>
            </el-button>
        </span>
    </el-row>
</div> 
</template>
<script>
import ComFormSpan from './ComFormSpan';

export default {
    data:function(){
        return {
            row:{},
        }
    },
    props:{
        item:{
            required:true,
            type:Object
        },
        form:{
            required:true,
            type:Object,
        }
    },
    methods:{
        addColumn : function(){
            if(item.events && item.events.addRow ){
                item.events.addRow();
            } 
        },
        deleteColumn : function(index){
           
             if(item.events && item.events.deleteRow ){
                item.events.deleteRow();
            } 
            
        },
        rowInfo:function(){
            var tempRow = item.row;
            for(var i in tempRow){
                row[tempRow[i].prop] = '';
            }


        },
        getRows : function(){
             var options = form[item.prop];
             var row = [{'标签名':'label'},
                                {'对应值':'value'},];
                    var temp = [];   
                    if(options.length > 0){
                        for(var i =0 ;i < options.length ; i++){
                            temp.push(row)
                        }    
                    }else{
                        temp.push(row)
                    }
                    return temp;



        }
    }
    
}
</script>
<style scoped>



</style>