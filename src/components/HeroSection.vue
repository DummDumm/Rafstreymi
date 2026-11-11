<script setup>
import { ref } from 'vue'
import { ArrowRight, Phone, Check, Lightbulb, LightbulbOff } from 'lucide-vue-next'
import HeroScene from './HeroScene.vue'
import { site } from '../data/site'

const lightsOn = ref(true)
const promises = ['Vottaðir rafvirkjar', 'Sanngjarnt verð', 'Fljót og örugg þjónusta']
</script>

<template>
  <section class="relative overflow-hidden bg-mist">
    <div class="wrap grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-16">
      <div>
        <p class="eyebrow">Áreiðanleg rafþjónusta á Íslandi</p>
        <h1 class="mt-4 text-[2.75rem] font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[4.4rem]">
          Rafvirkjar sem þú getur
          <span class="relative whitespace-nowrap">
            treyst
            <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
              <path d="M3 9 C50 2 120 2 197 8" fill="none" stroke="#ffc233" stroke-width="6" stroke-linecap="round" />
            </svg>
          </span>
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
          Rafstreymi býður upp á trausta og faglega rafþjónustu fyrir heimili, fyrirtæki og
          iðnaðarhúsnæði um allt land.
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <router-link to="/verkbeidni" class="btn-primary !min-h-[56px] !px-8 !text-base">
            Fá ókeypis tilboð
            <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </router-link>
          <a :href="site.phoneHref" class="btn-outline !min-h-[56px] !px-8 !text-base">
            <Phone class="h-4 w-4" aria-hidden="true" />
            Hringja í {{ site.phone }}
          </a>
        </div>

        <ul class="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[15px] font-medium text-ink/80">
          <li v-for="p in promises" :key="p" class="flex items-center gap-2">
            <span class="flex h-5 w-5 items-center justify-center rounded-full bg-brand-700 text-white">
              <Check class="h-3 w-3" stroke-width="3" aria-hidden="true" />
            </span>
            {{ p }}
          </li>
        </ul>
      </div>

      <!-- The scene, with a working light switch -->
      <div class="relative">
        <div class="aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[6/5]">
          <HeroScene :on="lightsOn" />
        </div>

        <div
          class="absolute inset-x-4 -bottom-6 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-lift sm:inset-x-auto sm:-left-6 sm:-bottom-6 sm:w-[20rem]"
        >
          <button
            type="button"
            role="switch"
            :aria-checked="lightsOn"
            aria-label="Kveikja og slökkva ljósin á myndinni"
            class="relative h-9 w-16 shrink-0 rounded-full transition-colors duration-300"
            :class="lightsOn ? 'bg-glow-400' : 'bg-brand-900'"
            @click="lightsOn = !lightsOn"
          >
            <span
              class="absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow transition-transform duration-300"
              :class="lightsOn ? 'translate-x-7' : 'translate-x-0'"
            >
              <Lightbulb v-if="lightsOn" class="h-4 w-4 text-glow-500" aria-hidden="true" />
              <LightbulbOff v-else class="h-4 w-4 text-brand-900" aria-hidden="true" />
            </span>
          </button>
          <div class="min-w-0 leading-snug" aria-live="polite">
            <template v-if="lightsOn">
              <p class="text-[15px] font-semibold text-ink">Ljósin eru kveikt</p>
              <p class="text-sm text-ink/60">Prófaðu að slökkva.</p>
            </template>
            <template v-else>
              <p class="text-[15px] font-semibold text-ink">Rafmagnslaust?</p>
              <p class="text-sm text-ink/60">
                Við kippum því í lag:
                <a :href="site.phoneHref" class="whitespace-nowrap font-semibold text-brand-700 underline underline-offset-2">{{ site.phone }}</a>
              </p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
