"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import {
  buildGuidedResult,
  educationNotice,
  guardrailMessage,
  intakeQuestions,
  isDirectAdviceRequest,
  type IntakeAnswers,
} from "@/lib/chatGuidance";

type SaveState = "idle" | "saving" | "saved" | "error";
type Selection = Partial<IntakeAnswers>;
const initialNotice = "Welcome! I'm GREENInvest's rule-based guide. I can explain ESG ideas and help you find company information.";

export default function ChatWorkspace() {
  const supabase = useMemo(() => getSupabase(), []);
  const [answers, setAnswers] = useState<Selection>({});
  const [step, setStep] = useState(0);
  const [acknowledged, setAcknowledged] = useState(false);
  const [advicePrompt, setAdvicePrompt] = useState("");
  const [guardrailTriggered, setGuardrailTriggered] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [rating, setRating] = useState<"up" | "down" | null>(null);
  const [feedbackState, setFeedbackState] = useState<SaveState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const complete = step >= intakeQuestions.length;
  const ready = complete && acknowledged;
  const result = ready ? buildGuidedResult(answers as IntakeAnswers) : null;

  function reset() {
    setAnswers({});
    setStep(0);
    setAcknowledged(false);
    setAdvicePrompt("");
    setGuardrailTriggered(false);
    setSaveState("idle");
    setSaveMessage("");
    setSessionId(null);
    setRating(null);
    setFeedbackState("idle");
    setFeedbackMessage("");
  }

  function selectAnswer(value: string) {
    if (complete) return;
    const id = intakeQuestions[step].id;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setStep((prev) => prev + 1);
  }

  function tryGuardrail() {
    if (!advicePrompt.trim()) return;
    if (isDirectAdviceRequest(advicePrompt)) {
      setGuardrailTriggered(true);
    } else {
      setGuardrailTriggered(false);
    }
  }

  async function ensureAnonymousUser() {
    if (!supabase) throw new Error("Supabase is not configured. Check public environment variables.");
    const { data: existing, error: getError } = await supabase.auth.getUser();
    if (getError && !/session missing/i.test(getError.message)) throw getError;
    if (existing.user) return existing.user.id;
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error || !data.user) throw new Error(error?.message ?? "Could not create an anonymous session.");
    return data.user.id;
  }

  async function saveChat(): Promise<string | null> {
    if (!result || !supabase) {
      setSaveState("error");
      setSaveMessage("Chat is incomplete or Supabase is not configured.");
      return null;
    }
    if (sessionId) return sessionId;
    setSaveState("saving");
    setSaveMessage("");
    try {
      const userId = await ensureAnonymousUser();
      const { data, error } = await supabase.from("chat_sessions").insert({
        user_id: userId,
        user_type: answers.userType,
        goal: answers.goal,
        topic: answers.topic,
        response_summary: [result.introduction, result.explanation, result.nextStep].join(" "),
        human_checkpoint_shown: true,
        guardrail_triggered: guardrailTriggered,
      }).select("id").single();
      if (error) throw error;
      setSessionId(data.id);
      setSaveState("saved");
      setSaveMessage("Chat summary saved successfully ✓");
      return data.id as string;
    } catch (e) {
      setSaveState("error");
      setSaveMessage("Could not save chat: " + (e instanceof Error ? e.message : "Unknown error"));
      return null;
    }
  }

  async function sendFeedback(value: "up" | "down") {
    if (rating || feedbackState === "saving") return;
    setFeedbackState("saving");
    setFeedbackMessage("");
    const id = sessionId ?? await saveChat();
    if (!id || !supabase) {
      setFeedbackState("error");
      setFeedbackMessage("Save the chat successfully before submitting feedback.");
      return;
    }
    try {
      const userId = await ensureAnonymousUser();
      const { error } = await supabase.from("chat_feedback").insert({ session_id: id, user_id: userId, rating: value });
      if (error) throw error;
      setRating(value);
      setFeedbackState("saved");
      setFeedbackMessage("Feedback saved successfully ✓");
    } catch (e) {
      setFeedbackState("error");
      setFeedbackMessage("Could not save feedback: " + (e instanceof Error ? e.message : "Unknown error"));
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_290px]">
      <section aria-label="Guided assistant chat" className="overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-950 px-6 py-5 text-white">
          <div>
            <h2 className="text-xl font-bold">GREENInvest Assistant</h2>
            <p className="mt-1 text-sm text-emerald-100">Guided conversation · No live AI API</p>
          </div>
          <button type="button" onClick={reset} className="rounded-xl border border-white/40 px-3 py-2 text-sm font-semibold hover:bg-white/10">Start over</button>
        </div>
        <div className="space-y-5 p-5 sm:p-7">
          <div className="max-w-[95%] rounded-2xl rounded-tl-sm bg-emerald-50 p-4 text-slate-800">{initialNotice}</div>
          {intakeQuestions.map((question, index) => (
            index <= step ? (
              <div key={question.id} className="space-y-3">
                <div className="max-w-[95%] rounded-2xl rounded-tl-sm bg-emerald-50 p-4 text-slate-800">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-emerald-700">Question {index + 1} of 3</span>
                  {question.question}
                </div>
                {answers[question.id] ? (
                  <div className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-tr-sm bg-emerald-700 px-4 py-3 text-white">{answers[question.id]}</div>
                ) : index === step ? (
                  <div className="flex flex-wrap gap-2" role="group" aria-label={question.question}>
                    {question.options.map((option) => (
                      <button key={option} type="button" onClick={() => selectAnswer(option)} className="rounded-xl border border-emerald-300 bg-white px-3 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">{option}</button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null
          ))}
          {complete && !acknowledged && (
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5">
              <h3 className="font-bold text-amber-950">Human checkpoint</h3>
              <p className="mt-2 text-sm text-amber-950">{educationNotice}</p>
              <button type="button" onClick={() => setAcknowledged(true)} className="mt-4 rounded-xl bg-emerald-800 px-4 py-2 font-semibold text-white hover:bg-emerald-900">I understand — show my guidance</button>
            </div>
          )}
          {result && (
            <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <h3 className="text-xl font-bold text-emerald-950">Your GREENInvest guidance</h3>
              <p>{result.introduction}</p>
              <p>{result.explanation}</p>
              <p><strong>Suggested next step:</strong> {result.nextStep}</p>
              <div className="flex flex-wrap gap-2">{result.links.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-xl bg-emerald-800 px-3 py-2 text-sm font-bold text-white hover:bg-emerald-900">{link.label} ↗</Link>
              ))}</div>
              <p className="text-xs text-emerald-950">{educationNotice}</p>
            </div>
          )}
          {result && <div className="space-y-3 border-t border-slate-200 pt-5">
            <button type="button" onClick={() => void saveChat()} disabled={saveState === "saving" || saveState === "saved"} className="rounded-xl bg-emerald-800 px-4 py-3 font-bold text-white disabled:opacity-60">{saveState === "saving" ? "Saving..." : saveState === "saved" ? "Saved ✓" : "Save chat summary"}</button>
            {saveMessage && <p role="status" className={"text-sm " + (saveState === "error" ? "text-red-700" : "text-emerald-800")}>{saveMessage}</p>}
            <p className="font-semibold">Was this helpful?</p>
            <div className="flex gap-2">
              <button type="button" aria-label="Helpful response" disabled={!!rating || feedbackState === "saving"} onClick={() => void sendFeedback("up")} className="rounded-xl border border-emerald-300 px-4 py-2 hover:bg-emerald-50 disabled:opacity-60">👍 Yes</button>
              <button type="button" aria-label="Unhelpful response" disabled={!!rating || feedbackState === "saving"} onClick={() => void sendFeedback("down")} className="rounded-xl border border-emerald-300 px-4 py-2 hover:bg-emerald-50 disabled:opacity-60">👎 No</button>
            </div>
            {feedbackMessage && <p role="status" className={"text-sm " + (feedbackState === "error" ? "text-red-700" : "text-emerald-800")}>{feedbackMessage}</p>}
          </div>}
        </div>
      </section>
      <aside className="space-y-5">
        <div className="rounded-2xl border border-emerald-200 bg-white p-5">
          <h2 className="text-lg font-bold text-emerald-950">How it works</h2>
          <p className="mt-3 text-sm text-slate-600">1. Answer three questions.<br />2. Acknowledge educational limitations.<br />3. Explore relevant ESG explanations and pages.<br />4. Save your summary and rate it.</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-lg font-bold text-amber-950">Safety guardrail</h2>
          <p className="mt-2 text-sm text-amber-900">Try entering a direct stock purchase request to see how the guide responds.</p>
          <label htmlFor="advice-prompt" className="mt-4 block text-sm font-semibold text-amber-950">Test question</label>
          <textarea id="advice-prompt" maxLength={240} value={advicePrompt} onChange={(e) => { setAdvicePrompt(e.target.value); setGuardrailTriggered(false); }} placeholder="Which stock should I buy?" rows={3} className="mt-2 w-full rounded-xl border border-amber-300 bg-white p-3 text-sm text-slate-900" />
          <button type="button" onClick={tryGuardrail} className="mt-2 rounded-xl bg-amber-900 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-950">Check question</button>
          {advicePrompt.trim() && !guardrailTriggered && !isDirectAdviceRequest(advicePrompt) && <p role="status" className="mt-3 text-sm text-amber-950">This prototype answers using the three guided questions above; open-ended chat is outside this week&apos;s scope.</p>}
          {guardrailTriggered && <p role="alert" className="mt-3 rounded-lg border border-amber-300 bg-white p-3 text-sm font-medium text-amber-950">{guardrailMessage}</p>}
        </div>
      </aside>
    </div>
  );
}
