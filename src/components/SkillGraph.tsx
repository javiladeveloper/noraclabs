"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/dictionaries";
import {
  skillBranches,
  skillCore,
  skillCoreItems,
} from "@/data/skillGraph";

const CORE_COLOR = "#e5e7eb";

type Particle = {
  id: string;
  branchId: string | null; // null = core
  parent: number; // index of parent node (-1 for core)
  label: string;
  note: string; // short tooltip text (leaf skills only)
  color: string;
  ring: 0 | 1 | 2;
  // physics state (screen space)
  x: number;
  y: number;
  vx: number;
  vy: number;
  // rest geometry relative to center, in normalized units
  angle: number; // base angle around center
  restR: number; // base radius from center (ring 1/2)
  phase: number;
  // animated helpers
  glow: number; // 0..1 eased highlight
  size: number; // current radius (eased)
};

type Link = {
  a: number;
  b: number;
  color: string;
  branchId: string | null;
  rest: number; // desired length in px (updated per frame)
  // travelling pulse position 0..1 (or -1 = none)
  pulse: number;
  pulseSpeed: number;
};

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function buildModel(lang: Locale) {
  const nodes: Particle[] = [];
  const links: Link[] = [];

  nodes.push({
    id: "core",
    branchId: null,
    parent: -1,
    label: skillCore[lang],
    note: "",
    color: CORE_COLOR,
    ring: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    restR: 0,
    phase: 0,
    glow: 0,
    size: 10,
  });

  const branchCount = skillBranches.length;
  skillBranches.forEach((branch, bi) => {
    const angle = (bi / branchCount) * Math.PI * 2 - Math.PI / 2;
    const hubIndex = nodes.length;
    nodes.push({
      id: branch.id,
      branchId: branch.id,
      parent: 0,
      label: branch.label[lang],
      note: "",
      color: branch.color,
      ring: 1,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      angle,
      restR: 0.34,
      phase: bi * 1.7,
      glow: 0,
      size: 7,
    });
    links.push({
      a: 0,
      b: hubIndex,
      color: branch.color,
      branchId: branch.id,
      rest: 100,
      pulse: -1,
      pulseSpeed: 0.004 + (bi % 3) * 0.001,
    });

    const leaves = branch.skills;
    // Wider fan when a branch has many leaves, so labels don't overlap.
    const spread = Math.PI * (0.62 + Math.min(leaves.length, 10) * 0.03);
    leaves.forEach((skill, li) => {
      const t = leaves.length === 1 ? 0.5 : li / (leaves.length - 1);
      const leafAngle = angle + (t - 0.5) * spread;
      const leafR = 0.72 + (li % 3) * 0.14;
      const leafIndex = nodes.length;
      nodes.push({
        id: `${branch.id}-${li}`,
        branchId: branch.id,
        parent: hubIndex,
        label: skill.name,
        note: skill.note[lang],
        color: branch.color,
        ring: 2,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        angle: leafAngle,
        restR: leafR,
        phase: bi * 1.7 + li * 0.9,
        glow: 0,
        size: 4.5,
      });
      links.push({
        a: hubIndex,
        b: leafIndex,
        color: branch.color,
        branchId: branch.id,
        rest: 60,
        pulse: -1,
        pulseSpeed: 0.006 + (li % 4) * 0.001,
      });
    });
  });

  return { nodes, links };
}

type Tip = {
  label: string;
  note: string;
  color: string;
  x: number;
  y: number;
};

export function SkillGraph({ lang }: { lang: Locale }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const model = useMemo(() => buildModel(lang), [lang]);
  const [active, setActive] = useState<string | null>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  // The pinned node index whose tooltip should follow it each frame (-1 = none).
  const tipNodeRef = useRef<number>(-1);
  // Refs mirror state so the animation loop reads the latest without re-subscribing.
  const activeRef = useRef<string | null>(null);
  activeRef.current = active;
  const lockedRef = useRef<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect reduced-motion, but never fully freeze: fall back to a calm,
    // slow "breathing" mode (no fast pulses / no cursor flee) instead of a
    // static image. `calm` gates the energetic effects; motion always runs.
    const calm = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const { nodes, links } = model;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let scale = 300;

    function seedPositions() {
      const cx = width / 2;
      const cy = height / 2;
      for (const n of nodes) {
        if (n.ring === 0) {
          n.x = cx;
          n.y = cy;
        } else {
          n.x = cx + Math.cos(n.angle) * n.restR * scale;
          n.y = cy + Math.sin(n.angle) * n.restR * scale * 0.72;
        }
        n.vx = 0;
        n.vy = 0;
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Scale to the smaller dimension but allow the wide layout to use the
      // extra horizontal space; the vertical squash keeps it inside the height.
      scale = Math.min(width, height) * 0.48;
      if (nodes[0].x === 0 && nodes[0].y === 0) seedPositions();
    }
    resize();
    seedPositions();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const pointer = { x: -9999, y: -9999, inside: false };
    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.inside = true;
    }
    function onLeave() {
      pointer.inside = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }
    // Raw nearest branch under the cursor (no smoothing).
    function rawNearestBranch(): { branch: string | null; dist: number } {
      let best = Infinity;
      let branch: string | null = null;
      for (const n of nodes) {
        const d = (n.x - pointer.x) ** 2 + (n.y - pointer.y) ** 2;
        if (d < best) {
          best = d;
          branch = n.branchId;
        }
      }
      return { branch, dist: best };
    }

    // Hover with hysteresis: a new branch only steals focus if it is clearly
    // closer than the one we're already showing, and focus is only released
    // when the cursor moves well away. This kills the flicker between two
    // near-equidistant nodes.
    let hoverBranch: string | null = null;
    const ENTER = 70 * 70; // must be within this to preview a branch on hover

    // Focus model: "click to enter a branch, it stays until you leave".
    // - If a branch is LOCKED, that is the focus. Hovering other branches does
    //   NOT change it — you can roam all its nodes freely (no chaos).
    // - If nothing is locked, hover previews the nearest branch (soft).
    // - Click near a branch enters (locks) it; clicking while inside exits.
    function updateFocus(): string | null {
      if (lockedRef.current) {
        // Locked: ignore hover entirely, keep the chosen branch.
        hoverBranch = null;
        return lockedRef.current;
      }
      if (!pointer.inside) {
        hoverBranch = null;
        return null;
      }
      const { branch, dist } = rawNearestBranch();
      hoverBranch = dist < ENTER ? branch : null;
      return hoverBranch;
    }

    // Click only enters/exits a branch. The per-skill detail is hover-only.
    function onClick() {
      if (lockedRef.current) {
        lockedRef.current = null; // exit the current branch
        hoverBranch = null;
        return;
      }
      const { branch, dist } = rawNearestBranch();
      if (dist < ENTER && branch) lockedRef.current = branch;
    }
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("click", onClick);

    let raf = 0;
    let t = 0;

    function step() {
      t += 0.009;
      const cx = width / 2;
      const cy = height / 2;

      // Determine focus: locked branch (click-to-enter) or hover preview.
      const focus = updateFocus();
      if (focus !== activeRef.current) setActive(focus);

      {
        // ---- Physics: springs to parent + repulsion + gentle breathing ----
        // Always runs. In calm mode we simply skip the energetic cursor flee.
        const breatheAmp = calm ? 0.012 : 0.018;
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (n.ring === 0) {
            // core is gently anchored to center
            n.vx += (cx - n.x) * 0.02;
            n.vy += (cy - n.y) * 0.02;
          } else {
            // Physical expansion happens ONLY for a LOCKED branch (click-to-enter).
            // Hover preview just lights up — it must not move the layout, or the
            // graph reshuffles every time the cursor drifts through the middle.
            const locked = lockedRef.current;
            const isLockedBranch = locked !== null && n.branchId === locked;
            const dimLocked = locked !== null && !isLockedBranch;
            const rMul = isLockedBranch ? 1.22 : dimLocked ? 0.92 : 1;
            const breathe = Math.sin(t * 0.8 + n.phase) * breatheAmp;
            const targetR = (n.restR + breathe) * rMul * scale;
            const ax = cx + Math.cos(n.angle) * targetR;
            const ay = cy + Math.sin(n.angle) * targetR * 0.72;
            const k = n.ring === 1 ? 0.012 : 0.02;
            n.vx += (ax - n.x) * k;
            n.vy += (ay - n.y) * k;
          }
        }

        // Node-node repulsion (soft, only nearby) so it feels alive & un-crowded.
        // Clamp the force and floor the distance so two close nodes can't jitter
        // (1/d2 blows up as d→0, which caused a rebound loop between neighbours).
        const MIN_D = 38; // below this, treat as constant force (no explosion)
        const MAX_F = 0.18; // per-frame velocity impulse cap (gentle)
        for (let i = 1; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            let dx = a.x - b.x;
            let dy = a.y - b.y;
            let d = Math.sqrt(dx * dx + dy * dy);
            if (d > 110) continue;
            if (d < MIN_D) d = MIN_D;
            let f = 500 / (d * d);
            if (f > MAX_F) f = MAX_F;
            // Normalise using the *floored* distance so direction stays stable.
            const inv = 1 / Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
            dx *= inv;
            dy *= inv;
            a.vx += dx * f;
            a.vy += dy * f;
            b.vx -= dx * f;
            b.vy -= dy * f;
          }
        }

        // NOTE: no cursor perturbation. Moving the mouse through the graph must
        // NOT push nodes — that was what made it "go crazy". The only motion is
        // the gentle breathing above; the layout stays stable and calm.

        // Integrate with heavy damping so any disturbance settles almost at once.
        for (const n of nodes) {
          if (n.ring === 0) continue;
          n.vx *= 0.8;
          n.vy *= 0.8;
          // Cap speed so nothing can ever fling across the canvas.
          const sp = Math.hypot(n.vx, n.vy);
          const MAX_SP = 2.2;
          if (sp > MAX_SP) {
            n.vx = (n.vx / sp) * MAX_SP;
            n.vy = (n.vy / sp) * MAX_SP;
          }
          n.x += n.vx;
          n.y += n.vy;
        }
        nodes[0].vx *= 0.8;
        nodes[0].vy *= 0.8;
        nodes[0].x += nodes[0].vx;
        nodes[0].y += nodes[0].vy;

        // Keep every node inside the visible area (labels need room, and the
        // legend sits at the bottom) — soft clamp with a light inward nudge.
        const padX = 70;
        const padTop = 24;
        const padBottom = 54; // extra room for labels + bottom legend
        for (const n of nodes) {
          if (n.x < padX) {
            n.x = padX;
            if (n.vx < 0) n.vx *= -0.3;
          } else if (n.x > width - padX) {
            n.x = width - padX;
            if (n.vx > 0) n.vx *= -0.3;
          }
          if (n.y < padTop) {
            n.y = padTop;
            if (n.vy < 0) n.vy *= -0.3;
          } else if (n.y > height - padBottom) {
            n.y = height - padBottom;
            if (n.vy > 0) n.vy *= -0.3;
          }
        }
      }

      // Tooltip on HOVER: show the note of the skill node under the cursor and
      // keep it glued as the node drifts. Safe now that the cursor no longer
      // moves the graph — hovering is purely visual.
      {
        let best = Infinity;
        let hit = -1;
        if (pointer.inside) {
          for (let i = 0; i < nodes.length; i++) {
            const d =
              (nodes[i].x - pointer.x) ** 2 + (nodes[i].y - pointer.y) ** 2;
            if (d < best) {
              best = d;
              hit = i;
            }
          }
        }
        const hovered = best < 30 * 30 ? nodes[hit] : null;
        const show =
          hovered &&
          hovered.ring === 2 &&
          hovered.note &&
          // when a branch is locked, only its own skills show a tooltip
          (lockedRef.current === null ||
            hovered.branchId === lockedRef.current);
        if (show) {
          tipNodeRef.current = hit;
          setTip((prev) =>
            prev && prev.label === hovered.label && prev.x === hovered.x && prev.y === hovered.y
              ? prev
              : {
                  label: hovered.label,
                  note: hovered.note,
                  color: hovered.color,
                  x: hovered.x,
                  y: hovered.y,
                },
          );
        } else if (tipNodeRef.current !== -1) {
          tipNodeRef.current = -1;
          setTip(null);
        }
      }

      // ---- Draw ----
      ctx!.clearRect(0, 0, width, height);

      // Eased per-node glow/size toward target based on focus.
      const pinnedIdx = tipNodeRef.current;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const isFocus = focus === n.branchId || (focus !== null && n.ring === 0);
        const isPinned = i === pinnedIdx;
        const gTarget = isPinned
          ? 1
          : focus === null
            ? n.ring === 0
              ? 0.55
              : 0.35
            : isFocus
              ? 1
              : 0.08;
        n.glow += (gTarget - n.glow) * 0.12;
        const baseSize = n.ring === 0 ? 10 : n.ring === 1 ? 7 : 4.5;
        const sTarget = isPinned
          ? baseSize + 4
          : isFocus
            ? baseSize + 2.5
            : focus && !isFocus
              ? baseSize * 0.8
              : baseSize;
        n.size += (sTarget - n.size) * 0.12;
      }

      // Links + travelling pulses.
      for (const l of links) {
        const a = nodes[l.a];
        const b = nodes[l.b];
        const dim = focus !== null && l.branchId !== focus;
        const { r, g, b: bl } = hexToRgb(l.color);
        const baseA = dim ? 0.05 : 0.16 + a.glow * 0.22;
        ctx!.strokeStyle = `rgba(${r},${g},${bl},${baseA})`;
        ctx!.lineWidth = dim ? 0.6 : l.branchId === focus ? 1.8 : 1;
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();

        // Advance pulse (calm mode keeps them but slower / rarer).
        {
          if (l.pulse < 0) {
            // randomly (deterministically) ignite pulses more often on focused branch
            const chance = l.branchId === focus ? 0.02 : 0.004;
            if (Math.sin(t * 3 + l.a * 2.3 + l.b) > 0.999 - chance * 40) l.pulse = 0;
          } else {
            l.pulse += l.pulseSpeed * (l.branchId === focus ? 2.2 : 1);
            if (l.pulse > 1) l.pulse = -1;
          }
        }
        if (l.pulse >= 0 && !dim) {
          const px = a.x + (b.x - a.x) * l.pulse;
          const py = a.y + (b.y - a.y) * l.pulse;
          const pr = 3.2;
          const grad = ctx!.createRadialGradient(px, py, 0, px, py, pr * 3);
          grad.addColorStop(0, `rgba(${r},${g},${bl},0.9)`);
          grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);
          ctx!.fillStyle = grad;
          ctx!.beginPath();
          ctx!.arc(px, py, pr * 3, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // Nodes.
      for (const n of nodes) {
        const { r, g, b: bl } = hexToRgb(n.color);
        const dim = focus !== null && n.branchId !== focus && n.ring !== 0;
        const radius = n.size;

        // Glow halo.
        const grad = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 4);
        grad.addColorStop(0, `rgba(${r},${g},${bl},${n.glow * 0.6})`);
        grad.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, radius * 4, 0, Math.PI * 2);
        ctx!.fill();

        // Core dot.
        ctx!.fillStyle = dim
          ? `rgba(${r},${g},${bl},0.35)`
          : `rgba(${r},${g},${bl},1)`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx!.fill();

        // Labels. Core & hubs are always shown; leaf labels fade in/out with
        // their eased glow (no hard toggle → no flicker).
        let labelA = 0;
        if (n.ring === 0) labelA = 0.95;
        else if (n.ring === 1) labelA = dim ? 0.22 : 0.55 + n.glow * 0.4;
        else labelA = Math.max(0, (n.glow - 0.15) * 1.1); // leaf: only when focused
        if (labelA > 0.02) {
          ctx!.font =
            n.ring === 0
              ? "600 13px ui-sans-serif, system-ui, sans-serif"
              : n.ring === 1
                ? "600 12px ui-sans-serif, system-ui, sans-serif"
                : "500 11px ui-sans-serif, system-ui, sans-serif";
          ctx!.textAlign = "center";
          ctx!.textBaseline = "middle";
          ctx!.fillStyle = `rgba(237,237,237,${labelA})`;
          ctx!.fillText(n.label, n.x, n.y + radius + 12);
        }
      }

      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, [model]);

  const activeBranch = skillBranches.find((b) => b.id === active);

  return (
    <div className="relative">
      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-card/40">
        <canvas
          ref={canvasRef}
          className="h-[520px] w-full cursor-pointer touch-none select-none sm:h-[680px]"
          aria-hidden
        />

        {/* Tooltip pinned to the clicked skill node. */}
        {tip && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border bg-background/95 px-2.5 py-1.5 text-center shadow-lg backdrop-blur transition-opacity"
            style={{
              left: tip.x,
              top: tip.y - 14,
              borderColor: tip.color,
            }}
          >
            <div className="text-xs font-semibold text-foreground">
              {tip.label}
            </div>
            <div className="text-[11px]" style={{ color: tip.color }}>
              {tip.note}
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute bottom-3 left-4 right-4 text-xs text-muted">
          {activeBranch ? (
            <span style={{ color: activeBranch.color }}>
              {activeBranch.label[lang]} · {activeBranch.skills.length}
            </span>
          ) : (
            <span>{skillCoreItems[lang]}</span>
          )}
        </div>
      </div>

      {/* Accessible / no-JS fallback + quick branch controls. */}
      <ul className="mt-4 flex flex-wrap gap-2">
        {skillBranches.map((branch) => (
          <li key={branch.id}>
            <button
              type="button"
              onClick={() => {
                // Enter this branch, or exit if it's already the active one.
                const next = lockedRef.current === branch.id ? null : branch.id;
                lockedRef.current = next;
                setActive(next);
              }}
              className="rounded-full border px-3 py-1.5 text-sm transition-colors"
              style={{
                borderColor:
                  active === branch.id ? branch.color : "var(--border)",
                color: active === branch.id ? branch.color : "var(--muted)",
              }}
            >
              {branch.label[lang]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
