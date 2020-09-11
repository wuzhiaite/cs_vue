<template>
<div>
   <el-row style="margin-bottom: 10px;">
    <el-col :span="7" >
        <el-row>
            <el-col :span="5">
                <buttons :btns="btns"/>
            </el-col>
        </el-row>
        <el-row>
          <el-card>
              <template v-for="v in list">
                  <span :key="v.id == id ? html = v.html : v.id" @click="id = v.id">
                      {{ v.name}}
                  </span>
                  <el-divider content-position="right">
                      <el-tag size="medium" effect="dark">{{v.module}}</el-tag>
                  </el-divider>
              </template>
          </el-card>
        </el-row>
    </el-col>
    <el-col :span="16" :offset="1">
      <el-card>
       <div v-html="html"/>
      </el-card>
    </el-col>
   </el-row>
</div>

</template>
<script>
import {blogDetail,backBtn,blogList} from './article'


export default{
    data(){
        return{
           id:'',
           html:'',
           btns:[],
           list:[],
        }
    },
    created(){
     this.id = this.$route.params.id ;
     this.getBlogList();
     this.btns = backBtn(this);
    },
    methods:{
     getBlogList(){
         blogList(this).then(res=>{
            if(res.data.code == 1){
                this.list = res.data.result ;
            }
         });
     }
    }


}

</script>
<style scoped>

</style>
