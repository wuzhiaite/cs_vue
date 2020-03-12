<template>
  <div  class="main">
    <div style="width:40%;height:10%;">
      <el-carousel :interval="4000" type="card" >
        <el-carousel-item v-for="(url,index) in urls" :key="index">
            <el-image :src="url">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
      
  </div>  
</template>
<script>

export default {
  name:'index',
  data:function(){
    return {
      urls:[],
    }
  },
  created:function(){
    this.initURLS();
  },
  methods:{
    initURLS:function(){
      this.urls = [
        require('../img/index/sn01.jpg'),
        require('../img/index/sn02.jpg'),
        require('../img/index/sn03.jpg'),
      ];
    }
  }

}
</script>
<style scoped>
.main{
  overflow-x:auto;
  overflow-y:auto;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .quarter-div{
    width: 50%;
    height: 60%;
    float: left;
  }
  .el-image{
    width:100%;
    height:100%;
  }
</style>

























