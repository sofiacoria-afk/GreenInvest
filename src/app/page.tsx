"use client";

import { FormEvent, useState } from "react";

type StockResult = {
  ticker: string;
  name: string;
  exchange: string;
  currency: string;
  currentPrice: number;
  firstPrice: number;
  returnPercent: number;
  range: string;
  source: string;
};

const periodNames: Record<string, string> = {
  "1mo": "1 mes",
  "6mo": "6 meses",
  "1y": "1 año",
  "5y": "5 años",
};

export default function Home() {
  const [ticker, setTicker] = useState("WALMEX.MX");
  const [range, setRange] = useState("1y");
  const [result, setResult] = useState<StockResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function searchStock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `/api/stock?ticker=${encodeURIComponent(ticker)}&range=${range}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "No fue posible consultar la empresa.");
      }

      setResult(data);
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
            Consulta el rendimiento de empresas públicas de México y Estados
            Unidos de una forma clara y fácil de entender.
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
              Periodo
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
              {loading ? "Consultando..." : "Ver rendimiento"}
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
                  Fuente: {result.source}. El rendimiento se calcula comparando
                  el primer y el último precio ajustado disponible del periodo.
                </p>
              </>
            )}
          </section>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
          El indicador de emisiones de carbono se agregará con datos ambientales
          almacenados en Supabase. GREENInvest es una herramienta educativa y no
          constituye asesoría financiera.
        </div>
      </section>
    </main>
  );
}
