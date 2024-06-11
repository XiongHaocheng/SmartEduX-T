<template>
    <div>
      <h1>登录页面</h1>
      <button @click="login">登录</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginIndex',
    methods: {
      login() {
        this.$router.push('/index');
      }
    }
  };
  </script>
  
  <style scoped>
  /* 根据需要添加样式 */
  </style>
  