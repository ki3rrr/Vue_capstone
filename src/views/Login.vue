<script setup>
import { ref } from 'vue'
import { useStore } from '../store'
import { useRouter } from 'vue-router'
const s = useStore(), r = useRouter(), email = ref(''), pw = ref(''), err = ref('')
const go = () => s.login(email.value, pw.value) ? r.push('/') : (err.value = 'Email or password is incorrect.')
</script>
<template>
  <div class="card auth">
    <h1>Welcome Back</h1>
    <label>Email<input v-model="email" type="email" @keyup.enter="go"></label>
    <label>Password<input v-model="pw" type="password" @keyup.enter="go"></label>
    <p class="err" v-if="err">{{ err }}</p>
    <button @click="go">Log in</button>
    <p class="muted">New client? <router-link to="/register">Create an account</router-link></p>
   
  </div>
</template>
