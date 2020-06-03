<template>
<el-card class="box-card" >
    <el-row>
        <el-col :span="2">
            <Buttons
                style="position:absolute;float:left;"
                :btns="btns"/>
        </el-col>
    </el-row>
    <el-row  :gutter="20">
        <el-col :span="12" :offset="6">
            <el-card>
                <ComForm :formDesign="formDesign"
                         :form.sync="form"
                         :btns="[]"></ComForm>
            </el-card>
        </el-col>
    </el-row>
</el-card>
</template>
<script>
export default {
   data(){
       return {
           formDesign:{},
           btns:[],
           form:{},
       }
   },
    created(){
       this.form = this.$route.params.form ;
       this.initForm();
    },
    methods:{
        initForm(){
            var that = this ;
            this.btns = [
                {
                    name:'保存',
                    type:'primary',
                    icon: 'el-icon-edit',
                    click:function(){
                        that.doSave();
                    }
                },{
                    name:'返回',
                    type:'primary',
                    icon: 'el-icon-edit',
                    click:function(){
                        that.$router.back();
                    }
                }
            ];
            this.formDesign = {
                labelWidth:'15%',
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
                        prop:'isValidate',
                        label:'是否有效',
                        type:'switch',
                        active:'yes',
                        inactive:'no',
                    },{
                        prop:'departmentId',
                        label:'部门',
                        multiple:false,
                        type:'com-tree-select',
                        url:'/api/department/getList'
                    },{
                        prop:'roleId',
                        label:'员工角色',
                        type:'radio-button',
                        url:'/api/role/getList'
                    }
                ],
            }
        },
        doSave(){
            var temp = this.form ;
            delete temp.label ;
            this.$axios.post("/api/user/setUserPermission",temp)
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
        }
   }

}
</script>
<style scoped>
.el-row{
    margin:20px;
}

</style>