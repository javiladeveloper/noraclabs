"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const hiddenTransforms = {
  up: "translateY(24px)",
  left: "translateX(-36px)",
  right: "translateX(36px)",
  zoom: "scale(0.93)",
} as const;

export type RevealDirection = keyof typeof hiddenTransforms;

/**
 * Fades + slides its children in when they scroll into view.
 * Respects prefers-reduced-motion (renders immediately, no transform).
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ shown: false, reduce: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setState({
              shown: true,
              reduce: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches,
            });
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: state.shown ? 1 : 0,
        transform: state.shown ? "none" : hiddenTransforms[direction],
        transition: state.reduce
          ? "none"
          : `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
