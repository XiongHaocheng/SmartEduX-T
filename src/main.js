import Vue from 'vue'
import App from './App.vue'
import TDesign from 'tdesign-vue';
import router from './router';
Vue.use(TDesign);
// 引入组件库的少量全局样式变量
import 'tdesign-vue/es/style/index.css';
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
