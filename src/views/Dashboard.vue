<script setup>
import { computed } from 'vue'
import { useStore } from '../store'
const s = useStore()
const mine = computed(() => s.user.role === 'admin' ? s.appts : s.appts.filter(a => a.clientId === s.user.id))
const n = st => mine.value.filter(a => a.status === st).length
const revenue = computed(() => mine.value.filter(a => ['Paid', 'Completed'].includes(a.status)).reduce((t, a) => t + s.lawyers.find(l => l.id === a.lawyerId).fee, 0))
</script>
<template>
  <h1>Welcome, {{ s.user.name }}</h1>
  <div class="stats">
    <div class="card"><b>{{ mine.length }}</b>Total requests</div>
    <div class="card"><b>{{ n('Pending') }}</b>Pending</div>
    <div class="card"><b>{{ n('Approved') }}</b>Awaiting payment</div>
    <div class="card"><b>{{ n('Completed') }}</b>Completed</div>
    <div class="card"><b>₱{{ revenue }}</b>{{ s.user.role === 'admin' ? 'Revenue' : 'Paid so far' }}</div>
    <div v-if="s.user.role === 'admin'" class="card"><b>{{ s.users.filter(u => u.role === 'client').length }}</b>Clients</div>
  </div>
</template>
