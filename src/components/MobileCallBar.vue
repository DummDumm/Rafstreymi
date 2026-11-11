<script setup>
import { Phone } from 'lucide-vue-next'
import { site } from '../data/site'
</script>

<template>
  <!-- Phones only: calling is always one thumb away -->
  <div class="fixed inset-x-0 bottom-0 z-40 border-t border-brand-900/10 bg-white/95 p-3 backdrop-blur md:hidden">
    <div class="flex gap-3">
      <a :href="site.phoneHref" class="btn-outline flex-1">
        <Phone class="h-4 w-4" aria-hidden="true" />
        Hringja
      </a>
      <router-link to="/verkbeidni" class="btn-primary flex-1">Fá tilboð</router-link>
    </div>
  </div>
</template>
