"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/dictionaries";

const options: { code: Locale; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export function LangSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  function pathFor(locale: Locale) {
    const segments = pathname.split("/");
    // segments[0] is "" (leading slash), segments[1] is the locale.
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1 text-xs font-medium">
      {options.map((opt) => {
        const active = opt.code === current;
        return (
          <Link
            key={opt.code}
            href={pathFor(opt.code)}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "rounded-full bg-accent px-2.5 py-1 text-white"
                : "rounded-full px-2.5 py-1 text-muted transition-colors hover:text-foreground"
            }
          >
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
}
