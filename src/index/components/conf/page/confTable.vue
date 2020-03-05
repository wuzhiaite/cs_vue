<template>
<div>
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item title="基本信息" name="baseinfo">
      <div>
        <ComForm 
            :formDesign="tableForm"
            :form.sync="form">
        </ComForm> 
      </div>  
    </el-collapse-item>
    <el-collapse-item title="反馈 Feedback" name="2">
      <div>
        <ComForm 
            :formDesign="tableForm"
            :form.sync="form">
        </ComForm> 
      </div>
    </el-collapse-item>
  </el-collapse>
</div>      
</template>
<script>


 export default {
    data(){
      return {
         tableForm:{},
         columnForm:{},
         form:{},
         btns:{},
         activeNames:[],
      }
    },
    props:{
      // tempArr:{
      //   default:[],
      //   required:false,
      //   type:Array,
      // }
    },
    created(){
       this.initForm();
       this.initBtn();
    }, 
    methods:{
         initTableForm : function(){
           this.tableForm = {
                      disabled :false,
                      inline :true,
                      labelWidth:'25%',
                      formItems :[{
                          prop:'border',
                          label:'是否有边框:',
                          type:'switch',
                          active:"true",
                          inactive:'false'
                        },{
                          prop:'multi',
                          label:'是否多选',
                          type:'switch',
                          active:"true",
                          inactive:'false'
                        },{
                          prop:'highlightCurrentRow',
                          label:'选中行高亮',
                          type:'switch',
                          active:"true",
                          inactive:'false'
                        },
                        // {
                        //   prop:'columns',
                        //     label:'展示列',
                        //     type:'select-form',
                        //     form:[
                        //         {'label':'列名称','prop':'colName','type':'input',disabled:true},
                        //         {'label':'宽度','prop':'value','type':'input'},
                        //         {'label':'是否固定',
                        //         'prop':'fixed',
                        //         'type':'select',
                        //         'options':[
                        //           {label:'无',value:''},
                        //           {label:'左',value:'left'},
                        //           {label:'右',value:'right'}
                        //         ]},{
                        //             'label':'是否排序',
                        //             'prop':'sortable',
                        //             'type':'switch',
                        //         },{
                        //           'label':'其他动作',
                        //           'prop':'opers',
                        //           'type':'btns',
                        //         }
                        //       ],
                        //       events:{
                        //         isShow:function(){
                        //           return true;
                        //         }
                        //       }
                        // }
                        ]}
            }
                 
         }

     }
           
  

    }

 }


</script>
<style scoped>



</style>





























