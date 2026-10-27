<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store, rezervisi, prosek } from '../store'
import type { Biljka } from '../types'
import Zvezde from './Zvezde.vue'
import BiljkaSlika from './BiljkaSlika.vue' // DODATO: slika biljke (ili ikonica)

const router = useRouter()

// Oblik objekta sa svim kriterijumima pretrage (cenaDo je prazan string dok korisnik ništa ne unese)
interface Filteri { naziv: string; opis: string; tip: string; grupa: string; datumOd: string; cenaDo: number | ''; ocenaOd: number }
// Vraća "prazne" filtere: koristi se za početno stanje i za dugme "Poništi filtere"
const prazno = (): Filteri => ({ naziv: '', opis: '', tip: '', grupa: '', datumOd: '', cenaDo: '', ocenaOd: 0 })

// Svaki kriterijum pretrage je zaseban (kako zadatak traži)
// ref = reaktivna promenljiva: kad se promeni, Vue sam osveži ekran (vrednost se čita preko .value)
const f = ref<Filteri>(prazno())
// Biljka čiji su detalji otvoreni u dijalogu (null = dijalog je zatvoren)
const izabrana = ref<Biljka | null>(null)

// Jedinstveni tipovi za padajući meni (Set izbacuje duplikate); computed ih sam preračuna iz podataka
const tipovi = computed(() => [...new Set(store.plants.map(p => p.tip))])
const grupe = computed(() => [...new Set(store.plants.map(p => p.grupa))])

// Lista koja se prikazuje: biljka ostaje samo ako zadovoljava SVE uslove, a prazan filter propušta sve.
// includes() traži tekst bilo gde u nazivu, a toLowerCase() ignoriše razliku između velikih i malih slova.
const rezultat = computed(() => store.plants.filter(p =>
  p.naziv.toLowerCase().includes(f.value.naziv.toLowerCase()) &&
  (p.opis + ' ' + p.nega).toLowerCase().includes(f.value.opis.toLowerCase()) &&
  (f.value.tip === '' || p.tip === f.value.tip) &&
  (f.value.grupa === '' || p.grupa === f.value.grupa) &&
  (f.value.datumOd === '' || p.datum >= f.value.datumOd) &&
  (f.value.cenaDo === '' || p.cena <= f.value.cenaDo) &&
  prosek(p) >= f.value.ocenaOd
))

function reset() { f.value = prazno() }
// Neprijavljen korisnik se šalje na prijavu; prijavljen rezerviše biljku, pa se dijalog zatvara
function klikRezervisi(p: Biljka) {
  if (!store.user) { router.push('/prijava'); return }
  rezervisi(p)
  izabrana.value = null
}
</script>

<template>
  <section class="pretraga">
    <h1>Pretraga biljaka</h1>
    <p class="pretraga-uvod">Zadajte jedan ili više kriterijuma. Spisak ispod se menja čim promenite neki od njih.</p>
    <div class="row g-3">
      <!-- v-model povezuje polje sa promenljivom: šta god se ukuca ulazi u f.naziv, pa se lista odmah menja -->
      <div class="col-md-6 col-lg-3">
        <label class="form-label" for="f-naziv">Naziv</label>
        <input id="f-naziv" class="form-control" v-model="f.naziv" placeholder="npr. Monstera">
      </div>
      <div class="col-md-6 col-lg-3">
        <label class="form-label" for="f-opis">Opis, sadnja i nega</label>
        <input id="f-opis" class="form-control" v-model="f.opis" placeholder="npr. sunce, zalivanje">
      </div>
      <div class="col-md-6 col-lg-3">
        <label class="form-label" for="f-tip">Tip</label>
        <select id="f-tip" class="form-select" v-model="f.tip"><option value="">Svi tipovi</option><option v-for="t in tipovi" :key="t">{{ t }}</option></select>
      </div>
      <div class="col-md-6 col-lg-3">
        <label class="form-label" for="f-grupa">Ciljna grupa</label>
        <select id="f-grupa" class="form-select" v-model="f.grupa"><option value="">Sve ciljne grupe</option><option v-for="g in grupe" :key="g">{{ g }}</option></select>
      </div>
      <div class="col-md-6 col-lg-3">
        <label class="form-label" for="f-datum">Proizvedeno od</label>
        <input id="f-datum" class="form-control" type="date" v-model="f.datumOd" title="Proizvedeno od">
      </div>
      <div class="col-md-6 col-lg-3">
        <label class="form-label" for="f-cena">Maksimalna cena (RSD)</label>
        <input id="f-cena" class="form-control" type="number" v-model="f.cenaDo" placeholder="npr. 1000">
      </div>
      <div class="col-md-6 col-lg-3">
        <label class="form-label" for="f-ocena">Ocena korisnika</label>
        <select id="f-ocena" class="form-select" v-model="f.ocenaOd"><option :value="0">Bilo koja ocena</option><option :value="3">3+ zvezdice</option><option :value="4">4+ zvezdice</option></select>
      </div>
      <div class="col-md-6 col-lg-3 d-flex align-items-end">
        <button class="btn btn-outline-light w-100" @click="reset"><i class="fa-solid fa-rotate-left"></i> Poništi filtere</button>
      </div>
    </div>
  </section>

  <div class="zaglavlje-liste">
    <h2>Ponuda biljaka</h2>
    <span class="brojac">Prikazano {{ rezultat.length }} od {{ store.plants.length }}</span>
  </div>

  <!-- v-if prikazuje poruku samo kada nijedna biljka ne odgovara pretrazi -->
  <div v-if="rezultat.length === 0" class="prazno">
    <i class="fa-solid fa-magnifying-glass"></i>
    <strong>Nema biljaka koje odgovaraju pretrazi.</strong>
    Promenite kriterijume ili poništite filtere.
  </div>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
    <!-- v-for pravi jednu karticu za svaku biljku iz rezultata; :key pomaže Vue-u da prepozna koja je koja -->
    <div class="col" v-for="p in rezultat" :key="p.id">
      <article class="card h-100 biljka-kartica">
        <!-- data-tip određuje boju pločice prema tipu biljke (vidi style.css) -->
        <div class="biljka-slika" :data-tip="p.tip">
          <BiljkaSlika :biljka="p" />
          <span class="cena-tag">{{ p.cena }} RSD</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">{{ p.naziv }}</h3>
          <div class="oznake">
            <span class="oznaka oznaka-tip">{{ p.tip }}</span>
            <span class="oznaka">{{ p.grupa }}</span>
          </div>
          <p class="biljka-opis">{{ p.opis }}</p>
          <div class="biljka-meta">
            <!-- Zvezde prikazuju prosečnu ocenu; bez recenzija piše "Još nema recenzija" -->
            <span v-if="p.recenzije.length">
              <Zvezde :ocena="prosek(p)" />
              <small class="ms-1">{{ prosek(p).toFixed(1) }} ({{ p.recenzije.length }})</small>
            </span>
            <span v-else>Još nema recenzija</span>
            <span title="Datum proizvodnje"><i class="fa-regular fa-calendar"></i> {{ p.datum }}</span>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-outline-success btn-sm" @click="izabrana = p"><i class="fa-solid fa-circle-info"></i> Detalji</button>
          <button class="btn btn-success btn-sm" @click="klikRezervisi(p)"><i class="fa-solid fa-cart-plus"></i> Rezerviši</button>
        </div>
      </article>
    </div>
  </div>

  <!-- Dijalog sa detaljima (Bootstrap klase, a prikazom upravlja Vue preko v-if).
       @click.self zatvara dijalog klikom na tamnu pozadinu, ali ne i klikom unutar samog dijaloga -->
  <div v-if="izabrana" class="modal d-block prekrivac" @click.self="izabrana = null">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="detalji-zaglavlje" :data-tip="izabrana.tip">
          <span class="detalji-slika"><BiljkaSlika :biljka="izabrana" /></span>
          <div>
            <h2>{{ izabrana.naziv }}</h2>
            <Zvezde :ocena="prosek(izabrana)" /> <small>({{ izabrana.recenzije.length }})</small>
          </div>
          <button class="btn-close" aria-label="Zatvori" @click="izabrana = null"></button>
        </div>
        <div class="modal-body">
          <p class="mb-0">{{ izabrana.opis }}</p>
          <div class="nega-kutija"><i class="fa-solid fa-droplet"></i><div><b>Sadnja i nega:</b> {{ izabrana.nega }}</div></div>
          <ul class="cinjenice">
            <li><small>Tip</small><i class="fa-solid fa-tag"></i>{{ izabrana.tip }}</li>
            <li><small>Ciljna grupa</small><i class="fa-solid fa-users"></i>{{ izabrana.grupa }}</li>
            <li><small>Proizvedeno</small><i class="fa-solid fa-calendar"></i>{{ izabrana.datum }}</li>
            <li><small>Cena</small><i class="fa-solid fa-coins"></i>{{ izabrana.cena }} RSD</li>
          </ul>
          <div class="recenzije">
            <h3>Recenzije kupaca</h3>
            <p v-if="izabrana.recenzije.length === 0" class="text-muted">Još nema recenzija.</p>
            <div v-for="r in izabrana.recenzije" :key="r.autor" class="recenzija">
              <Zvezde :ocena="r.ocena" /> <b class="ms-1">{{ r.autor }}</b>
              <p>{{ r.tekst }}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" @click="klikRezervisi(izabrana)"><i class="fa-solid fa-cart-plus"></i> Rezerviši</button>
          <button class="btn btn-outline-secondary" @click="izabrana = null">Zatvori</button>
        </div>
      </div>
    </div>
  </div>
</template>