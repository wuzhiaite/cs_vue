<template>
 <div class="flow-main">
<!--     木头人字体-->
     <el-row  v-for="(flow, index) in workflows">
         <el-col v-for="(o, index) in flow" :span="3"  :key="index" :offset="index > 0 ? 2 : 0">
             <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="">
                 <img :src="o.imagurl" class="image">
                 <div style="padding: 14px;">
                     <strong>{{o.name}}</strong>
                 </div>
             </el-card>
         </el-col>
     </el-row>
 </div>


</template>
<script>
export default{
    data() {
        return {
            workflows:[]
        };
    },
    created(){
        this.initWorkflows();
    },
    methods:{
        initWorkflows(){

            this.workflows = [
                [
                    {
                        name:"请假申请",
                        imagurl:require("@/assets/img/workflow/workflow-01.jpg"),
                    },{
                        name:"加班申请",
                        imagurl:require("@/assets/img/workflow/workflow-02.jpg"),
                    },{
                        name:"离职申请",
                        imagurl:require("@/assets/img/workflow/workflow-03.jpg"),
                    },{
                        name:"转正申请",
                        imagurl:require("@/assets/img/workflow/workflow-04.jpg"),
                    },{
                        name:"异动申请",
                        imagurl:require("@/assets/img/workflow/workflow-05.jpg"),
                    }
                ],
                [
                    {
                        name:"用章申请",
                        imagurl:require("@/assets/img/workflow/workflow-06.jpg"),
                    },{
                        name:"办公用品申请",
                        imagurl:require("@/assets/img/workflow/workflow-07.jpg"),
                    },{
                        name:"IT维护申请",
                        imagurl:require("@/assets/img/workflow/workflow-08.jpg"),
                    },{
                        name:"出差申请",
                        imagurl:require("@/assets/img/workflow/workflow-09.jpg"),
                    },{
                        name:"补助申请",
                        imagurl:require("@/assets/img/workflow/workflow-10.jpg"),
                    }
                ],

            ];




        }


    }

}


</script>
<style scoped>
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
    .el-row{
        margin-bottom:50px !important;
    }
    .flow-main{
        padding:20px;
    }
</style>






















