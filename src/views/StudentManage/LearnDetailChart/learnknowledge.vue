<template>
    <div style="height: 100%;margin-top: -10px;">
        <p class="text1">知识掌握程度</p>
        <t-tabs class="custom-tabs" :value="value" theme="card" @change="handleTabChange">
            <t-tab-panel value="first" label="高等数学">
                <div id="first" style="width: 100%; height: 50vh;"></div>
            </t-tab-panel>
            <t-tab-panel value="second" label="线性代数">
                <div id="second" style="width: 100%; height: 50vh;"></div>
            </t-tab-panel>
            <t-tab-panel value="third" label="离散数学">
                <div id="third" style="width: 100%; height: 50vh;"></div>
            </t-tab-panel>
        </t-tabs>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';
echarts.use([SVGRenderer, CanvasRenderer]);

export default {
    name: 'LearnKnowledge',
    data() {
        return {
            value: 'first',
        }
    },
    mounted() {
        this.getRadarChart("first");
    },
    methods: {
        handleTabChange(newValue) {
            this.value = newValue;
            this.$nextTick(() => {
                this.getRadarChart(newValue);
            });
        },
        getRadarChart(id) {
            let chartDom = document.getElementById(id);
            if (chartDom) {
                let myChart = echarts.init(chartDom, null, { renderer: 'svg' });
                let option = {
                    color: ['#56A3F1', '#FF917C'],
                    legend: {
                        data: ['班级平均情况', '用户(您)'],
                        bottom: 0
                    },
                    tooltip: {
                        show: true
                    },
                    radar: {
                        indicator: [
                            { name: '加法', max: 100 },
                            { name: '减法', max: 100 },
                            { name: '乘法', max: 100 },
                            { name: '除法', max: 100 },
                            { name: '微分', max: 100 },
                            { name: '积分', max: 100 }
                        ]
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
                                    value: [20, 30, 20, 35, 50, 18],
                                    name: '班级平均情况',
                                    areaStyle: {
                                        color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                                            {
                                                color: 'rgba(56, 106, 197, 0.1)',
                                                offset: 0
                                            },
                                            {
                                                color: 'rgba(56, 106, 197, 1)',
                                                offset: 1
                                            }
                                        ])
                                    }
                                },
                                {
                                    value: [50, 14, 28, 26, 42, 21],
                                    name: '用户(您)',
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
}

.custom-tabs {
    background-color: transparent !important;
}
</style>
