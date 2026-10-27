<script setup lang="ts">
import { slikeBiljaka } from '../slike'
import type { Biljka } from '../types'


defineProps<{ biljka: Biljka }>()

// Ikonica po tipu biljke 
const ikonice: Record<string, string> = {
  sobno: 'fa-house-chimney-window',
  baštensko: 'fa-tree',
  rezano: 'fa-spa',
  začinsko: 'fa-mortar-pestle',
  povrtarsko: 'fa-carrot'
}
</script>

<template>
  <img v-if="slikeBiljaka[biljka.id]" class="slika-biljke" :src="slikeBiljaka[biljka.id]" :alt="biljka.naziv">
  <i v-else class="fa-solid slika-ikona" :class="ikonice[biljka.tip] || 'fa-seedling'" :title="biljka.naziv"></i>
</template>
