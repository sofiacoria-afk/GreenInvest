"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
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
  const [assetFeedback, setAssetFeedback] = useState<Record<string,string>>({});

  async function copy(text: string, key: string) {
    try { await navigator.clipboard.writeText(text); setCopied(key); setMessage("Copied to clipboard."); }
    catch { setMessage("Copy failed. Please use your browser's copy command."); }
  }
  function exportText(title: string, text: string) {
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".txt";
    link.click(); URL.revokeObjectURL(url); setMessage("Text file exported.");
  }
  async function getMarketingClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Supabase environment variables are missing.");
    const client = createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, storageKey: "greeninvest-marketing-session" } });
    const { data: { session } } = await client.auth.getSession();
    let user = session?.user ?? null;
    if (!user) {
      const result = await client.auth.signInAnonymously();
      if (result.error) throw new Error("Enable Anonymous Sign-Ins in Supabase Authentication settings: " + result.error.message);
      user = result.data.user;
    }
    if (!user) throw new Error("Could not start an anonymous session.");
    return { client, user };
  }
  async function loadSaved() {
    setLoading(true);
    try {
      const { client, user } = await getMarketingClient();
      const { data, error } = await client.from("marketing_assets").select("id,title,content,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(30);
      if (error) throw error;
      setSaved(data ?? []); setMessage("Saved assets loaded.");
    } catch(e) { setMessage(e instanceof Error ? e.message : "Unable to load saved assets."); }
    finally { setLoading(false); }
  }
  async function save(title: string, content: string) {
    setLoading(true);
    setAssetFeedback(previous => ({...previous,[title]:"Saving..."}));
    try {
      const { client, user } = await getMarketingClient();
      const { error } = await client.from("marketing_assets").insert({ title, content, user_id: user.id });
      if (error) throw error;
      setMessage("Saved to Supabase.");
      setAssetFeedback(previous => ({...previous,[title]:"Saved successfully ✓"}));
      const { data, error: readError } = await client.from("marketing_assets").select("id,title,content,created_at").eq("user_id",user.id).order("created_at", { ascending:false }).limit(30);
      if (readError) throw readError;
      setSaved(data ?? []);
    } catch(e) { const detail = e instanceof Error ? e.message : "Unable to save asset."; setMessage(detail); setAssetFeedback(previous=>({...previous,[title]:"Save failed: "+detail})); }
    finally { setLoading(false); }
  }
  function recordVote() {
    setResponses(previous => previous.map((n,i) => i === variant ? n+1 : n));
    setMessage("Preference recorded locally; these are not real visitor conversion rates.");
  }
  const combined = [...socialPosts.map((post,i)=>`Post ${i+1}: ${post}`), ...videoScripts.map(script=>`${script.title}: ${script.hook} ${script.body} ${script.cta}`),...campaignCalendar.map(day=>`Day ${day.day} - ${day.platform}: ${day.topic}`)].join("\n\n");
  return <div className="mt-12 space-y-12">
    <section className="rounded-3xl border border-emerald-200 bg-white p-7 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-3xl font-extrabold text-emerald-950">Marketing Content Library</h2><p className="text-sm text-slate-600">Ready-to-use examples for promoting GREENInvest. Review, copy, save or export the content. These examples are prewritten, not AI-generated or automatically posted.</p></div><button className="rounded-lg bg-emerald-700 px-4 py-2 text-white" onClick={()=>exportText("greeninvest-campaign",combined)}>Export all (.txt)</button></div>
      <h3 className="mt-9 border-l-4 border-emerald-500 pl-3 text-2xl font-bold text-emerald-950">10 Social Media Posts</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">{socialPosts.map((post,i)=><article key={i} className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 leading-6"><p className="text-xs font-bold uppercase text-emerald-700">Post {i+1}</p><p className="mt-2 text-base leading-7 text-slate-700">{post}</p><div className="mt-4 flex gap-3 text-sm"><button className="font-semibold text-emerald-700" onClick={()=>copy(post,`post-${i}`)}>{copied===`post-${i}`?"Copied!":"Copy"}</button><button className="font-semibold text-emerald-700" disabled={loading} onClick={()=>save(`Social post ${i+1}`,post)}>Save</button></div>{assetFeedback[`Social post ${i+1}`] && <p role="status" className="mt-3 text-sm font-semibold text-emerald-800">{assetFeedback[`Social post ${i+1}`]}</p>}</article>)}</div>
      <h3 className="mt-9 border-l-4 border-sky-500 pl-3 text-2xl font-bold text-slate-900">3 Video Scripts</h3><div className="mt-4 grid gap-3 md:grid-cols-3">{videoScripts.map((script,i)=>{const value = `Hook: ${script.hook}\nBody: ${script.body}\nCTA: ${script.cta}`; return <article className="rounded-xl border border-slate-200 p-4" key={i}><h4 className="font-bold">{script.title}</h4><p className="mt-3 text-sm"><b>Hook:</b> {script.hook}</p><p className="mt-2 text-sm"><b>Body:</b> {script.body}</p><p className="mt-2 text-sm"><b>CTA:</b> {script.cta}</p><div className="mt-3 flex gap-3 text-sm"><button onClick={()=>copy(value,`video-${i}`)} className="font-semibold text-emerald-700">Copy</button><button disabled={loading} onClick={()=>save(script.title,value)} className="font-semibold text-emerald-700">Save</button></div>{assetFeedback[script.title] && <p role="status" className="mt-3 text-sm font-semibold text-emerald-800">{assetFeedback[script.title]}</p>}</article>})}</div>
      <h3 className="mt-9 border-l-4 border-amber-500 pl-3 text-2xl font-bold text-slate-900">14-Day Campaign Calendar</h3><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="bg-emerald-50"><th className="p-3">Day</th><th className="p-3">Channel</th><th className="p-3">Content</th></tr></thead><tbody>{campaignCalendar.map(day=><tr key={day.day} className="border-b border-slate-100"><td className="p-3">{day.day}</td><td className="p-3">{day.platform}</td><td className="p-3">{day.topic}</td></tr>)}</tbody></table></div>
    </section>
    <section className="rounded-2xl border border-emerald-100 bg-white p-6"><h2 className="text-3xl font-extrabold text-emerald-950">A/B Headline Tester</h2><p className="mt-2 text-sm text-slate-600">Compare two marketing headlines. Select the one a participant prefers, record the choice and write down why. Preferences are local to this browser session, not real website conversion analytics.</p><div className="mt-5 grid gap-3 md:grid-cols-2">{headlineVariants.map((headline,i)=><button key={i} onClick={()=>setVariant(i)} className={`rounded-xl border p-5 text-left ${variant===i?"border-emerald-700 bg-emerald-50":"border-slate-200"}`}><b>Variant {i===0?"A":"B"}</b><p className="mt-2">{headline}</p><small>Recorded preferences: {responses[i]}</small></button>)}</div><div className="mt-4 flex flex-wrap gap-3"><button onClick={recordVote} className="rounded-lg bg-emerald-700 px-4 py-2 text-white">Record preference</button><button onClick={()=>save("Headline AB test",JSON.stringify({headlineVariants,responses,note}))} disabled={loading} className="rounded-lg border border-emerald-700 px-4 py-2">Save test notes</button></div><label className="mt-4 block text-sm font-semibold" htmlFor="test-note">Test notes</label><textarea id="test-note" value={note} onChange={e=>setNote(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 p-3" placeholder="Participants, feedback and what changed..." rows={3}/></section>
    <section className="rounded-2xl border border-emerald-100 bg-white p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-3xl font-extrabold text-emerald-950">Saved Marketing Assets</h2><button disabled={loading} onClick={loadSaved} className="rounded-lg border border-emerald-700 px-4 py-2 disabled:opacity-50">Refresh saved assets</button></div><p className="mt-3 text-sm text-slate-600">Click Save on a post, script or headline test, then Refresh saved assets to see stored results. Your assets are private to this browser session. Anonymous sign-ins must be enabled in Supabase.</p><ul className="mt-4 space-y-2">{saved.map(asset=><li key={asset.id} className="rounded-lg bg-slate-50 p-3"><b>{asset.title}</b><p className="mt-1 whitespace-pre-wrap text-xs text-slate-600">{asset.content}</p></li>)}</ul>{saved.length===0&&<p className="mt-4 text-sm text-slate-500">No saved assets loaded.</p>}</section>
    <p aria-live="polite" role="status" className="text-sm font-semibold text-emerald-800">{message}</p>
  </div>;
}
