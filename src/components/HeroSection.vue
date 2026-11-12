<script setup>
import { ref, nextTick, onUnmounted } from 'vue'
import { ArrowRight, Phone, Check, Lightbulb, LightbulbOff, Zap } from 'lucide-vue-next'
import HeroScene from './HeroScene.vue'
import { site } from '../data/site'

const promises = ['Vottaðir rafvirkjar', 'Sanngjarnt verð', 'Fljót og örugg þjónusta']

const lightsOn = ref(true)
const fixed = ref(false) // true once the lights have come back at least once

// The "power cut" played when the switch is turned off:
// idle → dark → ask → call → fix → back → idle
const phase = ref('idle')
const switchEl = ref(null)
const skipEl = ref(null)
let timers = []

// How long each step lasts, in milliseconds from the click.
const TIMELINE = [
  [1300, 'ask'], //  "Vantar þig aðstoð?"
  [2300, 'call'], // "Hringdu í 519 1616"
  [5600, 'fix'], //  "Við kippum þessu í lag."
  [7300, 'back'], // lights flicker back on
  [8100, 'idle'],
]

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function clearTimers() {
  timers.forEach(clearTimeout)
  timers = []
}

function onKey(e) {
  if (e.key === 'Escape') restore()
}

function finish() {
  clearTimers()
  window.removeEventListener('keydown', onKey)
  phase.value = 'idle'
  lightsOn.value = true
  fixed.value = true
  nextTick(() => switchEl.value?.focus({ preventScroll: true }))
}

// Skip the rest and turn everything back on straight away.
function restore() {
  if (phase.value !== 'idle') finish()
  else lightsOn.value = true
}

function toggle() {
  if (!lightsOn.value) return restore()

  lightsOn.value = false
  // With reduced motion, just switch the picture off: no full-page sequence.
  if (reducedMotion()) return

  phase.value = 'dark'
  window.addEventListener('keydown', onKey)
  nextTick(() => skipEl.value?.focus({ preventScroll: true }))

  for (const [at, next] of TIMELINE) {
    timers.push(
      setTimeout(() => {
        if (next === 'idle') return finish()
        if (next === 'back') lightsOn.value = true
        phase.value = next
      }, at),
    )
  }
}

onUnmounted(() => {
  clearTimers()
  window.removeEventListener('keydown', onKey)
})
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
          class="absolute inset-x-4 -bottom-6 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-lift sm:inset-x-auto sm:-bottom-6 sm:-left-6 sm:w-[20rem]"
        >
          <button
            ref="switchEl"
            type="button"
            role="switch"
            :aria-checked="lightsOn"
            aria-label="Kveikja og slökkva ljósin"
            class="relative h-9 w-16 shrink-0 rounded-full transition-colors duration-300"
            :class="lightsOn ? 'bg-glow-400' : 'bg-brand-900'"
            @click="toggle"
          >
            <span
              class="absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow transition-transform duration-300"
              :class="lightsOn ? 'translate-x-7' : 'translate-x-0'"
            >
              <Lightbulb v-if="lightsOn" class="h-4 w-4 text-glow-500" aria-hidden="true" />
              <LightbulbOff v-else class="h-4 w-4 text-brand-900" aria-hidden="true" />
            </span>
          </button>
          <div class="min-w-0 leading-snug">
            <template v-if="!lightsOn">
              <p class="text-[15px] font-semibold text-ink">Rafmagnslaust?</p>
              <p class="text-sm text-ink/60">
                Við kippum því í lag:
                <a :href="site.phoneHref" class="whitespace-nowrap font-semibold text-brand-700 underline underline-offset-2">{{ site.phone }}</a>
              </p>
            </template>
            <template v-else-if="fixed">
              <p class="text-[15px] font-semibold text-ink">Komið í lag!</p>
              <p class="text-sm text-ink/60">Prófaðu aftur ef þú vilt.</p>
            </template>
            <template v-else>
              <p class="text-[15px] font-semibold text-ink">Ljósin eru kveikt</p>
              <p class="text-sm text-ink/60">Prófaðu að slökkva.</p>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- The power cut: the whole page goes dark for a few seconds -->
    <Teleport to="body">
      <transition name="blackout">
        <div
          v-if="phase !== 'idle'"
          class="blackout fixed inset-0 z-[90] flex flex-col items-center justify-center px-6 text-center text-white"
          :class="{ 'is-flicker': phase === 'back' }"
          role="dialog"
          aria-modal="true"
          aria-label="Rafmagnslaust"
          @click.self="restore"
        >
          <div class="flex min-h-[12rem] items-center" aria-live="polite">
            <transition name="line" mode="out-in">
              <div v-if="phase === 'ask' || phase === 'call'" key="ask">
                <p class="font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
                  Vantar þig aðstoð?
                </p>
                <p
                  class="mt-6 text-2xl font-medium text-white/80 transition-opacity duration-700 sm:text-4xl"
                  :class="phase === 'call' ? 'opacity-100' : 'opacity-0'"
                >
                  Hringdu í
                  <a
                    :href="site.phoneHref"
                    :tabindex="phase === 'call' ? 0 : -1"
                    class="whitespace-nowrap font-display font-extrabold text-glow-400 underline decoration-glow-400/40 underline-offset-8"
                  >
                    {{ site.phone }}
                  </a>
                </p>
              </div>

              <div v-else-if="phase === 'fix' || phase === 'back'" key="fix" class="flex flex-col items-center">
                <span class="bolt flex h-20 w-20 items-center justify-center rounded-full bg-glow-400 text-brand-950">
                  <Zap class="h-9 w-9" fill="currentColor" stroke-width="1.5" aria-hidden="true" />
                </span>
                <p class="mt-7 font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
                  Við kippum þessu í lag.
                </p>
              </div>
            </transition>
          </div>

          <button
            ref="skipEl"
            type="button"
            class="absolute bottom-8 flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-semibold text-white/75 transition hover:border-white/60 hover:text-white"
            @click="restore"
          >
            <Lightbulb class="h-4 w-4" aria-hidden="true" />
            Kveikja ljósin aftur
          </button>
        </div>
      </transition>
    </Teleport>
  </section>
</template>

<style scoped>
.blackout {
  background: rgba(4, 11, 8, 0.94);
}

/* the page goes dark slowly, like a dimmer being turned down */
.blackout-enter-active {
  transition: opacity 0.9s ease;
}
.blackout-enter-from {
  opacity: 0;
}
.blackout-leave-active {
  transition: opacity 0.2s ease;
}
.blackout-leave-to {
  opacity: 0;
}

/* the lights stutter back on, like a fluorescent tube */
.is-flicker {
  animation: flicker 0.8s linear forwards;
}
@keyframes flicker {
  0% { opacity: 1; }
  10% { opacity: 0.35; }
  18% { opacity: 0.95; }
  30% { opacity: 0.2; }
  42% { opacity: 0.8; }
  55% { opacity: 0.12; }
  68% { opacity: 0.45; }
  100% { opacity: 0; }
}

.line-enter-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.line-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.line-leave-active {
  transition: opacity 0.35s ease;
}
.line-leave-to {
  opacity: 0;
}

.bolt {
  animation: bolt 1.1s ease-in-out infinite;
}
@keyframes bolt {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 194, 51, 0.55); }
  50% { box-shadow: 0 0 0 22px rgba(255, 194, 51, 0); }
}
</style>
