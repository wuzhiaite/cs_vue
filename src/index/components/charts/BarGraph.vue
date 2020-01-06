<template>
    <div>
        <div id="bg1"></div>
        <!-- <div>
            <el-button size="mini" type="primary" @click="changeCordinate">改变宽高</el-button>
            <el-button size="mini" type="success">成功按钮</el-button>
            <el-button size="mini" type="info">信息按钮</el-button>
        </div> -->
    </div>    
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
                    { genre: 'Sports', sold: 275 },
                    { genre: 'Strategy', sold: 115 },
                    { genre: 'Action', sold: 120 },
                    { genre: 'Shooter', sold: 350 },
                    { genre: 'Other', sold: 150 },
                    ];
        },
        insertData:function(){
            this.chart.guide().clear();// 清理guide
            this.chart.repaint()
            this.chart.source(this.chartData);     
            // this.chart.legend({
            //     title: "这大概就是命吧", // 不展示图例的标题
            //     marker: 'square', // 设置图例 marker 的显示样式
            // });



        },
        designChart:function(){
            this.chart
                .interval()
                .position('genre*sold')
                .color('genre');

        },
        renderChart:function(){
            this.chart.render();
        },
        changeCordinate:function(){
            // this.chart.coord('rect').scale(0.7, 1.2);
            this.chart.coord().rotate(90).scale(1.3, 5).reflect('genre').transpose();
        }

    }

}
</script>
<style scoped>
#bg1{
    display:inline-block;
}
</style>












