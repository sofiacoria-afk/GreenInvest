# Environmental feature test plan

Run these checks before calling the feature complete:

1. Search CEMEX, Grupo Bimbo, Walmart de México, América Móvil and FEMSA by name or ticker.
2. Confirm unsupported companies show a clear message instead of breaking the page.
3. Confirm every environmental record includes reporting year, unit and source.
4. Confirm annual trend labels are calculated only when two comparable yearly values exist.
5. Confirm no fake emissions values appear anywhere in the interface.
6. After Supabase is connected, verify one saved row for each company and confirm the displayed values match the cited annual report.
7. Run `npm run build` before Vercel deployment.
