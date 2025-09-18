"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function Parallax({
  amount = 50,
  background,
  children,
  className,
  ...props
}: {
  amount?: number;
  background: React.ReactNode;
  children: React.ReactNode;
} & React.ComponentProps<"div">) {
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      backgroundRef.current,
      { y: -amount / 2 },
      {
        y: amount / 2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="h-full overflow-hidden relative">
      <div
        ref={backgroundRef}
        className="absolute inset-0 scale-150 overflow-hidden"
      >
        {background}
      </div>

      <div className={cn("relative h-full z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
}
