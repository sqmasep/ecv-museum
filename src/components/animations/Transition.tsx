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

  function _resetColumns() {
    if (!columnContainerRef.current) return;

    gsap.set(columnContainerRef.current, {
      yPercent: 100,
    });

    gsap.set(columnContainerRef.current.children, {
      scaleY: 0,
      transformOrigin: "bottom",
    });
  }

  function _show() {
    if (!columnContainerRef.current || !mainRef.current) return;
    const tl = gsap.timeline({
      onComplete: () => {
        if (pageToGoTo) router.push(pageToGoTo);
      },
    });

    gsap.set(mainRef.current, {
      opacity: 1,
    });

    _resetColumns();

    tl.to(mainRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
    });

    tl.to(
      columnContainerRef.current,
      {
        yPercent: 0,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      },
      0
    );

    tl.to(
      columnContainerRef.current.children,
      {
        scaleY: 1,
        duration: 1,
        stagger: 0.1,
        ease: "hop",
        overwrite: "auto",
      },
      0.2
    );
  }

  function _hide() {
    if (!columnContainerRef.current || !mainRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFirstLoad(false);
        setIsTransitionActive(false);
        setPageToGoTo(null);
      },
    });

    gsap.set(mainRef.current, {
      opacity: 0,
      y: 200,
    });

    gsap.set(columnContainerRef.current.children, {
      transformOrigin: "top",
    });

    tl.to(columnContainerRef.current.children, {
      scaleY: 0,
      stagger: 0.1,
      duration: 1,
      overwrite: "auto",
    });

    tl.to(
      columnContainerRef.current,
      {
        yPercent: -100,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      },
      1
    );

    tl.to(
      mainRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 1,
      },
      1
    );
  }

  useGSAP(() => {
    ScrollTrigger.refresh();

    if (isFirstLoad) {
      _resetColumns();
      return;
    }

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
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-zinc-200 w-full h-screen scale-y-0" />
        ))}
      </div>
      {/* <span>Amuséez-vous</span> */}
    </>
  );
}
