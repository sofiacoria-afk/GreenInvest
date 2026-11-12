"use client";

import Link from "next/link";
import ImpactAndRoadmap from "./ImpactAndRoadmap";
import { useState } from "react";

const tour = [
  {
    number: "01", title: "Explore companies", route: "/", label: "Open company explorer",
    description: "Look up a listed company and explore the financial performance and environmental information that GREENInvest has available.",
    action: "Choose a company and review its stock performance, emissions context and any missing-data notices.",
  },
  {
    number: "02", title: "Core idea", route: "/core", label: "Open Core",
    description: "Discover how the initial GREENInvest idea was organized into a clear problem, target user, value and next step.",
    action: "Generate a structured Core output, review it and save it if you wish.",
  },
  {
    number: "03", title: "Research", route: "/research", label: "Open Research",
    description: "Explore competing investment and sustainability platforms and learn what makes GREENInvest different.",
    action: "Review the competitor comparison, sources and overlap map.",
  },
  {
    number: "04", title: "Product", route: "/product", label: "Open Product",
    description: "Learn who GREENInvest is for and what its planned products and services offer.",
    action: "Review the product features and target users.",
  },
  {
    number: "05", title: "Pricing", route: "/pricing", label: "Try Pricing",
    description: "Use the pricing simulator to explore how different customer and price assumptions affect projected revenue.",
    action: "Switch between Conservative and Growth scenarios, edit an assumption and compare the results.",
  },
  {
    number: "06", title: "Marketing", route: "/marketing", label: "Explore Marketing",
    description: "See how GREENInvest explains its value through marketing messages, campaign ideas and content.",
    action: "Explore the proposed posts, scripts, campaign calendar and saved assets.",
  },
  {
    number: "07", title: "Educational chat", route: "/chat", label: "Open Chat",
    description: "Answer guided questions and learn about financial and ESG concepts. The chatbot is rule-based, not a live AI investment advisor.",
    action: "Try the guided questions and check that direct stock recommendations are refused.",
  },
  {
    number: "08", title: "Saved results", route: "/dashboard", label: "View Dashboard",
    description: "See recent Core, Research and Pricing records that are available under the existing Supabase permissions.",
    action: "Check saved results or a clear empty/error message, then use Back to return to this tour.",
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
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">GREENInvest Demo: See How the Platform Works</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-emerald-50">
            Take a step-by-step tour of GREENInvest. Visit the tools developed throughout the course,
            explore financial and environmental information, and see how saved results and educational guidance work together.
          </p>
          <a href="#guided-tour" className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-emerald-900 hover:bg-emerald-50">Start guided tour ↓</a>
          <p className="mt-4 text-sm text-emerald-100">Educational demonstration · No live AI advisor · No buy or sell recommendations</p>
        </section>

        <section id="guided-tour" aria-labelledby="tour-title" className="mt-10 scroll-mt-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Step-by-step</p>
              <h2 id="tour-title" className="mt-2 text-3xl font-extrabold">Guided walkthrough</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                This is a step-by-step guide to using GREENInvest. It is not a new tool; it brings together
                all the features developed throughout the course so you can explore how they work.
              </p>
            </div>
            <p aria-live="polite" className="text-sm font-semibold text-slate-600">Step {active + 1} of {tour.length}</p>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-label="Choose a walkthrough step">
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
          <ol className="mt-6 flex flex-col gap-3 md:flex-row md:items-stretch" aria-label="Agent workflow from input to human review">
            {agentStages.map((stage, index) => (
              <li key={stage.title} className="flex min-w-0 flex-1 flex-col items-center gap-2 md:flex-row">
                <div className="w-full flex-1 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:h-full">
                  <span className="text-xs font-extrabold text-emerald-700">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-bold">{stage.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{stage.detail}</p>
                </div>
                {index < agentStages.length - 1 && (
                  <span aria-hidden="true" className="shrink-0 text-2xl font-bold text-emerald-700">
                    <span className="md:hidden">↓</span><span className="hidden md:inline">→</span>
                  </span>
                )}
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
            <p className="mt-3 leading-7 text-slate-600">See what was built each week, the prompt focus and the main development decisions.</p>
            <Link href="/docs" className="mt-5 inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white">View Documentation ↗</Link>
          </div>
        </section>
        <ImpactAndRoadmap />
      </div>
    </main>
  );
}
