<template>
    <el-row>
        <el-col :span="17" >
            <el-card style="height:100%;">
                <LeaveRequestForm ref="form"/>
            </el-card>
        </el-col>
        <el-col :span="6" :offset="1">
            <el-card>
                <ComForm :form="start.form" :formDesign="start.formDesign"/>
                <Buttons :btns="start.btns" />
            </el-card>
        </el-col>
    </el-row>

</template>

<script>
 import LeaveRequestForm from './form/LeaveRequestForm'
 export default{
     data(){
        return {
            key:'',
            id:'',
            start:{
                form:{},
                formDesign:{},
                btns:[]
            }
        }
     },
     components:{
         LeaveRequestForm,
     },
     created(){
         this.key = this.$route.query.key;
         this.id = this.$route.query.id;
         this.initForm();
     },
     methods:{
         initForm(){
             var that = this;
             this.start = {
                 formDesign:{
                     disabled: false,
                     labelWidth:'20%',
                     inline:false,
                     formItems: [
                         {
                             prop: 'assigne',
                             label: '办理人:',
                             type: 'input',
                             rules: { required: true, message: '请选择任务办理人类型', trigger: 'change' },
                         },
                     ]
                 },
                 form:{},
                 btns : [
                     {
                         name: "流程发起",
                         type: 'primary',
                         icon: '',
                         style:"",
                         click: function () {
                            this.startProcess();
                         }
                     }

                 ]
             }
         },
         startProcess(){
             let temp = {
                 process:{
                     KEY_:this.key,
                     taskId:this.id,
                 },
                 form:this.form,
                 assigne:this.processFlow.assigne
             };
             this.$axios
                 .post("/api/activiti/task/startprocess",tempArr)
                 .then(res => {
                     if(res.status == 200 && res.data.code == 1){
                         this.$message({
                             type:"success",
                             message:"流程发起成功！"
                         });
                     }else{
                         this.$message({
                             type:"error",
                             message:res.data.message
                         });
                     }
                 });


         }


     }




 }

</script>
<style>


</style>