import { PaintingSearch } from "@/features/search/components/PaintingSearch";
import Link from "next/link";
import { Button } from "../ui/button";
import TransitionLink from "../animations/TransitionLink";

export function Header() {
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
        </div>

        <PaintingSearch />
      </div>
    </header>
  );
}
