"use client";

import { useEffect, useState } from "react";

const tickers: Record<string, string> = {
  "CEMEX": "CEMEXCPO.MX",
  "Grupo Bimbo": "BIMBOA.MX",
  "Walmart de México": "WALMEX.MX",
  "FEMSA": "FEMSAUBD.MX",
  "América Móvil": "AMXB.MX",
};

type StockSnapshot = {
  ticker: string;
  name: string;
  currency: string;
  currentPrice: number;
  returnPercent: number;
  range: string;
  source: string;
};
type EnvironmentalSnapshot = {
  status: string;
  label: string;
  message: string;
  changePercent?: number;
  latestYear?: number;
  previousYear?: number;
  sourceName?: string;
  sourceUrl?: string;
};

export default function CompanySnapshot({ topic }: { topic: string }) {
  const ticker = tickers[topic];
  const [stock, setStock] = useState<StockSnapshot | null>(null);
  const [environment, setEnvironment] = useState<EnvironmentalSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [stockError, setStockError] = useState("");
  const [environmentError, setEnvironmentError] = useState("");

  useEffect(() => {
    if (!ticker) return;
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setStock(null);
      setEnvironment(null);
      setStockError("");
      setEnvironmentError("");
      try {
        const [stockResponse, envResponse] = await Promise.allSettled([
          fetch(`/api/stock?ticker=${encodeURIComponent(ticker)}&range=1y`, { signal: controller.signal }),
          fetch(`/api/environment?ticker=${encodeURIComponent(ticker)}`, { signal: controller.signal }),
        ]);
        if (controller.signal.aborted) return;
        if (stockResponse.status === "fulfilled") {
          const data = await stockResponse.value.json();
          if (stockResponse.value.ok && typeof data.currentPrice === "number" && typeof data.returnPercent === "number") setStock(data);
          else setStockError(data.error ?? "Financial data is unavailable right now.");
        } else setStockError("Financial data is unavailable right now.");
        if (envResponse.status === "fulfilled") {
          const data = await envResponse.value.json();
          if (envResponse.value.ok) setEnvironment(data);
          else setEnvironmentError("Environmental data is unavailable right now.");
        } else setEnvironmentError("Environmental data is unavailable right now.");
      } catch {
        if (!controller.signal.aborted) {
          setStockError("Financial data could not be loaded.");
          setEnvironmentError("Environmental data could not be loaded.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [ticker]);

  if (!ticker) return null;

  return (
    <section aria-label={`Financial and environmental snapshot for ${topic}`} className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-sky-800">GREENInvest company overview</p>
          <h3 className="mt-1 text-xl font-extrabold text-emerald-950">{topic}</h3>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">{ticker}</span>
      </div>
      {loading && <p role="status" className="mt-4 text-sm text-sky-900">Loading financial and environmental information…</p>}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-sky-200 bg-white p-4">
          <h4 className="font-bold text-sky-950">Financial performance</h4>
          {stock ? (
            <>
              <p className="mt-3 text-xs text-slate-500">Latest reported market price</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900">{stock.currentPrice.toLocaleString("en-US", { maximumFractionDigits: 2 })} {stock.currency}</p>
              <p className={`mt-3 font-bold ${stock.returnPercent >= 0 ? "text-emerald-800" : "text-rose-700"}`}>{stock.returnPercent >= 0 ? "+" : ""}{stock.returnPercent.toFixed(2)}% <span className="font-normal text-slate-600">one-year price return</span></p>
              <p className="mt-2 text-xs text-slate-500">Source: {stock.source}. May be cached or delayed; historical return does not predict future performance.</p>
            </>
          ) : <p className="mt-3 text-sm text-slate-600">{loading ? "Loading…" : stockError || "No price data available."}</p>}
        </div>
        <div className="rounded-xl border border-teal-200 bg-white p-4">
          <h4 className="font-bold text-teal-950">Environmental performance</h4>
          {environment ? (
            <>
              <p className="mt-3 font-bold text-slate-900">{environment.label}</p>
              <p className="mt-2 text-sm text-slate-600">{environment.message}</p>
              {typeof environment.changePercent === "number" && <p className="mt-2 text-sm font-semibold text-teal-900">Scope 1 + 2: {environment.changePercent > 0 ? "+" : ""}{environment.changePercent.toFixed(1)}% ({environment.previousYear}–{environment.latestYear})</p>}
              {environment.sourceUrl && <a href={environment.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-teal-800 underline">View reported source ↗</a>}
            </>
          ) : <p className="mt-3 text-sm text-slate-600">{loading ? "Loading…" : environmentError || "Environmental data unavailable."}</p>}
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-600">These are separate financial and environmental indicators, not a combined ESG rating or investment recommendation. Missing environmental data is not a negative company score.</p>
    </section>
  );
}
