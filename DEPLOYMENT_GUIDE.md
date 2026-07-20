# Scoops — Go-Live Guide

Everything you need to get the site live, for free, in one place. Follow
these in order — each step depends on the one before it.

Total time: about 20–30 minutes.

---

## What you'll end up with

- A live website your customers can visit and book a table on
- An admin dashboard only you can log into, to manage those bookings
- A database that keeps your reservation data safe permanently

---

## Step 0 — Get the code onto GitHub

GitHub is a free place to store your code — Render and Netlify both pull
your site directly from there, which is what makes the automatic setup in
the later steps possible.

1. Go to **[github.com/signup](https://github.com/signup)** and create a
   free account (skip if you already have one).
2. Go to **[github.com/new](https://github.com/new)** to create a new
   repository.
   - Name it `scoops-website`
   - Leave it **Public** (Render/Netlify's free tiers need this) or
     **Private** if you'd rather — both work with the free tiers you're
     using here.
   - Don't check any of the "initialize with" boxes.
   - Click **Create repository**.
3. On the next page, GitHub shows you commands under "…or push an
   existing repository from the command line." Open a terminal, `cd` into
   the unzipped `scoops` folder, and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/scoops-website.git
   git push -u origin main
   ```
   (Replace `YOUR-USERNAME` with your actual GitHub username — GitHub
   shows you the exact command with this already filled in, on that same
   page, easiest to copy from there directly.)

If `git` isn't installed, get it from
**[git-scm.com/downloads](https://git-scm.com/downloads)** first.

---

## Step 1 — Create your database

Link: **[neon.tech](https://neon.tech)**

1. Click **Sign up** (GitHub sign-in is fastest since you already have an
   account now).
2. Click **Create a project**. Name it `scoops`. Leave the other defaults
   as-is. Click **Create project**.
3. On the project page, find the **Connection string** box. Click to
   reveal/copy it. It looks like:
   ```
   postgresql://neondb_owner:AbC123xyz@ep-cool-name-12345.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. **Paste this somewhere safe** (a notes app) — you'll need it in Step 2.

You do not need to create tables or run any SQL — the app does that by
itself the first time it connects.

---

## Step 2 — Deploy the backend

Link: **[vercel.com](https://vercel.com)**

Vercel hosts both your backend and frontend for free, with no credit card
required — we'll deploy them as two separate projects from the same repo.

1. Click **Sign Up**, choose **Continue with GitHub**, and authorize
   Vercel to see your repos.
2. On the dashboard, click **Add New…** → **Project**.
3. Find `scoops-website` in the list and click **Import**.
4. Before deploying, expand the settings:
   - **Root Directory:** click Edit, choose `server`
   - **Framework Preset:** leave as detected (Other/Node.js)
5. Expand **Environment Variables** and add:
   | Key | Value |
   |---|---|
   | `DATABASE_URL` | the Neon connection string from Step 1 |
   | `ADMIN_PASSWORD` | a password you make up, e.g. `Scoops!2026Secure` |
   | `ADMIN_TOKEN` | any random string, e.g. `x7f9k2m4q8w1z5` |

   Write down `ADMIN_PASSWORD` — that's what you'll use to log into the
   admin dashboard later.
6. Click **Deploy**. Wait for it to finish (about a minute).
7. Click into the deployment's **Logs** (or **Runtime Logs** after it's
   live) and confirm you see:
   ```
   Storage: Postgres (persistent)
   ```
   If you instead see "local data.json," go to **Settings →
   Environment Variables** and double-check `DATABASE_URL` was saved
   correctly, then redeploy from the **Deployments** tab.
8. At the top of the project page, copy your live backend URL — it looks
   like:
   ```
   https://scoops-website.vercel.app
   ```
   **Save this** — you need it in the next step. (If the name clashes
   with the frontend project you're about to create, Vercel will suffix
   it automatically — just copy whatever URL it actually shows you.)

---

## Step 3 — Deploy the website (frontend)

Still on Vercel:

1. Click **Add New…** → **Project** again.
2. Import `scoops-website` a second time — Vercel allows deploying the
   same repo as multiple independent projects.
3. Set:
   | Field | Value |
   |---|---|
   | Root Directory | `client` |
   | Framework Preset | Vite (should auto-detect) |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
4. Expand **Environment Variables** and add:
   | Key | Value |
   |---|---|
   | `VITE_API_URL` | your backend URL from Step 2, no trailing slash |
5. Click **Deploy**. Wait a minute or two for the build to complete.
6. Vercel gives you a live link like:
   ```
   https://scoops.vercel.app
   ```
   **That's your live website.** Open it and click around.

---

## Step 4 — Test it for real

1. Visit your live link, go to **Reserve a Table**, and submit a test
   booking with your own email.
2. Go to `your-live-link.vercel.app/admin`, log in with the
   `ADMIN_PASSWORD` you set in Step 2.
3. Confirm your test reservation shows up. Try confirming, cancelling,
   and deleting it so you know how it works before customers start
   using it.

---

## Optional — a custom domain

Once you're happy with the `.vercel.app` link, you can point a real
domain (e.g. `scoopsicecream.com`) at it:

1. Buy the domain from a registrar — e.g.
   **[namecheap.com](https://namecheap.com)** (~$10–15/year).
2. In Vercel, open the **frontend** project → **Settings → Domains** →
   add your domain, and follow the DNS instructions shown (usually a
   couple of records to add at Namecheap).
3. Vercel auto-issues a free HTTPS certificate once DNS is connected —
   no extra cost.

---

## Quick reference — all your links in one place

| What | Link |
|---|---|
| Your code | github.com/YOUR-USERNAME/scoops-website |
| Database dashboard | [neon.tech](https://neon.tech) |
| Backend + frontend dashboard | [vercel.com](https://vercel.com) |
| Backend live URL | (from Step 2.8) |
| **Your live website** | (from Step 3.6) |
| Admin dashboard | your-live-website-url `/admin` |

---

## If something breaks

- **Reservation form doesn't submit / error toast appears:** almost
  always means `VITE_API_URL` on the frontend project doesn't exactly
  match your backend project's URL — check for typos or a missing/extra
  trailing slash, then redeploy the frontend.
- **Admin login says incorrect password:** double check what you set as
  `ADMIN_PASSWORD` on the backend project — it's case-sensitive.
- **Deploy fails on Vercel:** click into the failed deployment, the
  error is almost always shown near the bottom of the build log — happy
  to help debug if you paste it here.
