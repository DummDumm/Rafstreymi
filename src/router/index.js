import { createRouter, createWebHashHistory } from 'vue-router'
import { afterPageLeave, nextFrame } from './pageTransition'

// All pages are bundled up front. The site is small, and loading a page only
// when it is clicked made every first visit to a page pause before it showed.
import HomeView from '../views/HomeView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import AboutView from '../views/AboutView.vue'
import RequestView from '../views/RequestView.vue'

// Hash history (…/#/um-okkur) is used because GitHub Pages cannot redirect
// unknown paths back to index.html. It also keeps FormSubmit's return link
// (…/#/verkbeidni/takk) working.
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/verkefni', name: 'projects', component: ProjectsView },
    { path: '/um-okkur', name: 'about', component: AboutView },
    { path: '/verkbeidni', name: 'request', component: RequestView },
    { path: '/verkbeidni/takk', name: 'thanks', component: RequestView },
    // the old team page address still works
    { path: '/teymid', redirect: '/um-okkur' },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  async scrollBehavior(to, from, saved) {
    const samePage = to.path === from.path

    // Moving to another page: wait until the old one has faded out,
    // then jump while the screen is empty, so the jump is never seen.
    if (!samePage) {
      await afterPageLeave()
      await nextFrame()
    }

    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 96, behavior: samePage ? 'smooth' : 'instant' }
    return { top: 0, behavior: 'instant' }
  },
})

export default router
