import { createRouter, createWebHashHistory } from 'vue-router';
import { user } from '@/service';
import { ElMessage } from 'element-plus'
import store from '@/store'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth"*/"../views/Auth/index.vue"),   
  },
  {
    path: '/',
    name: 'BasicLayout',
    redirect: '/auth',
    component: () => import(/* webpackChunkName: "BasicLayout"*/"../layout/BasicLayout/index.vue"),
    children:[ // 配置子路由
      {
        path: 'book',
        name: 'Book',
        component: () => import(/* webpackChunkName: "Book"*/"../views/Book/index.vue"),
      },
      {
        path: 'book/:id',
        name: 'BookDetail',
        component: () => import(/* webpackChunkName: "BookDetail"*/"../views/BookDetail/index.vue"),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "User"*/"../views/User/index.vue"),
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "Log"*/"../views/Log/index.vue"),
      },
      { 
        path: 'reset/password',
        name: 'ResetPassword',
        component: () => import(/* webpackChunkName: "ResetPassword"*/"../views/ResetPassword/index.vue"),
      },
      {
        path: 'inviteCode',
        name: 'InviteCode',
        component: () => import(/* webpackChunkName: "InviteCode"*/"../views/InviteCode/index.vue"),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile"*/"../views/Profile/index.vue"),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard"*/"../views/DashBoard/index.vue"),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// to是要去哪个页面的信息，from是从哪个页面来的信息,next是一个方法，可以进入下一页
router.beforeEach(async(to, from, next) => {
  let res = {};

  try {
    res = await user.info(); // 先获取用户信息并验证token
  } catch (e) {
    if (e.message.includes('code 401')) {
      res.code = 401;
    }
  }

  const { code } = res;

  if (code === 401) {
    if (to.path === '/auth') {
      next();
      return;
    }

    ElMessage({
      type: 'error',
      message: '认证失败，请重新登入'
    })
    next('/auth');

    return;
  }
  // 拿到数据后再进入下一页
  // 取到一次权限的数据即可，后续不用再请求
  if(!store.state.characterInfo.length) {
    console.log('sssss');
    // 通过dispatch触发到actions
    await store.dispatch('getCharacterInfo')
  }

  const reqArr = [];

  if(!store.state.userInfo.account) {
    reqArr.push(store.dispatch('getUserInfo'))
  }

  await Promise.all(reqArr);

  if(to.path === '/auth') {
    next('/book');
    return;
  }

  next();
});

export default router;
