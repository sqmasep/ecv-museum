import { Button } from "@/components/ui/button";
import { useTicketStore } from "../stores/ticketStore";
import { TICKETS } from "../data/tickets";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";

export function TicketsSidebar() {
  const ticketStore = useTicketStore();

  return (
    <div className="shrink-0 w-96 bg-zinc-100 p-4">
      tickets sidebar
      <div className="flex flex-col gap-4">
        {ticketStore.tickets.map(ticket => {
          const ticketData = TICKETS.find(t => t.id === ticket.id)!;

          return (
            <div
              key={ticket.id}
              className={cn(
                "border bg-white rounded-lg p-4 relative",
                "after:size-10 after:rounded-full after:bg-zinc-100 after:left-[calc(100%-(var(--spacing)*(10/2)))] after:top-1/2 after:absolute after:-translate-y-1/2 after:z-20"
              )}
            >
              <div>
                <span>{ticketData.name}</span>
              </div>

              <span className="font-bold text-2xl">
                {(ticketData.priceInCents * ticket.quantity) / 100}€
              </span>
              <Button
                size="icon"
                onClick={() => ticketStore.removeTicket(ticket.id)}
                variant="outline"
              >
                <Trash size={16} />
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => ticketStore.decreaseQuantity(ticket.id)}
                  variant="outline"
                  size="sm"
                >
                  -
                </Button>
                <span className="text-sm text-center text-zinc-600 font-semibold w-7">
                  {ticket.quantity}
                </span>
                <Button
                  onClick={() => ticketStore.addTicket(ticket.id)}
                  variant="outline"
                  size="sm"
                >
                  +
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="uppercase text-zinc-500">Total</span>
        <span className="font-bold text-2xl">
          {ticketStore.calculateTotal() / 100}€
        </span>
      </div>
    </div>
  );
}
