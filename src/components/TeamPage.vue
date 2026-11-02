<script setup>
import marino from '../assets/marino.jpg'
import johann from '../assets/Johann.jpg'

// TODO: emails and phone numbers are placeholders, swap for the real ones.
const team = [
  {
    name: 'Marinó Rafn Guðmundsson',
    title: 'Eigandi',
    photo: marino,
    email: 'marino@rafstreymi.is',
    phone: '555 0001',
  },
  {
    name: 'Jóhann Sindri Sveinsson',
    title: 'Eigandi',
    photo: johann,
    email: 'johann@rafstreymi.is',
    phone: '555 0002',
  },
]

const tel = (phone) => `tel:${phone.replace(/\s/g, '')}`
</script>

<template>
  <section class="bg-surface-light">
    <div class="mx-auto max-w-content px-6 py-14 md:py-20">
      <a href="#" class="text-sm font-medium text-brand-600 hover:text-brand-700">← Til baka á forsíðu</a>
      <p class="eyebrow mb-3 mt-6">Um okkur</p>
      <h1 class="text-3xl font-bold text-ink-900 md:text-4xl">Teymið</h1>
      <p class="mt-4 max-w-xl text-ink-600">
        Rafstreymi er í eigu Marinós og Jóhanns, sem sjá sjálfir um verkin og
        standa á bak við hvert þeirra. Hafðu beint samband eða sendu okkur verkbeiðni.
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-content px-6 py-14">
    <div class="grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
      <article
        v-for="person in team"
        :key="person.name"
        class="overflow-hidden rounded-xl border border-gray-100 shadow-sm"
      >
        <div class="aspect-square bg-gray-100">
          <img :src="person.photo" :alt="person.name" class="h-full w-full object-cover" loading="lazy" />
        </div>
        <div class="p-6">
          <h2 class="font-semibold text-ink-900">{{ person.name }}</h2>
          <p class="mt-1 text-sm text-brand-600">{{ person.title }}</p>
          <ul class="mt-4 space-y-2 text-sm text-ink-600">
            <li>
              ✉️ <a :href="`mailto:${person.email}`" class="hover:text-brand-700">{{ person.email }}</a>
            </li>
            <li>
              📞 <a :href="tel(person.phone)" class="hover:text-brand-700">{{ person.phone }}</a>
            </li>
          </ul>
        </div>
      </article>
    </div>

    <div class="mt-14 flex flex-col items-start gap-4 rounded-xl bg-brand-700 p-8 text-brand-100 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 class="font-semibold text-white">Ertu með verkefni?</h3>
        <p class="mt-1 text-sm">Sendu okkur verkbeiðni og við höfum samband innan eins virks dags.</p>
      </div>
      <a href="#/verkbeidni" class="btn bg-white text-brand-700 hover:bg-brand-50">Senda verkbeiðni →</a>
    </div>
  </section>
</template>
