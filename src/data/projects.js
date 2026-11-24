// PROJECTS SHOWN ON THE SITE
// ---------------------------------------------------------------------------
// Each project has a title, a text and any number of photos.
//
// To add a project:
//   1. Put the photos in src/assets/projects/ (about 1600px wide, .jpg or .webp,
//      lowercase file names without spaces or Icelandic letters).
//   2. Add an entry below. `images` lists the file names; the first one is the
//      cover photo. Visitors can click through the rest on the card.
//
// A project with no photos shows a drawn placeholder instead.
// The newest project should go at the top: the first three are shown on the
// front page.
//
// NOTE: only the first entry comes from the original mock-up. The others are
// SAMPLE entries so the layout can be judged. Replace them with real projects
// before the site goes live.

const photos = import.meta.glob('../assets/projects/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

function photo(fileName) {
  const key = Object.keys(photos).find((k) => k.endsWith('/' + fileName))
  if (!key) console.warn(`Project photo not found: src/assets/projects/${fileName}`)
  return key ? photos[key] : null
}

const entries = [
  {
    title: 'Íbúðabyggð – Smáravellir',
    description:
      'Heildarraflagnir og lýsing í nýrri íbúðabyggð. Rafdreifitöflur, tengingar og lýsing á sameiginlegum svæðum.',
    images: [],
  },
  {
    title: 'Hleðslustöðvar í fjölbýlishúsi',
    description: 'Uppsetning hleðslustöðva í bílakjallara ásamt álagsstýringu.',
    images: [],
  },
  {
    title: 'Lýsing í skrifstofuhúsnæði',
    description: 'Ný lýsing og endurnýjun raflagna á skrifstofuhæð.',
    images: [],
  },
  {
    title: 'Töfluskipti í einbýlishúsi',
    description: 'Gömul rafmagnstafla tekin niður og ný sett upp með lekaliðum.',
    images: [],
  },
  {
    title: 'Snjallstýring í sumarhúsi',
    description: 'Stýring á lýsingu og hita sem hægt er að fylgjast með úr símanum.',
    images: [],
  },
  {
    title: 'Rafkerfi í iðnaðarhúsnæði',
    description: 'Hönnun og uppsetning á rafkerfi og töflum fyrir nýtt iðnaðarhúsnæði.',
    images: [],
  },
]

export const projects = entries.map((p, i) => ({
  ...p,
  id: i,
  images: (p.images || []).map(photo).filter(Boolean),
}))
