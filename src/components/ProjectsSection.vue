<script setup>
import { ArrowRight } from 'lucide-vue-next'
import ProjectCard from './ProjectCard.vue'
import { projects } from '../data/projects'

const featured = projects.slice(0, 3)
</script>

<template>
  <section id="verkefni" class="bg-brand-900 py-20 text-white sm:py-28">
    <div class="wrap">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div class="max-w-2xl">
          <p class="eyebrow !text-glow-300">Verkefni</p>
          <h2 class="section-title mt-3 !text-white">Verkefni sem við erum stolt af</h2>
          <p class="mt-4 text-lg leading-relaxed text-white/70">
            Við höfum komið að fjölbreyttum verkefnum fyrir fyrirtæki, húsfélög og einstaklinga.
          </p>
        </div>
        <router-link to="/verkefni" class="btn-ghost-light">
          Skoða öll verkefni
          <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </router-link>
      </div>

      <div class="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="p in featured" :key="p.id" :project="p" dark />
      </div>
    </div>
  </section>
</template>
