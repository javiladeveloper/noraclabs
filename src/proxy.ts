import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["es", "en"] as const;
const defaultLocale = "es";

function getLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language");
  if (accept) {
    const preferred = accept
      .split(",")
      .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());
    const match = preferred.find((lang) =>
      locales.includes(lang as (typeof locales)[number]),
    );
    if (match) return match;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next.js internals and static assets.
  matcher: ["/((?!_next|favicon.ico|.*\\.).*)"],
};
