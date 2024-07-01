<template>
    <div style="width: 100%; margin-top: -10px; ">
        <p class="text1">积分变化趋势</p>
        <div id="trendChart" style="width: 100%; height: 25vh;"></div>
    </div>
</template>

<script>
import { getLearningProcessAPI, getIntegralRecordAPI } from "@/apis/teacherHandler"
import * as echarts from "echarts";
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';
echarts.use([SVGRenderer, CanvasRenderer]);
export default {
    name: 'LearnScore',
    data() {
        return {
            learningProgress: "0,0,0",
            progressArr: [0, 0, 0],
            record: [],
            date: [],
            score: []
        }
    },
    watch: {
        // 检测到learningProgress变化时，重新渲染图表
        learningProgress: {
            handler: function (val) {
                // 将字符串转为数组，以逗号分割
                let arr = val.split(",");
                this.progressArr = arr;
            },
            deep: true
        }
    },
    async mounted() {
        await this.getLearningProgress();
        await this.getIntegralRecord();
        this.generateDate();
        this.generateScore();
        this.getTrendChart();
    },
    methods: {
        getTrendChart() {
            let myChart = echarts.init(document.getElementById("trendChart"), null, { renderer: 'svg' });
            var option;

            option = {
                grid: { // 让图表占满容器
                    top: "15px",
                    left: "40px",
                    right: "20px",
                    bottom: "60px"
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        animation: true,
                    }
                },
                dataZoom: [
                    {
                        realtime: true,
                        start: 0,
                        end: 100,
                        bottom: 5
                    },
                    {
                        type: 'inside',
                        show: true,
                        realtime: true,
                        start: 0,
                        end: 100,
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        // prettier-ignore
                        data: this.date
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        type: 'line',
                        areaStyle: {},
                        lineStyle: {
                            width: 1
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        // prettier-ignore
                        data: this.score
                    },
                ]
            };

            option && myChart.setOption(option);
        },

        async getLearningProgress() {
            var userid = this.$route.query.userid;
            await getLearningProcessAPI(userid).then(res => {
                if (res.data.code == 0) {
                    this.learningProgress = res.data.data;
                }
            })
        },

        async getIntegralRecord() {
            var userid = this.$route.query.userid;
            try {
                const response = await getIntegralRecordAPI(userid);
                // 处理响应数据
                if (response.data.code == 0) {
                    this.record = response.data.data;
                    //console.log(this.record);
                } else {
                    console.error('Error fetching data:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        generateDate() {
            let startDate = new Date(this.record[0].date);

            // 生成日期记录
            let currentDate = new Date(startDate);
            let today = new Date(); // 当前日期

            while (currentDate <= today) {
                this.date.push(currentDate.toISOString().slice(0, 10)); // 将生成的日期记录存入date数组
                currentDate.setDate(currentDate.getDate() + 1); // 每次增加一天
            }
            // 打印生成的日期记录
            //console.log(this.date);
        },

        generateScore() {
            this.score = Array(this.date.length).fill(0);

            this.record.forEach(recordDate => {
                // 获取recordDate精确到天的日期
                let recordDateDay = recordDate.date.split(' ')[0];

                // 在date数组中查找对应的日期
                let index = this.date.findIndex(dateItem => dateItem === recordDateDay);

                if (index !== -1) {
                    // 找到对应的日期，将对应的得分加1
                    this.score[index]++;
                    //console.log(`找到日期 ${recordDateDay}，得分加1后为 ${this.score[index]}`);
                } else {
                    console.log(`${recordDateDay} 不在date数组中`);
                }
            });
            //console.log(this.score);
            for (let i = 1; i < this.score.length; i++) {
                this.score[i] += this.score[i - 1];
            }
            //console.log(this.score);
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