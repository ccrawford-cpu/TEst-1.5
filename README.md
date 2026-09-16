# Codecraft Academy

A three-page site (Home / About / Contact) for a fictional coding bootcamp,
built with Next.js. The contact form validates on the server with Zod,
saves each submission to a Neon Postgres database through Drizzle, and
sends two emails via Resend: a notification to the site owner and a
confirmation to whoever submitted the form.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript) — pages + API route, deployed on [Vercel](https://vercel.com)
- [Zod](https://zod.dev) — server-side request validation
- [Drizzle ORM](https://orm.drizzle.team) + [Neon](https://neon.tech) (serverless Postgres) — persistence
- [Resend](https://resend.com) — transactional email

## Running it locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in:
   - `DATABASE_URL` — a Neon connection string
   - `RESEND_API_KEY` — from resend.com/api-keys
   - `CONTACT_FROM_EMAIL` — a verified Resend sender, or `onboarding@resend.dev` for testing
   - `CONTACT_TO_EMAIL` — where form notifications should land
3. Push the database schema:
   ```bash
   npm run db:push
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`.

## Deploying

```bash
npx vercel login
npx vercel link
npx vercel env add DATABASE_URL production
npx vercel env add RESEND_API_KEY production
npx vercel env add CONTACT_FROM_EMAIL production
npx vercel env add CONTACT_TO_EMAIL production
npx vercel --prod
```

## Project structure

```
app/
  page.tsx            Home
  about/page.tsx       About
  contact/
    page.tsx           Contact (server component, renders the form)
    ContactForm.tsx     Client component: submit + success/error UI
  api/contact/route.ts  POST handler: Zod validate -> Drizzle insert -> Resend x2
lib/
  schema.ts             Drizzle table definition
  db.ts                 Drizzle client (neon-http driver)
  validation.ts          Zod schema shared by the API route
  email.ts               Resend notification + confirmation senders
```
