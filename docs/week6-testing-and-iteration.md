# GREENInvest — Week 6 Testing and Iteration Record

## Status
Planning template only. **No Week 6 external user tests or full-site regression tests are claimed as completed in this file.**

## External user test protocol (5 people total)
Ask each participant to:
1. Open the public `/demo` page and explain what GREENInvest does.
2. Complete the guided steps and navigate to a relevant tool.
3. Try an example company search and describe the financial/ESG results, including missing-data notices.
4. Open `/dashboard` and explain what records are shown.
5. Try an educational chat question and a direct stock recommendation request. Confirm the appropriate guardrail appears.

For **each of the five users**, document:
- Tester ID (no personal identifying information), role/experience, and test date.
- Exact task and what they said or did (do not invent quotations).
- Finding: confusion, error, success, accessibility issue, or unexpected behavior.
- Change: specific action, including commit reference, or reason for not changing.
- Retest: what happened after the change, with actual screenshot evidence.

| Tester | Test date | Task | Observation / actual feedback | Finding | Change / commit | Retest evidence |
| --- | --- | --- | --- | --- | --- | --- |
| User 1 | Pending | Pending | Pending | Pending | Pending | Pending |
| User 2 | Pending | Pending | Pending | Pending | Pending | Pending |
| User 3 | Pending | Pending | Pending | Pending | Pending | Pending |
| User 4 | Pending | Pending | Pending | Pending | Pending | Pending |
| User 5 | Pending | Pending | Pending | Pending | Pending | Pending |

## Full-site regression checklist
Mark the result only after testing the deployed build.

| Route / workflow | Verification | Result | Screenshot / notes |
| --- | --- | --- | --- |
| `/` | Company search and financial/environmental result or clear error state | Pending | |
| `/core` | Generate, save and reload Core output | Pending | |
| `/research` | Explore research, filters, save and reload | Pending | |
| `/product` | Page loads and product details remain visible | Pending | |
| `/pricing` | Scenario calculation, save and reload | Pending | |
| `/marketing` | Marketing assets and user-scoped saving still work | Pending | |
| `/chat` | Intake, data lookup, checkpoint, financial-advice guardrail, feedback save | Pending | |
| `/dashboard` | Available records, loading/empty/error states, no private chat exposure | Pending | |
| `/docs` | Prompt and build links open correctly | Pending | |
| `/demo` | Guided steps, all links, map, impact, testing and roadmap visible | Pending | |
| Site-wide | Desktop/mobile navigation and keyboard usability | Pending | |

## Iteration log (test → finding → change → retest)
| Date | Test and tester | Finding / exact evidence | Change and commit | Retest and evidence |
| --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending |

## Submission evidence checklist
- Week 6 GitHub commit screenshots showing **correct dates**, and repository URL.
- At least 2 verified Vercel deployments, including one after changes.
- `/demo` public URL opens at submission time.
- Supabase screenshots with record values, **without personal data or secrets**.
- Coding prompt log with at least 5 actual prompts; do not retroactively invent them.
- Five external user test results + one real improvement + retest.
- 5-minute screen-recorded demo and link.
- 150–250-word human decision note and UX implementation note.
