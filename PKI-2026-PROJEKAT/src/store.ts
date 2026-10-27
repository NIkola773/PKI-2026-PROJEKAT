import { reactive } from 'vue'
import { plants } from './plants'
import type { Biljka, Korisnik, Stavka } from './types'

interface Stanje { plants: Biljka[]; users: Korisnik[]; user: Korisnik | null; cart: Stavka[]; poruka: string }

// Jedno mesto gde čuvamo sve podatke (simulacija baze)
export const store = reactive<Stanje>({
  plants,
  users: [{ ime: 'Demo Kupac', email: 'demo@mail.com', telefon: '060123456', adresa: 'Beograd', omiljene: 'sobno', lozinka: '123' }],
  user: null,
  cart: [{ id: 100, plantId: 4, kolicina: 1, status: 'pristiglo', ocena: 0 }], // jedna već pristigla, za testiranje ocenjivanja
  poruka: ''
})

let sledeciId = 101
export function obavesti(tekst: string) {
  store.poruka = tekst
  setTimeout(() => (store.poruka = ''), 2500)
}
export function nadjiBiljku(id: number): Biljka {
  return store.plants.find(p => p.id === id) as Biljka
}
export function prosek(p: Biljka): number {
  if (p.recenzije.length === 0) return 0
  return p.recenzije.reduce((z, r) => z + r.ocena, 0) / p.recenzije.length
}
export function rezervisi(plant: Biljka) {
  store.cart.push({ id: sledeciId++, plantId: plant.id, kolicina: 1, status: 'rezervisano', ocena: 0 })
  obavesti('Biljka "' + plant.naziv + '" je rezervisana i dodata u korpu.')
}
export function ukupno(): number {
  return store.cart.filter(s => s.status === 'rezervisano')
    .reduce((z, s) => z + nadjiBiljku(s.plantId).cena * s.kolicina, 0)
}
