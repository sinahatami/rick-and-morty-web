# Contributing

Thanks for helping out. This page covers the workflow; the [README](README.md) explains the architecture.

## Setup

You need Node.js 26.13 or newer and pnpm (the exact version is pinned in `package.json`).

```bash
pnpm install   # also installs the Git hooks
pnpm dev
```

## Workflow

1. Create a branch from `main`: `feat/...`, `fix/...`, `refactor/...`, `docs/...` or `chore/...`.
2. Make a focused change. Add or update tests when behavior changes.
3. Run `pnpm check`. For changes that touch pages or interaction also run `pnpm build && pnpm e2e`
   (`pnpm verify` does all of it).
4. Open a pull request against `main`. CI must be green.

### Commit messages

[Conventional Commits](https://www.conventionalcommits.org) are enforced by commitlint and drive the release
process: `feat:` publishes a minor version, `fix:` and `perf:` a patch, and a `!` after the type (or a
`BREAKING CHANGE:` footer) a major one. Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`,
`chore`, `perf`, `build`, `ci`. Keep the first line under 100 characters. Examples:

```
feat(episodes): filter by season
fix(hooks): keep other filters when the search text changes
refactor: move character components into the feature folder
```

Releases and `CHANGELOG.md` are produced by CI; do not edit the changelog by hand.

## Code conventions

- **TypeScript is strict.** Avoid `any` (the linter rejects it) and use `import type` for type-only imports
  (`eslint --fix` does it for you).
- **Prettier decides formatting** (and sorts Tailwind classes). Run `pnpm format`; the pre-commit hook does too.
- **Server components by default.** Add `'use client'` only to the files that need state, effects or event
  handlers, and keep those files small.
- **Colors come from the theme.** Use `bg-theme/10`, `text-theme-ink`, `border-theme` and friends instead of
  hard-coded hex values; put one-off overrides in a `data-theme` attribute.
- **Tailwind only sees literal class strings**, so never build class names by concatenation. Use `cn()` for
  conditional classes.
- **Accessibility is not optional.** Give every control an accessible name, keep text at 4.5:1 contrast and do
  not nest links. The end-to-end suite runs axe on every page type.
- **Links** use the helpers in `src/lib/routes.ts`. Every URL ends with a slash (`trailingSlash: true`).
- **Images from the API** (character avatars) are shown with `RemoteImage`, never with a bare `next/image`: the
  API host rate-limits bursts of requests and `RemoteImage` retries what it refuses.

## Tests

- Colocate unit tests as `Name.test.ts(x)`. Query by role, label or text, never by CSS class.
- Mock `fetch` (see `src/lib/api/client.test.ts`); unit tests never reach the network.
- End-to-end specs import `test` from `e2e/support/test.ts`: the API is mocked automatically and `openApp(path)`
  waits for hydration before you click anything. Add fixtures to `e2e/fixtures/` when a test needs more data.
  The tests serve the build on port 3100, so they can run next to `pnpm dev`.

## Data

Pages are generated from a snapshot of the API in `.cache/api` (ignored by Git). `pnpm dev` and `pnpm build`
refresh it when it is older than a day; run `pnpm data -- --force` to refresh it right now.
