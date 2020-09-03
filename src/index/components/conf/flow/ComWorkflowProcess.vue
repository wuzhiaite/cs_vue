<template>
    <div class="workflow-main">
        <el-row class="workflow-history">
            <el-card>
                <el-col :span="24">
                    <el-steps :active="steps.length -1 "  align-center finish-status="success">
                        <el-step  v-for="s in steps"
                                 :title="s.activityName"/>
                    </el-steps>
                </el-col>
            </el-card>
        </el-row>
        <el-row class="workflow-contain">
            <el-col :span="16" >
                <el-card>
                    <LeaveRequestForm  :taskId="taskId"/>
                </el-card>
            </el-col>
            <el-col :span="7" :offset="1">
                <el-card>
                    <el-tabs type="card" size="mini" >
                        <el-tab-pane>
                            <span slot="label"><i class="el-icon-finished"></i> 流程流转</span>
                            <ComForm  ref="processForm" :form.sync="processFlow.form" :formDesign="processFlow.formDesign" />
                            <Buttons :btns="processFlow.btns" />
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label"><i class="el-icon-refresh-left"></i> 流程退回</span>
                            <ComForm ref="sendbackForm" :form.sync="sendBackFlow.form" :formDesign="sendBackFlow.formDesign" />
                            <Buttons :btns="sendBackFlow.btns" />

                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>

import LeaveRequestForm from './form/LeaveRequestForm';

export default {
    data(){
        return{
            taskId:'',
            instId:'',
            form:{},
            formDesign:{},
            processFlow:{
                form:{},
                formDesign:{},
                btns:[]
            },
            sendBackFlow:{
                form:{},
                formDesign:{},
                btns:[]
            },
            steps:[],
        }
    },
    components:{
      LeaveRequestForm,
    },
    created(){
        this.taskId = this.$route.params.id ;
        this.instId = this.$route.params.instId ;
        this.getSteps();
        this.initForm();
        this.initBtns();
    },
    methods:{
        initForm(){
            var that = this;
            this.processFlow = {
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
                        {
                            prop: 'approve',
                            label: '处理结果:',
                            type: 'radio',
                            options:[
                                {label:"同意",value:"true"},
                                {label:"反对",value:"false"}],
                            rules: { required: true, message: '是否同意', trigger: 'change' },
                        },{
                            prop:'reason',
                            label:'处理建议',
                            type:'textarea',
                            rules: { required: true, message: '处理意见', trigger: 'change' },
                        }
                    ]
                },
                form:{

                }
            }
            this.sendBackFlow = {
                formDesign:{
                    disabled: false,
                    labelWidth:'20%',
                    inline:false,
                    formItems: [
                        {
                            prop: 'node',
                            label: '返回的节点:',
                            type: 'input',
                            rules: { required: true, message: '请选择任务办理人类型', trigger: 'blur' },
                        },{
                            prop:'reason',
                            label:'处理建议',
                            type:'textarea',
                        }
                    ]
                },
                form:{

                }
            }

        },
        initBtns(){
            var that = this;
            this.processFlow.btns = [
                {
                    name: "流程流转",
                    type: 'success',
                    icon: '',
                    style:"",
                    click: function () {
                        that.doProcesse();


                    }
                }

            ];
            this.sendBackFlow.btns = [
                {
                    name: "流程退回",
                    type: 'warning',
                    icon: '',
                    style:"",
                    click: function () {



                    }
                }

            ];
        },
        doProcesse(){
            let validate = this.$refs.form.validateForm() ;
            if(!validate) return ;
            console.log(validate);
            let process =  this.$refs.processForm.validateForm();
            let back = this.$refs.sendbackForm.validateForm();
            if(!(process || back))return ;
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




        },
        getSteps(){
            this.$axios.post('/api/activiti/historic/historysteps/'+this.instId)
                .then(res=>{
                    if(res.status == 200 && res.data.code == 1){
                        this.steps = res.data.result;
                    }
                });
        }


    }
}
</script>
<style scoped>
    .workflow-main{
        width:100%;
        height:100%;
    }
    .workflow-history{
        margin-bottom:15px;
    }


</style>



