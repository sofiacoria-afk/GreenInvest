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
