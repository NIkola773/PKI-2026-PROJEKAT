<script setup lang="ts">
import { store, nadjiBiljku, ukupno, obavesti } from '../store'
import type { Stavka } from '../types'
import Zvezde from './Zvezde.vue'
import BiljkaSlika from './BiljkaSlika.vue' // DODATO: slika biljke (ili ikonica)

// Za 'rezervisano' dozvoljena izmena i otkazivanje, za 'pristiglo' brisanje i ocenjivanje
function otkazi(s: Stavka) { s.status = 'otkazano'; obavesti('Rezervacija je otkazana.') }
function obrisi(s: Stavka) {
  store.cart = store.cart.filter(x => x !== s)
  obavesti('Stavka je obrisana iz korpe.')
}
function oceni(s: Stavka, o: number) { s.ocena = o; obavesti('Hvala na oceni!') }
// Samo simulacija da bismo mogli da testiramo status 'pristiglo'
function simulirajDolazak(s: Stavka) { s.status = 'pristiglo' }
function boja(s: Stavka): string {
  if (s.status === 'rezervisano') return 'warning'
  if (s.status === 'pristiglo') return 'success'
  return 'secondary'
}
</script>

<template>
  <div class="naslov-strane"><span class="naslov-ikona"><i class="fa-solid fa-basket-shopping"></i></span><h1>Korpa rezervacija</h1></div>
  <div v-if="store.cart.length === 0" class="prazno">
    <i class="fa-solid fa-basket-shopping"></i>
    <strong>Korpa je prazna.</strong>
    Rezervisane biljke pojaviće se ovde.
  </div>
  <div class="stavka" v-for="s in store.cart" :key="s.id">
    <div class="stavka-slika" :data-tip="nadjiBiljku(s.plantId).tip"><BiljkaSlika :biljka="nadjiBiljku(s.plantId)" /></div>
    <div class="stavka-info">
      <h2>{{ nadjiBiljku(s.plantId).naziv }}</h2>
      <span class="stavka-cena">{{ nadjiBiljku(s.plantId).cena }} RSD</span>
      <span class="status" :class="'status-' + boja(s)">{{ s.status }}</span>
    </div>
    <div v-if="s.status === 'rezervisano'" class="stavka-akcije">
      <label class="kolicina">Količina <input class="form-control" type="number" min="1" v-model.number="s.kolicina"></label>
      <button class="btn btn-outline-secondary btn-sm" @click="simulirajDolazak(s)" title="Samo za demo"><i class="fa-solid fa-truck"></i> (demo) Stigla</button>
      <button class="btn btn-danger btn-sm" @click="otkazi(s)"><i class="fa-solid fa-ban"></i> Otkaži</button>
    </div>
    <div v-if="s.status === 'pristiglo'" class="stavka-akcije">
      <Zvezde :ocena="s.ocena" :klik="true" @izaberi="n => oceni(s, n)" />
      <button class="btn btn-danger btn-sm" @click="obrisi(s)"><i class="fa-solid fa-trash"></i> Obriši</button>
    </div>
  </div>
  <div class="ukupno"><span>Ukupno (rezervisano)</span><b>{{ ukupno() }} RSD</b></div>
</template>
