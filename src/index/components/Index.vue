<template>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="url in urls" :key="url">
          <img :src="url" :alt="url" />
          <!-- <img src="../img/index/sn01.jpg" /> -->
        </el-carousel-item>
      </el-carousel>
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
        '../img/index/sn01.jpg',
        '../img/index/sn02.jpg',
        '../img/index/sn03.jpg',
      ];
    }
  }

}
</script>
<style>
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
  height: 50%;
  float: left;
}
img{
  width:auto;
	height:auto;
}
</style>

























