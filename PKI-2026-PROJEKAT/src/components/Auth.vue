<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store, obavesti } from '../store'
const router = useRouter()
const route = useRoute()

const registracija = ref(false)
const greska = ref('')
const forma = ref({ ime: '', email: '', telefon: '', adresa: '', omiljene: '', lozinka: '' })

function posalji() {
  greska.value = ''
  if (registracija.value) {
    // Pri registraciji moraju biti uneti svi podaci profila
    if (Object.values(forma.value).some(v => v.trim() === '')) { greska.value = 'Popunite sva polja.'; return }
    store.users.push({ ...forma.value })
    store.user = store.users[store.users.length - 1]
  } else {
    const u = store.users.find(x => x.email === forma.value.email && x.lozinka === forma.value.lozinka)
    if (!u) { greska.value = 'Pogrešan email ili lozinka.'; return }
    store.user = u
  }
  obavesti('Dobrodošli, ' + store.user.ime + '!')
  router.push((route.query.nazad as string) || '/') // vrati korisnika tamo gde je krenuo
}
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-lg-10 col-xl-9">
      <div class="auth-kartica">
        <aside class="auth-strana">
          <!-- DODATO: Font Awesome ikone umesto emoji -->
          <div class="auth-ikone"><i class="fa-solid fa-leaf"></i><i class="fa-solid fa-spa"></i><i class="fa-solid fa-seedling"></i></div>
          <h2>{{ registracija ? 'Napravite nalog' : 'Dobrodošli nazad' }}</h2>
          <p class="mb-0">{{ registracija ? 'Za registraciju su obavezni svi podaci profila.' : 'Prijavite se da biste rezervisali biljke i pratili svoju korpu.' }}</p>
        </aside>
        <div class="auth-forma">
          <h1><i class="fa-solid" :class="registracija ? 'fa-user-plus' : 'fa-right-to-bracket'"></i> {{ registracija ? 'Registracija' : 'Prijava' }}</h1>
          <div class="d-grid gap-3">
            <div v-if="registracija" class="form-floating"><input id="a-ime" class="form-control" v-model="forma.ime" placeholder="Ime i prezime"><label for="a-ime">Ime i prezime</label></div>
            <div class="form-floating"><input id="a-email" class="form-control" v-model="forma.email" placeholder="Email"><label for="a-email">Email</label></div>
            <div v-if="registracija" class="form-floating"><input id="a-tel" class="form-control" v-model="forma.telefon" placeholder="Telefon"><label for="a-tel">Telefon</label></div>
            <div v-if="registracija" class="form-floating"><input id="a-adr" class="form-control" v-model="forma.adresa" placeholder="Adresa"><label for="a-adr">Adresa</label></div>
            <div v-if="registracija" class="form-floating"><input id="a-omilj" class="form-control" v-model="forma.omiljene" placeholder="Omiljene vrste biljaka"><label for="a-omilj">Omiljene vrste biljaka</label></div>
            <div class="form-floating"><input id="a-loz" class="form-control" type="password" v-model="forma.lozinka" placeholder="Lozinka"><label for="a-loz">Lozinka</label></div>
            <div v-if="greska" class="alert alert-danger py-2 mb-0"><i class="fa-solid fa-circle-exclamation"></i> {{ greska }}</div>
            <button class="btn btn-success btn-lg" @click="posalji">{{ registracija ? 'Registruj se' : 'Prijavi se' }}</button>
            <a class="prebaci" href="#" @click.prevent="registracija = !registracija">{{ registracija ? 'Već imam nalog' : 'Nemam nalog' }}</a>
            <small v-if="!registracija" class="demo-nalog"><i class="fa-solid fa-circle-info"></i> Demo nalog: demo@mail.com / 123</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
