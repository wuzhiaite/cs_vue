<template>
    <div>
        <el-card class="box-card" >
            <CommonPageNew :pageParam="pageParam" />
        </el-card>
        <el-drawer
                title="字典配置"
                :visible.sync="bol.visable"
                direction="ltr"
                size="60%">
            <HashTable :form="form" ></HashTable>
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
            form:{}
        }
    },
    components:{
      HashTable,
    },
    created(){
        this.initPageParam();
    },
    methods:{
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

                    },
                ],
                tableParam : {//表单参数
                    border:true,//是否有边框
                    script:true,
                    highlightCurrentRow:true,//单行选择
                    maxHeight:"1500",//最大高度
                    multi:false,//是否为多选
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
                                name:"查看&编辑",
                                type:'el-icon-view',
                                icon:'el-icon-edit',
                                click:function(row){
                                    that.viewDict(row);
                                }
                            },
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
                    child:[],
                };
            }else{

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





























