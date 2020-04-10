<template>
<!-- 按钮设计表 -->
    <ComForm 
        :formDesign="btnForm.formDesign"
        :form.sync="btnForm.form" 
        :btns="btnForm.btns">
        <span style="padding:15px;border:1px solid #DCDFE6;margin:15px;">
            <label><strong>按钮样例:</strong></label>
            <Button :btn="btnForm.form" />
        </span>
    </ComForm>    
</template>
<script>


export default {
    props:{
       form:{
           required:true,
           type:Object,
       }
    },
    data:function(){
        return {
            btnForm : {},
            data : {}    
        }
    },
    watch:{
        form:{
            deep:true,
            immediate:true,
            handler:function(n,o){
                 if(JSON.stringify(n) != "{}"){
                    this.data = n ;
                 }else{
                     this.data = { 
                        id: (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1),
                        events:'{\n"click":function(){\n\n\n\n\t},\n"hover":function(){\n\n\n\n\t}\n}',
                    }
                }  
                this.initForm(); 
            }
        }
    },
    methods:{
        initForm : function(){
            var that = this;
            this.btnForm = {
                formDesign : {
                    disabled:false, 
                    inline:false, 
                    formItems : [
                        {
                            prop:'id',
                            label:'按钮ID',
                            type:'input',
                            disabled:true,
                            placeholder:'按钮ID',
                        },{
                            prop:'name',
                            label:'按钮名称:',
                            type:'input',
                            placeholder:'按钮名称',
                        },{
                            prop:'icon',
                            label:'按钮icon',
                            type:'select',
                            options:[
                            {label:'编辑',value:'el-icon-edit'},
                            {label:'分享',value:'el-icon-share'},
                            {label:'删除',value:'el-icon-delete'},
                            {label:'查找',value:'el-icon-search'},
                            {label:'设置',value:'el-icon-setting'},
                            {label:'省略号',value:'el-icon-more-outline'},
                            {label:'图片',value:'el-icon-picture-outline-round'},
                            {label:'播放',value:'el-icon-video-play'},
                            {label:'查看',value:'el-icon-view'},
                            ],
                        },{
                            prop:'type',
                            label:'按钮类型:',
                            type:'select',
                            options:[
                            {label:'重要',value:'primary'},
                            {label:'成功',value:'success'},
                            {label:'信息',value:'info'},
                            {label:'警告',value:'warning'},
                            {label:'危险',value:'danger'},
                            {label:'文本',value:'text'},
                            ]  
                        },{
                            prop:'style',
                            label:'按钮样式:',
                            type:'select',
                            multiple:true,
                            options:[
                            {label:'默认按钮',value:''},
                            {label:'朴素按钮',value:'plain'},
                            {label:'圆角按钮',value:'round'},
                            {label:'原型按钮',value:'circle'},
                            ]  
                        },{
                            prop:'events',
                            label:'按钮脚本:',
                            type:'textarea',
                            numbers:2000,
                        }
                    ],
                },
                form : that.data ,
                btns : [{
                        id : 'confirm',
                        name : '确定',
                        type : 'primary',
                        icon : 'el-icon-check',
                        labelWidth:'0.4',
                        disabled : false,
                        click : function(){
                            var form = that.btnForm.form ;
                            var flag = false ;
                            for(var i in form){
                                if( i == 'script' )continue;
                                flag = true;
                                break;
                            } 
                            if(flag){
                                form.isEdit = false;
                                var events = form.events ;  
                                if(events){
                                    var funcTest = (new Function('return '+events))() ;
                                    form.click = funcTest.click ? funcTest.click : null ;
                                    form.hover = funcTest.hover ? funcTest.hover : null ; 
                                }  
                                that.$emit('update:form',form);
                                that.$emit('callback',form);
                            }else{
                                that.$message({
                                    message: '请确定按钮是否配置！',
                                    type: 'error'
                                });
                            }
                        
                        }
                    }]
                };
              
            }
           
    },
    
}
</script>
<style scoped>

</style>






















