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
  </div>
</template>

<script lang="jsx">
import { CheckCircleFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue';
import { getTestRecordAPI } from '@/apis/teacherHandler';
const initialData = [];
export default {
  name: 'TestManage',
  data() {
    return {
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
  },
  methods: {
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
      const response = await getTestRecordAPI(); // 假设这里是获取后端数据的异步操作
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