import Link from "next/link";

const values = [
  { title: "Clear financial information", detail: "Explore stock performance with simple explanations." },
  { title: "Environmental perspective", detail: "Review emissions trends and available sustainability data." },
  { title: "More informed research", detail: "Compare information in one educational platform." },
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-5 py-10 text-emerald-950">
      <div className="mx-auto max-w-6xl">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold tracking-tight">GREENInvest</Link>
          <div className="flex gap-4 text-sm font-semibold">
            <Link href="/" className="hover:text-emerald-700">Home</Link>
            <Link href="/research" className="hover:text-emerald-700">Research</Link>
            <Link href="/core" className="hover:text-emerald-700">Core</Link>
          </div>
        </nav>

        <header className="mt-16 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Week 4 · Marketing Engine + Content System</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Explore investments with financial and environmental context.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            GREENInvest helps people discover financial performance and available environmental information about public companies, all in one educational website.
          </p>
          <Link href="/" className="mt-7 inline-block rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800">Explore GREENInvest</Link>
        </header>

        <section className="mt-14 grid gap-5 md:grid-cols-3" aria-label="Product benefits">
          {values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">{value.title}</h2>
              <p className="mt-3 text-slate-600">{value.detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-12 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-emerald-100 bg-white p-6">
            <h2 className="text-2xl font-bold">Brand system</h2>
            <p className="mt-3 text-slate-600">GREENInvest · Clear, accessible and responsible investment research. Primary colors: emerald green, white and soft gray.</p>
          </article>
          <article className="rounded-2xl border border-emerald-100 bg-white p-6">
            <h2 className="text-2xl font-bold">Target persona</h2>
            <p className="mt-3 text-slate-600">Beginner investors and students interested in understanding Mexican public companies and sustainability data without complicated financial language.</p>
          </article>
        </section>

        <p className="mt-12 text-sm text-slate-500">Educational information only. GREENInvest does not provide investment advice.</p>
      </div>
    </main>
  );
}
