# GREENInvest Core — Prompt Library Entry

## Prompt name
GREENInvest Core Extractor

## Purpose
Turn a rough product or investment-research idea into a small structured Core that is easy to review before building more features.

## Input
- Idea title
- Idea or problem description
- Target user

## Expected output
- Core idea
- Problem
- User
- Value
- Next step

## Course implementation prompt
Improve the existing GREENInvest project without rebuilding it. Add a `/core` page using Next.js, React and Tailwind. Include an intake form with title, description and target user. Generate a simple structured Core output with Core Idea, Problem, User, Value and Next Step. Because this project uses free tools only, use a transparent rule-based simulated generator and label it clearly. Add a Save button that writes the result to Supabase table `core_outputs`. Show recent saved outputs below as a small dashboard preview. Reuse the existing Supabase connection and GREENInvest visual style. Do not add authentication, paid APIs or unrelated features.

## Why the output is simulated
The weekly constraints require free tools and do not require a paid AI API. The current version therefore uses transparent rule-based text generation. It is labeled in the interface so users are not misled into thinking it is a live external AI model.

## Future improvement
A later version could replace the simulated generator with a free or approved AI API while preserving the same input, output and Supabase structure.
