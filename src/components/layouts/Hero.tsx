"use client";

import { Copy } from "@/components/animations/Copy";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ComponentRef, useRef } from "react";

export function Hero() {
  const lineRef = useRef<ComponentRef<"div">>(null);

  useGSAP(() => {
    if (!lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left",
        ease: "power3.out",
        duration: 1,
      }
    );
  });

  return (
    <section className="h-dvh bg-zinc-50 text-zinc-950 grid place-items-center">
      <div className="container mx-auto flex justify-between">
        {/* <Image src="./.png" alt="Test" /> */}
        <div className="w-128 h-144 bg-zinc-200" />
        <h1 className="font-bold text-9xl uppercase self-end">
          <div className="h-0.5 bg-foreground" ref={lineRef} />

          <Copy animateOnScroll={false} className="mt-20" delay={0.4}>
            <p>
              <span className="bg-black text-white">Amuséez</span>
              <br />
              vous :)
            </p>
          </Copy>
        </h1>
      </div>
    </section>
  );
}
