<template>
<div>
    <el-row>
        <el-col :span="2">
            <Buttons
                style="position:absolute;float:left;"
                :btns="btns"/>
        </el-col>
    </el-row>
    <el-row  :gutter="20">
        <el-col :span="14" :offset="6">
            <el-card>
                <ComForm :formDesign="formDesign"
                         ref="form"
                         :form.sync="form"
                         :btns="[]">
                </ComForm>

            </el-card>
        </el-col>
    </el-row>
</div>
</template>
<script>

export default {
   data(){
       return {
           formDesign:{},
           btns:[],
           form:{},
           id:'',
       }
   },
    created(){
       this.id = this.$route.params.id;
       this.initData();
       this.initForm();
    },
    methods:{
       initData(){
           this.$axios.post("/api/user/getPermission/"+this.id)
               .then(res=>{
                   if(res.status == 200 && res.data.code == 1){
                      var result = res.data.result ;
                      var roleTemp = [];
                      if(result.roleInfo && result.roleInfo.length > 0){
                          for(var i in result.roleInfo){
                              var roleId = result.roleInfo[i].roleId;
                              roleTemp.push(roleId);
                          }
                      }
                      result.roleIds = roleTemp ;
                      if(result.departmentInfo){
                          result.departmentId = result.departmentInfo.departmentId;
                      }
                      this.form = result ;
                   }else{
                       this.$message({
                           message:res.data.message ,
                           type : 'error'
                       });
                   }
               });
       },
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
                ref:'userConfig',
                labelWidth:'15%',
                rules : {

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
                        disabled:true,
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
                        url:'/api/department/getList',
                        rules: { required: true, message: '请选择部门名称', trigger: 'blur' }
                    },{
                        prop:'roleIds',
                        label:'员工角色',
                        type:'checkbox-button',
                        url:'/api/role/getList'
                    }
                ],
            }
        },
        formateForm(){
            var temp = this.form ;
            var roleInfoList = [];
            var roleTemp = temp.roleIds ;
            for(var i in roleTemp){
                var obj = {
                    id:this.uuid(),
                    userId:temp.id,
                    roleId:roleTemp[i]
                }
                roleInfoList.push(obj);
            }
            var department = {
                id:this.uuid(),
                departmentId:temp.departmentId,
                userId:temp.id
            }

            this.form.roleInfo = roleInfoList ;
            this.form.departmentInfo = department ;

        },
        doSave(){
            var flag = this.$refs.form.validateForm();
            if(!flag)return;
            this.formateForm();
            this.$axios.post("/api/user/setUserPermission",this.form)
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