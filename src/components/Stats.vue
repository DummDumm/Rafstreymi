<script setup>
const stats = [
  { value: '500+', label: 'Verkefni lokið' },
  { value: '20+', label: 'Ára reynsla' },
  { value: '98%', label: 'Ánægðir viðskiptavinir' },
  { value: '24/7', label: 'Viðbragðsþjónusta' },
]
</script>

<template>
  <section class="py-16">
    <div class="mx-auto max-w-content px-6">
      <p class="eyebrow mb-10 text-center">Raftölur</p>
      <div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        <div v-for="s in stats" :key="s.label">
          <p class="text-4xl font-bold text-brand-600">{{ s.value }}</p>
          <p class="mt-1 text-sm text-ink-600">{{ s.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
