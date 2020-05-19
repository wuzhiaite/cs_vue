<template>
    <div>
        <el-card class="box-card" >
            <CommonPageNew
                    :pageParam="pageParam"
                    :callbackParam.sync="callbackParam"/>
        </el-card>
        <el-drawer
                title="字典配置"
                :visible.sync="bol.visable"
                direction="ltr"
                size="60%">
            <HashTable :form="form" @callback="bol.visable=false"></HashTable>
        </el-drawer>

    </div>
</template>
<script>
import HashTable from './HashTable';

export default {
    data(){
        return {
            pageParam:{},
            bol:{
                visable:false,
            },
            form:{},
            callbackParam:{}
        }
    },
    components:{
      HashTable,
    },
    created(){
        this.initPageParam();
    },
    methods:{
        delete : function(row){
            this.$confirm("是否确定删除？","提示",{
                confirmButtonText:"确定删除"
            }).then(()=>{
                var id = row.id ;
                this.$axios
                    .post("/api/dict/removeById/"+id )
                    .then(res => {
                        if(res.status == 200 && res.data.code == 1){
                            this.$message({
                                type:"success",
                                message:'删除成功！'
                            });
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
                var id = row.id ;
                this.$axios
                    .post("/api/dict/removeByIds",temp )
                    .then(res => {
                        if(res.status == 200 && res.data.code == 1){
                            this.$message({
                                type:"success",
                                message:'删除成功！'
                            });
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
                    placeholder:'请输入表名',
                    maxlength:50,
                },
                conditions:this.conditions,//高级查询项
                btns : [
                    {
                        name:'新增',
                        type:'primary',
                        icon:'el-icon-circle-plus-outline',
                        click:function(){
                            that.viewDict(null);
                        }
                    },{
                        name:'批量删除',
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
                        prop : "dictName",
                        label : "字典标识",
                        fixed : 'left',
                        sortable : true,
                        fixedDirect : 'left',
                        width : "10"
                    },{
                        prop : "dictNameText",
                        label : "字典描述",
                        width : "20"
                    },{
                        prop:"bz",
                        label:"备注",
                        width:"15",
                    },{
                        prop : "CREATE_TIME",
                        label : "创建时间",
                        width : "10",
                    },{
                        prop : "UPDATE_TIME",
                        label : "更新时间",
                        width : "10",
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
                                    that.viewDict(row);
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
                    url:'/api/dict/getPageList',
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
        viewDict : function(row){
            if(!row){
                this.form = {
                    id: this.uuid(),
                    dictMapping:[],
                };
            }else{
                this.form = row ;
            }
            this.bol.visable = true ;
        },
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





























