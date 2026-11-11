<script setup>
import { ShieldCheck, Clock, Users, Mail, Phone } from 'lucide-vue-next'
import { team, tel } from '../data/team'
import PageIntro from '../components/PageIntro.vue'
import HeroScene from '../components/HeroScene.vue'
import StatsBar from '../components/StatsBar.vue'
import QuoteSection from '../components/QuoteSection.vue'

const values = [
  { icon: Clock, title: 'Áreiðanleiki', text: 'Við mætum á réttum tíma og klárum verkið eins og lofað var.' },
  { icon: ShieldCheck, title: 'Fagmennska', text: 'Vottaðir rafvirkjar með áratuga reynslu að baki.' },
  { icon: Users, title: 'Nánd við viðskiptavini', text: 'Persónuleg þjónusta og skýr samskipti frá upphafi til enda.' },
]
</script>

<template>
  <div>
    <PageIntro
      eyebrow="Um okkur"
      title="Fólkið á bak við Rafstreymi"
      text="Við höfum starfað í rafiðnaði í yfir 20 ár og byggt fyrirtækið á fagmennsku, trausti og góðri þjónustu við viðskiptavini okkar."
    />
    <StatsBar />

    <section class="py-20 sm:py-28">
      <div class="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div class="aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lift">
          <HeroScene />
        </div>
        <div>
          <p class="eyebrow">Sagan okkar</p>
          <h2 class="section-title mt-3">Byggt á trausti, einu verki í einu</h2>
          <p class="mt-5 text-lg leading-relaxed text-ink/70">
            Rafstreymi var stofnað með það að markmiði að bjóða upp á áreiðanlega og faglega
            rafþjónustu fyrir heimili, fyrirtæki og iðnaðarhúsnæði um allt land. Frá upphafi höfum
            við lagt áherslu á gæði, öryggi og góð samskipti við hvern og einn viðskiptavin.
          </p>
          <p class="mt-4 text-lg leading-relaxed text-ink/70">
            Í dag samanstendur teymið okkar af vottuðum rafvirkjum með fjölbreytta reynslu, tilbúnum
            til að takast á við verkefni af öllum stærðum og gerðum.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-brand-900 py-20 text-white sm:py-28">
      <div class="wrap">
        <p class="eyebrow !text-glow-300">Gildin okkar</p>
        <h2 class="section-title mt-3 !text-white">Það sem við stöndum fyrir</h2>
        <ul class="mt-12 grid gap-6 md:grid-cols-3">
          <li v-for="v in values" :key="v.title" class="rounded-3xl bg-white/[0.06] p-8 ring-1 ring-white/10">
            <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-glow-400 text-brand-950">
              <component :is="v.icon" class="h-6 w-6" stroke-width="1.8" aria-hidden="true" />
            </span>
            <h3 class="mt-6 text-xl font-bold tracking-tight">{{ v.title }}</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-white/70">{{ v.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="py-20 sm:py-28">
      <div class="wrap">
        <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p class="eyebrow">Teymið</p>
            <h2 class="section-title mt-3">Eigendurnir mæta sjálfir</h2>
            <p class="mt-4 max-w-md text-lg leading-relaxed text-ink/70">
              Rafstreymi er í eigu Marinós og Jóhanns, sem sjá sjálfir um verkin og standa á bak við
              hvert þeirra. Hafðu beint samband eða sendu okkur verkbeiðni.
            </p>
            <router-link to="/verkbeidni" class="btn-primary mt-8">Senda verkbeiðni</router-link>
          </div>

          <ul class="grid gap-6 sm:grid-cols-2">
            <li v-for="m in team" :key="m.name" class="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-900/5">
              <div class="aspect-square bg-mist">
                <img :src="m.photo" :alt="m.name" loading="lazy" class="h-full w-full object-cover" width="800" height="800" />
              </div>
              <div class="p-6">
                <p class="font-display text-xl font-bold tracking-tight text-ink">{{ m.name }}</p>
                <p class="mt-1 text-[15px] font-medium text-brand-700">{{ m.title }}</p>
                <ul class="mt-5 space-y-2.5 text-[15px] text-ink/75">
                  <li class="flex items-center gap-3">
                    <Mail class="h-4 w-4 text-brand-700" aria-hidden="true" />
                    <a :href="`mailto:${m.email}`" class="hover:text-ink hover:underline">{{ m.email }}</a>
                  </li>
                  <li class="flex items-center gap-3">
                    <Phone class="h-4 w-4 text-brand-700" aria-hidden="true" />
                    <a :href="tel(m.phone)" class="hover:text-ink hover:underline">{{ m.phone }}</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <QuoteSection />
  </div>
</template>
