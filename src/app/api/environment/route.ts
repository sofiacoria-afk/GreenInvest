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
    label: "Environmental data unavailable",
    message,
  });
}

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get("ticker")?.trim().toUpperCase();

  if (!ticker) {
    return unavailable("A company ticker is required.");
  }

  const supabase = getSupabase();

  if (!supabase) {
    return unavailable("Environmental data connection is unavailable. Please check the Supabase configuration for this deployment.");
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
    return unavailable("Two comparable reporting years of emissions data are needed.");
  }

  const [latest, previous] = data as EmissionRow[];
  const latestTotal =
    Number(latest.scope_1_tco2e) + Number(latest.scope_2_tco2e);
  const previousTotal =
    Number(previous.scope_1_tco2e) + Number(previous.scope_2_tco2e);

  if (previousTotal <= 0) {
    return unavailable("The previous year does not contain a comparable total.");
  }

  const changePercent = ((latestTotal / previousTotal) - 1) * 100;
  const status =
    changePercent < -5 ? "green" : changePercent > 5 ? "red" : "yellow";
  const labels = {
    green: "Emissions decreased",
    yellow: "Emissions stable",
    red: "Emissions increased",
  };

  return NextResponse.json({
    status,
    label: labels[status],
    message:
      status === "green"
        ? "The company reduced Scope 1 and 2 emissions by more than 5%."
        : status === "red"
          ? "The company increased Scope 1 and 2 emissions by more than 5%."
          : "Emissions changed by between -5% and +5%.",
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
