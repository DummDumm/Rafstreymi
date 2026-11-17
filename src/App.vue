<script setup>
import { ref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import MobileCallBar from './components/MobileCallBar.vue'
import { pageLeaveStart, pageLeaveDone } from './router/pageTransition'

const main = ref(null)

// Hold the page height while one page swaps for the next, so the footer
// doesn't jump up into view for a moment and make the switch look like a reload.
function beforeLeave() {
  if (main.value) main.value.style.minHeight = `${main.value.offsetHeight}px`
  pageLeaveStart()
}
function afterLeave() {
  pageLeaveDone()
}
function afterEnter() {
  if (main.value) main.value.style.minHeight = ''
}
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift"
  >
    Beint í efni
  </a>
  <SiteHeader />
  <main id="main" ref="main">
    <router-view v-slot="{ Component, route }">
      <transition
        name="page"
        mode="out-in"
        @before-leave="beforeLeave"
        @after-leave="afterLeave"
        @after-enter="afterEnter"
        @enter-cancelled="afterEnter"
      >
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </main>
  <SiteFooter />
  <MobileCallBar />
</template>
