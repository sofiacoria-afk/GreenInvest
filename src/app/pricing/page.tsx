"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type SavedScenario = { id: string; scenario_name: string; scenario_type: string; investor_customers: number; education_customers: number; investor_price: number; education_price: number; monthly_revenue: number; annual_revenue: number; created_at: string; };

type ScenarioType = "Conservative" | "Growth";

const defaults = {
  Conservative: { investorCustomers: 100, educationCustomers: 5 },
  Growth: { investorCustomers: 300, educationCustomers: 15 },
};

export default function PricingPage() {
  const [scenario, setScenario] = useState<ScenarioType>("Conservative");
  const [investorCustomers, setInvestorCustomers] = useState(100);
  const [educationCustomers, setEducationCustomers] = useState(5);
  const [investorPrice, setInvestorPrice] = useState(149);
  const [educationPrice, setEducationPrice] = useState(1499);
  const [scenarioName, setScenarioName] = useState("My Conservative Scenario");
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [saveMessage, setSaveMessage] = useState("");

  function selectScenario(next: ScenarioType) {
    setScenario(next);
    setInvestorCustomers(defaults[next].investorCustomers);
    setEducationCustomers(defaults[next].educationCustomers);
  }

  const monthlyRevenue = useMemo(
    () => investorCustomers * investorPrice + educationCustomers * educationPrice,
    [investorCustomers, investorPrice, educationCustomers, educationPrice]
  );
  const annualRevenue = monthlyRevenue * 12;

  async function loadSavedScenarios() {
    const supabase = getSupabase();
    if (!supabase) { setSaveMessage("Supabase is not configured."); return; }
    const { data, error } = await supabase.from("pricing_scenarios").select("*").order("created_at", { ascending: false }).limit(10);
    if (error) { setSaveMessage("Could not load saved scenarios."); return; }
    setSavedScenarios((data ?? []) as SavedScenario[]);
  }

  useEffect(() => {
    loadSavedScenarios();
  }, []);

  async function saveScenario() {
    const supabase = getSupabase();
    if (!supabase) { setSaveMessage("Supabase is not configured."); return; }
    setSaveMessage("Saving...");
    const { error } = await supabase.from("pricing_scenarios").insert({ scenario_name: scenarioName.trim() || `${scenario} Scenario`, scenario_type: scenario, free_customers: 0, investor_customers: investorCustomers, education_customers: educationCustomers, free_price: 0, investor_price: investorPrice, education_price: educationPrice, monthly_revenue: monthlyRevenue, annual_revenue: annualRevenue });
    if (error) { setSaveMessage("Could not save the scenario."); return; }
    setSaveMessage("Scenario saved successfully.");
    await loadSavedScenarios();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-5 py-12 text-emerald-950">
      <section className="mx-auto max-w-6xl">
        <header>
          <p className="font-semibold uppercase tracking-[0.25em] text-emerald-600">Week 3 · Pricing Simulator</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">Pricing & Revenue Simulator</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Test simple pricing assumptions and see how customer numbers can change GREENInvest monthly and annual revenue.</p>
        </header>

        <div className="mt-8 inline-flex rounded-2xl border border-emerald-200 bg-white p-1">
          {(["Conservative", "Growth"] as ScenarioType[]).map((option) => (
            <button key={option} onClick={() => selectScenario(option)} className={`rounded-xl px-5 py-3 font-semibold transition ${scenario === option ? "bg-emerald-700 text-white" : "text-emerald-800 hover:bg-emerald-50"}`}>{option}</button>
          ))}
        </div>

        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-xl shadow-emerald-100/50">
            <h2 className="text-2xl font-bold">Simulator Inputs</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <NumberInput label="Investor customers" value={investorCustomers} onChange={setInvestorCustomers} />
              <NumberInput label="Investor price (MXN/month)" value={investorPrice} onChange={setInvestorPrice} />
              <NumberInput label="Education customers" value={educationCustomers} onChange={setEducationCustomers} />
              <NumberInput label="Education price (MXN/month)" value={educationPrice} onChange={setEducationPrice} />
            </div>
            <p className="mt-5 text-sm text-slate-500">Prices and customer numbers are academic assumptions and do not represent validated market demand.</p>
          </section>

          <section className="rounded-3xl bg-emerald-900 p-7 text-white shadow-xl">
            <h2 className="text-2xl font-bold">Revenue Result</h2>
            <div className="mt-6 rounded-2xl bg-white/10 p-5"><p className="text-sm text-emerald-200">Monthly Revenue</p><p className="mt-2 text-4xl font-bold">{monthlyRevenue.toLocaleString("en-US")} MXN</p></div>
            <div className="mt-4 rounded-2xl bg-white/10 p-5"><p className="text-sm text-emerald-200">Annual Revenue</p><p className="mt-2 text-4xl font-bold">{annualRevenue.toLocaleString("en-US")} MXN</p></div>
          </section>
        </div>

        <section className="mt-8 rounded-3xl border border-emerald-100 bg-white p-7">
          <h2 className="text-2xl font-bold">Assumptions</h2>
          <div className="mt-5 overflow-x-auto"><table className="w-full text-left"><tbody>
            <Row label="Investor price" value={`${investorPrice.toLocaleString("en-US")} MXN/month`} />
            <Row label="Education price" value={`${educationPrice.toLocaleString("en-US")} MXN/month`} />
            <Row label="Selected scenario" value={scenario} />
            <Row label="Revenue period" value="Monthly / Annual" />
          </tbody></table></div>
        </section>

        <section className="mt-8 rounded-3xl border border-emerald-100 bg-white p-7 shadow-lg shadow-emerald-100/40">
          <h2 className="text-2xl font-bold">Save Pricing Scenario</h2>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input value={scenarioName} onChange={(event) => setScenarioName(event.target.value)} placeholder="Scenario name" className="flex-1 rounded-xl border border-emerald-200 px-4 py-3 outline-none focus:border-emerald-500" />
            <button onClick={saveScenario} className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800">Save Scenario</button>
          </div>
          {saveMessage && <p className="mt-3 text-sm text-slate-600">{saveMessage}</p>}
        </section>
        <section className="mt-8"><h2 className="text-2xl font-bold">Saved Pricing Scenarios</h2>{savedScenarios.length === 0 ? <p className="mt-3 text-slate-500">Saved scenarios will appear here automatically.</p> : <div className="mt-5 grid gap-4 md:grid-cols-2">{savedScenarios.map((item) => <article key={item.id} className="rounded-2xl border border-emerald-100 bg-white p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-bold">{item.scenario_name}</h3><p className="mt-1 text-sm text-emerald-700">{item.scenario_type}</p></div><p className="text-sm text-slate-500">{new Date(item.created_at).toLocaleDateString()}</p></div><p className="mt-4 text-sm text-slate-600">{item.investor_customers} Investor · {item.education_customers} Education</p><p className="mt-2 font-semibold">{Number(item.monthly_revenue).toLocaleString("en-US")} MXN/month</p><p className="text-sm text-slate-600">{Number(item.annual_revenue).toLocaleString("en-US")} MXN/year</p></article>)}</div>}</section>
        <div className="mt-8"><Link href="/product" className="font-semibold text-emerald-700 underline">Back to Product Architecture</Link></div>
      </section>
    </main>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label className="text-sm font-semibold">{label}<input type="number" min="0" value={value === 0 ? "" : value} onChange={(event) => { const next = event.target.value; onChange(next === "" ? 0 : Math.max(0, Number(next))); }} className="mt-2 w-full rounded-xl border border-emerald-200 px-4 py-3 text-base font-normal outline-none focus:border-emerald-500" /></label>;
}

function Row({ label, value }: { label: string; value: string }) {
  return <tr className="border-t border-emerald-100"><td className="p-4 font-semibold">{label}</td><td className="p-4 text-slate-600">{value}</td></tr>;
}
