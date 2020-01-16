<template>
    <div id="bg2"></div>
</template>
<script> 


export default {
    data:function(){
        return {
            chart:'',
            chartData : [],
        }
    },
    mounted:function(){
        this.initChart();
        this.initData();
        this.insertData();
        this.designChart();
        this.renderChart();
    },
    methods:{
        
        initChart:function(){
            this.chart = new G2.Chart({
                container: 'bg2', // 指定图表容器 ID
                height: 250, // 指定图表高度
            });
            this.chart.forceFit();
        },
        initData:function(){
            this.chartData = [
                        { value: 10, time: '2015-03-01T16:00:00.000Z' },
                        { value: 15, time: '2015-03-01T16:10:00.000Z' },
                        { value: 26, time: '2015-03-01T16:20:00.000Z' },
                        { value: 9, time: '2015-03-01T16:30:00.000Z' },
                        { value: 12, time: '2015-03-01T16:40:00.000Z' },
                        { value: 23, time: '2015-03-01T16:50:00.000Z' },
                        { value: 18, time: '2015-03-01T17:00:00.000Z' },
                        { value: 21, time: '2015-03-01T17:10:00.000Z' },
                        { value: 22, time: '2015-03-01T17:20:00.000Z' },
                    ]
        },
        insertData:function(){
            this.chart.guide().clear();// 清理guide
            this.chart.repaint()
            this.chart.legend(false);
            this.chart.source(this.chartData,{
                time: {
                    alias:'这是时间',
                    type: 'timeCat',
                    nice: false,
                    mask: 'HH:mm',
                },
                value: {
                    alias:'这是具体的值',
                    // formatter: val => {
                    //      return val + ' k';
                    //    },
                    },
                }); 
        },
        designChart:function(){

            this.chart.axis('time', {
                title: {
                    textStyle: {
                    fontSize: 15, // 文本大小
                    textAlign: 'center', // 文本对齐方式
                    fill: '#999', // 文本颜色
                    // ...
                    }
                  },
                  autoRotate:true,
                
                });
           
            // this.chart.legend({
            //     position: 'bottom', // 设置图例的显示位置
            //     itemGap: 20 // 图例项之间的间距
            //     });
            // this.chart.legend('value', {
            //     title: '鬼知道这是什么玩意' 
            //     });    

            this.chart
                .line()
                .position('time*value')
                .shape("line")
                .tooltip(false);
            this.chart
                .point()
                .position('time*value')
                .shape('value',function(value){
                       if(value < 20){
                           return  "square";
                       }else{
                           return "hollowHexagon";
                       }     
                    })
                .size('value',function(value){
                    return value *0.5 ;
                });
             this.chart
                .area()
                .position('time*value')
                .shape("dotLine")
                .opacity('value',function(value){
                   if(value < 20){
                           return  0.5;
                       }else{
                           return 1;
                       } 
                });

        },
        renderChart:function(){
            this.chart.render();
        }

    }

}
</script>
<style scoped>
#bg1{
    display:inline-block;
}
</style>












