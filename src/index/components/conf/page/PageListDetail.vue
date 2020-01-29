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
        this.initBtns();
    },
    methods:{
       initBtns : function(){
          this.btns = [
            {
              name:'新增',
              type:'primary',
              click:function(){
                alert('新增');
              }
            },{
              name:'取消',
              type:'',
              click:function(){
                alert('取消');
              }
            }
          ];  
       },
       initForm : function(){
          this.formItems = [
              {
                prop:'name',
                label:'姓名',
                type:'input',
              },{
                prop:'gender',
                label:'性别',
                type:'select',
                options:[
                  {label:'男',value:'boy'},
                  {label:'女',value:'girl'}
                ]
              },{
                prop:'isGraduate',
                label:'是否已毕业',
                type:'switch',
                active:'是',
                inactive:'否',
              },{
                prop:'educateLevel',
                label:'学历水平',
                type:'radio',
                options:[
                  {label:'大学',value:'highschool'},
                  {label:'高中',value:'middleschool'},
                  {label:'初中',value:'juniormiddleschool'},
                ],
              },{
                prop:'likes',
                label:'兴趣爱好',
                type:'checkbox',
                default:[],
                options:[
                  {label:'篮球',value:'basketball'},
                  {label:'乒乓球',value:'pinpangball'},
                  {label:'羽毛球',value:'yumaoball'},
                ]
              },{
                prop:'graduateTime',
                label:'毕业时间',
                type:'date',
                default:'',
              },{
                prop:'grad',
                label:'评分',
                type:'rate',
                default:'',
              },{
                prop:'selfjuge',
                label:'自我评价',
                type:'textarea',
                number:1000,
                default:'', 
              }
          ];
          var rules = {
                  name : [
                    { required:true , message:'必须填写' , trigger:'blur' },
                    { min:3 , max:10 , message:'长度再3-10个字以内' , trigger:'blur' },
                  ],
                  gender : [
                    { required:true,message:'必须填写',trigger:'change' },
                  ],
                  educateLevel : [
                    { required:true,message:'必须填写',trigger:'change' },
                  ],
              };
          this.formDesign = {
              disabled:false,  
              rules:rules,
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





























