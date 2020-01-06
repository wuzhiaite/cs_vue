<template>
  <div class="main">
      <div class="quarter-div" >
        <BarGraph></BarGraph>
      </div>
      <div class="quarter-div">
        <ScaleGraph></ScaleGraph>
      </div>
       <div class="quarter-div" >
        
      </div>
      <div class="quarter-div" >
      
      </div>
  </div> 
</template>
<script>
import BarGraph from './charts/BarGraph';
import ScaleGraph from './charts/ScaleGraph';

export default {
  name:'index',
  components:{
    BarGraph,
    ScaleGraph,
  }



}
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
.main{
  width: 80%;
  height: 80%;
  position: absolute;
}
.quarter-div{
  width: 50%;
  height: 50%;
  float: left;
}
</style>

























