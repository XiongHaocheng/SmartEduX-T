<template>
    <div style="width: 100%;margin-top: -10px;">
        <p class="subtitle">学习时间图表</p>
        <div id="timeChart" style="width: 100%; height: 20vh;"></div>
        <p>发现该同学在14:00-17:00较为活跃</p>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';
echarts.use([SVGRenderer, CanvasRenderer]);

export default {
    name: 'LearnTime',
    data() {
        return {

        }
    },
    mounted() {
        this.getTimeChart();
    },
    methods: {
        getTimeChart() {
            // var chartDom = document.getElementById('timeChart');
            // let myChart = echarts.init(document.getElementById('timeChart'));
            let myChart = echarts.init(document.getElementById("timeChart"), null, { renderer: 'svg' });
            let option = {
                tooltip: {
                    trigger: 'axis'
                },
                visualMap: [
                    {
                        show: false,
                        type: 'continuous',
                        seriesIndex: 0,
                        min: 0,
                        max: 500,
                        color: ['#BF2B2B', '#FBD5D5']
                    },
                ],
                grid: { // 让图表占满容器
                    top: "15px",
                    left: "40px",
                    right: "20px",
                    bottom: "30px"
                },
                xAxis: {
                    type: 'category',
                    data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [100, 1, 1, 1, 1, 8, 9, 23, 1, 1, 1, 1, 1, 1, 100, 1, 1, 150, 230, 224, 218, 135, 147, 260, 500],
                        type: 'line',
                        smooth: true
                    }
                ]
            };
            myChart.setOption(option);
        },
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
}

.custom-tabs {
    background-color: transparent !important;
    /* 取消背景颜色 */
}
</style>