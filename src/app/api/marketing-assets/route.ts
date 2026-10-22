import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  const db = getSupabase();
  if (!db) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  const { data, error } = await db.from("marketing_assets").select("id,title,content,created_at").order("created_at", { ascending: false }).limit(30);
  if (error) return NextResponse.json({ error: "Unable to read marketing assets. Verify the table and RLS policies." }, { status: 500 });
  return NextResponse.json({ assets: data ?? [] });
}

export async function POST(request: Request) {
  const db = getSupabase();
  if (!db) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  let body: { title?: unknown; content?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  const { title, content } = body;
  if (typeof title !== "string" || typeof content !== "string" || !title.trim() || !content.trim() || title.length > 120 || content.length > 12000)
    return NextResponse.json({ error: "Title or content is missing or too long." }, { status: 400 });
  const { error } = await db.from("marketing_assets").insert({ title: title.trim(), content: content.trim() });
  if (error) return NextResponse.json({ error: "Unable to save. Verify the Supabase table and RLS permissions." }, { status: 500 });
  return NextResponse.json({ saved: true }, { status: 201 });
}
