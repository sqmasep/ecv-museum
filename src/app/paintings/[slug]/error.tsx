"use client";

import TransitionLink from "@/components/animations/TransitionLink";
import { Button } from "@/components/ui/button";

export default function PaintingError() {
  return (
    <div>
      Failed to load painting :(
      <Button asChild>
        <TransitionLink href="/">go home </TransitionLink>
      </Button>
    </div>
  );
}
