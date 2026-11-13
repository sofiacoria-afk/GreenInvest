# GREENInvest — Week 6 Testing and Iteration Record

## Status
**Five external participants submitted feedback**, reported by the project owner. The answers are self-reported; individual task completion, test dates, screenshots and successful retests have not yet been independently verified. **Full-site regression is not yet complete**; the Home financial search and restored environmental results have been confirmed by the project owner.

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
| User 1 | Not supplied | Invited to tour, company search, dashboard/docs, chat | Answered yes to understanding and ease of use; reported nothing broken; suggested **“put name of company instead of ticker”** | Make company selection clearer for non-experts | Implemented company-name dropdown with optional manual ticker, commit `67cd634`; live retest pending | Pending |
| User 2 | Not supplied | Same invitation; individual tasks unconfirmed | “Me gusta mucho el concepto de la empresa, especialmente para financieros como yo en donde puedes ver el valor y flujos de todas las empresas públicas, lo que más me gustó fue su GUIDED ASSISTANT, ya que hace que la página sea más clara” | Positive reaction to the concept and guided experience; no specific defect reported | Keep the guided experience; no corrective change requested | Not required unless changed |
| User 3 | Not supplied | Same invitation; individual tasks unconfirmed | Understood: yes; easy navigation: yes; failures: no; **“top dashboard for smartphone version takes up too much space”** | Mobile top navigation/header uses too much screen space | Initial collapsible mobile navigation in commit `67cd634`; user reported that all buttons still appeared on a phone. Added explicit 767px mobile/desktop CSS rules and device viewport in commit `fa6a96a`; user-provided phone screenshot confirms menu opens; original tester has not retested | Screenshot supplied in conversation; retest by original tester pending |
| User 4 | Not supplied | Same invitation; individual tasks unconfirmed | Understood: yes; easy navigation: yes; failures: no; **“I like it as it is”** | Positive feedback; no issue reported | No change needed | Not required unless changed |
| User 5 | Not supplied | Same invitation; individual tasks unconfirmed | Understood: yes; easy navigation: yes; everything worked; **“it has to much information and it is repetitiva in some aspects, it has more information about the platform than about the actualo product”** | Repetitive explanatory copy obscures product value | Shortened copy in Home/Demo, removed duplicate Home links, added Product CTA, commit `67cd634`; live retest pending | Pending |

**Interpretation:** Four participants explicitly answered that navigation was easy (Users 1, 3, 4 and 5); User 2 gave positive general feedback without answering each question. All five expressed understanding or positive feedback about the concept, but these comments alone do not verify each guided task. Three actionable opportunities were reported: company-name labels, mobile header size and excessive explanatory text.

**Changes made from feedback:** The three improvements were implemented in [commit `67cd634`](https://github.com/sofiacoria-afk/GreenInvest/commit/67cd634239ac7a00153858af9cd220e92238fceb). Company names are now offered as examples rather than a comprehensive company-name search; other tickers remain available manually. The mobile menu is collapsed on narrow screens, and explanatory text was shortened to emphasize product functions.

**Evidence still needed:** test dates, anonymized feedback screenshots if available, which tasks were actually performed, a successful Preview deployment and documented live retests. Do not claim these steps were completed before collecting them.

## Changes based on external feedback

| Test | Finding | Code change | Retest status |
| --- | --- | --- | --- |
| User 1 | Tickers are less intuitive than company names | Home company-name selector with six examples + manual ticker fallback | Selector visible in user screenshot; original tester follow-up pending |
| User 3 | Mobile header takes too much space; first version still showed links on a phone | Added explicit viewport and mobile CSS after the report (commit `fa6a96a`) | Project owner supplied phone screenshot showing the Menu button and expanded links; original tester retest pending |
| User 5 | Too much repetitive platform text | Simplified Home and Demo copy; removed duplicate navigation; linked to Product | Pending user feedback |

The named selector, compact mobile menu and revised Home content were observed in subsequent screenshots. The project owner also confirmed the mobile layout was fixed. **Original external testers have not provided separate follow-up retests.**

## Additional mobile visual review
The project owner supplied a phone screenshot showing that the collapsible menu is visible and opens. The same screenshot revealed horizontal overflow/cut-off Home content. Commit `31da00a` adjusts responsive heading, content grid, button and company selector widths. The project owner later confirmed that the responsive mobile adjustment worked; keep a final screenshot for evidence.

## Full-site regression checklist
Mark the result only after testing the deployed build.

| Route / workflow | Verification | Result | Screenshot / notes |
| --- | --- | --- | --- |
| `/` | Company search and financial/environmental result or clear error state | Passed by project owner | Named company and financial results appeared in screenshots; owner confirmed environmental data returned after paired Supabase public fallback in `b15cad1`. Capture final environmental result for evidence. |
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

Testing dates were not provided. **Verified** means observed in user-provided screenshots or explicitly confirmed by the project owner; it does not mean an independent repeat by the original tester.

| Test / source | Finding / evidence | Change made / GitHub commit | Retest / status |
| --- | --- | --- | --- |
| 1. Company selection — User 1 | Tickers were confusing for beginners; requested company names. | Added example-company names with ticker values and optional manual ticker entry. [Commit `67cd634`](https://github.com/sofiacoria-afk/GreenInvest/commit/67cd634239ac7a00153858af9cd220e92238fceb). | Project owner screenshots show named selector and successful financial searches. Original tester follow-up not received. |
| 2. Mobile navigation — User 3 | Top navigation took too much room on a smartphone; first menu attempt still showed links. | Created compact expandable menu and reinforced it with explicit responsive CSS and device viewport. [Commit `fa6a96a`](https://github.com/sofiacoria-afk/GreenInvest/commit/fa6a96a0bd7405764e425eebd08480ee5f1752c7). | Project owner provided mobile screenshot showing Menu button and expanded links. Original tester follow-up not received. |
| 3. Mobile Home layout — regression | Phone screenshot revealed cut-off heading, text and action button. | Adjusted Home typography, grid, spacing and select widths for narrow screens. [Commit `31da00a`](https://github.com/sofiacoria-afk/GreenInvest/commit/31da00a90fe33d9d16aebd9d86ec21e66411cf0c). | Project owner subsequently reported mobile issue resolved; no independent screenshot of final closed layout was recorded. |
| 4. Product focus — User 5 | Information felt repetitive and described the platform more than the actual product. | Shortened Home/Demo descriptions, removed duplicate Home links and highlighted Product. [Commit `67cd634`](https://github.com/sofiacoria-afk/GreenInvest/commit/67cd634239ac7a00153858af9cd220e92238fceb). | Newer Home copy and Product call-to-action visible in screenshot; User 5 has not independently retested. |
| 5. Documentation — internal review | Docs displayed only Weeks 1 and 5 and relied on external source links. | Embedded Weeks 1–6 directly, simplified heading and overview. [Commit `172ba8e`](https://github.com/sofiacoria-afk/GreenInvest/commit/172ba8ea139872bde2fba1af26fe77184e2f950b). | User reviewed revised structure; functional Back-button test still pending. |
| 6. Guided Demo — internal review | Product, Pricing and Marketing were not individually visible in original five-step tour. | Expanded to eight guided steps and clarified introduction. [Commit `95f7d42`](https://github.com/sofiacoria-afk/GreenInvest/commit/95f7d428b75fb94105f322b6d9f253f690f0dd24). | Code verified in repository; all eight links and actions still require deployed regression. |
| 7. Agent Map and return navigation — internal review | Flow direction and return navigation from Docs/Dashboard could be clearer. | Added directional arrows and shared Back to previous page behavior. [Commit `95f7d42`](https://github.com/sofiacoria-afk/GreenInvest/commit/95f7d428b75fb94105f322b6d9f253f690f0dd24). | Code verified in repository; click-through retest pending. |
| 8. English consistency — regression | Some Home and API strings were in Spanish. | Changed Home copy, period labels, error messages, API messages, and document language to English. [Commit `3a8c7fe`](https://github.com/sofiacoria-afk/GreenInvest/commit/3a8c7fe53a99f61bf4b74fc0aa2de120e2dd8606). | User screenshot confirmed English Home and financial results. |
| 9. Environmental data outage — regression | Financial results displayed, but environmental results returned Supabase configuration unavailable. | Added same-project public Supabase connection fallback and paired URL/key handling; no emissions rows or calculation logic were changed. [Commit `b15cad1`](https://github.com/sofiacoria-afk/GreenInvest/commit/b15cad1f9cf1bb2af7c86691098ddd5275f8ff19). | PASS reported by project owner: emissions returned after new deployment. Preserve final working-result screenshot for PDF. |
| 10. Guided experience — Users 2 and 4 | Both supplied positive feedback; neither identified a specific defect. | No corrective change was necessary for these two reports. | No corrective retest required; their responses alone do not verify every task. |

## Regression finding: environmental configuration and language
- **Observed:** CEMEX financial information returned in Preview; environmental response said the database was not connected. This indicates missing Supabase public URL/anon key in that deployment, not missing emissions rows. Confirm Preview environment scope and redeploy before judging data availability.
- **Observed:** Home and financial/environmental API text remained in Spanish. Updated Home, API messages and the document language to English in [commit `3a8c7fe`](https://github.com/sofiacoria-afk/GreenInvest/commit/3a8c7fe53a99f61bf4b74fc0aa2de120e2dd8606).
- **Retest:** The project owner confirmed that environmental information returned after the public Supabase fallback and paired URL/key hotfix (`b15cad1`). This does not establish that the Vercel environment configuration itself was repaired; the fallback remains in use when needed.

## Submission evidence checklist
- Week 6 GitHub commit screenshots showing **correct dates**, and repository URL.
- At least 2 verified Vercel deployments, including one after changes.
- `/demo` public URL opens at submission time.
- Supabase screenshots with record values, **without personal data or secrets**.
- Coding prompt log with at least 5 actual prompts; do not retroactively invent them.
- Five external user test results + one real improvement + retest.
- 5-minute screen-recorded demo and link.
- 150–250-word human decision note and UX implementation note.
