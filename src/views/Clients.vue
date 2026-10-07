<script setup>
import { computed } from 'vue'
import { useStore } from '../store'
const s = useStore(), clients = computed(() => s.users.filter(u => u.role === 'client'))
const del = c => { if (confirm('Delete ' + c.name + ' and their appointments?')) { s.users = s.users.filter(u => u.id !== c.id); s.appts = s.appts.filter(a => a.clientId !== c.id) } }
</script>
<template>
  <h1>Clients</h1>
  <div class="card row" v-for="c in clients" :key="c.id"><div class="grow"><strong>{{ c.name }}</strong><div class="muted">{{ c.email }}</div></div><button class="no" @click="del(c)">Delete</button></div>
</template>
