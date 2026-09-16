"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type OrbitProduct = {
  slug: string;
  name: string;
  icon: string;
  accent: string;
  label: string;
  stat: string;
  cta: string;
};

/** Position, parallax depth and idle-float settings per card slot. */
const SLOTS = [
  { left: "0%", top: "2%", depth: 0.9, dur: "7s", delay: "0s", tilt: "-2deg" },
  { left: "52%", top: "0%", depth: 0.65, dur: "8.5s", delay: "-2s", tilt: "2deg" },
  { left: "26%", top: "45%", depth: 1, dur: "7.5s", delay: "-4s", tilt: "0deg" },
  { left: "0%", top: "33%", depth: 0.7, dur: "9s", delay: "-1s", tilt: "1.5deg" },
  { left: "53%", top: "31%", depth: 0.8, dur: "8s", delay: "-3s", tilt: "-1.5deg" },
  { left: "1%", top: "66%", depth: 0.6, dur: "8.8s", delay: "-5s", tilt: "1deg" },
  { left: "52%", top: "64%", depth: 0.85, dur: "7.8s", delay: "-2.5s", tilt: "-1deg" },
  { left: "27%", top: "11%", depth: 0.75, dur: "9.2s", delay: "-6s", tilt: "1.5deg" },
  { left: "26%", top: "82%", depth: 0.7, dur: "8.2s", delay: "-3.5s", tilt: "-2deg" },
];

/**
 * The product ecosystem floating as glowing cards that drift idly and lean
 * toward the cursor. Clicking a card opens a detail panel with its stat.
 * Collapses to a tappable chip row on mobile.
 */
export function HeroOrbit({ products }: { products: OrbitProduct[] }) {
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    wrapRefs.current.forEach((el, i) => {
      if (!el) return;
      const d = SLOTS[i % SLOTS.length].depth;
      el.style.transform = `translate(${(nx * 14 * d).toFixed(1)}px, ${(ny * 14 * d).toFixed(1)}px)`;
    });
  };

  const onLeave = () => {
    wrapRefs.current.forEach((el) => {
      if (el) el.style.transform = "";
    });
    setSelected(null);
  };

  const toggle = (i: number) => setSelected((cur) => (cur === i ? null : i));

  const detail =
    selected !== null && products[selected] ? products[selected] : null;

  const detailPanel = (p: OrbitProduct) => (
    <div
      className="flex items-center gap-4 rounded-2xl border bg-card/95 px-5 py-4 backdrop-blur"
      style={{
        borderColor: p.accent,
        boxShadow: `0 18px 60px -18px ${p.accent}`,
      }}
    >
      <Image
        src={p.icon}
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 rounded-xl border border-border object-contain"
      />
      <div className="min-w-0 flex-1 leading-tight">
        <p className="text-sm font-semibold">{p.name}</p>
        <p className="mt-0.5 text-lg font-bold" style={{ color: p.accent }}>
          {p.stat}
        </p>
        <p className="text-[11px] text-muted">{p.label}</p>
      </div>
      <a
        href="#projects"
        className="shrink-0 text-xs font-semibold text-accent hover:underline"
        onClick={() => setSelected(null)}
      >
        {p.cta} →
      </a>
    </div>
  );

  return (
    <>
      {/* Floating cloud (desktop) */}
      <div
        className="relative hidden h-[460px] select-none lg:block"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {/* Orbit rings */}
        <div
          className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/70"
          aria-hidden
        />
        <div
          className="absolute left-1/2 top-1/2 h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/40"
          aria-hidden
        />

        {products.map((p, i) => {
          const s = SLOTS[i % SLOTS.length];
          return (
            <div
              key={p.slug}
              ref={(el) => {
                wrapRefs.current[i] = el;
              }}
              className="absolute transition-transform duration-300 ease-out"
              style={{ left: s.left, top: s.top }}
            >
              <div
                className="hero-rise"
                style={{ ["--rise-delay" as string]: `${360 + i * 80}ms` }}
              >
                <div
                  className="float-card"
                  style={{
                    ["--float-dur" as string]: s.dur,
                    ["--float-delay" as string]: s.delay,
                    ["--tilt" as string]: s.tilt,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    onMouseEnter={() => setSelected(i)}
                    onFocus={() => setSelected(i)}
                    aria-expanded={selected === i}
                    className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-card/80 px-3 py-2 backdrop-blur transition-colors hover:border-[var(--glow)]"
                    style={{
                      ["--glow" as string]: p.accent,
                      boxShadow: `0 12px 36px -14px ${p.accent}`,
                      ...(selected === i ? { borderColor: p.accent } : {}),
                    }}
                  >
                    <Image
                      src={p.icon}
                      alt=""
                      width={30}
                      height={30}
                      className="h-7 w-7 rounded-lg border border-border object-contain"
                    />
                    <span className="text-left leading-tight">
                      <span className="block whitespace-nowrap text-xs font-semibold text-foreground">
                        {p.name}
                      </span>
                      <span
                        className="block whitespace-nowrap text-[10px] font-medium"
                        style={{ color: p.accent }}
                      >
                        {p.label}
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Detail panel */}
        {detail && (
          <div className="absolute inset-x-0 -bottom-6 z-20">
            {detailPanel(detail)}
          </div>
        )}
      </div>

      {/* Compact chip row (mobile + tablet) */}
      <div className="lg:hidden">
        <div className="mt-2 flex flex-wrap gap-2">
          {products.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={selected === i}
              className="hero-rise flex items-center gap-2 rounded-full border border-border bg-card/80 py-1.5 pl-1.5 pr-3"
              style={{
                ["--rise-delay" as string]: `${360 + i * 70}ms`,
                ...(selected === i ? { borderColor: p.accent } : {}),
              }}
            >
              <Image
                src={p.icon}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 rounded-full border border-border object-contain"
              />
              <span className="text-xs font-semibold">{p.name}</span>
            </button>
          ))}
        </div>
        {detail && <div className="mt-3">{detailPanel(detail)}</div>}
      </div>
    </>
  );
}
