<template>
    <div style="width:100%;margin-top: -10px;">
        <p class="subtitle">积分变化趋势</p>
        <div id="trendChart" style="width: 100%; height: 20vh;"></div>
        <p>发现该同学在周二的学习积分最高</p>
    </div>
    
</template>

<script>
import * as echarts from "echarts";
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';
echarts.use([SVGRenderer, CanvasRenderer]);

export default {
    name: 'LearnScore',
    data() {
        return {

        }
    },
    mounted() {
        this.getTrendChart();
    },
    methods: {
        getTrendChart() {
            let myChart = echarts.init(document.getElementById("trendChart"), null, { renderer: 'svg' });
            var option;

            option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                grid: { // 让图表占满容器
                    top: "20px",
                    left: "40px",
                    right: "20px",
                    bottom: "30px"
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 10,
                        lineStyle: {
                            color: '#7BABF1',
                            width: 2,
                            type: 'dashed'
                        },
                        itemStyle: {
                            borderWidth: 2,
                            // borderColor: '#EE6666',
                            color: '#2847AD'
                        }
                    }
                ]
            };

            option && myChart.setOption(option);
        }
    }
}

</script>

<style scoped>
.text1 {
    font-size: 20px;
    color: #4B5B76;
    font-weight: 600;
}

.subtitle {
    font-size: 17px;
    color: #4B5B76;
    font-weight: 550;
    margin-top: 10px;
}

.label1 {
    font-size: 20px;
    font-weight: 700;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: green;
}

.label2 {
    font-size: 20px;
    font-weight: 700;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: lightcoral;
}

.label3 {
    font-size: 20px;
    font-weight: 700;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: grey;
}

.num {
    font-size: 20px;
    font-weight: 500;
    margin: 20px auto;
    width: 100px;
    text-align: right;
}
</style>