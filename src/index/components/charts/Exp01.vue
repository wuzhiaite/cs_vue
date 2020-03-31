<template>
  <div class="chart">
      <div class="quarter-div" >
        <BarGraph></BarGraph>
      </div>
      <div class="quarter-div">
        <ScaleGraph></ScaleGraph>
      </div>
      <div class="quarter-div" >
        <SvgGraph></SvgGraph>
      </div>
      <div class="quarter-div" >
        <LegendGraph></LegendGraph>
      </div>
  </div> 
</template>
<script>
import BarGraph from './BarGraph';
import ScaleGraph from './ScaleGraph';
import SvgGraph from './SvgGraph';
import LegendGraph from './LegendGraph';

export default {
  name:'index',
  components:{
    BarGraph,
    ScaleGraph,
    SvgGraph,
    LegendGraph,
  }



}
</script>
<style scoped>
.chart{
  margin: 0;
  padding: 0;
  background-color:white;
  overflow:hidden;
}
.chart{
  width: 80%;
  height: 75%;
  position: absolute;
}
.quarter-div{
  width: 50%;
  height: 50%;
  float: left;
}
</style>

























