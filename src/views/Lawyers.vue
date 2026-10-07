<script setup>
import { ref } from 'vue'
import { useStore } from '../store'
const s = useStore(), admin = s.user.role === 'admin'
const pick = ref(null), slot = ref(''), topic = ref(''), msg = ref(''), nf = ref({ name: '', spec: s.specs[0], fee: 1000, bio: '' }), ns = ref({})
const free = l => l.slots.filter(x => !s.taken(l.id, x))
const request = l => {
  if (!slot.value || !topic.value) return (msg.value = 'Choose a time and describe your concern.')
  s.appts.push({ id: s.id(), clientId: s.user.id, lawyerId: l.id, slot: slot.value, topic: topic.value, status: 'Pending' })
  pick.value = null; slot.value = topic.value = msg.value = ''
}
const add = () => { if (nf.value.name) { s.lawyers.push({ id: s.id(), ...nf.value, slots: [] }); nf.value = { name: '', spec: s.specs[0], fee: 1000, bio: '' } } }
const addSlot = l => { if (ns.value[l.id] && !l.slots.includes(ns.value[l.id])) l.slots.push(ns.value[l.id]); ns.value[l.id] = '' }
const del = l => { if (confirm('Remove ' + l.name + '?')) s.lawyers = s.lawyers.filter(x => x.id !== l.id) }
</script>
<template>
  <h1>{{ admin ? 'Manage lawyers' : 'Find a lawyer' }}</h1>
  <div v-if="admin" class="card">
    <h2>Add lawyer</h2>
    <div class="row"><input class="grow" v-model="nf.name" placeholder="Name"><select v-model="nf.spec"><option v-for="x in s.specs">{{ x }}</option></select><input type="number" v-model.number="nf.fee" style="width:110px"></div>
    <input v-model="nf.bio" placeholder="Short bio"><button @click="add">Add lawyer</button>
  </div>
  <div class="card" v-for="l in s.lawyers" :key="l.id">
    <div class="row"><h2 class="grow">{{ l.name }}</h2><span class="tag">{{ l.spec }}</span><strong>₱{{ l.fee }}</strong></div>
    <p>{{ l.bio }}</p>
    <template v-if="admin">
      <p class="muted">Open slots: {{ l.slots.join(', ') || 'none' }}</p>
      <div class="row"><input class="grow" type="datetime-local" v-model="ns[l.id]"><button @click="addSlot(l)">Add slot</button><button class="no" @click="del(l)">Remove</button></div>
    </template>
    <template v-else>
      <button v-if="pick !== l.id" @click="pick = l.id" :disabled="!free(l).length">{{ free(l).length ? 'Request consultation' : 'No open slots' }}</button>
      <div v-else>
        <select v-model="slot"><option value="">Choose a time</option><option v-for="x in free(l)" :value="x">{{ x.replace('T', ' ') }}</option></select>
        <textarea v-model="topic" rows="3" placeholder="What do you need help with?"></textarea>
        <p class="err" v-if="msg">{{ msg }}</p>
        <div class="row"><button @click="request(l)">Send request</button><button class="ghost" style="color:var(--ink)" @click="pick = null">Cancel</button></div>
      </div>
    </template>
  </div>
</template>
