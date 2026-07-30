<script setup>
const services = [
  { icon: '🏠', title: 'Heimilisþjónusta', desc: 'Raflagnir, lýsing, töfluskipti og viðhald fyrir heimili.' },
  { icon: '🏢', title: 'Fyrirtækjaþjónusta', desc: 'Rafkerfi, lýsing og viðhald fyrir fyrirtæki og húsfélög.' },
  { icon: '🏭', title: 'Iðnaðarþjónusta', desc: 'Hönnun og uppsetning rafkerfa fyrir iðnað.' },
  { icon: '🔌', title: 'Hleðslustöðvar', desc: 'Uppsetning hleðslustöðva fyrir rafbíla.' },
  { icon: '📶', title: 'Snjallheimili', desc: 'Sjálfvirknivæðing, lýsing og orkustýring.' },
  { icon: '🔧', title: 'Viðgerðir og viðhald', desc: 'Bilanaþjónusta og reglulegt viðhald rafkerfa.' },
]
</script>

<template>
  <section id="thjonusta" class="mx-auto max-w-content px-6 py-20">
    <div class="mx-auto max-w-xl text-center">
      <p class="eyebrow mb-3">Þjónusta</p>
      <h2 class="text-3xl font-bold text-ink-900">
        Við bjóðum upp á heildarlausnir í rafþjónustu
      </h2>
    </div>

    <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="s in services"
        :key="s.title"
        class="rounded-xl border border-gray-100 p-6 shadow-sm transition-shadow hover:shadow-md"
      >
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-xl text-brand-600">
          {{ s.icon }}
        </div>
        <h3 class="font-semibold text-ink-900">{{ s.title }}</h3>
        <p class="mt-2 text-sm text-ink-600">{{ s.desc }}</p>
        <a href="#" class="mt-4 inline-block text-sm font-medium text-brand-600 hover:text-brand-700">
          Skoða nánar →
        </a>
      </article>
    </div>
  </section>
</template>
