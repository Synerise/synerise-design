---
name: audit-tokens
description: Audit a package's design-token requirements (read-only). Produces a per-component, per-usage inventory of every theme.palette / hex / rgba / shadow / opacity value with a description of what it styles and a semantic-vs-module decision (and which module), plus flags for svg fill/stroke CSS rules to convert and static theme imports to fix. Feeds the apply-tokens skill. Writes TOKEN_AUDIT.md.
---

## Overview

**Read-only planning pass.** This skill does **not** change component source — it produces the
decision-ready inventory that the [`apply-tokens`](../apply-tokens/SKILL.md) skill then executes. For a
package (or a batch), it catalogues every tokenisable value and, for each one, records **what it styles**
and **which token should replace it** (semantic layer, or a module namespace — and which). It also flags two
recurring cleanups: `svg { fill/stroke }` CSS rules that should become `currentColor`, and static `theme`
imports that should be `useTheme()` (or dropped).

Think of the token migration as two skills:

| Skill | Direction | Mutates code? | Output |
|---|---|---|---|
| **audit-tokens** (this) | *decide* what each value should become | **No** | `TOKEN_AUDIT.md` — per-usage decision table |
| **apply-tokens** | *do* the migration for one component | Yes | code edits + updates the status-doc trio |

### How it relates to the existing token docs

- `TOKEN_AUDIT.md` (this skill) — **before** work: per-**usage** rows with a *decision* column. Planning.
- `UNTOKENISED_COMPONENTS.md` — per-**component** module-vs-semantic decision + ✅/🚧 flags. `apply-tokens` maintains it.
- `TOKEN_USAGE_BY_COMPONENT.md` — **after** work: as-built inventory of *remaining* palette + *applied* tokens.
- `TOKENISATION_STATUS.md` — summary table + detailed reports of what's been migrated.

Keep the audit and these docs distinct: the audit says *what should happen*; the trio records *what happened*.

## Arguments

One argument: the component/package name (kebab-case dir under `packages/components/`, e.g. `date-picker`),
**or** `all` / a space-separated list to batch-audit. If omitted, ask which package(s) to audit, or offer
to audit every not-yet-fully-tokenised package listed in `UNTOKENISED_COMPONENTS.md`.

## Output artifact — `TOKEN_AUDIT.md` (repo root)

One `## <component>` section per audited package, updated in place on re-run. **Always keep the sections
sorted alphabetically by component name** — when adding or updating a section, place/keep it in alphabetical
order (and keep the "Audited packages" index table in the same order). Each section has:

**1. Summary line** — palette/hex/rgba count, module namespace available (yes/no + name), recommended
overall decision (module / semantic / mixed / defer), and any blockers (`.less` present, Monaco, dynamic-only).

**2. Palette / colour usage table** — one row per tokenisable value:

| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|

- **Current value** — `grey-700` / `#f52922` / `rgba(...)` / `0.4` (opacity) / a `box-shadow` value.
- **Applied to** — the short description the user reads to understand the row: *what element, which CSS
  property, which state*. E.g. "`ClearIcon` — icon colour, default+hover" or "`Root` bg — focus".
- **Static / Dynamic** — **Dynamic** = user-supplied (`customColor`, `color` prop, computed `` `${c}-600` ``);
  these stay on palette and are **not** defects. **Static** = a fixed design value → tokenisable.
- **Decision** — `semantic` · `module` · `defer (planned module)` · `keep (dynamic)` · `keep (decorative)`.
- **Suggested token or module** — the concrete `var(--ds-…)` for semantic; the namespace for module
  (`module: form`, `module: <self>`); for a planned namespace, name it (`module: dropdown (planned)`).

**3. SVG fill/stroke rules to replace** — table: `file:line` · current rule · replacement (wrapper `color` /
`<Icon color>` / inherited `currentColor`). See Step 5.

**4. Static `theme` imports** — table: `file:line` · usage · resolution (remove if the value is being
tokenised; convert to `useTheme()` if it must stay on palette). See Step 6.

## Workflow

### Step 1 — Resolve scope

One package → audit it. `all` / a list → loop; for a large batch, fan out with subagents (one
`general-purpose` or `Explore` agent per package, each returning its section as structured text) and
aggregate — keep the per-package section the unit of work. In batch mode, skip packages already **✅ fully
tokenised** in `UNTOKENISED_COMPONENTS.md`; **🚧 partial** ones are in scope (audit the remainder).

### Step 2 — Load the live token layers (verify at run time — they change)

Tokens are synced from upstream and evolve between runs. Do **not** trust names recorded here or in any doc.

1. Read the **top-level keys** of `packages/tokens/tokens/modules/base.json` → the authoritative list of
   components that have a **module namespace** (~28). Kebab names may differ from the package
   (`status-pill`↔`status`, `progressbar`↔`progress-bar`, …); `form` spans `form`/`input`/`checkbox`/
   `radio`/`switch`/`select`.
2. Confirm the actual CSS vars **and resolved values** in `packages/tokens/dist/css/light.css`
   (`grep -- '--ds-<ns>-' …`). Resolve each candidate token's chain to its final hex so Step 4 can flag shifts.

This determines, per component, whether a module layer exists and which roles it covers.

### Step 3 — Scan the source (read-only)

Scan `packages/components/<name>/src`, **excluding** `__specs__/` · `*.spec.*` · `*.test.*` · `*.figma.*` ·
`*.stories.*` · `dist/` · `lib/`. Catalogue every occurrence with `file:line`:

```bash
P=packages/components/<name>/src
# palette lookups (static + dynamic)
grep -rn "theme\.palette" $P --include="*.ts" --include="*.tsx" | grep -v __specs__
# hardcoded hex / rgba in styled-components (ignore .svg files)
grep -rniE "#[0-9a-f]{3,8}\b|rgba?\(" $P --include="*.ts" --include="*.tsx" | grep -v __specs__
# elevation + rings
grep -rn "box-shadow" $P --include="*.ts" --include="*.tsx" | grep -v __specs__
# opacity
grep -rn "opacity" $P --include="*.ts" --include="*.tsx" | grep -v __specs__
# svg fill/stroke CSS rules (Step 5) — CSS declarations, not the fill="currentColor" in generated icons
grep -rnE "fill\s*:|stroke\s*:" $P --include="*.ts" --include="*.tsx" | grep -v __specs__
# static theme import (Step 6)
grep -rn "import {[^}]*\btheme\b[^}]*} from '@synerise/ds-core'" $P --include="*.ts" --include="*.tsx"
# .less still present? (blocks direct tokenisation — de-antd first)
find $P -name "*.less"
```

### Step 4 — Classify each usage and decide its token

For every colour/shadow/opacity value from Step 3, fill one table row. Decide the layer with the
**granularity rule** (most specific existing layer; never a primitive; never author a module token) plus the
**role heuristics** below.

**Static vs dynamic first.** If the value is user-supplied or computed (`customColor`, a `color`/`iconColor`
prop, `` `${x}-600` ``) → Decision `keep (dynamic)`, stays on `theme.palette`. Decorative
gradients/transparent overlays → `keep (decorative)`. Everything else is a static design value → tokenise.

**Role → layer/module heuristics** (verify the exact live token name in Step 2):

| Role of the value | Decision | Target |
|---|---|---|
| A role the component's **own module namespace** covers (component in `base.json`) | module | `module: <self>` → its `--ds-<ns>-*` token |
| Input / trigger **field** surface, border, text, affix, action icon, label/description/error | module | `module: form` → `--ds-form-*` by role |
| **Dropdown / overlay** surface (menu bg, border, shadow of a pop-up) | defer (planned module) | `module: dropdown (planned)` — keep palette, mark 🚧 |
| **List-item** row / option / search-result / row checkmark | defer (planned module) | `module: list-item (planned)` |
| **Calendar** grid cell (day/month/year/decade), time-window | defer (planned module) | `module: calendar (planned)` |
| Danger / clear (✕) **action icon** inside a field | semantic | `--ds-color-icon-danger-default` (no form token for this) |
| Base text / bg / border / icon, focus ring, elevation, disabled/muted opacity | semantic | `--ds-color-{text,background,border,icon}-*`, `--ds-shadows-shadow-N`, `--ds-opacity-{disabled,muted}` |
| No token at any allowed layer | unmapped | flag as a **design-tokens follow-up** |

Notes that make the audit trustworthy:
- **Defer, don't semantic-fallback**, for a surface that clearly belongs to a *planned* namespace
  (dropdown/list-item/calendar) — a semantic swap now just churns when the real tokens land. Mark it 🚧.
- **Outline-style `box-shadow: 0 0 0 Npx <color>`** is a border/focus **ring**, not elevation — only its
  colour is tokenisable (a border token); keep the geometry. Note if a field's error/focus ring is the
  visible 2px border (`border:1px` + inset ring) so `apply-tokens` won't strip it.
- **Equivalence / shift.** When you suggest a concrete token, resolve it (Step 2) and compare to the current
  value. Exact → note "exact". Different → add **⚑ shift: old → new** in Notes so the applier and Chromatic
  expect it. Do not suppress shifts.

### Step 5 — SVG fill/stroke CSS rules to replace

DS icons render `fill="currentColor"` + `color: inherit`, so they take colour from the parent's CSS `color`.
Any `svg { fill: … }` / `stroke: …` **CSS rule** (in a styled-component) is the old pattern. For each,
record `file:line`, the rule, and the replacement: set `color` on the wrapper (or pass `<Icon color=…>`) and
let the icon inherit. Distinguish from the `fill="currentColor"` **attribute** inside generated `.svg`/icon
components — that is correct, not a finding.

### Step 6 — Static `theme` imports vs `useTheme()`

`import { theme } from '@synerise/ds-core'` is the **static** default theme — it ignores `ThemeProvider`
overrides, so it should never remain for a palette lookup (typically inline `<Icon color={theme.palette[…]}>`).
This is different from styled-components' `props.theme.palette[…]`, which is provider-aware and fine. For each
static usage record `file:line` and the resolution: **remove** it when the value is being tokenised to a
`var(--ds-…)` (icon/element takes the token directly); **convert to `useTheme()`** when the value must stay on
palette (dynamic / no token).

### Step 7 — Write `TOKEN_AUDIT.md`

Create or update the component's `## <component>` section (summary line + the three tables from the Output
section). Keep other sections intact. Order sections alphabetically. If the file doesn't exist, create it with
a short header explaining it's the read-only planning artifact for the token migration and linking the trio.

### Step 8 — Report

Summarise per audited package: counts (tokenisable static / dynamic-kept / decorative / unmapped); the
recommended overall decision (module / semantic / mixed / defer) and, if module, whether the namespace exists
or must be requested upstream; SVG-rule and static-`theme` counts; blockers (`.less`, Monaco, dynamic-only);
and any **design-tokens follow-ups** (roles with no token at any layer). Point the user at `apply-tokens
<component>` as the next step to execute the audit.

## Guardrails

- **Read-only.** Never edit component source in this skill. The only file written is `TOKEN_AUDIT.md`.
- **Never recommend a primitive** (`--ds-color-grey-700`) or authoring a new module token — this repo is
  consume-only; a "module" decision for a missing namespace is a request to UX/Token Studio.
- **Dynamic and decorative values are not defects** — record them as `keep`, don't propose tokens for them.
- **Re-derive the token set every run** — names/values change; treat any names in this file as examples.
