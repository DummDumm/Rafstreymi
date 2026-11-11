<script setup>
import { MessageSquareText, ClipboardCheck, Zap } from 'lucide-vue-next'

// A real sequence, so the numbers mean something.
const steps = [
  {
    icon: MessageSquareText,
    title: 'Þú hefur samband',
    text: 'Segðu okkur hvað þarf að gera, í síma eða með fyrirspurn hér á síðunni.',
  },
  {
    icon: ClipboardCheck,
    title: 'Við gerum tilboð',
    text: 'Þú færð ókeypis ráðgjöf og skýrt verðtilboð áður en nokkur vinna hefst.',
  },
  {
    icon: Zap,
    title: 'Verkið er unnið',
    text: 'Vottaðir rafvirkjar vinna verkið á umsömdum tíma og ganga vel frá.',
  },
]
</script>

<template>
  <section class="bg-mist py-20 sm:py-28">
    <div class="wrap">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow">Svona gengur þetta fyrir sig</p>
        <h2 class="section-title mt-3">Þrjú skref frá símtali að kveiktu ljósi</h2>
      </div>

      <ol class="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        <!-- the wire connecting the steps -->
        <span class="absolute left-[16.6%] right-[16.6%] top-8 hidden border-t-2 border-dashed border-brand-700/25 md:block" aria-hidden="true"></span>
        <li v-for="(s, i) in steps" :key="s.title" class="relative flex flex-col items-center text-center">
          <span class="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-700 text-white shadow-card">
            <component :is="s.icon" class="h-6 w-6" stroke-width="1.8" aria-hidden="true" />
            <span class="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-glow-400 text-xs font-bold text-brand-950">
              {{ i + 1 }}
            </span>
          </span>
          <h3 class="mt-6 text-xl font-bold tracking-tight text-ink">{{ s.title }}</h3>
          <p class="mt-2 max-w-xs text-[15px] leading-relaxed text-ink/65">{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
