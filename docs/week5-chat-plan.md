# Week 5 — Public Guided Assistant (/chat)

## Approved build discipline
**Problem:** First-time visitors need help finding ESG education, Mexican company information, and relevant GREENInvest pages.
**Users:** Students, beginner investors, and ESG researchers.
**Success:** Public /chat, three ordered intake questions, rule-based response, financial advice guardrail, human acknowledgment, Supabase chat summary and feedback saves, six documented tests.
**UX:** Green/white chat bubbles, selectable answers, explanatory result, linked page recommendations, guardrail checkpoint, feedback and inline save status. The mockup was produced before implementation; compare differences in a post-build implementation note.
**Scope cut:** No LLM, live advice, prices, accounts dashboard, voice, files, or unverified ESG scores.

## Acceptance criteria
- [ ] /chat opens without sign-in on the deployed website.
- [ ] Three intake questions are presented in order.
- [ ] Answer combinations produce an educational explanation and working internal links.
- [ ] Direct stock-buy advice triggers a non-advisory guardrail response.
- [ ] User acknowledges the educational disclaimer before results are shown.
- [ ] Session summary and thumbs feedback persist in Supabase with visible success/error messages.
- [ ] Three software tests and three external user tests are recorded.
- [ ] Five meaningful commits, two Vercel deployments, and a 2–3 minute demo are evidenced.

## Architecture
Visitor → Next.js /chat + React UI → local rule-based generator and guardrails → Supabase (anonymous auth + RLS; chat_sessions and chat_feedback) → inline save statuses. Vercel deploys the repository; no paid API is called.

## Stack and DevOps
Next.js/React for interactive state, Tailwind for consistent styling, TypeScript for predictable rules, Supabase for protected records, GitHub for changes, Vercel for public hosting. Keep NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel environment variables. Never expose a Supabase service role key.

## Test plan
| Test | Expected result |
| --- | --- |
| Software 1: complete all three questions | Relevant ESG explanation and navigation shown |
| Software 2: request direct purchase advice | Guardrail, no stock tip |
| Software 3: submit chat and feedback | Records appear in Supabase; inline confirmation |
| External 1: student | Understands intake and ESG explanation |
| External 2: beginner investor | Can identify a company and the next relevant page |
| External 3: first-time visitor | Can use the page without directions |

## Evidence to add after execution
Actual screenshots of the live page, commit list, two deployment IDs, database rows (redact identifiers), six test outcomes, one correction/redeploy, UX implementation note, 150–250-word human decision note describing rejected alternatives and tradeoffs, 2–3-minute demo link, and a prompt log of five real coding prompts. Do not mark tests as passed before they are run.
