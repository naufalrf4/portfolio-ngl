# Cloudflare Pages deployment

This repository is deployed as a standalone Cloudflare Pages project for `ngl.naufalrf.net`.

## Build settings

- Build command: `bun install --frozen-lockfile && bun run build`
- Build output: `.svelte-kit/cloudflare`
- Bun version: `BUN_VERSION=1.4.3` is pinned in `wrangler.toml`; `packageManager` is also pinned in `package.json`.
- Wrangler project: `naufalrf-ngl` (`wrangler.toml`)

`CF_PAGES=1` selects the Cloudflare adapter. Without that Pages build variable, the app selects SvelteKit's Node adapter for the parent repository's VPS rollback Compose service. The included `Dockerfile` builds this repository independently for the VPS fallback runtime.

Non-secret values in `wrangler.toml` are the source of truth for both Preview and Production. Set `ADMIN_INTERNAL_API_TOKEN` as a Pages secret and `PUBLIC_TURNSTILE_SITE_KEY` to the public widget key; never commit either value.

Set these for both Preview and Production, using the correct URL for each environment:

| Variable | Kind | Purpose |
|---|---|---|
| `ADMIN_API_URL` | server variable | `https://admin.naufalrf.net`; server actions and analytics call Admin. |
| `ADMIN_INTERNAL_API_TOKEN` | secret | Least-privilege Admin token for server-side log shipping. Never expose to browser code. |
| `PUBLIC_TURNSTILE_SITE_KEY` | public value | Turnstile site key; configure its widget to allow `ngl.naufalrf.net`. |
| `PUBLIC_GA_MEASUREMENT_ID` | public value | Optional Google Analytics measurement ID. |
| `PUBLIC_CURSOR_WS_URL` | public value | `wss://admin.naufalrf.net/presence/ws`; Traefik routes this path to the internal Live Presence service. |

Admin must allow `https://ngl.naufalrf.net` as a public origin, and Live Presence must allow it for browser WebSocket connections. Add exact Preview origins to those allowlists before testing cross-host calls; do not add broad wildcard origins. `connect-src` follows `PUBLIC_CURSOR_WS_URL`. Keep the Turnstile secret on Admin only, and use ignored `.dev.vars` for Wrangler local secrets.

Verify submission, server-side Turnstile validation, analytics forwarding, runtime Admin configuration, and absence of service tokens from browser assets on Preview before changing DNS.
