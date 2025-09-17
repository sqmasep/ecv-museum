"use client";

import TransitionLink from "@/components/animations/TransitionLink";
import { Button } from "@/components/ui/button";

export default function PaintingsError() {
  return (
    <div>
      Failed to load paintings.
      <Button asChild>
        <TransitionLink href="/">go home</TransitionLink>
      </Button>
    </div>
  );
}
