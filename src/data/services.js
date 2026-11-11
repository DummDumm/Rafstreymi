import { House, Building2, Factory, PlugZap, Wifi, Wrench } from 'lucide-vue-next'

export const services = [
  {
    id: 'heimili',
    title: 'Heimilisþjónusta',
    short: 'Heimili',
    description: 'Raflagnir, lýsing, töfluskipti og viðhald fyrir heimili.',
    icon: House,
  },
  {
    id: 'fyrirtaeki',
    title: 'Fyrirtækjaþjónusta',
    short: 'Fyrirtæki',
    description: 'Rafkerfi, lýsing og viðhald fyrir fyrirtæki og húsfélög.',
    icon: Building2,
  },
  {
    id: 'idnadur',
    title: 'Iðnaðarþjónusta',
    short: 'Iðnaður',
    description: 'Hönnun og uppsetning rafkerfa fyrir iðnað.',
    icon: Factory,
  },
  {
    id: 'hledsla',
    title: 'Hleðslustöðvar',
    short: 'Hleðslustöðvar',
    description: 'Uppsetning hleðslustöðva fyrir rafbíla.',
    icon: PlugZap,
  },
  {
    id: 'snjallheimili',
    title: 'Snjallheimili',
    short: 'Snjallheimili',
    description: 'Sjálfvirknivæðing, lýsing og orkustýring.',
    icon: Wifi,
  },
  {
    id: 'vidhald',
    title: 'Viðgerðir og viðhald',
    short: 'Viðhald',
    description: 'Bilanaþjónusta og reglulegt viðhald rafkerfa.',
    icon: Wrench,
  },
]

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s]))
