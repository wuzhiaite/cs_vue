<template>
<div>
    <span  style="float:left;">
        <template v-for="(btn,index) in (form[item.prop] ? form[item.prop] : null)" >
            <span  @mouseover="hoverId = btn.id" 
                    @mouseout="hoverId = -1 " >
                <Button  
                    :btn="btn" style="margin-left:15px;" />
                <span v-show="btn.id == hoverId"  
                        style="opacity:0.6;font-size:7px;cursor:pointer;margin-left:5px;">
                    <span @click="editBtn(index)">编辑</span>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <span @click="deleteBtn(index)">删除</span>
                </span>
            </span>
        </template>
        <el-button type="primary" 
            size="mini"
            style="margin-left:15px;"
            icon="el-icon-plus" 
            @click="editBtn(-1)" plain circle></el-button>     
    </span>
    <!-- 按钮配置页面 -->
    <ComDialog 
        :dialog="dialog"
        :visable.sync="isBtnsPage">
        <BtnDesignForm  
                :form.sync="btnForm" 
                @callback="btnConfirm" />
    </ComDialog>
</div>
</template>
<script>

import BtnDesignForm from './BtnDesignForm';

export default {
    props:['item','form'],
    data:function(){
        return{
            hoverId:-1,
            btnForm : {},
            isBtnsPage : false,
            dialog : {
              width:'40%',
              titleSlot:'<strong>新增按钮</strong>',
            }
        }
    },
    components:{
        BtnDesignForm,//按钮表单
    },
    methods:{
        editBtn(index){//编辑按钮
            var that = this ; 
            if(index != -1){
                var form = this.form[this.item.prop][index];
                form.isEdit = true ;
                that.btnForm = form;
            }else{
                that.btnForm = {};
            }
            this.isBtnsPage = true ;
            if(this.item.events && this.item.events.editBtn(index)){
                item.events.editBtn(index);
            }
        },
        deleteBtn(index){//删除按钮
            this.form[this.item.prop].splice(index,1);
            if(this.item.events && this.item.events.deleteBtn(index)){
                item.events.deleteBtn(index);
            }
        },
        btnConfirm : function(form){//按钮确定
            var that = this;
            if(JSON.stringify(form) == "{}")return;//为空返回
            var items = that.form[that.item.prop];
            var isModify = false ;
             if(!items){
               items = [] ;
            }else{
                for(var i in items){
                    if(items[i].id == form.id){
                        isModify = true;
                        items[i] = form;
                    }
                }
            }
            that.form[that.item.prop] = items ;
            if(!isModify){
                that.form[that.item.prop].push(form) ;
            } 
            that.isBtnsPage = false ;
        },
    }

}
</script>
<style scoped>

</style>