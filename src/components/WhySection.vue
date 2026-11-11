<script setup>
import { ShieldCheck, Clock, BadgeCheck, Users } from 'lucide-vue-next'

const reasons = [
  { icon: ShieldCheck, title: 'Traust og fagmennska', text: 'Vottaðir rafvirkjar með áratuga reynslu.' },
  { icon: Clock, title: 'Áreiðanleg þjónusta', text: 'Fljót viðbrögð og verkefni unnin á réttum tíma.' },
  { icon: BadgeCheck, title: 'Gæði í fyrirrúmi', text: 'Notum aðeins hágæða efni og búnað.' },
  { icon: Users, title: 'Viðskiptavinir í forgrunni', text: 'Hlutlaus ráðgjöf og lausnir sem henta þínum þörfum.' },
]
</script>

<template>
  <section class="py-20 sm:py-28">
    <div class="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <div class="lg:sticky lg:top-40 lg:self-start">
        <p class="eyebrow">Af hverju Rafstreymi?</p>
        <h2 class="section-title mt-3">Rafmagn á að vera í lagi. Punktur.</h2>
        <p class="mt-4 max-w-md text-lg leading-relaxed text-ink/70">
          Þú átt ekki að þurfa að hugsa um rafmagnið heima hjá þér. Við sjáum til þess að það sé
          öruggt, snyrtilega frágengið og virki eins og það á að gera.
        </p>
      </div>

      <ul class="grid gap-x-8 gap-y-10 sm:grid-cols-2">
        <li v-for="r in reasons" :key="r.title" class="border-t-2 border-brand-700 pt-6">
          <component :is="r.icon" class="h-7 w-7 text-brand-700" stroke-width="1.8" aria-hidden="true" />
          <h3 class="mt-4 text-xl font-bold tracking-tight text-ink">{{ r.title }}</h3>
          <p class="mt-2 text-[15px] leading-relaxed text-ink/65">{{ r.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
