<template>
  <div id="TestManage">
    <!--搜索-->
    <div style="padding: 10px; background-color: #f5f5f5; display: flex; align-items: center;">
      <label for="search" style="margin-right: 10px;">搜索：</label>
      <input type="text" id="search" v-model="searchQuery" @input="handleSearch" placeholder="搜索你想要的"
        style="flex: 1; padding: 5px;border: none;border-radius: 10px;">
    </div>
    <!--表格-->
    <div style="display: flex; height: 100%;padding: 10px; background-color: white">
      <t-table rowKey="index" :data="data" :columns="columns" :stripe="stripe" :bordered="bordered" :hover="hover"
        :size="size" :table-layout="tableLayout ? 'auto' : 'fixed'" :pagination="pagination" :showHeader="showHeader"
        cellEmptyContent="-" resizable></t-table>
    </div>
    <!--折线图-->
    <div id="test" style="height: 300px;margin-top: 20px;"></div>
  </div>
</template>

<script lang="jsx">
import { CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';
import { getTestRecordAPI, getTestChartInfoAPI } from '@/apis/teacherHandler';
import * as echarts from 'echarts';
const initialData = [];
export default {
  name: 'TestManage',
  data() {
    return {
      testChart: null,
      testOption: {
        backgroundColor: '#FFFFFF', // 设置背景颜色为白色
        title: {
          text: '近七天考试违规检测次数'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value'
        },
        series: [],
      },
      searchQuery: '',//搜索内容
      data: initialData,
      size: 'medium',
      tableLayout: true,
      stripe: true,
      bordered: true,
      hover: false,
      showHeader: true,
      total: null,
      columns: [
        { colKey: 'testID', title: '考试号' },
        { colKey: 'userName', title: '学生名' },
        { colKey: 'testPaperName', title: '试卷名' },
        { colKey: 'startTime', title: '考试开始时间' },
        {
          colKey: 'finishstate',
          title: '是否完成考试',
          cell: (h, { row }) => {
            const statusNameListMap = {
              0: { label: '否', theme: 'danger', icon: <CloseCircleFilledIcon /> },
              1: { label: '是', theme: 'success', icon: <CheckCircleFilledIcon /> },
            };
            return (
              <t-tag shape="round" theme={statusNameListMap[row.finishstate].theme} variant="light-outline">
                {statusNameListMap[row.finishstate].icon}
                {statusNameListMap[row.finishstate].label}
              </t-tag>
            );
          },
        },
        { colKey: 'testFullScore', title: '考试满分' },
        { colKey: 'userScore', title: '考生得分' },
        {
          colKey: 'ispass',
          title: '是否通过',
          cell: (h, { row }) => {
            const statusNameListMap = {
              0: { label: '否', theme: 'danger', icon: <CloseCircleFilledIcon /> },
              1: { label: '是', theme: 'success', icon: <CheckCircleFilledIcon /> },
            };
            return (
              <t-tag shape="round" theme={statusNameListMap[row.ispass].theme} variant="light-outline">
                {statusNameListMap[row.ispass].icon}
                {statusNameListMap[row.ispass].label}
              </t-tag>
            );
          },
        },
      ],
      /** 非受控用法：与分页组件对齐 */
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 5,
      },
    };
  },
  async mounted() {
    await this.getTestRecordAPI();
    await this.getTestChartInfoAPI();
    this.initTestChart();
    window.addEventListener('resize', this.chart.resize);
  },
  methods: {
    getLast7Days() {
      const result = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const weekDay = ['周天', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
        result.push(`${weekDay} ${month}/${day}`);
      }
      return result;
    },
    initTestChart() {
      this.testChart = echarts.init(document.getElementById('test'));
      this.testOption.xAxis.data = this.getLast7Days();
      this.testChart.setOption(this.testOption);

    },
    async getTestChartInfoAPI() {
      const response = await getTestChartInfoAPI()
      console.log(response)
      this.testOption.legend.data = response.data.data.data
      this.testOption.series = response.data.data.series
    },
    //搜索功能
    handleSearch() {
      const statusNameListMap = {
        finishstate: {
          0: '否',
          1: '是'
        },
        ispass: {
          0: '否',
          1: '是'
        }
      };

      if (this.searchQuery) {
        this.data = initialData.filter(item => {
          // 根据需要调整搜索条件，例如对特定字段进行搜索
          return Object.keys(item).some(key => {
            let value = item[key];
            if (key === 'finishstate' || key === 'ispass') {
              value = statusNameListMap[key][value];
            }
            return String(value).toLowerCase().includes(this.searchQuery.toLowerCase());
          });
        });
      } else {
        // 如果搜索框为空，则显示所有数据
        this.data = initialData;
      }
    },
    async getTestRecordAPI() {
      initialData.length = 0;
      this.total = 0;
      const response = await getTestRecordAPI();
      if (response.data.code == 0) {
        const responseData = response.data.data;
        Object.keys(responseData).forEach(key => {
          if (Object.prototype.hasOwnProperty.call(responseData, key)) {
            const test = responseData[key];
            initialData.push({
              testID: test.testrecordid,
              userName: test.username,
              testPaperName: test.testpapername,
              startTime: test.starttime,
              finishstate: parseInt(test.finishstate),
              testFullScore: test.fullscore,
              userScore: test.testscore,
              ispass: parseInt(test.ispass)
            });
            this.total++;
          }
        });
        // 更新分页组件中的 total 属性
        this.pagination.total = this.total;
      }

    }
  }
};
</script>
<style lang="less">
.t-table__body .t-tag span {
  display: inline-flex;
  align-items: center;
}
</style>