"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/core", label: "Core" },
  { href: "/research", label: "Research" },
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/marketing", label: "Marketing" },
  { href: "/chat", label: "Chat" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/docs", label: "Docs" },
  { href: "/demo", label: "Demo" },
];

export default function SiteNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    const last = window.sessionStorage.getItem("greeninvestCurrentRoute");
    if (last && last !== pathname) {
      window.sessionStorage.setItem("greeninvestPreviousRoute", last);
    }
    window.sessionStorage.setItem("greeninvestCurrentRoute", pathname);
  }, [pathname]);

  const navigationLinks = (mobile: boolean) =>
    links.map(({ href, label }) => {
      const active = pathname === href;
      return (
        <Link key={href} href={href} aria-current={active ? "page" : undefined}
          className={`rounded-lg px-3 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${active ? "bg-emerald-700 text-white" : "text-emerald-800 hover:bg-emerald-50"} ${mobile ? "block" : ""}`}>
          {label}
        </Link>
      );
    });

  return (
    <header className="border-b border-emerald-100 bg-white text-emerald-950">
      <nav aria-label="Main navigation" className="mx-auto max-w-7xl px-5 py-3 md:flex md:items-center md:gap-5 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="shrink-0 text-xl font-extrabold tracking-tight">
            GREEN<span className="text-emerald-600">Invest</span>
          </Link>
          <details key={pathname} className="relative md:hidden">
            <summary className="cursor-pointer list-none rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
              Menu ☰
            </summary>
            <div className="absolute right-0 top-full z-50 mt-2 grid max-h-[70vh] w-52 gap-1 overflow-y-auto rounded-xl border border-emerald-100 bg-white p-2 shadow-xl">
              {navigationLinks(true)}
            </div>
          </details>
        </div>
        <div className="hidden flex-1 flex-wrap items-center gap-1 text-sm font-semibold md:flex">
          {navigationLinks(false)}
        </div>
      </nav>
    </header>
  );
}
