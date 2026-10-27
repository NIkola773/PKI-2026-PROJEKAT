export interface Recenzija { autor: string; ocena: number; tekst: string }
export interface Biljka {
  id: number; naziv: string; opis: string; nega: string; tip: string
  grupa: string; datum: string; cena: number; recenzije: Recenzija[]
}
export interface Korisnik { ime: string; email: string; telefon: string; adresa: string; omiljene: string; lozinka: string }
export type Status = 'rezervisano' | 'pristiglo' | 'otkazano'
export interface Stavka { id: number; plantId: number; kolicina: number; status: Status; ocena: number }
