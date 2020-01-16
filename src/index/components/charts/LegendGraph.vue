<template>
    <div>
        <div id="le_01"></div>
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
                container: 'le_01', // 指定图表容器 ID
                height: 250, // 指定图表高度
                renderer: 'svg',
                padding: [10, 40, 130, 40],
            });
            this.chart.forceFit();
        },
        initData:function(){
            this.chartData = [
                    { country: '中国', cost: 96 },
                    { country: '德国', cost: 121 },
                    { country: '美国', cost: 100 },
                    { country: '日本', cost: 111 },
                    { country: '韩国', cost: 102 },
                    { country: '法国', cost: 124 },
                    { country: '意大利', cost: 123 },
                    { country: '荷兰', cost: 111 },
                    { country: '比利时', cost: 123 },
                    { country: '英国', cost: 109 },
                    { country: '加拿大', cost: 115 },
                    { country: '俄罗斯', cost: 99 },
                    { country: '墨西哥', cost: 91 },
                    { country: '印度', cost: 87 },
                    { country: '瑞士', cost: 125 },
                    { country: '澳大利亚', cost: 130 },
                    { country: '西班牙', cost: 109 },
                    { country: '巴西', cost: 123 },
                    { country: '泰国', cost: 91 },
                    { country: '印尼', cost: 83 },
                    { country: '波兰', cost: 101 },
                    { country: '瑞典', cost: 116 },
                    { country: '奥地利', cost: 111 },
                    { country: '捷克', cost: 107 },
                    ];
             

        },
        insertData:function(){
            this.chart.guide().clear();// 清理guide
            this.chart.repaint()
            this.chart.source(this.chartData);     
        },
        designChart:function(){
            this.chart.coord('polar', {
                 radius: 0.6,
            });
            this.chart.axis('cost', {
                label: null,
                tickLine: null,
                line: {
                    stroke: '#E9E9E9',
                    lineDash: [3, 3],
                },
            });
            this.chart.axis('country', {
                grid: {
                    align: 'center',
                },
                tickLine: null,
                label: {
                    Offset: 10,
                    textStyle: {
                    textAlign: 'center', // 设置坐标轴 label 的文本对齐方向
                    },
                },
            });
            this.chart.legend('country', {
                 itemWidth: 50, // 设置图例项的宽度，使其在垂直方向上能够排列整齐
            });


            this.chart
                .interval()
                .position('country*cost')
                .color('country')
                .label('cost', {
                    offset: -15,
                    textStyle: {
                    textAlign: 'center',
                    fontSize: 11,
                    shadowBlur: 2,
                    shadowColor: 'rgba(0, 0, 0, .45)',
                    },
                })
                .style({
                    lineWidth: 1,
                    stroke: '#fff',
                });
                                
        },
        renderChart:function(){
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












