import { NextRequest, NextResponse } from "next/server";

const allowedRanges = new Set(["1mo", "6mo", "1y", "5y"]);

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      meta?: {
        currency?: string;
        regularMarketPrice?: number;
        shortName?: string;
        longName?: string;
        symbol?: string;
        exchangeName?: string;
      };
      indicators?: {
        adjclose?: Array<{ adjclose?: Array<number | null> }>;
        quote?: Array<{ close?: Array<number | null> }>;
      };
    }>;
    error?: { description?: string } | null;
  };
};

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get("ticker")?.trim().toUpperCase();
  const requestedRange = request.nextUrl.searchParams.get("range") ?? "1y";
  const range = allowedRanges.has(requestedRange) ? requestedRange : "1y";

  if (!ticker || !/^[A-Z0-9.^=-]{1,15}$/.test(ticker)) {
    return NextResponse.json(
      { error: "Escribe un ticker válido, por ejemplo WALMEX.MX o AAPL." },
      { status: 400 }
    );
  }

  try {
    const url =
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?range=${range}&interval=1d&events=div%2Csplits`;

    const response = await fetch(url, {
      headers: { "User-Agent": "GREENInvest educational project" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Yahoo Finance no respondió correctamente.");
    }

    const data = (await response.json()) as YahooChartResponse;
    const result = data.chart?.result?.[0];

    if (!result) {
      return NextResponse.json(
        { error: "No encontramos esa empresa en Yahoo Finance." },
        { status: 404 }
      );
    }

    const adjusted =
      result.indicators?.adjclose?.[0]?.adjclose ??
      result.indicators?.quote?.[0]?.close ??
      [];
    const prices = adjusted.filter(
      (price): price is number => typeof price === "number"
    );

    if (prices.length < 2) {
      return NextResponse.json(
        { error: "No hay suficientes precios para calcular el rendimiento." },
        { status: 404 }
      );
    }

    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const returnPercent = ((lastPrice / firstPrice) - 1) * 100;
    const meta = result.meta ?? {};

    return NextResponse.json({
      ticker: meta.symbol ?? ticker,
      name: meta.longName ?? meta.shortName ?? ticker,
      exchange: meta.exchangeName ?? "No disponible",
      currency: meta.currency ?? "",
      currentPrice: meta.regularMarketPrice ?? lastPrice,
      firstPrice,
      returnPercent,
      range,
      source: "Yahoo Finance",
    });
  } catch {
    return NextResponse.json(
      { error: "No fue posible consultar Yahoo Finance. Intenta nuevamente." },
      { status: 502 }
    );
  }
}
