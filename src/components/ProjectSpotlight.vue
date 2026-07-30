<script setup>
import { ref, computed } from 'vue'

// Replace with real project data / fetched content
const projects = [
  {
    title: 'Íbúðabyggð – Smáravellir',
    desc: 'Heildarraflagnir og lýsing í nýrri íbúðabyggð. Rafdreifitöflur, tengingar og lýsing á sameiginlegum svæðum.',
    image: 'https://placehold.co/700x420/1f2937/9ca3af?text=Project+image',
  },
  {
    title: 'Iðnaðarhúsnæði – Hafnarfjörður',
    desc: 'Uppsetning rafkerfa og lýsingar fyrir nýtt iðnaðarhúsnæði.',
    image: 'https://placehold.co/700x420/1f2937/9ca3af?text=Project+image',
  },
]

const index = ref(0)
const current = computed(() => projects[index.value])

function next() {
  index.value = (index.value + 1) % projects.length
}
function prev() {
  index.value = (index.value - 1 + projects.length) % projects.length
}
</script>

<template>
  <section id="verkefni" class="bg-brand-700 py-20 text-white">
    <div class="mx-auto grid max-w-content items-center gap-10 px-6 md:grid-cols-2">
      <div>
        <p class="eyebrow mb-3 text-brand-200">Verkefni</p>
        <h2 class="text-3xl font-bold">Verkefni sem við erum stolt af</h2>
        <p class="mt-4 max-w-md text-brand-100">
          Við höfum komið að fjölbreyttum verkefnum fyrir fyrirtæki, húsfélög og
          einstaklinga.
        </p>
        <a href="#" class="btn-secondary mt-8 border-white/40 text-white hover:bg-white/10">
          Skoða öll verkefni
        </a>
      </div>

      <div class="relative">
        <img :src="current.image" :alt="current.title" class="w-full rounded-lg" />

        <div class="mt-[-3rem] mx-4 rounded-lg bg-white p-5 text-ink-900 shadow-lg md:mx-6">
          <h3 class="font-semibold">{{ current.title }}</h3>
          <p class="mt-1 text-sm text-ink-600">{{ current.desc }}</p>
          <a href="#" class="mt-2 inline-block text-sm font-medium text-brand-600">Skoða verkefni →</a>
        </div>

        <button
          @click="prev"
          aria-label="Fyrra verkefni"
          class="absolute left-[-1.25rem] top-1/3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-brand-700 text-white"
        >‹</button>
        <button
          @click="next"
          aria-label="Næsta verkefni"
          class="absolute right-[-1.25rem] top-1/3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-brand-700 text-white"
        >›</button>
      </div>
    </div>
  </section>
</template>
