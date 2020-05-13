<template>
<div>
    <el-row>
      <Buttons style="float:left;" :btns="btns" />
    </el-row>
    <ComForm :formDesign="formDesign" 
            :form.sync="form"
            :btns="[]"></ComForm>
</div>            
</template>
<script>
 

export default {
    data(){
      return {
        formDesign:{},
        btns:[],
      }
    },
    props:{
        form:{
          type:Object,
          default:{},
          required:false,
        },
        disabled:{
          type:Boolean,
          required:true,
        }
    },
    created:function(){
        this.initForm();
        this.initBtns();
    },
    watch:{
        disabled:function(n,o){
            this.initForm();
            this.initBtns();
        },
        form:{
          deep:true,
          immediate:true,
          handler(n,o){
            console.log(n);
            n.label = n.name ;
            this.$emit("update:form",n);
          }
        }
    },
    methods:{
       initBtns : function(){
          var that = this ;
          this.btns = [
            {
              name:'保存',
              disabled: that.disabled,
              type:'primary',
              click:function(){
                that.doSave();
              }
            },
            {
              name:'编辑',
              type:'primary',
              click:function(){
                that.disabled = false ;
              }
            }
          ];  
       },
       doSave : function(){
          var temp = this.form ; 
          delete temp.label ; 
          this.$axios.post("/api/sys/menus/addOrUpdatePage",temp)
            .then(res=>{
                if(res.status == 200 && res.data.code == 1){
                    this.$message({
                          message: '保存成功' ,
                          type : 'success'
                      });  
                  }else{
                      this.$message({
                        message:res.data.message ,
                        type : 'error'
                    });
                  }
            });
       },
       initForm : function(){
          this.formDesign = {
              disabled : this.disabled,  
              rules : {
                    name : [
                        { required:true , message:'必须填写' , trigger:'blur' },
                        { min:3 , max:10 , message:'长度再3-10个字以内' , trigger:'blur' },
                    ],
                    path : [
                        { required:true,message:'必须填写',trigger:'change' },
                    ],
                    realPath : [
                        { required:true,message:'必须填写',trigger:'change' },
                    ],
              },
              formItems : [
                        {
                            prop:'id',
                            label:'id',
                            type:'input',
                            disabled:true,
                        },
                        {
                            prop:'name',
                            label:'姓名',
                            type:'input',
                        },{
                            prop:'path',
                            label:'url路径',
                            type:'input',
                        },{
                            prop:'iconCls',
                            label:'菜单标识',
                            type:'input',
                        },{
                            prop:'realPath',
                            label:'真实路径',
                            type:'input',
                        },{
                            prop:'hidden',
                            label:'是否展示',
                            type:'switch',
                            active:'yes',
                            inactive:'no',
                        },{
                            prop:'isvalidate',
                            label:'是否有效',
                            type:'switch',
                            active:'yes',
                            inactive:'no',
                        },{
                            prop:'iskeepalive',
                            label:'是否缓存页面',
                            type:'switch',
                            active:'yes',
                            inactive:'no',
                        }
                    ],
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





























