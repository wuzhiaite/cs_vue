<template>
  <div class="main">
    <el-row class="el-row">
      <el-col :span="6" class="el-col">
        <el-card>
<!--            <RadarMap/>-->
          统计图1
        </el-card>
      </el-col>
      <el-col :span="6" class="el-col">
        <el-card>
          统计图2
        </el-card>
      </el-col>
      <el-col :span="6" class="el-col">
        <el-card>
          统计图3
        </el-card>
      </el-col>
      <el-col :span="6" class="el-col">
        <el-card>
          统计图4
        </el-card>
      </el-col>
    </el-row>
    <el-row class="el-row" style="">
      <el-col :span="14" class="el-col">
          <el-card>
            <IndexVideo />
          </el-card>
      </el-col>
      <el-col :span="10" class="el-col">
          <el-card>
            <el-carousel indicator-position="outside" :interval='2000' >
              <el-carousel-item v-for="(item,index) in imgs" :key="index">
                <el-image
                        style="width: 100%; height: 100%"
                        :src="item.imgUrl"
                        fit="contain"></el-image>
              </el-carousel-item>
            </el-carousel>
          </el-card>
      </el-col>
    </el-row>
    <el-row class="el-row" style="height:400px;">
      <el-col :span="8" class="el-col">
        <el-card style="height:100%;">
          <el-collapse accordion >
            <el-collapse-item>
              <template slot="title">
                一致性 Consistency<i class="header-icon el-icon-info"></i>
              </template>
              <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
              <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
            <el-collapse-item title="反馈 Feedback">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item title="效率 Efficiency">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col :span="8" class="el-col">
        <el-card style="height:100%;">
          <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/12 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/3 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/2 20:46</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="8" class="el-col">
        <el-card style="height:100%;width:100%;">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div> 
</template>
<script>
import {getImgs} from './js/index';
import IndexVideo from './IndexVideo';
import RadarMap from './charts/radarMap'

export default {
  data(){
    return{
       imgs:[],
    }
  },
  components:{
    IndexVideo,
    RadarMap,
  },
  created(){
    this.imgs = getImgs();
  },
  methods:{
  }



}
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
  .el-row{
    margin-bottom: 5px;
  }
  .el-col{
     padding:10px;
     height:100%;
  }
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>

























