import Link from "next/link";

const modules = [
  {
    week: "Week 1",
    title: "Core Agent",
    purpose: "Organize an early investment-product idea into a clear problem, user, value proposition and next step.",
    features: "Input form, structured rule-based Core output, Supabase save and a recent-records preview.",
    promptFocus: "Build a small, testable Core extractor with clearly labeled simulated outputs and a save action.",
    buildNotes: "Reused the existing Next.js project and database instead of creating a separate application.",
  },
  {
    week: "Week 2",
    title: "Research Agent",
    purpose: "Help users understand competing sustainability-investment platforms and GREENInvest's position.",
    features: "Research input, competitor benchmarks, comparison table, Competitor Overlap Map and saved research.",
    promptFocus: "Create an understandable market-research experience with comparisons, cited sources and saved outputs.",
    buildNotes: "Prioritized readable competitor differences and source transparency over a complex risk visualization.",
  },
  {
    week: "Week 3",
    title: "Product & Pricing",
    purpose: "Define GREENInvest's target users, product offering and a simple revenue model.",
    features: "Product overview, Free / Investor / Education tiers, editable assumptions and Conservative / Growth scenarios.",
    promptFocus: "Build a transparent pricing simulator that recalculates monthly and annual scenario revenue.",
    buildNotes: "Used clearly labeled hypothetical pricing assumptions rather than suggesting actual sales or validated demand.",
  },
  {
    week: "Week 4",
    title: "Marketing",
    purpose: "Communicate GREENInvest's value to students, individual investors and educational institutions.",
    features: "Landing-page content, target persona, campaign posts, video scripts, calendar, A/B messaging and saved assets.",
    promptFocus: "Make reusable campaign material and a simple way to compare messaging and save marketing work.",
    buildNotes: "Improved readability and placed save feedback near the action, including clearer error messages.",
  },
  {
    week: "Week 5",
    title: "Educational Chatbot",
    purpose: "Guide first-time visitors through financial and ESG concepts without offering investment advice.",
    features: "Three guided questions, existing company data integration, rule-based responses, guardrail, checkpoint and feedback.",
    promptFocus: "Build a free educational assistant with transparent simulated logic, human confirmation and protected saves.",
    buildNotes: "Reused stock and emissions data. Improved the order of results and checkpoint while preserving safety limits.",
  },
  {
    week: "Week 6",
    title: "Integrated Venture",
    purpose: "Connect the previous modules into one navigable venture and demonstrate its impact and viability.",
    features: "Shared navigation, saved-results dashboard, this documentation library, guided demo, Agent Map and V2 roadmap.",
    promptFocus: "Integrate existing features without replacing their logic; add a guided walkthrough and transparent evaluation.",
    buildNotes: "Built new pages on a separate branch. Five external user tests and a full-site regression test still need recorded results.",
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-5 py-12 text-emerald-950">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Week 6 · Documentation</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">How GREENInvest Was Built</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          This page shows how GREENInvest grew over six weeks. Each section explains
          what we built, what we asked the coding tools to help with, and the main
          decisions or changes made along the way.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
          The prompt descriptions are short summaries, not exact copies of past prompts.
          Test results are only counted when they have actually been checked.
        </p>

        <section className="mt-9 grid gap-5 md:grid-cols-2" aria-label="Six-week module documentation">
          {modules.map((module) => (
            <article key={module.week} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">{module.week}</p>
              <h2 className="mt-2 text-2xl font-bold">{module.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">{module.purpose}</p>
              <dl className="mt-5 space-y-4 text-sm leading-6">
                <div>
                  <dt className="font-bold text-emerald-900">Features developed</dt>
                  <dd className="mt-1 text-slate-600">{module.features}</dd>
                </div>
                <div>
                  <dt className="font-bold text-emerald-900">Prompt library · Focus</dt>
                  <dd className="mt-1 text-slate-600">{module.promptFocus}</dd>
                </div>
                <div>
                  <dt className="font-bold text-emerald-900">Build log · Decision</dt>
                  <dd className="mt-1 text-slate-600">{module.buildNotes}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>

        <section className="mt-9 rounded-2xl bg-emerald-900 p-7 text-white">
          <h2 className="text-2xl font-bold">Integrated build history</h2>
          <p className="mt-3 max-w-3xl leading-7 text-emerald-100">
            GREENInvest grew from a Core idea and research workflow into product pricing,
            marketing, an educational chatbot and a unified guided demo. Week 6 adds shared
            navigation and a dashboard without changing previous modules' financial calculations or chat guardrails.
          </p>
          <p className="mt-3 text-sm text-emerald-100">
            The Week 6 changes were prepared in a separate development branch; deployment,
            regression testing and external feedback must be verified independently.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
          <h2 className="text-lg font-bold">Responsible automation</h2>
          <p className="mt-2 text-sm leading-6">
            GREENInvest uses educational rule-based logic for its Core generator and guided chat.
            These are not live large language model outputs. Financial and environmental information
            may be incomplete or delayed, and no personalized buy/sell advice is offered.
          </p>
        </section>
        <p className="mt-8 text-sm text-slate-600">
          <Link href="/" className="font-semibold text-emerald-800 underline underline-offset-4">Return to GREENInvest</Link>
        </p>
      </div>
    </main>
  );
}
