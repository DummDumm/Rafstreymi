<script setup>
defineProps({
  eyebrow: String,
  title: String,
  text: String,
})
</script>

<template>
  <section class="bg-mist">
    <div class="wrap py-16 sm:py-20">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 class="mt-3 max-w-3xl text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
        {{ title }}
      </h1>
      <p v-if="text" class="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">{{ text }}</p>
    </div>
  </section>
</template>
