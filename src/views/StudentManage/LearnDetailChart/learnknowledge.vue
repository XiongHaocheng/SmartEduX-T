<template>
    <div style="height: 100%;margin-top: -10px;">
        <p class="text1">知识掌握程度</p>
        <template>
            <t-tabs class="custom-tabs" :value="value" theme="card" @change="handleTabChange">
                <t-tab-panel v-for="(item, index) in domain" :key="index" :value="'domain-' + index" :label="item">
                </t-tab-panel>
                <div :id="'radarchart'" style="width: 100%; height: 55vh;"></div>
            </t-tabs>
        </template>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { getAllDomain, getRadarDataByIDAndDomain } from "@/apis/teacherHandler"
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';
echarts.use([SVGRenderer, CanvasRenderer]);

export default {
    name: 'LearnKnowledge',
    data() {
        return {
            value: 'domain-0',
            activeDomain: "高等数学",
            domain: ["高等数学", "线性代数", "离散数学"],
            indicator: [
                { name: '加法', max: 100 },
                { name: '减法', max: 100 },
                { name: '乘法', max: 100 },
                { name: '除法', max: 100 },
                { name: '微分', max: 100 },
                { name: '积分', max: 100 }
            ],
            knowledgevalue: [50, 14, 28, 26, 42, 21],
            knowledge: []
        }
    },
    async mounted() {
        this.getTimeChart();
        this.getActChart();
        this.getRadarChart();
        await this.getDomian();
        await this.getRadarData();
    },
    methods: {
        async getRadarData() {
            await getRadarDataByIDAndDomain(this.$route.query.userid, this.activeDomain).then(res => {
                if (res.data.code == 0) {
                    this.knowledge = res.data.data
                    this.processKnowledgeData()
                }
            })
        },
        processKnowledgeData() {
            this.knowledgevalue = []
            this.knowledge.forEach(item => {
                this.knowledgevalue.push(parseInt(item.correctrate * 100))
            })
            this.indicator = []
            this.knowledge.forEach(item => {
                this.indicator.push({ name: item.knowledgecontent, max: 100 })
            })
            this.getRadarChart()
        },
        async getDomian() {
            // 获取领域数据
            var userid = this.$route.query.userid
            await getAllDomain(userid).then(res => {
                if (res.data.code == 0) {
                    this.domain = res.data.data
                    this.activeDomain = this.domain[0]
                }
            })
        },
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
        getRadarChart() {
            let chartDom = document.getElementById("radarchart");
            if (chartDom) {
                let myChart = echarts.init(chartDom, null, { renderer: 'svg' });
                let option = {
                    color: ['#FF917C'],
                    legend: {
                        data: ['各个知识点掌握情况(%)'],
                        bottom: 0
                    },
                    tooltip: {
                        show: true
                    },
                    radar: {
                        indicator: this.indicator
                    },
                    series: [
                        {
                            type: 'radar',
                            emphasis: {
                                lineStyle: {
                                    width: 3
                                },
                                focus: 'self',
                                blurScope: 'global',
                                label: true
                            },
                            data: [
                                {
                                    value: this.knowledgevalue,
                                    name: '各个知识点掌握情况(%)',
                                    areaStyle: {
                                        color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                                            {
                                                color: 'rgba(255, 145, 124, 0.1)',
                                                offset: 0
                                            },
                                            {
                                                color: 'rgba(255, 145, 124, 1)',
                                                offset: 1
                                            }
                                        ])
                                    }
                                }
                            ]
                        }
                    ]
                };
                myChart.setOption(option);
            }
        },
        async handleTabChange(newValue) {
            this.value = newValue;
            this.activeDomain = this.domain[parseInt(newValue.split("-")[1])]
            await this.getRadarData();
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

.custom-tabs {
    background-color: transparent !important;
}
</style>
