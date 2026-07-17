# Design Token Migration Status

Tracks the progress of migrating components from `theme.palette` / hardcoded values to CSS custom properties generated from the Token Studio design tokens in `packages/tokens/`.

> **Token sync `66dddd0a` (design-tokens@66dddd0a, "semantic restructure v2", 2026-07-17).** Lands via rolling
> MR !3723 → `chore/tokenisation`; consuming-code fixes land in a follow-up code MR.
> **Breaking token renames — fixed in code:** app-menu `icon-defsult`→`icon-default`; popconfirm module
> `popcornfirm`→`popconfirm`; inline-alert icons restructured leaf→branch
> (`--ds-inline-alert-icon-{variant}-default` + new `-hover`).
> **New tokens adopted:** inline-alert `-hover` (exact-match to the old green/yellow/red/grey-700 hovers, zero
> visual change), stepper `warning` state (`--ds-stepper-step-{circle-border,circle-content,label}-warning`),
> progress-bar `--ds-progressbar-bar-fill-default`.
> **Value-only diffs (flow through the sync, no code):** section-message warning/informative `borderTop`
> (#ffc300 / grey-600), toast informative border+desc, app-menu lighter separators+border (grey-100) and
> grey-500 header, modal mask, stepper full state realignment, progress-bar cleanups, avatar `text.disabled`
> bug-fix (now resolves to grey-400).
> **Changelog ahead of merged tokens:** Tabs `text.focus` (`--ds-tabs-item-text-focus`) and semantic
> `color.focus.base.subtle` are **not** in `66dddd0a` — kept deferred, flagged to UX. progress-bar multivalue
> slot colours + not-stacked bg have no code application point (colours are caller-supplied `val.color`) —
> deferred pending an API decision.
> **CI:** the `sync_tokens` push failure was the expired `ds-tokens-sync-bot` PAT (2026-07-04); `PUSH_TOKEN`
> rotated, sync re-run green.

> **`.less` audit correction (2026-07-17).** Verified the doc's `.less` claims against the filesystem: **only 9
> packages still contain `.less`** — `alert`, `code-snippet`, `core`, `drawer`, `list`, `menu`, `scrollbar`,
> `select`, `table`. The `.less` files for the form family (`input`/`checkbox`/`radio`/`switch` — **but not**
> `select`), `pagination`, `popconfirm`, `avatar`, `autocomplete`, `badge`, `banner`, `input-number`, `search`,
> `sidebar`, `typography` were **removed** (deantd) after the original assessment; their styling now lives in
> styled-components (`.styles.ts`). **Consequence:** the "deferred pending the antd Less decision" blocker no
> longer applies to those components — they are now plain styled-components that can be tokenised directly. The
> `Less?` columns and stale per-component notes are corrected below. Notably `pagination` is **no longer
> "blocked"** — it now has `Pagination.styles.ts` (12 `theme.palette` refs, 0 tokens), ready to tokenise against
> its 18 emitted `--ds-pagination-*` module tokens.
> Of the 9 packages that still have `.less`, **`alert`, `menu`, `table` are deprecated** (slated for
> removal/replacement) and will **not** be tokenised; `core` is infrastructure (not a UI component). Only
> `code-snippet`, `drawer`, `list`, `scrollbar`, `select` remain as genuine `.less`-bearing tokenisation targets.

> **Token sync `e0301675d` (design-tokens@1cd43721, 2026-06-08).** Cherry-picked onto this branch.
> Value-only re-point of `modules/base.json` (58 refs changed, 14 `separator` tokens added, none
> removed). Affects already-migrated code in two places: **divider** line colours (the previous
> "Lighter" diffs are now resolved — see below) and **button** `primary-danger`/`primary-success`
> focus rings (red/green → brand-blue). Radio dot/hover and secondary/ghost button values also changed
> but live in deferred styled-component states / deferred variants (radio `.less` has since been removed —
deantd; notes refreshed below). No token referenced in code
> was renamed or removed, so nothing fell back.

## Legend

| Symbol | Meaning |
|--------|---------|
| :white_check_mark: | Fully applied — component uses CSS vars for this category |
| :construction: | Partially applied — some values migrated, others remain |
| :x: | Not yet started |
| :heavy_minus_sign: | N/A — component does not use this category or has no tokens defined for it |

## Token granularity (consume-only)

Pick the most specific layer that exists; never go below semantic:

- **Module tokens** (`--ds-<component>-*`) for the ~28 components that have them in `ds-tokens`
  (`modules/base.json` top-level keys). Use them where they fit.
- **Semantic tokens** (`--ds-color-*`, `--ds-shadows-shadow-N`, `--ds-opacity-*`) for everything else,
  and for any value a module token doesn't cover.
- **Never** use primitives (`--ds-color-grey-700`) directly, and **never** author new module tokens in
  this repo — they are owned upstream and arrive via the token sync.

Icons: DS icons are `fill="currentColor"` with `color: inherit`, so colour them via the parent's CSS
`color` (or `<Icon color=...>`) — no direct `svg { fill/stroke }` rules.

> **Count caveat:** the per-component ref counts below are approximate. They include `customColor`-style
> dynamic overrides and legacy dead code that won't migrate, and the `hex`/`opacity` figures for the
> SVG-heavy packages (`flag`, `icon`, `avatar`, `core`) are SVG colour attributes, **not** tokenisable
> in Phase 1. Live `theme.palette` ref counts also drift slightly from earlier audits (e.g. `menu` is
> ~93, not 102).

## Migration order (remaining)

1. **Prepared / pilot:** `card-select`, `broadcast-bar` — ✅ done.
2. **Other module-token components** (26): buttons, button-expander, form (field/checkbox/radio/switch),
   divider, card, avatar, status-pill, page-header, tabs, navbar, modal, list-item, app-menu, page,
   popconfirm, stepper, ai-chat, inline-select, inline-edit, inline-alert, description, pagination,
   progress-bar, time-picker.
3. **Semantic-only components**, simplest first (1–6 refs each); leave the large ones
   (`file-uploader`, `card-tabs`, `manageable-list`) for last.
4. **Deprecated — excluded (no tokens):** `alert`, `menu`, `table` are deprecated and slated for
   removal/replacement, so they will **not** be tokenised despite their high palette/opacity counts.

## Component Status

### Components with module-level tokens defined

These components have dedicated token definitions in `modules/base.json`.

| Component | Package | Colors | Shadows | Opacity | Spacing | Diffs | Less? | Notes |
|-----------|---------|--------|---------|---------|---------|-------|-------|-------|
| [section-message](#section-message) | `section-message` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 2 | No | 7 variants, all tokenised |
| [toast](#toast) | `toast` | :white_check_mark: | :white_check_mark: | :heavy_minus_sign: | :x: | 2 | No | 4 variants, shadow done |
| [broadcast-bar](#broadcast-bar) | `broadcast-bar` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 1 | No | 3 variants, all tokenised |
| ai-chat | `app-menu` | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | — | No | no ai-chat markup yet — tokens unused |
| [app-menu](#app-menu) | `app-menu` | :white_check_mark: | :white_check_mark: | :heavy_minus_sign: | :x: | 0 | No | shadow-1; all opacity is animation (deferred) |
| [avatar](#avatar) | `avatar` | :white_check_mark: | :heavy_minus_sign: | :white_check_mark: | :x: | 0 | No | static colors done; dynamic bg kept (user-driven); `.less` removed (deantd) |
| [buttons](#button) | `button` | :white_check_mark: | :construction: | :x: | :x: | 11 | No | :warning: all standard variants tokenised (secondary/tertiary/ghost backgrounds via alpha-modifier tokens); redesigns applied (secondary pressed blue→grey, tertiary/ghost hover-text shifts) — flag for review; custom-color dynamic; readOnly freeze + ripple on palette |
| [button-expander](#button) | `button` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 1 | — | bg/border/icon tokenised |
| [card](#card) | `card` | :white_check_mark: | :construction: | :white_check_mark: | :x: | 0 | No | surface+shadow-1 done; active shadow + CardBadge dynamic deferred |
| [card-select](#card-select) | `card-select` | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | 4 | No | borders/shadow/opacity tokenised; check-token naming flagged for UX |
| [description-line](#description) | `description` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | 0 | No | module + semantic; inactive star deferred |
| [divider](#divider) | `divider` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 0 | No | line + label tokenised; colour diffs resolved by sync `e0301675d` |
| [form](#form-group-form--input--select--switch) | `form` / `input` / `checkbox` / `radio` / `switch` / `select` | :construction: | :construction: | :construction: | :x: | 4 | select only | TS partly migrated; per-state styling now in `.styles.ts` (input/checkbox/radio/switch — `.less` removed) + `select` retains `.less` + data-URI SVGs |
| [inline-alert](#inline-alert) | `inline-alert` | :white_check_mark: | :heavy_minus_sign: | :white_check_mark: | :heavy_minus_sign: | 0 | No | 4 variants + text; icon `-default`/`-hover` branches (sync `66dddd0a`); hover done |
| [inline-edit](#inline-edit--inline-select) | `inline-edit` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | 0 | No | text/icon tokenised; gradient underlines deferred |
| [inline-select](#inline-edit--inline-select) | `inline-edit` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | 0 | No | lives in inline-edit package |
| [list-item](#list-item) | `list-item` | :white_check_mark: | :heavy_minus_sign: | :white_check_mark: | :x: | 2 | No | 31 module + 7 semantic; many svg fills → inheritance |
| [modal](#modal) | `modal` | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | 1 | No | shadow-2; mask grey-800→grey-700 |
| [navbar](#navbar) | `navbar` | :white_check_mark: | :heavy_minus_sign: | :white_check_mark: | :x: | 2 | No | :warning: default bg blue→grey |
| page | `page-header` | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | — | No | `--ds-page-bg` unused (no full-page bg in code) |
| [page-header](#page-header) | `page-header` | :white_check_mark: | :white_check_mark: | :heavy_minus_sign: | :x: | 0 | No | module + semantic; shadow-1 |
| [pagination](#pagination) | `pagination` | :white_check_mark: | :heavy_minus_sign: | :x: | :x: | 0 | No | tokenised vs `--ds-pagination-*` (sync `66dddd0a` pass); jumper input via semantic |
| [popconfirm](#popconfirm) | `popconfirm` | :white_check_mark: | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | 1 | No | shadow-2; module renamed `popcornfirm`→`popconfirm` (sync `66dddd0a`); carousel dots now in `.styles.tsx` (`.less` removed) |
| [progressbar](#progress-bar) | `progress-bar` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 1 | No | track + value + default fill tokenised (sync `66dddd0a`); multivalue slots caller-driven (deferred) |
| [status-pill](#status-status-pill) | `status` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 2 | No | text/border split; custom kept dynamic |
| [stepper](#stepper) | `stepper` | :construction: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 7 | No | :warning: done green→blue, active grey→blue; warning state migrated (sync `66dddd0a`); filled-circle content deferred |
| [tabs](#tabs) | `tabs` | :construction: | :heavy_minus_sign: | :white_check_mark: | :x: | 1 | No | main states done; decorative gradients + blue-500 focus deferred |
| [time-picker](#time-picker) | `time-picker` | :white_check_mark: | :heavy_minus_sign: | :white_check_mark: | :x: | 2 | No | 8 module + semantic; no elevation shadow |

### Components without module-level tokens

These components use `theme.palette` / hardcoded colors but do not yet have dedicated token definitions in Token Studio. They can use semantic tokens directly or need token definitions added.

| Package | palette refs | Less? | shadow refs | opacity refs | Notes |
|---------|-------------|-------|-------------|--------------|-------|
| action-area | 4 | No | 0 | 0 | |
| alert | 44 | Yes (2) | 9 | 11 | ⛔ **deprecated** — will not be tokenised |
| autocomplete | 10 | No | 3 | 0 | `.less` removed (deantd) |
| avatar-group | 8 | No | 2 | 2 | |
| badge | 11 | No | 4 | 4 | `.less` removed (deantd) |
| banner | 10 | No | 0 | 0 | `.less` removed (deantd) |
| block | 6 | No | 0 | 0 | |
| button-group | 6 | No | 4 | 0 | |
| card-tabs | 68 | No | 2 | 4 | High palette count |
| cascader | 34 | No | 5 | 10 | |
| [checkbox](#checkbox--radio) | 9 | No | 4 | 1 | :construction: TS focus/indeterminate/hover → `--ds-form-checkbox-*`; per-state colours now in `Checkbox.styles.ts` on palette (`.less` removed) + check icons (data-URI SVG) |
| code-area | 18 | No | 1 | 1 | |
| code-snippet | 20 | Yes (1) | 0 | 2 | |
| collector | 12 | No | 1 | 2 | |
| color-picker | 8 | No | 2 | 0 | |
| column-manager | 14 | No | 1 | 5 | |
| completed-within | 5 | No | 1 | 3 | |
| condition | 14 | No | 1 | 8 | |
| confirmation | 5 | No | 0 | 0 | |
| context-selector | 7 | No | 0 | 0 | |
| copy-icon | 2 | No | 0 | 0 | |
| cruds | 4 | No | 0 | 0 | |
| date-picker | 56 | No | 1 | 0 | High palette count |
| date-range-picker | 43 | No | 2 | 7 | |
| drawer | 3 | Yes (1) | 1 | 0 | |
| dropdown | 20 | No | 1 | 1 | |
| editable-items-list | 1 | No | 0 | 0 | |
| emoji-picker | 2 | No | 0 | 0 | |
| empty-states | 1 | No | 0 | 0 | |
| estimation | 2 | No | 0 | 0 | |
| factors | 18 | No | 2 | 0 | |
| field-set | 1 | No | 0 | 0 | |
| file-uploader | 152 | No | 0 | 7 | Highest palette count |
| filter | 3 | No | 0 | 1 | |
| flag | 0 | No | 0 | 34 | No palette, heavy opacity |
| footer | 1 | No | 0 | 0 | |
| form-field | 2 | No | 0 | 0 | |
| format-picker | 8 | No | 0 | 0 | |
| icon-picker | 8 | No | 0 | 0 | |
| information-card | 3 | No | 2 | 2 | |
| [input](#form-group-form--input--select--switch) | 49 | No | 14 | 2 | :construction: text → `--ds-form-field-*`/`--ds-form-icon-*` + semantic; field bg/border/hover/focus/disabled still palette in `Input.styles.tsx` (`.less` removed) |
| input-number | 5 | No | 5 | 0 | `.less` removed (deantd) |
| insight | 4 | No | 0 | 0 | |
| item-filter | 2 | No | 1 | 0 | |
| item-picker | 43 | No | 4 | 1 | |
| items-roll | 16 | No | 1 | 4 | |
| layout | 6 | No | 2 | 2 | |
| list | 9 | Yes (2) | 1 | 1 | |
| loader | 2 | No | 0 | 0 | |
| logic | 13 | No | 0 | 0 | |
| manageable-list | 57 | No | 6 | 9 | High palette count |
| mapping | 3 | No | 0 | 0 | |
| menu | 102 | Yes (2) | 5 | 21 | ⛔ **deprecated** — will not be tokenised |
| metric-card | 2 | No | 0 | 3 | |
| operators | 6 | No | 0 | 0 | |
| panel | 2 | No | 1 | 0 | |
| panels-resizer | 4 | No | 0 | 0 | |
| popover | 0 | No | 0 | 2 | |
| [radio](#checkbox--radio) | 1 | No | 3 | 4 | :construction: description + disabled-opacity → `--ds-form-radio-*`; bulk per-state styling now in `Radio.styles.tsx` on palette (`.less` removed) |
| result | 3 | No | 0 | 0 | |
| scrollbar | 17 | Yes (2) | 0 | 17 | |
| search | 13 | No | 4 | 8 | `.less` removed (deantd) |
| search-bar | 12 | No | 1 | 0 | |
| [select](#form-group-form--input--select--switch) | 13 | Yes (2) | 6 | 3 | :construction: TS → `--ds-form-field-*` + semantic; search-icon data-URI + `.less` deferred |
| short-cuts | 7 | No | 1 | 0 | |
| sidebar | 14 | No | 1 | 2 | `.less` removed (deantd) |
| sidebar-object | 9 | No | 0 | 0 | |
| skeleton | 5 | No | 0 | 15 | |
| slider | 12 | No | 4 | 0 | |
| sortable | 3 | No | 1 | 2 | |
| status | 7 | No | 0 | 1 | Token Studio has status-pill tokens |
| step-card | 5 | No | 1 | 13 | |
| subject | 2 | No | 0 | 0 | |
| subtle-form | 10 | No | 1 | 4 | |
| [switch](#form-group-form--input--select--switch) | 2 | No | 2 | 2 | :construction: error/description text → `--ds-form-switch-*`; track/handle now in `RawSwitch.styles.ts` on palette (`.less` removed) |
| table | 65 | Yes (3) | 8 | 23 | ⛔ **deprecated** — will not be tokenised (`table.less`/`index.less`/`pagination.less`) |
| tag | 25 | No | 2 | 3 | |
| tags | 7 | No | 0 | 0 | |
| toolbar | 4 | No | 1 | 0 | |
| tooltip | 3 | No | 2 | 2 | |
| tray | 4 | No | 1 | 0 | |
| typography | 8 | No | 0 | 1 | `.less` removed (deantd) |
| unordered-list | 1 | No | 0 | 0 | |
| wizard | 6 | No | 0 | 0 | |

### Packages with no color-related code

These packages have zero `theme.palette`, shadow, and opacity usage:

`checkbox-tristate`, `flex-box`, `grid`, `ordered-list`

---

## Token audit — semantic & palette usage

> The detailed per-component inventory of remaining `theme.palette` usages and semantic-vs-module token
> usage lives in **[`TOKEN_USAGE_BY_COMPONENT.md`](./TOKEN_USAGE_BY_COMPONENT.md)** (kept current with the
> code). The tokenisation pass summary and its UX flags follow below.

---

## Component-by-component tokenisation pass (2026-07-17)

Following the audit, the flagged code palette was tokenised component-by-component (each its own commit; unit
tests green per component). **Approach:** prefer exact-value semantic/module tokens (zero visual change);
accept a value shift only where no exact token exists (flagged); convert `svg { fill/stroke }` → wrapper
`color` + `currentColor`; keep genuinely dynamic (`customColor`/`color` prop) values on palette.

**Tokenised** (palette-free or dynamic-only remainder): `section-message`, `toast`, `button` (readOnly aligned
to variant tokens + error→danger + Checkbox/Star/Creator), `card` (CardBadge), `description`, `input` (field
surface/affix/clear), `checkbox` (+ data-URI tick → **currentColor SVG component**), `radio`, `switch`,
`modal`, `popconfirm`, `tabs`, `inline-edit`, `pagination`.

**Still deferred:** `select` (mid de-antd), `alert`/`menu`/`table` (deprecated — no tokens),
remaining `.less` (`code-snippet`/`drawer`/`list`/`scrollbar`/`select`). (`ai-chat`/`page` module tokens exist
but have no consuming markup yet.)

### ⚑ Flags for the UX / token team

1. **Mis-valued module tokens** — `--ds-form-checkbox-bg-blocked` and `--ds-form-checkbox-border-color-blocked`
   resolve to `background.brand.solid` (**blue-600**); a disabled checkbox needs grey. Consumed as-is
   (consume-only), so **disabled checkboxes render blue until the token values are fixed upstream**.
2. **Missing shades** — no danger token at `red-200` (button error-hover bg kept on palette); no `blue-500`
   token (kept on palette in checkbox indeterminate-hover, radio solid-hover, tabs focus — the changelog's
   `focus.base.subtle` / `--ds-tabs-item-text-focus` are not in merged `66dddd0a`).
3. **Missing icon-category tokens** — inactive/disabled icon greys (grey-300/grey-200) had to use
   `border-base-strong`/`border-base-default` (value-exact, category mismatch) in checkbox / star / description.
4. **Missing per-state tokens** — radio has no disabled bg/border token (used semantic); inline-edit `:active`
   icon-wrapper bg grey-300 has no clean token (kept on palette).

### Value shifts introduced (for Chromatic review)

- `section-message` close icon grey-700→grey-600.
- `button` readOnly (aligned to variant `-default` tokens): secondary/tertiary text grey-700→grey-600; primary
  text grey-050→white; tertiary bg solid grey-100→grey-400@15%; ghost/ghost-primary bg white→transparent;
  **ghost-white bg grey-600→transparent**.
- `input` disabled bg grey-050→grey-100; affix text grey-700→grey-500.
- `card` badge warning bg yellow-600→yellow-500.
- `checkbox`/`radio` disabled label grey-600→grey-700; `radio` checked label grey-800→grey-700.

---

## Detailed Reports

### section-message

**Package:** `packages/components/section-message/`
**Token variants:** success, warning, error, informative, supply, service, entity (7 total)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete

All 7 `SectionType` variants use component-level CSS vars (`--ds-section-message-variant-{variant}-{bg|border|bordertop|icon|text-header|text-description}`). No `theme.palette` fallback remains for type-driven colors.

`customColor` / `customColorIcon` overrides still use `theme.palette` — intentional (user-specified overrides, not token-driven).

#### Shadows — :heavy_minus_sign: N/A

#### Opacity — :heavy_minus_sign: N/A

#### Spacing — :x: Not started

Hardcoded px values remain. Token Studio defines: `content.padding.x`, `content.padding.y`, `content.gap.elements`, `content.gap.text`, `border.radius`, `border.width.default`, `border.width.top`, `icon.size`.

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Header text color | `grey-700` (#57616d) | `grey-800` (#384350) | Darker |
| Description text color | `grey-700` (#57616d) | `grey-600` (#6a7580) | Lighter |

#### Unmapped colors

| Usage | Value | Location | Reason |
|-------|-------|----------|--------|
| Close icon | `grey-700` | `IconCloseWrapper` | Could use `--ds-color-icon-base-default` |
| NumberWrapper gradient | `grey-400` | Hover effect | Decorative |
| IconOrderWrapper hover | `blue-600` | SVG fill | Interactive |
| Various grey-700 | `grey-700` | `Wrapper`, `OrderWrapper` etc. | Legacy/unused styled components |

---

### toast

**Package:** `packages/components/toast/`
**Token variants:** success, warning, error, informative (4 total; component type `negative` → token `error`)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete

All 4 variants use CSS vars (`--ds-toast-variant-{variant}-{bg|border|icon|text-label|text-description}`). Body text/icons use semantic tokens.

#### Shadows — :white_check_mark: Complete

Container `box-shadow` uses `var(--ds-shadows-shadow-2)`.

#### Opacity — :heavy_minus_sign: N/A

`opacity: 0.6` on `NumberWrapper` is decorative, no token equivalent.

#### Spacing — :x: Not started

Hardcoded px values remain. Token Studio defines: `content.padding.x`, `content.padding.y`, `content.gap.elements`, `content.gap.text`, `borderRadius`, `icon.size`.

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Negative icon/border | `red-500` (#ff5a4d) | `red-600` (#f52922) | Darker |
| Informative border | `grey-600` (#6a7580) | `grey-700` (#57616d) | Darker |

#### Unmapped colors

| Usage | Value | Location | Reason |
|-------|-------|----------|--------|
| NumberWrapper gradient | `grey-400` | Hover effect | Decorative |
| IconOrderWrapper hover | `blue-600` | SVG fill | Interactive |
| Gradient stops | `rgba(255,255,255,0)` | NumberWrapper | Transparent white |

---

### broadcast-bar

**Package:** `packages/components/broadcast-bar/`
**Token variants:** success, warning, error (3 total; component type `negative` → token `error`)
**Layer:** module (`--ds-broadcast-bar-variant-*`)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete

A `TYPE_TO_TOKEN_VARIANT` map (mirroring `SectionMessage.utils.tsx`) drives three helpers returning
CSS-var strings: `getColorBackground` → `…-bg`, `getColorText` → `…-text`, `getColorIcon` → `…-icon`.
Background is set on `Container`; foreground colour is set on the wrappers (`AllContent`, `IconWrapper`,
`IconCloseWrapper`, `Wrapper`, `WrapperBroadcastBar`) and inherited by icons via `currentColor` (no
direct `fill`/`stroke`). The `theme.palette` helpers and the `ThemeProps` import were removed.

#### Shadows — :heavy_minus_sign: N/A

#### Opacity — :heavy_minus_sign: N/A

#### Spacing — :x: Not started

Token Studio defines: `content.padding.x.left`, `content.padding.x.right`, `content.padding.y`, `content.gap`, `icon.size.main`, `icon.size.close`.

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Warning background | `yellow-600` (#fab700) | `--ds-broadcast-bar-variant-warning-bg` (#ffc300) | Brighter yellow |

(The earlier prediction of a warning text/icon `grey-800` → `grey-900` shift was incorrect — the
warning text/icon token resolves to `grey-800` (#384350), an exact match.)

#### Unmapped colors

| Usage | Value | Location | Reason |
|-------|-------|----------|--------|
| Button background | `rgba(255,255,255,0.2)` | `ButtonWrapper` | Semi-transparent white overlay — no token |

---

### card-select

**Package:** `packages/components/card-select/`
**Layer:** module (`--ds-card-select-*`), with semantic fallback where no module token exists
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete

Card outline rings, radio-circle borders, header text, background, and tick/info icons all use module
tokens; the error ring and the disabled radio-circle background fall back to semantic tokens (no module
token exists). The `getVar` (`theme.palette`) helper and `useTheme()` were removed.

| Usage | Current | Token | Resolves to | Match? |
|---|---|---|---|---|
| header text | grey-800 `#384350` | `--ds-card-select-header-color` | `#384350` | Yes |
| card bg | white | `--ds-card-select-bg-default` | `#ffffff` | Yes |
| focus ring | blue-600 `#0b68ff` | `--ds-card-select-border-color-focused` | `#0b68ff` | Yes |
| selected ring | blue-600 `#0b68ff` | `--ds-card-select-border-color-selected` | `#0b68ff` | Yes |
| disabled ring | grey-200 `#e9edee` | `--ds-card-select-border-color-disabled` | `#e9edee` | Yes |
| disabled radio bg | grey-050 `#f9fafb` | semantic `background-base-subtle` | `#f9fafb` | Yes |
| selected tick | green-600 `#54cb0b` | `--ds-card-select-check-bg-selected` | `#54cb0b` | Yes |
| unselected/info icon | grey-400 `#b5bdc3` | semantic `icon-base-muted` | `#b5bdc3` | Yes |
| default ring + radio | grey-300 `#dbe0e3` | `…-border-color-default` / `check-border-color-default` | `#e9edee` | **No — lighter** |
| hover ring + radio | grey-400 `#b5bdc3` | `…-border-color-hover` / `check-border-color-hover` | `#dbe0e3` | **No — lighter** |
| error ring | red-500 `#ff5a4d` | semantic `border-danger-default` | `#f52922` | **No — darker** |

#### Shadows — :white_check_mark: Complete

The `raised` variant's antd `@box-shadow-base` / `@box-shadow-active` were switched to
`--ds-card-select-shadow-default` (→ `shadow-1`) and `--ds-card-select-shadow-hover` (→ `shadow-2`).
The delta vs the previous antd shadow values was not separately verified.

#### Opacity — :white_check_mark: Complete

`opacity: 0.4` (disabled) → `--ds-card-select-disabled-opacity` (`0.4`, exact).

#### Spacing — :x: Not started

`border-radius: @border-radius-base` is left on the antd Less variable (no dimension token in the CSS
build yet).

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Default border (card + radio) | grey-300 `#dbe0e3` | grey-200 `#e9edee` | Lighter |
| Hover border (card + radio) | grey-400 `#b5bdc3` | grey-300 `#dbe0e3` | Lighter |
| Error ring | red-500 `#ff5a4d` | red-600 `#f52922` | Darker |
| Raised shadow | antd `@box-shadow-base/active` | `shadow-1` / `shadow-2` | Unverified |

#### :warning: Token-naming discrepancy — to reconcile with UX

The `check-*` token names don't match how the `Check3M` SVG works:

- `Check3M` is a **filled circle with a tick-shaped transparent hole**, so the icon *colour* is the
  circle fill and the tick is the hole showing the card behind it. The selected tick therefore uses
  `--ds-card-select-check-bg-selected` (resolves to green, exact match) as the **icon colour** — the
  `*-bg-*` vs `*-icon-*` naming is inverted/misleading.
- `--ds-card-select-check-icon-selected` resolves to white, which is meaningless here (the tick is a
  hole, not a fillable path) — it is **unused**.
- `--ds-card-select-check-border-color-focused` has **no markup counterpart**: focus is applied to the
  whole card (`--ds-card-select-border-color-focused`), not the check.

Reconciling these requires aligning the Figma component, the token names, and the code.

#### Unmapped values

| Usage | Value | Location | Reason |
|-------|-------|----------|--------|
| Card border-radius | `@border-radius-base` | `Container` | antd Less variable — no dimension token (deferred) |

---

### divider

**Package:** `packages/components/divider/`
**Layer:** module (`--ds-divider-*`)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete

Label text → `--ds-divider-header-text-color`; line colour → `--ds-divider-line-color-solid` /
`--ds-divider-line-color-dashed`. The SVG line uses `stroke="currentColor"` and inherits from the
parent's CSS `color` (no direct `fill`/`stroke` rules). `theme.palette` fully removed.

#### Shadows / Opacity — :heavy_minus_sign: N/A
#### Spacing — :x: Not started (dimension tokens for line height / header padding exist, out of scope)

#### Visual diffs — none (resolved by sync `e0301675d`)

The line colours were re-pointed upstream (`line.color.solid` `{border.base.default}` →
`{border.base.strong}`; `line.color.dashed` `{border.base.strong}` → `{border.base.strongHover}`),
so the tokens now resolve to the **exact** legacy stroke colours. The earlier "Lighter" diff was a
token-vs-code gap that the sync closes — no code change needed.

| Property | Legacy code | Token resolves to | Delta |
|----------|-------------|-------------------|-------|
| Solid line | grey-300 `#dbe0e3` | grey-300 `#dbe0e3` | Exact — no change |
| Dashed line | grey-400 `#b5bdc3` | grey-400 `#b5bdc3` | Exact — no change |

---

### inline-alert

**Package:** `packages/components/inline-alert/`
**Layer:** module (`--ds-inline-alert-*`) + semantic (`--ds-opacity-disabled`)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete

Icon colours per variant (success/warning/error/informative) → `--ds-inline-alert-icon-*`; message text
→ `--ds-inline-alert-text-default`. All exact matches. Icon inherits via `currentColor` (no fill/stroke).

#### Opacity — :white_check_mark: Complete

`opacity: 0.4` (disabled) → `--ds-opacity-disabled`.

#### Hover — :white_check_mark: (resolved by sync `66dddd0a`)

Hover colours now use `--ds-inline-alert-icon-{variant}-hover` (resolve to green-700/yellow-700/red-700/
grey-700 — **exact match** to the old `theme.palette` values, zero visual change). The icon default state uses
the new `-default` branch (`--ds-inline-alert-icon-{variant}-default`). The last `theme.palette` colour usage
in this file is removed.

---

### inline-edit + inline-select

**Package:** `packages/components/inline-edit/` (both components live here)
**Layer:** module (`--ds-inline-edit-*`, `--ds-inline-select-*`) + semantic (`text-base-disabled`,
`background-base-default`)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete

Text/icon/background states tokenised to the respective module tokens; placeholder/disabled → semantic
`text-base-disabled`; white backgrounds → semantic `background-base-default`. All exact matches, no
visual diffs. `useTheme()` removed from `InlineEdit.tsx`.

#### Deferred / follow-up

- Focus/hover/error **gradient underlines** (`linear-gradient(...)`) keep `theme.palette` — decorative.
- `:active` icon-wrapper background `grey-300` — no clean module/semantic token (`background-base-strong`
  = grey-400). Deferred.
- The `svg { color }` override rules were **not** converted to pure inheritance: the icon intentionally
  takes a different colour than its text sibling in some states (converting would change behaviour) — the
  hardcoded values inside them are now token-backed via the migrated helpers. **CSS-cleanup follow-up.**
- :warning: `--ds-inline-select-icon-error` resolves to `icon-neutral-default` (**grey-500**) while the
  component renders error icons **red-600** — the migration deliberately used the `text-*` tokens for the
  SVG fill to preserve red. Confirm whether `icon-error` should point at a danger token upstream.

---

### progress-bar

**Package:** `packages/components/progress-bar/`
**Layer:** module (`--ds-progressbar-*`)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete

Track background (`ProgressBar` + `ProgressTiles`) → `--ds-progressbar-bar-bg-track`; percent value text
→ `--ds-progressbar-header-value-color`; default bar **fill** → `--ds-progressbar-bar-fill-default` (sync
`66dddd0a`). The `customColor` override is preserved.

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Default bar fill | green-500 | `--ds-progressbar-bar-fill-default` → green-600 `#54cb0b` | Slightly darker/more saturated |

#### Deferred / follow-up

- `Multivalue` slot colours (`--ds-progressbar-bar-fill-multivalue-1..3`) + not-stacked bg
  (`--ds-progressbar-bar-bg-multivaluenotstacked`) — **no code application point**: `Multivalue`/`ProgressTiles`
  colours are 100% caller-supplied `val.color`, and the not-stacked variant has no track element. Deferred
  pending an API/markup decision with design. The decorative `border-right: 2px solid white` separator is
  left unchanged.

---

### status (status-pill)

**Package:** `packages/components/status/`
**Layer:** module (`--ds-status-pill-variant-*`)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete

A `TYPE_TO_TOKEN_VARIANT` map drives `variantText` / `variantBorder` helpers returning
`var(--ds-status-pill-variant-*)`. The old code applied one colour to both text and border; the module
tokens split them, so success/warning **borders** now use the `-600` shade while text keeps `-700`.
`@synerise/ds-core` import removed.

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Success border | green-700 `#399903` | green-600 `#54cb0b` | Brighter (text unchanged) |
| Warning border | yellow-700 `#eda600` | yellow-600 `#fab700` | Brighter (text unchanged) |

#### Deferred

`custom` type uses the caller's `color` prop (dynamic override) — kept as-is.

---

### description

**Package:** `packages/components/description/`
**Layer:** module (`--ds-description-line-*`, 2) + semantic (icon/brand, 4)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete

Label text → `--ds-description-line-label-text`; value text → `--ds-description-line-content-text`;
copy/link icons → semantic `icon-base-default` / `text-brand-default`; active star → `icon-warning-default`.
Three direct `svg { fill }` rules were **dropped** in favour of `currentColor` inheritance. No visual diffs.

#### Deferred

Inactive star `grey-300` (`Star.tsx:19`) — no on-system icon token resolves to grey-300 (nearest
`icon-base-muted` = grey-400, a visible shift). Kept `theme.palette`. Follow-up: an inactive-icon token.

---

### navbar

**Package:** `packages/components/navbar/`
**Layer:** module (`--ds-navbar-*`, 3) + semantic (`text-onsolid-default`)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete · Opacity — :white_check_mark: Complete

Container bg → `--ds-navbar-container-bg`; root/icon/text → `text-onsolid-default`; divider →
`--ds-navbar-left-separator-color` + `--ds-navbar-left-separator-opacity`. One `svg { fill }` rule
dropped (inherits via currentColor). The `color` prop override is preserved.

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| **Default background** (no `color` prop) | blue-600 `#0b68ff` | grey-700 `#57616d` | :warning: **Blue → grey** — prominent |
| Divider opacity | `0.3` | `--ds-opacity-muted` `0.2` | Slightly more transparent |

> The default-navbar background changing from blue to grey is a deliberate token value but a large,
> visible change. It only affects navbars rendered without an explicit `color` prop. Flagged for review.

---

### popconfirm

**Package:** `packages/components/popconfirm/`
**Layer:** module (`--ds-popconfirm-*`, 5) + semantic (`shadow-2` ×2, `background-base-default`, `text-base-subtle`)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: · Shadows — :white_check_mark: (shadow-2, provably equal)

Container bg/arrow → `--ds-popconfirm-container-bg`; title → `-header-text`; close icon → `-header-icon`;
description → `-content-description`; link → semantic `text-base-subtle`. ConfirmMessage sub-component →
semantic bg + shadow-2.

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Description text | grey-800 `#384350` | grey-700 `#57616d` | Lighter (subtler than title — intended) |

#### Deferred

Carousel `.slick-dots` indicators (`Popconfirm.styles.tsx:51,52,61,62`) — the green-600 active dot would
become blue via `border-brand-default` (a green→blue redesign); kept `theme.palette`. `ConfirmMessage`
title `#404c5a` hardcoded (no token). The antd Carousel `.less` was **removed** (deantd) — carousel-dot styling
now lives in `Popconfirm.styles.tsx` on palette (directly tokenisable).

---

### tabs

**Package:** `packages/components/tabs/`
**Layer:** module (`--ds-tabs-item-*`, 4 — all used) + semantic (5)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :construction: Main states done · Opacity — :white_check_mark:

Inactive/hover/active label + icon and the active underline use `--ds-tabs-item-*`; default icon →
`icon-base-default`; brand-hover/pressed → `text-brand-hover`; dropdown bg → `background-base-default`;
disabled opacity → `--ds-opacity-disabled`. Six `svg { fill }` rules dropped (currentColor inheritance).

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Inactive tab text | grey-700 `#57616d` | grey-600 `#6a7580` | Lighter (muted) |

#### Deferred

`blue-500` focus text/icon (`Tab.styles.ts:130,133`) — no focus-hue text/icon token. Decorative dashed
`linear-gradient` focus/divider underlines and the block-mode `::after` underline greys
(`Tab.styles.ts:36–67,146–150`, `Tabs.styles.ts:34–38`) — kept `theme.palette`. Follow-up: focus-hue token.

---

### time-picker

**Package:** `packages/components/time-picker/`
**Layer:** module (`--ds-time-picker-*`, 8) + semantic (5) + opacity (2)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: · Opacity — :white_check_mark:

Overlay/cell/text states → `--ds-time-picker-*`; clear icon → semantic `icon-danger-default`; input focus
bg/border → semantic `background-base-default` / `border-base-strong`; muted/disabled → `--ds-opacity-muted`
/ `-disabled`. One `svg { fill }` rule (clear icon) dropped (currentColor inheritance). No elevation
box-shadow exists (the `overlay-shadow` module token is unused).

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Column separator | grey-200 `#e9edee` | grey-100 `#f3f5f6` | Slightly lighter |
| Cell bg (default/disabled) | white `#ffffff` | `transparent` | No visible change (sits on white overlay) |

---

### card

**Package:** `packages/components/card/`
**Layer:** module (`--ds-card-bg-*`, `--ds-card-disabled-opacity`) + semantic (text/border/shadow)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: · Shadows — :construction: · Opacity — :white_check_mark:

Backgrounds → `--ds-card-bg-default`; grey bg → `background-base-subtle`; borders → `border-base-*`;
description text → `text-base-muted`; default raised shadow → `--ds-shadows-shadow-1`; disabled opacity →
`--ds-card-disabled-opacity`. All exact, no visual diffs.

#### Deferred

- `@box-shadow-active` (raised/lively/hover, `Card.styles.ts:79,99`) — does not equal any
  `--ds-shadows-shadow-N`; kept. Follow-up: no card hover/active shadow token.
- `CardBadge.styles.tsx` — status colours are computed `theme.palette[map[status]]` (dynamic key) and a
  grey-400 inset ring; kept. `warning` (yellow-600) also mismatches `background-warning-solid` (yellow-500).
  Follow-up: no `card-badge` module tokens. Plus a `0.16` nested opacity (no token).

---

### modal

**Package:** `packages/components/modal/`
**Layer:** module (`--ds-modal-*`, 6) + semantic (`background-base-subtle`, `text-base-muted`, `opacity-muted`, `shadow-2`)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: · Shadows — :white_check_mark: · Opacity — :white_check_mark:

Container/mask/title/footer/borders → `--ds-modal-*`; body grey bg → `background-base-subtle`; description
→ `text-base-muted`; container shadow → `--ds-shadows-shadow-2` (provably equal); mask opacity →
`--ds-opacity-muted`.

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Mask backdrop | grey-800 `#384350` | `--ds-modal-mask-color` grey-700 `#57616d` | Lighter (opacity 0.2 unchanged) |

#### Deferred

Description dashed-separator gradient (decorative); `zindex-modal` (not Phase 1). **Module-shadow gap:**
`modal.container.shadow` exists in `base.json` but the build emits only color-type modal vars, so semantic
`shadow-2` was used (identical). Follow-up: emit shadow-type module vars if a `--ds-modal-*-shadow` is wanted.

---

### stepper

**Package:** `packages/components/stepper/`
**Layer:** module (`--ds-stepper-step-*`, 13)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :construction: (warning state migrated in sync `66dddd0a`; filled-circle content still deferred)

Default/hover/active/done/validation/**warning** states for circle border, number, label, separators and the
connector line → `--ds-stepper-step-*`. The done/warning check icon recoloured via its border token; the
warning tooltip icon uses `--ds-stepper-step-circle-border-warning`.

#### Visual diffs — substantial (the tokens encode a state redesign)

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Inactive circle border / separators / connector | grey-400 `#b5bdc3` | grey-200 `#e9edee` | Lighter |
| Inactive number | grey-400 `#b5bdc3` | grey-600 `#6a7580` | Darker |
| Inactive label | grey-400 `#b5bdc3` | grey-700 `#57616d` | Darker |
| **Active** border | grey-700 `#57616d` | brand `#0b68ff` | :warning: **grey → brand blue** |
| **Done** border + check icon | green-600 `#54cb0b` | brand `#0b68ff` | :warning: **green → brand blue** |
| **Done** label | green-600 `#54cb0b` | grey-800 `#384350` | :warning: **green → grey** |
| Hover border | grey-700 `#57616d` | grey-300 `#dbe0e3` | Lighter |
| **Warning** number + label | yellow-600 `#fab700` | yellow-700 `#eda600` | Slightly darker (border stays yellow-600) |

> These are deliberate token values but a clear visual redesign of the active/done states (green→blue).
> Flagged for design review.

#### Deferred

- ✅ **Warning state** migrated (sync `66dddd0a`): circle border → `--ds-stepper-step-circle-border-warning`
  (yellow-600 `#fab700`, exact), number → `--ds-stepper-step-circle-content-warning`, label →
  `--ds-stepper-step-label-warning` (both yellow-700 `#eda600`, slightly darker). Note: Figma still lacks a
  `State=Warning` on `Stepper.Step` (changelog `c89fb2b`) — code state exists and is now token-backed.
- `circle-content-{active,done,validation}` tokens resolve to **white** (a filled-circle redesign — white
  number on solid fill). Current circles are outlined, so white numbers would be invisible; used the visible
  `-label-*` tokens instead. Adopting them needs the filled-circle markup (out of Phase 1). (Same pattern as
  card-select's `check-*` tokens.)

---

### pagination

**Package:** `packages/components/pagination/`
**Status:** :white_check_mark: **Tokenised** (sync `66dddd0a` pass). `.less` was removed (deantd); styling
lives in `Pagination.styles.ts`, now mapped to `--ds-pagination-item-*` / `--ds-pagination-nav-*` module tokens
(+ `nav-disabled-opacity`). The quick-jumper input + total/jumper text use semantic (`border-base-strong`,
`focus-base-default`, `text-base-muted`) — no pagination token covers those. **Design-intended diffs
(Chromatic):** item text grey-700→grey-600; item hover bg translucent-grey → brand blue-50 (`item-bg-hover`).
Active page bg (grey-700), active text (white) and nav icon (grey-600) are exact.

---

### list-item

**Package:** `packages/components/list-item/`
**Layer:** module (`--ds-list-item-*`, 31) + semantic (focus rings, neutral text, success icon — 7)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: · Opacity — :white_check_mark:

Normal/featured/danger role states (bg/text/icon/description) → `--ds-list-item-role-*`; focus rings →
semantic `color-focus-*` (colour only, geometry kept); ordered counter / group / header titles → neutral
text; check icon → `icon-success-default`; disabled opacity → `--ds-list-item-states-disabled-opacity`.
**Many `svg { fill }` rules across Text/Danger were converted to parent `color` + currentColor inheritance.**

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Description text (large) | grey-600 `#6a7580` | grey-700 `#57616d` | Darker |
| Danger active bg | red-100 `#ffece8` | red-50 `#fff6f4` | Lighter (now equals hover) |

#### Deferred / follow-up

`--ds-list-item-role-delete-bg-active` resolves to red-50 (same as hover) — confirm with design whether the
pressed delete state should stay darker (red-100 / `danger-subtlehover`).

---

### avatar

**Package:** `packages/components/avatar/`
**Layer:** module (`--ds-avatar-disabled-opacity`) + semantic (text-onsolid, background-base, icon-base-subtle)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: (static) · Opacity — :white_check_mark:

Initials text on coloured bg → `text-onsolid-default`; badge-dot ring → `background-base-default`; fallback
user-icon → `icon-base-subtle`; disabled opacity → `--ds-avatar-disabled-opacity`. No visual diffs.

#### Deferred

The saturated **background colour** (`applyBgColors`, computed `${color}-${hue}` key) and `ObjectAvatar`'s
`${color}-600` are user-driven dynamic overrides — kept `theme.palette`. The avatar module `bg`/`text`
tokens describe a *muted-grey default surface* (grey-100 bg / grey-600 text), not this coloured-bg+white-text
path, so semantic `text-onsolid` was the correct choice. (The antd avatar `.less` has since been removed — deantd.) SVG icon
component files (thousands of path hexes) are out of scope. Removed unused `DEFAULT_COLOR`/`DEFAULT_COLOR_HUE`
locals (not exported, no consumers).

---

### page-header

**Package:** `packages/components/page-header/`
**Layer:** module (`--ds-page-header-*`, 3) + semantic (border/text/icon, 7) + `--ds-shadows-shadow-1`
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: · Shadows — :white_check_mark:

Container bg / back-separator / nav label → `--ds-page-header-*`; borders → `border-base-*`; description →
`text-neutral-default`; icons → `icon-base-default`/`-subtle`; container shadow → `--ds-shadows-shadow-1`
(provably equal). One `svg { fill }` rule (tooltip icon) converted to currentColor. **No visual diffs.**

#### Deferred

`page-header.container.shadow` module token exists in `base.json` but isn't emitted as a CSS var → used
semantic `shadow-1` (identical). The `page` namespace (`--ds-page-bg`) has no matching usage in this package.

---

### app-menu

**Package:** `packages/components/app-menu/`
**Layer:** module (`--ds-app-menu-*`, 5) + semantic (border-base-subtle, text-brand, text-neutral) + `--ds-shadows-shadow-1`
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: · Shadows — :white_check_mark:

Container bg → `--ds-app-menu-container-bg`; icon colour → `--ds-app-menu-icon-default` (upstream typo
`icon-defsult` fixed in sync `66dddd0a`); hover bg → `--ds-app-menu-icon-bg-hover`; grey-100 dashed border →
`--ds-app-menu-container-border-color` (sync re-pointed grey-200→grey-100, resolving the earlier mismatch);
other grey-100 borders → semantic `border-base-subtle`; submenu hover text → `text-brand-default`; menu
shadow → `--ds-shadows-shadow-1`. **Value diffs from sync `66dddd0a` (no code):** container border +
separators grey-200→grey-100 (#f3f5f6), section header grey-800→grey-500 (#949ea6).

#### Deferred

All ~14 `opacity` refs are visibility/transition/animation states (icon crossfade, sub-menu slide-in), not
disabled/muted — none equal 0.4/0.2, none tokenisable. The `ai-chat` tokens have no consuming markup in the
package yet (nothing to apply).

> ✅ Upstream typo fixed in sync `66dddd0a`: `--ds-app-menu-icon-defsult` → `--ds-app-menu-icon-default` (code updated).

---

### checkbox + radio

**Packages:** `packages/components/checkbox/`, `packages/components/radio/`
**Layer:** module (`--ds-form-checkbox-*` / `--ds-form-radio-*`)
**Migrated in:** `chore/tokenisation` branch · **Status: :construction: partial**

The `*.mixin.less` files were **removed** (deantd); the per-state styling now lives in `Checkbox.styles.ts` /
`Radio.styles.tsx` as styled-components on `theme.palette`. For checkbox, the check icons remain **data-URI SVG**
(a `var()` can't be encoded there). So both are now **directly tokenisable** (no antd Less blocker) — except the
data-URI check icons.

#### checkbox — applied

Focus border + focus ring, indeterminate inner bg/border, and hover-preview border → `--ds-form-checkbox-*`
(all exact, no diffs). **Deferred:** the checked/indeterminate/hover check icons are `data:image/svg+xml`
background-images with hex inlined into the URI — a `var()` cannot be encoded there, so they stay
hardcoded; `blue-500` indeterminate-hover bg (no token); and the per-state border/bg/label colours, error
elevation shadow, disabled opacity — now in `Checkbox.styles.ts` on palette (`.less` removed, directly tokenisable).

#### radio — applied

Description text → `--ds-form-radio-text-description`; disabled opacity (label + description) →
`--ds-form-radio-disabled-opacity`. **Visual diff:** description text grey-600 `#6a7580` → grey-700
`#57616d` (darker, design-intended). **Remaining:** the radio dot/border/bg/hover/selected states now live in
`Radio.styles.tsx` on palette (`.less` removed — directly tokenisable, no antd Less blocker).

> **Sync `e0301675d` forward-note (affects the deferred radio-state work, not the already-migrated text):** the
> selected inner dot `--ds-form-radio-dot-color` was re-pointed `{background.base.default}` →
> `{background.brand.solid}`, so it now resolves to **brand-blue `#0b68ff`** (was white) — a bug-fix.
> The hover ring `--ds-form-radio-border-color-hover` was re-pointed `{background.brand.solid}` →
> `{border.base.strongHover}`, now **grey-400 `#b5bdc3`** (was blue-600). The upstream token
> `$description` strings still read "white"/"blue.600" and are **stale**. When the radio-state migration lands
> (now in `Radio.styles.tsx`), expect a grey hover ring + brand-blue selected dot — coordinate with design.

> Follow-up: checkbox/radio state colours are now plain styled-components (`.less` removed) and can be tokenised
> directly — no antd Less decision needed; only the data-URI check icons still need a different mechanism (e.g. a
> real `<Icon>` or `mask` driven by `currentColor`).

---

### button

**Package:** `packages/components/button/` (keys `buttons` + `button-expander`)
**Layer:** module (`--ds-buttons-variant-*`, `--ds-button-expander-*`, 36) + semantic (14)
**Migrated in:** `chore/tokenisation` branch · **Status: :white_check_mark: colours (custom-color dynamic; readOnly freeze + ripple on palette)**

#### Done

`primary`, `primary-success`, `primary-danger`, `button-expander`, `ButtonToggle`, `Creator` — migrated
earlier. **Now migrated to module tokens** (`Button.variants.ts` + the secondary override in
`Button.styles.tsx`): `secondary` (= `variantDefault`), `tertiary`, `tertiary-white`, `ghost-primary`,
`ghost-secondary` (code `ghost`), `ghost-secondary-white` (code `ghost-white`) — all
default/hover/focus/active/disabled states via `--ds-buttons-variant-<v>-{bg,text,border}-*`. Icons
inherit `color` (`icon-*` token == `text-*` token for these variants). `custom-color-ghost` inherits
`variantGhostPrimary`, so its backdrop is tokenised too.

The semi-transparent hover/active backgrounds now resolve through each token's Token-Studio
`modify:alpha` extension (tertiary/ghost grey-400 @15/25/35%, tertiary-white grey-300 @15/25/10%,
ghost-white grey-500 @25/10%), emitted as `rgba()` by the `outputReferencesTransformed` build fix
(`fix(tokens): emit rgba…`). These are **exact-match** to the old `rippleAlpha()`/`hexToRgbValues()`
output — **zero visual change** to the backgrounds.

**Disabled opacity (fixed):** the solid-token variants (secondary, tertiary, tertiary-white, ghost,
ghost-primary, ghost-white) now apply the separate `--ds-buttons-disabled-opacity` (0.4) in `buttonDisabled()`
— the token intent ("same as default, opacity applied separately") that was previously dropped, leaving
secondary disabled text un-faded. The hardcoded `opacity: 0.4` in `custom-color`/`custom-color-ghost`
(`Button.styles.tsx`), `Creator`, and `Expander` was also switched to the token. primary/danger/success/warning
keep baking `rgba(color, 0.4)` into the disabled background (not element opacity), so they are left as-is to
avoid double-dimming.

#### Visual diffs

| Property | Was | Token resolves to | Delta |
|----------|-----|-------------------|-------|
| Expander disabled border | grey-200 `#e9edee` | `…-border-disabled` grey-300 `#dbe0e3` | Slightly darker |
| Primary-danger / -success focus ring | red-600 / green-600 | `…-border-focus` blue-600 | :warning: → brand-blue (sync `e0301675d`) |
| **secondary** active (pressed) | blue-100 bg / blue-600 text | grey-400 bg / white text | :warning: **blue → grey** redesign |
| **secondary** focus bg | grey-050 | grey-100 (`base.muted`) | slightly darker |
| **secondary** hover border | grey-300 | blue-300 (`border-brand-strong`) | brand border on hover |
| **secondary** disabled | grey-700@40% / grey-050@40% | grey-600 / grey-100 @ `--ds-buttons-disabled-opacity` (0.4) | re-faded (fixed) |
| **tertiary** text default/focus | grey-700 | grey-600 (`text-base-muted`) | lighter |
| **tertiary** text hover/active | grey-700 | blue-600 (`text-brand`) | :warning: **grey → brand** |
| **tertiary** hover border | transparent | grey-200 (`border-base-default`) | visible border on hover |
| **ghost-secondary** text hover | blue-600 | grey-600 (`text-base-muted`) | :warning: **blue → grey** |
| tertiary/ghost/ghost-white/tertiary-white backgrounds | rgba(grey-N, α) | same rgba via alpha token | exact — no change |

> The text/border redesigns above are encoded in the module tokens and applied per the migration
> methodology (adopt token, flag diff). Notable interaction changes — secondary pressed blue→grey,
> tertiary hover/active text→brand, ghost-secondary losing its blue hover — **flag for design review on
> the MR**; reverting any is an upstream token change (consume-only).

#### Deferred / remaining (kept on `theme.palette`)

- **`custom-color` / `custom-color-ghost`** — dynamic user `color` prop. (custom-color-ghost's *backdrop*
  is tokenised via `variantGhostPrimary`; the custom hue stays dynamic.)
- **Ripple** (`.btn-ripple`) + decorative secondary chip (`.ds-icon:before`, blue-200) and focus-ring
  accents (blue-300) + expander focus keyframe — transient/decorative.
- **`readOnly` per-variant freeze block** (`Button.styles.tsx`) — frozen non-interactive hover/focus
  styling per variant; separate concern, deferred.
- :warning: **Suspected token bug:** `primary-danger` `bg-hover` red-700 / `bg-active` red-600 — swapped
  vs current; kept `theme.palette`; flag for design-tokens.
- `Checkbox.styles.ts` / `Star.styles.ts` internal `svg { fill }` (no clean icon-layer token) — deferred.
- `--ds-form-icon-color-{hover,focus,disabled}` and a few `button-expander` hover/disabled states have
  **no matching markup** (icons are single-colour + opacity-disabled by design) — N/A, not force-applied.

---

### form group (form · input · select · switch)

(checkbox + radio reported above.) Across the whole form family the **styled-component TS was migrated**
to `--ds-form-field-*` / `--ds-form-icon-* `/ `--ds-form-switch-*` + semantic. The `*.mixin.less` files were
**removed** (deantd) for `input`/`checkbox`/`radio`/`switch` — their per-state visual styling now lives in each
package's `.styles.ts` on `theme.palette`, so it is **directly tokenisable** (no antd Less blocker). **Only
`select` still has `.less`** (`select.mixin.less`); `select`/`checkbox` also use data-URI SVG icons.

#### input — :white_check_mark: TS complete

31 module + 15 semantic + 1 opacity. Field surface/border/bg/focus/error/placeholder/value →
`--ds-form-field-*`; action icons → `--ds-form-icon-color-default` + `icon-brand`; labels/counter/
description/chips/remove-icon → semantic; disabled icon opacity → `--ds-opacity-disabled`. Converted
`svg { fill }` rules to `color` inheritance.

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Action-icon default | grey-600 `#6a7580` | `--ds-form-icon-color-default` grey-400 `#b5bdc3` | Lighter |
| Input disabled text | grey-500 `#949ea6` | `--ds-form-field-text-disabled` grey-400 `#b5bdc3` | Lighter |
| Textarea disabled bg | grey-050 `#f9fafb` | `--ds-form-field-bg-disabled` grey-100 `#f3f5f6` | Darker |

#### select — :construction:

9 form-field + 3 semantic. Error/affix/disabled surfaces → `--ds-form-field-*`. **Diff:** disabled
selector bg grey-050 → grey-100 (darker). **Deferred:** search-icon (data-URI SVG, can't take `var()`),
`.ant-select-arrow { opacity: 0.5 }` (no 0.5 token), `.less`.

#### switch — :construction:

Error text → `--ds-form-switch-text-error` (exact); description text → `--ds-form-switch-text-description`
(**diff:** grey-600 → grey-700, darker). Track/handle/bg styling now lives in `RawSwitch.styles.ts` on palette
(`.less` removed — directly tokenisable, no antd Less blocker).

#### form — :white_check_mark: (minimal)

One value: the "Add row" action icon → `--ds-color-icon-brand-default` (semantic; the form module icon
tokens are grey, wrong intent for a brand action icon — matches the ghost-primary button it sits in).
