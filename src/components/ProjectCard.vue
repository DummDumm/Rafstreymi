<script setup>
import { computed } from 'vue'
import { serviceById } from '../data/services'

const props = defineProps({
  project: { type: Object, required: true },
  dark: { type: Boolean, default: false },
})

const service = computed(() => serviceById[props.project.service])

// tint for the drawn placeholder, one per service
const tints = {
  heimili: ['#b24a3c', '#d9735f'],
  fyrirtaeki: ['#46627a', '#6f8ea8'],
  idnadur: ['#3d4a45', '#66756f'],
  hledsla: ['#27624a', '#56967a'],
  snjallheimili: ['#5a4a7a', '#8674a8'],
  vidhald: ['#8a6a1f', '#c79a35'],
}
const tint = computed(() => tints[props.project.service] || tints.hledsla)
</script>

<template>
  <article class="group flex h-full flex-col">
    <div class="relative aspect-[4/3] overflow-hidden rounded-3xl">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="project.title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <!-- drawn placeholder until a real photo is added in src/data/projects.js -->
      <div
        v-else
        class="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-[1.04]"
        :style="{ background: `linear-gradient(140deg, ${tint[0]}, ${tint[1]})` }"
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
          <component :is="service?.icon" class="h-10 w-10" stroke-width="1.5" />
        </span>
      </div>
      <span class="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-800 shadow-card">
        {{ service?.short }}
      </span>
    </div>
    <h3 class="mt-5 text-xl font-bold tracking-tight" :class="dark ? 'text-white' : 'text-ink'">{{ project.title }}</h3>
    <p class="mt-2 text-[15px] leading-relaxed" :class="dark ? 'text-white/70' : 'text-ink/65'">{{ project.description }}</p>
  </article>
</template>
