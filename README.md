# NGL

SvelteKit frontend for anonymous messages at `ngl.naufalrf.net`. Submissions, analytics forwarding, and log shipping use Admin APIs; Turnstile validation remains server-side in Admin.

## Local development

This app can be run from the monorepo workspace, or as its own repository after extraction:

```sh
bun install --frozen-lockfile
cp .env.example .env
bun run dev
```

The standalone repository includes snapshots of shared `@naufalrf/*` packages under `packages/`; their source commit is recorded in `packages/UPSTREAM-SNAPSHOT.md`. Never expose the Admin service token or Turnstile secret to browser code.

Run `bun run check` and `bun run build` for Cloudflare verification. See [DEPLOYMENT.md](./DEPLOYMENT.md) for Pages settings, runtime variables, and preview checks.
