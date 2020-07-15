<template>
<div>
  <el-tabs type="card"  >
    <el-tab-pane>
      <span slot="label"><i class="el-icon-finished"></i> 流程流转</span>
      <ComForm :form.sync="processFlow.form" :formDesign="processFlow.formDesign" />
      <Buttons :btns="processFlow.btns" />
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-refresh-left"></i> 流程退回</span>
      <ComForm :form.sync="sendBackFlow.form" :formDesign="sendBackFlow.formDesign" />
      <Buttons :btns="sendBackFlow.btns" />

    </el-tab-pane>
  </el-tabs>



</div>
</template>
<script>
export default {
   data(){
       return {
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
       }
   },
   created(){
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
                rules: { required: true, message: '请选择任务办理人类型', trigger: 'blur' },
              },
              {
                prop: 'approve',
                label: '处理结果:',
                type: 'radio',
                options:[
                        {label:"同意",value:"Yes"},
                        {label:"反对",value:"false"}],
                rules: { required: true, message: '请说明请假原因', trigger: 'blur' },
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
              style:"round",
              click: function () {



              }
          }

        ];
        this.sendBackFlow.btns = [
         {
           name: "流程退回",
           type: 'warning',
           icon: '',
           style:"round",
           click: function () {



           }
         }

       ];

     }

   }


}
</script>
<style scoped>




</style>



