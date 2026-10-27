<script setup lang="ts">
import { useRouter } from 'vue-router'
import { store } from './store'
import Pozadina from './components/Pozadina.vue' // DODATO: animirana pozadina

const router = useRouter()
function odjava() { store.user = null; router.push('/') }
</script>

<template>
  <Pozadina />
  <nav class="vrh">
    <div class="container vrh-sadrzaj">
      <span class="brend"><span class="brend-znak"><i class="fa-solid fa-leaf"></i></span> Prodavnica biljaka</span>
      <div class="meni">
        <RouterLink class="veza" to="/" active-class="active"><i class="fa-solid fa-seedling"></i> Biljke</RouterLink>
        <RouterLink class="veza" to="/korpa" active-class="active"><i class="fa-solid fa-basket-shopping"></i> Korpa</RouterLink>
        <RouterLink class="veza" to="/pomoc" active-class="active"><i class="fa-solid fa-circle-question"></i> Pomoć</RouterLink>
        <RouterLink v-if="store.user" class="veza veza-korisnik" to="/profil" active-class="active"><i class="fa-solid fa-user"></i> {{ store.user.ime }}</RouterLink>
        <button v-if="store.user" class="veza veza-izlaz" @click="odjava"><i class="fa-solid fa-right-from-bracket"></i> Odjava</button>
        <RouterLink v-else class="veza veza-prijava" to="/prijava"><i class="fa-solid fa-right-to-bracket"></i> Prijava</RouterLink>
      </div>
    </div>
  </nav>

  <div v-if="store.poruka" class="obavestenje" role="status">
    <i class="fa-solid fa-check"></i><span>{{ store.poruka }}</span>
  </div>

  <div class="container py-4">
    <RouterView />
  </div>

  <!-- DODATO: podnožje strane -->
  <footer class="podnozje"><i class="fa-solid fa-leaf"></i> Prodavnica biljaka · prototip korisničkog interfejsa</footer>
</template>
