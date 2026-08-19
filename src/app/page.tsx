"use client";

import { FormEvent, useState } from "react";

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
  "1mo": "1 mes",
  "6mo": "6 meses",
  "1y": "1 año",
  "5y": "5 años",
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
          stockData.error ?? "No fue posible consultar la empresa."
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
          : "Ocurrió un error inesperado."
      );
    } finally {
      setLoading(false);
    }
  }

  const positive = (result?.returnPercent ?? 0) >= 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-5 py-12 text-emerald-950">
      <section className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="font-semibold uppercase tracking-[0.25em] text-emerald-600">
            Finanzas + sustentabilidad
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">GREENInvest</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Consulta el rendimiento financiero y la evolución de emisiones de
            empresas públicas de México y Estados Unidos.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <form
            onSubmit={searchStock}
            className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-xl shadow-emerald-100/60"
          >
            <h2 className="text-2xl font-semibold">Buscar una empresa</h2>
            <label className="mt-6 block text-sm font-semibold" htmlFor="ticker">
              Ticker de Yahoo Finance
            </label>
            <input
              id="ticker"
              value={ticker}
              onChange={(event) => setTicker(event.target.value)}
              placeholder="Ej. WALMEX.MX o AAPL"
              className="mt-2 w-full rounded-xl border border-emerald-200 px-4 py-3 outline-none focus:border-emerald-500"
            />
            <p className="mt-2 text-xs text-slate-500">
              Para empresas mexicanas agrega .MX al ticker.
            </p>

            <label className="mt-5 block text-sm font-semibold" htmlFor="range">
              Periodo financiero
            </label>
            <select
              id="range"
              value={range}
              onChange={(event) => setRange(event.target.value)}
              className="mt-2 w-full rounded-xl border border-emerald-200 bg-white px-4 py-3"
            >
              <option value="1mo">1 mes</option>
              <option value="6mo">6 meses</option>
              <option value="1y">1 año</option>
              <option value="5y">5 años</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60"
            >
              {loading ? "Consultando..." : "Ver resultados"}
            </button>
          </form>

          <section className="rounded-3xl bg-emerald-900 p-7 text-white shadow-xl">
            {!result && !error && (
              <div className="flex h-full min-h-72 items-center justify-center text-center text-emerald-100">
                Busca una empresa para ver sus resultados.
              </div>
            )}

            {error && (
              <div className="rounded-2xl bg-red-50 p-5 text-red-800">
                <p className="font-semibold">No pudimos mostrar el resultado</p>
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
                    <p className="text-sm text-emerald-200">Precio actual</p>
                    <p className="mt-2 text-2xl font-bold">
                      {result.currentPrice.toLocaleString("es-MX", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      {result.currency}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-5">
                    <p className="text-sm text-emerald-200">
                      Rendimiento · {periodNames[result.range]}
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
                  Fuente: {result.source}. Rendimiento calculado con el primer y
                  último precio ajustado disponible.
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
                  Cambio de Scope 1 + 2:{" "}
                  <strong>
                    {environment.changePercent > 0 ? "+" : ""}
                    {environment.changePercent.toFixed(2)}%
                  </strong>{" "}
                  ({environment.previousYear}–{environment.latestYear})
                </p>
                <p className="mt-1">
                  Total más reciente:{" "}
                  {environment.latestTotal?.toLocaleString("es-MX")}{" "}
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
                Ver fuente: {environment.sourceName}
              </a>
            )}
          </section>
        )}

        <p className="mt-8 text-sm text-slate-500">
          El semáforo muestra la tendencia de emisiones Scope 1 y 2, no califica
          todo el impacto ambiental de la empresa. GREENInvest es una herramienta
          educativa y no constituye asesoría financiera.
        </p>
      </section>
    </main>
  );
}
