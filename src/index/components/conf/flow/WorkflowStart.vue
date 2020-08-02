<template>
<div class="workflow-main">
  <el-row class="workflow-history">
    <el-card>
      <el-col :span="24">
        <el-steps :active="4" align-center >
          <el-step :title="s.name" :description="s.description" v-for="s in steps"></el-step>
        </el-steps>
      </el-col>
    </el-card>
  </el-row>
  <el-row class="workflow-contain">
    <el-col :span="16" >
      <el-card>
        <ComForm  :formDesign="formDesign" ref="form"
                  :form.sync="form"
                  :btns="[]"  />
      </el-card>
    </el-col>
    <el-col :span="7" :offset="1">
        <el-card>
          <WorkflowStep ></WorkflowStep>
        </el-card>
    </el-col>
  </el-row>
</div>
</template>
<script>

import WorkflowStep from './form/WorkflowStep'


export default {
  data(){
      return{
         key:'',
         id:'',
         form:{},
         formDesign:{},
         steps:[
           {
             name:"开始"
           }
         ],
      }
  },
  components:{
    WorkflowStep,
  },
  created(){
      this.key = this.$route.query.key;
      this.id = this.$route.query.id;
      this.initForm();
  },
  methods:{
    initForm(){
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



