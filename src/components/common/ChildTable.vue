<template>
<div class="block-box">
    <table>
        <thead>
            <th v-for="(v,k) in  item.form" > {{v.label}} </th>
            <th>操作</th>
        </thead>  
        <tbody > 
            <tr v-for="(row,index) in getRows()" >
                <td v-for="(column,key) in row">
                    <ComFormSpan :item="column" :form="form[item.prop][index]" />
                </td>
                <td class="btn-classs">
                    <el-tag size="mini" @click="addRow(index)">新增</el-tag>
                    <el-tag type="danger" size="mini" @click="deleteRow(index)">删除</el-tag>
                </td>
            </tr>
        </tbody>
    </table>  
</div>      
</template>
<script>
import ComFormSpan from './ComFormSpan'

export default {
    props:{
        item:{
            required:true,
            type:Object,
        },
        form:{
            required:true,
            type:Object,
        }
    },
    data:function(){
        return {
            tableForm:{}
        }
    },
    watch:{
        form:{
            deep:true,
            immediate:true,
            handler:function(n,o){
                this.$emit('update:form',n);    
            }
        }
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
                    temp[prop] = '' ;
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
            // this.form[this.item.prop].push(obj);
            if( this.item.events && this.item.events.addRow ){
                this.item.events.addRow();
            } 
        },
        deleteRow : function(index){
            console.log(index);
            if(index == 0 && this.form[this.item.prop].length == 1){
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

table{
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
  
 
 }
table td, table th{
  color: #666;
  height: 30px;
  padding:0px;
  border: 1px solid #eaeaea;
  border-radius: 10px;
}
table thead th{
  width: 100px;
  text-align:left;
}
.el-table{
  overflow-x:auto;
  overflow-y:auto;
}
.el-input{
    margin:0px;
}
.el-select{
    margin:0px;
}
.btn-class{
    margin-left:20px;
    vertical-align:middle;
    cursor:pointer;
    float:left;
    text-align:left;
}
.el-tag{
    cursor:pointer;
    float:left;
}
</style>