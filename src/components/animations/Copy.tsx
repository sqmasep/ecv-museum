"use client";

import React, { useRef } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

export function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
  standby = false,
  className = "",
  ref,
}: {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  standby?: boolean;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
}) {
  const defaultRef = useRef(null);
  const elementRefs = useRef<Element[]>([]);
  const splitRefs = useRef<SplitText[]>([]);
  const lines = useRef<Element[]>([]);

  const containerRef = ref || defaultRef;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRefs.current = [];
      lines.current = [];
      elementRefs.current = [];

      let elements = [] as Element[];
      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current];
      }

      elements.forEach(element => {
        elementRefs.current.push(element);

        const split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
          lineThreshold: 0.1,
        });

        splitRefs.current.push(split);

        const computedStyle = window.getComputedStyle(element);
        const textIndent = computedStyle.textIndent;

        if (textIndent && textIndent !== "0px") {
          if (split.lines.length > 0) {
            // @ts-expect-error typescript is dumb
            split.lines[0].style.paddingLeft = textIndent;
          }
          // @ts-expect-error typescript is dumb
          element.style.textIndent = "0";
        }

        lines.current.push(...split.lines);
      });

      gsap.set(lines.current, { yPercent: 100 });

      if (!standby) {
        const animationProps = {
          yPercent: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: delay,
        };

        if (animateOnScroll) {
          gsap.to(lines.current, {
            ...animationProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            },
          });
        } else {
          gsap.to(lines.current, animationProps);
        }
      }

      return () => {
        splitRefs.current.forEach(split => {
          if (split) {
            split.revert();
          }
        });
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] }
  );

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children as React.ReactElement, {
      // @ts-expect-error typescript is dumb
      ref: containerRef,
      className,
    });
  }

  return (
    <div ref={containerRef} className={className} data-copy-wrapper>
      {children}
    </div>
  );
}
