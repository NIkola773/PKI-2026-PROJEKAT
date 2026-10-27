# Prodavnica biljaka (Vue 3 + Vite + TypeScript + Bootstrap 5 + Font Awesome + vue-router)
Pokretanje: `npm install` pa `npm run dev`. Demo nalog: demo@mail.com / 123
Struktura: src/plants.ts, src/types.ts (podaci), src/store.ts, src/router.ts (rute) (stanje), components/ (Shop, Cart, Auth, Profile, Agent).
Izgled: Bootstrap 5 + Font Awesome, a svi dodatni stilovi su u src/style.css (boje i fontovi su na vrhu fajla u promenljivama). Fontovi (Bricolage Grotesque, Figtree) dolaze iz npm paketa @fontsource-variable, pa rade i bez interneta.
Dodato: (1) animirana pozadina na svim stranama - canvas sa tačkicama i linijama (components/Pozadina.vue + kraj style.css); (2) slike biljaka: svoje slike kopiraš u src/assets/ i uvezeš u src/slike.ts (uputstvo je na vrhu tog fajla); dok slike nema, prikazuje se Font Awesome ikonica; (3) doterivanje izgleda na kraju style.css. Sve dodate linije označene su komentarom "DODATO".
