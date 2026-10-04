"use client";

import Link from "next/link";

const segments = [
  { title: "Students & Individual Investors", text: "Explore Mexican companies and understand financial and environmental information in one place." },
  { title: "Universities & Educational Institutions", text: "Use GREENInvest as a learning tool for finance, sustainability, and investment courses." },
];

const plans = [
  { name: "Free", price: "$0", description: "Basic access to explore GREENInvest and public company information." },
  { name: "Investor", price: "$149", badge: "Most Popular", description: "More tools for students and individual investors who want deeper comparisons." },
  { name: "Education", price: "$1,499", badge: "For Universities", description: "Learning support for universities, professors, and students." },
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
  ["Generate education guide", false, false, true],
  ["Classroom learning support", false, false, true],
] as const;

function downloadEducationPdf() {
  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>GREENInvest Education Guide</title>
<style>
@page{margin:16mm}
*{box-sizing:border-box}
body{font-family:Arial,sans-serif;max-width:820px;margin:0 auto;color:#163c2b;line-height:1.55;background:#fff}
.hero{background:#065f46;color:white;padding:34px;border-radius:18px;margin-bottom:24px}
.eyebrow{font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#a7f3d0;font-weight:bold}
h1{font-size:34px;margin:8px 0 6px}h2{color:#047857;margin:0 0 10px;font-size:22px}
.subtitle{color:#d1fae5;margin:0}
.learn{background:#ecfdf5;border:1px solid #a7f3d0;padding:18px 20px;border-radius:14px;margin-bottom:20px}
.cards{display:grid;gap:14px}
.card{border:1px solid #d1fae5;border-radius:14px;padding:20px;break-inside:avoid}
.label{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#059669;font-weight:bold;margin:12px 0 4px}
.example{background:#f0fdf4;padding:10px 12px;border-radius:9px;margin-top:10px}
.takeaways{background:#064e3b;color:white;padding:22px;border-radius:14px;margin-top:20px}
.takeaways h2{color:#a7f3d0}.takeaways ul{margin-bottom:0}
.footer{font-size:11px;color:#64748b;margin-top:20px;text-align:center}
@media print{.hero,.learn,.card,.takeaways{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
</head>
<body>
<section class="hero">
<div class="eyebrow">GREENInvest · Education Plan</div>
<h1>Education Guide</h1>
<p class="subtitle">Financial & Environmental Basics</p>
</section>
<section class="learn">
<h2>What you will learn</h2>
<p>Understand three basic ideas used in GREENInvest and why looking at financial and environmental information together can support better research and learning.</p>
</section>
<div class="cards">
<section class="card"><h2>1. Stock Return</h2><div class="label">What is it?</div><p>Stock return shows how much the value of a stock increased or decreased during a selected period.</p><div class="label">Why does it matter?</div><p>It helps users understand how a company's stock performed over time.</p><div class="example"><strong>Simple example:</strong> If a stock moves from MXN $100 to MXN $110, its price increased by 10%.</div></section>
<section class="card"><h2>2. Carbon Emissions</h2><div class="label">What is it?</div><p>Carbon emissions are greenhouse gas emissions reported by a company as part of its environmental information.</p><div class="label">Why does it matter?</div><p>They help students consider part of a company's environmental impact and sustainability performance.</p><div class="example"><strong>Simple example:</strong> Two companies can have similar financial results but report different levels of carbon emissions.</div></section>
<section class="card"><h2>3. Financial + Environmental Analysis</h2><div class="label">What is it?</div><p>This approach looks at financial performance and environmental information together instead of analyzing only one type of data.</p><div class="label">Why does it matter?</div><p>It gives students more than one perspective when comparing companies.</p><div class="example"><strong>Simple example:</strong> A company can show a positive stock return while still having environmental challenges that are useful to consider.</div></section>
</div>
<section class="takeaways"><h2>Key Takeaways</h2><ul><li>Financial performance is only one part of company analysis.</li><li>Environmental indicators add another perspective.</li><li>One indicator does not explain the complete performance or impact of a company.</li><li>Use GREENInvest as a starting point for research and learning.</li></ul></section>
<p class="footer">For educational purposes only. GREENInvest does not provide financial advice.</p>
</body>
</html>`;
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 250);
}

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
                <div className="flex items-start justify-between gap-3"><h3 className="text-xl font-bold">{plan.name}</h3>{plan.badge && <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">{plan.badge}</span>}</div>
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
          <p className="mt-4 max-w-3xl leading-7 text-emerald-100">Understand financial and environmental concepts with simple explanations and examples. Generate an education guide to review the main concepts later.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5"><h3 className="font-bold">Stock Return</h3><p className="mt-2 text-sm text-emerald-100">Shows how much a stock increased or decreased during a selected period.</p></div>
            <div className="rounded-2xl bg-white/10 p-5"><h3 className="font-bold">Carbon Emissions</h3><p className="mt-2 text-sm text-emerald-100">Helps users understand greenhouse gas emissions reported by a company.</p></div>
            <div className="rounded-2xl bg-white/10 p-5"><h3 className="font-bold">Combined Analysis</h3><p className="mt-2 text-sm text-emerald-100">Connects financial performance with environmental information for learning.</p></div>
          </div>
          <p className="mt-5 text-sm text-emerald-200">Generate a simple educational guide with the main financial and environmental concepts to review later.</p>\n          <button onClick={downloadEducationPdf} className="mt-5 rounded-xl bg-white px-5 py-3 font-semibold text-emerald-900 hover:bg-emerald-50">Generate Education Guide</button>\n
        </section>

        <div className="mt-10 text-center">
          <Link href="/pricing" className="inline-block rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">Explore Pricing Simulator</Link>
        </div>
      </section>
    </main>
  );
}
