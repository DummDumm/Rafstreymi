<script setup>
import { Phone, Mail, MapPin, Clock, ArrowRight, Camera, FileText, BadgeCheck } from 'lucide-vue-next'
import { site } from '../data/site'

const perks = [
  { icon: FileText, text: 'Ókeypis og óskuldbindandi verðtilboð' },
  { icon: Camera, text: 'Þú getur sent myndir af verkinu með' },
  { icon: BadgeCheck, text: 'Við höfum samband innan eins virks dags' },
]
</script>

<template>
  <section id="tilbod" class="bg-mist py-20 sm:py-28">
    <div class="wrap grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <div>
        <p class="eyebrow">Hafðu samband</p>
        <h2 class="section-title mt-3">Tilbúin í næsta verkefni?</h2>
        <p class="mt-4 max-w-md text-lg leading-relaxed text-ink/70">
          Hafðu samband við okkur og fáðu ókeypis ráðgjöf og verðtilboð.
        </p>

        <a :href="site.phoneHref" class="mt-10 flex items-center gap-5 rounded-3xl bg-brand-700 p-6 text-white transition hover:bg-brand-800">
          <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-glow-400 text-brand-950">
            <Phone class="h-6 w-6" aria-hidden="true" />
          </span>
          <span>
            <span class="block text-sm font-medium text-white/75">Fljótlegast er að hringja</span>
            <span class="block font-display text-4xl font-extrabold tracking-tight">{{ site.phone }}</span>
          </span>
        </a>

        <ul class="mt-8 space-y-4 text-[15px] text-ink/80">
          <li class="flex items-center gap-3">
            <Mail class="h-5 w-5 text-brand-700" aria-hidden="true" />
            <a :href="`mailto:${site.email}`" class="font-medium underline-offset-4 hover:underline">{{ site.email }}</a>
          </li>
          <li class="flex items-center gap-3">
            <MapPin class="h-5 w-5 text-brand-700" aria-hidden="true" />
            {{ site.address }}
          </li>
          <li class="flex items-center gap-3">
            <Clock class="h-5 w-5 text-brand-700" aria-hidden="true" />
            {{ site.hours }}
          </li>
        </ul>
      </div>

      <div class="flex flex-col rounded-3xl bg-white p-7 shadow-card sm:p-10">
        <h3 class="text-3xl font-bold tracking-tight text-ink">Senda verkbeiðni</h3>
        <p class="mt-3 text-lg leading-relaxed text-ink/65">
          Segðu okkur frá verkinu og við sendum þér verðtilboð. Það tekur um tvær mínútur.
        </p>
        <ul class="mt-8 space-y-5">
          <li v-for="p in perks" :key="p.text" class="flex items-center gap-4 text-[16px] font-medium text-ink">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <component :is="p.icon" class="h-5 w-5" stroke-width="1.9" aria-hidden="true" />
            </span>
            {{ p.text }}
          </li>
        </ul>
        <router-link to="/verkbeidni" class="btn-primary mt-auto w-full !min-h-[56px] !text-base max-lg:mt-10 lg:mt-10">
          Fylla út verkbeiðni
          <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </router-link>
      </div>
    </div>
  </section>
</template>
