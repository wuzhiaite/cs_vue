<template>
 <div class="flow-main">
<!--     木头人字体-->
     <el-row  v-for="(flow, index) in workflows">
         <el-col v-for="(o, index) in flow" :span="3"  :key="index" :offset="index > 0 ? 2 : 0">
             <el-card :body-style="{ padding: '0px' }" shadow="hover" >
                 <div @click="o.click ? o.click() : nosupport()">
                     <img :src="o.imagurl" class="image">
                     <div style="padding: 14px;">
                         <strong>{{o.name}}</strong>
                     </div>
                 </div>
             </el-card>
         </el-col>
     </el-row>
 </div>


</template>
<script>

import {workflow} from './js/workflow'

export default{
    data() {
        return {
            workflows:[]
        };
    },
    created(){
        this.workflows = workflow(this);
    },
    methods:{
        nosupport(){
            this.$message({
                type:'warning',
                message:'该流程还未新键，敬请期待。'
            })

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






















