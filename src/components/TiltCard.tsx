"use client";

import { useRef, type ReactNode } from "react";

const MAX_DEG = 5;

/**
 * 3D tilt toward the cursor. Inert on touch devices and for
 * prefers-reduced-motion users (children render normally).
 */
export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const innerRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    const el = innerRef.current;
    if (el) el.style.transform = "";
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-py * MAX_DEG).toFixed(2)}deg) rotateY(${(px * MAX_DEG).toFixed(2)}deg)`;
  };

  return (
    <div
      className={`h-full [perspective:900px] ${className}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <div
        ref={innerRef}
        className="h-full transition-transform duration-200 ease-out [transform-style:preserve-3d]"
      >
        {children}
      </div>
    </div>
  );
}
