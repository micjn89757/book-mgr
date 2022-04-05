import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth"*/"../views/Auth/index.vue"),
  },
  {
    path: '/',
    name: 'BasicLayout',
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
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
