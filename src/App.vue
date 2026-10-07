<script setup>
import { useStore } from './store'
import { useRouter } from 'vue-router'
const s = useStore(), r = useRouter()
const out = () => { s.logout(); r.push('/login') }
</script>
<template>
  <header v-if="s.user">
    <strong class="brand">Counsel Desk</strong>
    <nav>
      <router-link to="/">Dashboard</router-link>
      <router-link to="/lawyers">{{ s.user.role === 'admin' ? 'Manage lawyers' : 'Find a lawyer' }}</router-link>
      <router-link to="/appointments">{{ s.user.role === 'admin' ? 'Consultations' : 'My appointments' }}</router-link>
      <router-link v-if="s.user.role === 'admin'" to="/clients">Clients</router-link>
      <router-link v-if="s.user.role === 'admin'" to="/specializations">Specializations</router-link>
      <router-link v-if="s.user.role === 'client'" to="/profile">Profile</router-link>
    </nav>
    <button class="ghost" @click="out">Log out</button>
  </header>
  <main><router-view /></main>
</template>
<style>
:root{--ink:#1e2a3a;--brass:#a67c37;--bg:#eef1f4;--line:#d5dbe2}
*{box-sizing:border-box}body{margin:0;font:16px/1.5 Georgia,serif;background:var(--bg);color:var(--ink)}
header{display:flex;align-items:center;gap:1.5rem;background:var(--ink);color:#fff;padding:.7rem 1.5rem;flex-wrap:wrap}
.brand{font-size:1.2rem;color:#e6c98f}nav{display:flex;gap:1rem;flex:1;flex-wrap:wrap}
nav a{color:#cdd6e0;text-decoration:none;font-family:system-ui,sans-serif;font-size:.95rem}nav a.router-link-exact-active{color:#fff;border-bottom:2px solid var(--brass)}
main{max-width:980px;margin:1.5rem auto;padding:0 1rem;font-family:system-ui,sans-serif}
h1,h2{font-family:Georgia,serif;margin:.2rem 0 1rem}
.card{background:#fff;border:1px solid var(--line);border-radius:6px;padding:1rem;margin-bottom:.8rem}
.row{display:flex;gap:.6rem;align-items:center;flex-wrap:wrap}.grow{flex:1}.muted{color:#66758a;font-size:.9rem}
input,select,textarea{font:inherit;padding:.5rem;border:1px solid var(--line);border-radius:4px;width:100%;margin:.2rem 0 .6rem}
button{font:inherit;background:var(--ink);color:#fff;border:0;padding:.5rem .9rem;border-radius:4px;cursor:pointer}
button.ghost{background:transparent;border:1px solid #6b7b90}button.ok{background:#2f6b4f}button.no{background:#9a3b3b}
button:focus-visible,a:focus-visible,input:focus-visible{outline:3px solid var(--brass);outline-offset:2px}
.tag{padding:.1rem .6rem;border-radius:99px;background:#e4e9ef;font-size:.85rem}
.err{color:#9a3b3b}.auth{max-width:380px;margin:3rem auto}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.8rem}.stats b{font-size:1.8rem;display:block}
</style>
