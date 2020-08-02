<template>
<ComForm  :formDesign="formDesign" ref="form"
          :form.sync="form"
          :btns="[]"  />


</template>
<script>
    export default {
        data(){
            return{
                key:'',
                id:'',
                form:{},
                formDesign:{},
            }
        },
        created(){
            this.key = this.$route.query.key;
            this.id = this.$route.query.id;
            this.initForm();
            this.initBtns();
        },
        methods:{
            initForm(){
                var that = this;
                this.formDesign = {
                    disabled: false,
                    labelWidth:'15%',
                    inline:false,
                    formItems: [
                        {
                            prop: 'type',
                            label: '假期类型',
                            type: 'select',
                            clearable:true,
                            options:[
                                {label:'年假',value:'annual_leave'},
                                {label:'事假',value:'leave_for_personal_affairs'},
                                {label:'调休',value:'take_workings_day_off'},
                            ],
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
                            form:[{
                                prop:'startDate',
                                label:'开始日期',
                                type:'dateTime',
                                format:'yyyy-MM-dd HH:mm',
                                rules: { required: true, message: '请选择假期开始时间', trigger: 'blur' },
                            },{
                                prop:'endDate',
                                label:'结束日期',
                                type:'dateTime',
                                format:'yyyy-MM-dd HH:mm',
                                rules: { required: true, message: '请选择假期开始时间', trigger: 'blur' },
                            },{
                                prop:'days',
                                label:'天数',
                                type:'input',

                            }],
                        },{
                            prop: 'bz',
                            label: '备注',
                            type: 'textarea',
                        }
                    ],
                }
                this.form = {
                    leaveDetail:[{
                        startDate:new Date(),
                        endDate:new Date()
                    }]
                }
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




            }


        }
    }
</script>
<style scoped>



</style>