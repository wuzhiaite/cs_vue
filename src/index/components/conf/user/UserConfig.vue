<template>
<div>
    <el-row style="height:30px;position:absolute;top:100px;z-index:999;">
        <el-col :span="24">
            <Buttons
                style="float:left;"
                :btns="btns"/>
        </el-col>
    </el-row>
    <el-row  :gutter="20" style="margin-top:40px;">
        <el-col :span="20" :offset="2">
            <el-card>
                <ComForm :formDesign="formDesign"
                         ref="form"
                         :form.sync="form"
                         :btns="[]">
                    <template #permissions>
                        <div class="permission-table" id="child-table">
                            <el-table
                                    :data="treeData"
                                    style="width: 100%;margin-bottom: 20px;"
                                    row-key="id"
                                    border
                                    size="mini"
                                    default-expand-all
                                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                                <el-table-column
                                        v-for="v in columns"
                                        :prop="v.prop"
                                        :label="v.label"
                                        :width="v.width / 100 * childTableWidth">
                                    <template  slot-scope="scope">
                                          <span style="margin-left: 10px" v-if=" v.type === 'normal' " >
                                                  {{scope.row[v.prop]}}
                                          </span>
                                          <span v-if="v.type==='switch' ">
                                              <el-switch
                                                    v-model="scope.row[v.prop]"
                                                    active-color="#13ce66"
                                                    inactive-color="#ff4949">
                                              </el-switch>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </template>
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
           tableParam:[],
           treeData:[],
           perSelect:[],
           childTableWidth:500,
       }
   },
    computed:{

    },
    created(){
       this.id = this.$route.params.id;
       //
       this.initData();
       this.initForm();
       this.initTable();
    },
    mounted(){
        this.childTableWidth = document.getElementById("child-table").offsetWidth;
    },
    methods:{
       initTable(){
         this.columns = [
             {
                 prop:"label",
                 label:"菜单",
                 width:"25",
                 type:"normal"
             },{
                 prop:"add",
                 label:"可新增",
                 width:"25",
                 type:"switch"
             },{
                 prop:"delete",
                 label:"可删除",
                 width:"25",
                 type:"switch"
             },{
                 prop:"edit",
                 label:"可编辑",
                 width:"25",
                 type:"switch"
             }
         ];
       },
       getTreeData(){
           this.perSelect = [
               {label:"删除",value:"delete"},
               {label:"新增",value:"add"},
               {label:"编辑",value:"edit"}
           ];
           var temp = {"userId":this.form.userId};
           this.$axios
               .post("/api/sys/menus/getPermissionList",temp)
               .then(res => {
                   if(res.status == 200 && res.data.code == 1){
                       var result = res.data.result ;
                       this.treeData = result;
                   }else{
                       this.$message({
                           type:"error",
                           message:'查询失败，请稍后重试！！！'
                       });
                   }
               });
        },
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
                      this.getTreeData();
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
                    },
                    {
                        prop:'roleIds',
                        label:'员工角色',
                        type:'checkbox-button',
                        url:'/api/role/getList'
                    },
                    {
                        prop:'permissions',
                        label:'页面权限',
                        type:'slot-form',
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
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.permission-table{
    border: 1px solid #ddd;
    padding:10px;
    border-radius:7px;
    overflow-x:auto;
}
</style>