<template>
<div>
  <ComForm 
      :formDesign="tableForm.formDesign"
      :form.sync="tableForm.form" 
      :btns="tableForm.btns">
  </ComForm> 
  <div>

  </div>
</div>        
</template>
<script>


 export default {
    data(){
      return {
         tableForm:{}
      }
    },
    props:{
      tempArr:{
        default:[],
        required:false,
        type:Object,
      }
    },
    created(){
       this.initForm();
    }, 
    methods:{
         initForm : function(){
           this.formDesign = {
             disabled :false,
             formItems :[{
                prop:'border',
                label:'是否有边框:',
                type:'switch',
              },{
                prop:'multi',
                label:'是否多选',
                type:'switch',
              },{
                prop:'highlightCurrentRow',
                label:'选中行高亮',
                type:'switch'
              },{
                 prop:'columns',
                  label:'展示列',
                  type:'child-form',
                  form:[
                    [
                      {'label':'列名称','prop':'colName','type':'input',disabled:true},
                      {'label':'宽度','prop':'value','type':'input'},
                      {'label':'是否固定',
                       'prop':'fixed',
                       'type':'select',
                       'options':[
                         {label:'无',value:''},
                         {label:'左',value:'left'},
                         {label:'右',value:'right'}
                       ]},{
                          'label':'是否排序',
                          'prop':'sortable',
                          'type':'switch',
                       },{
                         'label':'其他动作',
                         'prop':'opers',
                         'type':'btns'
                       }
                    ]
                  ],
                  events:{
                     addRow : function(){
                     },
                     deleteRow : function(index){
                     },
                     getRows : function(){

                     }
                  }
              }
              ]



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
.box-block {
    width: 100%;
}
.box-block div {
    display: inline-block;   
    word-wrap: break-word;
    width: 48%;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ebebeb;
    box-shadow: 0px 0px 10px 5px #888888;
}
span{
  width:50px;
  font-size:12px;
  padding:0px;
}
 table{
  border-collapse: collapse;
  margin: 0 auto;
  margin-top:10px;
  text-align: center;
  width:100%;
}
table td, table th{
  border: 1px solid #cad9ea;
  color: #666;
  height: 30px;
}
table thead th{
  background-color: #CCE8EB;
  width: 100px;
}
table tr:nth-child(odd){
  background: #fff;
}

table tr:nth-child(even){
  background: #F5FAFA;
}

.td-label{
  width:30%;
  background-color:#D1E7FE;
}
.td-form{
  width:70%;
}
.el-tb-common{
  width:100%;
  padding:0px;
  border:0px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }



</style>





























