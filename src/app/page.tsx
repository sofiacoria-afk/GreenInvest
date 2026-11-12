"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const exampleCompanies = [
  { ticker: "WALMEX.MX", name: "Walmart de México" },
  { ticker: "BIMBOA.MX", name: "Grupo Bimbo" },
  { ticker: "CEMEXCPO.MX", name: "Cemex" },
  { ticker: "FEMSAUBD.MX", name: "FEMSA" },
  { ticker: "AMXB.MX", name: "América Móvil" },
  { ticker: "AAPL", name: "Apple" },
];

type StockResult = {
  ticker: string;
  name: string;
  exchange: string;
  currency: string;
  currentPrice: number;
  returnPercent: number;
  range: string;
  source: string;
};

type EnvironmentResult = {
  status: "green" | "yellow" | "red" | "gray";
  label: string;
  message: string;
  changePercent?: number;
  latestYear?: number;
  previousYear?: number;
  latestTotal?: number;
  unit?: string;
  sourceName?: string;
  sourceUrl?: string;
};

const periodNames: Record<string, string> = {
  "1mo": "1 month",
  "6mo": "6 months",
  "1y": "1 year",
  "5y": "5 years",
};

const statusStyles = {
  green: "border-lime-300 bg-lime-100 text-lime-950",
  yellow: "border-amber-300 bg-amber-100 text-amber-950",
  red: "border-red-300 bg-red-100 text-red-950",
  gray: "border-slate-300 bg-slate-100 text-slate-700",
};

const statusDots = {
  green: "bg-green-600",
  yellow: "bg-amber-500",
  red: "bg-red-600",
  gray: "bg-slate-400",
};

export default function Home() {
  const [ticker, setTicker] = useState("WALMEX.MX");
  const [customTicker, setCustomTicker] = useState(false);
  const [range, setRange] = useState("1y");
  const [result, setResult] = useState<StockResult | null>(null);
  const [environment, setEnvironment] = useState<EnvironmentResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function searchStock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    setEnvironment(null);

    try {
      const stockResponse = await fetch(
        `/api/stock?ticker=${encodeURIComponent(ticker)}&range=${range}`
      );
      const stockData = await stockResponse.json();

      if (!stockResponse.ok) {
        throw new Error(
          stockData.error ?? "Could not retrieve the company."
        );
      }

      setResult(stockData);

      const environmentResponse = await fetch(
        `/api/environment?ticker=${encodeURIComponent(stockData.ticker)}`
      );
      setEnvironment(await environmentResponse.json());
    } catch (searchError) {
      setError(
        searchError instanceof Error
          ? searchError.message
          : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  const positive = (result?.returnPercent ?? 0) >= 0;

  return (
    <main className="min-h-screen min-w-0 overflow-x-hidden bg-gradient-to-b from-emerald-50 to-white px-5 py-8 text-emerald-950 sm:py-12">
      <section className="mx-auto w-full min-w-0 max-w-5xl">
        <header className="mb-10">
          <p className="max-w-full break-words text-sm font-semibold uppercase tracking-[0.15em] text-emerald-600 sm:text-base sm:tracking-[0.25em]">
            Finance + Sustainability
          </p>
          <h1 className="mt-3 break-words text-4xl font-bold tracking-tight sm:text-5xl">GREENInvest</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Search for a company to view its financial performance and available emissions data.
          </p>
          <Link href="/product" className="mt-5 inline-flex max-w-full flex-wrap items-center rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800 sm:px-5 sm:text-base">See what GREENInvest offers →</Link>
        </header>

        <div className="grid min-w-0 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <form
            onSubmit={searchStock}
            className="min-w-0 rounded-3xl border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-100/60 sm:p-7"
          >
            <h2 className="text-2xl font-semibold">Search for a company</h2>
            <label className="mt-6 block text-sm font-semibold" htmlFor="company">
              Choose a company by name
            </label>
            <select
              id="company"
              value={customTicker ? "other" : ticker}
              onChange={(event) => {
                if (event.target.value === "other") {
                  setCustomTicker(true);
                  setTicker("");
                } else {
                  setCustomTicker(false);
                  setTicker(event.target.value);
                }
              }}
              className="mt-2 block w-full min-w-0 max-w-full rounded-xl border border-emerald-200 bg-white px-3 py-3 text-sm sm:px-4 sm:text-base"
            >
              {exampleCompanies.map((company) => (
                <option key={company.ticker} value={company.ticker}>
                  {company.name} ({company.ticker})
                </option>
              ))}
              <option value="other">Other company (enter ticker)</option>
            </select>
            {customTicker && (
              <>
                <label className="mt-4 block text-sm font-semibold" htmlFor="ticker">
                  Yahoo Finance ticker
                </label>
                <input
                  id="ticker"
                  value={ticker}
                  onChange={(event) => setTicker(event.target.value)}
                  placeholder="e.g., WALMEX.MX or AAPL"
                  required
                  className="mt-2 w-full rounded-xl border border-emerald-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Mexican stock symbols usually end in .MX.
                </p>
              </>
            )}
            <p className="mt-2 text-xs text-slate-500">
              Select a sample company or choose “Other company” to enter a ticker.
              Environmental data may not be available for every company.
            </p>

            <label className="mt-5 block text-sm font-semibold" htmlFor="range">
              Financial period
            </label>
            <select
              id="range"
              value={range}
              onChange={(event) => setRange(event.target.value)}
              className="mt-2 w-full rounded-xl border border-emerald-200 bg-white px-4 py-3"
            >
              <option value="1mo">1 month</option>
              <option value="6mo">6 months</option>
              <option value="1y">1 year</option>
              <option value="5y">5 years</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
            >
              {loading ? "Loading..." : "View results"}
            </button>
          </form>

          <section className="min-w-0 rounded-3xl bg-emerald-900 p-5 text-white shadow-xl sm:p-7">
            {!result && !error && (
              <div className="flex h-full min-h-72 items-center justify-center text-center text-emerald-100">
                Search for a company to view its results.
              </div>
            )}

            {error && (
              <div className="rounded-2xl bg-red-50 p-5 text-red-800">
                <p className="font-semibold">Could not display results</p>
                <p className="mt-2 text-sm">{error}</p>
              </div>
            )}

            {result && (
              <>
                <p className="text-sm font-semibold text-emerald-300">
                  {result.ticker} · {result.exchange}
                </p>
                <h2 className="mt-2 text-3xl font-bold">{result.name}</h2>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="text-sm text-emerald-200">Current price</p>
                    <p className="mt-2 text-2xl font-bold">
                      {result.currentPrice.toLocaleString("en-US", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      {result.currency}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="text-sm text-emerald-200">
                      Return · {periodNames[result.range]}
                    </p>
                    <p
                      className={`mt-2 text-2xl font-bold ${
                        positive ? "text-lime-300" : "text-red-300"
                      }`}
                    >
                      {positive ? "+" : ""}
                      {result.returnPercent.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-xs text-emerald-200">
                  Source: {result.source}. Return calculated using the first and
                  last available adjusted price.
                </p>
              </>
            )}
          </section>
        </div>

        {environment && (
          <section
            className={`mt-6 rounded-3xl border p-7 ${
              statusStyles[environment.status]
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`h-4 w-4 rounded-full ${
                  statusDots[environment.status]
                }`}
              />
              <h2 className="text-xl font-bold">{environment.label}</h2>
            </div>
            <p className="mt-3">{environment.message}</p>

            {environment.changePercent !== undefined && (
              <div className="mt-4 text-sm">
                <p>
                  Change in Scope 1 + 2:{" "}
                  <strong>
                    {environment.changePercent > 0 ? "+" : ""}
                    {environment.changePercent.toFixed(2)}%
                  </strong>{" "}
                  ({environment.previousYear}–{environment.latestYear})
                </p>
                <p className="mt-1">
                  Latest total:{" "}
                  {environment.latestTotal?.toLocaleString("en-US")}{" "}
                  {environment.unit}
                </p>
              </div>
            )}

            {environment.sourceUrl && (
              <a
                className="mt-4 inline-block text-sm font-semibold underline"
                href={environment.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                View source: {environment.sourceName}
              </a>
            )}
          </section>
        )}

        <p className="mt-8 text-sm text-slate-500">
          The indicator shows the trend in Scope 1 and 2 emissions; it does not rate
          a company’s overall environmental impact. GREENInvest is an educational
          tool and does not provide financial advice.
        </p>
        <p className="mt-3 text-xs text-slate-400">
          Data sources: Yahoo Finance, Supabase and official company
          sustainability reports.
        </p>
      </section>
    </main>
  );
}
