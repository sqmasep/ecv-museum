"use client";

import { ReactLenis } from "lenis/react";
import { useRef } from "react";

export function Lenis({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef(null);

  return (
    <ReactLenis
      ref={lenisRef}
      options={{
        // Core smoothness settings
        lerp: 0.06, // Lower = smoother but slower (0.05-0.08 for luxury feel)
        duration: 1.2, // Higher = smoother for wheel scroll
        smoothWheel: true, // Enable smooth wheel scrolling
        wheelMultiplier: 0.8, // Reduce scroll speed for more control
        touchMultiplier: 1.8, // Slightly faster for touch devices

        // Easing and behavior
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
        orientation: "vertical",
        gestureOrientation: "vertical",

        // Performance and smoothness
        // @ts-expect-error lenis types are broken
        smooth: true,
        smoothTouch: false, // Usually false for better mobile performance
        syncTouch: true, // Important for iOS
        syncTouchLerp: 0.1,
        touchInertiaMultiplier: 35,

        // Prevent issues
        normalizeWheel: true, // Consistent cross-browser behavior
        autoResize: true, // Handle window resizing
        prevent: node => {
          // Prevent smooth scroll on specific elements
          return node.classList?.contains("no-smooth");
        },

        // Infinite scroll capability
        infinite: false,
      }}
      root
    >
      {children}
    </ReactLenis>
  );
}
