import Link from "next/link";
import ChatWorkspace from "./ChatWorkspace";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-amber-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="GREENInvest navigation" className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-200 pb-5">
          <Link href="/" className="text-2xl font-extrabold text-emerald-900">GREEN<span className="text-emerald-600">Invest</span></Link>
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-emerald-900">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/core" className="hover:underline">Core</Link>
            <Link href="/research" className="hover:underline">Research</Link>
            <Link href="/product" className="hover:underline">Product</Link>
            <Link href="/pricing" className="hover:underline">Pricing</Link>
            <Link href="/marketing" className="hover:underline">Marketing</Link>
            <Link href="/chat" aria-current="page" className="rounded-xl bg-emerald-700 px-5 py-2.5 text-white shadow-sm ring-2 ring-emerald-200 hover:bg-emerald-800">Chat</Link>
          </div>
        </nav>

        <header className="mt-8 grid overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-700 text-white shadow-xl md:grid-cols-[1.2fr_0.8fr]">
          <div className="p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-lime-300">Week 5 · Guided Assistant</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Explore sustainable investing with guidance.</h1>
            <p className="mt-4 max-w-xl text-lg text-emerald-50">Answer three questions to discover ESG concepts, company context and useful GREENInvest tools.</p>
            <span className="mt-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">Educational · Rule-based · Free to use</span>
          </div>
          <div className="relative flex min-h-56 items-center justify-center bg-emerald-900/30 p-5" aria-label="Illustration of stock market trends">
            <svg role="img" aria-label="Decorative illustration of an upward-trending financial chart" viewBox="0 0 420 260" className="w-full max-w-md drop-shadow-lg">
              <defs>
                <linearGradient id="chartArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#bef264" stopOpacity=".55"/><stop offset="100%" stopColor="#bef264" stopOpacity="0"/></linearGradient>
              </defs>
              <rect x="12" y="20" width="396" height="220" rx="23" fill="#f8fafc" opacity=".98"/>
              <g stroke="#cbd5e1" strokeWidth="1"><path d="M48 64H382M48 110H382M48 156H382M48 202H382"/></g>
              <g fill="#99f6e4" opacity=".9"><rect x="62" y="151" width="25" height="50" rx="4"/><rect x="104" y="137" width="25" height="64" rx="4"/><rect x="146" y="158" width="25" height="43" rx="4"/><rect x="188" y="111" width="25" height="90" rx="4"/><rect x="230" y="125" width="25" height="76" rx="4"/><rect x="272" y="78" width="25" height="123" rx="4"/><rect x="314" y="95" width="25" height="106" rx="4"/></g>
              <path d="M53 173L97 162L142 174L183 131L228 143L270 97L318 105L364 56L364 205H53Z" fill="url(#chartArea)"/>
              <path d="M53 173L97 162L142 174L183 131L228 143L270 97L318 105L364 56" fill="none" stroke="#059669" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="364" cy="56" r="8" fill="#84cc16" stroke="#065f46" strokeWidth="4"/>
              <text x="48" y="45" fill="#064e3b" fontSize="17" fontWeight="bold">Market overview</text>
            </svg>
          </div>
        </header>

        <section aria-labelledby="how-chat-works" className="mt-7 rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-50 to-white p-6 shadow-sm">
          <h2 id="how-chat-works" className="text-xl font-extrabold text-sky-950">How it works</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Answer 3 questions", "Tell us your profile, goal, and topic."],
              ["02", "Confirm your understanding", "Review the educational disclaimer."],
              ["03", "Explore ESG guidance", "Read your summary and visit useful pages."],
              ["04", "Save and rate", "Store your result and submit feedback."],
            ].map(([number, title, description]) => (
              <div key={number} className="rounded-2xl border border-sky-100 bg-white p-4">
                <span className="text-sm font-black text-teal-700">{number}</span>
                <h3 className="mt-2 font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="mt-7"><ChatWorkspace /></div>
        <p className="py-8 text-sm text-slate-500">This is a rule-based educational guide, not a live AI model or financial advisor. The chart above is decorative and does not represent real stock prices.</p>
      </div>
    </main>
  );
}
