<template>
<div :style="{height: height+'px'}">
    <div  style="overflow-y:auto;height:80%;">
        <el-row>
            <ComForm :formDesign="dictForm"
                     :form.sync="form"
                     :btns="[]"></ComForm>
        </el-row>
    </div>
    <el-row :gutter="24">
        <Buttons :btns="btns" />
    </el-row>
</div>
</template>
<script>

export default {
    data(){
        return {
            dictForm:{},
            dictDetailForm:{},
            btns:[]
        }
    },
    props:{
        form:{
            type:Object,
            default:{},
            required:false,
        },
    },
    computed:{
       height(){
           return document.body.clientHeight;
       }
    },
    created:function(){
        this.initDictForm();
        if(!this.form.child){
            this.form.child=[];
        }
        this.initBtns();
    },
    watch:{
        "form.child":{
            deep:true,
            immediate:true,
            handler(n,o){
                // this.initDictForm();
            }
        }
    },
    methods:{
        initDictForm(){
            var that = this ;
            this.dictForm = {
                    disabled: false,
                    rules: {},
                    labelWidth:'10%',
                    inline:false,
                    formItems: [
                        {
                            prop: 'dictName',
                            label: '字典名称',
                            type: 'input',
                        },
                        {
                            prop: 'dictNameText',
                            label: '字典描述',
                            type: 'input',
                        },{
                            prop:'child',
                            label:'字段映射',
                            type:'child-form',
                            form:[{
                                        prop:'key',
                                        label:'标识',
                                        type:'input',
                                    },{
                                        prop:'value',
                                        label:'映射值',
                                        type:'input',
                                    },
                                     {
                                        prop:'bz',
                                        label:'备注',
                                        type:'input',
                                    }],
                            events:{}
                        },{
                            prop: 'bz',
                            label: '备注',
                            type: 'textarea',
                        }
                    ],
                }
        },
        initBtns : function(){
            var that = this ;
            this.btns = [
                {
                    name:'保存',
                    disabled: that.disabled,
                    type:'primary',
                    click:function(){
                        that.doSave();
                    }
                }
            ];
        },
        doSave : function(){
            var temp = this.form ;
            if(temp.child.length < 1){
                this.$message({
                    type:"warning",
                    message:"必须要又键值对"
                })
                return ;
            }
            var child = temp.child ;
            for (var i in child){
                child[i].id = child[i].id ? child[i].id : this.uuid();
                child[i].dictId = child[i].dictId ? child[i].dictId : this.form.id ;
            }
            this.$axios.post("/api/dict/addOrUpdatePage",temp)
                .then(res=>{
                    if(res.status == 200 && res.data.code == 1){
                        this.$message({
                            message: '保存成功' ,
                            type : 'success'
                        });
                    }else{
                        this.$message({
                            message:res.data.message ,
                            type : 'error'
                        });
                    }
                });
        },
        initDictDetailForm : function(){
            this.dictDetailForm = {
                disabled : false,
                rules : {
                    name : [
                        { required:true , message:'必须填写' , trigger:'blur' },
                        { min:3 , max:10 , message:'长度再3-10个字以内' , trigger:'blur' },
                    ],
                    path : [
                        { required:true,message:'必须填写',trigger:'change' },
                    ],
                    realPath : [
                        { required:true,message:'必须填写',trigger:'change' },
                    ],
                    isvalidate : [
                        { required:true,message:'必须填写',trigger:'change' },
                    ],
                },
                formItems : [
                    {
                        prop:'key',
                        label:'标识',
                        type:'input',
                    },{
                        prop:'value',
                        label:'映射值',
                        type:'input',
                    },{
                        prop:'bz',
                        label:'备注',
                        type:'ioc-select',
                    }
                ],
            }
        }

    }

}


</script>
<style scoped>
    .el-select{
        width:100%;
    }
    .el-form{
        border: 1px solid #ebebeb;
        border-radius: 3px;
        transition: .2s;
        padding:15px;
        box-shadow: 0px 0px 10px 5px #888888;
    }

</style>





























