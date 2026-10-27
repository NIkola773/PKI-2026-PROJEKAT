<script setup lang="ts">
import { ref } from 'vue'

// Unapred definisano stablo dijaloga: svaki čvor ima tekst i ponuđene odgovore
interface Cvor { tekst: string; opcije: [string, string][] }
const stablo: Record<string, Cvor> = {
  start: { tekst: 'Zdravo! Kako mogu da pomognem?', opcije: [['Kako da rezervišem biljku?', 'rez'], ['Kako da ocenim biljku?', 'ocena'], ['Koja biljka je dobra za početnike?', 'pocetnik']] },
  rez: { tekst: 'Prijavite se, otvorite detalje biljke i kliknite "Rezerviši". Biljka će se naći u korpi.', opcije: [['Nazad', 'start']] },
  ocena: { tekst: 'Biljku možete oceniti u korpi, kada ima status "pristiglo".', opcije: [['Nazad', 'start']] },
  pocetnik: { tekst: 'Preporučujemo sobne biljke: kaktus, monsteru ili fikus. Želite savet o nezi?', opcije: [['Da', 'nega'], ['Ne, hvala', 'start']] },
  nega: { tekst: 'Većina sobnih biljaka voli svetlo bez direktnog sunca i umereno zalivanje.', opcije: [['Nazad', 'start']] }
}
const razgovor = ref<{ ko: 'agent' | 'korisnik'; tekst: string }[]>([{ ko: 'agent', tekst: stablo.start.tekst }])
const trenutni = ref('start')

function izaberi(tekst: string, kljuc: string) {
  razgovor.value.push({ ko: 'korisnik', tekst })
  razgovor.value.push({ ko: 'agent', tekst: stablo[kljuc].tekst })
  trenutni.value = kljuc
}
</script>

<template>
  <div class="row justify-content-center"><div class="col-lg-8 col-xl-7">
    <div class="naslov-strane"><span class="naslov-ikona"><i class="fa-solid fa-robot"></i></span><h1>Agent za pomoć</h1></div>
    <div class="cet">
      <div class="cet-poruke">
        <div v-for="(p, i) in razgovor" :key="i" class="poruka" :class="p.ko">
          <span v-if="p.ko === 'agent'" class="poruka-avatar"><i class="fa-solid fa-robot"></i></span>
          <div class="poruka-tekst">{{ p.tekst }}</div>
        </div>
      </div>
      <div class="cet-opcije">
        <p>Izaberite odgovor:</p>
        <div class="d-flex flex-wrap gap-2">
          <button v-for="o in stablo[trenutni].opcije" :key="o[0]" class="btn btn-outline-success btn-sm" @click="izaberi(o[0], o[1])">{{ o[0] }}</button>
        </div>
      </div>
    </div>
  </div></div>
</template>
