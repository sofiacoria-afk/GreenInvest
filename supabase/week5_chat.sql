-- Week 5: execute in the Supabase SQL Editor before testing saves.
-- Enable Anonymous Sign-Ins under Supabase Authentication > Providers.
-- Uses per-visitor anonymous Auth identity, not an unrestricted public write policy.
create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  user_type text not null,
  goal text not null,
  topic text not null,
  response_summary text not null,
  human_checkpoint_shown boolean not null default false,
  guardrail_triggered boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_feedback (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  user_id uuid not null default auth.uid(),
  rating text not null check (rating in ('up', 'down')),
  created_at timestamptz not null default now(),
  unique (session_id)
);

alter table public.chat_sessions enable row level security;
alter table public.chat_feedback enable row level security;

create policy "Visitors may create their own chat sessions"
on public.chat_sessions for insert to authenticated
with check (auth.uid() = user_id);

create policy "Visitors may view their own chat sessions"
on public.chat_sessions for select to authenticated
using (auth.uid() = user_id);

create policy "Visitors may submit feedback for their sessions"
on public.chat_feedback for insert to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.chat_sessions cs
    where cs.id = session_id and cs.user_id = auth.uid()
  )
);

create policy "Visitors may view their own feedback"
on public.chat_feedback for select to authenticated
using (auth.uid() = user_id);

-- Only store answer summaries, not free-text messages or personally identifying information.
