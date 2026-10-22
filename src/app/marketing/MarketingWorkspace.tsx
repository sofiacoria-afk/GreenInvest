"use client";
import { useState } from "react";
import { campaignCalendar, headlineVariants, socialPosts, videoScripts } from "./content";

type SavedAsset = { id: string; title: string; content: string; created_at: string };
export default function MarketingWorkspace() {
  const [copied, setCopied] = useState("");
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState<SavedAsset[]>([]);
  const [variant, setVariant] = useState(0);
  const [responses, setResponses] = useState([0, 0]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function copy(text: string, key: string) {
    try { await navigator.clipboard.writeText(text); setCopied(key); setMessage("Copied to clipboard."); }
    catch { setMessage("Copy failed. Please use your browser's copy command."); }
  }
  function exportText(title: string, text: string) {
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".txt";
    link.click(); URL.revokeObjectURL(url); setMessage("Text file exported.");
  }
  async function loadSaved() {
    setLoading(true);
    try {
      const response = await fetch("/api/marketing-assets");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load.");
      setSaved(data.assets); setMessage("Saved assets loaded.");
    } catch(e) { setMessage(e instanceof Error ? e.message : "Unable to load saved assets."); }
    finally { setLoading(false); }
  }
  async function save(title: string, content: string) {
    setLoading(true);
    try {
      const response = await fetch("/api/marketing-assets", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({title,content}) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save.");
      setMessage("Saved to Supabase."); await loadSaved();
    } catch(e) { setMessage(e instanceof Error ? e.message : "Unable to save asset."); }
    finally { setLoading(false); }
  }
  function recordVote() {
    setResponses(previous => previous.map((n,i) => i === variant ? n+1 : n));
    setMessage("Preference recorded locally; these are not real visitor conversion rates.");
  }
  const combined = [...socialPosts.map((post,i)=>`Post ${i+1}: ${post}`), ...videoScripts.map(script=>`${script.title}: ${script.hook} ${script.body} ${script.cta}`),...campaignCalendar.map(day=>`Day ${day.day} - ${day.platform}: ${day.topic}`)].join("\n\n");
  return <div className="mt-12 space-y-10">
    <section className="rounded-2xl border border-emerald-100 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-2xl font-bold">Marketing Content Library</h2><p className="text-sm text-slate-600">Prewritten educational content, not AI-generated or automatically posted.</p></div><button className="rounded-lg bg-emerald-700 px-4 py-2 text-white" onClick={()=>exportText("greeninvest-campaign",combined)}>Export all (.txt)</button></div>
      <h3 className="mt-7 text-xl font-semibold">10 Social Media Posts</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">{socialPosts.map((post,i)=><article key={i} className="rounded-xl border border-slate-200 p-4"><p className="text-xs font-bold uppercase text-emerald-700">Post {i+1}</p><p className="mt-2 text-sm text-slate-700">{post}</p><div className="mt-4 flex gap-3 text-sm"><button className="font-semibold text-emerald-700" onClick={()=>copy(post,`post-${i}`)}>{copied===`post-${i}`?"Copied!":"Copy"}</button><button className="font-semibold text-emerald-700" onClick={()=>save(`Social post ${i+1}`,post)}>Save</button></div></article>)}</div>
      <h3 className="mt-8 text-xl font-semibold">3 Video Scripts</h3><div className="mt-4 grid gap-3 md:grid-cols-3">{videoScripts.map((script,i)=>{const value = `Hook: ${script.hook}\nBody: ${script.body}\nCTA: ${script.cta}`; return <article className="rounded-xl border border-slate-200 p-4" key={i}><h4 className="font-bold">{script.title}</h4><p className="mt-3 text-sm"><b>Hook:</b> {script.hook}</p><p className="mt-2 text-sm"><b>Body:</b> {script.body}</p><p className="mt-2 text-sm"><b>CTA:</b> {script.cta}</p><div className="mt-3 flex gap-3 text-sm"><button onClick={()=>copy(value,`video-${i}`)} className="font-semibold text-emerald-700">Copy</button><button onClick={()=>save(script.title,value)} className="font-semibold text-emerald-700">Save</button></div></article>})}</div>
      <h3 className="mt-8 text-xl font-semibold">14-Day Campaign Calendar</h3><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="bg-emerald-50"><th className="p-3">Day</th><th className="p-3">Channel</th><th className="p-3">Content</th></tr></thead><tbody>{campaignCalendar.map(day=><tr key={day.day} className="border-b border-slate-100"><td className="p-3">{day.day}</td><td className="p-3">{day.platform}</td><td className="p-3">{day.topic}</td></tr>)}</tbody></table></div>
    </section>
    <section className="rounded-2xl border border-emerald-100 bg-white p-6"><h2 className="text-2xl font-bold">A/B Headline Tester</h2><p className="mt-2 text-sm text-slate-600">Choose a headline and record a preference. Results are local to this browser session, not website analytics.</p><div className="mt-5 grid gap-3 md:grid-cols-2">{headlineVariants.map((headline,i)=><button key={i} onClick={()=>setVariant(i)} className={`rounded-xl border p-5 text-left ${variant===i?"border-emerald-700 bg-emerald-50":"border-slate-200"}`}><b>Variant {i===0?"A":"B"}</b><p className="mt-2">{headline}</p><small>Recorded preferences: {responses[i]}</small></button>)}</div><div className="mt-4 flex flex-wrap gap-3"><button onClick={recordVote} className="rounded-lg bg-emerald-700 px-4 py-2 text-white">Record preference</button><button onClick={()=>save("Headline AB test",JSON.stringify({headlineVariants,responses,note}))} className="rounded-lg border border-emerald-700 px-4 py-2">Save test notes</button></div><label className="mt-4 block text-sm font-semibold" htmlFor="test-note">Test notes</label><textarea id="test-note" value={note} onChange={e=>setNote(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 p-3" placeholder="Participants, feedback and what changed..." rows={3}/></section>
    <section className="rounded-2xl border border-emerald-100 bg-white p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-bold">Saved Marketing Assets</h2><button disabled={loading} onClick={loadSaved} className="rounded-lg border border-emerald-700 px-4 py-2 disabled:opacity-50">Refresh saved assets</button></div><p className="mt-3 text-sm text-slate-600">Assets stored in Supabase appear here when the database is configured.</p><ul className="mt-4 space-y-2">{saved.map(asset=><li key={asset.id} className="rounded-lg bg-slate-50 p-3"><b>{asset.title}</b><p className="mt-1 whitespace-pre-wrap text-xs text-slate-600">{asset.content}</p></li>)}</ul>{saved.length===0&&<p className="mt-4 text-sm text-slate-500">No saved assets loaded.</p>}</section>
    <p aria-live="polite" role="status" className="text-sm font-semibold text-emerald-800">{message}</p>
  </div>;
}
