<script setup>
import { stats } from '../data/site'
</script>

<template>
  <section class="bg-mist pb-16 pt-6 sm:pt-0" aria-label="Rafstreymi í tölum">
    <div class="wrap">
      <dl class="grid grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-card lg:grid-cols-4">
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          class="flex flex-col-reverse gap-1 px-6 py-7 sm:px-8"
          :class="[i % 2 ? 'border-l border-brand-900/10' : '', i > 1 ? 'border-t border-brand-900/10 lg:border-t-0' : '', i === 2 ? 'lg:border-l' : '']"
        >
          <dt class="text-sm font-medium text-ink/60">{{ s.label }}</dt>
          <dd class="font-display text-4xl font-extrabold tracking-tight text-brand-700 sm:text-5xl">{{ s.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
