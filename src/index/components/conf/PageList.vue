<template>
    <div class="box-block">
        <div>            
            <el-row>
              <el-input v-model="search" placeholder="请输入内容"
                size="small"
                prefix-icon="el-icon-search"
                style="width:100%;"></el-input>
            </el-row> 
            <Buttons :btns="btns"></Buttons> 
             <!-- <el-collapse-transition> -->
               <transition name="el-zoom-in-top">
                <div   v-show="show"
                  style="display:block;background-color:#D1E7FE;width:100%;margin:10px;text-align:left;">
                  <span style="width:33.33%;display:inline-block;">
                    <label style="font-size:12px;">
                      <strong>下拉框选项:</strong>
                    </label>
                    <el-select v-model="value" 
                      size="mini"
                      clearable="true" 
                      multiple="false"
                      filterable
                      placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          :disabled="item.disabled">
                        </el-option>
                    </el-select>
                  </span>
                  <span style="width:33.33%;display:inline-block;">
                    <label style="font-size:12px;">
                      <strong>测试时间框:</strong>
                    </label>
                      <el-date-picker
                        size="mini"
                        type="dates"
                        v-model="value4"
                        placeholder="时间">
                      </el-date-picker>
                  </span>               
                </div> 
            </transition>      
            <!-- </el-collapse-transition>       -->
            <TableList :tableParam="tableParam"></TableList>
             <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="40">
              </el-pagination>
        </div>
        <div style="width:1px;"></div>
        <div>   

            


        </div> 


    </div>
</template>
<script>
 import TableList from '../common/TableList';
 import Buttons from '../common/Buttons';
 import {Dialog} from 'element-ui';


 export default {
    data(){
      return {
        search:'',
        tableParam:{},
        btns:[],
        show:false,
        conditions:[],
        pageParam:{},
      }
    },
    components:{
      TableList,
      Buttons,
    },
    created(){
      this.initTable();
      this.initBtns();
      this.initConditions();
      this.initPageParam();
    },
    methods:{
      initPageParam : function(){
           this.pageParam = {     
                isPagination:true,//是否分页
                isQualitySearch:true,//是否高级查询
                conditions:this.conditions,//高级查询项
                btns:this.btns,//按钮
                tableParam : this.tableParam//表单参数
           }
      },
      initConditions :function(){
          this.conditions = [
            {
              type:'select',
              label:'喜欢的水果',
              prop:'fruit',
              ismulti:true,
              options:[
                {
                  label:'苹果',
                  value:'apple',
                  disabled:true,  
                },{
                  label:'香蕉',
                  value:'banana',
                },{
                   label:'橘子',
                   value:'orange' 
                }
              ],
            },{
              type:'date',
              label:'开始时间',
              prop:'fruit',
            }
          ];



      },
      initBtns:function(){
          var that = this;
          this.btns = [
            {
              name : '高级查询',
              type : 'primary',
              icon : 'el-icon-s-promotion',
              disabled : false,
              click : function(){
                that.show = ! that.show;
              }
            },{
              name : '查询',
              type : 'primary',
              icon : 'el-icon-search',
              disabled : false,
              click : function(){
                alert('嘿嘿嘿！！！');
              }
            },{
              name : '删除',
              type : 'primary',
              icon : 'el-icon-delete',
              disabled : false,
              click : function(){
                alert('嘻嘻嘻！！！');
              }
            },]
      },
      handleClick:function(row){
         console.log('handleClick');
         console.log(row);



      },
      handleEdit : function(row){
          console.log('handleEdit');
          console.log(row);
      },
      initTable : function(){
        var that = this;
          this.tableParam = {
            border:true,//是否有边框
            script:true,
            highlightCurrentRow:true,//单行选择
            maxHeight:"1500",//最大高度
            multi:true,//是否为多选
            height:'600px',
            defaultSort:{//默认排序参数
              // prop: 'date', order: 'descending'
            },
            columns:[{
                prop : 'date',
                label : '日期',
                width :'120',
                icon : 'el-icon-time',
             },{
                prop : "name",
                label : "姓名",
                width : "80"
             },{
                prop:"province",
                label:"省份",
                width:"80",
             },{
                prop : "city",
                label : "市区",
                width : "80",
             },{
                prop : "address",
                label : "地址",
                width : "250",
             },{
                 prop : "zip",
                 label : "邮编",
                 width : "120",
             },{
                prop : "cz",
                label : "操作",
                width : "200",
                sortable:'',
                fixed:'right',
                opers:[
                  {
                    name:"查看",
                    type:'',
                    click:function(row){
                      that.handleClick(row);
                    }
                  },
                  {
                    name:"编辑",
                    type:'danger',
                    icon:'el-icon-edit',
                    click:function(row){
                        that.handleEdit(row);
                    }
                  }   
                ]
             }],
             tableData:[{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
              }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
              }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
              }, {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
              }],
             initData:{
               url:'',
               param:{},
               method:''
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

</style>





























