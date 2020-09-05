<template>
<ComForm  :formDesign="startForm.formDesign" ref="leaveForm"
          :form.sync="startForm.form"
          :btns="[]"/>
</template>

<script>

import {getLeaveRequestFormData} from '@/api/index/workflow';

export default{
    data(){
        return {
            startForm:{
                form:{},
                formDesign:{},
            },
        }
    },
    props:{
        taskId:{
            required:false,
        },
        disabled:{
            required:true,
            default:false
        }
    },
    created(){
            if(this.taskId){
                this.getFormData();
            }
           console.log(this.disabled);
            this.initStartForm();
        },
    methods:{
            initStartForm(){
                let that = this;
                this.startForm = {
                    formDesign : {
                        disabled: that.disabled,
                        labelWidth:'15%',
                        inline:false,
                        formItems: [
                            {
                                prop: 'type',
                                label: '假期类型',
                                type: 'select',
                                clearable:true,
                                url:'/api/dict/getdict/leave_process_type',
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
            getFormData(){
                let params = {
                    ASSIGNEE_: "###user###",
                    search: this.taskId
                 }
                this.$axios.post('/api/pagelist/singleData/de4a',params)
                    .then(res=>{
                        if(res.status == 200 && res.data.code == 1){
                            let result = this.formatJSON(res.data.result);
                            this.startForm.form = result ;
                        }
                });
            }


        }
}

</script>
<style>


</style>