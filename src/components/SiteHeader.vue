<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X, Phone, Zap } from 'lucide-vue-next'
import logo from '../assets/logo.png'
import { site } from '../data/site'

const route = useRoute()
const open = ref(false)

const links = [
  { label: 'Heim', to: { path: '/' }, match: (r) => r.path === '/' && !r.hash },
  { label: 'Þjónusta', to: { path: '/', hash: '#thjonusta' }, match: (r) => r.hash === '#thjonusta' },
  { label: 'Verkefni', to: { path: '/verkefni' }, match: (r) => r.path === '/verkefni' },
  { label: 'Um okkur', to: { path: '/um-okkur' }, match: (r) => r.path === '/um-okkur' },
  { label: 'Hafðu samband', to: { path: '/', hash: '#tilbod' }, match: (r) => r.hash === '#tilbod' },
]

// close the mobile menu whenever the route changes
watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <header class="sticky top-0 z-50">
    <!-- Slim info bar: the number people look for when the power is out -->
    <div class="bg-brand-900 text-white">
      <div class="wrap flex h-9 items-center justify-between text-[13px]">
        <p class="flex items-center gap-2 font-medium">
          <Zap class="h-3.5 w-3.5 text-glow-400" aria-hidden="true" />
          Bilanaþjónusta allan sólarhringinn
        </p>
        <p class="hidden text-white/75 sm:block">{{ site.hours }}</p>
      </div>
    </div>

    <div class="border-b border-brand-900/10 bg-white/90 backdrop-blur-md">
      <div class="wrap flex h-[72px] items-center justify-between gap-6">
        <router-link to="/" class="shrink-0 rounded-md" aria-label="Rafstreymi – forsíða">
          <img :src="logo" alt="Rafstreymi rafverktakar" class="h-9 w-auto sm:h-10" width="640" height="199" />
        </router-link>

        <nav class="hidden items-center gap-1 lg:flex" aria-label="Aðalvalmynd">
          <router-link
            v-for="l in links"
            :key="l.label"
            :to="l.to"
            class="rounded-full px-4 py-2 text-[15px] font-medium transition"
            :class="l.match(route) ? 'bg-brand-50 text-brand-800' : 'text-ink/70 hover:text-ink'"
          >
            {{ l.label }}
          </router-link>
        </nav>

        <div class="flex items-center gap-3">
          <a
            :href="site.phoneHref"
            class="hidden items-center gap-2 rounded-full px-3 py-2 text-[15px] font-semibold text-brand-800 md:flex"
          >
            <Phone class="h-4 w-4" aria-hidden="true" />
            {{ site.phone }}
          </a>
          <router-link to="/verkbeidni" class="btn-primary hidden !min-h-[44px] sm:inline-flex">
            Fá tilboð
          </router-link>
          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-brand-900/15 text-ink lg:hidden"
            :aria-expanded="open"
            aria-controls="mobile-menu"
            :aria-label="open ? 'Loka valmynd' : 'Opna valmynd'"
            @click="open = !open"
          >
            <X v-if="open" class="h-5 w-5" aria-hidden="true" />
            <Menu v-else class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav v-if="open" id="mobile-menu" class="border-t border-brand-900/10 bg-white lg:hidden" aria-label="Valmynd">
        <div class="wrap flex flex-col py-3">
          <router-link
            v-for="l in links"
            :key="l.label"
            :to="l.to"
            class="rounded-xl px-3 py-3.5 text-[17px] font-medium"
            :class="l.match(route) ? 'bg-brand-50 text-brand-800' : 'text-ink'"
          >
            {{ l.label }}
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>
