import { PaintingSearch } from "@/features/search/components/PaintingSearch";
import { Button } from "../ui/button";
import TransitionLink from "../animations/TransitionLink";
import { getAllPaintings } from "@/utils/server/museum";

export async function Header() {
  const { paintings } = await getAllPaintings();

  return (
    <header className="fixed w-full left-0 top-0 z-40 backdrop-blur-2xl bg-white/60">
      <div className="container mx-auto flex items-center h-16 justify-between">
        <div className="flex items-center gap-4">
          <TransitionLink href="/" className="italic font-semibold">
            Amuséez-vous
          </TransitionLink>

          <div className="h-6 w-px bg-zinc-500" />

          <Button asChild variant="ghost">
            <TransitionLink href="/paintings">Paintings</TransitionLink>
          </Button>
          <Button asChild variant="ghost">
            <TransitionLink href="/billetterie">Billetterie</TransitionLink>
          </Button>
        </div>

        <PaintingSearch paintings={paintings} />
      </div>
    </header>
  );
}
