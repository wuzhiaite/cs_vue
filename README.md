# csvue

### 基础指令
```
下载依赖
npm install
运行项目
npm run serve
项目打包
npm run build

```
### 基础配置文件
```
vue.config.js 配置转发路径和端口，基础路径配置等；
.env文件配置环境的相关映射

```


####  1.通用台账配置页面

![avatar](./img/pagelist.jpg)

**参数配置说明：**

- 核心配置内容：

```
 this.pageParam = {     
                isPagination:true,//是否分页
                isQualitySearch:true,//是否高级查询
                conditions:this.conditions,//高级查询项
                btns:this.btns,//按钮
                tableParam : this.tableParam//表单参数
           }
```

- 按钮配置项

  ```vue
   this.btns = [
              {
                name : '高级查询',//按钮名称
                type : 'primary',//按钮类型
                icon : 'el-icon-s-promotion',//按钮图标
                disabled : false,//是否可编辑
                click : function(){//点击的回调方法
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
  ```



- 高级查询项配置

  ```vue
  this.conditions = [
              {
                type:'select',//查询项展示类型
                label:'喜欢的水果',//展示名称标签
                prop:'fruit',//默认的返回属性值
                ismulti:true,//单选还是多选
                options:[//需要展示的选项
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
  
  ```

  

- 表单配置

  ```vue
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
              columns:[{//需要展示的列
                  prop : 'date',//属性及展示数据对应名称
                  label : '日期',//标签名称
                  width :'120',//行宽
                  icon : 'el-icon-time',//字段前是否有标记
               },{
                  prop : "name",
                  label : "姓名",
                  width : "80"
               },{
                  prop:"province",
                  label:"省份",
                  width:"80",
               },{
                  prop : "",
                  label : "操作",
                  width : "200",
                  sortable:'',//默认可以进行手动操作
                  fixed:'right',
                  opers:[ //有其他的操作按钮
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
               initData:{// 数据请求的参数
                 url:'',
                 param:{},
               },
            }
  ```

  