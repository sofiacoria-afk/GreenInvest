# Week 1 Core — Self Tests and Iteration Log

## Test 1 — GREENInvest investment idea
Input:
- Title: GREENInvest Core Test 1
- Description: Help beginner investors organize financial and environmental information before researching a company.
- User: Beginner investors

Expected result:
- Structured Core output appears.
- Save succeeds.
- Saved result appears in the dashboard preview.

Result: PASS. A saved record was created in Supabase.

## Test 2 — Student research idea
Input:
- Title: Student Research Core Test 2
- Description: Help students structure a sustainability research idea before building a larger project.
- User: University students

Expected result:
- A different structured Core output is produced.
- Save succeeds.
- The result is stored separately in Supabase.

Result: PASS. A second saved record was created in Supabase.

## Test 3 — Empty form validation
Input:
- Leave one or more required fields empty.

Expected result:
- The page shows a clear validation message.
- No invalid record is saved.
- The page does not break.

Result: PASS by implementation review. The Generate Core handler checks all three required fields before creating or saving an output.

## Iteration Log
Initial idea: build a more complex AI-powered generator.

Problem found: the weekly rules require free tools and do not require a paid AI API. A paid or unnecessary external model would add complexity and cost.

Change made: use a transparent rule-based simulated generator for the first version and label it clearly in the interface.

Why this is better: the feature remains testable, free, easy to explain, and still demonstrates the complete flow required by the assignment: intake → generation → structured output → save → Supabase → dashboard preview.
