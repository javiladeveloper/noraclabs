"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a metric from 0 to its value when it scrolls into view.
 * Handles values like "14+", "100K+", "-45%", "12+" by extracting the number
 * and re-attaching the prefix/suffix.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Parse "prefix number suffix" — e.g. "-45%", "100K+", "14+".
    const m = value.match(/^(\D*)(\d+)(.*)$/);
    if (reduce || !m) {
      setDisplay(value);
      return;
    }
    const prefix = m[1];
    const target = parseInt(m[2], 10);
    const suffix = m[3];

    let raf = 0;
    let started = false;

    function run() {
      const duration = 1100;
      let startTs = 0;
      function tick(ts: number) {
        if (!startTs) startTs = ts;
        const p = Math.min((ts - startTs) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - p, 3);
        const current = Math.round(target * eased);
        setDisplay(`${prefix}${current}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value]);

  return <span ref={ref}>{display}</span>;
}
