import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from './store'
import Shop from './components/Shop.vue'
import Cart from './components/Cart.vue'
import Auth from './components/Auth.vue'
import Profile from './components/Profile.vue'
import Agent from './components/Agent.vue'

// Svaka adresa (path) prikazuje jednu komponentu.
// meta.zahtevaPrijavu = true znači da je strana dostupna samo prijavljenom korisniku.
export const router = createRouter({
  history: createWebHashHistory(), // adrese izgledaju kao /#/korpa, radi i bez servera
  routes: [
    { path: '/', component: Shop },
    { path: '/korpa', component: Cart, meta: { zahtevaPrijavu: true } },
    { path: '/prijava', component: Auth },
    { path: '/profil', component: Profile, meta: { zahtevaPrijavu: true } },
    { path: '/pomoc', component: Agent }
  ]
})

// Čuvar navigacije: pre svakog prelaska proveri da li je prijava potrebna
router.beforeEach(to => {
  if (to.meta.zahtevaPrijavu && !store.user) {
    return { path: '/prijava', query: { nazad: to.fullPath } } // zapamti gde je korisnik hteo da ode
  }
})
