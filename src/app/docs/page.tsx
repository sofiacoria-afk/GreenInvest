import Link from "next/link";

const resources = [
  {
    title: "Core Prompt Library",
    week: "Week 1",
    description: "Exact Core extractor prompt, inputs, outputs, and limits of the simulated generator.",
    path: "docs/core-prompt-library.md",
  },
  {
    title: "Core Planning & Testing",
    week: "Week 1",
    description: "Original planning notes and test documentation.",
    path: "docs/week1-core-plan.md",
  },
  {
    title: "Chat Build Plan",
    week: "Week 5",
    description: "Acceptance criteria, architecture, test plan, and educational guardrails.",
    path: "docs/week5-chat-plan.md",
  },
  {
    title: "Chat Iteration Log",
    week: "Week 5",
    description: "Documented UI and safety changes; notes distinguish completed work from remaining tests.",
    path: "docs/week5-chat-iteration.md",
  },
];

const repo = "https://github.com/sofiacoria-afk/GreenInvest";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-5 py-12 text-emerald-950">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Week 6 · Documentation</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Prompt Library & Build Logs</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Explore the documented prompts, planning decisions, and development history behind GREENInvest.
          This page links to original repository records instead of claiming that every generator uses live AI.
        </p>

        <section className="mt-9 grid gap-5 md:grid-cols-2" aria-label="Documentation library">
          {resources.map((resource) => (
            <article key={resource.path} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">{resource.week}</p>
              <h2 className="mt-2 text-xl font-bold">{resource.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{resource.description}</p>
              <a
                href={`${repo}/blob/main/${resource.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
              >
                View source document ↗
              </a>
            </article>
          ))}
        </section>

        <section className="mt-9 rounded-2xl bg-emerald-900 p-7 text-white">
          <h2 className="text-2xl font-bold">Build history</h2>
          <p className="mt-3 max-w-3xl text-emerald-100">
            GitHub records the actual changes and their dates. Week 6 is being developed on a separate branch
            so existing features can be reviewed before merging.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={`${repo}/commits/week6-integrated-venture/`} target="_blank" rel="noopener noreferrer"
              className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-emerald-900 hover:bg-emerald-50">Week 6 commits ↗</a>
            <a href={`${repo}/tree/week6-integrated-venture`} target="_blank" rel="noopener noreferrer"
              className="rounded-lg border border-white/40 px-4 py-2 text-sm font-bold text-white hover:bg-white/10">Week 6 source ↗</a>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
          <h2 className="text-lg font-bold">How automation is used</h2>
          <p className="mt-2 text-sm leading-6">
            GREENInvest currently uses educational rule-based logic for its Core generator and chat assistant.
            These are simulated, not live large language model outputs. The platform does not provide personalized
            financial advice. Week 6 user-test results will be added only after the tests take place.
          </p>
        </section>

        <p className="mt-8 text-sm text-slate-600">
          <Link href="/" className="font-semibold text-emerald-800 underline underline-offset-4">Return to GREENInvest</Link>
        </p>
      </div>
    </main>
  );
}
