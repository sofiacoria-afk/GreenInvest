import Link from "next/link";

const segments = [
  {
    title: "Students & Individual Investors",
    text: "Explore Mexican companies and understand financial and environmental information in one place.",
  },
  {
    title: "Universities & Educational Institutions",
    text: "Use GREENInvest as a simple learning tool for finance, sustainability, and investment courses.",
  },
];

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-5 py-12 text-emerald-950">
      <section className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="font-semibold uppercase tracking-[0.25em] text-emerald-600">
            Week 3 · Product Architecture
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">GREENInvest Product</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Choose the level of GREENInvest that fits your needs and see how the platform can support sustainable investment learning and analysis.
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-bold">Who is GREENInvest for?</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {segments.map((segment) => (
              <article key={segment.title} className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-lg shadow-emerald-100/50">
                <h3 className="text-xl font-bold">{segment.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{segment.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl bg-emerald-900 p-7 text-white">
          <h2 className="text-2xl font-bold">Week 3 Product Goal</h2>
          <p className="mt-3 max-w-3xl leading-7 text-emerald-100">
            GREENInvest now organizes its features into product tiers and adds a pricing simulator to test possible customer and revenue scenarios.
          </p>
          <Link href="/pricing" className="mt-6 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-emerald-900">
            Explore Pricing Simulator
          </Link>
        </section>
      </section>
    </main>
  );
}
