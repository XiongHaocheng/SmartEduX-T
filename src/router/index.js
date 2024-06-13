import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login.vue';
import Register from '@/components/register.vue';
import Index from '@/views/index.vue';
import BigClassManager from '@/views/BigClassManager';
import StudentInfoManage from '@/views/StudentManage/StudentInfoManage';
import TestManage from '@/views/TestManage';
import TeacherPerson from '@/views/TeacherPerson';
import LearnDetail from '@/views/StudentManage/LearnDetail.vue';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/calculation-1',
          name: 'calculation-1',
          component: BigClassManager
        },
        {
          path: '/student-info',
          name: 'student-info',
          component: StudentInfoManage
        },
        {
          path: '/test',
          name: 'test',
          component: TestManage
        },
        {
          path: '/personal',
          name: 'personal',
          component: TeacherPerson
        }
      ]
    },
    {
      path: '/learndetail',
      name: 'learndetail',
      component: LearnDetail,
    },
  ]
});



export default router;
