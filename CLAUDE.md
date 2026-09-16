# CLAUDE.md

Running notes on this project, kept as we go.

## What this is

Codecraft Academy — a fictional coding bootcamp, built as the "three-page
site with a working contact form" exercise. Three pages (Home / About /
Contact), a contact form that validates server-side, persists to Postgres,
and sends two emails.

## Stack decisions

- **Next.js (App Router, TypeScript)** — needed one framework that could
  serve pages and a server-side API route from a single Vercel deploy.
  Started as a static HTML/CSS/JS site on GitHub Pages; rebuilt once the
  full requirements (server-side Zod, Drizzle/Neon, dual emails) came in,
  since GitHub Pages can't run server code.
- **Zod** for request validation in `app/api/contact/route.ts` — the only
  validation that's trusted; client-side is just UX, not the source of truth.
- **Drizzle ORM + `@neondatabase/serverless` (neon-http driver)** — schema
  lives in `lib/schema.ts`, one table (`contact_submissions`). Pushed with
  `npm run db:push` (`drizzle-kit push`), no migration files checked in yet.
- **Resend** for email — one call to notify the site owner
  (`CONTACT_TO_EMAIL`), a separate call to confirm receipt to whoever
  submitted the form. Both are fired with `Promise.allSettled` so one
  failing doesn't block the other, and the DB write happens before either
  email so we never lose a submission if Resend has an outage.

## Infrastructure

- Neon project `codecraft-academy` (id `misty-rain-63141604`), database
  `codecraft`, created fresh rather than reusing the account's existing
  "first project" to avoid mixing data.
- GitHub repo: `https://github.com/ccrawford-cpu/TEst-1.5` (originally set
  up for the GitHub Pages version; kept as the source repo, though Pages
  itself is no longer the deploy target — Vercel is).
- Deployed to Vercel at: _pending — filled in once deployed_.

## Gotchas hit along the way

- Local git had cached GitHub credentials for a different account
  (`calebcrawford1102-dot`) than the repo owner (`ccrawford-cpu`). Fixed by
  adding it as a collaborator and clearing the cached credential
  (`git credential reject`) to force re-auth with correct scope.
- Vercel CLI on this machine isn't logged in — deploy/env steps that need
  browser auth have to be run by the user in their own terminal.

## Env vars (see `.env.example`)

`DATABASE_URL`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` —
all in `.env.local` (gitignored), set again in Vercel's project settings
for production.
