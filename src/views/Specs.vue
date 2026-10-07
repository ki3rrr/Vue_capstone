<script setup>
import { ref } from 'vue'
import { useStore } from '../store'
const s = useStore(), n = ref('')
const add = () => { const v = n.value.trim(); if (v && !s.specs.includes(v)) s.specs.push(v); n.value = '' }
const del = x => { s.specs = s.specs.filter(y => y !== x) }
</script>
<template>
  <h1>Specializations</h1>
  <div class="card row"><input class="grow" v-model="n" placeholder="New specialization" @keyup.enter="add"><button @click="add">Add</button></div>
  <div class="card row" v-for="x in s.specs" :key="x"><span class="grow">{{ x }}</span><button class="no" @click="del(x)">Remove</button></div>
</template>
