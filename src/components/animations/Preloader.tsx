"use client";

import { ComponentRef, useRef } from "react";
import { useGSAP } from "@gsap/react";

import { useGlobalStore } from "@/lib/stores/globalStore";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<ComponentRef<"div">>(null);
  const dotsContainerRef = useRef<ComponentRef<"div">>(null);
  const textRef = useRef<ComponentRef<"div">>(null);

  const { isFirstLoad, setIsFirstLoad } = useGlobalStore();

  useGSAP(() => {
    if (!dotsContainerRef.current || !textRef.current) return;

    if (isFirstLoad) {
      gsap.set(document.body, { overflow: "hidden" });

      const tl = gsap.timeline();

      tl.fromTo(textRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
      tl.fromTo(
        textRef.current.querySelectorAll("[data-dot]"),
        { opacity: 0, y: -20 },
        { opacity: 1, stagger: 0.2, duration: 0.2, repeat: 4, yoyo: true }
      );

      tl.fromTo(
        dotsContainerRef.current.children,
        {
          opacity: 0,
          scale: 1,
        },
        {
          opacity: 0.3,
          scale: 4,
          repeat: 2,
          yoyo: true,
          stagger: 0.2,
          duration: 0.5,
        },
        "<"
      );

      tl.to(textRef.current, {
        y: -200,
        ease: "hop",
      });

      tl.fromTo(
        dotsContainerRef.current.children,
        { opacity: 0.3 },
        {
          scale: 75,
          borderRadius: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.5,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(document.body, { overflow: undefined });
            setIsFirstLoad(false);
          },
        }
      );

      tl.fromTo(
        containerRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.5, pointerEvents: "none" },
        "-=1"
      );
    }
  }, [isFirstLoad, setIsFirstLoad]);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-black fixed top-0 left-0 z-501"
    >
      <div ref={dotsContainerRef} className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            data-grid={i}
            className="absolute rounded-full aspect-square size-9 bg-white left-1/2 top-1/2 -translate-1/2"
          />
        ))}
      </div>

      <div ref={textRef} className="text-9xl text-center bg-black text-white">
        Loading
        {Array.from({ length: 3 }).map((_, i) => (
          <span data-dot key={i}>
            .
          </span>
        ))}
      </div>
    </div>
  );
}
