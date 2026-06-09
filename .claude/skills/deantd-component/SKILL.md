---
name: deantd-component
description: Migrate a design-system component off Ant Design to a DS-native styled-components implementation. Encodes the playbook + refinements from the Badge/Typography migrations so each subsequent component is faster. Use when removing antd from a `@synerise/ds-*` package (the antd-removal initiative).
---

## Overview

Remove the `antd` dependency from one `@synerise/ds-*` component, replacing it with a DS-native
implementation (styled-components + `@synerise/ds-core` tokens) while **preserving the visual look and
the public API as closely as possible**. This skill is the distilled process from the first migrations
(Badge, Typography) — follow it to shorten the cycle.

Initiative context: `docs/adr/0001-remove-antd-dependency.md` (decision + tier order) and
`docs/antd-migration-status.md` (per-component status). Both live on the `docs/antd-removal` branch.
`ds-table` is out of scope.

## Arguments

The component (kebab-case dir under `packages/components/`), e.g. `switch`, `avatar`, `alert`.
If not given, ask which component, and check the status tracker for its tier/notes.

---

## Phase 1 — Scope & API analysis (do this FIRST, before any code)

The biggest win is trimming the API to what's actually used. antd-wrapping DS components usually do
`Props = Omit<AntXProps, …> & { …DS props }`, which drags in dozens of unused antd props.

1. Read the component's `src` (component, `*.types.ts`, `*.styles.tsx`, `index.ts`, spec, `style/*.less`).
   Note: antd component import(s), the `Omit<AntXProps>` inheritance, any antd LESS import
   (`@import '~antd/lib/<comp>/style/index.less'`), and any **public re-export of antd** (e.g. switch's
   `RawSwitch`, typography's default export).
2. Fan out **Explore agents** (one per repo) to find real usage across the consumers:
   `portal-ui-bridge1`, `portal-next`, `universal-list1`, plus DS-internal (`synerise-design1`, excluding
   the package itself; report storybook separately). For each, collect **which props / sub-components /
   antd-only features are actually passed** (count occurrences + example paths).
3. Build the keep/drop list:
   - A prop used by **any** consumer must stay.
   - **Figma Code Connect** mappings (`*.figma.tsx`) count as documented API even if app usage is ~0.
   - antd-only features with zero usage are drop candidates (e.g. Typography `Link`/`copyable`/`editable`,
     Badge `showZero`/`size`/`title`).
   - **Surface contradictions**: if the data shows a "drop candidate" is actually used (e.g. Badge
     `customColor` drove per-row segment colours), say so — don't drop a live feature.
4. Present the drop list to the user and confirm. Decide breaking-vs-back-compat for any public antd
   re-export (default: keep back-compat — reimplement as DS-native preserving the consumed API).

---

## Phase 2 — Branch setup

```bash
cd synerise-design1 && git checkout -q refactor/deantd-<comp> 2>/dev/null \
  || git checkout -b refactor/deantd-<comp> master
```
(The tier-1 branches already exist. Branch off master.)

---

## Phase 3 — Implementation patterns (refined)

**Keep DOM + class hooks, style with styled-components.**
- Reproduce antd's DOM and keep the `ant-<comp>-*` class names **on the elements** (ui-tests select by
  them; interim external CSS / sibling selectors like ds-avatar's `& ~ .ant-badge-dot` rely on them).
- **Emit `ds-<comp>-*` classes side-by-side with the `ant-<comp>-*` ones** on every element — e.g.
  `className="ant-badge-count ds-badge-count"`, wrapper `ant-badge ds-badge`, status
  `ant-badge-status-active ds-badge-status-active`. The `ds-*` hooks are the long-term selectors; the
  `ant-*` ones are temporary and get removed once ui-tests / external CSS migrate to the `ds-` namespace.
  (Map `ant-scroll-number*` → `ds-<comp>-scroll-number*`; leave non-`ant-` classes like `current` as-is.)
- **Do NOT style via class selectors** (neither `ant-*` nor `ds-*`). Use first-class styled-components
  (one per element: `Wrapper`, the indicator(s), inner text spans, …). Confirm afterwards:
  `rg "ant-|ds-<comp>" <comp>/src/*.styles.tsx` returns nothing.

**styled-components conventions:**
- Pass styling props as **transient `$`-props** (`$status`, `$flag`, …) so they don't leak to the DOM —
  no destructure-and-strip wrapper needed.
- Type the theme via `ThemeProps` from `@synerise/ds-core` (its `['theme']` for the value). **Not**
  styled-components' `DefaultTheme` — it's unaugmented here, so a bare `DefaultTheme` annotation breaks
  `theme.palette` (without an annotation styled-components treats it as `any`, which is why the rest of
  the codebase compiles).
- Inline antd's base component LESS into the styled-components and **delete** the `style/index.less` +
  its `import './style/index.less'`. Make the component self-contained — don't rely on antd's global
  reset (e.g. Typography headings had no `margin-bottom` of their own; antd's reset provided it, so set
  it explicitly).

**API / types:**
- Replace `Omit<AntXProps>` with an explicit, hand-written props type listing only kept props.
- Drop `antd` type imports (e.g. `TitleProps` → `HTMLAttributes<HTMLHeadingElement>`).
- Add `data-*` / `aria-*` passthrough on the outer wrapper via `PassthroughAttributes` from
  `@synerise/ds-utils`, **intersected** with own props (`OwnProps & PassthroughAttributes`) so it doesn't
  constrain them.
- For colour props that accept palette tokens, resolve `theme.palette[token]` but **fall back to the raw
  value** so any CSS colour/hex works; type as `LiteralStringUnion<Color>` (ds-utils) for autocomplete +
  any-string.
- **Match antd's prop placement** when it matters — read antd's source in `node_modules/.pnpm/*antd*/es/<comp>`
  to replicate behaviour. (Badge: antd applies the consumer's `style` to the **indicator** element, not
  the wrapper — so `style={{backgroundColor,color}}` recolours the count.)

**Reuse, don't duplicate:**
- Where a DS component already exists, compose with it (Typography's default export became
  `{ Title, Text, Paragraph }` built from the DS components — not a reimplementation).
- For a removed display feature, add a small DS-native replacement export rather than pushing layout CSS
  onto consumers (Badge `text` → `BadgeWithLabel`, which owns the dot↔label alignment). **Prefer keeping
  the consumer API untouched**: rather than make consumers swap component, re-expose the original prop on
  the main component and delegate to the replacement when it's set — Badge renders `BadgeWithLabel` when
  `text` is present, else the core badge — so no consumer call-site migration is needed. If the
  replacement also renders the main component, extract the shared renderer into a `<Comp>Core` file that
  both import, or you create a `<Comp> ↔ <Replacement>` import cycle. Verify with
  `pnpm --filter @synerise/ds-<comp> run check:circular-dependencies` (madge → "No circular dependency").
- Keep public antd re-exports back-compat (reimplement `RawSwitch` / Typography default as DS-native with
  the same consumed surface).
- Give sub-elements explicit colours (e.g. a label → `grey-600`) rather than inheriting the parent's.

**package.json:** remove `antd` from `peerDependencies`. If you add a workspace dep (e.g. `ds-utils`),
add it under `dependencies` as `workspace:^`.

---

## Phase 4 — Verify (after edits, and after the lint-staged pre-commit reformat)

```bash
cd synerise-design1
pnpm --filter @synerise/ds-<comp> run types     # tsc --noEmit
pnpm --filter @synerise/ds-<comp> test           # vitest
pnpm exec eslint --fix packages/components/<comp>/src
pnpm --filter @synerise/ds-<comp> build          # vite + dts
rg "from 'antd'|import 'antd'|require\('antd'|~antd" packages/components/<comp>/src   # → empty
rg "antd" packages/components/<comp>/package.json                                     # → empty
```
Also typecheck a few DS-internal consumers against the rebuilt dist (pre-existing `ds-alert` "dist not
built" errors are unrelated — ignore them).

**Tests:** rewrite the spec to the new DOM/API (drop tests for removed props); add regression tests for
each refinement decision. Test behaviour via the kept class names (`.ant-<comp>-*`) and `toHaveStyle`
(works for SC-injected styles in jsdom). There are usually no snapshot files.

**Environment gotchas (these cost time — watch for them):**
- After editing a **shared** package (e.g. `ds-utils`): `pnpm --filter @synerise/ds-<shared> build` so its
  `dist` updates, or consumer `tsc`/tests resolve a stale dist.
- **Switching branches can unlink a workspace dep** that only exists on this branch's `package.json` →
  re-run `pnpm install`, then rebuild the shared dep. Symptom: `Cannot find module '@synerise/ds-utils'`
  + cascading `any`/index-type errors.
- The **lint-staged pre-commit hook reformats** files (eslint --fix + prettier) and folds the changes into
  the commit — re-Read files before further edits.

---

## Phase 5 — Docs & stories (same branch)

- Update the component `CLAUDE.md` + `README.md` (props table, removed-props note, structure).
- Update **Storybook stories** that used removed props (they're eslint-ignored but must still compile for
  the storybook build) and any `*.figma.tsx` Code Connect mappings.
- Update `docs/antd-migration-status.md` (on `docs/antd-removal`) — mark the component done + MR link.

---

## Phase 6 — Consumer migration (separate repos)

Dropped props break consumer call sites once they bump the new DS version. Migrate them on a
`refactor/deantd-<comp>` branch **in each consuming repo** (mainly `portal-ui-bridge1`). These compile
against both old + new where the change is back-compat. Hold the consumer MR until the DS version
publishes. **A prop you re-exposed for back-compat (e.g. Badge `text`) needs no consumer change** — if you
already migrated those call sites, revert them (restore the original prop usage; keep genuinely-removed
prop changes like `color`→`customColor`). Use `git checkout origin/master -- <file>` for files whose only
change was that now-unnecessary migration.
- puib's local **eslint 7 crashes under Node 24** — rely on CI; if the pre-commit hook crashes, commit
  with `--no-verify` (note it).

---

## Phase 7 — Commit, push, MR (per `/push-mr` conventions)

- Conventional commits. If you use a scope it **must be a component name** from the DS commitlint enum
  (e.g. `refactor(badge): …`) — a **Jira ID is NOT a valid scope** (the commit-msg hook rejects it).
  Scope is optional (`refactor: …` also passes). Add a `BREAKING CHANGE:` footer when public API/visuals
  change (drives the semantic-release MAJOR bump). **No `Co-Authored-By` lines.**
- **Jira:** the initiative is Epic **STOR-2321** (project `STOR`, base `https://hgintelligence.atlassian.net`,
  Basic auth `$JIRA_EMAIL:$JIRA_TOKEN` — see the `ds-release` skill). Each component has a STOR task
  (mapped in `docs/antd-migration-status.md`). Link it in the **MR description** as `Resolves task: STOR-XXXX`
  — the `ds-release` changelog tooling reads it from the description, **not** the title scope. (puib puts
  `(JiraTaskId)` in the title; the DS repo does **not**.)
- Push (SSH), HTTPS-token fallback if SSH times out:
  ```bash
  git push origin refactor/deantd-<comp> || \
    (source ~/.zshrc; git push "https://oauth2:${GITLAB_PERSONAL_TOKEN}@gitlab.synerise.com/Frontend/synerise-design.git" refactor/deantd-<comp>)
  ```
- Open the MR **authored by the user** via the GitLab API with `GITLAB_PERSONAL_TOKEN` (so it's not the
  bot), `squash=true`, `remove_source_branch=true`:
  ```bash
  source ~/.zshrc
  curl -sS --request POST --header "PRIVATE-TOKEN: $GITLAB_PERSONAL_TOKEN" \
    "https://gitlab.synerise.com/api/v4/projects/Frontend%2Fsynerise-design/merge_requests" \
    --data-urlencode "source_branch=refactor/deantd-<comp>" --data-urlencode "target_branch=master" \
    --data-urlencode "title=refactor: remove antd from ds-<comp>" \
    --data-urlencode "description=$DESC" --data-urlencode "squash=true" \
    --data-urlencode "remove_source_branch=true"
  ```
- The reviewer checks **Chromatic**. Expect iteration on visual details; verify each fix locally and
  re-push (Chromatic re-runs per push).

---

## Worked refinements from Badge (apply the analogues)

- Default colour falls back to `red-600`; consumers recolour via `status`/`customColor`/inline `style`.
- `status` alone → dot; **a present `count` wins over status-dot mode** so `status`+`count` = a coloured
  count (derive mode in one place: `isDot = dot ?? (status !== undefined && !hasCount)`).
- A **custom-node `count`** (e.g. an icon) renders bare (no count-pill background).
- `customColor` accepts palette tokens **and** raw CSS colours (hex/rgb/var).
- `data-*`/`aria-*` go on the wrapper; the consumer's `style` goes on the **indicator** (antd-faithful).
- Every element carries both `ds-badge-*` and `ant-badge-*` classes (e.g. `ant-badge-count ds-badge-count`).
- Don't keep a *pointless* pass-through file — the renderer outputs its styled tree directly. (A split
  that earns its place is fine: `Badge.tsx` is a thin wrapper that picks `BadgeWithLabel` vs `BadgeCore`
  by `text`, and the `BadgeCore` file exists specifically to break the `Badge ↔ BadgeWithLabel` cycle.)
- **Re-expose a trimmed prop to keep the consumer API untouched**: Badge kept the legacy `text` prop and
  delegates to `BadgeWithLabel` internally — so the earlier `text`→`BadgeWithLabel` consumer edits were
  reverted. When you do this, the consumer migration for that prop is unnecessary (revert it).

Typography: default export reuses the DS `Title`/`Text`/`Paragraph` (no duplication); dropped antd-only
members (`Link`, `copyable`, …) after a zero-usage audit; headings own their margin after dropping antd's
reset.
