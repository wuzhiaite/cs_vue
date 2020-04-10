<template>
<div style="padding:10px;">
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item title="基本信息" name="baseinfo">
      <div class="box-form" style="padding:0px;">
        <ComForm 
            :btns="[]"
            :formDesign="tableForm"
            :form.sync="form">
        </ComForm> 
      </div>  
    </el-collapse-item>
    <el-collapse-item title="列配置信息" name="confinfo">
      <div class="box-form" style="padding:15px;">
        <ChildTable 
            :item="columnForm"
            :form.sync="form">
        </ChildTable> 
      </div>
    </el-collapse-item>
  </el-collapse>
  <div class="btn-span">
    <Buttons  :btns="btns" ></Buttons>
  </div> 

</div>      
</template>
<script>


 export default {
    data(){
      return {
         tableForm:{},
         columnForm:{},
         btns:[],
         activeNames:[]
      }
    },
    props:{
      tempArr:{
        default:[],
        required:true,
        type:Array,
      },
      form:{
        default:{
           border:true,
           multi:true,
           highlightCurrentRow:true,
           columns:[],
         },
         required:true,
      }
    },
    watch:{
      tempArr : {
        deep:true,
        immediate:true,
        handler:function(n,o){
          // this.formateColumns();
          if(!this.form){
              this.formateColumns();
          }
        }
      }
    },
    created(){
       this.initTableForm();
       this.initColumnForm();
       this.initBtn();
      //  this.formateColumns();
    }, 
    methods:{
         initBtn : function(){
           var that = this;
           this.btns = [{
                    id : 'confirm',
                    name : '确定',
                    type : 'primary',
                    icon : 'el-icon-check',
                    disabled : false,
                    click : function(){
                        var form = that.form ;
                        var columns = form.columns ;
                        for(var i in columns){
                            var column = columns[i];
                            if(!column.label){
                                columns[i].label = column.prop ;
                            }
                        }
                        that.$emit('callback',form);
                    }
                 }];
         },
         initColumnForm : function(){
           var that = this;
            this.columnForm 
                  = {
                        prop:'columns',
                        label:'展示列',
                        type:'child-form',
                        form:[
                            {
                              'label':'列名称',
                              'prop':'prop',
                              'type':'select',
                              'disabled':false,
                              'options':that.tempArr,
                              'allowCreate':true,
                            },{
                              'label':'宽度',
                              'prop':'width',
                              'type':'input'
                            },{
                              'label':'是否固定',
                              'prop':'fixedDirect',
                              'type':'select',
                              options:[
                                {label:'左',value:'left'},
                                {label:'右',value:'right'}
                                ],
                              },{
                                'label':'是否排序',
                                'prop':'sortable',
                                'type':'switch',
                            },{
                              'label':'按钮操作',
                              'prop':'opers',
                              'type':'btns',
                            }
                          ],
                          
                    }
         },
         formateColumns : function(){//格式化列数据
            console.log('formateColumns');
            var tempArr = this.tempArr ;
            var length = tempArr.length;
            var avgLen = Math.floor(100 / length) ; 
            var arr = [];
            for(var i in tempArr){
              var value = tempArr[i].value ;
              var label = tempArr[i].label ;
              var obj = {
                 prop:value,
                 label:label,
                 width: avgLen, 
                 fixedDirect:'',
                 switch:false,
                 opers:[]

              };
              arr.push(obj);
            }
          this.form.columns = arr ;

         },
         initTableForm : function(){
           this.tableForm = {
                      disabled :false,
                      inline :false,
                      labelWidth:'30%',
                      formItems :[{
                          prop:'border',
                          label:'是否有边框:',
                          type:'switch',
                          active:"false",
                          inactive:'true'
                        },{
                          prop:'multi',
                          label:'是否多选',
                          type:'switch',
                          active:"false",
                          inactive:'true'
                        },{
                          prop:'highlightCurrentRow',
                          label:'选中行高亮',
                          type:'switch',
                          active:"false",
                          inactive:'true'
                        },
                ]};
            },
            handleChange:function(){




            }
                 
         

   
   }
           
  

    

 }


</script>
<style scoped>
.box-form{
  border-radius: 10px;
  border: 1px solid #eaeaea;
  padding:0px;
}
.btn-span{
  margin:20px;
}

</style>





























