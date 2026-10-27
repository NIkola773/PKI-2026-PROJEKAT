<script setup lang="ts">
// Prima ocenu (props) i, ako je klik=true, javlja koja je zvezdica kliknuta (emit)
defineProps<{ ocena: number; klik?: boolean }>()
const emit = defineEmits<{ (e: 'izaberi', n: number): void }>()
</script>

<template>
  <span>
    <i v-for="n in 5" :key="n" class="zvezda" :class="[n <= Math.round(ocena) ? 'fa-solid' : 'fa-regular', 'fa-star', { 'zvezda-klik': klik }]"
       @click="klik && emit('izaberi', n)"></i>
  </span>
</template>
