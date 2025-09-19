export interface Ticket {
  id: number;
  name: string;
  priceInCents: number;
}

export const TICKETS = [
  { id: 1, name: "Entrée adulte", priceInCents: 2400 },
  {
    id: 2,
    name: "Entrée -12ans",
    priceInCents: 1200,
  },
  { id: 3, name: "Entrée jeune 12-25", priceInCents: 1800 },
  { id: 4, name: "Entrée personne en recherche d'emploi", priceInCents: 1800 },
  { id: 5, name: "Entrée PMR", priceInCents: 1800 },
  { id: 6, name: "Entrée senior", priceInCents: 1800 },
  { id: 7, name: "Gratuit pour les moins de 5 ans", priceInCents: 0 },
  { id: 8, name: "Tarif groupe (+ 10 personnes) ", priceInCents: 1500 },
  { id: 9, name: "Audioguide", priceInCents: 200 },
  { id: 10, name: "Guide papier", priceInCents: 400 },
] as const satisfies Ticket[];
