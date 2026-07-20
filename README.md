# Scoops — Website, Reservations & Admin Dashboard

A full website for Scoops (ice cream + coffee shop) with a working table
reservation system and a password-protected admin dashboard to manage
incoming reservations.

## What's inside

```
scoops/
├── client/     React + Vite + Tailwind frontend
└── server/     Express backend (reservations API + admin auth)
```

- **Home** — hero, photo gallery built from your shop photos, calls to action
- **Menu** — full menu, organized by category
- **Reservations** — public form that books a table
- **Staff Login → Dashboard** (`/admin`) — view, confirm, cancel, or delete
  reservations

## Running it locally

You need [Node.js](https://nodejs.org) 18+ installed. Open two terminal
windows/tabs.

**Terminal 1 — start the backend:**

```bash
cd server
npm install
npm start
```

This starts the API on `http://localhost:4000` and creates a `data.json`
file the first time it runs — that's where reservations are stored. No
external database needed.

**Terminal 2 — start the frontend:**

```bash
cd client
npm install
npm run dev
```

This starts the site on `http://localhost:5173`. The frontend automatically
forwards `/api/...` requests to the backend on port 4000 (see
`client/vite.config.js`), so just visit `http://localhost:5173`.

## Admin dashboard

Go to `http://localhost:5173/admin` and log in.

- **Default password:** `scoops2026`
- Change it by setting an environment variable before starting the server:

  ```bash
  ADMIN_PASSWORD="your-new-password" npm start
  ```

The dashboard lets you filter reservations by status (pending / confirmed /
cancelled), confirm or cancel a booking, refresh the list, and delete old
entries.

**Note on the demo auth:** this uses one shared password for all staff
(no individual accounts), which is fine for a single-location shop trying
this out, but isn't meant for production use as-is. If you want individual
staff logins or stronger security before putting this on a public server,
that's a reasonable next step.

## Editing the menu

Open `client/src/data/menuData.js`. It's plain JavaScript objects — no
build tooling needed to change it. Add, remove, rename, or re-price any
item and save; the Menu page picks it up automatically.

**Important:** the prices currently in that file are best-guess
placeholders. The photos of your chalkboard menus were too low-resolution
to read the exact numbers reliably, so please check every price against
your actual menu boards before publishing the site. If you send higher-
resolution photos of the boards, the prices can be corrected precisely.

## Editing photos

Shop photos live in `client/src/assets/`. To swap one out, replace the file
(keep the same name) or add a new import wherever it's used — mainly in
`client/src/pages/Home.jsx`.


## Setting up for real business use (100% free)

This is the recommended path if you're actually going to take bookings
with this — it fixes the one real gap in a bare-bones demo (reservation
data getting wiped) using services that are free permanently, not just
free trials, and don't require a credit card.

**The stack:**
- **Neon** — free Postgres database, data persists forever
- **Vercel** — free hosting for both the backend (as serverless
  functions) and the frontend (static site) — no credit card required

### Step 1 — Create the database (Neon)

1. Go to [neon.tech](https://neon.tech) → sign up free → **Create a
   project** (call it `scoops`).
2. On the project dashboard, copy the **connection string** — it looks
   like `postgresql://user:password@ep-xxxx.neon.tech/neondb?sslmode=require`.
   Keep this handy for the next step.

You don't need to create any tables — the backend does that automatically
the first time it connects.

### Step 2 — Deploy the backend to Vercel

1. Push this `scoops` folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → sign up (GitHub sign-in is
   easiest) → **Add New… → Project** → import your repo.
3. Set:
   - **Root Directory:** `server`
   - Framework Preset: leave as detected (Other / Node.js)
4. Expand **Environment Variables** and add:
   - `DATABASE_URL` = the Neon connection string from Step 1
   - `ADMIN_PASSWORD` = a password you choose
   - `ADMIN_TOKEN` = any random string you choose
5. Click **Deploy**. Once it finishes, open the **Logs** for the
   deployment and confirm you see `Storage: Postgres (persistent)`.
6. Copy your backend's URL, e.g. `https://scoops-api.vercel.app`.

### Step 3 — Deploy the frontend to Vercel

1. Back on Vercel, **Add New… → Project** again, same repo (Vercel lets
   you deploy the same repo twice as separate projects).
2. Set:
   - **Root Directory:** `client`
   - Framework Preset: Vite (should auto-detect)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add environment variable:
   - `VITE_API_URL` = your backend URL from Step 2 (no trailing slash)
4. Click **Deploy**. Vercel gives you a live link like
   `https://scoops.vercel.app` — that's your live website.

That's it — this combination has no expiration dates, no data loss on
redeploy, and no card on file, at $0/month. The only trade-off: Vercel's
free serverless functions have a short execution timeout (10s) per
request, which is far more than this app ever needs.

When you're ready for a custom domain (`scoopsicecream.com` instead of
the `.vercel.app` address), that's a small paid step — buy the domain
(~$10–15/year from somewhere like Namecheap) and attach it under the
frontend project's **Settings → Domains** in Vercel; Vercel's own hosting
stays free.

## Quick redeploy reference

- **Backend:** Vercel project with root directory `server`, env vars
  `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_TOKEN`.
- **Frontend:** Vercel project with root directory `client`, build
  command `npm run build`, output directory `dist`, env var
  `VITE_API_URL` pointing at the backend project's URL.
- Pushing to the `main` branch on GitHub automatically redeploys both.

### Keeping the admin password safe

Make sure to set your own `ADMIN_PASSWORD` and `ADMIN_TOKEN` values on
Vercel rather than using the defaults (`scoops2026` / `scoops-admin-token`)
— those are only meant for local testing.
