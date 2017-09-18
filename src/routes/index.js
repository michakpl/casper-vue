export default [
  {
    path: '/login',
    name: 'login.index',
    component: resolve => require(['@/pages/login/index.vue'], resolve),

    meta: {
      guest: true
    }
  },

  {
    path: '/register',
    name: 'register.index',
    component: resolve => require(['@/pages/register/index.vue'], resolve),

    meta: {
      guest: true
    }
  },

  {
    path: '/404',
    name: 'not-found.index',
    component: resolve => require(['@/pages/not-found/index.vue'], resolve)
  },

  {
    path: '/',
    name: 'home.index',
    component: resolve => require(['@/pages/home/index.vue'], resolve),

    meta: {
      auth: true
    }
  },

  {
    path: '/*',
    redirect: '/404'
  }
]
