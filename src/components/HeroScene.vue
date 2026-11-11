<script setup>
// The street scene in the hero. `on` switches the lights in every window.
defineProps({ on: { type: Boolean, default: true } })

const windows = [
  // red house
  { x: 78, y: 330, w: 34, h: 44 },
  { x: 178, y: 330, w: 34, h: 44 },
  { x: 131, y: 258, w: 28, h: 28 },
  // tall light house
  { x: 268, y: 275, w: 30, h: 40 },
  { x: 315, y: 275, w: 30, h: 40 },
  { x: 362, y: 275, w: 30, h: 40 },
  { x: 268, y: 350, w: 30, h: 40 },
  { x: 362, y: 350, w: 30, h: 40 },
  { x: 316, y: 205, w: 28, h: 28 },
  // blue house
  { x: 452, y: 345, w: 34, h: 42 },
  { x: 534, y: 345, w: 34, h: 42 },
]

const stars = [
  [40, 60], [110, 30], [190, 90], [250, 40], [330, 70], [410, 30], [470, 95],
  [540, 50], [600, 110], [80, 140], [560, 170], [30, 200], [380, 120],
]
</script>

<template>
  <svg
    viewBox="0 0 640 540"
    class="block h-full w-full"
    preserveAspectRatio="xMidYMax slice"
    role="img"
    :aria-label="on ? 'Þrjú hús að kvöldi með ljós í öllum gluggum' : 'Þrjú hús að kvöldi, ljósin eru slökkt'"
  >
    <defs>
      <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0a1d16" />
        <stop offset="0.65" stop-color="#1d4d3a" />
        <stop offset="1" stop-color="#2f6b54" />
      </linearGradient>
      <pattern id="hs-iron" width="7" height="10" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="1.4" height="10" fill="#000000" opacity="0.13" />
      </pattern>
      <filter id="hs-blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="14" />
      </filter>
      <filter id="hs-soft" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
    </defs>

    <rect width="640" height="540" fill="url(#hs-sky)" />

    <!-- northern lights: easier to see when the street is dark -->
    <g class="fade" :opacity="on ? 0.3 : 0.6" filter="url(#hs-blur)">
      <path d="M-20 150 C120 60 240 190 380 110 S600 60 680 130" fill="none" stroke="#7be0b0" stroke-width="34" />
      <path d="M-20 205 C140 140 260 240 420 170 S600 150 680 190" fill="none" stroke="#9fe8ff" stroke-width="18" opacity="0.6" />
    </g>

    <g fill="#ffffff">
      <circle v-for="(s, i) in stars" :key="i" :cx="s[0]" :cy="s[1]" :r="i % 3 === 0 ? 1.6 : 1" :opacity="i % 2 ? 0.7 : 0.45" />
    </g>

    <!-- mountain ridge -->
    <path d="M0 350 L70 300 L130 322 L210 268 L300 318 L372 280 L450 312 L520 262 L600 304 L640 290 L640 460 L0 460 Z" fill="#12362a" />
    <path d="M196 279 L210 268 L232 281 L218 280 L208 288 Z M508 271 L520 262 L540 274 L524 273 L516 280 Z" fill="#e8f0ec" opacity="0.5" />

    <!-- window light falling on the snow -->
    <g class="fade" :opacity="on ? 1 : 0">
      <ellipse cx="145" cy="462" rx="110" ry="18" fill="#ffc233" opacity="0.2" filter="url(#hs-soft)" />
      <ellipse cx="330" cy="462" rx="110" ry="18" fill="#ffc233" opacity="0.2" filter="url(#hs-soft)" />
      <ellipse cx="510" cy="462" rx="110" ry="18" fill="#ffc233" opacity="0.2" filter="url(#hs-soft)" />
    </g>

    <!-- red house -->
    <polygon points="46,302 145,224 244,302" fill="#172822" />
    <rect x="60" y="300" width="170" height="142" fill="#b24a3c" />
    <rect x="60" y="300" width="170" height="142" fill="url(#hs-iron)" />
    <rect x="127" y="372" width="36" height="70" rx="2" fill="#172822" />
    <circle cx="156" cy="410" r="2" fill="#ffc233" />

    <!-- tall light house -->
    <polygon points="236,252 330,168 424,252" fill="#172822" />
    <rect x="250" y="250" width="160" height="192" fill="#e9e4d6" />
    <rect x="250" y="250" width="160" height="192" fill="url(#hs-iron)" />
    <rect x="313" y="384" width="34" height="58" rx="2" fill="#27624a" />
    <circle cx="340" cy="416" r="2" fill="#ffc233" />

    <!-- blue house with a car charger -->
    <polygon points="416,322 510,254 604,322" fill="#172822" />
    <rect x="430" y="320" width="160" height="122" fill="#46627a" />
    <rect x="430" y="320" width="160" height="122" fill="url(#hs-iron)" />
    <rect x="494" y="380" width="32" height="62" rx="2" fill="#172822" />
    <circle cx="520" cy="414" r="2" fill="#ffc233" />
    <rect x="572" y="396" width="12" height="20" rx="3" fill="#10201a" />
    <circle class="fade" cx="578" cy="402" r="2" :fill="on ? '#6ff0a8' : '#3a4a44'" />
    <path d="M578 416 C578 434 566 426 566 442" fill="none" stroke="#10201a" stroke-width="2" />

    <!-- windows -->
    <g v-for="(w, i) in windows" :key="'w' + i">
      <rect
        class="fade"
        :x="w.x - 6" :y="w.y - 6" :width="w.w + 12" :height="w.h + 12"
        fill="#ffc233" filter="url(#hs-soft)" :opacity="on ? 0.55 : 0"
      />
      <rect class="fade" :x="w.x" :y="w.y" :width="w.w" :height="w.h" rx="2" :fill="on ? '#ffcf5c' : '#0d1d17'" />
      <path
        :d="`M${w.x + w.w / 2} ${w.y} V${w.y + w.h} M${w.x} ${w.y + w.h * 0.45} H${w.x + w.w}`"
        stroke="#172822" stroke-width="2" opacity="0.55"
      />
    </g>

    <!-- street lamp -->
    <circle class="fade" cx="34" cy="322" r="46" fill="#ffc233" filter="url(#hs-soft)" :opacity="on ? 0.35 : 0" />
    <path d="M22 442 V330 Q22 318 34 318" fill="none" stroke="#10201a" stroke-width="4" stroke-linecap="round" />
    <circle class="fade" cx="36" cy="321" r="6" :fill="on ? '#ffe49a' : '#3a4a44'" />

    <!-- snow -->
    <path d="M0 448 C120 436 220 446 330 440 S560 434 640 444 L640 540 L0 540 Z" fill="#eef4f0" />
    <path d="M0 492 C160 478 320 498 470 486 S600 484 640 490 L640 540 L0 540 Z" fill="#ffffff" />

    <!-- everything gets darker when the lights go out -->
    <rect class="fade" width="640" height="540" fill="#050e0a" :opacity="on ? 0 : 0.34" pointer-events="none" />
  </svg>
</template>

<style scoped>
.fade {
  transition: opacity 0.6s ease, fill 0.6s ease;
}
</style>
