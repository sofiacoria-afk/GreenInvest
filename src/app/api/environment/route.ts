import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

type EmissionRow = {
  ticker: string;
  company_name: string;
  reporting_year: number;
  scope_1_tco2e: number;
  scope_2_tco2e: number;
  source_name: string;
  source_url: string;
  verified: boolean;
};

function unavailable(message: string) {
  return NextResponse.json({
    status: "gray",
    label: "Información no disponible",
    message,
  });
}

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get("ticker")?.trim().toUpperCase();

  if (!ticker) {
    return unavailable("Es necesario indicar una empresa.");
  }

  const supabase = getSupabase();

  if (!supabase) {
    return unavailable("La base de datos ambiental todavía no está conectada.");
  }

  const { data, error } = await supabase
    .from("company_emissions")
    .select(
      "ticker, company_name, reporting_year, scope_1_tco2e, scope_2_tco2e, source_name, source_url, verified"
    )
    .eq("ticker", ticker)
    .order("reporting_year", { ascending: false })
    .limit(2);

  if (error || !data || data.length < 2) {
    return unavailable("Se necesitan dos años comparables de emisiones.");
  }

  const [latest, previous] = data as EmissionRow[];
  const latestTotal =
    Number(latest.scope_1_tco2e) + Number(latest.scope_2_tco2e);
  const previousTotal =
    Number(previous.scope_1_tco2e) + Number(previous.scope_2_tco2e);

  if (previousTotal <= 0) {
    return unavailable("El año anterior no contiene un total comparable.");
  }

  const changePercent = ((latestTotal / previousTotal) - 1) * 100;
  const status =
    changePercent < -5 ? "green" : changePercent > 5 ? "red" : "yellow";
  const labels = {
    green: "Emisiones en reducción",
    yellow: "Emisiones estables",
    red: "Emisiones en aumento",
  };

  return NextResponse.json({
    status,
    label: labels[status],
    message:
      status === "green"
        ? "La empresa redujo sus emisiones Scope 1 y 2 más de 5%."
        : status === "red"
          ? "La empresa aumentó sus emisiones Scope 1 y 2 más de 5%."
          : "El cambio de emisiones se mantuvo entre -5% y +5%.",
    changePercent,
    latestYear: latest.reporting_year,
    previousYear: previous.reporting_year,
    latestTotal,
    previousTotal,
    unit: "tCO₂e",
    sourceName: latest.source_name,
    sourceUrl: latest.source_url,
    verified: latest.verified,
  });
}
