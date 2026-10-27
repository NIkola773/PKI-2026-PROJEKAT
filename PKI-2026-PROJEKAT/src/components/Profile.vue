<script setup lang="ts">
import { store, obavesti } from '../store'
// v-model menja objekat korisnika direktno, pa dugme samo prikazuje poruku
</script>

<template>
  <div class="row justify-content-center" v-if="store.user">
    <div class="col-md-9 col-lg-7">
      <div class="profil-kartica">
        <div class="profil-zaglavlje">
          <span class="profil-avatar"><i class="fa-solid fa-user"></i></span>
          <div><h1>Moj profil</h1><span>{{ store.user.email }}</span></div>
        </div>
        <div class="profil-telo">
          <div class="row g-3">
            <div class="col-12">
              <label class="form-label" for="p-ime">Ime i prezime</label>
              <div class="input-group"><span class="input-group-text"><i class="fa-solid fa-user"></i></span><input id="p-ime" class="form-control" v-model="store.user.ime"></div>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="p-email">Email</label>
              <div class="input-group"><span class="input-group-text"><i class="fa-solid fa-envelope"></i></span><input id="p-email" class="form-control" v-model="store.user.email"></div>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="p-tel">Telefon</label>
              <div class="input-group"><span class="input-group-text"><i class="fa-solid fa-phone"></i></span><input id="p-tel" class="form-control" v-model="store.user.telefon"></div>
            </div>
            <div class="col-12">
              <label class="form-label" for="p-adr">Adresa</label>
              <div class="input-group"><span class="input-group-text"><i class="fa-solid fa-location-dot"></i></span><input id="p-adr" class="form-control" v-model="store.user.adresa"></div>
            </div>
            <div class="col-12">
              <label class="form-label" for="p-omilj">Omiljene vrste</label>
              <div class="input-group"><span class="input-group-text"><i class="fa-solid fa-heart"></i></span><input id="p-omilj" class="form-control" v-model="store.user.omiljene"></div>
            </div>
            <div class="col-12">
              <label class="form-label" for="p-loz">Lozinka</label>
              <div class="input-group"><span class="input-group-text"><i class="fa-solid fa-lock"></i></span><input id="p-loz" class="form-control" type="password" v-model="store.user.lozinka"></div>
            </div>
            <div class="col-12">
              <button class="btn btn-success" @click="obavesti('Profil je sačuvan.')"><i class="fa-solid fa-floppy-disk"></i> Sačuvaj izmene</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
