# چی‌بخرم؟

A Cloudflare-native fake MVP for an opinionated Persian purchase decision engine.

## What is implemented

- TanStack Start + React
- Cloudflare Vite plugin / Workers deployment
- SSR-friendly Persian RTL UI
- One decisive recommendation, explicit downside, contextual alternatives
- POST `/api/recommend` server route
- `/go/:slug` outbound redirect route (future affiliate tracking point)
- `/health` endpoint
- Fake deterministic catalog/recommendation engine so the UX is testable before product ingestion exists
- D1 schema ready for query/click/product storage
- Mobile responsive and reduced-motion accessibility support

## Run

```bash
npm install
npm run dev
```

Production-like preview:

```bash
npm run build
npm run preview
```

Deploy:

```bash
npm run deploy
```

Cloudflare officially supports TanStack Start on Workers via the Cloudflare Vite plugin. `wrangler deploy` handles deployment.

## Add D1 when we wire real persistence

```bash
npx wrangler d1 create chibekharam-db
```

Copy the generated `database_id` into the commented `d1_databases` block in `wrangler.jsonc`, then:

```bash
npx wrangler d1 migrations apply chibekharam-db --local
npx wrangler d1 migrations apply chibekharam-db --remote
npm run cf-typegen
```

The MVP intentionally does not depend on D1 yet: fake recommendations continue working before provisioning any Cloudflare resource.

## Next real implementation steps

1. Obtain an approved Affilio/Digikala catalog source.
2. Ingest normalized products into D1 (or move catalog search to a dedicated index only after scale requires it).
3. Add Workers AI only for intent extraction into a strict JSON schema; never let the model invent price/spec/rating/availability.
4. Replace deterministic `recommend()` with hard filters + category-aware ranking.
5. Store queries and outbound clicks in D1 inside the API/redirect routes.
6. Convert the `/go/:slug` destination into the Affilio deep link.
7. Add permanent SEO recommendation routes backed by the same recommendation engine.

## Deliberate Cloudflare choices

**Use now:** Workers, TanStack Start, observability.  
**Prepared:** D1.  
**Later if earned:** Workers AI + AI Gateway, Queues/Cron for catalog refresh, R2 for normalized images, Vectorize only if semantic retrieval proves useful.

No KV, Durable Objects, Workflows, R2, Queues, or Vectorize in V0 just because they exist.
