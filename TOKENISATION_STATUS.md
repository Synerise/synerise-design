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

> **Token sync `e0301675d` (design-tokens@1cd43721, 2026-06-08).** Cherry-picked onto this branch.
> Value-only re-point of `modules/base.json` (58 refs changed, 14 `separator` tokens added, none
> removed). Affects already-migrated code in two places: **divider** line colours (the previous
> "Lighter" diffs are now resolved — see below) and **button** `primary-danger`/`primary-success`
> focus rings (red/green → brand-blue). Radio dot/hover and secondary/ghost button values also changed
> but live in deferred `.less` / deferred variants (notes refreshed below). No token referenced in code
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
   (`file-uploader`, `menu`, `table`, `card-tabs`, `manageable-list`) for last.

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
| [avatar](#avatar) | `avatar` | :white_check_mark: | :heavy_minus_sign: | :white_check_mark: | :x: | 0 | Yes (1) | static colors done; dynamic bg kept (user-driven) |
| [buttons](#button) | `button` | :white_check_mark: | :construction: | :x: | :x: | 11 | No | :warning: all standard variants tokenised (secondary/tertiary/ghost backgrounds via alpha-modifier tokens); redesigns applied (secondary pressed blue→grey, tertiary/ghost hover-text shifts) — flag for review; custom-color dynamic; readOnly freeze + ripple on palette |
| [button-expander](#button) | `button` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 1 | — | bg/border/icon tokenised |
| [card](#card) | `card` | :white_check_mark: | :construction: | :white_check_mark: | :x: | 0 | No | surface+shadow-1 done; active shadow + CardBadge dynamic deferred |
| [card-select](#card-select) | `card-select` | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | 4 | No | borders/shadow/opacity tokenised; check-token naming flagged for UX |
| [description-line](#description) | `description` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | 0 | No | module + semantic; inactive star deferred |
| [divider](#divider) | `divider` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 0 | No | line + label tokenised; colour diffs resolved by sync `e0301675d` |
| [form](#form-group-form--input--select--switch) | `form` / `input` / `checkbox` / `radio` / `switch` / `select` | :construction: | :construction: | :construction: | :x: | 4 | Yes (many) | TS migrated across all 6 packages; per-state styling in `.less` + data-URI SVGs deferred |
| [inline-alert](#inline-alert) | `inline-alert` | :white_check_mark: | :heavy_minus_sign: | :white_check_mark: | :heavy_minus_sign: | 0 | No | 4 variants + text; icon `-default`/`-hover` branches (sync `66dddd0a`); hover done |
| [inline-edit](#inline-edit--inline-select) | `inline-edit` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | 0 | No | text/icon tokenised; gradient underlines deferred |
| [inline-select](#inline-edit--inline-select) | `inline-edit` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | 0 | No | lives in inline-edit package |
| [list-item](#list-item) | `list-item` | :white_check_mark: | :heavy_minus_sign: | :white_check_mark: | :x: | 2 | No | 31 module + 7 semantic; many svg fills → inheritance |
| [modal](#modal) | `modal` | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | 1 | No | shadow-2; mask grey-800→grey-700 |
| [navbar](#navbar) | `navbar` | :white_check_mark: | :heavy_minus_sign: | :white_check_mark: | :x: | 2 | No | :warning: default bg blue→grey |
| page | `page-header` | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | — | No | `--ds-page-bg` unused (no full-page bg in code) |
| [page-header](#page-header) | `page-header` | :white_check_mark: | :white_check_mark: | :heavy_minus_sign: | :x: | 0 | No | module + semantic; shadow-1 |
| pagination | `pagination` | :x: | :heavy_minus_sign: | :x: | :x: | — | Yes (2) | ⛔ all styling in `.less` — code-side N/A, blocked on antd Less decision |
| [popconfirm](#popconfirm) | `popconfirm` | :white_check_mark: | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | 1 | Yes (1) | shadow-2; module renamed `popcornfirm`→`popconfirm` (sync `66dddd0a`); carousel dots deferred |
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
| alert | 44 | Yes (2) | 9 | 11 | Heavy palette + Less usage |
| autocomplete | 10 | Yes (2) | 3 | 0 | |
| avatar-group | 8 | No | 2 | 2 | |
| badge | 11 | Yes (1) | 4 | 4 | |
| banner | 10 | Yes (1) | 0 | 0 | |
| block | 6 | No | 0 | 0 | |
| button-group | 6 | No | 4 | 0 | |
| card-tabs | 68 | No | 2 | 4 | High palette count |
| cascader | 34 | No | 5 | 10 | |
| [checkbox](#checkbox--radio) | 9 | Yes (2) | 4 | 1 | :construction: TS focus/indeterminate/hover borders → `--ds-form-checkbox-*`; check icons (data-URI SVG) + `.less` mixin deferred |
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
| [input](#form-group-form--input--select--switch) | 49 | Yes (2) | 14 | 2 | :white_check_mark: TS migrated → `--ds-form-field-*`/`--ds-form-icon-*` + semantic; `.less` deferred |
| input-number | 5 | Yes (2) | 5 | 0 | |
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
| menu | 102 | Yes (2) | 5 | 21 | Very high palette + opacity |
| metric-card | 2 | No | 0 | 3 | |
| operators | 6 | No | 0 | 0 | |
| panel | 2 | No | 1 | 0 | |
| panels-resizer | 4 | No | 0 | 0 | |
| popover | 0 | No | 0 | 2 | |
| [radio](#checkbox--radio) | 1 | Yes (2) | 3 | 4 | :construction: description + disabled-opacity → `--ds-form-radio-*`; bulk styling in `.less` deferred |
| result | 3 | No | 0 | 0 | |
| scrollbar | 17 | Yes (2) | 0 | 17 | |
| search | 13 | Yes (2) | 4 | 8 | |
| search-bar | 12 | No | 1 | 0 | |
| [select](#form-group-form--input--select--switch) | 13 | Yes (2) | 6 | 3 | :construction: TS → `--ds-form-field-*` + semantic; search-icon data-URI + `.less` deferred |
| short-cuts | 7 | No | 1 | 0 | |
| sidebar | 14 | Yes (1) | 1 | 2 | |
| sidebar-object | 9 | No | 0 | 0 | |
| skeleton | 5 | No | 0 | 15 | |
| slider | 12 | No | 4 | 0 | |
| sortable | 3 | No | 1 | 2 | |
| status | 7 | No | 0 | 1 | Token Studio has status-pill tokens |
| step-card | 5 | No | 1 | 13 | |
| subject | 2 | No | 0 | 0 | |
| subtle-form | 10 | No | 1 | 4 | |
| [switch](#form-group-form--input--select--switch) | 2 | Yes (2) | 2 | 2 | :construction: error/description text → `--ds-form-switch-*`; track/handle in `.less` deferred |
| table | 65 | Yes (2) | 8 | 23 | Heavy palette + Less |
| tag | 25 | No | 2 | 3 | |
| tags | 7 | No | 0 | 0 | |
| toolbar | 4 | No | 1 | 0 | |
| tooltip | 3 | No | 2 | 2 | |
| tray | 4 | No | 1 | 0 | |
| typography | 8 | Yes (1) | 0 | 1 | |
| unordered-list | 1 | No | 0 | 0 | |
| wizard | 6 | No | 0 | 0 | |

### Packages with no color-related code

These packages have zero `theme.palette`, shadow, and opacity usage:

`checkbox-tristate`, `flex-box`, `grid`, `ordered-list`

---

## Token audit — semantic & palette usage (2026-07-17)

Static scan of every tokenised component's `src` (`.ts`/`.tsx`; excluding `__specs__`/`.spec.`/`.test.`/
`.figma.`/`.stories.`/`dist`) for **(a)** direct `theme.palette` colour usage in code — CSS-in-JS strings
**and** TS logic / `<Icon color=…>` props — and **(b)** semantic-token usage (`--ds-color-*`, `--ds-shadows-*`,
`--ds-opacity-*`) where a component-level **module** token is the preferred layer.

Palette counts are split into **review** (static colours that are candidates to tokenise) vs **deferred**
(dynamic `customColor`/`color`-prop values, decorative gradients/ripple, data-URI SVG icons — not tokenisable
in Phase 1). "Semantic" counts semantic-token occurrences.

### Summary

| Component | palette (review / total) | semantic | Notes |
|-----------|--------------------------|----------|-------|
| section-message | 7 / 13 | 0 | legacy/unused styled-comps + NumberWrapper gradient; close-icon `grey-700` tokenisable |
| toast | 1 / 2 | 6 | `shadow-2` (module `toast.shadow` pruned); `blue-600` icon-order hover tokenisable |
| broadcast-bar | 0 / 0 | 0 | ✓ clean |
| app-menu | 0 / 0 | 5 | `shadow-1` (module `app-menu.container.shadow` pruned); `border-base-subtle` (module mismatch, documented) |
| avatar | 1 / 2 | 5 | palette = dynamic bg (user-driven); semantic appropriate |
| button | 66 / 84 | 25 | ⚠ **largest debt** — readOnly per-variant freeze + `Creator/` + internal `Checkbox/`,`Star/` sub-comps + ripple/decorative |
| card | 0 / 3 | 8 | `shadow-1` (module `card.shadow.*` pruned); CardBadge dynamic/inset ring deferred |
| card-select | 0 / 0 | 3 | ✓ semantic fallbacks documented |
| description | 1 / 1 | 4 | inactive star `grey-300` `<Icon color>` (no on-system icon token) |
| divider | 0 / 0 | 0 | ✓ clean |
| form | 0 / 0 | 1 | ✓ `icon-brand-default` |
| input | 13 / 14 | 18 | ⚠ **live** main `StyledInput`: bg/border/`:hover`/`:focus`/`:disabled` still `theme.palette` (`Input.styles.tsx:199–236`) — only text uses `--ds-form-field-*`; TS **not** fully complete despite table `:white_check_mark:` |
| checkbox | 17 / 18 | 0 | per-state colours on palette (`.styles.ts` + `.less` + data-URI) — deferred (antd Less decision) |
| radio | 28 / 31 | 0 | ⚠ largest single-file palette (`Radio.styles.tsx`) — full radio + radio-group states |
| switch | 10 / 10 | 0 | track/handle/label states on palette (`RawSwitch.styles.ts`, `Switch.styles.ts`) |
| select | 0 / 1 | 2 | palette dynamic; `.less` + data-URI search icon deferred |
| inline-alert | 0 / 0 | 1 | ✓ (`opacity-disabled`) |
| inline-edit | 5 / 5 | 4 | focus/error/disabled underline gradient colours (decorative, deferred) |
| list-item | 0 / 1 | 10 | palette decorative; semantic (focus/brand/neutral/base) appropriate |
| modal | 2 / 3 | 4 | `shadow-2` (module `modal.container.shadow` pruned); title `grey-200` bottom border + gradient |
| navbar | 0 / 0 | 3 | ✓ `text-onsolid-default` |
| page-header | 0 / 0 | 8 | `shadow-1` (module `page-header.container.shadow` pruned) |
| popconfirm | 4 / 4 | 4 | carousel dots (`grey-600`/`green-600`/white — deferred, `.less`); `shadow-2` (no module shadow token) |
| progress-bar | 0 / 0 | 0 | ✓ clean |
| status | 0 / 0 | 0 | ✓ clean |
| stepper | 0 / 0 | 0 | ✓ clean |
| tabs | 5 / 9 | 6 | `blue-500` focus (no token in `66dddd0a`) + decorative dashed gradients |
| time-picker | 0 / 0 | 5 | ✓ semantic (base/border/icon/opacity) appropriate |

### Cross-cutting findings

1. **Shadow module tokens are pruned → semantic used.** `app-menu`, `card`, `modal`, `page-header`, `toast`
   consume `--ds-shadows-shadow-{1,2}` because their module `*.shadow` tokens (`app-menu.container.shadow`,
   `card.shadow.*`, `modal.container.shadow`, `page-header.container.shadow`, `toast.shadow`) are in the
   8-token **pruned** set — they reference `shadow.level.*` primitives that don't exist upstream yet. Switch to
   the module shadow tokens once those primitives land (consume-only; needs an upstream token change).
   `popconfirm` uses semantic `shadow-2` because it has **no** module shadow token at all.

2. **Largest palette debt = form family + button.** `input` (13), `checkbox` (17), `radio` (28), `switch` (10),
   `button` (66 review) still carry per-state colours as direct `theme.palette` — and much of it lives in
   `.styles.ts`/`.tsx`, **not only** the deferred `.less`. Deferred pending the antd Less/theming decision, but
   the debt is broader than "just `.less`". ⚠ `input`'s **live** main `StyledInput` still sets bg / border /
   `:hover` / `:focus` / `:disabled` from `theme.palette` (`Input.styles.tsx:199–236`) — only the text colours
   were migrated to `--ds-form-field-*`, so the input TS is **not** fully complete despite the summary table
   marking it `:white_check_mark:` (correct that row when the field surface migrates). The `button` package also
   has internal `Checkbox/`, `Star/`, `Creator/` sub-components fully on palette plus the readOnly per-variant
   freeze block.

3. **Decorative / legacy palette in otherwise-complete components** (mostly already documented as deferred):
   `section-message` (legacy/unused styled-comps + gradient), `toast` (gradient + `blue-600` icon-order hover),
   `modal` (title `grey-200` border + description gradient), `tabs` (`blue-500` focus + dashed gradients),
   `popconfirm` (carousel dots), `inline-edit` (focus/error underline gradients), `description` (inactive star),
   `card` (CardBadge). Tokenisable quick wins: `toast` `blue-600` icon hover → `icon-brand-default`;
   `section-message` close-icon `grey-700` → `icon-base-default`; `modal` title border `grey-200` →
   `border-base-default` (or a `--ds-modal-*` border token).

4. **Semantic usage is otherwise appropriate.** Outside the shadow gap, semantic tokens are used where no module
   token covers the role (focus rings, `opacity-disabled/muted`, brand/neutral text, base surfaces) — consistent
   with the granularity rule. Fully clean (zero code palette, only appropriate semantic): `broadcast-bar`,
   `divider`, `progress-bar`, `status`, `stepper`, `navbar`, `page-header`, `time-picker`, `card-select`,
   `app-menu`, `list-item`, `form`, `inline-alert`.

5. **`blue-500` focus (tabs) has no token yet** — the changelog's `--ds-tabs-item-text-focus` /
   `color.focus.base.subtle` are not in the merged `66dddd0a`, so `tabs` keeps `blue-500` (already flagged to UX).

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
title `#404c5a` hardcoded (no token). `.less` file (antd Carousel overrides) — not migrated.

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
**Status:** ⛔ **Blocked — code-side N/A.** All colour/opacity/focus styling lives in `.less`
(`style/pagination.less`, `style/index.less`); the JS/TSX source has zero tokenisable references. Module
tokens (`--ds-pagination-*`, 18) exist and are emitted, but applying them requires migrating the `.less`,
which is deferred pending the antd Less theming decision. The would-be mappings carry several design-intended
diffs (nav icons darker, active page grey-600→grey-700, item hover translucent-grey → brand blue-50).

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
path, so semantic `text-onsolid` was the correct choice. `.less` file (antd avatar) deferred. SVG icon
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

Both components keep the **bulk of their styling in `.less`** (`*.mixin.less`) and, for checkbox, in
**data-URI SVG** check icons — neither can take CSS custom properties in Phase 1.

#### checkbox — applied

Focus border + focus ring, indeterminate inner bg/border, and hover-preview border → `--ds-form-checkbox-*`
(all exact, no diffs). **Deferred:** the checked/indeterminate/hover check icons are `data:image/svg+xml`
background-images with hex inlined into the URI — a `var()` cannot be encoded there, so they stay
hardcoded; `blue-500` indeterminate-hover bg (no token); and the `checkbox.mixin.less` (per-state
border/bg/label colours, error elevation shadow, disabled opacity).

#### radio — applied

Description text → `--ds-form-radio-text-description`; disabled opacity (label + description) →
`--ds-form-radio-disabled-opacity`. **Visual diff:** description text grey-600 `#6a7580` → grey-700
`#57616d` (darker, design-intended). **Deferred:** the radio dot/border/bg/hover/selected states live in
`radio.mixin.less`.

> **Sync `e0301675d` forward-note (affects the deferred `.less` work, not the migrated `.tsx`):** the
> selected inner dot `--ds-form-radio-dot-color` was re-pointed `{background.base.default}` →
> `{background.brand.solid}`, so it now resolves to **brand-blue `#0b68ff`** (was white) — a bug-fix.
> The hover ring `--ds-form-radio-border-color-hover` was re-pointed `{background.brand.solid}` →
> `{border.base.strongHover}`, now **grey-400 `#b5bdc3`** (was blue-600). The upstream token
> `$description` strings still read "white"/"blue.600" and are **stale**. When the `radio.mixin.less`
> migration lands, expect a grey hover ring + brand-blue selected dot — coordinate with design.

> Follow-up: checkbox/radio can only be fully tokenised once the antd `.less` theming decision lands; the
> data-URI check icons need a different mechanism (e.g. a real `<Icon>` or `mask` driven by `currentColor`).

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

#### Visual diffs

| Property | Was | Token resolves to | Delta |
|----------|-----|-------------------|-------|
| Expander disabled border | grey-200 `#e9edee` | `…-border-disabled` grey-300 `#dbe0e3` | Slightly darker |
| Primary-danger / -success focus ring | red-600 / green-600 | `…-border-focus` blue-600 | :warning: → brand-blue (sync `e0301675d`) |
| **secondary** active (pressed) | blue-100 bg / blue-600 text | grey-400 bg / white text | :warning: **blue → grey** redesign |
| **secondary** focus bg | grey-050 | grey-100 (`base.muted`) | slightly darker |
| **secondary** hover border | grey-300 | blue-300 (`border-brand-strong`) | brand border on hover |
| **secondary** disabled | grey-700@40% / grey-050@40% | grey-600 / grey-100 (solid) | un-faded |
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
to `--ds-form-field-*` / `--ds-form-icon-* `/ `--ds-form-switch-*` + semantic, but each package keeps a
`*.mixin.less` that owns much of the per-state visual styling (and `select`/`checkbox` use data-URI SVG
icons) — those are deferred pending the antd Less decision.

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
(**diff:** grey-600 → grey-700, darker). Track/handle/bg styling lives in `switch.mixin.less` (deferred).

#### form — :white_check_mark: (minimal)

One value: the "Add row" action icon → `--ds-color-icon-brand-default` (semantic; the form module icon
tokens are grey, wrong intent for a brand action icon — matches the ghost-primary button it sits in).
