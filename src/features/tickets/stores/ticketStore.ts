import { create } from "zustand";
import { Ticket, TICKETS } from "../data/tickets";

interface TicketStore {
  tickets: { id: Ticket["id"]; quantity: number }[];
  addTicket: (id: Ticket["id"], quantity?: number) => void;
  decreaseQuantity: (id: Ticket["id"]) => void;
  removeTicket: (id: Ticket["id"]) => void;

  calculateTotal: () => number;
}

export const useTicketStore = create<TicketStore>()((set, get) => ({
  tickets: [],
  addTicket: (id, quantity = 1) =>
    set(state => {
      const existingTicket = state.tickets.find(t => t.id === id);
      if (existingTicket) {
        return {
          tickets: state.tickets.map(t =>
            t.id === id ? { ...t, quantity: t.quantity + quantity } : t
          ),
        };
      }
      return {
        tickets: [...state.tickets, { id, quantity }],
      };
    }),
  decreaseQuantity: id =>
    set(state => {
      const existingTicket = state.tickets.find(t => t.id === id);
      if (!existingTicket) return state;

      if (existingTicket.quantity <= 1) {
        return {
          tickets: state.tickets.filter(t => t.id !== id),
        };
      }

      return {
        tickets: state.tickets.map(t =>
          t.id === id ? { ...t, quantity: t.quantity - 1 } : t
        ),
      };
    }),
  removeTicket: id =>
    set(state => ({
      tickets: state.tickets.filter(t => t.id !== id),
    })),
  calculateTotal: () => {
    const quantity = get().tickets.reduce((acc, ticket) => {
      const ticketData = TICKETS.find(t => t.id === ticket.id);
      if (!ticketData) return acc;

      return acc + ticketData.priceInCents * ticket.quantity;
    }, 0);

    return quantity;
  },
}));
