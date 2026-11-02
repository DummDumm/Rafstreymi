<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({ sent: { type: Boolean, default: false } })

// Requests are emailed through FormSubmit (https://formsubmit.co), which
// handles file attachments without a backend. The first request sent
// triggers a confirmation email to this address. After confirming, the
// address can be swapped for the random alias FormSubmit sends.
// TODO: placeholder for testing, change to info@rafstreymi.is before launch.
const FORM_RECIPIENT = 'info@rafstreymi.is'
const ENDPOINT = `https://formsubmit.co/${FORM_RECIPIENT}`

// Public contact address shown on the page.
const RECIPIENT = 'info@rafstreymi.is'

// FormSubmit allows 10 MB of attachments per request in total.
const MAX_PHOTOS = 6
const MAX_TOTAL_BYTES = 9.5 * 1024 * 1024
const MAX_SIDE = 1600

const customerTypes = ['Einstaklingur', 'Fyrirtæki', 'Húsfélag']

const serviceTypes = [
  'Heimilisþjónusta',
  'Fyrirtækjaþjónusta',
  'Iðnaðarþjónusta',
  'Hleðslustöðvar',
  'Snjallheimili',
  'Viðgerðir og viðhald',
  'Annað',
]

const timings = ['Sem fyrst', 'Innan mánaðar', 'Innan 3 mánaða', 'Sveigjanlegt']

const steps = [
  { title: 'Við förum yfir beiðnina', desc: 'Sérfræðingur skoðar verkið og metur umfang þess.' },
  { title: 'Við höfum samband', desc: 'Við hringjum eða sendum póst innan eins virks dags.' },
  { title: 'Þú færð tilboð', desc: 'Skýrt og sundurliðað verðtilboð, án skuldbindingar.' },
]

const emptyForm = () => ({
  customerType: 'Einstaklingur',
  name: '',
  company: '',
  email: '',
  phone: '',
  address: '',
  postcode: '',
  service: '',
  timing: 'Sveigjanlegt',
  description: '',
  consent: false,
})

const form = reactive(emptyForm())
const errors = reactive({})
const submitted = ref(props.sent)
const sending = ref(false)

// ---- Photos ----
const photos = ref([]) // { file, url }
const processing = ref(false)

const totalBytes = () => photos.value.reduce((sum, p) => sum + p.file.size, 0)
const formatMb = (bytes) => (bytes / 1024 / 1024).toFixed(1).replace('.', ',') + ' MB'

// Phone photos are often 3–8 MB, so scale them down before upload.
// If the browser can't read the format (e.g. HEIC), keep the original.
async function shrink(file) {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    bitmap.close?.()
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82))
    if (!blob || blob.size >= file.size) return file
    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg'
    return new File([blob], name, { type: 'image/jpeg' })
  } catch {
    return file
  }
}

async function addPhotos(event) {
  const files = [...event.target.files].filter((f) => f.type.startsWith('image/') || /\.hei[cf]$/i.test(f.name))
  event.target.value = ''
  delete errors.photos
  processing.value = true

  for (const original of files) {
    if (photos.value.length >= MAX_PHOTOS) {
      errors.photos = `Hámark ${MAX_PHOTOS} myndir.`
      break
    }
    const file = await shrink(original)
    if (totalBytes() + file.size > MAX_TOTAL_BYTES) {
      errors.photos = `Myndirnar mega samtals vera að hámarki ${formatMb(MAX_TOTAL_BYTES)}.`
      break
    }
    photos.value.push({ file, url: URL.createObjectURL(file) })
  }
  processing.value = false
}

function removePhoto(index) {
  URL.revokeObjectURL(photos.value[index].url)
  photos.value.splice(index, 1)
  delete errors.photos
}

// If the visitor comes back with the browser's back button, re-enable the form.
const onPageShow = () => { sending.value = false }
onMounted(() => window.addEventListener('pageshow', onPageShow))
onUnmounted(() => {
  window.removeEventListener('pageshow', onPageShow)
  photos.value.forEach((p) => URL.revokeObjectURL(p.url))
})

// ---- Validation & submit ----
function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.name.trim()) errors.name = 'Vinsamlegast sláðu inn nafn.'
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Vinsamlegast sláðu inn gilt netfang.'
  if (form.phone.replace(/\D/g, '').length < 7) errors.phone = 'Vinsamlegast sláðu inn gilt símanúmer.'
  if (!form.address.trim()) errors.address = 'Vinsamlegast sláðu inn staðsetningu verks.'
  if (!form.service) errors.service = 'Veldu tegund þjónustu.'
  if (form.description.trim().length < 10) errors.description = 'Lýstu verkinu í nokkrum orðum.'
  if (!form.consent) errors.consent = 'Samþykki þarf til að við getum haft samband.'
  return Object.keys(errors).length === 0
}

function submit() {
  if (!validate()) {
    document.querySelector('[aria-invalid="true"]')?.focus()
    return
  }
  sending.value = true

  // Attachments need a regular multipart form POST, so build one off-screen
  // and submit it. FormSubmit shows a short spam check, then sends the
  // visitor back to the thank-you view on this page.
  const thanksUrl = `${window.location.origin}${window.location.pathname}#/verkbeidni/takk`
  const fields = {
    _subject: `Verkbeiðni – ${form.service} – ${form.name}`,
    _template: 'table',
    _next: thanksUrl,
    'Tegund viðskiptavinar': form.customerType,
    Nafn: form.name,
    ...(form.company && { 'Fyrirtæki / húsfélag': form.company }),
    email: form.email, // FormSubmit uses this as the reply-to address
    Sími: form.phone,
    'Heimilisfang verks': form.address,
    'Póstnúmer og staður': form.postcode,
    Þjónusta: form.service,
    'Æskileg tímasetning': form.timing,
    'Lýsing verks': form.description,
    'Fjöldi mynda': String(photos.value.length),
  }

  const el = document.createElement('form')
  el.method = 'POST'
  el.action = ENDPOINT
  el.enctype = 'multipart/form-data'
  el.acceptCharset = 'UTF-8'
  el.style.display = 'none'

  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = value
    el.appendChild(input)
  }

  // One file input per photo, as FormSubmit's docs describe.
  photos.value.forEach((p, i) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.name = `Mynd ${i + 1}`
    const dt = new DataTransfer()
    dt.items.add(p.file)
    input.files = dt.files
    el.appendChild(input)
  })

  document.body.appendChild(el)
  el.submit()
}

function reset() {
  Object.assign(form, emptyForm())
  photos.value.forEach((p) => URL.revokeObjectURL(p.url))
  photos.value = []
  submitted.value = false
  window.location.hash = '#/verkbeidni'
}

const input =
  'mt-1 block w-full rounded-md border px-3 py-2.5 text-sm text-ink-900 shadow-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100'
const fieldClass = (key) => [input, errors[key] ? 'border-red-400' : 'border-gray-300']
</script>

<template>
  <section class="bg-surface-light">
    <div class="mx-auto max-w-content px-6 py-14 md:py-20">
      <a href="#" class="text-sm font-medium text-brand-600 hover:text-brand-700">← Til baka á forsíðu</a>
      <p class="eyebrow mb-3 mt-6">Fáðu tilboð</p>
      <h1 class="text-3xl font-bold text-ink-900 md:text-4xl">Senda verkbeiðni</h1>
      <p class="mt-4 max-w-xl text-ink-600">
        Segðu okkur frá verkinu og við sendum þér ókeypis og óskuldbindandi verðtilboð.
        Því nákvæmari lýsing, því nákvæmara tilboð.
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-content px-6 py-14">
    <div class="grid gap-10 lg:grid-cols-3">
      <!-- Success state -->
      <div
        v-if="submitted"
        class="rounded-xl border border-gray-100 p-8 shadow-sm lg:col-span-2"
      >
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-xl text-brand-600">✓</div>
        <h2 class="text-2xl font-bold text-ink-900">Takk fyrir!</h2>
        <p class="mt-3 text-ink-600">
          Verkbeiðnin þín hefur verið send. Við förum yfir hana og höfum samband
          innan eins virks dags.
        </p>
        <p class="mt-3 text-sm text-ink-600">
          Liggur á? Hringdu í
          <a href="tel:5191616" class="font-medium text-brand-600 hover:text-brand-700">519 1616</a>.
        </p>
        <div class="mt-8 flex flex-wrap gap-4">
          <a href="#" class="btn-primary">Aftur á forsíðu</a>
          <button type="button" class="btn-secondary" @click="reset">Senda aðra beiðni</button>
        </div>
      </div>

      <!-- Form -->
      <form
        v-else
        novalidate
        class="space-y-8 rounded-xl border border-gray-100 p-6 shadow-sm md:p-8 lg:col-span-2"
        @submit.prevent="submit"
      >
        <fieldset>
          <legend class="font-semibold text-ink-900">Um þig</legend>

          <div class="mt-4 flex flex-wrap gap-3">
            <label
              v-for="t in customerTypes"
              :key="t"
              class="cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition-colors"
              :class="form.customerType === t
                ? 'border-brand-600 bg-brand-50 text-brand-700'
                : 'border-gray-300 text-ink-600 hover:bg-gray-50'"
            >
              <input v-model="form.customerType" type="radio" :value="t" class="sr-only" />
              {{ t }}
            </label>
          </div>

          <div class="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label for="name" class="text-sm font-medium text-ink-900">Nafn *</label>
              <input id="name" v-model="form.name" type="text" autocomplete="name"
                :class="fieldClass('name')" :aria-invalid="!!errors.name" />
              <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
            </div>
            <div v-if="form.customerType !== 'Einstaklingur'">
              <label for="company" class="text-sm font-medium text-ink-900">
                {{ form.customerType === 'Fyrirtæki' ? 'Nafn fyrirtækis' : 'Nafn húsfélags' }}
              </label>
              <input id="company" v-model="form.company" type="text" autocomplete="organization"
                :class="fieldClass('company')" />
            </div>
            <div>
              <label for="email" class="text-sm font-medium text-ink-900">Netfang *</label>
              <input id="email" v-model="form.email" type="email" autocomplete="email"
                :class="fieldClass('email')" :aria-invalid="!!errors.email" />
              <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
            </div>
            <div>
              <label for="phone" class="text-sm font-medium text-ink-900">Sími *</label>
              <input id="phone" v-model="form.phone" type="tel" autocomplete="tel"
                :class="fieldClass('phone')" :aria-invalid="!!errors.phone" />
              <p v-if="errors.phone" class="mt-1 text-xs text-red-600">{{ errors.phone }}</p>
            </div>
          </div>
        </fieldset>

        <fieldset class="border-t border-gray-100 pt-8">
          <legend class="font-semibold text-ink-900">Um verkið</legend>

          <div class="mt-4 grid gap-5 sm:grid-cols-3">
            <div class="sm:col-span-2">
              <label for="address" class="text-sm font-medium text-ink-900">Heimilisfang verks *</label>
              <input id="address" v-model="form.address" type="text" autocomplete="street-address"
                :class="fieldClass('address')" :aria-invalid="!!errors.address" />
              <p v-if="errors.address" class="mt-1 text-xs text-red-600">{{ errors.address }}</p>
            </div>
            <div>
              <label for="postcode" class="text-sm font-medium text-ink-900">Póstnúmer og staður</label>
              <input id="postcode" v-model="form.postcode" type="text" placeholder="110 Reykjavík"
                :class="fieldClass('postcode')" />
            </div>
            <div class="sm:col-span-2">
              <label for="service" class="text-sm font-medium text-ink-900">Tegund þjónustu *</label>
              <select id="service" v-model="form.service"
                :class="[fieldClass('service'), 'bg-white']" :aria-invalid="!!errors.service">
                <option value="" disabled>Veldu þjónustu…</option>
                <option v-for="s in serviceTypes" :key="s" :value="s">{{ s }}</option>
              </select>
              <p v-if="errors.service" class="mt-1 text-xs text-red-600">{{ errors.service }}</p>
            </div>
            <div>
              <label for="timing" class="text-sm font-medium text-ink-900">Æskileg tímasetning</label>
              <select id="timing" v-model="form.timing" :class="[fieldClass('timing'), 'bg-white']">
                <option v-for="t in timings" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
            <div class="sm:col-span-3">
              <label for="description" class="text-sm font-medium text-ink-900">Lýsing verks *</label>
              <textarea id="description" v-model="form.description" rows="6"
                placeholder="T.d. skipta um rafmagnstöflu í einbýlishúsi, setja upp hleðslustöð í bílskúr…"
                :class="fieldClass('description')" :aria-invalid="!!errors.description" />
              <p v-if="errors.description" class="mt-1 text-xs text-red-600">{{ errors.description }}</p>
            </div>

            <!-- Photos -->
            <div class="sm:col-span-3">
              <p class="text-sm font-medium text-ink-900">Myndir</p>
              <p class="mt-1 text-sm text-ink-600">
                Myndir af rafmagnstöflu, lögnum eða verkstað hjálpa okkur að gefa nákvæmara tilboð.
                Allt að {{ MAX_PHOTOS }} myndir.
              </p>

              <div class="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
                <div
                  v-for="(p, i) in photos"
                  :key="p.url"
                  class="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                >
                  <img :src="p.url" :alt="`Mynd ${i + 1}`" class="h-full w-full object-cover" />
                  <button
                    type="button"
                    class="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black/80"
                    :aria-label="`Fjarlægja mynd ${i + 1}`"
                    @click="removePhoto(i)"
                  >✕</button>
                </div>

                <label
                  v-if="photos.length < MAX_PHOTOS"
                  class="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 text-center text-xs text-ink-600 transition-colors hover:border-brand-600 hover:bg-brand-50 hover:text-brand-700 focus-within:border-brand-600"
                >
                  <span class="text-xl">{{ processing ? '⏳' : '📷' }}</span>
                  <span>{{ processing ? 'Vinn úr…' : 'Bæta við' }}</span>
                  <input type="file" accept="image/*" multiple class="sr-only" :disabled="processing" @change="addPhotos" />
                </label>
              </div>

              <p v-if="photos.length" class="mt-2 text-xs text-ink-400">
                {{ photos.length }} / {{ MAX_PHOTOS }} myndir · {{ formatMb(totalBytes()) }}
              </p>
              <p v-if="errors.photos" class="mt-1 text-xs text-red-600">{{ errors.photos }}</p>
            </div>
          </div>
        </fieldset>

        <div class="border-t border-gray-100 pt-6">
          <label class="flex items-start gap-3 text-sm text-ink-600">
            <input v-model="form.consent" type="checkbox"
              class="mt-0.5 h-4 w-4 rounded border-gray-300 accent-brand-600" :aria-invalid="!!errors.consent" />
            <span>Ég samþykki að Rafstreymi geymi upplýsingarnar og hafi samband við mig vegna verkbeiðninnar.</span>
          </label>
          <p v-if="errors.consent" class="mt-1 text-xs text-red-600">{{ errors.consent }}</p>

          <button type="submit" class="btn-primary mt-6 w-full disabled:opacity-60 sm:w-auto" :disabled="sending || processing">
            {{ sending ? 'Sendi…' : 'Senda verkbeiðni →' }}
          </button>
        </div>
      </form>

      <!-- Sidebar -->
      <aside class="space-y-6">
        <div class="rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 class="font-semibold text-ink-900">Hvað gerist næst?</h3>
          <ol class="mt-5 space-y-5">
            <li v-for="(s, i) in steps" :key="s.title" class="flex gap-4">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-600">
                {{ i + 1 }}
              </span>
              <div>
                <p class="text-sm font-medium text-ink-900">{{ s.title }}</p>
                <p class="mt-1 text-sm text-ink-600">{{ s.desc }}</p>
              </div>
            </li>
          </ol>
        </div>

        <div class="rounded-xl bg-brand-700 p-6 text-brand-100">
          <h3 class="font-semibold text-white">Viltu frekar heyra í okkur?</h3>
          <ul class="mt-4 space-y-2 text-sm">
            <li>📞 <a href="tel:5191616" class="hover:text-white">519 1616</a></li>
            <li>✉️ <a :href="`mailto:${RECIPIENT}`" class="hover:text-white">{{ RECIPIENT }}</a></li>
            <li>🕐 Opið alla virka daga 07:30 – 16:00</li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</template>
