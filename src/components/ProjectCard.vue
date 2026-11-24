<script setup>
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight, Zap } from 'lucide-vue-next'

const props = defineProps({
  project: { type: Object, required: true },
  dark: { type: Boolean, default: false },
})

const images = computed(() => props.project.images || [])
const current = ref(0)

function go(step) {
  const n = images.value.length
  current.value = (current.value + step + n) % n
}

// swipe between photos on phones
let startX = null
function onTouchStart(e) {
  startX = e.touches[0].clientX
}
function onTouchEnd(e) {
  if (startX === null || images.value.length < 2) return
  const dx = e.changedTouches[0].clientX - startX
  if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
  startX = null
}
</script>

<template>
  <article class="group flex h-full flex-col">
    <div
      class="relative aspect-[4/3] overflow-hidden rounded-3xl"
      @touchstart.passive="onTouchStart"
      @touchend="onTouchEnd"
    >
      <template v-if="images.length">
        <img
          v-for="(src, i) in images"
          v-show="i === current"
          :key="src"
          :src="src"
          :alt="images.length > 1 ? `${project.title} – mynd ${i + 1} af ${images.length}` : project.title"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        <template v-if="images.length > 1">
          <button
            type="button"
            class="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition hover:bg-white"
            aria-label="Fyrri mynd"
            @click="go(-1)"
          >
            <ChevronLeft class="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-card transition hover:bg-white"
            aria-label="Næsta mynd"
            @click="go(1)"
          >
            <ChevronRight class="h-5 w-5" aria-hidden="true" />
          </button>
          <div class="absolute inset-x-0 bottom-3 flex justify-center gap-1.5" aria-hidden="true">
            <span
              v-for="(_, i) in images"
              :key="i"
              class="h-1.5 rounded-full bg-white transition-all"
              :class="i === current ? 'w-5' : 'w-1.5 opacity-60'"
            />
          </div>
        </template>
      </template>

      <!-- drawn placeholder until photos are added in src/data/projects.js -->
      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-700 to-brand-500 transition-transform duration-500 group-hover:scale-[1.04]"
        aria-hidden="true"
      >
        <svg class="absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none">
          <defs>
            <pattern :id="'pc-' + project.id" width="9" height="12" patternUnits="userSpaceOnUse">
              <rect width="1.6" height="12" fill="#000" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" :fill="`url(#pc-${project.id})`" />
        </svg>
        <span class="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30">
          <Zap class="h-10 w-10" stroke-width="1.5" />
        </span>
      </div>
    </div>
    <h3 class="mt-5 text-xl font-bold tracking-tight" :class="dark ? 'text-white' : 'text-ink'">{{ project.title }}</h3>
    <p class="mt-2 text-[15px] leading-relaxed" :class="dark ? 'text-white/70' : 'text-ink/65'">{{ project.description }}</p>
  </article>
</template>
