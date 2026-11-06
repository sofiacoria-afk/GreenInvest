# Week 5 — UX Iteration Log

## User-requested changes (after first live review)
- Moved **How it works** from the sidebar to a prominent four-step section above the chat.
- Added a broader green/teal/sky/amber palette with improved visual hierarchy.
- Added a highlighted **Chat** navigation item at the far right of the /chat header.
- Replaced the unclear safety tester with an explanation, two sample questions, explicit **Check safety response** action, and separate refusal/educational outputs.
- Added an original vector illustration of market trends in the header. It is explicitly labeled as decorative, not real financial data.
- Improved the keyword-based guardrail to recognize simple English and Spanish financial advice requests.

## Human decisions and trade-offs
The market image is an original vector illustration instead of an external stock photo. This keeps the page lightweight and avoids third-party image dependencies, although it looks more illustrative than photographic. Safety checking stays deterministic rather than claiming to be a real AI investment advisor; this is easier to explain and test but cannot detect every unsafe phrasing. The original three intake questions, educational disclaimer and data-saving feature remain within scope.

## Verification still required
- Check deployment build is **Ready** after these commits.
- Visit /chat in a fresh browser window and verify layout on desktop and mobile.
- Test guardrail with "Which stock should I buy?" (should refuse) and "What does ESG mean?" (should direct to guided flow).
- Complete three software tests and three external user tests, record evidence and post-test improvements.
- Record exact build/deployment references before stating tests passed.

## Iteration — connect chat to GREENInvest financial results
The original guided chat displayed the Human Checkpoint immediately after the third selection, before showing the main results. After reviewing this experience, the student requested a more useful sequence: show the original financial data and environmental indicators for the selected company, then show the educational Human Checkpoint. The app now calls the same existing /api/stock and /api/environment endpoints used on the homepage. The combined card shows available one-year financial performance and reported Scope 1+2 emissions context, with explicit unavailable states. General ESG selections show only educational guidance instead of a misleading company-price card.

**Trade-off:** The educational information is visible before acknowledgment, but follow-up links, saving and feedback remain behind the Human Checkpoint. This preserves a human confirmation before proceeding with actions while allowing visitors to understand what they are acknowledging. No personalized buy/sell advice is offered.

**Testing still required:** Verify current Yahoo Finance availability and symbol mapping for each of the five companies, verify environmental missing-data handling, verify the checkpoint appears after results and blocks follow-up actions, and verify Supabase saves and mobile layout after Vercel deploy.
