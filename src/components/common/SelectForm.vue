<template>
<div  style="border:1px solid #DCDFE6;padding:5px;border-radius: 5px;"  
                    v-show="isShow()">
    <el-row v-for="(row,index) in getRows()" >
        <span v-for="(columns,key) in row" style="margin-left:10px;" >
            <template v-for="(k,v) in columns" >
                {{k}}
                <label> {{v}}:</label>
                <ComFormSpan  :item="columns" :form="form[item.prop][index]" ></ComFormSpan>
                <!-- <el-input 
                    style="width:25%;"
                    size="mini"
                    v-model="form[item.prop][index][k]"></el-input>    -->
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
                }else{
                    temp[prop] = '' ;
                }
            }
            return temp ;
        },
        addRow : function(){
            var obj = this.getFormInfo();
            this.form.push(obj) ;
            if( this.item.events && this.item.events.addRow ){
                this.item.events.addRow();
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
                this.item.events.deleteRow();
            } 
            
        },
        getRows : function(){
            var options = this.form[this.item.prop];
            var row = this.item.row ;
            var temp = [];   
            if(options.length > 0){
                for(var i =0 ;i < options.length ; i++){
                    temp.push(row)
                }    
            }else{
                temp.push(row)
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



</style>