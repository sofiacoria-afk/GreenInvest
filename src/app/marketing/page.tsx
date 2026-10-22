import Link from "next/link";
import MarketingWorkspace from "./MarketingWorkspace";

const benefits = [
  { number: "01", title: "Understand financial performance", detail: "Explore stock prices and returns with explanations that are easier to follow.", color: "bg-emerald-50 border-emerald-200" },
  { number: "02", title: "Explore environmental information", detail: "Review reported emissions trends and understand what the available data means.", color: "bg-sky-50 border-sky-200" },
  { number: "03", title: "Research in one place", detail: "Combine financial and environmental context without switching between multiple sources.", color: "bg-amber-50 border-amber-200" },
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 px-5 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-100 pb-5">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-emerald-900">GREEN<span className="text-emerald-600">Invest</span></Link>
          <div className="flex flex-wrap gap-5 text-sm font-semibold text-emerald-900">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/research" className="hover:underline">Research</Link>
            <Link href="/core" className="hover:underline">Core</Link>
            <Link href="/product" className="hover:underline">Product</Link>
          </div>
        </nav>

        <header className="mt-12 rounded-3xl bg-emerald-950 px-7 py-12 text-white shadow-lg md:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">GREENInvest · Week 4 Marketing Engine</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">Financial information meets environmental awareness.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-100">
            GREENInvest is an educational platform that helps beginners explore how public companies perform financially and what their environmental reports show. Our goal is to make investment research clearer and more accessible.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="rounded-xl bg-lime-300 px-6 py-3 font-bold text-emerald-950 hover:bg-lime-200">Explore GREENInvest →</Link>
            <a href="#content-library" className="rounded-xl border border-white/50 px-6 py-3 font-semibold text-white hover:bg-white/10">See marketing content ↓</a>
          </div>
        </header>

        <section className="mt-14" aria-labelledby="benefits-heading">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Why GREENInvest?</p>
          <h2 id="benefits-heading" className="mt-2 text-3xl font-extrabold">Three reasons to use the platform</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article key={benefit.number} className={`rounded-2xl border p-6 shadow-sm ${benefit.color}`}>
                <span className="text-sm font-black text-emerald-700">{benefit.number}</span>
                <h3 className="mt-3 text-xl font-bold">{benefit.title}</h3>
                <p className="mt-3 leading-7 text-slate-700">{benefit.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="strategy-heading">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Our marketing strategy</p>
          <h2 id="strategy-heading" className="mt-2 text-3xl font-extrabold">The brand and the person we want to reach</h2>
          <p className="mt-3 max-w-3xl text-slate-600">These two elements guide the messages, social media posts and campaign materials below.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7">
              <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Identity</p>
              <h3 className="mt-2 text-2xl font-extrabold">Brand system</h3>
              <p className="mt-3 leading-7 text-slate-700">GREENInvest makes financial and environmental research easier to understand. The brand uses clear language, trustworthy information and a calm green visual identity.</p>
              <div className="mt-5 flex items-center gap-3" aria-label="Brand colors: dark green, emerald, lime and white">
                <span className="h-9 w-9 rounded-full bg-emerald-950 ring-2 ring-white" /><span className="h-9 w-9 rounded-full bg-emerald-600 ring-2 ring-white" /><span className="h-9 w-9 rounded-full bg-lime-300 ring-2 ring-white" /><span className="h-9 w-9 rounded-full border border-slate-300 bg-white" />
                <span className="ml-2 text-sm font-medium text-slate-600">Green · Lime · White</span>
              </div>
            </article>
            <article className="rounded-2xl border border-sky-200 bg-sky-50 p-7">
              <p className="text-sm font-bold uppercase tracking-wider text-sky-700">Our audience</p>
              <h3 className="mt-2 text-2xl font-extrabold">Person</h3>
              <p className="mt-3 leading-7 text-slate-700"><strong>Who:</strong> Students and beginner investors interested in Mexican public companies and sustainability.</p>
              <p className="mt-3 leading-7 text-slate-700"><strong>Need:</strong> Simple explanations and information in one place, without requiring expert financial knowledge.</p>
              <p className="mt-3 leading-7 text-slate-700"><strong>Goal:</strong> Research companies with more confidence and awareness.</p>
            </article>
          </div>
        </section>

        <section id="content-library" className="scroll-mt-8" aria-label="Marketing content and testing workspace">
          <MarketingWorkspace />
        </section>

        <p className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">GREENInvest is an educational tool, not financial advice. Environmental trends do not represent a complete sustainability rating.</p>
      </div>
    </main>
  );
}
