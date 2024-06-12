<template>
    <div id="BigClassManager">
      <div style="background-color: #0052d9; height: 70px; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
        <p v-if="teacherName" style="color: #ffffff; font-size: 20px; font-weight: bold;">{{ teacherName }}, 欢迎！</p>
        <p v-else style="color: #ffffff; font-size: 20px; font-weight: bold;">请登录！</p>
        <icon slot="icon" name="poweroff" class="icon"  @click="logout"/>
      </div>
  
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import { Icon } from 'tdesign-icons-vue';
  export default {
    name: 'BigClassManager',
    components: {
    Icon,
  },
    data() {
      return {
        teacherID: '',
        teacherName: '',
      };
    },
    created() {
      const teacher = localStorage.getItem('teacher');
      if (teacher) {
        // 解析JSON字符串为对象
        const teacherObject = JSON.parse(teacher);
        // 获取ID和名字
        this.teacherID = teacherObject.teacherid;
        this.teacherName = teacherObject.teachername;
      } else {
        console.error('No teacher information found in localStorage');
      }
    },
    methods: {
      logout() {
        // 提示用户是否确定退出
        if (confirm('您确定要退出登录吗？')) {
          // 处理退出登录的逻辑
          localStorage.removeItem('teacher');
          // 重定向到登录页或其他操作
          this.$router.push('/login');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  #BigClassManager {
    width: 100%;
  }
  .icon{
    color: #ffffff;
    font-size: 24px;
    cursor: pointer;
  }
  .icon:hover{
    color: #cccccc; /* 设置 hover 时变浅的颜色 */
  }
  </style>
  