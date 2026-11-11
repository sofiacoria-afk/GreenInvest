"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";

type SavedRecord = {
  id: string | number;
  title: string;
  detail: string;
  created_at: string | null;
};

type Collection = {
  label: string;
  href: string;
  records: SavedRecord[];
  status: "loading" | "ready" | "empty" | "error";
  message?: string;
};

const initialCollections: Collection[] = [
  { label: "Core ideas", href: "/core", records: [], status: "loading" },
  { label: "Research outputs", href: "/research", records: [], status: "loading" },
  { label: "Pricing scenarios", href: "/pricing", records: [], status: "loading" },
];

function asText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asNumber(value: unknown): string {
  return typeof value === "number" ? value.toLocaleString("en-US") : "—";
}

function formatDate(value: string | null): string {
  if (!value) return "Date unavailable";
  const time = Date.parse(value);
  return Number.isNaN(time) ? "Date unavailable" : new Date(time).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function DashboardPage() {
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [refreshing, setRefreshing] = useState(false);

  const loadRecords = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setCollections(initialCollections.map((item) => ({ ...item, status: "error", message: "Supabase is not configured." })));
      return;
    }

    setRefreshing(true);
    setCollections((previous) => previous.map((item) => ({ ...item, status: "loading" })));

    // Only read the three existing educational data collections. Do not expose
    // per-visitor chat sessions, feedback, or marketing assets on a public page.
    const [core, research, pricing] = await Promise.all([
      supabase.from("core_outputs").select("id,idea_title,core_problem,created_at").order("created_at", { ascending: false }).limit(8),
      supabase.from("research_outputs").select("id,research_query,research_summary,created_at").order("created_at", { ascending: false }).limit(8),
      supabase.from("pricing_scenarios").select("id,scenario_name,monthly_revenue,created_at").order("created_at", { ascending: false }).limit(8),
    ]);

    const results: Array<{ data: Record<string, unknown>[] | null; error: { message: string } | null }> = [
      { data: core.data as Record<string, unknown>[] | null, error: core.error },
      { data: research.data as Record<string, unknown>[] | null, error: research.error },
      { data: pricing.data as Record<string, unknown>[] | null, error: pricing.error },
    ];
    const mapped = results.map((result, index): Collection => {
      const base = initialCollections[index];
      if (result.error) {
        return { ...base, records: [], status: "error", message: "Records could not be loaded. Check database access and table permissions." };
      }
      const records = (result.data ?? []).map((entry): SavedRecord => ({
        id: String(entry.id),
        title: index === 0 ? asText(entry.idea_title) : index === 1 ? asText(entry.research_query) : asText(entry.scenario_name),
        detail: index === 0 ? asText(entry.core_problem) : index === 1 ? asText(entry.research_summary) : `Estimated monthly revenue: ${asNumber(entry.monthly_revenue)} MXN (scenario only)`,
        created_at: typeof entry.created_at === "string" ? entry.created_at : null,
      }));
      return { ...base, records, status: records.length ? "ready" : "empty" };
    });
    setCollections(mapped);
    setRefreshing(false);
  }, []);

  useEffect(() => { void loadRecords(); }, [loadRecords]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-5 py-12 text-emerald-950">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Week 6 · Integrated Venture</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold sm:text-5xl">Saved Results Dashboard</h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-600">Review recent Core, Research, and Pricing records saved in GREENInvest.</p>
          </div>
          <button type="button" onClick={() => void loadRecords()} disabled={refreshing}
            className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-50">
            {refreshing ? "Loading..." : "Refresh records"}
          </button>
        </div>
        <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          This educational dashboard shows only records accessible under current Supabase policies.
          Personal chat sessions and marketing assets are intentionally excluded. Revenue figures are simulated scenarios, not actual sales.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {collections.map((collection) => (
            <section key={collection.label} className="min-w-0 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{collection.label}</h2>
                <Link href={collection.href} className="text-sm font-semibold text-emerald-800 underline underline-offset-4">Open tool</Link>
              </div>
              {collection.status === "loading" && <p role="status" className="mt-5 text-sm text-slate-600">Loading saved records...</p>}
              {collection.status === "error" && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-800">{collection.message}</p>}
              {collection.status === "empty" && <p className="mt-5 text-sm text-slate-600">No saved records yet. Use the tool to create one.</p>}
              {collection.status === "ready" && (
                <ul className="mt-5 space-y-3">
                  {collection.records.map((record) => (
                    <li key={record.id} className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                      <h3 className="break-words font-bold text-emerald-950">{record.title || "Untitled record"}</h3>
                      <p className="mt-2 break-words text-sm leading-6 text-slate-700">{record.detail || "No description available."}</p>
                      <p className="mt-3 text-xs text-slate-500">{formatDate(record.created_at)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <section className="mt-8 rounded-2xl border border-emerald-200 bg-white p-6">
          <h2 className="text-xl font-bold">Other saved work</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">For privacy, saved marketing assets and chat feedback remain available through their original features and their own visitor access rules. This dashboard does not bypass those restrictions.</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold text-emerald-800">
            <Link href="/marketing" className="underline underline-offset-4">Marketing workspace</Link>
            <Link href="/chat" className="underline underline-offset-4">Educational chat</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
