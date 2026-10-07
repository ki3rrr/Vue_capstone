import { defineStore } from 'pinia'
const seed = () => ({
  seq: 10, me: null,
  specs: ['Family Law', 'Criminal Law', 'Corporate Law', 'Labor Law'],
  users: [
    { id: 1, name: 'Site Admin', email: 'admin@law.test', password: 'admin123', role: 'admin' },
    { id: 2, name: 'Demo Client', email: 'client@law.test', password: 'client123', role: 'client', phone: '' }
  ],
  lawyers: [
    { id: 3, name: 'Atty. Maria Santos', spec: 'Family Law', fee: 1500, bio: '12 years handling custody and annulment cases.', slots: ['2026-10-15T09:00', '2026-10-15T14:00'] },
    { id: 4, name: 'Atty. Jose Reyes', spec: 'Corporate Law', fee: 2500, bio: 'Contracts, incorporation and compliance for small businesses.', slots: ['2026-10-16T10:00'] }
  ],
  appts: [] // {id, clientId, lawyerId, slot, topic, status, rating, comment}
})
export const useStore = defineStore('s', {
  state: () => JSON.parse(localStorage.getItem('lcs-data') || 'null') || seed(),
  getters: { user: s => s.users.find(u => u.id === s.me) },
  actions: {
    id() { return ++this.seq },
    login(email, password) {
      const u = this.users.find(u => u.email === email.trim().toLowerCase() && u.password === password)
      if (!u) return false
      this.me = u.id; return true
    },
    register(name, email, password) {
      email = email.trim().toLowerCase()
      if (this.users.some(u => u.email === email)) return 'That email is already registered.'
      this.users.push({ id: this.id(), name, email, password, role: 'client', phone: '' }) // always client
      return this.login(email, password) ? '' : 'Could not sign in.'
    },
    logout() { this.me = null },
    taken(lawyerId, slot) { return this.appts.some(a => a.lawyerId === lawyerId && a.slot === slot && a.status !== 'Rejected') }
  }
})
