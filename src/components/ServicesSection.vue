<script setup>
import { ArrowRight } from 'lucide-vue-next'
import { services } from '../data/services'
</script>

<template>
  <section id="thjonusta" class="py-20 sm:py-28">
    <div class="wrap">
      <div class="max-w-2xl">
        <p class="eyebrow">Þjónusta</p>
        <h2 class="section-title mt-3">Hvað getum við gert fyrir þig?</h2>
        <p class="mt-4 text-lg leading-relaxed text-ink/70">
          Við bjóðum upp á heildarlausnir í rafþjónustu. Veldu það sem á við og við sendum þér tilboð.
        </p>
      </div>

      <ul class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="s in services" :key="s.id">
          <router-link
            :to="{ path: '/verkbeidni', query: { thjonusta: s.id } }"
            class="group flex h-full flex-col rounded-3xl border border-brand-900/10 bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-brand-700/30 hover:shadow-lift"
          >
            <span
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-200 group-hover:bg-glow-400 group-hover:text-brand-950"
            >
              <component :is="s.icon" class="h-6 w-6" stroke-width="1.8" aria-hidden="true" />
            </span>
            <h3 class="mt-6 text-[1.35rem] font-bold tracking-tight text-ink">{{ s.title }}</h3>
            <p class="mt-2 flex-1 text-[15px] leading-relaxed text-ink/65">{{ s.description }}</p>
            <span class="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-brand-700">
              Fá tilboð
              <ArrowRight class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>
