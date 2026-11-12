# GREENInvest — Week 6 Testing and Iteration Record

## Status
**Five external participants submitted feedback**, reported by the project owner. The answers are self-reported; individual task completion, test dates, screenshots and successful retests have not yet been independently verified. **Full-site regression is still pending.**

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
| User 1 | Not supplied | Invited to tour, company search, dashboard/docs, chat | Answered yes to understanding and ease of use; reported nothing broken; suggested **“put name of company instead of ticker”** | Make company selection clearer for non-experts | Proposed: show company names alongside ticker symbols; not implemented | Pending |
| User 2 | Not supplied | Same invitation; individual tasks unconfirmed | “Me gusta mucho el concepto de la empresa, especialmente para financieros como yo en donde puedes ver el valor y flujos de todas las empresas públicas, lo que más me gustó fue su GUIDED ASSISTANT, ya que hace que la página sea más clara” | Positive reaction to the concept and guided experience; no specific defect reported | Keep the guided experience; no corrective change requested | Not required unless changed |
| User 3 | Not supplied | Same invitation; individual tasks unconfirmed | Understood: yes; easy navigation: yes; failures: no; **“top dashboard for smartphone version takes up too much space”** | Mobile top navigation/header uses too much screen space | Proposed: make mobile navigation more compact; not implemented | Pending |
| User 4 | Not supplied | Same invitation; individual tasks unconfirmed | Understood: yes; easy navigation: yes; failures: no; **“I like it as it is”** | Positive feedback; no issue reported | No change needed | Not required unless changed |
| User 5 | Not supplied | Same invitation; individual tasks unconfirmed | Understood: yes; easy navigation: yes; everything worked; **“it has to much information and it is repetitiva in some aspects, it has more information about the platform than about the actualo product”** | Repetitive explanatory copy obscures product value | Proposed: shorten repeated text and highlight product-specific information; not implemented | Pending |

**Interpretation:** Four participants explicitly answered that navigation was easy (Users 1, 3, 4 and 5); User 2 gave positive general feedback without answering each question. All five expressed understanding or positive feedback about the concept, but these comments alone do not verify each guided task. Three actionable opportunities were reported: company-name labels, mobile header size and excessive explanatory text.

**Evidence still needed:** date(s) of testing, anonymized feedback screenshots if available, which tasks each participant actually performed, the commit(s) implementing selected improvements, and a documented retest. Do not claim these steps were completed before collecting them.

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
| `/docs` | Six weeks of documentation display and Back button works | Pending | |
| `/demo` | Guided steps, all links, map, impact, testing and roadmap visible | Pending | |
| Site-wide | Desktop/mobile navigation and keyboard usability | Pending | |

## Iteration log (test → finding → change → retest)
| Date | Test and tester | Finding / exact evidence | Change and commit | Retest and evidence |
| --- | --- | --- | --- | --- |
| Date not supplied | User 1 | Ticker labels confusing; suggested company names | Proposed; no change yet | Pending |
| Date not supplied | User 3 | Mobile top navigation takes too much space | Proposed; no change yet | Pending |
| Date not supplied | User 5 | Text feels repetitive and platform-focused | Proposed; no change yet | Pending |

## Submission evidence checklist
- Week 6 GitHub commit screenshots showing **correct dates**, and repository URL.
- At least 2 verified Vercel deployments, including one after changes.
- `/demo` public URL opens at submission time.
- Supabase screenshots with record values, **without personal data or secrets**.
- Coding prompt log with at least 5 actual prompts; do not retroactively invent them.
- Five external user test results + one real improvement + retest.
- 5-minute screen-recorded demo and link.
- 150–250-word human decision note and UX implementation note.
