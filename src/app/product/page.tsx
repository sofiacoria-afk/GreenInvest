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
<html><head><meta charset="utf-8"><title>GREENInvest Learning Guide</title>
<style>
@page{size:A4;margin:12mm}
*{box-sizing:border-box} body{font-family:Arial,sans-serif;margin:0;color:#123b2b;background:#fff;line-height:1.45}
.page{max-width:800px;margin:auto}.cover{background:linear-gradient(135deg,#064e3b,#059669);color:#fff;padding:38px 36px;border-radius:22px;position:relative;overflow:hidden}
.cover:after{content:"";position:absolute;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,.08);right:-40px;top:-50px}
.brand{font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#a7f3d0}.cover h1{font-size:38px;margin:12px 0 6px}.cover p{margin:0;color:#d1fae5;font-size:17px}
.intro{margin:20px 0;padding:18px 20px;border-radius:16px;background:#ecfdf5;border-left:5px solid #10b981}.intro h2{margin:0 0 6px;color:#065f46;font-size:20px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:18px 0}.mini{border:1px solid #d1fae5;border-radius:14px;padding:15px;background:#f8fffb}.mini strong{color:#047857}
.card{border:1px solid #a7f3d0;border-radius:18px;padding:20px;margin:14px 0;break-inside:avoid;box-shadow:0 3px 10px rgba(6,78,59,.06)}
.number{display:inline-flex;width:30px;height:30px;border-radius:50%;align-items:center;justify-content:center;background:#047857;color:white;font-weight:bold;margin-right:8px}
.card h2{display:inline;color:#065f46;font-size:21px}.label{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#059669;font-weight:bold;margin:13px 0 4px}
.example{background:#f0fdf4;border-radius:11px;padding:11px 13px;margin-top:10px}.takeaways{background:#064e3b;color:white;border-radius:18px;padding:20px 24px;margin-top:18px}.takeaways h2{color:#a7f3d0;margin-top:0}.takeaways li{margin:6px 0}
.footer{text-align:center;color:#64748b;font-size:10px;margin-top:16px}
@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.cover,.intro,.mini,.card,.example,.takeaways{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body><main class="page">
<section class="cover"><div class="brand">GREENInvest · Education Plan</div><h1>Learning Guide</h1><p>Understand the numbers, not just see them.</p></section>
<section class="intro"><h2>What does this guide give you?</h2><p>GREENInvest gives students simple explanations of the financial and environmental information shown on the platform. This guide explains what each concept means, why it matters, and how to interpret it with an easy example.</p></section>
<div class="grid"><div class="mini"><strong>Simple explanations</strong><br>Learn concepts without complicated financial language.</div><div class="mini"><strong>Practical examples</strong><br>See how each concept can be interpreted in a company analysis.</div></div>
<section class="card"><span class="number">1</span><h2>Stock Return</h2><div class="label">What does it mean?</div><p>Stock return shows how much the value of a company's stock increased or decreased during a selected period.</p><div class="label">Why is it useful?</div><p>It helps you understand how the stock performed and compare its change with other companies or periods.</p><div class="example"><strong>Example:</strong> If a stock goes from MXN $100 to MXN $110, its price increased by 10%.</div></section>
<section class="card"><span class="number">2</span><h2>Carbon Emissions</h2><div class="label">What does it mean?</div><p>Carbon emissions represent greenhouse gases reported by a company and are one indicator of environmental impact.</p><div class="label">Why is it useful?</div><p>They add an environmental perspective when studying a company instead of looking only at financial results.</p><div class="example"><strong>Example:</strong> Two companies may have similar financial performance but very different reported emissions.</div></section>
<section class="card"><span class="number">3</span><h2>Financial + Environmental Analysis</h2><div class="label">What does it mean?</div><p>GREENInvest combines financial performance with environmental information so users can study a company from more than one perspective.</p><div class="label">Why is it useful?</div><p>A strong financial result does not automatically mean strong environmental performance. Seeing both helps students ask better questions.</p><div class="example"><strong>Example:</strong> A company may show a positive stock return while also reporting environmental challenges worth researching.</div></section>
<section class="takeaways"><h2>Key Takeaways</h2><ul><li>GREENInvest helps explain the information shown on the platform.</li><li>Financial and environmental indicators answer different questions.</li><li>No single indicator explains the complete performance or impact of a company.</li><li>Use the guide as a starting point for comparison, research, and learning.</li></ul></section>
<p class="footer">GREENInvest Education Guide · For educational purposes only · This is not financial advice.</p>
</main></body></html>`;
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 300);
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
          <p className="mt-4 max-w-3xl leading-7 text-emerald-100">The Education plan does more than show data. It gives students simple explanations of what financial and environmental indicators mean, why they matter, and how to interpret them with practical examples. Users can also generate a learning guide to review the concepts later.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5"><h3 className="font-bold">Stock Return</h3><p className="mt-2 text-sm text-emerald-100">Shows how much a stock increased or decreased during a selected period.</p></div>
            <div className="rounded-2xl bg-white/10 p-5"><h3 className="font-bold">Carbon Emissions</h3><p className="mt-2 text-sm text-emerald-100">Helps users understand greenhouse gas emissions reported by a company.</p></div>
            <div className="rounded-2xl bg-white/10 p-5"><h3 className="font-bold">Combined Analysis</h3><p className="mt-2 text-sm text-emerald-100">Connects financial performance with environmental information for learning.</p></div>
          </div>
          <p className="mt-5 text-sm text-emerald-200">The guide includes simple explanations, why each concept matters, practical examples, and key takeaways for studying or classroom use.</p>\n          <button onClick={downloadEducationPdf} className="mt-5 rounded-xl bg-white px-5 py-3 font-semibold text-emerald-900 hover:bg-emerald-50">Generate Education Guide</button>\n
        </section>

        <div className="mt-10 text-center">
          <Link href="/pricing" className="inline-block rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">Explore Pricing Simulator</Link>
        </div>
      </section>
    </main>
  );
}
