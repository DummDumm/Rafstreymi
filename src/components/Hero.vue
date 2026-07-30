<script setup>
const badges = [
  { icon: '🛡️', label: 'Vottaðir rafvirkjar' },
  { icon: '✅', label: 'Sanngjarnt verð' },
  { icon: '⚡', label: 'Fljót og örugg þjónusta' },
]
</script>

<template>
  <section class="mx-auto max-w-content px-6 py-16 md:py-24">
    <div class="grid items-center gap-12 md:grid-cols-2">
      <div>
        <p class="eyebrow mb-4">Áreiðanleg rafþjónusta á Íslandi</p>
        <h1 class="text-4xl font-bold leading-tight text-ink-900 md:text-5xl">
          Við knýjum framtíðina
          <span class="block text-brand-600">með raforku</span>
        </h1>
        <p class="mt-6 max-w-md text-ink-600">
          Rafstreymi býður upp á trausta og faglega rafþjónustu fyrir heimili,
          fyrirtæki og iðnaðarhúsnæði um allt land.
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <a href="#samband" class="btn-primary">Fáðu tilboð →</a>
          <a href="#thjonusta" class="btn-secondary">Skoða þjónustu</a>
        </div>

        <ul class="mt-10 flex flex-wrap gap-6 text-sm text-ink-600">
          <li v-for="b in badges" :key="b.label" class="flex items-center gap-2">
            <span>{{ b.icon }}</span>{{ b.label }}
          </li>
        </ul>
      </div>

      <div class="overflow-hidden rounded-xl">
        <!-- replace src with the real hero photo -->
        <img
          src="https://placehold.co/700x520/e5e7eb/9ca3af?text=Hero+image"
          alt="Nútímalegt hús með raflögnum"
          class="h-full w-full object-cover"
        />
      </div>
    </div>
  </section>
</template>
