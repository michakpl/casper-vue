export default [
  {
    path: '/login',
    name: 'login.index',
    component: resolve => require(['@/pages/login/index.vue'], resolve)
  },

  {
    path: '/404',
    name: 'not-found.index',
    component: resolve => require(['@/pages/not-found/index.vue'], resolve)
  },

  {
    path: '/',
    name: 'home.index',
    component: resolve => require(['@/pages/home/index.vue'], resolve)
  },

  {
    path: '/*',
    redirect: '/404'
  }
]
