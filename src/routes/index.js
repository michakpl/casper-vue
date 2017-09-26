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
    path: '/map',
    name: 'map.index',
    component: resolve => require(['@/pages/map/index.vue'], resolve)
  },

  {
    path: '/event/add',
    name: 'event.add',
    component: resolve => require(['@/pages/event/create.vue'], resolve),

    meta: {
      auth: true
    }
  },

  {
    path: '/event/:id',
    name: 'event.show',
    component: resolve => require(['@/pages/event/show.vue'], resolve),
    props: true
  },

  {
    path: '/:page',
    name: 'home.index-with-page',
    component: resolve => require(['@/pages/home/index.vue'], resolve),
    props: true
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
