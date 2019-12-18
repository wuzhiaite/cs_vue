<template>
    <div class="box-block">
        <div>
          <CommonPage :pageParam="pageParam"></CommonPage>
        </div>
        <div style="width:1px;"></div>
        <div>   
          



          
        
        </div> 
    </div>
</template>
<script>
 import CommonPage from '../common/CommonPage';

 export default {
    data(){
      return {
        search:'',
        tableParam:{},
        btns:[],
        conditions:[],
        pageParam:{},
      }
    },
    components:{
      CommonPage,
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

</style>





























