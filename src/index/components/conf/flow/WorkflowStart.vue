<template>
    <el-row>
        <el-col :span="17" >
            <el-card >
                <ComForm  :formDesign="startForm.formDesign" ref="startForm"
                          :form.sync="startForm.form"
                          :btns="[]"/>
            </el-card>
        </el-col>
        <el-col :span="6" :offset="1">
            <el-card>
                <ComForm ref="form"
                        :form="start.form"
                         :formDesign="start.formDesign"
                         />
                <Buttons :btns="start.btns" />
            </el-card>
        </el-col>
    </el-row>

</template>

<script>


 export default{
     data(){
        return {
            key:'',
            id:'',
            start:{
                form:{},
                formDesign:{},
                btns:[]
            },
            startForm:{
                form:{},
                formDesign:{},
            },
        }
     },
     created(){
         this.key = this.$route.query.key;
         this.id = this.$route.query.id;
         this.initForm();
         this.initStartForm();
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
                            that.startProcess();
                         }
                     }

                 ]
             }
         },
         initStartForm(){
             var that = this;
             this.startForm = {
                 formDesign : {
                     disabled: false,
                     labelWidth:'15%',
                     inline:false,
                     formItems: [
                         {
                             prop: 'type',
                             label: '假期类型',
                             type: 'select',
                             clearable:true,
                             url:'/api/dict/getdict/leave_process_type',
                             // options:[
                             //     {label:'年假',value:'annual_leave'},
                             //     {label:'事假',value:'leave_for_personal_affairs'},
                             //     {label:'调休',value:'take_workings_day_off'},
                             // ],
                             rules: { required: true, message: '请选择假期类型', trigger: 'change' },
                         },
                         {
                             prop: 'leaveReson',
                             label: '请假原因',
                             type: 'textarea',
                             rules: { required: true, message: '请说明请假原因', trigger: 'change' },
                         },{
                             prop:'leaveDetail',
                             label:'请假明细',
                             type:'child-form',
                             rules: { required: true, message: '请选择假期类型', trigger: 'change' },
                             form:[{
                                 prop:'startDate',
                                 label:'开始日期',
                                 type:'dateTime',
                                 format:'yyyy-MM-dd HH:mm',
                                 required:true,
                                 rules: { required: true, message: '请选择假期开始时间', trigger: 'blur' },
                             },{
                                 prop:'endDate',
                                 label:'结束日期',
                                 type:'dateTime',
                                 format:'yyyy-MM-dd HH:mm',
                                 required:true,
                                 rules: { required: true, message: '请选择假期开始时间', trigger: 'blur' },
                             },{
                                 prop:'days',
                                 label:'天数',
                                 type:'input',
                                 required:true,
                             }],
                         },{
                             prop: 'bz',
                             label: '备注',
                             type: 'textarea',
                         }
                     ],
                 },
                 form : {
                     leaveDetail:[{
                         startDate:new Date(),
                         endDate:new Date()
                     }]
                 }
             }
         },
         startProcess(){
             let validate = this.$refs.startForm.validateForm();
             if(!validate)return;
             validate = this.$refs.form.validateForm();
             if(!validate)return;
             let tempForm = JSON.parse(JSON.stringify(this.startForm.form ));//深度拷贝一下数据
             tempForm.leaveDetail = JSON.stringify(tempForm.leaveDetail);
             let temp = {
                 process:{
                     KEY_:this.key,
                     taskId:this.id,
                 },
                 form:tempForm,
                 assigne:this.start.form.assigne
             };
             this.$axios
                 .post("/api/activiti/task/startprocess",temp)
                 .then(res => {
                     if(res.status == 200 && res.data.code == 1){
                         this.$message({
                             type:"success",
                             message:"流程发起成功！"
                         });
                         this.$router.push({path:'/processlist'});
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