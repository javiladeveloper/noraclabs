import type { Service } from "@/data/highlights";

/** Minimal inline line-art icons for the services section. */
export function ServiceIcon({ name }: { name: Service["icon"] }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-accent"
      aria-hidden
    >
      {name === "ai" && (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <circle cx="5" cy="6" r="1.6" />
          <circle cx="19" cy="6" r="1.6" />
          <circle cx="5" cy="18" r="1.6" />
          <circle cx="19" cy="18" r="1.6" />
          <path d="M6.3 6.9 9.6 10.5M17.7 6.9 14.4 10.5M6.3 17.1 9.6 13.5M17.7 17.1 14.4 13.5" />
        </svg>
      )}
      {name === "architecture" && (
        <svg {...common}>
          <rect x="9" y="3" width="6" height="6" rx="1" />
          <rect x="3" y="15" width="6" height="6" rx="1" />
          <rect x="15" y="15" width="6" height="6" rx="1" />
          <path d="M12 9v3M12 12H6v3M12 12h6v3" />
        </svg>
      )}
      {name === "cloud" && (
        <svg {...common}>
          <path d="M7 18a4 4 0 0 1-.5-7.97 5 5 0 0 1 9.7-1.2A3.5 3.5 0 0 1 17 18H7Z" />
          <path d="m9.5 13 1.8 1.8L15 11" />
        </svg>
      )}
      {name === "data" && (
        <svg {...common}>
          <ellipse cx="12" cy="5" rx="7" ry="2.6" />
          <path d="M5 5v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V5" />
          <path d="M5 11v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6" />
        </svg>
      )}
    </span>
  );
}
