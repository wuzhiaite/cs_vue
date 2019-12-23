<template>
<!-- <CommonPage :pageParam="pageParam"></CommonPage> -->
  <div class="box-block">
        <div>
          <CommonPage :pageParam="pageParam"></CommonPage>
        </div>
        <div style="width:1px;"></div>
        <div style="float:right;">    
            <span style="text-align:left;font-size:20px;">
              <strong>通用表单</strong>
            </span>
            <table>
                <tr>
                  <td style="" class="td-label">
                    <span>
                      <strong>姓名:</strong>
                    </span>
                  </td>
                  <td class="td_form">
                     <el-input size="mini"
                      v-model="form.name" 
                      style="width:100%;padding:0px;"
                      placeholder="请输入内容" clearable></el-input>
                  </td>
                  <td class="td-label">
                    <span>
                      <strong>性别:</strong>
                    </span>
                  </td>
                  <td class="td_form">
                      <el-select v-model="form.gender" size="mini" placeholder="请选择" style="width:100%;padding:0px;" >
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                  </td>             
                </tr>
                <tr>
                    <td class="td-label">
                      <span>
                        <strong>居住地:</strong>
                      </span>
                    </td>
                    <td class="td_form">
                       <el-cascader
                          v-model="form.liveArea"
                          size="mini"
                          style="width:100%;padding:0px;"
                          :options="demon.options"
                          :props="{ expandTrigger: 'hover' }"></el-cascader>
                    </td> 
                    <td class="td-label">
                      <span>
                        <strong>是否为应届毕业生:</strong>
                      </span>
                    </td> 
                    <td class="td_form">
                      <el-switch
                        size="mini"
                        style="width:100%;padding:0px;"
                        v-model="form.isGraduates"
                        active-text="是"
                        inactive-text="否">
                      </el-switch>  
                    </td> 
                </tr>
                <tr>
                    <td class="td-label">
                      <span>
                        <strong>学历水平:</strong>
                      </span>
                    </td> 
                    <td class="td_form">
                        <el-radio-group  size="mini" v-model="form.edu" 
                                  style="display:inline;padding:5px;">
                            <el-radio 
                                size="mini"
                                v-for="item in edus" 
                                style="padding:0px;font-size:12px;margin-right:5px;"          
                                :label="item.value">{{item.name}}</el-radio>
                          </el-radio-group>
                    </td> 
                    <td class="td-label">
                      <span>
                        <strong>兴趣爱好:</strong>
                      </span>
                    </td> 
                    <td  class="td_form">
                         <el-checkbox-group v-model="form.checkbox"
                                      size="mini"
                                      style="display:inline;padding:5px;">
                              <el-checkbox 
                                  size="mini"
                                  style="padding:0px;font-size:12px;margin-right:10px;"
                                  v-for="lk in likes" 
                                 :label="lk.value" :key="lk.value">{{lk.name}}</el-checkbox>
                         </el-checkbox-group>           
                    </td>         
                </tr> 
                <tr>
                    <td class="td-label">
                      <span>
                        <strong>出生日期:</strong>
                      </span>
                    </td> 
                    <td class="td_form">
                        <el-date-picker
                          v-model="form.startTime"
                          size="mini"
                          style="width:100%;padding:0px;"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                    </td> 
                    <td class="td-label">
                     <span>
                        <strong>毕业日期:</strong>
                      </span>
                    </td> 
                    <td class="td_form">
                        <el-date-picker
                          v-model="form.graduateTime"
                          size="mini"
                          style="width:100%;padding:0px;"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>          
                    </td>         
                </tr> 


                <tr>
                    <td class="td-label">
                      <span>
                        <strong>自我评价:</strong>
                      </span>
                    </td> 
                    <td  class="td_form" colspan="3">
                          <el-input type="textarea" 
                             style="width:100%;padding:0px;"
                             v-model="form.shelfDes"></el-input>           
                    </td> 
                </tr>  
            </table>
          
        </div> 
    </div>
</template>
<script>
 import CommonPage from '../common/CommonPage';
 import TableList from '../common/TableList'
 export default {
    data(){
      return {
        tableParam:{},
        btns:[],
        conditions:[],
        pageParam:{},
        options:[{label:'男',value:'boy'},{label:'女',value:'girl'}],
        form:{
          checkbox:[],
        },
        demon:{},
        edus:[{name:'本科',value:'bk'},
              {name:'大专',value:'dz'},
              {name:'高中',value:'gz'},
              {name:'中专',value:'zz'}],
        likes:[{name:'篮球',value:'basketball'},
              {name:'乒乓球',value:'pingpang'},
              {name:'游泳',value:'swmming'}],
        cities: ['上海', '北京', '广州', '深圳'],   
        checkedCities:[],   
        
      }
    },
    watch:{
      "form":{
            deep:true,
            handler(n){
              console.log(JSON.stringify(n));
            }
        }

    },
    components:{
      CommonPage,
      TableList,
    },
    created(){
      this.initTable();
      this.initBtns();
      this.initConditions();
      this.initPageParam();
      this.initDemon();
    },
    methods:{
      initDemon:function(){
         this.demon = 
         {
          options: [{
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }, {
                value: 'xiaolv',
                label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }, {
            value: 'zujian',
            label: '组件',
            children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
                value: 'layout',
                label: 'Layout 布局'
              }, {
                value: 'color',
                label: 'Color 色彩'
              }, {
                value: 'typography',
                label: 'Typography 字体'
              }, {
                value: 'icon',
                label: 'Icon 图标'
              }, {
                value: 'button',
                label: 'Button 按钮'
              }]
            }, {
              value: 'form',
              label: 'Form',
              children: [{
                value: 'radio',
                label: 'Radio 单选框'
              }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }, {
                value: 'input',
                label: 'Input 输入框'
              }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
              }, {
                value: 'select',
                label: 'Select 选择器'
              }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
              }, {
                value: 'switch',
                label: 'Switch 开关'
              }, {
                value: 'slider',
                label: 'Slider 滑块'
              }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
              }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
              }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
              }, {
                value: 'upload',
                label: 'Upload 上传'
              }, {
                value: 'rate',
                label: 'Rate 评分'
              }, {
                value: 'form',
                label: 'Form 表单'
              }]
            }, {
              value: 'data',
              label: 'Data',
              children: [{
                value: 'table',
                label: 'Table 表格'
              }, {
                value: 'tag',
                label: 'Tag 标签'
              }, {
                value: 'progress',
                label: 'Progress 进度条'
              }, {
                value: 'tree',
                label: 'Tree 树形控件'
              }, {
                value: 'pagination',
                label: 'Pagination 分页'
              }, {
                value: 'badge',
                label: 'Badge 标记'
              }]
            }, {
              value: 'notice',
              label: 'Notice',
              children: [{
                value: 'alert',
                label: 'Alert 警告'
              }, {
                value: 'loading',
                label: 'Loading 加载'
              }, {
                value: 'message',
                label: 'Message 消息提示'
              }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
              }, {
                value: 'notification',
                label: 'Notification 通知'
              }]
            }, {
              value: 'navigation',
              label: 'Navigation',
              children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
              }, {
                value: 'tabs',
                label: 'Tabs 标签页'
              }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
              }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
              }, {
                value: 'steps',
                label: 'Steps 步骤条'
              }]
            }, {
              value: 'others',
              label: 'Others',
              children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
              }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              }, {
                value: 'popover',
                label: 'Popover 弹出框'
              }, {
                value: 'card',
                label: 'Card 卡片'
              }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
              }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }]
            }]
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
          }]
        }
      },
      onSubmit() {
          console.log('submit!');
      },
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
              ismulti:false,
              options:[
                {
                  label:'苹果',
                  value:'apple',
                  disabled:true,  
                },{
                  label:'香蕉',
                  value:'banana',
                  disabled:false,
                },{
                   label:'橘子',
                   value:'orange',
                   disabled:false, 
                }
              ],
            },{
              type:'date',
              label:'开始时间',
              prop:'fruit',
            },{
              type:'bol',
              label:'是否为女',
              prop:'gender',
              activeText:'是',
              inactiveText:'否'
            },{
              type:'interval',
              label:'时间段',
              prop:'interval',
            },{
              type:'buttons',
              label:'所在区域',
              prop:'button',
              value:'西安',
              options:[
                {name:'上海',value:'shanghai'},
                {name:'北京',value:'beijing'},
                {name:'深圳',value:'shenzhen'},
                {name:'西安',value:'xian'}],
            }
          ];
      },
      initBtns:function(){
          var that = this;
          this.btns = [{
                name : '删除',
                type : 'primary',
                icon : 'el-icon-delete',
                disabled : false,
                click : function(){
                  alert('嘻嘻嘻！！！!');
                }
              },]
      },
      handleClick:function(row){
         console.log('handleClick');
         console.log(row);
         alert(JSON.stringify(row));
      },
      handleEdit : function(row){
          console.log('handleEdit');
          console.log(row);
           alert(JSON.stringify(row));
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
td{
  border : 1px solid black;
  padding:0px;
  width:auto;
  height:5px;
}
 table{
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
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
  width:20%;
  background-color:#D1E7FE;
}
.td-form{
  width:30%;
}
.el-tb-common{
  width:100%;
  padding:0px;
  border:0px;
}
</style>





























