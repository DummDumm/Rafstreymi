<script setup>
defineProps({ page: { type: String, default: 'home' } })

const links = [
  { label: 'Heim', href: '#', page: 'home' },
  { label: 'Þjónusta', href: '#thjonusta' },
  { label: 'Verkefni', href: '#verkefni' },
  { label: 'Um okkur', href: '#um-okkur' },
  { label: 'Teymið', href: '#/teymid', page: 'team' },
  { label: 'Hafðu samband', href: '#samband' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-gray-100 bg-white">
    <div class="mx-auto flex max-w-content items-center justify-between px-6 py-4">
      <a href="#" class="flex items-center gap-2">
        <!-- swap for the real logo mark -->
        <span class="text-brand-600">⚡</span>
        <span>
          <span class="block text-sm font-bold leading-tight tracking-wide">RAFSTREYMI</span>
          <span class="block text-[10px] leading-tight text-ink-400">RAFVERKTAKAR</span>
        </span>
      </a>

      <nav class="hidden items-center gap-8 text-sm font-medium md:flex">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          class="pb-1"
          :aria-current="link.page && link.page === page ? 'page' : undefined"
          :class="link.page && link.page === page
            ? 'border-b-2 border-brand-600 text-brand-600'
            : 'text-ink-600 hover:text-ink-900'"
        >
          {{ link.label }}
        </a>
      </nav>

      <a href="#/verkbeidni" class="btn-primary">Fáðu tilboð →</a>
    </div>
  </header>
</template>
