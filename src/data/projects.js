// PROJECTS SHOWN ON THE SITE
// ---------------------------------------------------------------------------
// To add a project:
//   1. Put the photo in src/assets/projects/ (about 1600px wide, .jpg or .webp,
//      lowercase file name without spaces or Icelandic letters).
//   2. Add an entry below. `image` is just the file name.
//
// A project without `image` shows a drawn placeholder instead of a photo.
// `service` must be one of the ids in services.js:
//   heimili | fyrirtaeki | idnadur | hledsla | snjallheimili | vidhald
//
// NOTE: only the first entry comes from the original mock-up. The others are
// SAMPLE entries so the layout can be judged. Replace them with real projects
// before the site goes live.

const photos = import.meta.glob('../assets/projects/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

function photo(fileName) {
  if (!fileName) return null
  const key = Object.keys(photos).find((k) => k.endsWith('/' + fileName))
  return key ? photos[key] : null
}

const entries = [
  {
    title: 'Íbúðabyggð – Smáravellir',
    description:
      'Heildarraflagnir og lýsing í nýrri íbúðabyggð. Rafdreifitöflur, tengingar og lýsing á sameiginlegum svæðum.',
    service: 'heimili',
    image: '',
  },
  {
    title: 'Hleðslustöðvar í fjölbýlishúsi',
    description: 'Uppsetning hleðslustöðva í bílakjallara ásamt álagsstýringu.',
    service: 'hledsla',
    image: '',
  },
  {
    title: 'Lýsing í skrifstofuhúsnæði',
    description: 'Ný lýsing og endurnýjun raflagna á skrifstofuhæð.',
    service: 'fyrirtaeki',
    image: '',
  },
  {
    title: 'Töfluskipti í einbýlishúsi',
    description: 'Gömul rafmagnstafla tekin niður og ný sett upp með lekaliðum.',
    service: 'vidhald',
    image: '',
  },
  {
    title: 'Snjallstýring í sumarhúsi',
    description: 'Stýring á lýsingu og hita sem hægt er að fylgjast með úr símanum.',
    service: 'snjallheimili',
    image: '',
  },
  {
    title: 'Rafkerfi í iðnaðarhúsnæði',
    description: 'Hönnun og uppsetning á rafkerfi og töflum fyrir nýtt iðnaðarhúsnæði.',
    service: 'idnadur',
    image: '',
  },
]

export const projects = entries.map((p, i) => ({ ...p, id: i, image: photo(p.image) }))
