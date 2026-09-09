# GREENInvest Week 1

GREENInvest combines financial and environmental information for selected Mexican public companies.

## This week's environmental scope

- Support CEMEX, Grupo Bimbo, Walmart de México, América Móvil and FEMSA.
- Keep environmental data separate from financial indicators.
- Store verified annual emissions data in Supabase.
- Prefer official company annual/sustainability reports.
- Cross-check with BMV disclosures when available.
- Keep Climate TRACE as an independent reference.
- Show year and source with every environmental result.
- Compare each company's emissions trend over time rather than ranking very different industries only by absolute emissions.

## Current status

The repository now includes a Next.js base, a five-company search interface, an environmental data model, a Supabase schema and source documentation.

No emissions values are hard-coded until they are verified from public sources.

## Next step

Load verified annual Scope 1 and Scope 2 records into Supabase and connect those rows to the result cards.
