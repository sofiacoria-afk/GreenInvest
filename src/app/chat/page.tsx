import Link from "next/link";
import ChatWorkspace from "./ChatWorkspace";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-100 pb-5">
          <Link href="/" className="text-2xl font-extrabold text-emerald-900">GREEN<span className="text-emerald-600">Invest</span></Link>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-emerald-900">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/core" className="hover:underline">Core</Link>
            <Link href="/research" className="hover:underline">Research</Link>
            <Link href="/product" className="hover:underline">Product</Link>
            <Link href="/pricing" className="hover:underline">Pricing</Link>
          </div>
        </nav>
        <header className="py-10">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Week 5 · Guided Assistant</p>
          <h1 className="mt-2 text-4xl font-extrabold text-emerald-950 sm:text-5xl">Explore sustainable investing with guidance.</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">Answer three simple questions to discover ESG concepts, company context and useful sections of GREENInvest.</p>
        </header>
        <ChatWorkspace />
        <p className="py-8 text-sm text-slate-500">This is a rule-based educational guide, not a live AI model or financial advisor.</p>
      </div>
    </main>
  );
}
