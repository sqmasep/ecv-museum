"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useGlobalStore } from "@/lib/stores/globalStore";

export default function TransitionLink({
  children,
  ref,
  onClick,
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const defaultRef = useRef(null);
  const { isTransitionActive, setIsTransitionActive, setPageToGoTo } =
    useGlobalStore();
  const pathname = usePathname();

  return (
    <Link
      {...props}
      ref={ref ?? defaultRef}
      href={href}
      onClick={e => {
        e.preventDefault();
        if (pathname === href) return;
        if (isTransitionActive) return;
        setPageToGoTo(href.toString());
        setIsTransitionActive(true);

        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
