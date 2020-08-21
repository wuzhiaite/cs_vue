<template>
    <div>
        <el-card class="box-card" >
            <CommonPageNew
                    :pageParam="pageParam"
                    :callbackParam.sync="callbackParam"/>
        </el-card>
        <ComDialog
                :dialog="dialog"
                :visable.sync="dialog.visable">
            <ComForm :formDesign="formDesign"
                     ref='form'
                     :form.sync="form"
                     :btns="btns"></ComForm>
        </ComDialog>
    </div>
</template>
<script>

export default {
    data(){
        return {
            pageParam:{},
            dialog:{
                title:'角色配置',
                visable:false,
                width:'40%'
            },
            formDesign:{},
            form:{},
            btns:[],
            callbackParam:{}
        }
    },
    created(){
        this.initPageParam();
        this.initForm();
    },
    watch:{
      "dialog.visable":function(n,o){
          if(!n){
             this.form={};
          }
        }
    },
    methods:{
        initForm:function(){
            var that = this ;
            this.formDesign = {
                    formItems : [
                        {
                            prop:'roleLabel',
                            label:'角色名',
                            type:'input',
                        },
                        {
                            prop:'roleValue',
                            label:'角色值',
                            type:'input',
                        },{
                            prop:'isValidate',
                            label:'是否有效',
                            type:'switch',
                            active:'yes',
                            inactive:'no',
                        }
                    ],
                };
            this.btns=[{
                    name: "保存",
                    type: '',
                    icon: 'el-icon-edit',
                    click: function () {
                        that.saveForm();
                    }
                }]
        },
        saveForm:function(){
            var flag = this.$refs.form.validateForm();
            if(!flag)return;
            var temp = this.form;
            this.$axios.post("/api/role/addOrUpdatePage",temp)
                .then(res=>{
                    if(res.status == 200 && res.data.code == 1){
                        this.$message({
                            message: '保存成功' ,
                            type : 'success'
                        });
                        this.$refs.form.getTableData();//调用表单中的刷新
                        this.dialog.visable = false ;
                    }else{
                        this.$message({
                            message:res.data.message ,
                            type : 'error'
                        });
                    }
                });
        },
        renderPage:function(){
            this.initPageParam();
        },
        delete : function(row){
            this.$confirm("是否确定删除？","提示",{
                confirmButtonText:"确定删除"
            }).then(()=>{
                var id = row.id ;
                this.$axios
                    .post("/api/role/removeById/"+id )
                    .then(res => {
                        if(res.status == 200 && res.data.code == 1){
                            this.$message({
                                type:"success",
                                message:'删除成功！'
                            });
                            this.initPageParam();
                        }else{
                            this.$message({
                                type:"error",
                                message:res.message
                            });
                        }
                    });
            })
        },
        deleteAll : function(){
            var arr = this.callbackParam.multipleSelection ;
            if(!arr ||  arr.length < 1){
                this.$message({
                    type:"warning",
                    message:"最少选中一条数据"
                });
                return ;
            }
            var temp = [];
            for(var i in arr){
                temp.push(arr[i].id);
            }
            this.$confirm("是否确定删除？","提示",{
                confirmButtonText:"确定删除"
            }).then(()=>{
                this.$axios
                    .post("/api/role/removeByIds",temp )
                    .then(res => {
                        if(res.status == 200 && res.data.code == 1){
                            this.$message({
                                type:"success",
                                message:'删除成功！'
                            });
                            this.initPageParam();
                        }else{
                            this.$message({
                                type:"error",
                                message:res.message
                            });
                        }
                    });
            })

        },
        initPageParam : function(){
            var that = this ;
            this.pageParam = {
                isPagination:true,//是否分页
                isQualitySearch:false,//是否高级查询
                searchParam : {
                    placeholder:'请输入角色名称',
                    maxlength:50,
                },
                conditions:this.conditions,//高级查询项
                btns : [
                    {
                        name:'新增',
                        type:'primary',
                        icon:'el-icon-circle-plus-outline',
                        click:function(){
                            that.viewForm(null);
                        }
                    },{
                        name:this.$t('common.batchDelete'),
                        type:'danger',
                        icon:'el-icon-delete',
                        click:function(){
                            that.deleteAll();
                        }
                    }
                ],
                tableParam : {//表单参数
                    border:true,//是否有边框
                    script:true,
                    highlightCurrentRow:true,//单行选择
                    maxHeight:"1500",//最大高度
                    multi:true,//是否为多选
                    columns:[{
                        prop : "roleLabel",
                        label : "角色名",
                        fixed : 'left',
                        sortable : true,
                        fixedDirect : 'left',
                        width : "15"
                    },{
                        prop : "roleValue",
                        label : "角色值",
                        width : "15"
                    },{
                        prop:"isValidate",
                        label:"是否有效",
                        width:"15",
                    },{
                        prop : "createTime",
                        label : "创建时间",
                        width : "15",
                        formatter:function(row){
                            return that.normalFormat(row.updateTime,"yyyy-MM-dd");
                        }
                    },{
                        prop : "updateTime",
                        label : "更新时间",
                        width : "15",
                        formatter:function(row){
                            return that.normalFormat(row.updateTime,"yyyy-MM-dd");
                        }
                    },{
                        prop : "",
                        label : "操作",
                        width : "20",
                        sortable:'',
                        fixedDirect:'right',
                        opers:[
                            {
                                name:"编辑",
                                type:'',
                                icon:'el-icon-edit',
                                click:function(row){
                                    that.viewForm(row);
                                }
                            }, {
                                name:'删除',
                                type:'danger',
                                icon:'el-icon-delete',
                                click:function(row){
                                    that.delete(row);
                                }
                            }
                        ]
                    }],
                },
                initData:{
                    url:'/api/role/getPageList',
                    params:{
                        "page":{
                            "current":1,
                            "size":10,
                        },
                        "entity":{}
                    },
                },
            }
        },
        viewForm : function(row){
            if(!row){
                this.form = {
                    id: this.uuid(),
                };
            }else{
                this.form = row ;
            }
            this.dialog.visable = true ;
        },
    }

}


</script>
<style scoped>




</style>





























