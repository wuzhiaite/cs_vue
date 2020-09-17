<template>
    <div id="bg1"></div>
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
                    container: 'bg1', // 指定图表容器 ID
                    height: 250, // 指定图表高度
                });
                this.chart.forceFit();
            },
            initData:function(){
                this.chartData = [
                    { item: 'Design', a: 70, b: 30 },
                    { item: 'Development', a: 60, b: 70 },
                    { item: 'Marketing', a: 50, b: 60 },
                    { item: 'Users', a: 40, b: 50 },
                    { item: 'Test', a: 60, b: 70 },
                    { item: 'Language', a: 70, b: 50 },
                    { item: 'Technology', a: 50, b: 40 },
                    { item: 'Support', a: 30, b: 40 },
                    { item: 'Sales', a: 60, b: 40 },
                    { item: 'UX', a: 50, b: 60 },
                ]
            },
            insertData:function(){
                this.chart.source(this.chartData)
                    .transform({
                        type: 'fold',
                        fields: ['a', 'b'], // 展开字段集
                        key: 'user', // key字段
                        value: 'score', // value字段
                    });
            },
            designChart:function(){

                this.chart.axis('time', {
                    line: null,
                    tickLine: null,
                    grid: {
                        line: {
                            style: {
                                lineDash: null,
                            },
                        },
                    },
                });
                this.chart.axis('score', {
                    line: null,
                    tickLine: null,
                    grid: {
                        line: {
                            type: 'line',
                            style: {
                                lineDash: null,
                            },
                        },
                    },
                });
                this.chart
                    .line()
                    .position('item*score')
                    .color('user')
                    .size(2);
                this.chart
                    .point()
                    .position('item*score')
                    .color('user')
                    .shape('circle')
                    .size(4)
                    .style({
                        stroke: '#fff',
                        lineWidth: 1,
                        fillOpacity: 1,
                    });
                this.chart
                    .area();

            },
            renderChart:function(){
                this.chart.render();
            }

        }

    }
</script>
<style scoped>

</style>












