<script setup>
import { ref } from 'vue'
import { useStore } from '../store'
import { useRouter } from 'vue-router'
const s = useStore(), r = useRouter(), f = ref({ name: '', email: '', pw: '' }), err = ref('')
const go = () => {
  if (!f.value.name || !f.value.email || f.value.pw.length < 6) return (err.value = 'Fill in every field. Password needs 6+ characters.')
  err.value = s.register(f.value.name, f.value.email, f.value.pw)
  if (!err.value) r.push('/')
}
</script>
<template>
  <div class="card auth">
    <h1>Create a client account</h1>
    <label>Full name<input v-model="f.name"></label>
    <label>Email<input v-model="f.email" type="email"></label>
    <label>Password<input v-model="f.pw" type="password"></label>
    <p class="err" v-if="err">{{ err }}</p>
    <button @click="go">Create account</button>
    <p class="muted">Already registered? <router-link to="/login">Log in</router-link></p>
  </div>
</template>
