"use client";

import { FormEvent, useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type CoreOutput = {
  id?: number;
  idea_title: string;
  idea_description: string;
  target_user: string;
  core_idea: string;
  core_problem: string;
  core_user: string;
  core_value: string;
  next_step: string;
  created_at?: string;
};

function buildCore(title: string, description: string, user: string): CoreOutput {
  const cleanTitle = title.trim();
  const cleanDescription = description.trim();
  const cleanUser = user.trim();

  return {
    idea_title: cleanTitle,
    idea_description: cleanDescription,
    target_user: cleanUser,
    core_idea: `${cleanTitle} is a focused product idea that turns the original concept into a small, testable feature.`,
    core_problem: cleanDescription,
    core_user: cleanUser,
    core_value: `The value is to make the idea easier for ${cleanUser} to understand and use in a simple way.`,
    next_step: "Test the smallest useful version with a real example, collect feedback, and improve only what is necessary.",
  };
}

export default function CorePage() {
  const [title, setTitle] = useState("GREENInvest Core");
  const [description, setDescription] = useState(
    "Help beginner investors organize an investment idea using financial and environmental information."
  );
  const [targetUser, setTargetUser] = useState("Beginner investors and students");
  const [output, setOutput] = useState<CoreOutput | null>(null);
  const [saved, setSaved] = useState<CoreOutput[]>([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSaved();
  }, []);

  async function loadSaved() {
    const supabase = getSupabase();
    if (!supabase) return;

    const { data } = await supabase
      .from("core_outputs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4);

    if (data) setSaved(data as CoreOutput[]);
  }

  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!title.trim() || !description.trim() || !targetUser.trim()) {
      setOutput(null);
      setMessage("Complete all three fields before generating the Core.");
      return;
    }

    setOutput(buildCore(title, description, targetUser));
    setMessage("Core generated successfully. Review it before saving.");
  }

  async function saveOutput() {
    if (!output) return;

    const supabase = getSupabase();
    if (!supabase) {
      setMessage("Supabase is not connected.");
      return;
    }

    setSaving(true);
    setMessage("");

    const { error } = await supabase.from("core_outputs").insert(output);

    if (error) {
      setMessage(`Could not save: ${error.message}`);
    } else {
      setMessage("Saved to Supabase.");
      await loadSaved();
    }

    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-5 py-12 text-emerald-950">
      <section className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Week 1 · Generative Core Agent
            </p>
            <h1 className="mt-3 text-5xl font-bold tracking-tight">GREENInvest Core</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Turn a rough idea into a simple structured Core that can be reviewed and saved.
            </p>
          </div>
          <a
            href="/"
            className="rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800"
          >
            Back to GREENInvest
          </a>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <form
            onSubmit={generate}
            className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-xl shadow-emerald-100/60"
          >
            <h2 className="text-2xl font-semibold">1. Intake form</h2>

            <label className="mt-6 block text-sm font-semibold" htmlFor="title">
              Idea title
            </label>
            <input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-xl border border-emerald-200 px-4 py-3 outline-none focus:border-emerald-500"
            />

            <label className="mt-5 block text-sm font-semibold" htmlFor="description">
              What problem or idea do you want to organize?
            </label>
            <textarea
              id="description"
              rows={6}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="mt-2 w-full rounded-xl border border-emerald-200 px-4 py-3 outline-none focus:border-emerald-500"
            />

            <label className="mt-5 block text-sm font-semibold" htmlFor="user">
              Target user
            </label>
            <input
              id="user"
              value={targetUser}
              onChange={(event) => setTargetUser(event.target.value)}
              className="mt-2 w-full rounded-xl border border-emerald-200 px-4 py-3 outline-none focus:border-emerald-500"
            />

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              Generate Core
            </button>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Free-course version: this uses a transparent rule-based simulated generator, not a paid AI API.
            </p>
          </form>

          <section className="rounded-3xl bg-emerald-900 p-7 text-white shadow-xl">
            <h2 className="text-2xl font-semibold">2. Core extraction output</h2>

            {!output ? (
              <div className="flex min-h-96 items-center justify-center text-center text-emerald-100">
                Complete the form and generate a Core to see the structured result.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {[
                  ["Core idea", output.core_idea],
                  ["Problem", output.core_problem],
                  ["User", output.core_user],
                  ["Value", output.core_value],
                  ["Next step", output.next_step],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                      {label}
                    </p>
                    <p className="mt-2 leading-6">{value}</p>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={saveOutput}
                  disabled={saving}
                  className="w-full rounded-xl bg-lime-300 px-5 py-3 font-semibold text-emerald-950 transition hover:bg-lime-200 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save to Supabase"}
                </button>
              </div>
            )}
          </section>
        </div>

        {message && (
          <p className="mt-5 rounded-2xl border border-emerald-200 bg-white px-5 py-4 text-sm text-slate-700">
            {message}
          </p>
        )}

        <section className="mt-8 rounded-3xl border border-emerald-100 bg-white p-7 shadow-lg shadow-emerald-100/40">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                Dashboard preview
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Recent saved outputs</h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              {saved.length} shown
            </span>
          </div>

          {saved.length === 0 ? (
            <p className="mt-6 text-slate-500">No saved Core outputs yet.</p>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {saved.map((item) => (
                <article key={item.id ?? item.idea_title} className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                  <h3 className="font-bold">{item.idea_title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.core_idea}</p>
                  <p className="mt-3 text-xs font-semibold text-emerald-700">
                    User: {item.core_user}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
