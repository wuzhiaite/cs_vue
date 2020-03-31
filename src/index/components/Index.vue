<template>
  <div class="main">
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
import BarGraph from './charts/BarGraph';
import ScaleGraph from './charts/ScaleGraph';
import SvgGraph from './charts/SvgGraph';
import LegendGraph from './charts/LegendGraph';

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
<style>
*{
  margin: 0;
  padding: 0;
}
</style>

























