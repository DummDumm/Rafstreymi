<script setup>
import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Check, Camera, LoaderCircle, X, Phone, Mail, Clock, ArrowRight } from 'lucide-vue-next'
import { site } from '../data/site'
import { services, serviceById } from '../data/services'

const route = useRoute()

// Requests are e-mailed through FormSubmit (https://formsubmit.co), which
// handles file attachments without a backend. The first request sent
// triggers a confirmation e-mail to this address. After confirming, the
// address can be swapped for the random alias FormSubmit sends.
const FORM_RECIPIENT = site.email
const ENDPOINT = `https://formsubmit.co/${FORM_RECIPIENT}`

// FormSubmit allows 10 MB of attachments per request in total.
const MAX_PHOTOS = 6
const MAX_TOTAL_BYTES = 9.5 * 1024 * 1024
const MAX_SIDE = 1600

const customerTypes = ['Einstaklingur', 'Fyrirtæki', 'Húsfélag']
const serviceTypes = [...services.map((s) => s.title), 'Annað']
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
  // a service card links here with ?thjonusta=<id>, so preselect it
  service: serviceById[route.query.thjonusta]?.title || '',
  timing: 'Sveigjanlegt',
  description: '',
  consent: false,
})

const form = reactive(emptyForm())
const errors = reactive({})
const submitted = computed(() => route.path === '/verkbeidni/takk')
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
const onPageShow = () => {
  sending.value = false
}
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

const fieldClass = (key) => ['field', errors[key] ? '!border-red-500 focus:!ring-red-500/20' : '']
</script>

<template>
  <div>
    <section class="bg-mist">
      <div class="wrap py-14 sm:py-20">
        <p class="eyebrow">Fáðu tilboð</p>
        <h1 class="mt-3 max-w-3xl text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Senda verkbeiðni
        </h1>
        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
          Segðu okkur frá verkinu og við sendum þér ókeypis og óskuldbindandi verðtilboð. Því
          nákvæmari lýsing, því nákvæmara tilboð.
        </p>
      </div>
    </section>

    <section class="py-14 sm:py-20">
      <div class="wrap grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
        <!-- Thank-you view -->
        <div v-if="submitted" class="rounded-3xl bg-white p-8 shadow-card ring-1 ring-brand-900/5 sm:p-12">
          <span class="flex h-16 w-16 items-center justify-center rounded-full bg-brand-700 text-white">
            <Check class="h-8 w-8" stroke-width="2.5" aria-hidden="true" />
          </span>
          <h2 class="mt-6 text-3xl font-bold tracking-tight text-ink">Takk fyrir!</h2>
          <p class="mt-3 max-w-lg text-lg leading-relaxed text-ink/70">
            Verkbeiðnin þín hefur verið send. Við förum yfir hana og höfum samband innan eins virks
            dags.
          </p>
          <p class="mt-3 text-[15px] text-ink/70">
            Liggur á? Hringdu í
            <a :href="site.phoneHref" class="font-semibold text-brand-700 underline underline-offset-2">{{ site.phone }}</a>.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <router-link to="/" class="btn-primary">Aftur á forsíðu</router-link>
            <router-link to="/verkbeidni" class="btn-outline">Senda aðra beiðni</router-link>
          </div>
        </div>

        <!-- Form -->
        <form
          v-else
          novalidate
          class="space-y-10 rounded-3xl bg-white p-6 shadow-card ring-1 ring-brand-900/5 sm:p-10"
          @submit.prevent="submit"
        >
          <fieldset>
            <legend class="font-display text-xl font-bold tracking-tight text-ink">Um þig</legend>

            <div class="mt-5 flex flex-wrap gap-2" role="radiogroup" aria-label="Tegund viðskiptavinar">
              <label
                v-for="t in customerTypes"
                :key="t"
                class="flex min-h-[44px] cursor-pointer items-center rounded-full border px-5 text-[15px] font-semibold transition focus-within:ring-2 focus-within:ring-glow-500 focus-within:ring-offset-2"
                :class="form.customerType === t ? 'border-brand-700 bg-brand-700 text-white' : 'border-brand-900/15 text-ink/75 hover:border-brand-700/50'"
              >
                <input v-model="form.customerType" type="radio" name="customerType" :value="t" class="sr-only" />
                {{ t }}
              </label>
            </div>

            <div class="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label for="r-name" class="field-label">Nafn *</label>
                <input id="r-name" v-model="form.name" type="text" autocomplete="name" :class="fieldClass('name')" :aria-invalid="!!errors.name" />
                <p v-if="errors.name" class="mt-1.5 text-sm text-red-600">{{ errors.name }}</p>
              </div>
              <div v-if="form.customerType !== 'Einstaklingur'">
                <label for="r-company" class="field-label">
                  {{ form.customerType === 'Fyrirtæki' ? 'Nafn fyrirtækis' : 'Nafn húsfélags' }}
                </label>
                <input id="r-company" v-model="form.company" type="text" autocomplete="organization" class="field" />
              </div>
              <div>
                <label for="r-email" class="field-label">Netfang *</label>
                <input id="r-email" v-model="form.email" type="email" autocomplete="email" :class="fieldClass('email')" :aria-invalid="!!errors.email" />
                <p v-if="errors.email" class="mt-1.5 text-sm text-red-600">{{ errors.email }}</p>
              </div>
              <div>
                <label for="r-phone" class="field-label">Sími *</label>
                <input id="r-phone" v-model="form.phone" type="tel" autocomplete="tel" :class="fieldClass('phone')" :aria-invalid="!!errors.phone" />
                <p v-if="errors.phone" class="mt-1.5 text-sm text-red-600">{{ errors.phone }}</p>
              </div>
            </div>
          </fieldset>

          <div class="border-t border-brand-900/10 pt-10">
          <fieldset>
            <legend class="font-display text-xl font-bold tracking-tight text-ink">Um verkið</legend>

            <div class="mt-6 grid gap-5 sm:grid-cols-3">
              <div class="sm:col-span-2">
                <label for="r-address" class="field-label">Heimilisfang verks *</label>
                <input id="r-address" v-model="form.address" type="text" autocomplete="street-address" :class="fieldClass('address')" :aria-invalid="!!errors.address" />
                <p v-if="errors.address" class="mt-1.5 text-sm text-red-600">{{ errors.address }}</p>
              </div>
              <div>
                <label for="r-postcode" class="field-label">Póstnúmer og staður</label>
                <input id="r-postcode" v-model="form.postcode" type="text" placeholder="110 Reykjavík" class="field" />
              </div>
              <div class="sm:col-span-2">
                <label for="r-service" class="field-label">Tegund þjónustu *</label>
                <select id="r-service" v-model="form.service" :class="fieldClass('service')" :aria-invalid="!!errors.service">
                  <option value="" disabled>Veldu þjónustu…</option>
                  <option v-for="s in serviceTypes" :key="s" :value="s">{{ s }}</option>
                </select>
                <p v-if="errors.service" class="mt-1.5 text-sm text-red-600">{{ errors.service }}</p>
              </div>
              <div>
                <label for="r-timing" class="field-label">Æskileg tímasetning</label>
                <select id="r-timing" v-model="form.timing" class="field">
                  <option v-for="t in timings" :key="t" :value="t">{{ t }}</option>
                </select>
              </div>
              <div class="sm:col-span-3">
                <label for="r-description" class="field-label">Lýsing verks *</label>
                <textarea
                  id="r-description"
                  v-model="form.description"
                  rows="6"
                  placeholder="T.d. skipta um rafmagnstöflu í einbýlishúsi, setja upp hleðslustöð í bílskúr…"
                  :class="[fieldClass('description'), 'resize-y']"
                  :aria-invalid="!!errors.description"
                ></textarea>
                <p v-if="errors.description" class="mt-1.5 text-sm text-red-600">{{ errors.description }}</p>
              </div>

              <!-- Photos -->
              <div class="sm:col-span-3">
                <p class="field-label !mb-0">Myndir</p>
                <p class="mt-1 text-[15px] text-ink/60">
                  Myndir af rafmagnstöflu, lögnum eða verkstað hjálpa okkur að gefa nákvæmara tilboð.
                  Allt að {{ MAX_PHOTOS }} myndir.
                </p>

                <div class="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  <div v-for="(p, i) in photos" :key="p.url" class="relative aspect-square overflow-hidden rounded-2xl bg-mist ring-1 ring-brand-900/10">
                    <img :src="p.url" :alt="`Mynd ${i + 1}`" class="h-full w-full object-cover" />
                    <button
                      type="button"
                      class="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink/70 text-white hover:bg-ink"
                      :aria-label="`Fjarlægja mynd ${i + 1}`"
                      @click="removePhoto(i)"
                    >
                      <X class="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  <label
                    v-if="photos.length < MAX_PHOTOS"
                    class="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-brand-900/20 text-center text-sm font-medium text-ink/60 transition hover:border-brand-600 hover:bg-brand-50 hover:text-brand-700 focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-glow-500"
                  >
                    <LoaderCircle v-if="processing" class="h-6 w-6 animate-spin" aria-hidden="true" />
                    <Camera v-else class="h-6 w-6" aria-hidden="true" />
                    <span>{{ processing ? 'Vinn úr…' : 'Bæta við' }}</span>
                    <input type="file" accept="image/*" multiple class="sr-only" :disabled="processing" @change="addPhotos" />
                  </label>
                </div>

                <p v-if="photos.length" class="mt-2 text-sm text-ink/50">
                  {{ photos.length }} / {{ MAX_PHOTOS }} myndir · {{ formatMb(totalBytes()) }}
                </p>
                <p v-if="errors.photos" class="mt-1.5 text-sm text-red-600">{{ errors.photos }}</p>
              </div>
            </div>
          </fieldset>
          </div>

          <div class="border-t border-brand-900/10 pt-8">
            <label class="flex items-start gap-3 text-[15px] text-ink/75">
              <input
                v-model="form.consent"
                type="checkbox"
                class="mt-0.5 h-5 w-5 shrink-0 rounded accent-brand-700"
                :aria-invalid="!!errors.consent"
              />
              <span>Ég samþykki að Rafstreymi geymi upplýsingarnar og hafi samband við mig vegna verkbeiðninnar.</span>
            </label>
            <p v-if="errors.consent" class="mt-1.5 text-sm text-red-600">{{ errors.consent }}</p>

            <button type="submit" class="btn-primary mt-7 w-full !min-h-[56px] !text-base disabled:opacity-60 sm:w-auto sm:!px-10" :disabled="sending || processing">
              {{ sending ? 'Sendi…' : 'Senda verkbeiðni' }}
              <ArrowRight v-if="!sending" class="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>

        <!-- Sidebar -->
        <aside class="space-y-6 lg:sticky lg:top-40 lg:self-start">
          <div class="rounded-3xl bg-mist p-7">
            <h2 class="text-xl font-bold tracking-tight text-ink">Hvað gerist næst?</h2>
            <ol class="mt-6 space-y-6">
              <li v-for="(s, i) in steps" :key="s.title" class="flex gap-4">
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                  {{ i + 1 }}
                </span>
                <div>
                  <p class="font-semibold text-ink">{{ s.title }}</p>
                  <p class="mt-1 text-[15px] leading-relaxed text-ink/65">{{ s.desc }}</p>
                </div>
              </li>
            </ol>
          </div>

          <div class="rounded-3xl bg-brand-900 p-7 text-white">
            <h2 class="text-xl font-bold tracking-tight">Viltu frekar heyra í okkur?</h2>
            <a :href="site.phoneHref" class="mt-5 flex items-center gap-3 font-display text-3xl font-extrabold tracking-tight hover:text-glow-300">
              <Phone class="h-6 w-6 text-glow-400" aria-hidden="true" />
              {{ site.phone }}
            </a>
            <ul class="mt-5 space-y-3 text-[15px] text-white/75">
              <li class="flex items-center gap-3">
                <Mail class="h-4 w-4 text-glow-400" aria-hidden="true" />
                <a :href="`mailto:${site.email}`" class="hover:text-white">{{ site.email }}</a>
              </li>
              <li class="flex items-center gap-3">
                <Clock class="h-4 w-4 text-glow-400" aria-hidden="true" />
                {{ site.hours }}
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
