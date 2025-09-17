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
    console.log("show starts");
    if (!columnContainerRef.current || !mainRef.current) return;
    const tl = gsap.timeline({
      onComplete: () => {
        if (pageToGoTo) router.push(pageToGoTo);
      },
    });

    tl.fromTo(
      mainRef.current,
      { y: 0, opacity: 1 },
      {
        y: -200,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        onComplete: () => {
          console.log("main hidden, going to", pageToGoTo);
        },
      }
    );
    tl.fromTo(
      columnContainerRef.current,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",

        onComplete: () => {
          console.log("columns shown");
        },
      }
    );

    gsap.set(columnContainerRef.current.children, {
      transformOrigin: "bottom",
    });

    tl.fromTo(
      columnContainerRef.current.children,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1,
        stagger: 0.1,
        ease: "hop",
        overwrite: "auto",
        onComplete: () => {
          console.log("columns scaled");
        },
      }
    );
  }

  function _hide() {
    console.log("hide starts");
    if (!columnContainerRef.current || !mainRef.current) return;
    console.log("hiding");
    const tl = gsap.timeline({
      onComplete: () => {
        setIsFirstLoad(false);
        setIsTransitionActive(false);
      },
    });

    gsap.set(columnContainerRef.current.children, {
      transformOrigin: "top",
    });

    tl.fromTo(
      columnContainerRef.current.children,
      { scaleY: 1 },
      {
        scaleY: 0,
        stagger: 0.1,
        overwrite: "auto",
        onComplete: () => {
          console.log("columns unscaled to top");
        },
      }
    );

    tl.fromTo(
      columnContainerRef.current,
      { yPercent: 0 },
      {
        yPercent: -100,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          console.log("columns hidden");
        },
      }
    );

    tl.fromTo(
      mainRef.current,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
        overwrite: "auto",
        onComplete: () => {
          console.log("main shown");
          setPageToGoTo(null);
        },
      },
      "<"
    );
  }

  useGSAP(() => {
    ScrollTrigger.refresh();

    console.log("isfirstload", isFirstLoad);
    if (isFirstLoad) return;
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
        className="flex fixed inset-0 z-500 bg-zinc-100 translate-y-full"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-zinc-500 w-full h-screen scale-y-0" />
        ))}
      </div>
      <span>Amuséez-vous</span>
    </>
  );
}
