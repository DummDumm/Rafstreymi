import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Hash history (…/#/um-okkur) is used because GitHub Pages cannot redirect
// unknown paths back to index.html. It also keeps FormSubmit's return link
// (…/#/verkbeidni/takk) working.
const RequestView = () => import('../views/RequestView.vue')

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/verkefni', name: 'projects', component: () => import('../views/ProjectsView.vue') },
    { path: '/um-okkur', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/verkbeidni', name: 'request', component: RequestView },
    { path: '/verkbeidni/takk', name: 'thanks', component: RequestView },
    // the old team page address still works
    { path: '/teymid', redirect: '/um-okkur' },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) {
      // wait for the page transition before scrolling to the section
      const delay = to.path === from.path ? 0 : 320
      return new Promise((resolve) => {
        setTimeout(() => resolve({ el: to.hash, top: 96, behavior: 'smooth' }), delay)
      })
    }
    return { top: 0 }
  },
})

export default router
