"use client";

import Link from "next/link";
import { useState } from "react";

const tour = [
  {
    number: "01", title: "Explore company information", route: "/", label: "Open company explorer",
    description: "Search a listed company to review financial performance and available environmental information. Missing data is explicitly identified.",
    action: "Choose a company and review its financial and environmental results.",
  },
  {
    number: "02", title: "Understand the venture", route: "/core", label: "Explore Core",
    description: "See how GREENInvest turns its educational product idea into a structured, reviewable core statement.",
    action: "Generate a Core output and review it before saving.",
  },
  {
    number: "03", title: "Review research and planning", route: "/research", label: "Explore Research",
    description: "Explore market alternatives, then visit Product and Pricing to understand the product assumptions.",
    action: "Compare existing research examples and try the pricing simulator.",
  },
  {
    number: "04", title: "Learn with guardrails", route: "/chat", label: "Open educational chat",
    description: "Answer three guided questions, review available company context and complete the human checkpoint. The assistant is rule-based, not live AI.",
    action: "Try an educational ESG question; do not expect a buy/sell recommendation.",
  },
  {
    number: "05", title: "Review saved results", route: "/dashboard", label: "View dashboard",
    description: "Review saved Core, Research and Pricing outputs available under existing Supabase policies.",
    action: "Check the recent records and confirm data or a clear empty/error state appears.",
  },
];

const agentStages = [
  { title: "User input", detail: "Company, idea, research topic, or chat selections" },
  { title: "Existing logic", detail: "Stock / environment APIs and transparent rules" },
  { title: "Information output", detail: "Financial context, ESG indicators and educational guidance" },
  { title: "Human checkpoint", detail: "Review sources, limits, and decisions; no trading advice" },
];

export default function DemoPage() {
  const [active, setActive] = useState(0);
  const selected = tour[active];

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white px-5 py-10 text-emerald-950">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-700 p-8 text-white shadow-xl sm:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-lime-300">Week 6 · Integrated Venture</p>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Explore GREENInvest in one guided tour.</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-emerald-50">
            Learn how the existing tools work together to connect company financial information,
            environmental context and responsible educational decisions.
          </p>
          <a href="#guided-tour" className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-emerald-900 hover:bg-emerald-50">Start guided tour ↓</a>
          <p className="mt-4 text-sm text-emerald-100">Educational demonstration · No live AI advisor · No buy or sell recommendations</p>
        </section>

        <section id="guided-tour" aria-labelledby="tour-title" className="mt-10 scroll-mt-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Step-by-step</p>
              <h2 id="tour-title" className="mt-2 text-3xl font-extrabold">Guided walkthrough</h2>
            </div>
            <p aria-live="polite" className="text-sm font-semibold text-slate-600">Step {active + 1} of {tour.length}</p>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-5" aria-label="Choose a walkthrough step">
            {tour.map((step, index) => (
              <button key={step.number} type="button" onClick={() => setActive(index)} aria-pressed={active === index}
                className={`rounded-xl border px-3 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${active === index ? "border-emerald-800 bg-emerald-800 text-white" : "border-emerald-100 bg-white text-emerald-900 hover:bg-emerald-50"}`}>
                <span className="block text-xs opacity-75">{step.number}</span>{step.title}
              </button>
            ))}
          </div>
          <article className="mt-5 rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm sm:p-9">
            <p className="text-sm font-bold text-emerald-700">GUIDED STEP {selected.number}</p>
            <h3 className="mt-2 text-2xl font-bold">{selected.title}</h3>
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">{selected.description}</p>
            <p className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-950"><strong>Try it:</strong> {selected.action}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href={selected.route} className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800">{selected.label} ↗</Link>
              <button type="button" onClick={() => setActive((value) => (value + 1) % tour.length)} className="rounded-xl border border-emerald-200 px-5 py-3 text-sm font-bold text-emerald-900 hover:bg-emerald-50">
                {active === tour.length - 1 ? "Restart tour" : "Next step →"}
              </button>
            </div>
          </article>
        </section>

        <section className="mt-12 rounded-3xl border border-emerald-100 bg-white p-7 sm:p-9" aria-labelledby="map-title">
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">System overview</p>
          <h2 id="map-title" className="mt-2 text-3xl font-extrabold">Agent Map</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            GREENInvest combines small, existing automated workflows. It does not use an autonomous live AI agent.
          </p>
          <ol className="mt-6 grid gap-3 md:grid-cols-4">
            {agentStages.map((stage, index) => (
              <li key={stage.title} className="relative rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <span className="text-xs font-extrabold text-emerald-700">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-lg font-bold">{stage.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{stage.detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm leading-6 text-slate-600">
            Saved educational results may be stored in Supabase. Access is limited by each table&apos;s existing policies.
            The visitor remains responsible for interpreting results; no automated investment decision is made.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-emerald-900 p-7 text-white">
            <h2 className="text-xl font-bold">See what has been saved</h2>
            <p className="mt-3 leading-7 text-emerald-100">Browse recent educational outputs without revealing private chat histories.</p>
            <Link href="/dashboard" className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-900">View Dashboard ↗</Link>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-7">
            <h2 className="text-xl font-bold">Understand how it was built</h2>
            <p className="mt-3 leading-7 text-slate-600">Review original prompts, build notes and decisions from previous modules.</p>
            <Link href="/docs" className="mt-5 inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white">View Documentation ↗</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
