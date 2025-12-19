import { createRouter, createWebHistory } from 'vue-router'
import Index from "../views/Index.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/404.vue";
import Login from "../views/Login.vue";
import Home from '@/views/Home.vue';
import UserInfo from '@/views/UserInfo.vue';

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path:'/index',
    name:'index',
    component:Index,
    // ?children不能写name否则无法跳转
    children:[
      {path:'',component:Home},
      {path:'/home',component:Home},
      {path:'/userInfo',component:UserInfo}
    ]
  },
  {
    path:'/register',
    name:'register',
    component:Register
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/:pathMatch(.*)*',
    name:'NotFound',
    component:NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  // 登录或者注册页面可以直接访问，其他页面访问需要有token
  if(to.path === '/login' || to.path === '/register') {
    next();
  } else {
    if(token) {
      next();
    } else {
      next('/login');
    }
  }
});

export default router;
