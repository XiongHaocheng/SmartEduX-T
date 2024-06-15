<template>
    <div style="width: 100%;margin-top: -10px; ">
        <p class="text1">学习活跃度图表</p>
        <div id="actChart" style="width: 100%; height: 20vh;"></div>
        <p>发现该同学在12月份较为活跃</p>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';
echarts.use([SVGRenderer, CanvasRenderer]);

export default {
    name: 'LearnActivity',
    data() {
        return {

        }
    },
    mounted() {
        this.getActChart();
    },
    computed: {

    },
    methods: {
        getActChart() {
            let myChart = echarts.init(document.getElementById("actChart"), null, { renderer: 'svg' });
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
                        color: ['#242EC9', '#A5CDFF']
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
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [100, 1, 189, 10, 133, 80, 90, 23, 222, 1, 1, 500],
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