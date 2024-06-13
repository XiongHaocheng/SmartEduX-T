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
  </div>
</template>

<script>
import { getUserInfoAPI, getUserStudyTimeAPI } from '@/apis/teacherHandler';
const initialData = [];
export default {
  name: 'StudentInfoManage',
  data() {
    return {
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
  },
  methods: {
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