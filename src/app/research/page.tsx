"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabase } from "../../lib/supabase";

const supabase = getSupabase();

type SavedResearch = { id: number; research_query: string; research_summary: string; created_at: string };

const globalExamples = [
  { name: "MSCI ESG Ratings", detail: "Rates companies on financially relevant, industry-specific sustainability risks and opportunities.", source: "https://www.msci.com/data-and-analytics/sustainability-solutions/esg-ratings" },
  { name: "Morningstar Sustainalytics", detail: "Measures company exposure to material ESG risks and how those risks are managed.", source: "https://www.sustainalytics.com/corporate-solutions/esg-solutions/esg-risk-ratings" },
  { name: "S&P Global Sustainable1", detail: "Provides ESG scores and sustainability data to compare company performance and material ESG issues.", source: "https://www.spglobal.com/sustainable1/en/solutions/esg-scores-data/" },
  { name: "Clarity AI", detail: "Uses sustainability data and technology to analyze indicators such as GHG emissions, waste, and water pollution.", source: "https://clarity.ai/raw-data-solutions/" },
  { name: "LSEG ESG Scores and Data", detail: "Combines standardized sustainability data, materiality assessments, and ESG scores for investment analysis.", source: "https://www.lseg.com/en/data-analytics/sustainable-finance/sustainability-ratings-and-data" },
];

const competitors = [
  { name: "MSCI ESG Ratings", type: "Benchmark", fact: "Industry-relative ESG ratings from AAA to CCC.", gap: "MSCI ESG Ratings is sustainability-focused: it evaluates financially relevant ESG risks and opportunities rather than presenting a simple company stock-performance comparison. GREENInvest combines financial performance with environmental indicators for a focused set of Mexican listed companies.", risk: "Low", source: "https://www.msci.com/data-and-analytics/sustainability-solutions/esg-ratings" },
  { name: "Morningstar Sustainalytics", type: "ESG Research", fact: "ESG Risk Ratings use five risk levels and cover 16,000+ companies.", gap: "Sustainalytics focuses on ESG risk exposure and management. GREENInvest adds a simple financial-performance view alongside environmental information for Mexican listed companies, designed for non-expert users.", risk: "Low", source: "https://www.sustainalytics.com/corporate-solutions/esg-solutions/esg-risk-ratings" },
  { name: "S&P Global Sustainable1", type: "ESG Data", fact: "ESG scores evaluate material sustainability risks, opportunities, and impacts.", gap: "S&P Global Sustainable1 provides detailed sustainability scores and data that can connect with broader financial and market datasets in the S&P Global ecosystem. GREENInvest uses a smaller set of financial and environmental indicators in one simpler Mexico-focused comparison.", risk: "Low", source: "https://www.spglobal.com/sustainable1/en/solutions/esg-scores-data/" },
  { name: "Clarity AI", type: "Sustainability Technology", fact: "Offers ESG data for 40,000+ issuers, including GHG emissions, waste, and water indicators.", gap: "Clarity AI’s referenced solution focuses on ESG and sustainability data, including emissions, waste, and water indicators. GREENInvest pairs environmental information with financial performance and starts with a focused set of Mexican public companies.", risk: "Medium", source: "https://clarity.ai/raw-data-solutions/" },
  { name: "LSEG ESG Scores and Data", type: "Financial + ESG Data", fact: "Covers 16,000+ companies with 240+ standardized sustainability metrics.", gap: "LSEG provides both financial/company data and extensive ESG information for professional analysis. GREENInvest also brings financial and environmental information together, but in a much simpler comparison designed around a small set of Mexican listed companies.", risk: "Medium", source: "https://www.lseg.com/en/data-analytics/sustainable-finance/sustainability-ratings-and-data" },
  { name: "BlackRock Aladdin Sustainability", type: "Investment Platform", fact: "Integrates 15,000+ ESG metrics into investment and risk-management workflows.", gap: "Aladdin integrates sustainability data and climate analytics into institutional investment, risk-management, and financial-model workflows. GREENInvest provides a much simpler company-level view of financial performance and environmental information for Mexican listed companies.", risk: "High", source: "https://www.blackrock.com/aladdin/platforms/products/aladdin-sustainability" },
  { name: "Bloomberg Sustainable Finance", type: "Financial Information", fact: "Combines ESG data, research, analytics, climate tools, and financial-market information.", gap: "Bloomberg provides both financial-market information and extensive ESG, climate, research, and analytics tools for professional users. GREENInvest narrows this to an accessible comparison of financial performance and environmental information for Mexican listed companies.", risk: "High", source: "https://professional.bloomberg.com/products/bloomberg-terminal/sustainable-finance/" },
  { name: "ISS ESG", type: "ESG Research", fact: "Provides sustainability research, ratings, screening, climate data, and analytics for investors.", gap: "ISS ESG focuses on sustainability research, ratings, screening, climate data, and ESG analytics. GREENInvest adds a simple financial-performance comparison alongside environmental information and focuses on Mexican listed companies.", risk: "Medium", source: "https://www.issgovernance.com/esg/" },
];

export default function ResearchPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [researchQuery, setResearchQuery] = useState("Sustainable investment platforms");
  const [savedResearch, setSavedResearch] = useState<SavedResearch[]>([]);
  const [saveStatus, setSaveStatus] = useState("");

  const types = useMemo(() => ["All", ...Array.from(new Set(competitors.map((item) => item.type)))], []);

  const filteredCompetitors = useMemo(() => {
    const query = search.trim().toLowerCase();
    return competitors.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.fact.toLowerCase().includes(query);
      const matchesType = typeFilter === "All" || item.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  useEffect(() => {
    async function loadSavedResearch() {
      if (!supabase) return;
      const { data } = await supabase.from("research_outputs").select("*").order("created_at", { ascending: false }).limit(10);
      if (data) setSavedResearch(data as SavedResearch[]);
    }
    loadSavedResearch();
  }, []);

  async function saveResearch() {
    if (!supabase) { setSaveStatus("Supabase environment variables are not configured."); return; }
    const query = researchQuery.trim() || "Sustainable investment platforms";
    const summary = "Research includes 5 global examples, Mexico sustainable-finance context, 8 competitors/substitutes, comparison filters, and a competitive risk map.";
    setSaveStatus("Saving...");
    const { data, error } = await supabase.from("research_outputs").insert({ research_query: query, research_summary: summary }).select().single();
    if (error) { setSaveStatus("Could not save research."); return; }
    setSavedResearch((items) => [data as SavedResearch, ...items]);
    setSaveStatus("Research saved.");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 via-emerald-50 to-white px-5 py-12 text-emerald-950"><div className="pointer-events-none fixed inset-0 opacity-50" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 8% 12%, rgba(16,185,129,.18), transparent 24%), radial-gradient(circle at 92% 18%, rgba(14,165,233,.15), transparent 25%), linear-gradient(135deg, transparent 68%, rgba(16,185,129,.10) 68%, rgba(16,185,129,.10) 72%, transparent 72%)" }}></div>\n      <div className="relative z-10 mx-auto max-w-6xl">
      <header className="mb-10 flex flex-col justify-between gap-5 md:flex-row">
        <div>
          <p className="font-semibold uppercase tracking-[0.25em] text-emerald-600">GREENInvest · Week 2</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Research + Benchmarking Dashboard</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Explore sustainable investment platforms, Mexico research, competitors, risks, and saved research in one simple dashboard.</p>
        </div>
        <a className="font-semibold text-emerald-700 underline" href="/">Back to GREENInvest</a>
      </header>

      <section className="mt-10 rounded-3xl border border-emerald-100 bg-white/90 p-7 shadow-sm backdrop-blur-[2px] md:p-8">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-xl">⌕</span><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Research intake</p></div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <input aria-label="Research topic" value={researchQuery} onChange={(event) => setResearchQuery(event.target.value)} placeholder="Example: Sustainable investment platforms" className="rounded-xl border border-emerald-200 px-4 py-3" />
          <button className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-800 active:bg-emerald-950" type="button" onClick={() => { setSearch(""); setTypeFilter("All"); }}>Search</button>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-emerald-100 bg-white/90 p-7 shadow-sm backdrop-blur-[2px] md:p-8">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-xl">◎</span><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Global benchmarks</p></div>
        <h2>5 Global Examples</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {globalExamples.map((item) => (
            <article className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5" key={item.name}>
              <h3 className="mt-1 text-lg font-bold text-emerald-900">{item.name}</h3>
              <p>{item.detail}</p>
              <a className="mt-3 inline-block text-xs font-semibold text-sky-700 underline decoration-1 underline-offset-4 hover:text-sky-900" href={item.source} target="_blank" rel="noreferrer">View Source</a>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-emerald-100 bg-white/90 p-7 shadow-sm backdrop-blur-[2px] md:p-8">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-xl">🇲🇽</span><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Mexico localization</p></div>
        <h2>Sustainable Investing in Mexico</h2>
        <p className="sectionText">
          Mexico introduced its Sustainable Taxonomy in 2023 to help identify economic activities that contribute to sustainability and environmental protection. GREENInvest uses this context to explore a simpler way to compare financial and environmental information for Mexican public companies.
        </p>
        <a className="mt-3 inline-block text-xs font-semibold text-sky-700 underline decoration-1 underline-offset-4 hover:text-sky-900" href="https://www.gob.mx/shcp/documentos/taxonomia-sostenible-de-mexico" target="_blank" rel="noreferrer">Source: Secretaría de Hacienda y Crédito Público</a>
      </section>

      <section className="mt-10 rounded-3xl border border-emerald-100 bg-white/90 p-7 shadow-sm backdrop-blur-[2px] md:p-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Market research</p><h2>8 Competitors &amp; Substitutes</h2></div>
          <span className="self-start rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-800">8 researched platforms</span>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {competitors.map((item) => (
            <article className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5" key={item.name}>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{item.type}</p>
              <h3 className="mt-1 text-lg font-bold text-emerald-900">{item.name}</h3>
              <p>{item.fact}</p>
              <p><strong>GREENInvest difference:</strong> {item.gap}</p>
              <a className="mt-3 inline-block text-xs font-semibold text-sky-700 underline decoration-1 underline-offset-4 hover:text-sky-900" href={item.source} target="_blank" rel="noreferrer">View Source</a>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-emerald-100 bg-white/90 p-7 shadow-sm backdrop-blur-[2px] md:p-8">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-xl">▦</span><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Comparison</p></div>
        <h2>Competitor Comparison Table</h2>
        <p className="mt-2 text-sm text-slate-600">Search by platform or keyword, or use the category filter. Clear the search box to see every platform in the selected category.</p>\n        <div className="my-4 grid gap-3 md:grid-cols-[1fr_240px]">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search competitor or keyword" aria-label="Search competitors" className="rounded-xl border border-emerald-200 px-4 py-3" />
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} aria-label="Filter by type" className="rounded-xl border border-emerald-200 bg-white px-4 py-3">
            {types.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left">
<thead className="bg-emerald-800 text-white"><tr><th className="border-2 border-white/60 px-4 py-3">Platform</th><th className="border-2 border-white/60 px-4 py-3">Type</th><th className="border-2 border-white/60 px-4 py-3">Key feature</th><th className="border-2 border-white/60 px-4 py-3">Overlap with GREENInvest</th></tr></thead>
<tbody>{filteredCompetitors.map((item, index) => (<tr className={index % 2 === 0 ? "bg-white" : "bg-emerald-50/60"} key={item.name}><td className="border-2 border-slate-200 px-4 py-4 font-bold text-emerald-900">{item.name}</td><td className="border-2 border-slate-200 px-4 py-4"><span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-bold text-teal-800">{item.type}</span></td><td className="border-2 border-slate-200 px-4 py-4 text-slate-700">{item.fact}</td><td className="border-2 border-slate-200 px-4 py-4"><span className={"inline-flex rounded-full px-3 py-1 text-xs font-bold " + (item.risk === "Low" ? "bg-emerald-100 text-emerald-800" : item.risk === "Medium" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800")}>{item.risk}</span></td></tr>))}</tbody>
</table>
          {filteredCompetitors.length === 0 && <p className="emptyState">No competitors match this search and filter.</p>}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-emerald-100 bg-white/90 p-7 shadow-sm backdrop-blur-[2px] md:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Risk map</p>
        <h2>Competitive Risk Map</h2>
        <p className="sectionText">A simple project-level view of how directly each researched platform overlaps with GREENInvest's planned research experience.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["Low", "Medium", "High"].map((level) => {
            const tone = level === "Low" ? "border-emerald-200 bg-emerald-50 text-emerald-900" : level === "Medium" ? "border-amber-200 bg-amber-50 text-amber-900" : "border-rose-200 bg-rose-50 text-rose-900";
            const dot = level === "Low" ? "bg-emerald-500" : level === "Medium" ? "bg-amber-500" : "bg-rose-500";
            return (
              <div className={"rounded-2xl border-2 p-6 " + tone} key={level}>
                <div className="mb-4 flex items-center gap-3">
                  <span className={"h-3 w-3 rounded-full " + dot}></span>
                  <strong className="text-xl">{level} Overlap</strong>
                </div>
                <p className="mb-3 text-sm font-bold">{level === "Low" ? "Mostly different from GREENInvest" : level === "Medium" ? "Some similar features to GREENInvest" : "Several features similar to GREENInvest"}</p>\n                <p className="text-sm font-medium leading-6">{competitors.filter((item) => item.risk === level).map((item) => item.name).join(" · ")}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-emerald-100 bg-white/90 p-7 shadow-sm backdrop-blur-[2px] md:p-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Saved research</p><h2>Saved Results</h2></div>
          <button className="self-start rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-emerald-800 active:bg-emerald-950" type="button" onClick={saveResearch}>Save Research</button>
        </div>
        <p className="sectionText">{saveStatus || "Save the current Week 2 research summary to Supabase."}</p>
        <div className="mt-4 grid gap-3">
          {savedResearch.map((item) => (
            <article className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5" key={item.id}>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{new Date(item.created_at).toLocaleDateString()}</p>
              <h3>{item.research_query}</h3>
              <p>{item.research_summary}</p>
            </article>
          ))}
          {savedResearch.length === 0 && <p className="sectionText">No saved research yet.</p>}
        </div>
      </section>
      </div>
    </main>
  );
}
