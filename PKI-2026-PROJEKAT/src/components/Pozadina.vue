<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

// DODATO: animirana pozadina na svim stranama - tačkice koje plutaju i povezuju se tankim linijama
// kada su blizu jedna drugoj. Crta se na <canvas> elementu (HTML "platno" po kome crtamo kodom).
// Komponenta se nalazi u App.vue, pa se vidi na svakoj stranici.

interface Cestica { x: number; y: number; vx: number; vy: number; velicina: number }

const platno = ref<HTMLCanvasElement | null>(null)   // veza ka <canvas> iz šablona
let cestice: Cestica[] = []
let sirina = 0
let visina = 0
let animacijaId = 0

const DOMET_LINIJE = 160  // na kom rastojanju (u pikselima) se dve tačkice povezuju linijom
const BOJA = '31, 122, 90' // RGB naše zelene (--list), a providnost dodajemo pri crtanju

// Pravi tačkice na nasumičnim mestima sa nasumičnom brzinom; broj zavisi od veličine ekrana
function napraviCestice() {
  const broj = Math.min(110, Math.floor((sirina * visina) / 14000))
  cestice = Array.from({ length: broj }, () => ({
    x: Math.random() * sirina,
    y: Math.random() * visina,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    velicina: Math.random() * 2 + 1.2
  }))
}

// Platno mora da ima istu veličinu kao prozor; množimo sa devicePixelRatio da slika bude oštra na jakim ekranima
function podesiVelicinu() {
  const c = platno.value
  if (!c) return
  const gustina = window.devicePixelRatio || 1
  sirina = window.innerWidth
  visina = window.innerHeight
  c.width = sirina * gustina
  c.height = visina * gustina
  c.getContext('2d')?.setTransform(gustina, 0, 0, gustina, 0, 0)
  napraviCestice()
}

// Jedan "kadar" animacije: obriši sve, nacrtaj tačkice, nacrtaj linije, pomeri tačkice
function nacrtaj(pomeraj: boolean) {
  const ctx = platno.value?.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, sirina, visina)

  // 1) tačkice
  ctx.fillStyle = `rgba(${BOJA}, 0.55)`
  for (const c of cestice) {
    ctx.beginPath()
    ctx.arc(c.x, c.y, c.velicina, 0, Math.PI * 2)
    ctx.fill()
    if (pomeraj) {
      c.x += c.vx
      c.y += c.vy
      // kad tačkica izađe sa jedne strane ekrana, vraća se sa suprotne
      if (c.x < 0) c.x = sirina
      if (c.x > sirina) c.x = 0
      if (c.y < 0) c.y = visina
      if (c.y > visina) c.y = 0
    }
  }

  // 2) linije: svaki par tačkica proveravamo samo jednom (j kreće od i + 1)
  ctx.lineWidth = 1
  for (let i = 0; i < cestice.length; i++) {
    for (let j = i + 1; j < cestice.length; j++) {
      const dx = cestice[i].x - cestice[j].x
      const dy = cestice[i].y - cestice[j].y
      const razmak = Math.sqrt(dx * dx + dy * dy)  // Pitagorina teorema = rastojanje dve tačke
      if (razmak < DOMET_LINIJE) {
        // što su tačkice bliže, linija je jasnija; što su dalje, bleđa
        ctx.strokeStyle = `rgba(${BOJA}, ${(1 - razmak / DOMET_LINIJE) * 0.28})`
        ctx.beginPath()
        ctx.moveTo(cestice[i].x, cestice[i].y)
        ctx.lineTo(cestice[j].x, cestice[j].y)
        ctx.stroke()
      }
    }
  }
}

function petlja() {
  nacrtaj(true)
  animacijaId = requestAnimationFrame(petlja) // browser sam pozove petlju pred sledeći kadar
}

onMounted(() => {
  podesiVelicinu()
  window.addEventListener('resize', podesiVelicinu)
  // Pristupačnost: ako je korisnik u sistemu isključio animacije, crtamo samo jedan mirni kadar
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) nacrtaj(false)
  else petlja()
})

// Kad se komponenta ukloni, prekidamo animaciju i slušanje (da ništa ne radi "u pozadini" bez potrebe)
onBeforeUnmount(() => {
  cancelAnimationFrame(animacijaId)
  window.removeEventListener('resize', podesiVelicinu)
})
</script>

<template>
  <!-- aria-hidden: čitači ekrana preskaču pozadinu jer je samo ukras -->
  <canvas ref="platno" class="pozadina" aria-hidden="true"></canvas>
</template>
