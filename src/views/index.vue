<template>
  <div class="tdesign-demo-item--layout">
    <t-layout class="full-height">
      <t-aside class="menu-aside">
        <t-menu theme="light" v-model="selectedMenu" class="menu" height="100%">
          <p style="font-size: 20px;color: #0052d9;font-weight: bold;">Smart-Edu-X-教师端</p>
          <t-menu-item value="calculation-1">
            <icon slot="icon" name="calculation-1" />
            课程管理
          </t-menu-item>
          <t-submenu value="resource">
            <template #title>
              <icon slot="icon" name="server" />
              学生管理
            </template>
            <t-menu-item value="student-info">
              学生信息管理
            </t-menu-item>
            <t-menu-item value="student-study">
              学生学习情况
            </t-menu-item>
          </t-submenu>
          <t-menu-item value="root">
            <icon slot="icon" name="root-list" />
            考试记录
          </t-menu-item>
          <t-menu-item value="personal-information">
            <icon slot="icon" name="personal-information" />
            个人中心
          </t-menu-item>
        </t-menu>
      </t-aside>
      <t-layout class="content-layout">
        <t-content class="content">
          <div v-if="selectedMenu === 'calculation-1'">
            <Header></Header>
            <BigClassManager></BigClassManager>
          </div>
          <div v-else-if="selectedMenu === 'student-info'">
            <Header></Header>
            <StudentInfoManage></StudentInfoManage>
          </div>
          <div v-else-if="selectedMenu === 'student-study'">
            <Header></Header>
            <StudentStudyManage></StudentStudyManage>
          </div>
          <div v-else-if="selectedMenu === 'root'">
            <Header></Header>
            <TestManage></TestManage>
          </div>
          <div v-else-if="selectedMenu === 'personal-information'">
            <Header></Header>
            <TeacherPerson></TeacherPerson>
          </div>
        </t-content>
      </t-layout>
    </t-layout>
  </div>
</template>

<script>
import { Icon } from 'tdesign-icons-vue';
import BigClassManager from '@/views/BigClassManager';
import StudentInfoManage from '@/views/StudentManage/StudentInfoManage';
import StudentStudyManage from '@/views/StudentManage/StudentStudyManage';
import TestManage from '@/views/TestManage';
import TeacherPerson from '@/views/TeacherPerson';
import Header from '@/components/header.vue';

export default {
  name: 'IndexPage',
  components: {
    Icon,
    BigClassManager,
    StudentInfoManage,
    StudentStudyManage,
    TestManage,
    TeacherPerson,
    Header,
  },
  data() {
    return {
      selectedMenu: 'calculation-1',
    };
  },
};
</script>

<style scoped>
.full-height {
  height: 100vh;
  display: flex;
}

.menu-aside {
  height: 100%;
}

.content-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  overflow: auto;
}
</style>