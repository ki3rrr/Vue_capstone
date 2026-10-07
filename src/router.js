import { createRouter, createWebHashHistory } from 'vue-router'
import { useStore } from './store'
const v = n => () => import(`./views/${n}.vue`)
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/login', component: v('Login') },
    { path: '/register', component: v('Register') },
    { path: '/', component: v('Dashboard'), meta: { auth: true } },
    { path: '/lawyers', component: v('Lawyers'), meta: { auth: true } },
    { path: '/appointments', component: v('Appointments'), meta: { auth: true } },
    { path: '/profile', component: v('Profile'), meta: { auth: true, role: 'client' } },
    { path: '/clients', component: v('Clients'), meta: { auth: true, role: 'admin' } },
    { path: '/specializations', component: v('Specs'), meta: { auth: true, role: 'admin' } },
    { path: '/:p(.*)*', redirect: '/' }
  ]
})
router.beforeEach(to => {
  const u = useStore().user
  if (to.meta.auth && !u) return '/login'
  if (!to.meta.auth && u && to.path !== '/') return '/'
  if (to.meta.role && u?.role !== to.meta.role) return '/'
})
export default router
