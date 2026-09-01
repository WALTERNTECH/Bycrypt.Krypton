# Bycrypt

Automated crypto trading & custody platform. Two Next.js apps sharing one
Supabase project:

| App | Path | Who uses it | Hosting |
| --- | --- | --- | --- |
| Web | `apps/web` | Depositors | Spaceship (cPanel + Passenger) |
| Admin | `apps/admin` | Staff | Render |

## Brand

Deep navy carries the structure, white is the app chrome and primary
text, yellow is reserved for action. Green and red are left alone — in
trading they mean up and down, and restyling them for a palette would
cost comprehension for decoration.

| Token | Value | Use |
| --- | --- | --- |
| `base` | `#071429` | Page |
| `surface` → `surface-3` | `#0C1E3A` → `#1A3660` | Elevation ladder |
| `border` / `border-strong` | `#1B3355` / `#2A4A7A` | Lines |
| `brand` / `brand-hover` | `#FFC93C` / `#FFD966` | Primary buttons, mark |
| `header*` | `#FFFFFF` family | White app chrome |
| `positive` / `negative` | `#16C784` / `#F6465D` | Market direction |

Icons and store screenshots are generated from these values:

```bash
cd apps/web
npm i -D sharp
node scripts/generate-icons.mjs
node scripts/generate-screenshots.mjs
```

`sharp` is intentionally not a tracked dependency — the PNGs it emits are
committed, so nothing at build or request time needs a native binary.

## Environment

Both apps need:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY     # server-only, bypasses every RLS policy
```

The web app additionally accepts `ADMIN_APP_URL` so alert emails deep-link
to the right dashboard.

`NEXT_PUBLIC_*` values are compiled into the browser bundle at build time,
so they must be correct when `npm run build` runs. The service-role key is
read at runtime only and must never be committed or placed in a
web-readable file.

## Deploying

**Admin (Render)** — connect the repo, root `apps/admin`, build
`npm ci && npm run build`, start `npm start`. Auto-deploys on push.

**Web (cPanel/Passenger)** — needs a self-contained bundle:

```bash
cd apps/web
BUILD_STANDALONE=1 \
NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  npm run build
node scripts/package-cpanel.mjs      # -> dist-cpanel/
```

Upload the *contents* of `dist-cpanel/` into the Node.js app root, set
`SUPABASE_SERVICE_ROLE_KEY` in the panel, and restart. Don't run NPM
Install — `node_modules` is bundled.

The generated `app.js` clears `HOSTNAME` before delegating to Next's
server: CloudLinux sets it to the physical machine's hostname, and Next
binds to whatever it finds there, which fails with `EADDRNOTAVAIL`.

## Money rules

Anything that moves a balance runs inside a single Postgres function, not
a sequence of client calls — an interrupted two-step once left a deposit
marked confirmed with the wallet never credited.

- `confirm_deposit` — status flip, wallet credit, referral bonus, one transaction
- `buy_investment` — debits wallet, opens a position, enforces one at a time
- `cash_out_investment` — credits principal + profit, closes the position
- `set_wallet_balance` — absolute correction, read-modify-write server-side

Position profit is computed server-side from exchange data at close time
and **never** read from the request body — a client-supplied figure would
let anyone mint balance. Support's `accrued_return` acts as a floor: the
larger of it and the market profit settles.

`secure_config` (RLS on, no policies — service-role only) holds mail
credentials and the alert address. `platform_config` is world-readable by
design and must never hold a secret.

## Not yet configured

- Supabase project (schema lives in `supabase/migrations`)
- Domain, TRC20 receiving address, Telegram support link — set from Admin → Config
- Mail provider for alert emails — set from Admin → Config
- Android TWA build (no signing key generated for Bycrypt yet)
