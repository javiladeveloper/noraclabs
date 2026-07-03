import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/dictionaries";
import { LangSwitcher } from "./LangSwitcher";

export function Navbar({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const links = [
    { href: `/${lang}#about`, label: dict.nav.about },
    { href: `/${lang}#services`, label: dict.nav.services },
    { href: `/${lang}#experience`, label: dict.nav.experience },
    { href: `/${lang}#projects`, label: dict.nav.projects },
    { href: `/${lang}#contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2.5 text-sm font-bold tracking-tight"
        >
          <Image
            src="/logo-norac.png"
            alt="Norac Labs"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          Norac Labs
        </Link>
        <div className="hidden items-center gap-6 text-sm text-muted md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <LangSwitcher current={lang} />
      </nav>
    </header>
  );
}
