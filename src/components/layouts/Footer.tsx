"use client";

import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import TransitionLink from "../animations/TransitionLink";

export function Footer() {
  const pathname = usePathname();
  const [dark, toggleDark] = useToggle();

  useLayoutEffect(() => {
    if (pathname === "/") toggleDark(true);
    else toggleDark(false);
  }, [pathname]);

  return (
    <footer
      data-dark={dark || undefined}
      className={cn(
        "bg-zinc-200 text-zinc-900 min-h-80 mt-40",
        "data-dark:bg-zinc-900 data-dark:text-zinc-200"
      )}
    >
      <div className="container mx-auto py-8 grid grid-cols-3">
        <div>
          <span className="font-bold text-xl">
            Amuséez-vous - {new Date().getFullYear()}
          </span>
        </div>
        <div>
          <TransitionLink href="/paintings">Paintings</TransitionLink>
        </div>
        <div></div>
      </div>
    </footer>
  );
}
