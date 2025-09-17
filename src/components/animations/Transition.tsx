"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { ComponentRef, useRef } from "react";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

import { useGlobalStore } from "@/lib/stores/globalStore";

export default function Transition({
  children,
}: {
  children?: React.ReactNode;
}) {
  const transitionRef = useRef<ComponentRef<"div">>(null);
  const columnContainerRef = useRef<ComponentRef<"div">>(null);
  const mainRef = useRef<ComponentRef<"div">>(null);

  const pathname = usePathname();
  const router = useRouter();
  const {
    isTransitionActive,
    setIsTransitionActive,
    isFirstLoad,
    setIsFirstLoad,
    pageToGoTo,
    setPageToGoTo,
  } = useGlobalStore();

  function _show() {
    if (!columnContainerRef.current || !mainRef.current) return;
    const tl = gsap.timeline();

    tl.fromTo(
      mainRef.current,
      { y: 0, opacity: 1 },
      {
        y: -200,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      }
    );

    tl.fromTo(
      columnContainerRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.5, ease: "power3.out" }
    );

    tl.fromTo(
      columnContainerRef.current.children,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 1,
        stagger: 0.1,
        ease: "hop",
        onComplete: () => {
          if (pageToGoTo) router.push(pageToGoTo);
        },
      }
    );
  }

  function _hide() {
    if (!columnContainerRef.current || !mainRef.current) return;
    const tl = gsap.timeline();

    tl.fromTo(
      columnContainerRef.current.children,
      { scaleY: 1 },
      {
        scaleY: 0,
        transformOrigin: "top",
        stagger: 0.1,
        onComplete: () => {
          setIsFirstLoad(false);
          setIsTransitionActive(false);
        },
      }
    );

    tl.to(columnContainerRef.current, {
      yPercent: -100,
      duration: 0.5,
      ease: "power3.out",
    });

    tl.fromTo(
      mainRef.current,
      {
        y: 200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
        overwrite: true,
      },
      "<"
    );
  }

  useGSAP(() => {
    ScrollTrigger.refresh();

    _hide();
  }, [pathname]);

  useGSAP(() => {
    if (isTransitionActive) {
      _show();
    }
  }, [isTransitionActive]);

  return (
    <>
      <main ref={mainRef}>{children}</main>
      <div
        ref={columnContainerRef}
        className="flex fixed inset-0 z-500 bg-zinc-100"
      >
        {Array.from({ length: 5 }).map(() => (
          <div className="bg-zinc-500 w-full h-screen" />
        ))}
      </div>
      <span>Amuséez-vous</span>
    </>
  );
}
