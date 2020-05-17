<template>
<!-- 嵌套的子列表 -->
<div  class="mian" v-show="isShow()">
    <el-row  inline=true v-for="(row,index) in getRows()" class="form-row" >
        <span v-for="(column,key) in row"  class="form-tab">
            <span style="width:20% !important;">{{ column.label }} : </span>
            <ComFormSpan class="inline-span" :item="column" :form="form[item.prop][index]" />
        </span> 
        <span style="vertical-align:middle;">
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
    components:{
        ComFormSpan,
    },
    methods:{
        getFormInfo:function(){
            var f = this.item.form ; 
            var temp = {} ;
            for(var i in  f){
                var prop = f[i].prop ;
                var type =  f[i].type ;
                if(type == 'select' || type == 'radio' || type == 'checkbox'
                            || type == 'checkbox-button' || type == 'radio-button'
                            || type == 'conditions' || type == 'btns' ){
                    temp[prop] = [] ;            
                }else if (type == 'switch'){
                    temp[prop] = false ;
                }else{
                    temp[prop] = '';
                }
            }
            return temp ;
        },
        addRow : function(index){
            var obj = this.getFormInfo();
            var length = this.form[this.item.prop].length ;
            if(!length || length == 0){
                this.form[this.item.prop] = [] ;
            } 
            this.form[this.item.prop].splice(index+1,0,obj);
            if( this.item.events && this.item.events.addRow ){
                this.item.events.addRow(index);
            } 
        },
        deleteRow : function(index){
            if(index == 0){
                this.form[this.item.prop] = [];
                var obj = this.getFormInfo();
                this.form[this.item.prop].push(obj);
                return ;
            };
            this.form[this.item.prop].splice(index,1);
            if( this.item.events && this.item.events.deleteRow ){
                this.item.events.deleteRow(index);
            } 
            
        },
        getRows : function(){
            var options = this.form[this.item.prop];
            var row = this.item.form ;
            var temp = [];   
            if(options  && options.length > 0){
                for(var i =0 ;i < options.length ; i++){
                    temp.push(row)
                }    
            }else{
                temp.push(row) ;
                this.addRow();
            }
            return temp;
        },
        isShow : function(){//是否展示
            if( this.item.events && this.item.events.isShow ){
                return this.item.events.isShow();
            } 
            return true;
        }

    }
    
}
</script>
<style scoped>
.mian{
    border:1px solid #DCDFE6;
    padding:5px;
    border-radius: 5px;
}
.inline-span{
    display:inline-block;
    width:25%;
}
.form-row{
   border:1px solid #DCDFE6;
   border-radius: 5px;
    padding:5px;
    width:100%;
}


</style>