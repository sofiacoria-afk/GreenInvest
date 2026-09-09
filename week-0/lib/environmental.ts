export type EnvironmentalRecord = {
  company: string;
  ticker: string;
  year: number;
  scope1: number | null;
  scope2Market: number | null;
  scope2Location: number | null;
  scope3: number | null;
  unit: "tCO2e";
  sourceName: string;
  sourceUrl: string;
  sourceType: "company-report" | "bmv" | "climate-trace";
};

export const supportedCompanies = [
  { company: "CEMEX", ticker: "CEMEXCPO.MX" },
  { company: "Grupo Bimbo", ticker: "BIMBOA.MX" },
  { company: "Walmart de México", ticker: "WALMEX.MX" },
  { company: "América Móvil", ticker: "AMXB.MX" },
  { company: "FEMSA", ticker: "FEMSAUBD.MX" }
];

export function emissionsTrend(current: number, previous: number) {
  if (previous <= 0) return { percent: null, label: "Not enough data", tone: "neutral" };
  const percent = ((current - previous) / previous) * 100;
  if (percent < -2) return { percent, label: "Emissions decreasing", tone: "green" };
  if (percent > 2) return { percent, label: "Emissions increasing", tone: "red" };
  return { percent, label: "Emissions approximately stable", tone: "yellow" };
}
