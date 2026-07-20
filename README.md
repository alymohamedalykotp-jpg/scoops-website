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
with this — it fixes the one real gap in the free demo setup (reservation
data getting wiped on redeploy) using services that are free permanently,
not just free trials.

**The stack:**
- **Neon** — free Postgres database, data persists forever (doesn't expire
  like some "free trial" databases)
- **Render** — free backend hosting
- **Netlify** — free frontend hosting

### Step 1 — Create the database (Neon)

1. Go to [neon.tech](https://neon.tech) → sign up free → **Create a
   project** (call it `scoops`).
2. On the project dashboard, copy the **connection string** — it looks
   like `postgresql://user:password@ep-xxxx.neon.tech/neondb?sslmode=require`.
   Keep this handy for the next step.

You don't need to create any tables — the backend does that automatically
the first time it connects.

### Step 2 — Deploy the backend (Render)

Same as before, but now add one more environment variable:

1. Push `scoops` to a GitHub repo.
2. [render.com](https://render.com) → **New + → Blueprint** → connect your
   repo (it reads `render.yaml` automatically).
3. Set these environment variables when prompted:
   - `DATABASE_URL` = the Neon connection string from Step 1
   - `ADMIN_PASSWORD` = a password you choose
   - `ADMIN_TOKEN` = any random string you choose (e.g. mash the keyboard)
4. Deploy. Check the logs — you should see `Storage: Postgres
   (persistent)`. If you instead see the "local data.json" message, the
   `DATABASE_URL` variable wasn't picked up — double check it's set.
5. Copy your backend's URL, e.g. `https://scoops-api.onrender.com`.

### Step 3 — Deploy the frontend (Netlify)

Same as the general instructions below: connect the repo, base directory
`client`, build command `npm run build`, publish directory `client/dist`,
and set `VITE_API_URL` to your Render URL from Step 2.

That's it — this combination has no expiration dates and no data loss on
redeploy, at $0/month. The only trade-offs of the free tiers:

- Render's free web service spins down after ~15 minutes of no traffic;
  the next request wakes it up in ~30–50 seconds. Fine for a new business
  getting occasional bookings; if that delay ever bothers customers, a
  paid Render instance (~$7/mo) removes it.
- Neon's free tier is generous for a single shop (plenty of storage and
  requests for reservation data) and doesn't have a spin-down delay.

When you're ready for a custom domain (`scoopsicecream.com` instead of the
`.netlify.app` address), that's a small paid step — buy the domain
(~$10–15/year from somewhere like Namecheap) and point it at Netlify;
Netlify's own hosting stays free.

## General deployment reference

## Deploying a live demo link

You need two deployments: the backend (API) on a Node host, and the
frontend (static site) on a static host. Both have free tiers.

### 1. Deploy the backend to Render

1. Push this `scoops` folder to a GitHub repo (Render deploys from GitHub).
2. Go to [render.com](https://render.com) → sign up/log in → **New +** →
   **Blueprint** → connect your repo. Render will detect `render.yaml` in
   this folder and configure the service automatically.
   - No GitHub repo yet? In Render, you can also do **New + → Web Service**
     manually: set root directory to `server`, build command `npm install`,
     start command `npm start`.
3. When prompted, set the environment variables `ADMIN_PASSWORD` and
   `ADMIN_TOKEN` to your own values (don't leave the defaults on a public
   demo).
4. Once deployed, copy the URL Render gives you, e.g.
   `https://scoops-api.onrender.com`.

   Note: Render's free tier spins the service down after inactivity (the
   first request after a while takes ~30s to wake up) and its free disk is
   not persistent across deploys, so reservation data may reset when you
   redeploy. Fine for a demo; upgrade to a paid instance + persistent disk
   for anything real.

### 2. Deploy the frontend to Netlify (or Vercel)

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import
   an existing project** → connect the same GitHub repo.
2. Set:
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/dist`
3. Under **Environment variables**, add:
   - `VITE_API_URL` = the Render backend URL from step 1 (no trailing
     slash), e.g. `https://scoops-api.onrender.com`
4. Deploy. Netlify gives you a live link like
   `https://scoops-yourname.netlify.app` — that's your demo link.

(Vercel works the same way — same settings, just on Vercel's dashboard.)

### No GitHub yet?

Netlify also supports **drag-and-drop deploys** for the frontend only: run
`npm run build` in `client/` locally, then drag the resulting `client/dist`
folder onto [app.netlify.com/drop](https://app.netlify.com/drop). That
gets you a live link fast, but you'd still need the backend deployed
somewhere (Render) and `VITE_API_URL` set before building, since drag-and-
drop deploys can't set environment variables after the fact — set it in a
local `.env` file (copy `.env.example`) before running the build.

### Keeping the admin password safe

Make sure to set your own `ADMIN_PASSWORD` and `ADMIN_TOKEN` values on
Render rather than using the defaults (`scoops2026` / `scoops-admin-token`)
— those are only meant for local testing.
