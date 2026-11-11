"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/core", label: "Core" },
  { href: "/research", label: "Research" },
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/marketing", label: "Marketing" },
  { href: "/chat", label: "Chat" },
  { href: "/docs", label: "Docs" },
];

export default function SiteNavigation() {
  const pathname = usePathname();

  return (
    <header className="border-b border-emerald-100 bg-white text-emerald-950">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-7 gap-y-3 px-5 py-4">
        <Link href="/" className="shrink-0 text-xl font-extrabold tracking-tight">
          GREEN<span className="text-emerald-600">Invest</span>
        </Link>
        <div className="flex flex-1 flex-wrap items-center gap-1 text-sm font-semibold">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${active ? "bg-emerald-700 text-white" : "text-emerald-800 hover:bg-emerald-50"}`}>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
