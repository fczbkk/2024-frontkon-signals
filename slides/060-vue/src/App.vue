<script setup>
import { computed, ref } from 'vue';
const count = ref(0);
const triple = computed(() => count.value * 3)
const isTripleEven = computed(() => count.value % 2 === 0)
</script>

<template>
  <p>Count: {{count}}</p>
  <p>Triple: {{triple}}</p>
  <p>Is triple even: {{isTripleEven ? 'yes' : 'no'}}</p>
  <p><button @click="count++">+1</button></p>
</template>