# Week 1 — Generative Core Agent Build Discipline Packet

## Problem
GREENInvest already shows financial and environmental information, but a beginner user may still need help turning a rough investment idea into a simple structured summary.

## User
Beginner investors and students who want to organize an investment idea before researching a company in more detail.

## Success
By the end of the week, `/core` must load and let a user:
- enter a title, idea/description and target user,
- generate a structured Core output,
- see the output in a result card,
- save the output to Supabase,
- see recent saved outputs in a dashboard preview.

## UX Concept
A simple GREENInvest page with two columns: an intake form on the left and the generated Core output on the right. A small saved-results section appears below. The design should use the same green visual language as the main GREENInvest website.

## Scope Cut
This week will not include accounts, authentication, paid AI APIs, portfolios, recommendations, complex scoring, or advanced prompt editing.

## Product Spec
Input fields:
- Idea title
- Idea/description
- Target user

Output fields:
- Core idea
- Problem
- User
- Value
- Next step

Actions:
- Generate Core
- Save to Supabase
- Display recent saved outputs

### Acceptance Criteria
1. `/core` loads on the deployed Vercel website.
2. A user can enter all three input fields.
3. Clicking Generate Core creates a structured output card.
4. The page clearly labels the generation as simulated/rule-based and not a paid AI API.
5. Clicking Save stores the output in `core_outputs`.
6. Saved outputs appear in the dashboard preview.
7. Empty required fields show a clear message instead of breaking the page.
8. Three self-tests are documented.

## Architecture
User → Next.js `/core` page → local structured generator → output card → Supabase `core_outputs` → saved-results preview.

## Tech Stack
- Next.js/React: page and interaction.
- Tailwind CSS: simple responsive GREENInvest design.
- Supabase: saves generated Core outputs.
- GitHub: version control and weekly evidence.
- Vercel: live deployment.

## DevOps
The code remains in `sofiacoria-afk/GreenInvest`. GitHub is connected to Vercel. Supabase credentials remain in Vercel environment variables. Each meaningful Week 1 Core step is committed separately.

## Test Plan
1. GREENInvest sustainability idea: generate and save successfully.
2. Student investment-research idea: generate a different structured output and save it.
3. Empty-form test: confirm the page shows validation and does not save invalid data.

## Coding Agent Prompt
Improve the existing GREENInvest project without rebuilding it. Add a `/core` page using Next.js, React and Tailwind. Include an intake form with title, description and target user. Generate a simple structured Core output with Core Idea, Problem, User, Value and Next Step. Because this project uses free tools only, use a transparent rule-based simulated generator and label it clearly. Add a Save button that writes the result to Supabase table `core_outputs`. Show recent saved outputs below as a small dashboard preview. Reuse the existing Supabase connection and GREENInvest visual style. Do not add authentication, paid APIs or unrelated features. Document the prompt and three self-tests.