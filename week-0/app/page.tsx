"use client";

import { useMemo, useState } from "react";
import { supportedCompanies } from "../lib/environmental";

export default function Home() {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return supportedCompanies;
    return supportedCompanies.filter(
      (item) => item.company.toLowerCase().includes(q) || item.ticker.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <main className="container">
      <p className="eyebrow">GREENInvest</p>
      <h1>Financial + environmental information in one place</h1>
      <p className="subtitle">
        Search the first five companies in the prototype. Environmental records will use verified annual company reports as the primary source.
      </p>

      <section className="searchBox">
        <label htmlFor="company-search">Search company or ticker</label>
        <input
          id="company-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Example: CEMEX or BIMBOA.MX"
        />
      </section>

      <section className="cards">
        {matches.map((item) => (
          <article className="card" key={item.ticker}>
            <div>
              <p className="label">Company</p>
              <h2>{item.company}</h2>
              <p className="ticker">{item.ticker}</p>
            </div>
            <div className="impact">
              <p className="label">Environmental impact</p>
              <p className="pending">Awaiting verified annual emissions data</p>
              <p className="note">Planned indicators: Scope 1, Scope 2, annual change and reporting source.</p>
            </div>
          </article>
        ))}
        {matches.length === 0 && (
          <div className="card">
            <p>This company is not available in the current GREENInvest prototype.</p>
          </div>
        )}
      </section>
    </main>
  );
}
