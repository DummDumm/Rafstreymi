<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import WhyUs from './components/WhyUs.vue'
import Services from './components/Services.vue'
import ProjectSpotlight from './components/ProjectSpotlight.vue'
import CtaBanner from './components/CtaBanner.vue'
import FooterSection from './components/FooterSection.vue'
import RequestPage from './components/RequestPage.vue'
import TeamPage from './components/TeamPage.vue'

// Simple hash routing: "#/verkbeidni" shows the request page
// ("#/verkbeidni/takk" is the thank-you view after sending),
// "#/teymid" shows the team page, any other
// hash shows the home page (and scrolls to that section, e.g. "#thjonusta").
const REQUEST_HASH = '#/verkbeidni'
const THANKS_HASH = '#/verkbeidni/takk'
const TEAM_HASH = '#/teymid'
const page = ref('home')

async function onRoute() {
  const hash = window.location.hash
  page.value =
    hash === REQUEST_HASH ? 'request'
    : hash === THANKS_HASH ? 'thanks'
    : hash === TEAM_HASH ? 'team'
    : 'home'
  await nextTick()
  const target = page.value === 'home' && hash.length > 1 && document.querySelector(hash)
  if (target) target.scrollIntoView()
  else window.scrollTo({ top: 0 })
}

onMounted(() => {
  onRoute()
  window.addEventListener('hashchange', onRoute)
})
onUnmounted(() => window.removeEventListener('hashchange', onRoute))
</script>

<template>
  <NavBar :page="page" />
  <main v-if="page === 'request' || page === 'thanks'">
    <RequestPage :key="page" :sent="page === 'thanks'" />
  </main>
  <main v-else-if="page === 'team'">
    <TeamPage />
  </main>
  <main v-else>
    <Hero />
    <WhyUs />
    <Services />
    <ProjectSpotlight />
    <CtaBanner />
  </main>
  <FooterSection />
</template>
