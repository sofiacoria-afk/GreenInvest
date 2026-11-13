import { createClient } from "@supabase/supabase-js";

// Emergency fallback for Week 6: this is the project's PUBLIC URL and
// PUBLISHABLE client key. Never put a secret or service_role key here.
// Environment variables remain the preferred configuration.
const GREENINVEST_PUBLIC_URL = "https://novkzbmwpqtcsmvqkudm.supabase.co";
const GREENINVEST_PUBLISHABLE_KEY = "sb_publishable_N04qfMb53wBHCM8gr5h6CQ_El25KvvV";

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || GREENINVEST_PUBLIC_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || GREENINVEST_PUBLISHABLE_KEY;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
