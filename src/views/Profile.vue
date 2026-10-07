<script setup>
import { ref } from 'vue'
import { useStore } from '../store'
const s = useStore(), saved = ref(false)
</script>
<template>
  <h1>Profile</h1>
  <div class="card" style="max-width:420px">
    <label>Full name<input v-model="s.user.name"></label>
    <label>Phone<input v-model="s.user.phone"></label>
    <p class="muted">{{ s.user.email }}</p>
    <button @click="saved = true">Save changes</button> <span v-if="saved" class="muted">Saved</span>
  </div>
</template>
