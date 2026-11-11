import marino from '../assets/team/marino.jpg'
import johann from '../assets/team/johann.jpg'

// TODO: the e-mail addresses and phone numbers are placeholders.
// Swap them for the real ones before the site goes live.
export const team = [
  {
    name: 'Marinó Rafn Guðmundsson',
    title: 'Eigandi',
    photo: marino,
    email: 'marino@rafstreymi.is',
    phone: '555 0001',
  },
  {
    name: 'Jóhann Sindri Sveinsson',
    title: 'Eigandi',
    photo: johann,
    email: 'johann@rafstreymi.is',
    phone: '555 0002',
  },
]

export const tel = (phone) => `tel:+354${phone.replace(/\s/g, '')}`
