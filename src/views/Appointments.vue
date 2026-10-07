<script setup>
import { computed } from 'vue'
import { useStore } from '../store'
const s = useStore(), admin = s.user.role === 'admin'
const list = computed(() => (admin ? s.appts : s.appts.filter(a => a.clientId === s.user.id)).slice().reverse())
const L = a => s.lawyers.find(l => l.id === a.lawyerId) || { name: 'Removed lawyer', fee: 0 }
const C = a => s.users.find(u => u.id === a.clientId)?.name || 'Unknown'
// Flow: Pending -> Approved (or Rejected) -> Paid -> Completed -> feedback
const set = (a, st) => (a.status = st)
</script>
<template>
  <h1>{{ admin ? 'Consultations' : 'My appointments' }}</h1>
  <p v-if="!list.length" class="muted">{{ admin ? 'No requests yet.' : 'You have no appointments. Find a lawyer to request one.' }}</p>
  <div class="card" v-for="a in list" :key="a.id">
    <div class="row"><strong class="grow">{{ L(a).name }}<span v-if="admin"> · {{ C(a) }}</span></strong><span class="tag">{{ a.status }}</span></div>
    <p class="muted">{{ a.slot.replace('T', ' ') }} · ₱{{ L(a).fee }}</p>
    <p>{{ a.topic }}</p>
    <div class="row">
      <template v-if="admin">
        <button v-if="a.status === 'Pending'" class="ok" @click="set(a, 'Approved')">Approve</button>
        <button v-if="a.status === 'Pending'" class="no" @click="set(a, 'Rejected')">Reject</button>
        <button v-if="a.status === 'Paid'" @click="set(a, 'Completed')">Mark completed</button>
      </template>
      <button v-else-if="a.status === 'Approved'" class="ok" @click="set(a, 'Paid')">Pay ₱{{ L(a).fee }}</button>
      <template v-if="!admin && a.status === 'Completed' && !a.rating">
        <select style="width:auto" @change="a.rating = +$event.target.value"><option value="">Rate…</option><option v-for="n in 5" :value="n">{{ n }} star{{ n > 1 ? 's' : '' }}</option></select>
      </template>
    </div>
    <p v-if="a.rating" class="muted">Rating: {{ a.rating }}/5</p>
  </div>
</template>
