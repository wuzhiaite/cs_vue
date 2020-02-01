<template>
  <div style="width:100%;height:100%;">
     <ComForm :formDesign="formDesign" 
              :btns="btns"></ComForm>
  </div>
</template>
<script>
 

 export default {
    data(){
      return {
        formDesign:{},
        formItems:[],
        btns:[],
      }
    },
    props:{
        form:{
          type:Object,
          default:{}
        }
    },
    created:function(){
        this.initForm();
    },
    methods:{
       initForm : function(){
          this.formItems = [
              {
                prop:'search',
                label:'查询条件项',
                type:'select',
                multiple:true,
                default:['姓名（name）','地区（region）','邮政（zip）'],
                options:[
                  {label:'姓名（name）'},
                  {label:'地区（region）'},
                  {label:'邮政（zip）'}
                ]
              },{
                prop:'columns',
                label:'展示项目',
                type:'select',
                options:[
                  {label:'男',value:'boy'},
                  {label:'女',value:'girl'}
                ]
              },{
                prop:'sql',
                label:'查询SQL',
                type:'textarea',
                numbers:2000,
              }
          ];
         
          this.formDesign = {
              disabled:true,  
              formItems : this.formItems,
          }
       }
    }

 }


</script>
<style scoped>
.el-select{
  width:100%;
}
.el-form{
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .2s;
  padding:15px;
  box-shadow: 0px 0px 10px 5px #888888;
} 
    
</style>





























