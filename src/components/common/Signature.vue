<template>
      <section class="signature">
          <div class="signatureBox">
              <div class="canvasBox" ref="canvasHW">
                  <canvas ref="canvasF"
                        @touchstart='touchStart' 
                        @touchmove='touchMove' 
                        @touchend='touchEnd' ></canvas>
              </div>
          </div>
           <div  style="float:right;margin-top:10px;color:gray;margin-right:10px;" @click="overwrite"> 
                <van-icon name="replay" />
                重新签署 
              </div>
      </section>    
</template>
<script>
  export default {
    data() {
      return {
        stageInfo:'',
        lineWidth:4,//字体大小，默认设置成4
        sratio: 1,//参数,
        lineColor:'#000000',//字体颜色
        client: {},
        imgUrl:'',
        points: [],
        canvasTxt: null,
        startX: 0,
        startY: 0,
        moveY: 0,
        moveX: 0,
        endY: 0,
        endX: 0,
        w: null,
        h: null,
        isDown: false,
      }
    },
    props:['sign'],
    watch:{
        moveY: "commit",
        moveX: "commit",
    },
    mounted() {
      let canvas = this.$refs.canvasF
      canvas.height = this.$refs.canvasHW.offsetHeight - 500
      canvas.width = this.$refs.canvasHW.offsetWidth
      this.canvasTxt = canvas.getContext('2d')
      this.canvasTxt.lineJoin = 'round';
      this.canvasTxt.shadowBlur = 1;
      this.canvasTxt.shadowColor = '#000';
      this.canvasTxt.lineWidth = this.lineWidth  //字体粗细
      this.stageInfo = canvas.getBoundingClientRect()
      this.imgUrl = this.$refs.canvasF.toDataURL() ;
    },
    methods: {
      //mobile
      touchStart(ev) {
        ev = ev || event
        ev.preventDefault()
        var obj = {};
        if (ev.touches && ev.touches.length == 1) {
           obj = {
            x: ev.targetTouches[0].clienX,
            y: ev.targetTouches[0].clientY,
          }    
        }else{
           obj = {
            x: ev.offsetX,
            y: ev.offsetY
          }
        }
        this.startX = obj.x
        this.startY = obj.y
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.isDown = true;
      },
      touchMove(ev) {
        ev = ev || event
        ev.preventDefault()
        var obj = {};
        if (ev.touches.length == 1) {
           obj = {
            x: ev.targetTouches[0].clientX - this.stageInfo.left,
            y: ev.targetTouches[0].clientY - this.stageInfo.top
          }
        }else{
           obj = {
            x: ev.offsetX,
            y: ev.offsetY
          }
        }
        this.moveY = obj.y
        this.moveX = obj.x
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.startY = obj.y
        this.startX = obj.x
        this.points.push(obj)
      },
      touchEnd(ev) {
        ev = ev || event
        ev.preventDefault()
        var obj = {};
        if (ev.touches && ev.touches.length == 1) {
           obj = {
            x: ev.targetTouches[0].clientX - this.stageInfo.left,
            y: ev.targetTouches[0].clientY - this.stageInfo.top
          }
         
        }else{
           obj = {
            x: ev.offsetX,
            y: ev.offsetY
          }
        }
        this.canvasTxt.beginPath()
        this.canvasTxt.moveTo(this.startX, this.startY)
        this.canvasTxt.lineTo(obj.x, obj.y)
        this.canvasTxt.stroke()
        this.canvasTxt.closePath()
        this.points.push(obj)
        this.isDown = false;
      },
      //重写
      overwrite() {
        this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height)
      },
      //提交签名
      commit() {
        // this.imgUrl=this.$refs.canvasF.toDataURL();
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


