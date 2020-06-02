<template>
    <ComForm :formDesign="formDesign"
             :form.sync="form"
             :btns="[]"></ComForm>
</template>
<script>
export default {
   name:"userConfig",
   data(){
       return {
           formDesign:{},
           btns:[],
       }
   },
    props:{
        form:{
            type:Object,
            default:{},
            required:false,
        },
    },
    created(){
       this.initForm();
    },
    methods:{
        initForm(){
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
            this.formDesign = {
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
                        prop:'id',
                        label:'id',
                        type:'input',
                        disabled:true,
                    },{
                        prop:'userId',
                        label:'用户ID',
                        type:'input',
                        disabled:true,
                    },
                    {
                        prop:'username',
                        label:'用户名称',
                        type:'input',
                    },{
                        prop:'role',
                        label:'角色',
                        type:'input',
                    },{
                        prop:'departmentId',
                        label:'部门',
                        type:'ioc-select',
                    },{
                        prop:'realPath',
                        label:'真实路径',
                        type:'input',
                    },{
                        prop:'hidden',
                        label:'是否展示',
                        type:'switch',
                        active:'yes',
                        inactive:'no',
                    },{
                        prop:'isvalidate',
                        label:'是否有效',
                        type:'switch',
                        active:'yes',
                        inactive:'no',
                    },{
                        prop:'iskeepalive',
                        label:'是否缓存页面',
                        type:'switch',
                        active:'yes',
                        inactive:'no',
                    }
                ],
            }
        }





   }

}
</script>
<style>


</style>