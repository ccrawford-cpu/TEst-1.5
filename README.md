# Codecraft Academy — sample three-page site

Static site (Home / About / Contact) built for a code academy exercise.
The contact form posts to a small Vercel + Resend serverless function — see
[`contact-api/README.md`](contact-api/README.md) for deploying that piece.

## Deploy to GitHub Pages

1. Create a new **empty** repo on GitHub (no README/license) — e.g. `codecraft-academy`.
2. From this folder:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch → `main` / `/(root)` → Save**.
4. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/` within a minute or two.

## Wire up the contact form

1. Deploy the function in [`contact-api/`](contact-api) (see its README).
2. Edit [`contact.html`](contact.html) and replace `YOUR_VERCEL_PROJECT` in the
   `<form action="...">` with your deployed Vercel domain.
3. Commit and push the change; GitHub Pages will pick it up automatically.
