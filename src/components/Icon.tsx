/** Minimal line-art icons used across the marketing sections. */
export type IconName =
  | "chat"
  | "design"
  | "build"
  | "launch"
  | "clock"
  | "shield"
  | "chart";

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const p = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (name) {
    case "chat":
      return (
        <svg {...p}>
          <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12Z" />
          <path d="M8.5 11h7M8.5 14h4" />
        </svg>
      );
    case "design":
      return (
        <svg {...p}>
          <path d="M12 3l7 4v10l-7 4-7-4V7l7-4Z" />
          <path d="M12 3v18M5 7l7 4 7-4" />
        </svg>
      );
    case "build":
      return (
        <svg {...p}>
          <path d="m14 6 4 4M3 21l3-1 11-11a2.8 2.8 0 0 0-4-4L2 16l-1 3 2 2Z" />
        </svg>
      );
    case "launch":
      return (
        <svg {...p}>
          <path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5c.6-.6.6-1.9 0-2.5s-1.9-.6-2.5 0Z" />
          <path d="M9 13c4-8 9-9 11-9 0 2-1 7-9 11l-2-2Z" />
          <circle cx="14.5" cy="8.5" r="1.4" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 1.8" />
        </svg>
      );
    case "shield":
      return (
        <svg {...p}>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
          <path d="m9.2 12 2 2 3.6-3.8" />
        </svg>
      );
    case "chart":
      return (
        <svg {...p}>
          <path d="M4 20V4M4 20h16" />
          <path d="M8 16v-4M12 16V8M16 16v-6" />
        </svg>
      );
  }
}
