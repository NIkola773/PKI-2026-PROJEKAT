import type { Biljka, Recenzija } from './types'
// Unapred definisan skup biljaka (minimum 10)
const r = (autor: string, ocena: number, tekst: string): Recenzija => ({ autor, ocena, tekst })
export const plants: Biljka[] = [
  { id: 1, naziv: 'Monstera', opis: 'Velika tropska biljka sa perforiranim listovima.', nega: 'Zaliti kad se gornji sloj zemlje osuši, svetlo bez direktnog sunca.', tip: 'sobno', grupa: 'početnici', datum: '2026-08-10', cena: 1800, recenzije: [r('Ana', 5, 'Divna biljka!'), r('Marko', 4, 'Stigla zdrava.')] },
  { id: 2, naziv: 'Lavanda', opis: 'Mirisna mediteranska biljka.', nega: 'Sadi se na sunčano mesto, retko zalivanje.', tip: 'baštensko', grupa: 'baštovani', datum: '2026-07-01', cena: 600, recenzije: [r('Jelena', 5, 'Predivan miris.')] },
  { id: 3, naziv: 'Ruža', opis: 'Klasičan cvet za baštu i buket.', nega: 'Sadnja u proleće, redovno orezivanje.', tip: 'rezano', grupa: 'ljubitelji cveća', datum: '2026-09-02', cena: 450, recenzije: [r('Petar', 3, 'Cvet sitniji nego na slici.')] },
  { id: 4, naziv: 'Kaktus', opis: 'Otporna sukulentna biljka.', nega: 'Zalivati jednom mesečno, puno sunca.', tip: 'sobno', grupa: 'početnici', datum: '2026-06-15', cena: 350, recenzije: [r('Ivan', 4, 'Lako se održava.')] },
  { id: 5, naziv: 'Bosiljak', opis: 'Začinska biljka za kuhinju.', nega: 'Zalivati redovno, držati na suncu.', tip: 'začinsko', grupa: 'kuvari', datum: '2026-09-20', cena: 200, recenzije: [] },
  { id: 6, naziv: 'Lale', opis: 'Prolećni lukovičasti cvet.', nega: 'Lukovice se sade u jesen na 10 cm dubine.', tip: 'baštensko', grupa: 'baštovani', datum: '2026-09-25', cena: 500, recenzije: [r('Maja', 5, 'Prelepe boje.')] },
  { id: 7, naziv: 'Fikus', opis: 'Popularna sobna biljka sa sjajnim listovima.', nega: 'Ne voli promenu mesta, umereno zalivanje.', tip: 'sobno', grupa: 'početnici', datum: '2026-08-01', cena: 1500, recenzije: [r('Luka', 4, 'Brzo raste.')] },
  { id: 8, naziv: 'Paradajz (sadnice)', opis: 'Sadnice za baštu i terasu.', nega: 'Sade se posle mraza, potrebna potpora i đubrenje.', tip: 'povrtarsko', grupa: 'baštovani', datum: '2026-04-20', cena: 120, recenzije: [r('Sofija', 5, 'Dobar rod.')] },
  { id: 9, naziv: 'Orhideja', opis: 'Elegantna sobna biljka sa dugotrajnim cvetom.', nega: 'Zalivanje potapanjem, posebna podloga.', tip: 'sobno', grupa: 'iskusni', datum: '2026-07-18', cena: 2500, recenzije: [r('Nina', 5, 'Cveta mesecima.')] },
  { id: 10, naziv: 'Suncokret (seme)', opis: 'Seme za visoke žute cvetove.', nega: 'Sejati u maju na sunčano mesto.', tip: 'baštensko', grupa: 'deca', datum: '2026-03-05', cena: 150, recenzije: [r('Dušan', 4, 'Deci se dopalo.')] }
]
