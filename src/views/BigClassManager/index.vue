<template>
  <div id="BigClassManager">
    <div>
      <div style="display: flex; height: 100%;padding: 10px; background-color: white">
        <t-table class="custom-table" rowKey="index" :data="data" :columns="columns" :stripe="stripe"
          :bordered="bordered" :hover="hover" :size="size" :table-layout="tableLayout ? 'auto' : 'fixed'"
          :pagination="pagination" :showHeader="showHeader" cellEmptyContent="-" resizable>
          <template #operation="{ row }">
            <input type="file" ref="fileInput" style="display: none" @change="handleFileChange">
            <div style="display: flex;">
              <t-link theme="primary" hover="color" @click="rehandleClickOp(row)">
                {{ row.status === 1 ? '查看详情' : '上传附件' }}
              </t-link>
              <svg v-if="row.status === 1" class="deleteIcon" width="20" height="20" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg" @click="deleteAttachement(row)">
                <path
                  d="M7.5 1H16.5V4H22V6H19.971L19.471 23H4.52898L4.02898 6H2V4H7.5V1ZM9.5 4H14.5V3H9.5V4ZM6.02984 6L6.47102 21H17.529L17.9702 6H6.02984ZM13 8V19H11V8H13Z"
                  fill="#0052d9" />
              </svg>
            </div>
          </template>
        </t-table>

      </div>
    </div>
  </div>
</template>

<script>
import { getBigcourseInfoAPI, uploadPDFAPI, getAttachmentPathAPI, deleteAttachmentAPI } from '@/apis/teacherHandler';
//数据
const initialData = [];
export default {
  name: 'BigClassManager',
  data() {
    return {
      data: initialData,
      size: 'medium',
      tableLayout: false,
      stripe: true,
      bordered: true,
      hover: true,
      showHeader: true,
      total: 0,
      selectedCourseId: null,
      columns: [
        { colKey: 'courseid', title: '课程号', width: '100' },
        { colKey: 'coursename', title: '课程名' },
        { colKey: 'coursedomain', title: '课程领域', ellipsis: true },
        { colKey: 'operation', title: '上传课程附件' },
      ],
      /** 非受控用法：与分页组件对齐 */
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10,
      },
    }
  },
  created() {
    // 检查本地存储中是否存在刷新标志
    if (!localStorage.getItem('pageReloaded')) {
      // 如果不存在，设置刷新标志并刷新页面
      localStorage.setItem('pageReloaded', 'true');
      window.location.reload();
    }
  },
  methods: {
    rehandleClickOp(row) {
      if (row.status === 1) {
        // 如果状态为 1，则执行查看详情的操作，即下载文件
        this.downloadAttachment(row);
      } else {
        // 如果状态为 0，则执行上传附件的操作
        this.$refs.fileInput.click();
        this.selectedCourseId = row.courseid
      }
    },
    //上传附件
    async handleFileChange(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }
      const fileName = file.name;
      const filepath = 'http://192.168.56.1:8081/'
      // 发送文件名上传请求到后端
      const courseid = parseInt(this.selectedCourseId)
      const response = await uploadPDFAPI(courseid, fileName, filepath);
      if (response.data.code == 0) {
        console.log("文件上传成功");
        const updatedRow = this.data.find(row => row.courseid === courseid);
        if (updatedRow) {
          updatedRow.status = 1; // 将 status 设为 1
        }
      } else {
        console.error("文件上传失败");
      }
    },
    //下载附件
    async downloadAttachment(row) {
      // 向后端请求获取附件的本地路径
      const response = await getAttachmentPathAPI(row.courseid);
      if (response.data.code == 0) {
        const attachmentPath = response.data.data;
        // 创建 <a> 元素并模拟点击下载
        var a = document.createElement('a');
        a.href = attachmentPath;
        a.download = '测试.pdf';
        document.body.appendChild(a);
        a.click();
      } else {
        console.error('获取附件路径失败');
      }
    },
    //获取大课程信息
    async getBigcourseInfoAPI() {
      const response = await getBigcourseInfoAPI();
      if (response.data.code == 0) {
        const responseData = response.data.data;
        Object.keys(responseData).forEach(key => {
          if (Object.prototype.hasOwnProperty.call(responseData, key)) {
            const course = responseData[key];
            const status = course.courseattachment ? 1 : 0;
            initialData.push({
              courseid: course.courseid,
              coursename: course.coursename,
              coursedomain: course.coursedomain,
              status: status
            });
            this.total++;
          }
        });
        // 更新分页组件中的 total 属性
        this.pagination.total = this.total;
      }
    },
    //删除附件
    async deleteAttachement(row) {
      if (confirm('您确定要删除该附件吗？')) {
        const response = await deleteAttachmentAPI(row.courseid);
        if (response.data.code == 0) {
          const updatedRow = this.data.find(row => row.courseid === row.courseid);
          if (updatedRow) {
            updatedRow.status = 0; // 将 status 设为 0
            window.location.reload()
          }
        }
      }
    }
  },
  async mounted() {
    await this.getBigcourseInfoAPI();
    localStorage.removeItem('pageReloaded');
  },
};
</script>

<style scoped>
#BigClassManager {
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

.deleteIcon {
  margin-left: 20px;
  cursor: pointer;
}

.deleteIcon:hover {
  filter: brightness(1.5);
}
</style>