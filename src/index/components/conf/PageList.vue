<template>
  <div class="box-block">
        <div>
          <CommonPage :pageParam="pageParam"></CommonPage>
        </div>
        <div style="width:1px;"></div>
        <div style="float:right;margin-top:20px;">    
            <span style="text-align:left;font-size:20px;">
              <strong>台账配置明细</strong>
            </span>
            <table>
                <tr>
                    <td class="td-label">
                        <span>
                        <strong>条件搜索字段:</strong>
                        </span>
                    </td> 
                    <td class="td_form">
                       <el-select v-model="conditionSelect"
                          style="width:100%;padding:0px;"
                          :disabled="disabled"
                          multiple placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </td>                            
                </tr> 
                <tr>
                    <td style="" class="td-label">
                    <span>
                        <strong>列展示字段:</strong>
                    </span>
                    </td>
                    <td class="td_form">
                        <el-select v-model="conditionSelect"
                          :disabled="disabled"
                          style="width:100%;padding:0px;"
                          multiple placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </td>           
                </tr>             
                <tr>
                    <td class="td-label">
                        <span>
                        <strong>条件项:</strong>
                        </span>
                    </td> 
                    <td class="td_form">
                        <el-select v-model="conditionSelect"
                         :disabled="disabled"
                          style="width:100%;padding:0px;"
                          multiple placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </td>         
                </tr> 
                <tr>
                    <td class="td-label">
                        <span>
                        <strong>查询SQL:</strong>
                        </span>
                    </td> 
                    <td  class="td_form">
                        <el-input type="textarea" 
                            show-word-limit
                            maxlength="5000"
                            style="width:100%;padding:0px;height:100%;"
                            :disabled="disabled"
                            rows="13"
                            v-model="form.shelfDes"></el-input>           
                    </td> 
                </tr> 
            </table>        
        </div> 
    </div>
</template>
<script>
 

 export default {
    data(){
      return {
        tableParam:{},
        btns:[],
        conditions:[],
        pageParam:{},
        form:{},
        disabled:false,
        conditionSelect:['name','area','age'],
        options:[
          {
            name:'名称',
            value:'name'
          },{
            name:'区域',
            value:'area',
          },{
            name:'年龄',
            value:'age',
          }
        ],
      }
    },
    created(){
      this.initTable();
      this.initBtns();
      this.initPageParam();
    },
    methods:{
      
      onSubmit() {
          console.log('submit!');
      },
      initPageParam : function(){
           this.pageParam = {     
                isPagination:true,//是否分页
                isQualitySearch:false,//是否高级查询
                btns:this.btns,//按钮
                tableParam : this.tableParam//表单参数
           }
      },
      handleClick:function(row){
         alert(JSON.stringify(row));
      },
      handleEdit : function(row){
           alert(JSON.stringify(row));
      },
       initBtns:function(){
          var that = this;
          this.btns = [
            {
                name : '新增',
                type : 'primary',
                icon : 'el-icon-delete',
                disabled : false,
                click : function(){
                   this.$alert('<CommonForm></CommonForm>', {
                        dangerouslyUseHTMLString: true
                      });
                }
              }]
      },
      initTable : function(){
          var that = this;
          this.tableParam = {
            script:true,
            highlightCurrentRow:true,//单行选择
            maxHeight:"1500",//最大高度
            multi:true,//是否为多选
            height:'600px',
            defaultSort:{//默认排序参数
              // prop: 'date', order: 'descending'
            },
            columns:[{
                prop : "name",
                label : "姓名",
                width : "80"
             },{
                prop : "cz",
                label : "操作",
                width : "300",
                opers:[
                  {
                    name:"台账预览",
                    type:'text',
                    icon : 'el-icon-view',
                    click:function(row){
                      that.handleClick(row);
                    }
                  },{
                    name:"删除",
                    type:'danger',
                    icon : 'el-icon-delete',
                    click:function(row){
                      that.handleClick(row);
                    }
                  },
                  {
                    name:"编辑",
                    type:'',
                    icon:'el-icon-edit',
                    click:function(row){
                        that.handleEdit(row);
                    }
                  }   
                ]
             }],
             initData:{
               url:'',
               param:{},
             },
          }

      }
    }

 }


</script>
<style scoped>
.box-block {
    width: 100%;
}
.box-block div {
    display: inline-block;   
    word-wrap: break-word;
    width: 45%;
    text-align: center;
    padding: 10px;
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





























