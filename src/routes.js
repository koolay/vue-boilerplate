import VueRouter from 'vue-router'
import auth from './services/auth'
import Home from './components/Home.vue'
import Login from './components/auth/Login'
import Profile from './components/admin/Profile'

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

var router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home, meta: { title: 'home' } },
    // { path: '/about', component: About, meta: { title: 'about' } },
    { path: '/login', component: Login },
    { path: '/admin/profile', component: Profile, beforeEnter: requireAuth },
    {
      path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    }
  ]
})

export {
  router
}
