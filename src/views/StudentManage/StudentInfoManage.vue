<template>

  <div id="StudentInfoManage">
    <!--搜索-->
    <div style="padding: 10px; background-color: #f5f5f5; display: flex; align-items: center;">
      <label for="search" style="margin-right: 10px;">搜索：</label>
      <input type="text" id="search" v-model="searchQuery" @input="handleSearch" placeholder="搜索你想要的"
        style="flex: 1; padding: 5px;border: none;border-radius: 10px;">
    </div>
    <!--表格-->
    <div style="display: flex; height: 100%;padding: 10px; background-color: white">
      <t-table class="custom-table" rowKey="index" :data="data" :columns="columns" :stripe="stripe" :bordered="bordered"
        :sort="sort" :hover="hover" :size="size" :table-layout="tableLayout ? 'auto' : 'fixed'" :pagination="pagination"
        :showHeader="showHeader" cellEmptyContent="-" resizable @sort-change="sortChange">
        <template #operation="{ row }">
          <div style="display: flex;">
            <t-link theme="primary" hover="color" @click="rehandleClickOp(row)">
              查看学习情况
            </t-link>

          </div>
        </template>
      </t-table>

    </div>
    <!--折线图-->
    <div id="sleep" style="height: 300px;margin-top: 20px;"></div>
    <div id="eat" style="height: 300px;margin-top: 20px;"></div>
  </div>
</template>

<script>
import { getUserInfoAPI, getUserStudyTimeAPI, getSleepChartInfoAPI, getEatChartInfoAPI } from '@/apis/teacherHandler';
import * as echarts from 'echarts';
const initialData = [];
export default {
  name: 'StudentInfoManage',
  data() {
    return {
      sleepChart: null,
      sleepOption: {
        backgroundColor: '#FFFFFF', // 设置背景颜色为白色
        title: {
          text: '近七天上课闭眼、打瞌睡次数'
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
      eatChart: null,
      eatOption: {
        backgroundColor: '#FFFFFF', // 设置背景颜色为白色
        title: {
          text: '近七天上课吃东西、打哈欠次数'
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
      tableLayout: false,
      stripe: true,
      bordered: true,
      hover: true,
      showHeader: true,
      total: 0,
      selecteduserId: null,
      columns: [
        { colKey: 'userid', title: '学号', width: '100' },
        { colKey: 'username', title: '姓名' },
        { colKey: 'userphone', title: '电话', },
        { colKey: 'userstudytime', title: '学习总时长（分钟）', sortType: 'all', sorter: true, },
        { colKey: 'userscore', title: '学习积分', sortType: 'all', sorter: true, },
        { colKey: 'operation', title: '学习情况' },
      ],
      /** 非受控用法：与分页组件对齐 */
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10,
      },
    }
  },
  async mounted() {
    await this.getUserInfoAPI();
    await this.getSleepChartInfoAPI();
    await this.getEatChartInfoAPI();
    this.initSleepChart();
    this.initEatChart();
    window.addEventListener('resize', this.chart.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chart.resize);
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
    initSleepChart() {
      this.sleepChart = echarts.init(document.getElementById('sleep'));
      this.sleepOption.xAxis.data = this.getLast7Days();
      this.sleepChart.setOption(this.sleepOption);
    
    },
    initEatChart(){
      this.eatChart = echarts.init(document.getElementById('eat'));
      this.eatOption.xAxis.data = this.getLast7Days();
      this.eatChart.setOption(this.eatOption);

    },
    //排序
    sortChange(sortInfo) {
      // 对于受控属性而言，这里的赋值很重要，不可缺少
      this.sort = sortInfo;
      this.request(sortInfo);
      //console.log('sort-change', sortInfo);
    },
    request(sort) {
      // 模拟异步请求，进行数据排序
      const timer = setTimeout(() => {
        if (sort) {
          this.data = initialData
            .concat()
            .sort((a, b) => (sort.descending ? b[sort.sortBy] - a[sort.sortBy] : a[sort.sortBy] - b[sort.sortBy]));
        } else {
          this.data = initialData.concat();
        }
        clearTimeout(timer);
      }, 100);
    },
    //搜索功能
    handleSearch() {
      if (this.searchQuery) {
        this.data = initialData.filter(item => {
          // 根据需要调整搜索条件，例如对特定字段进行搜索
          return Object.values(item).some(value =>
            String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        });
      } else {
        // 如果搜索框为空，则显示所有数据
        this.data = initialData;
      }
    },
    rehandleClickOp(row) {
      window.open(`/learndetail?userid=${row.userid}&username=${row.username}`, '_blank');
    },

    async getUserInfoAPI() {
      // 首先获取用户信息
      const userInfoResponse = await getUserInfoAPI();
      if (userInfoResponse.data.code == 0) {
        const userInfoData = userInfoResponse.data.data;
        const initialDataindex = [];
        // 构建一个userid到用户信息的映射
        const userInfoMap = {};
        Object.keys(userInfoData).forEach(key => {
          if (Object.prototype.hasOwnProperty.call(userInfoData, key)) {
            const user = userInfoData[key];
            userInfoMap[user.userid] = {
              userid: user.userid,
              username: user.username,
              userphone: user.userphone,
              userscore: user.userscore,
            };
          }
        });

        // 然后获取用户学习时长
        const userStudyTimeResponse = await getUserStudyTimeAPI();
        if (userStudyTimeResponse.data.code == 0) {
          const userStudyTimeData = userStudyTimeResponse.data.data;

          // 将学习时长添加到用户信息中
          Object.keys(userStudyTimeData).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(userStudyTimeData, key)) {
              const studyTimeUser = userStudyTimeData[key];
              if (userInfoMap[studyTimeUser.userid]) {
                userInfoMap[studyTimeUser.userid].userstudytime = studyTimeUser.totalStudyTime;
              }
            }
          });
        }
        // 将用户信息从映射转换回数组
        Object.keys(userInfoMap).forEach(key => {
          initialDataindex.push(userInfoMap[key]);
          initialData.push(userInfoMap[key]);
        });

        // 更新分页组件中的 total 属性
        this.total = initialDataindex.length;
        this.pagination.total = this.total;
        this.data = initialDataindex;
      }
    },
    async getSleepChartInfoAPI(){
     const response =  await getSleepChartInfoAPI()
     this.sleepOption.legend.data = response.data.data.data
     this.sleepOption.series = response.data.data.series
    },
    async getEatChartInfoAPI(){
      const response =  await getEatChartInfoAPI()
     
     this.eatOption.legend.data = response.data.data.data
     this.eatOption.series = response.data.data.series
    }
  }

}

</script>

<style scoped>
#StudentInfoManage {
  width: 100%;
}

.custom-table {
  margin-top: 20px;
  background-color: transparent !important;
  /* 取消背景颜色 */
}

.custom-tabs .t-tab-panel {
  background-color: transparent !important;
  /* 取消选项卡面板背景颜色 */
}

.t-table__body .t-tag span {
  display: inline-flex;
  align-items: center;
}

.link {
  cursor: pointer;
}
</style>