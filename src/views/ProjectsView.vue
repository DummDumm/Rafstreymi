<script setup>
import PageIntro from '../components/PageIntro.vue'
import ProjectCard from '../components/ProjectCard.vue'
import QuoteSection from '../components/QuoteSection.vue'
import { projects } from '../data/projects'
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
        <div class="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
        </div>
      </div>
    </section>

    <QuoteSection />
  </div>
</template>
