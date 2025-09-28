"use client";

import { Button } from "@/components/ui/button";
import { TicketsSidebar } from "@/features/tickets/components/TicketsSidebar";
import { TICKETS } from "@/features/tickets/data/tickets";
import { useTicketStore } from "@/features/tickets/stores/ticketStore";

export default function BilletteriePage() {
  const ticketStore = useTicketStore();

  return (
    <div className="flex gap-8 justify-between min-h-dvh">
      <div className="grow max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold">Billetterie</h1>
        <div className="grid grid-cols-4 gap-4">
          {TICKETS.map(ticket => (
            <div
              key={ticket.id}
              className="border p-4 flex flex-col gap-2 rounded-xl"
            >
              <span className="text-lg font-semibold">{ticket.name}</span>
              <span className="h-px bg-zinc-100" />

              <span className="text-4xl font-bold">
                {ticket.priceInCents / 100}€
              </span>

              <Button
                onClick={() =>
                  ticketStore.addTicket(ticket.id, ticket.id === 8 ? 10 : 1)
                }
                variant="outline"
                className="rounded-full mt-auto"
              >
                Add ticket
              </Button>
            </div>
          ))}
        </div>
      </div>
      <TicketsSidebar />
    </div>
  );
}
