"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { useGlobalStore } from "@/lib/stores/globalStore";

export default function TransitionLink({
  children,
  ref,
  onClick,
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const defaultRef = useRef(null);
  const { isTransitionActive, setIsTransitionActive } = useGlobalStore();
  const router = useRouter();
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
        setIsTransitionActive(true);
        onClick?.(e);
        setTimeout(() => {
          router.push(href.toString());
        }, 400);
      }}
    >
      {children}
    </Link>
  );
}
