import Link from "next/link";

const impact = [
  { title: "Potential benefit", detail: "Helps students and beginner users explore company financial performance and reported environmental context in one place." },
  { title: "Risk of misunderstanding", detail: "Historical returns and emissions are not forecasts or complete ESG ratings. Labels, source context and missing-data notices are essential." },
  { title: "Financial safety", detail: "The chat uses rule-based educational guidance and refuses direct buy/sell recommendations. Human judgment remains necessary." },
  { title: "Privacy and access", detail: "Public records follow existing read policies. Per-visitor chat sessions and marketing assets are not displayed on the public dashboard." },
];

const roadmap = [
  {
    phase: "V2 · Mexico",
    title: "Expand to the full Mexican stock market",
    detail: "Gradually add more companies listed on the Bolsa Mexicana de Valores, aiming for full coverage as reliable financial and environmental data become available.",
  },
  {
    phase: "V2 · International",
    title: "Explore foreign stock markets",
    detail: "Extend GREENInvest to companies listed in other countries, with clear currency, reporting-year and data-comparability explanations.",
  },
  {
    phase: "Future vision · Investing",
    title: "Explain how investing works",
    detail: "Build a beginner-friendly guide to investing, including step-by-step explanations of accounts, orders and risks. Any future real trading would require appropriate legal and regulatory safeguards and qualified partners; it is not available today.",
  },
];

export default function ImpactAndRoadmap() {
  return (
    <>
      <section aria-labelledby="impact-title" className="mt-12 rounded-3xl border border-emerald-100 bg-white p-7 sm:p-9">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Impact & viability</p>
        <h2 id="impact-title" className="mt-2 text-3xl font-extrabold">Practical Impact Check</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
          GREENInvest is an educational prototype. These are practical design considerations, not measured impact outcomes.
          The platform still requires real user testing and verification of live data availability.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {impact.map((item) => (
            <article key={item.title} className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          <strong>Viability checkpoint:</strong> The current prototype uses existing Next.js pages, Supabase data,
          GitHub and Vercel. Future growth depends on data reliability, usability and the cost of maintaining trustworthy sources;
          projected pricing revenue is hypothetical, not validated customer demand.
        </p>
      </section>

      <section aria-labelledby="testing-title" className="mt-12 rounded-3xl border border-emerald-100 bg-white p-7 sm:p-9">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Validation plan</p>
        <h2 id="testing-title" className="mt-2 text-3xl font-extrabold">Testing Summary</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Five external user tests and a full-site regression test are required before final submission.
          This section shows the plan, not completed or invented test results.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-emerald-50 p-5"><p className="text-sm font-bold">External user tests</p><p className="mt-2 text-2xl font-extrabold">5 required</p><p className="mt-1 text-xs text-slate-600">Actual feedback pending</p></div>
          <div className="rounded-xl bg-emerald-50 p-5"><p className="text-sm font-bold">Full-site regression</p><p className="mt-2 text-2xl font-extrabold">1 required</p><p className="mt-1 text-xs text-slate-600">Verification pending</p></div>
          <div className="rounded-xl bg-emerald-50 p-5"><p className="text-sm font-bold">Iteration evidence</p><p className="mt-2 text-lg font-extrabold">Test → Finding → Change → Retest</p><p className="mt-1 text-xs text-slate-600">Record real observations</p></div>
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-700">
          Participants should attempt the guided tour, company explorer, saved results and educational chat.
          Note exact observations and any improvements with screenshots, commit links and a retest.
        </p>
        <Link href="/docs" className="mt-5 inline-flex rounded-lg border border-emerald-200 px-4 py-2 text-sm font-bold text-emerald-900 hover:bg-emerald-50">
          Open documentation ↗
        </Link>
      </section>

      <section aria-labelledby="roadmap-title" className="mt-12 rounded-3xl bg-emerald-950 p-7 text-white sm:p-9">
        <p className="text-sm font-bold uppercase tracking-widest text-lime-300">Next steps</p>
        <h2 id="roadmap-title" className="mt-2 text-3xl font-extrabold">Version 2 Roadmap</h2>
        <p className="mt-3 max-w-3xl leading-7 text-emerald-100">These are future proposals, not features already implemented.</p>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {roadmap.map((item) => (
            <li key={item.phase} className="rounded-2xl border border-white/20 bg-white/10 p-5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-lime-300">{item.phase}</p>
              <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-100">{item.detail}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
