<script setup>
const columns = [
  {
    title: 'Þjónusta',
    links: ['Heimilisþjónusta', 'Fyrirtækjaþjónusta', 'Iðnaðarþjónusta', 'Hleðslustöðvar', 'Viðgerðir og viðhald'],
  },
  {
    title: 'Fyrirtækið',
    links: ['Um okkur', 'Verkefni', 'Vottanir', 'Fréttir', 'Störf hjá okkur'],
  },
]
</script>

<template>
  <footer class="bg-brand-800 py-14 text-brand-100">
    <div class="mx-auto grid max-w-content gap-10 px-6 md:grid-cols-4">
      <div>
        <div class="flex items-center gap-2 text-white">
          <span>⚡</span>
          <span class="text-sm font-bold tracking-wide">RAFSTREYMI</span>
        </div>
        <p class="mt-4 text-sm">
          Rafstreymi er traustur samstarfsaðili í rafþjónustu fyrir heimili,
          fyrirtæki og iðnað um allt land.
        </p>
        <div class="mt-4 flex gap-3 text-sm">
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="Instagram">📷</a>
          <a href="#" aria-label="LinkedIn">💼</a>
        </div>
      </div>

      <div v-for="col in columns" :key="col.title">
        <h4 class="text-sm font-semibold text-white">{{ col.title }}</h4>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="l in col.links" :key="l"><a href="#" class="hover:text-white">{{ l }}</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-sm font-semibold text-white">Hafðu samband</h4>
        <ul class="mt-4 space-y-2 text-sm">
          <li>📍 Bæjarhálsi 2, 110 Reykjavík</li>
          <li>✉️ info@rafstreymi.is</li>
          <li>📞 519 1616</li>
          <li>🕐 Opið alla virka daga 07:30 – 16:00</li>
        </ul>
      </div>
    </div>

    <div class="mx-auto mt-10 flex max-w-content flex-col gap-2 border-t border-white/10 px-6 pt-6 text-xs md:flex-row md:justify-between">
      <p>© 2025 Rafstreymi ehf. Allur réttur áskilinn.</p>
      <div class="flex gap-4">
        <a href="#" class="hover:text-white">Persónuvernd</a>
        <a href="#" class="hover:text-white">Skilmálar</a>
      </div>
    </div>
  </footer>
</template>
