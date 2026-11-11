<script setup>
import { ref, computed } from 'vue'
import PageIntro from '../components/PageIntro.vue'
import ProjectCard from '../components/ProjectCard.vue'
import QuoteSection from '../components/QuoteSection.vue'
import { projects } from '../data/projects'
import { services } from '../data/services'

const active = ref('all')

// only offer filters that actually have projects
const filters = computed(() => [
  { id: 'all', label: 'Allt' },
  ...services.filter((s) => projects.some((p) => p.service === s.id)).map((s) => ({ id: s.id, label: s.short })),
])

const visible = computed(() => (active.value === 'all' ? projects : projects.filter((p) => p.service === active.value)))
</script>

<template>
  <div>
    <PageIntro
      eyebrow="Verkefni"
      title="Verkefni sem við erum stolt af"
      text="Við höfum komið að fjölbreyttum verkefnum fyrir fyrirtæki, húsfélög og einstaklinga."
    />

    <section class="py-14 sm:py-20">
      <div class="wrap">
        <div class="flex flex-wrap gap-2" role="group" aria-label="Sía verkefni eftir þjónustu">
          <button
            v-for="f in filters"
            :key="f.id"
            type="button"
            :aria-pressed="active === f.id"
            class="min-h-[44px] rounded-full border px-5 text-[15px] font-semibold transition"
            :class="active === f.id ? 'border-brand-700 bg-brand-700 text-white' : 'border-brand-900/15 bg-white text-ink/75 hover:border-brand-700/50'"
            @click="active = f.id"
          >
            {{ f.label }}
          </button>
        </div>

        <div class="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="p in visible" :key="p.id" :project="p" />
        </div>
      </div>
    </section>

    <QuoteSection />
  </div>
</template>
