<template>
    <div>
        <div id="bg3"></div>
    </div>    
</template>
<script> 


export default {
    data:function(){
        return {
            chart:'',
            chartData : [],
            ds:{},
            dv:{},
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
                container: 'bg3', // 指定图表容器 ID
                height: 250, // 指定图表高度
                renderer: 'svg',
            });
            this.chart.forceFit();
        },
        initData:function(){
            this.chartData = [
                                {
                                    name: 'London',
                                    'Jan.': 18.9,
                                    'Feb.': 28.8,
                                    'Mar.': 39.3,
                                    'Apr.': 81.4,
                                    May: 47,
                                    'Jun.': 20.3,
                                    'Jul.': 24,
                                    'Aug.': 35.6,
                                },
                                {
                                    name: 'Berlin',
                                    'Jan.': 12.4,
                                    'Feb.': 23.2,
                                    'Mar.': 34.5,
                                    'Apr.': 99.7,
                                    May: 52.6,
                                    'Jun.': 35.5,
                                    'Jul.': 37.4,
                                    'Aug.': 42.4,
                                },
                                ];
               this.ds = new DataSet();
               this.dv = this.ds.createView().source(this.chartData); 
               this.dv.transform({
                   type:'fold',
                   fields:[ 'Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.'],//展开集字段
                   key:'月份',
                   value:'月均降雨量',
               })

        },
        insertData:function(){
            this.chart.guide().clear();// 清理guide
            this.chart.repaint()
            this.chart.source(this.dv);     
        

        },
        designChart:function(){
            this.chart.legend('月均降雨量',{
                position:'right',
                layout:'vertical',
                title: {
                    textAlign: 'center', // 文本对齐方向，可取值为： start middle end
                    fill: '#404040', // 文本的颜色
                    fontSize: '12', // 文本大小
                    fontWeight: 'bold', // 文本粗细
                    rotate: 30, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
                    textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
                }
            });
            this.chart
                .interval()
                .position('月份*月均降雨量')
                .color('name')
                .adjust([
                    {
                        type: 'dodge',
                        marginRatio: 1 / 32,
                        },
                    ]);

                    

        },
        renderChart:function(){
            // this.chart.coord('polar', {
            //     radius: 1, // 设置半径，值范围为 0 至 1
            //     innerRadius: 0, // 空心圆的半径，值范围为 0 至 1
            //     startAngle: (-1 * Math.PI) / 2, // 极坐标的起始角度，单位为弧度
            //     endAngle: (3 * Math.PI) / 2, // 极坐标的结束角度，单位为弧度
            // });   


            this.chart.render();
        },

    }

}
</script>
<style scoped>
#bg1{
    display:inline-block;
}
</style>












