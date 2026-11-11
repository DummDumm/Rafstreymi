<script setup>
import logo from '../assets/logo.png'
import { site } from '../data/site'
import { services } from '../data/services'
</script>

<template>
  <footer class="bg-brand-950 pb-28 pt-16 text-white/70 md:pb-10">
    <div class="wrap">
      <div class="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <img :src="logo" alt="Rafstreymi" class="h-10 w-auto brightness-0 invert" width="640" height="199" />
          <p class="mt-5 max-w-xs text-[15px] leading-relaxed">
            Rafstreymi er traustur samstarfsaðili í rafþjónustu fyrir heimili, fyrirtæki og iðnað um allt land.
          </p>
        </div>

        <nav aria-label="Þjónusta">
          <h2 class="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-white">Þjónusta</h2>
          <ul class="mt-5 space-y-3 text-[15px]">
            <li v-for="s in services" :key="s.id">
              <router-link :to="{ path: '/verkbeidni', query: { thjonusta: s.id } }" class="hover:text-white">
                {{ s.title }}
              </router-link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Fyrirtækið">
          <h2 class="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-white">Fyrirtækið</h2>
          <ul class="mt-5 space-y-3 text-[15px]">
            <li><router-link to="/um-okkur" class="hover:text-white">Um okkur</router-link></li>
            <li><router-link to="/verkefni" class="hover:text-white">Verkefni</router-link></li>
            <li><router-link to="/verkbeidni" class="hover:text-white">Senda verkbeiðni</router-link></li>
          </ul>
        </nav>

        <div>
          <h2 class="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-white">Hafðu samband</h2>
          <ul class="mt-5 space-y-3 text-[15px]">
            <li><a :href="site.phoneHref" class="font-display text-2xl font-bold text-white hover:text-glow-300">{{ site.phone }}</a></li>
            <li><a :href="`mailto:${site.email}`" class="hover:text-white">{{ site.email }}</a></li>
            <li>{{ site.address }}</li>
            <li>{{ site.hours }}</li>
          </ul>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row sm:justify-between">
        <p>© {{ new Date().getFullYear() }} {{ site.legalName }} Allur réttur áskilinn.</p>
        <p class="flex gap-6">
          <a href="#" class="hover:text-white">Persónuvernd</a>
          <a href="#" class="hover:text-white">Skilmálar</a>
        </p>
      </div>
    </div>
  </footer>
</template>
