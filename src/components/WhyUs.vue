<script setup>
const features = [
  { icon: '🛡️', title: 'Traust og fagmennska', desc: 'Vottaðir rafvirkjar með áratuga reynslu.' },
  { icon: '⚡', title: 'Áreiðanleg þjónusta', desc: 'Fljót viðbrögð og verkefni unnið á réttum tíma.' },
  { icon: '✅', title: 'Gæði í fyrirrúmi', desc: 'Notum aðeins hágæða efni og búnað.' },
  { icon: '👥', title: 'Viðskiptavinir í forgrunni', desc: 'Hlutlaus ráðgjöf og lausnir sem henta þínum þörfum.' },
]
</script>

<template>
  <section class="bg-surface-light py-16">
    <div class="mx-auto max-w-content px-6">
      <p class="eyebrow mb-10 text-center">Af hverju Rafstreymi?</p>

      <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div v-for="f in features" :key="f.title" class="text-center">
          <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
            {{ f.icon }}
          </div>
          <h3 class="font-semibold text-ink-900">{{ f.title }}</h3>
          <p class="mt-2 text-sm text-ink-600">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
