import Link from "next/link";

const segments = [
  { title: "Students & Individual Investors", text: "Explore Mexican companies and understand financial and environmental information in one place." },
  { title: "Universities & Educational Institutions", text: "Use GREENInvest as a learning tool for finance, sustainability, and investment courses." },
];

const plans = [
  { name: "Free", price: "$0", description: "Basic access to explore GREENInvest and public company information." },
  { name: "Investor", price: "$149", description: "More tools for students and individual investors who want deeper comparisons." },
  { name: "Education", price: "$1,499", description: "Learning support for universities, professors, and students." },
];

const features = [
  ["View BMV companies", true, true, true],
  ["Financial performance", true, true, true],
  ["Environmental indicators", true, true, true],
  ["Basic company comparison", true, true, true],
  ["Advanced comparisons", false, true, true],
  ["Save analyses", false, true, true],
  ["Research dashboard", false, true, true],
  ["Educational explanations", false, false, true],
  ["Download educational PDF", false, false, true],
  ["Classroom learning support", false, false, true],
] as const;

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-5 py-12 text-emerald-950">
      <section className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="font-semibold uppercase tracking-[0.25em] text-emerald-600">Week 3 · Product Architecture</p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">GREENInvest Product</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Choose the level of GREENInvest that fits your needs. Pricing shown below is an academic assumption for this Week 3 prototype.</p>
        </header>

        <section>
          <h2 className="text-2xl font-bold">Customer Segments</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {segments.map((segment) => (
              <article key={segment.title} className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-lg shadow-emerald-100/50">
                <h3 className="text-xl font-bold">{segment.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{segment.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">Pricing Tiers</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-lg shadow-emerald-100/50">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-4 text-4xl font-bold text-emerald-700">{plan.price}<span className="text-sm font-normal text-slate-500"> MXN/month</span></p>
                <p className="mt-4 leading-7 text-slate-600">{plan.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-lg shadow-emerald-100/50">
          <div className="p-7"><h2 className="text-2xl font-bold">Product Feature Map</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="bg-emerald-900 text-white"><tr><th className="p-4">Feature</th><th className="p-4 text-center">Free</th><th className="p-4 text-center">Investor</th><th className="p-4 text-center">Education</th></tr></thead>
              <tbody>
                {features.map(([feature, free, investor, education]) => (
                  <tr key={feature} className="border-t border-emerald-100">
                    <td className="p-4 font-medium">{feature}</td>
                    {[free, investor, education].map((included, index) => <td key={index} className="p-4 text-center">{included ? "✓" : "—"}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 rounded-3xl bg-emerald-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">Education Plan</p>
          <h2 className="mt-2 text-3xl font-bold">Learn with GREENInvest</h2>
          <p className="mt-4 max-w-3xl leading-7 text-emerald-100">The Education plan explains financial and environmental information using simple language. Students can learn what stock return, carbon emissions, and combined financial and environmental analysis mean instead of only seeing numbers.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5"><h3 className="font-bold">Stock Return</h3><p className="mt-2 text-sm text-emerald-100">Shows how much a stock increased or decreased during a selected period.</p></div>
            <div className="rounded-2xl bg-white/10 p-5"><h3 className="font-bold">Carbon Emissions</h3><p className="mt-2 text-sm text-emerald-100">Helps users understand greenhouse gas emissions reported by a company.</p></div>
            <div className="rounded-2xl bg-white/10 p-5"><h3 className="font-bold">Combined Analysis</h3><p className="mt-2 text-sm text-emerald-100">Connects financial performance with environmental information for learning.</p></div>
          </div>
          <p className="mt-5 text-sm text-emerald-200">Education also includes an educational PDF option so users can save the main concepts and review them later.</p>
        </section>

        <div className="mt-10 text-center">
          <Link href="/pricing" className="inline-block rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">Explore Pricing Simulator</Link>
        </div>
      </section>
    </main>
  );
}
