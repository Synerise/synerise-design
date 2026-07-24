# Tokenisation — Session Context & Playbook

> **Read this first for any tokenisation work.** It holds the durable context so sessions stay short — architecture, the sync pipeline, build gotchas, conventions, and current state. The per-component *how* is in the **`apply-tokens`** / **`audit-tokens`** skills; the live per-component status is in **`TOKENISATION_STATUS.md`** (repo root). _Supersedes the original section-message pilot plan._

## What tokenisation means here
Migrate components off `theme.palette['grey-700']` / hardcoded hex / antd Less vars → **CSS custom properties** (`var(--ds-...)`) generated from the upstream design-tokens repo. Goal: one source of truth, dark-mode support, design-controlled values. No public API changes; visual output ideally unchanged (flag any shift).

## Where things live
- **`packages/tokens/`** (`@synerise/ds-tokens`) — the token build.
  - `tokens/` (committed source, synced from upstream): `primitives/core.json`; `semantic/Light.json` + `Dark.json`; `semantic/custom-color/*.json` (12 families); `semantic/dimensions.json` + `spacing.json` (**repo-local**, preserved by sync); `modules/base.json` (all module/component tokens); `$themes.json` + `$metadata.json` (Token-Studio metadata — **ignored by the build**).
  - `config/build-tokens.mjs` — custom Style Dictionary v4 build (NOT a `.config.ts`).
  - `dist/` (**gitignored**): `css/light.css` (`:root`), `css/dark.css` (`[data-ds-theme="dark"]`), plus `js/*`, `json/*`.
  - `scripts/sync-tokens.sh` (`pnpm sync`) + `scripts/ci-sync-tokens.sh` (CI worker).
- **`TOKENISATION_STATUS.md`** (repo root) — the live tracker (see below).
- **Skills**: `apply-tokens` (per-component migration), `audit-tokens` (per-component audit) — invoke for step-by-step.
- **Upstream**: design-tokens repo (`gitlab.synerise.com/Frontend/design-tokens`, Token Studio).

## Token architecture (3 tiers)
1. **Primitive** — raw scale (`--ds-color-grey-700`, `--ds-color-blue-600`). **Never consumed directly.** Not theme-swapped; dark uses a parallel `--ds-color-dark-*` set.
2. **Semantic** — role tokens that **flip by theme**: `--ds-color-{text,background,border,icon}-<role>-<variant>` (e.g. `--ds-color-background-success-subtle`, `--ds-color-text-base-default`). Light values from `semantic/Light.json` → `:root`; dark from `Dark.json` → `[data-ds-theme="dark"]`. This layer is where light/dark divergence happens.
3. **Module** — per-component: `--ds-<component>-…` (`--ds-card-header-bg`, `--ds-tooltip-surface-bg`, `--ds-form-field-bg-default`). Defined in `modules/base.json`; ~40 components have a namespace.

**Naming**: token path → `--ds-<kebab-joined-path>` (`name/ds-kebab` transform); the top-level `modules/base.json` key is the leading segment (`card` → `--ds-card-*`).

**Consume-only granularity (strict)**: prefer the component's **module** token if it exists → else a **semantic** token → **NEVER a primitive** (`--ds-color-grey-700`) directly. **Never author module tokens locally** — they're upstream-owned and arrive via sync.

## Build facts / gotchas
- Build: `pnpm --filter @synerise/ds-tokens build` (= `node config/build-tokens.mjs`). In a worktree, symlink **both** root `node_modules` **and** `packages/tokens/node_modules` (style-dictionary resolves from the latter).
- **`$themes.json` is NOT read by the build** — only `modules/base.json` + `semantic/Light|Dark.json` + `primitives/core.json` + `custom-color/*` affect emitted CSS. Editing `$themes.json` changes nothing in `dist/`.
- **Dimension tokens are NOT emitted as CSS vars** — the build keeps only `{color, boxShadow, shadow, opacity}`. So `--ds-<x>-padding` / `-radius` don't exist; keep padding/radius hardcoded or on antd.
- **`pruneUnresolvable`**: tokens whose `{ref}` doesn't resolve are silently dropped with a `⚠ pruned N token(s)` warning (not a failure). After a sync, if a var you need is missing, that warning is why — the upstream ref is broken, not the build.
- Sanity guard: the build throws if no `--ds-color-` is emitted.
- Verify a var landed: `grep -- '--ds-…' packages/tokens/dist/css/light.css`.

## Sync pipeline (upstream → DS)
- Token SOURCE (`packages/tokens/tokens/`) is **committed** in DS; `dist/` is gitignored (CI rebuilds).
- **Local**: `cd packages/tokens && pnpm sync [<branch>]` — SSH-clones design-tokens@main, `rsync --delete` into `tokens/` (preserves `semantic/dimensions.json` + `spacing.json`), then `pnpm build`. It's a **full mirror**, not a cherry-pick — review `git diff packages/tokens/tokens` and revert unintended file moves.
- **CI (automatic)**: a merge to design-tokens@main triggers a rolling sync MR (`chore/design-tokens-sync` → `chore/tokenisation`); a human reviews the Chromatic diff and merges. Sync commit `chore(tokens): sync from design-tokens@<sha>` (does not publish).
- **Golden rule**: **tokens sync first (rolling MR); consuming-code changes follow in a separate code MR.** A token rename/removal breaks only consumers of the old var — fix those in the follow-up MR (grep `--ds-<old>` across `packages/`).

## Per-component workflow (summary — use the `apply-tokens` skill for detail)
1. Audit the component's `src`: `theme.palette[...]`, hardcoded `#hex`/`rgb()`, `.less`.
2. Map each colour to a token — **exact-value first** (resolve the chain to the SAME hex → zero visual change); if none exact, closest by **role** + **FLAG the shift** (for Chromatic).
3. Roles: text→`--ds-color-text-*`, bg→`--ds-color-background-*`, border→`--ds-color-border-*`, icon→`--ds-color-icon-*`.
4. DS icons are `currentColor` — colour via the parent's `color:` (or `<Icon color=...>`), never `svg { fill }`.
5. **Keep genuinely dynamic colours on palette** (runtime `color`/`customColor`/`lineColor` props) — don't tokenise those.
6. Remove now-unused `useTheme`/`theme`/`ThemeProps` imports. Comments minimal; delete stale ones.
7. Update the component's row in `TOKENISATION_STATUS.md`.

## Branch / MR / commit conventions
- **One component per branch/MR**, branched off `chore/tokenisation`; label the MR **`tokenisation`**. (A cross-cutting convention change may be a single MR — confirm first.)
- Branch `refactor/<component>-tokens`; commit `refactor(<component>): <desc>` (component-name scope; body lines ≤100 chars). Jira → `Resolves task:` footer (not in the subject).
- **NO `Co-Authored-By` / AI-attribution / `Claude-Session` lines — ever.**
- Push + MR: `git push -o merge_request.create -o merge_request.target=chore/tokenisation -o merge_request.label=tokenisation origin refactor/<c>-tokens`.
- DS is **not strict SemVer** — breaking token/de-antd changes ship as minor/patch; don't demand a BREAKING CHANGE footer.
- Never push to master; never `git stash` bare (shared stack); never `--no-verify`.

## Worktree / commit env (mechanics that bite)
- The **Edit/Write tools are worktree-isolation-pinned** to the session's launch worktree → in any *other* worktree, edit files via **Bash/Python** (exact-string replace with count asserts), not Edit/Write. `Read` works anywhere. Subagents inherit the same pin.
- Per-component worktree: `git worktree add -b refactor/<c>-tokens <path> origin/chore/tokenisation`; `ln -s <main>/node_modules <path>/node_modules` (for husky/lint-staged/eslint). Remove after push.
- Offline `tsc` is noisy (unresolved `@synerise/*` → `TS2307` + cascade `TS7006` implicit-any) — **rely on CI** for full type/lint; the *real* errors are the non-`TS2307` ones in files you touched. Fix lint locally with `node_modules/.bin/eslint --fix <files>`.
- husky/lint-staged (eslint --fix + prettier + commitlint) run on commit — let them.

## `TOKENISATION_STATUS.md` — the live tracker
- **Unified tracking table**: one row per colour-bearing component — **Status** (✅ done · 🚧 partial · ❌ not started · ⛔ deprecated · ➖ n/a) + **Layer** (`module` if it consumes `--ds-<comp>-*`/`--ds-form-*`/etc., else `semantic`) + **Awaiting token defs / blocker**.
- Each MR updates its OWN row (merge-safe: distinct lines). The **`Totals:` line** and Layer-accuracy are a periodic consolidation pass (recompute to match the table).
- Detailed with/without-module tables + per-component reports follow.

## Established conventions / decisions
- **Section headers**: grey-500 uppercase section/group/category header labels use **`--ds-divider-header-text-color`** (= `color.text.neutral.default` = grey-500). Non-header grey-500 body text stays on `--ds-color-text-neutral-default`.
- **Categorical colours** (avatar initials, card-tabs order): per-family SET + flipping semantic tier + a `@synerise/ds-tokens/names` JS manifest (`customColorNames` / `customColors`). Avatar consumes it; card-tabs `ordered` is gated on an upstream `ordered.*` SET.
- **Card** (redesigned namespace): `variant.{white,grey,outline}`, `shadow.{raised,hover}`, `header.*` (+ `header.badge.*`), `footer.*`.
- A value shift is acceptable only when no exact token exists — **always flag it** for Chromatic review.

## Known upstream token GAPS (don't fall back to primitives — flag for the token team)
- No `--ds-color-{text,icon}-danger-hover` (red-500) — danger hover states.
- No blue-500 text/icon token (only a bg token) — focus/hover states (checkbox/radio/tabs).
- No translucent-focus token; no grey-200-translucent overlay token.
- No `--ds-tabs-item-text-focus`; no `--ds-tooltip-key-*` (key-cap bg/border/shadow).
- No `ordered.*` SET yet → card-tabs / slider categorical ordering gated.

## Current state (as of ~2026-07-24 — check `TOKENISATION_STATUS.md` for live)
- Most colour-bearing components ✅. **Blocked (no MR)**: `drawer`, `list`, `scrollbar`, `select` (`.less`/de-antd first); `tabs` (focus token), `tooltip` (key-cap token); `button-group` (translucent split-dividers, no token); `card-tabs` (design-gated redesign + `ordered` SET). Deprecated (won't tokenise): `alert`, `menu`, `table`.
- Base branch for all tokenisation work: **`chore/tokenisation`** (integrates to master via Semantic Release).

## Quick start for a new session
1. `git fetch origin chore/tokenisation`; make a worktree branch `refactor/<comp>-tokens` off it (+ node_modules symlink).
2. `/audit-tokens <comp>` (or grep `theme.palette` / hex / `.less`) → decide exact-vs-shift per value.
3. Apply edits (Bash/Python in the worktree), keeping dynamic colours on palette; drop unused theme imports + stale comments.
4. Update the component's `TOKENISATION_STATUS.md` row.
5. Commit `refactor(<comp>): …` (no attribution lines) → push with MR create + `tokenisation` label → target `chore/tokenisation`.
6. Rely on CI for type/lint; flag value shifts for Chromatic.
