<template>
      <section class="signature">
          <div class="signatureBox">
              <div class="canvasBox" ref="canvasHW">
                  <canvas id="canvasId"  ref="canvasF"
                      @touchstart='touchStart' 
                      @touchmove='touchMove' 
                      @touchend='touchEnd'
                      @mousedown="touchStart" 
                      @mousemove="touchMove" 
                      @mouseup="touchEnd"
                       ></canvas>
              </div>  
              <div  style="text-align:right;margin:0px;color:gray;margin-right:10px;position: relative;" @click="overwrite"> 
                <i class="el-icon-refresh" />
                重新签署 
              </div>      
          </div>
           
      </section>    

</template>
<script>


  export default {
    data() {
      return {
        isDown: false,
        upof : {},
        radius : 0,
        has : [],
        lineMax : 7,
        lineMin : 2,
        linePressure : 1,
        smoothness : 10,
        of:{}
      }
    },
    props:['sign'],
    watch:{
        of:{
          deep:true,
          handler(){
            this.commit();
          }
        }
    },
    mounted() {
      let canvas = this.$refs.canvasF;//获取dom
      canvas.height = this.$refs.canvasHW.offsetHeight ;//设置高度
      canvas.width = this.$refs.canvasHW.offsetWidth;//设置宽度
      this.canvasTxt = canvas.getContext('2d');//图画框
      this.canvasTxt.fillStyle = "rgba(0,0,0,0.25)";//设置背景颜色
      this.stageInfo = canvas.getBoundingClientRect()
      this.imgUrl = this.$refs.canvasF.toDataURL() ;
    },
    methods: {
      touchStart(ev) {
        ev = ev || event
        ev.preventDefault()
        if (ev.touches && ev.touches.length == 1) {
          this.upof = {
            x: ev.targetTouches[0].clienX,
            y: ev.targetTouches[0].clientY,
          }
        }else{
         this.upof = {
            x: ev.offsetX,
            y: ev.offsetY
          }
        }
        this.isDown = true
      },
      touchMove(ev) {
        if(!this.isDown) return;
        ev = ev || event
        ev.preventDefault()
        var of = {};
        if (ev.touches && ev.touches.length == 1) {
          of = {
            x: ev.targetTouches[0].clientX - this.stageInfo.left,
            y: ev.targetTouches[0].clientY - this.stageInfo.top
          }  
        }else{
          of = {
            x: ev.offsetX,
            y: ev.offsetY
          }
        }
        this.of = of;
        var ur = this.radius;
        var up =  this.upof;
        this.has.unshift({time:new Date().getTime() ,dis:this.distance()});
        var dis = 0;
        var time = 0;
        for (var n = 0; n < this.has.length-1; n++) {
          dis += this.has[n].dis;
          time += this.has[n].time-this.has[n+1].time;
          if (dis>this.smoothness)
            break;
        }
        var or = Math.min(time/dis*this.linePressure+this.lineMin , this.lineMax) / 2;
        this.radius = or;
        this.upof = of;
        if (this.has.length<=4) return;
        var len = Math.round(this.has[0].dis/2)+1;

        for (var i = 0; i < len; i++) {
          var x = up.x + (of.x-up.x)/len*i;
          var y = up.y + (of.y-up.y)/len*i;
          var r = ur + (or-ur)/len*i;
          this.canvasTxt.beginPath();
          this.canvasTxt.arc(x,y,r,0,2*Math.PI,true);
          this.canvasTxt.fill();
        }
      },
      distance(){
        var a = this.upof;
        var b = this.of;
        var x = b.x-a.x , y = b.y-a.y;
	      return Math.sqrt(x*x+y*y);
      },
      touchEnd(ev) {
        ev = ev || event
        ev.preventDefault()
        if (ev.touches && ev.touches.length == 1) {
          this.upof = {
            x: ev.targetTouches[0].clientX - this.stageInfo.left,
            y: ev.targetTouches[0].clientY - this.stageInfo.top
          }
        }else{
           this.of = {
              x: ev.offsetX,
              y: ev.offsetY
          }
        }
        this.isDown = false;
        // this.has = [];
      },
      //重写
      overwrite() {
        this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height)
      },
      //提交签名
      commit() {
        var s = this.$refs.canvasF.toDataURL();
        this.$emit("update:sign",s);
      }
    }
  }
</script>

<style scoped>
  .signatureBox {
    width: 100%;
    height: calc(100% - 50px);
    box-sizing: border-box;
    overflow: hidden;
    background: #fff;
    z-index: 100;
    display: flex;
    flex-direction: column;
  }
  .canvasBox {
    margin:0px;
    padding:0px;
    width:100%;
    box-sizing: border-box;
    flex: 1;
  }
  canvas {
    display: block;
		margin: 0 auto ;
    border: 1px solid white;
  }
  .btnBox {
    padding: 10px;
    text-align: center;
  }
  .btnBox button:first-of-type {
    background: transparent;
    border-radius: 4px;
    height: 40px;
    width: 80px;
    font-size: 14px;
  }
  .btnBox button:last-of-type {
    background: #71b900;
    color: #fff;
    border-radius: 4px;
    height: 40px;
    width: 80px;
    font-size: 14px;
  }
</style>


