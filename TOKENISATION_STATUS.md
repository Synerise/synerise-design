# Design Token Migration Status

Tracks the progress of migrating components from `theme.palette` / hardcoded values to CSS custom properties generated from the Token Studio design tokens in `packages/tokens/`.

> **:warning: TEMP — remove before merge to master.** Chromatic snapshots are globally
> disabled in `packages/storybook/.storybook/preview.tsx`
> (`parameters.chromatic = { disableSnapshot: true }`) to skip baseline churn while token
> colours are still in flux. This **must** be reverted before `chore/tokenisation` merges to
> master, otherwise visual regression coverage stays off for the whole system.

> **Merge batch 2026-07-23.** Twelve tokenisation branches merged into `chore/tokenisation` today:
> `date-picker-calendar-tokens`, `avatar-tokens`, `tag-tokens`, `code-snippet-tokens`, `cruds-tokens`,
> `date-range-picker-tokens`, `tags-tokens`, `tooltip-tokens`, `code-area-tokens`, `logic-tokens`,
> `image-tokens`, `skeleton-tokens`. Delivered: date-picker / date-range-picker calendar + dropdown
> grids (new `calendar` module namespace) with the Figma day-state redesign; tag / tags, cruds,
> code-area / code-snippet, image, logic tokenised; avatar initials text + avatar-group ring tightened
> to the avatar module. Still :construction: pending upstream token defs: `tooltip` (key-cap
> `--ds-tooltip-key-*`), `skeleton` (shimmer keyframe opacity). **Totals corrected** to match the
> current table (was :white_check_mark: 73 · :construction: 19 · :x: 18 · 24 awaiting; now
> :white_check_mark: 80 · :construction: 15 · :x: 15 · 22 awaiting). Storybook story backgrounds were
> also swept off hardcoded hex onto the page background token (`--ds-page-bg`, matching the
> preview canvas); the PanelResizer demo keeps distinct tinted surfaces.
> (Separately, the avatar initials → categorical custom-color token catalog is in flight on
> `feature/categorical-color-tokens`, MR !3839 — not part of this batch.)

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

### Unified tracking table

Single at-a-glance view of every colour-bearing component: migration **status** + whether it is **awaiting token definitions** (a pending module namespace, a missing semantic role, or a `.less`/de-antd blocker). Sourced from the two detailed tables below + `TOKEN_AUDIT.md` blockers. **Update this table (and the detailed one) whenever `apply-tokens` migrates a component.**

**Totals:** ✅ 97 done · 🚧 8 partial · ❌ 7 not started · ⛔ 3 deprecated · ➖ 4 n/a — **12 awaiting token defs** (flag in last column).

> **`theme.palette` holdouts (to retire):** dynamic `color`/`customColor` props still resolve via `theme.palette` → migrate to ds-utils `resolveCustomColor`: **badge** (local dup helper), **avatar** (ObjectAvatar), **section-message**, **button**, **loader**. Static gap: **inline-edit** (`:active` bg grey-300, no token). Fully untokenised (new): **rich-text**, **rich-text-renderer**. Role-specific cases (text/border/icon-custom) need `resolveCustomColor` extended with a `role` option + manifest role maps.

| Component | Layer | Status | Awaiting token defs / blocker |
|---|---|:--:|---|
| action-area | semantic | ✅ | — |
| ai-chat | module | ➖ | — |
| alert | semantic | ⛔ | — |
| app-menu | module | ✅ | — |
| autocomplete | module | ✅ | — |
| avatar | module | ✅ | icon-bg/icon-icon/text-bg variant tokens deferred → UX (shared categorical palette, see card-tabs) |
| avatar-group | module | ✅ | — |
| badge | module | ✅ | — |
| banner | semantic | ✅ | — |
| block | semantic | ✅ | — |
| broadcast-bar | module | ✅ | — |
| button-expander | module | ✅ | — |
| button-group | module | ✅ | — |
| button | module | 🚧 | partial (refactor/button-tokens) — statics → module/semantic (blue-100→bg-brand-subtlehover, blue-300→border-brand-strong, blue-600→focus-base-default, grey-300→border-base-strong, grey-500→text-neutral-default, red-600→text-danger-default, white→buttons-custom-color-text-*/onsolid/bg-base-default) + `customColor`/`iconColor` → ds-utils `resolveCustomColor` + Expander focus keyframe. Left on palette (no token, flagged): blue-200 icon-chip bg, red-200 error-hover bg, blue-500 upload-hover text, grey-200 translucent (hexToRgba). Button.variants.ts palette dispatch out of scope |
| buttons | module | ✅ | — |
| card | module | ✅ | — |
| card-select | module | ✅ | — |
| card-tabs | module | ✅ | fully on `--ds-card-tabs-variant-*` module tokens (bg/border/text/icon/tag/dot/handler/shadow/opacity), threading grey/white by `greyBackground`; per-tab active colour from the `ordered` categorical set (order-1..21); `grey-100` pressed → semantic base-muted. ⚑ invalid-hover/pressed bg now `validateactivehover` (darker). Kept: dynamic `color`-prop lookups + decorative caret gradients. `svg{fill}` still explicit token (currentColor cleanup deferred) |
| carousel | semantic | ✅ | — |
| cascader | semantic | ❌ | dropdown/cascader pending |
| checkbox | module | ✅ | — |
| code-area | module (form) | ✅ | — |
| code-snippet | module | ✅ | .less = font-face only |
| collector | module | ✅ | — |
| color-picker | module | ✅ | — |
| column-manager | semantic | ✅ | — |
| completed-within | module | ✅ | — |
| condition | semantic | ✅ | connector tokens pending |
| confirmation | semantic | ✅ | — |
| context-selector | module | ✅ | — |
| copy-icon | semantic | ✅ | — |
| cruds | module | ✅ | — |
| date-picker | module (form+calendar+dropdown) | ✅ | — |
| date-range-picker | module (form+calendar+dropdown) | ✅ | — |
| description-line | module | ✅ | — |
| divider | module | ✅ | — |
| drawer | semantic | ✅ | mask → `--ds-color-background-overlay-default` (⚑ scrim shift) |
| dropdown | module | 🚧 | dropdown bottom-action / back-action / search-icon pending |
| editable-items-list | semantic | ✅ | — |
| emoji-picker | semantic | ✅ | — |
| empty-states | semantic | ✅ | — |
| estimation | module | ✅ | — |
| factors | module | 🚧 | 2 danger-hover refs pending --ds-color-*-danger-hover (red-500) |
| field-set | semantic | ✅ | — |
| file-uploader | semantic | ❌ | **deferred — file-uploader module pending (whole component)** |
| filter | semantic | ✅ | — |
| flag | semantic | ➖ | — |
| footer | semantic | ✅ | — |
| form | module | ✅ | — |
| form-field | module | ✅ | ⚑ counter/RightSide on semantic `text-neutral-default` — no form-counter module token; could be defined |
| format-picker | module | ✅ | — |
| icon-picker | module | ✅ | — |
| image | module | ✅ | — |
| information-card | module | ✅ | — |
| inline-alert | module | ✅ | — |
| inline-edit | module | ✅ | ⚑ `:active` pressed bg grey-300 kept on palette — no grey-300 bg token |
| inline-select | module | ✅ | — |
| input | module | ✅ | — |
| input-number | module | ✅ | — |
| insight | semantic | ✅ | — |
| item-filter | semantic | ✅ | deprecated pkg — tokenised on request |
| item-picker | module | ✅ | — |
| items-roll | semantic | ✅ | — |
| layout | module | ✅ | — |
| list | semantic | ✅ | — |
| list-item | module | ✅ | — |
| loader | semantic | ✅ | — |
| logic | semantic | ✅ | ⚑ review: bg-token-for-text mismatch + `background-danger-solidActive`=red-600 (upstream) |
| manageable-list | semantic | ✅ | — |
| mapping | module | ✅ | — |
| menu | semantic | ⛔ | — |
| metric-card | module | ✅ | — |
| modal | module | ✅ | — |
| navbar | module | ✅ | — |
| operators | semantic | ✅ | — |
| page | module | ➖ | — |
| page-header | module | ✅ | — |
| pagination | module | ✅ | — |
| panel | semantic | ✅ | — |
| panels-resizer | semantic | ✅ | — |
| popconfirm | module | ✅ | — |
| popover | semantic | ➖ | — |
| progressbar | module | ✅ | — |
| radio | module | ✅ | — |
| result | semantic | ✅ | — |
| rich-text | semantic | ❌ | new (de-antd merge); untokenised — greys/blues/reds + mars/purple gradient on `theme.palette` (RichText.styles) |
| rich-text-renderer | semantic | ❌ | new; untokenised — greys/blues on `theme.palette` (RichTextRenderer.styles) |
| scrollbar | semantic | ✅ | ⚑ resting thumb grey-300→base-strong (grey-400); veil kept (no light-scrim token) |
| search | module | ✅ | — |
| search-bar | module | ✅ | — |
| section-message | module | ✅ | — |
| select | module | 🚧 | chip bg (grey-200/300) — no grey background token yet |
| short-cuts | semantic | 🚧 | box-shadow rgba(35,41,54) has no --ds-shadows-shadow-* match; ⚑ dark-key bg grey-600→grey-700 |
| sidebar | semantic | ✅ | — |
| sidebar-object | module | ✅ | — |
| skeleton | module | 🚧 | shimmer keyframe opacity token pending |
| slider | module | ✅ | chrome fully on `--ds-slider-*` module tokens (track/handle/value-tooltip/tag) landed via sync !3869; track fill = `--ds-slider-fill-default` (default) + `ordered` categorical slots (allocation/3+-handle); `resolveTrackColor` keeps custom `tracksColorMap` palette keys. ⚑ none (module keeps disabled-handle grey-300). Kept literal: active-handle focus-ring `rgba(35,138,254,.25)` — needs a translucent focus-ring token (design-tokens follow-up) |
| sortable | semantic | ✅ | — |
| status | module | ✅ | — |
| status-pill | module | ✅ | — |
| step-card | semantic | ✅ | — |
| stepper | module | ✅ | — |
| subject | semantic | ✅ | — |
| subtle-form | semantic | ❌ | translucent-surface token gap |
| switch | module | ✅ | — |
| table | semantic | ⛔ | — |
| table-new | semantic | 🚧 | colours tokenised → semantic (2026-07-23); WIP: feature still in active dev; kept dynamic: translucent scroll-shadow (grey-500 @12%, no token) + runtime tree-level/child-row palette lookups |
| tabs | module | 🚧 | — |
| tag | module | ✅ | — |
| tags | module (tag) | ✅ | — |
| time-picker | module | ✅ | — |
| toast | module | ✅ | — |
| toolbar | semantic | ✅ | — |
| tooltip | module | 🚧 | key-cap tokens (`--ds-tooltip-key-*`) pending |
| tray | module | ✅ | — |
| typography | semantic | ✅ | — |
| unordered-list | semantic | ✅ | — |
| wizard | semantic | ✅ | — |

> **Legend:** ✅ fully done · 🚧 partial · ❌ not started · ⛔ deprecated (won't tokenise) · ➖ n/a (no colour code). *Layer* = has a module namespace (`module`) or maps to semantic tokens (`semantic`).


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
| [card](#card) | `card` | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | 2 | No | redesign adopted (2026-07-23): variant white/grey/outline + header/footer/badge + raised/hover shadow; ⚑ badge-warning bg yellow-500→600, raised/lively @box-shadow-active→shadow-2 |
| [card-select](#card-select) | `card-select` | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | 4 | No | borders/shadow/opacity tokenised; check-token naming flagged for UX |
| [description-line](#description) | `description` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | 0 | No | module + semantic; inactive star deferred |
| [divider](#divider) | `divider` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 0 | No | line + label tokenised; colour diffs resolved by sync `e0301675d` |
| [form](#form-group-form--input--select--switch) | `form` / `input` / `checkbox` / `radio` / `switch` / `select` | :construction: | :construction: | :construction: | :x: | 4 | No | TS migrated; per-state styling in `.styles.ts` (all de-antd, `.less` removed); `select` tokenised — chip bg deferred |
| [inline-alert](#inline-alert) | `inline-alert` | :white_check_mark: | :heavy_minus_sign: | :white_check_mark: | :heavy_minus_sign: | 0 | No | 4 variants + text; icon `-default`/`-hover` branches (sync `66dddd0a`); hover done |
| [inline-edit](#inline-edit--inline-select) | `inline-edit` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | 0 | No | text/icon tokenised; gradient underlines deferred |
| [inline-select](#inline-edit--inline-select) | `inline-edit` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | 0 | No | lives in inline-edit package |
| [list-item](#list-item) | `list-item` | :white_check_mark: | :heavy_minus_sign: | :white_check_mark: | :x: | 2 | No | 31 module + 7 semantic; many svg fills → inheritance |
| [modal](#modal) | `modal` | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | 1 | No | shadow-2; mask grey-800→grey-700 |
| [navbar](#navbar) | `navbar` | :white_check_mark: | :heavy_minus_sign: | :white_check_mark: | :x: | 2 | No | :warning: default bg blue→grey |
| page | `page-header` | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | :heavy_minus_sign: | — | No | `--ds-page-bg` unused (no full-page bg in code) |
| [page-header](#page-header) | `page-header` | :white_check_mark: | :white_check_mark: | :heavy_minus_sign: | :x: | 0 | No | module + semantic; shadow-1 |
| [pagination](#pagination) | `pagination` | :white_check_mark: | :heavy_minus_sign: | :x: | :x: | 0 | No | tokenised vs `--ds-pagination-*` (sync `66dddd0a` pass); jumper input via semantic |
| [popconfirm](#popconfirm) | `popconfirm` | :white_check_mark: | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | 2 | No | shadow-2; module renamed `popcornfirm`→`popconfirm` (sync `66dddd0a`); carousel dots now in `.styles.tsx` (`.less` removed); ConfirmMessage title `#404c5a` → `-header-text` (⚑ grey-800) |
| [progressbar](#progress-bar) | `progress-bar` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 1 | No | track + value + default fill tokenised (sync `66dddd0a`); multivalue slots caller-driven (deferred) |
| [status-pill](#status-status-pill) | `status` | :white_check_mark: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 2 | No | text/border split; custom kept dynamic |
| [stepper](#stepper) | `stepper` | :construction: | :heavy_minus_sign: | :heavy_minus_sign: | :x: | 7 | No | :warning: done green→blue, active grey→blue; warning state migrated (sync `66dddd0a`); filled-circle content deferred |
| [tabs](#tabs) | `tabs` | :construction: | :heavy_minus_sign: | :white_check_mark: | :x: | 1 | No | main states done; decorative gradients + blue-500 focus deferred |
| [time-picker](#time-picker) | `time-picker` | :white_check_mark: | :heavy_minus_sign: | :white_check_mark: | :x: | 2 | No | 8 module + semantic; no elevation shadow |
| [tooltip](#tooltip) | `tooltip` | :construction: | :white_check_mark: | :heavy_minus_sign: | :x: | 0 | No | surface/footer/text + shadow-2 done; key-cap bg/border/shadow await `--ds-tooltip-key-*` |

### Components without module-level tokens

These components use `theme.palette` / hardcoded colors but do not yet have dedicated token definitions in Token Studio. They can use semantic tokens directly or need token definitions added.

| Package | palette refs | Less? | shadow refs | opacity refs | Notes |
|---------|-------------|-------|-------------|--------------|-------|
| action-area | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-20 pass) |
| alert | 44 | Yes (2) | 9 | 11 | ⛔ **deprecated** — will not be tokenised |
| autocomplete | 1 | No | 3 | 0 | :construction: field surface → `--ds-form-*` (2026-07-20); dropdown NotFound deferred |
| avatar-group | 0 | No | 0 | 2 | :white_check_mark: tokenised — reuses **avatar** module (2026-07-21); 5 ⚑ shifts on +N chrome; 2 fan-out opacities kept |
| badge | 11 | No | 4 | 4 | :white_check_mark: tokenised (2026-07-22) — badge module landed + applied: variant bg/text/ring tokens; `customColor` kept dynamic; ⚑ label grey-600→grey-500. `.less` removed (deantd) |
| banner | 2 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-20 pass); 2 palette = dynamic status-Tag defaults |
| block | 6 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-23) |
| button-group | 0 | No | 0 | 0 | :white_check_mark: tokenised (2026-07-24) — split separators → **buttons** module per-variant `separator`; tertiary disabled label → buttons module; error outline/ring → semantic `border-danger-default`; description → `text-base-muted`; ButtonDivider → **divider** module. ⚑ separators adopt UX per-variant colours + 2× grey-500→grey-600 |
| card-tabs | 68 | No | 2 | 4 | High palette count |
| carousel | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-20 pass); new DS component, not in original audit |
| cascader | 34 | No | 5 | 10 | |
| [checkbox](#checkbox--radio) | 0 | No | 4 | 1 | :white_check_mark: fully tokenised — focus/indeterminate/hover → `--ds-form-checkbox-*`; indeterminate-hover fill blue-500 → semantic `background-brand-solidhover` (exact); check icons = currentColor SVG |
| code-area | 6 | No | 1 | 1 | :construction: field surface + error text → `--ds-form-*` (2026-07-20); Monaco constants (CSS-var constraint) + fullscreen deferred |
| code-snippet | 14 | No¹ | 0 | 2 | :white_check_mark: fully tokenised (2026-07-23) — chrome→--ds-code-snippet-surface/copy, syntax→--ds-code-snippet-syntax-*, inline→--ds-code-snippet-inlinecode-*. ¹`.less` = font-face only |
| collector | 11 | No | 1 | 2 | :construction: placeholder → `--ds-form-*` (2026-07-20); chips/dropdown deferred |
| color-picker | 0 | No | 2 | 0 | :white_check_mark: field affix + picker panel → `--ds-form-*`/`--ds-dropdown-*` + semantic; `.react-colorful__pointer-fill` white → semantic `background-base-default` (exact); colour-value props stay dynamic |
| column-manager | 0 | No | 1 | 5 | :white_check_mark: tokenised — semantic (2026-07-20 pass) |
| completed-within | 1 | No | 1 | 3 | :construction: clear icon → `--ds-color-icon-danger-default` (2026-07-20); `Settings` panel bg `white` deferred (needs dropdown tokens) |
| condition | 2 | No | 1 | 8 | :white_check_mark: semantic (2026-07-20); `ConditionConnections` `:before`/`:after` grey-300 kept per request |
| confirmation | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic icon map (2026-07-21); dialog surface = ds-modal; buttons keep custom-color |
| context-selector | 5 | No | 0 | 0 | :construction: search icon + error text → `--ds-form-*` (2026-07-20); dropdown/list-item/dynamic deferred |
| copy-icon | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-20 pass) |
| cruds | 4 | No | 0 | 0 | |
| date-picker | 56 | No | 1 | 0 | :construction: trigger field → `--ds-form-*` + clear icon → icon-danger (2026-07-20); overlay/calendar deferred |
| date-range-picker | 43 | No | 2 | 7 | :construction: trigger field → `--ds-form-*` + danger icons (2026-07-20); overlay/calendar deferred |
| drawer | 3 | No | 1 | 0 | :white_check_mark: tokenised (2026-07-24) — de-antd'd (`.less` removed); body/header-border → semantic, shadow → `shadow-2`; ⚑ mask grey-800@0.2 → `overlay-default` (grey-900@0.5) |
| dropdown | 20 | No | 1 | 1 | |
| editable-items-list | 0 | No | 0 | 0 | :white_check_mark: hardcoded add-icon `blue-600` removed — icon inherits ds-button (`mode: icon-label`) (2026-07-20) |
| emoji-picker | 0 | No | 0 | 0 | :white_check_mark: tokenised — search-icon `grey-600` removed — inherits default (2026-07-20); `EmojiList` category header `grey-500` → semantic `text-neutral-default` (exact) |
| empty-states | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-20 pass) |
| estimation | 0 | No | 0 | 0 | :white_check_mark: tokenised (2026-07-21); skeleton bar → progressbar module token, dot ring → semantic; per-entry dot fill stays dynamic |
| factors | 16 | No | 2 | 0 | :construction: (2026-07-23) type-selector bg/check-icon, array delete-icon + count-pill danger bg/onsolid text, relative-date clear + dropdown-footer/icons, parameter + search text, text-modal brand → semantic; count-pill default grey-600 bg kept dynamic; 2 red-500 danger-hover kept + flagged (no --ds-color-*-danger-hover) |
| field-set | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-20 pass) |
| file-uploader | 152 | No | 0 | 7 | Highest palette count |
| filter | 3 | No | 0 | 1 | :white_check_mark: tokenised — semantic (2026-07-23); placeholder bg→brand-subtle, border→border-brand, title→text-base-default |
| flag | 0 | No | 0 | 34 | No palette, heavy opacity |
| footer | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-20 pass) |
| form-field | 0 | No | 0 | 0 | :white_check_mark: tokenised — tooltip icon → semantic `--ds-color-icon-base-muted` (2026-07-21); `RightSide` counter grey-500 → semantic `text-neutral-default` (exact); ⚑ could get a dedicated form-counter module token |
| format-picker | 6 | No | 0 | 0 | :construction: currency select field → `--ds-form-*` (2026-07-20); panel/list-item deferred |
| icon-picker | 2 | No | 0 | 0 | :construction: clear icon → semantic `--ds-color-icon-danger-default`; search/no-result icons inherit default (2026-07-21); overlay bg + title deferred → dropdown/list-item tokens |
| information-card | 3 | No | 2 | 2 | |
| [input](#form-group-form--input--select--switch) | 0 | No | 14 | 2 | :white_check_mark: fully tokenised — field surface/border/bg/focus/text → `--ds-form-field-*`/`--ds-form-icon-*` + semantic; `BorderLessInput` bg → `transparent`; Textarea scrollbar-thumb `#e1e3e6` → semantic `border-base-strong` (⚑ grey-300, tiny shift) |
| input-number | 5 | No | 5 | 0 | :white_check_mark: `--ds-form-*` applied (2026-07-20); `.less` removed (deantd) |
| insight | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-21 pass) |
| item-filter | 0 | No | 1 | 0 | :white_check_mark: tokenised — semantic (2026-07-21); deprecated pkg, done on request; 1 shadow ref is a `box-shadow: none` reset |
| item-picker | 13 | No | 4 | 1 | :construction: trigger field → `--ds-form-*` (2026-07-20); dropdown/list deferred |
| items-roll | 0 | No | 1 | 4 | :white_check_mark: colours tokenised — semantic (2026-07-21); ⚑ WarningIcon yellow-500→600; shadow/opacity refs are non-colour (kept) |
| layout | 0 | No | 0 | 2 | :white_check_mark: tokenised — semantic + `page` module bg (2026-07-21); fixed a malformed CSS site; 2 functional opacities kept |
| list | 9 | No | 1 | 1 | :white_check_mark: tokenised (2026-07-24) — de-antd'd (`.less` removed); items/header → semantic, all exact |
| loader | 1 | No | 0 | 0 | :white_check_mark: tokenised (2026-07-21); header text → text-base-default; spinner border resolves via `resolveCustomColor` off `theme.palette`, still driven by `color` prop |
| logic | 13 | No | 0 | 0 | |
| manageable-list | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic now → dedicated module later (2026-07-21); 3 ⚑ shifts |
| mapping | 3 | No | 0 | 0 | |
| menu | 102 | Yes (2) | 5 | 21 | ⛔ **deprecated** — will not be tokenised |
| metric-card | 2 | No | 0 | 3 | |
| operators | 6 | No | 0 | 0 | |
| panel | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic + shadow-1 (2026-07-21 pass) |
| panels-resizer | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-21 pass); ⚑ grip-bar bg grey-200→grey-100 |
| popover | 0 | No | 0 | 2 | |
| [radio](#checkbox--radio) | 0 | No | 3 | 4 | :white_check_mark: fully tokenised — description + disabled-opacity → `--ds-form-radio-*`; solid+checked-hover bg/border/box-shadow blue-500 → semantic `background-brand-solidhover` (exact) |
| result | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-21 pass); status-icon map → icon-* token vars |
| scrollbar | 17 | Yes (2) | 0 | 17 | :white_check_mark: tokenised (2026-07-24) — `.less` kept (react-perfect-scrollbar globals) now on `var(--ds-*)`; dropped dead `variables.less` import; ⚑ resting thumb grey-300→base-strong; veil rgba kept |
| search | 13 | No | 4 | 8 | `.less` removed (deantd) |
| search-bar | 12 | No | 1 | 0 | |
| [select](#form-group-form--input--select--switch) | 13 | Yes (2) | 6 | 3 | :construction: TS → `--ds-form-field-*` + semantic; search-icon data-URI + `.less` deferred |
| short-cuts | 7 | No | 1 | 0 | :construction: (2026-07-23) dark/light key variant bg/border/text + icon → semantic (background-base-default, background-neutral-solid, border-neutral-subtle/base-strong, text-onsolid/base-muted, icon-onsolid/base); ⚑ dark bg grey-600→grey-700 shift; box-shadow rgba kept + flagged (no shadow-token match) |
| sidebar | 0 | No | 0 | 1 | :white_check_mark: tokenised — semantic + shadow-2 (2026-07-21); 1 handle opacity kept; `.less` removed (deantd) |
| sidebar-object | 0 | No | 0 | 0 | :white_check_mark: tokenised — modal module (footer/dropdown) + semantic (2026-07-21); all exact |
| skeleton | 5 | No | 0 | 15 | |
| slider | 12 | No | 4 | 0 | |
| sortable | 0 | No | 0 | 2 | :white_check_mark: tokenised — semantic + shadow-2 (2026-07-21 pass); 2 opacities kept (functional drag hide/reset) |
| status | 7 | No | 0 | 1 | Token Studio has status-pill tokens |
| step-card | 0 | No | 0 | 12 | :white_check_mark: colours tokenised — semantic + shadow-1 (2026-07-21); disabled-tag 0.4→opacity-disabled; 12 functional/animation opacities kept; ⚑ footer bg 0.6→solid |
| subject | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-21 pass); both spans unused (dead code) |
| subtle-form | 10 | No | 1 | 4 | |
| [switch](#form-group-form--input--select--switch) | 2 | No | 2 | 2 | :construction: error/description text → `--ds-form-switch-*`; track/handle now in `RawSwitch.styles.ts` on palette (`.less` removed) |
| table | 65 | Yes (3) | 8 | 23 | ⛔ **deprecated** — will not be tokenised (`table.less`/`index.less`/`pagination.less`) |
| tag | 6 | No | 0 | 2 | :white_check_mark: status/danger/disabled tokenised — semantic (2026-07-21); ⚑ success/warning text→-700; 6 JS-compare/custom-colour palette + 2 decorative opacity kept |
| tags | 2 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-21); 2 LimitedTags ds-tag color props stay dynamic |
| toolbar | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic + shadow-1 (2026-07-21 pass) |
| tray | 0 | No | 0 | 0 | :white_check_mark: tokenised — reuses **modal** module (2026-07-21); ⚑ header border grey-200→grey-100 |
| typography | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-21); ⚑ link-hover blue-500→blue-700; `.less` removed (deantd) |
| unordered-list | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-21 pass); `Label` (unused) grey-800 → text-base-default |
| wizard | 0 | No | 0 | 0 | :white_check_mark: tokenised — semantic (2026-07-21 pass) |

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
- `button-group` split-mode separators adopt the UX per-variant `--ds-buttons-variant-*-separator` tokens and
  no longer vary by disabled state: primary white-15%/50%→brand separator (blue-500); custom-color
  white-15%/80%→custom separator (custom-500); tertiary grey@20%/10%→`border-base-default` (grey-200);
  tertiary-white ≈light-grey 25% (near-unchanged). Disabled tertiary label + Description text grey-500→grey-600.

---

## Detailed Reports

### section-message

**Package:** `packages/components/section-message/`
**Token variants:** success, warning, error, informative, supply, service, entity (7 total)
**Migrated in:** `chore/tokenisation` branch

#### Colors — :white_check_mark: Complete

All 7 `SectionType` variants use component-level CSS vars (`--ds-section-message-variant-{variant}-{bg|border|bordertop|icon|text-header|text-description}`). No `theme.palette` fallback remains for type-driven colors.

`customColor` / `customColorIcon` overrides resolve via `resolveCustomColor` (`@synerise/ds-utils`) → theme-aware categorical tokens; no `theme.palette` remains.

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
- The `svg { color/fill }` override was **converted** to the DS wrapper-`color` + `currentColor` pattern
  (2026-07-21, branch `refactor/svg-fill-currentcolor`): the edit icon's explicit `<Icon color>` prop was
  **dropped** and `IconWrapper` now carries `color: applyColor`, so the icon inherits via `currentColor` and the
  `svg { color/fill }` override is removed. The prop was already dead (the higher-specificity `svg` override was
  winning), so the effective per-state colour (default/error) is unchanged.
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
semantic bg + shadow-2; its title `#404c5a` → `-header-text` (⚑ shift to grey-800 `#384350`).

#### Visual diffs

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Description text | grey-800 `#384350` | grey-700 `#57616d` | Lighter (subtler than title — intended) |
| ConfirmMessage title | `#404c5a` (off-palette) | `-header-text` grey-800 `#384350` | Slightly darker/cooler |

#### Deferred

Carousel `.slick-dots` indicators (`Popconfirm.styles.tsx:51,52,61,62`) — the green-600 active dot would
become blue via `border-brand-default` (a green→blue redesign); kept `theme.palette`. The antd Carousel `.less` was **removed** (deantd) — carousel-dot styling
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

### tooltip

**Package:** `packages/components/tooltip/`
**Layer:** module (`--ds-tooltip-*`, 4 of 5 applied) + 2 decorative opacities kept
**Migrated in:** `chore/tokenisation` branch (`refactor/tooltip-tokens`)

#### Colors — :construction: · Shadows — :white_check_mark:

Dark-surface tooltip migrated to the new `tooltip` module: `TooltipComponent` bg → `--ds-tooltip-surface-bg`,
`TooltipButton` footer bar → `--ds-tooltip-footer-bg`, body text → `--ds-tooltip-text`, `TooltipWrapper`
elevation → `--ds-tooltip-shadow` (= `box-shadow-2` = shadow-2). All four are exact-value swaps — **no visual
diff**. `--ds-tooltip-header-icon` exists but no current site sets the header-icon colour (icon inherits body
text) — left for a design decision. Fade opacities (0/1) kept — popover animation.

#### Deferred (awaiting upstream tokens)

`TooltipKey` key-cap (bg grey-700, border-bottom grey-500, custom `0 1px 8px rgba(35,41,54,.5)` shadow): the
audit (UX 2026-07-21) assigned these to `module: tooltip` (key-cap bg/border/shadow), but `--ds-tooltip-key-*`
did **not** land in this sync — kept on `theme.palette`, flagged upstream. Component stays 🚧 until they arrive.

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
hardcoded; and the per-state border/bg/label colours, error
elevation shadow, disabled opacity — now in `Checkbox.styles.ts` on palette (`.less` removed, directly tokenisable). **Applied:** `blue-500` indeterminate-hover fill → semantic `background-brand-solidhover` (exact).

#### radio — applied

Description text → `--ds-form-radio-text-description`; disabled opacity (label + description) →
`--ds-form-radio-disabled-opacity`. **Visual diff:** description text grey-600 `#6a7580` → grey-700
`#57616d` (darker, design-intended). **Applied:** solid+checked-hover bg/border/box-shadow `blue-500` → semantic `background-brand-solidhover`
(exact); `Radio.styles.tsx` now fully token-based.

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
`svg { fill }` rules to `color` inheritance. Final literals cleaned: `BorderLessInput` bg
`rgba(255,255,255,0)` → `transparent`; Textarea `::-webkit-scrollbar-thumb` `#e1e3e6` → semantic
`--ds-color-border-base-strong` (⚑ tiny shift → grey-300 `#dbe0e3`).

| Property | Current | Token resolves to | Delta |
|----------|---------|-------------------|-------|
| Action-icon default | grey-600 `#6a7580` | `--ds-form-icon-color-default` grey-400 `#b5bdc3` | Lighter |
| Input disabled text | grey-500 `#949ea6` | `--ds-form-field-text-disabled` grey-400 `#b5bdc3` | Lighter |
| Textarea disabled bg | grey-050 `#f9fafb` | `--ds-form-field-bg-disabled` grey-100 `#f3f5f6` | Darker |

#### select — :construction:

De-antd'd (master), then tokenised: field surfaces (border/bg/text/affix/placeholder) → `--ds-form-field-*`;
arrow → `--ds-color-icon-base-subtle`, clear + chip-remove → `icon-danger-default`, option-hover →
`background-brand-subtle`, chip text → `text-base-muted` / `text-base-default`. **Diff (⚑):** disabled
selector bg grey-050 → `--ds-form-field-bg-disabled` grey-100 (darker). **Deferred:** chip bg
(grey-200/300) — no grey background token yet.

#### switch — :construction:

Error text → `--ds-form-switch-text-error` (exact); description text → `--ds-form-switch-text-description`
(**diff:** grey-600 → grey-700, darker). Track/handle/bg styling now lives in `RawSwitch.styles.ts` on palette
(`.less` removed — directly tokenisable, no antd Less blocker).

#### form — :white_check_mark: (minimal)

One value: the "Add row" action icon → `--ds-color-icon-brand-default` (semantic; the form module icon
tokens are grey, wrong intent for a brand action icon — matches the ghost-primary button it sits in).

---

## Semantic-layer tokenisation pass (2026-07-20)

A second pass over components the team decided to tokenise **directly against the semantic layer** (no
module namespace — see [`UNTOKENISED_COMPONENTS.md`](./UNTOKENISED_COMPONENTS.md)). All mappings are
**exact-value** (verified against `packages/tokens/dist/css/light.css`) → **zero visual change** unless a
diff is called out. Each component is its own commit.

### ⚑ Flags for the UX / token team (this pass)

1. **No code-syntax tokens** — `code-snippet`'s syntax highlighting (12 hues in `Highlight.styles.ts`) and
   the inline-code accent (`#e31a5d`, *not even in the DS palette*, + `pink-100`) have no semantic
   equivalent; kept on `theme.palette`. Needs a dedicated **code-syntax** token namespace upstream.
2. **No background token at grey-300** — `banner`/`carousel` inactive carousel dots map to
   `--ds-color-border-base-strong` (value-exact `#dbe0e3`, category mismatch: it's a `background`). Same
   gap flagged earlier for inactive icon greys.
3. **`banner` status-Tag default `yellow-600`** — caller-overridable (`titleStatus.color`), kept dynamic
   on palette; no exact semantic (`background-warning-solid` = yellow-500).

### action-area — :white_check_mark:

`ActionArea.styles.ts` fully tokenised (`theme.palette` removed):
- error bg `red-050` → `--ds-color-background-danger-subtle`
- dashed border `grey-300` → `--ds-color-border-base-strong`
- error border `red-600` → `--ds-color-border-danger-default`
- error text `red-600` → `--ds-color-text-danger-default`

All exact — no visual diff. Spec updated to assert the `var()` string (jsdom can't resolve `var()`).

### form-field — :white_check_mark: (2026-07-21)

`FormField.styles.ts` `IconWrapper` — info tooltip icon (`InfoFillS`, inherits `currentColor`):
- `grey-400` → `--ds-color-icon-base-muted` (semantic; muted helper-icon role, **exact** grey-400 match)

No visual diff. **Applied:** `RightSide` counter/right-side text `grey-500` → semantic
`--ds-color-text-neutral-default` (exact grey-500). ⚑ No dedicated `form` counter module token — could be defined.

### icon-picker — :construction: (2026-07-21)

`IconPicker.styles.tsx` + `List.tsx` / `Overlay.tsx`:
- `ClearIcon` (✕ danger action) `red-600` → `--ds-color-icon-danger-default` (semantic, **exact**);
  also converted its `svg { color/fill }` rules to `color` (icon inherits `currentColor`)
- search icon (`Overlay.tsx`) + no-result icon (`List.tsx`) — dropped explicit `grey-600` `color` props,
  now inherit the default; removed the now-unused `useTheme` in both

No visual diff on the clear icon. **Deferred (kept on palette, noted in code):** `Overlay` background
`white` → pending a **dropdown** bg token; `Title` category header `grey-500` → pending a **list-item**
title token. `NoResultIcon` bg is a decorative `rgba` (unmapped).

### footer — :white_check_mark:

`Footer.styles.ts`: top border `grey-200` → `--ds-color-border-base-default` (exact). `theme.palette`
removed. Spec updated (`var()` string).

### field-set — :white_check_mark:

`FieldSet.styles.ts`: `Title` text `grey-800` → `--ds-color-text-base-default` (exact, the only colour).
`theme.palette` removed.

### empty-states — :white_check_mark:

`EmptyStates.styles.tsx`: `HeaderWrapper` text `grey-800` → `--ds-color-text-base-default` (exact, the only
colour). `theme.palette` removed.

### copy-icon — :white_check_mark:

`CopyIcon.styles.tsx` (wrapper `color`, inherited by the icon via `currentColor`): default `grey-600` →
`--ds-color-icon-base-default`; hover `blue-600` → `--ds-color-icon-brand-default`. Both exact.
`theme.palette` removed.

### carousel — :white_check_mark:

`Carousel.styles.ts` dot indicators (`Dot` `button`): active `blue-600` →
`--ds-color-background-brand-solid` (exact); inactive `grey-300` → `--ds-color-border-base-strong` ⚑
(value-exact `#dbe0e3`, category mismatch — no background token at grey-300, see flag 2); inactive hover
`grey-400` → `--ds-color-background-base-strong` (exact). `theme.palette` removed.

### banner — :white_check_mark: (one dynamic default kept)

`Banner.styles.ts`: root bg `grey-100` → `--ds-color-background-base-muted`; header/divider/counter borders
`grey-300` (×3) → `--ds-color-border-base-strong`; counter dots (`BannerCounterDot :after`) active
`blue-600` → `--ds-color-background-brand-solid`, inactive `grey-300` → `--ds-color-border-base-strong` ⚑
(category mismatch, flag 2), inactive hover `grey-400` → `--ds-color-background-base-strong`. All exact.
**Kept on palette:** `Banner.const.ts` `DEFAULT_STATUS_COLOR` (`yellow-600`) / `DEFAULT_STATUS_TEXT_COLOR`
(`white`) — caller-overridable `titleStatus.color`/`textColor` defaults; `yellow-600` has no exact
semantic (flag 3).

### column-manager — :white_check_mark:

Fully tokenised across 3 style files + 2 inline-icon call sites (`theme.palette`/`useTheme` removed):
- `ColumnManagerActions.styles.ts`: footer bg `grey-050` → `--ds-color-background-base-subtle`
- `ColumnManager.style.ts` (list): headline border `grey-200` → `--ds-color-border-base-default`, headline
  text `grey-800` → `--ds-color-text-base-default`, list bg `blue-050` → `--ds-color-background-brand-subtle`,
  inset accent box-shadow `blue-600` → `--ds-color-border-brand-default`
- `ColumnManagerItem.styles.ts`: row bg `white` → `--ds-color-background-base-default`, border `grey-200` →
  `--ds-color-border-base-default`, hover bg `grey-050` → `--ds-color-background-base-defaulthover`, hover
  `:before` accent `blue-600` → `--ds-color-background-brand-solid`, name `grey-600` →
  `--ds-color-text-base-muted`, search-highlight `grey-800` → `--ds-color-text-base-default`
- Inline `<Icon color=…>` (search `grey-600`, drag-handle `grey-400`, type-icon `grey-600`) → the token
  string is passed to the `Icon` `color` prop (emitted as CSS `color`, resolved via `currentColor`).

All exact — no visual diff.

### code-snippet — :construction: chrome tokenised, syntax theme flagged

`.less` is **font-face only** (IBM Plex Mono) — no colour, no Less work. Chrome tokenised (exact):
- `SingleCode.styles.ts`: `StyledCopyIcon` bg `grey-100` → `--ds-color-background-base-muted`, colour
  `grey-400` → `--ds-color-icon-base-muted`, hover `blue-600` → `--ds-color-icon-brand-default`;
  `CodeSnippetWrapperSingle` bg `grey-100` → `--ds-color-background-base-muted`; `BlockCodeWrapperSingle`
  text `grey-600` → `--ds-color-text-base-muted`
- `MultiCode.styles.ts`: both fade overlays (`pre::before`, `.content-animation::after`) `grey-100` →
  `--ds-color-background-base-muted`

**Kept on palette (flag 1 — no code-syntax tokens):**
- `Highlight/Highlight.styles.ts` — the full 12-colour `.hljs-*` syntax theme (grey-700 base, grey-600
  params, blue/cyan/violet/red/orange/yellow/green/purple-600 accents). Syntax highlighting has no
  semantic role; needs a dedicated code-syntax namespace.
- `InlineCode/InlineCode.styles.ts` — text `#e31a5d` (**not in the DS palette at all**) + bg `pink-100`
  (no pink semantic token).

---

## Form-module partial pass (2026-07-20)

Applying the **form module** tokens (`--ds-form-field-*` / `--ds-form-icon-*` / `--ds-form-error-text-color`)
to the parts of 7 form-family components that **act as / represent an input or form-element**. Parts that
are **dropdown/overlay surfaces or list-item rows are left on `theme.palette`** — dedicated `dropdown` and
`list-item` module tokens will be defined upstream and these are revisited then. Dynamic (user colour props)
values stay on palette. **Policy: adopt the form token by role even when it shifts the value slightly** (same
as the `Input` migration); shifts flagged below.

### ⚑ Flags for the UX / token team (this pass)

1. **Value shifts (adopted by role):** `code-area` editor border grey-200→grey-300 & disabled bg
   grey-050→grey-100; `autocomplete` disabled bg grey-050→grey-100 & clear-icon **hover** grey-700→grey-400
   (the DS `--ds-form-icon-color-hover` lightens on hover — verify intent).
2. **Monaco can't consume CSS vars** — `code-area/constants.ts` editor colours (foreground/lineNumber/
   scrollbar) are applied via Monaco's JS theming API, which needs concrete values; they **stay on palette**.
3. **Deferred pending module tokens** — dropdown/overlay surfaces + list-item rows across all 7 await the
   planned `dropdown`/`list-item` namespaces; brand-hover/danger field icons have no grey form-icon token.
4. **date-picker calendar icon hover inverts** (default grey-400→grey-600, hover grey-600→grey-400) — the
   same `--ds-form-icon-color-hover` lightening as flag 1; plus `date-range-picker` `DateValue` grey-600→grey-700.
   Field icons now colour via the wrapper's `color` (currentColor inheritance), not `svg { fill }`.

### autocomplete — :white_check_mark: field surface (dropdown deferred)

`Autocomplete.styles.ts` `NativeInput` + `active()`/`errorStyle()`/`readonly()` + `ClearButton`:
border default/hover/focus/error → `--ds-form-field-border-{default,hover,focus,validated}`; bg
default/focus/error/readOnly/disabled → `--ds-form-field-bg-{default,focus,validated,default,disabled}`;
value/placeholder/disabled/readOnly text → `--ds-form-field-text-{value,placeholder,disabled,value}`;
ClearButton → `--ds-form-icon-color-{default,hover}`. Mostly exact (built to spec); ⚑ disabled bg
grey-050→grey-100, clear hover grey-700→grey-400. **Deferred:** `AutocompleteDropdown.style.ts` NotFound
(dropdown).

### format-picker — :construction: currency select field (panel deferred)

`FormatSettings.styles.ts`: `DropdownTrigger` border grey-300 → `--ds-form-field-border-default`;
`DropdownValue` grey-700 → `--ds-form-field-text-value`. Both exact. **Deferred:** `FormatSettingsContainer`/
`FormatFooter`/`DropdownWrapper` (panel + overlay) and `ListItem` rows (list-item).

### color-picker — :white_check_mark: (field affix + picker panel)

`ColorPicker.styles.ts`: `ColorTag` (trigger colour-swatch affix) border grey-300 →
`--ds-form-field-affix-border`; `PreffixWrapper` (`#` hex-input prefix) grey-500 →
`--ds-form-field-affix-text`. Both exact. Picker panel `Container` + borders/focus rings + swatch glyphs
tokenised (dropdown/semantic pass); `.react-colorful__pointer-fill` white → semantic
`--ds-color-background-base-default` (exact). **Kept dynamic:** all `ColorPicker.tsx` colour-value props (runtime).

### context-selector — :construction: search icon + error text (dropdown/list-item deferred)

`ContextSelectorDropdown.tsx` search-field leading icon grey-600 → `--ds-form-icon-color-default` (passed
as `var()` string to the `Icon` `color` prop; removed the now-unused `theme` import); `ContextSelector.styles.ts`
`ErrorWrapper` red-600 → `--ds-form-error-text-color`. Both exact. **Deferred:** `ItemsList`/`Title`
(dropdown), `SearchResult`/`Highlight`/checkmark (list-item), trigger `triggerColor` (dynamic).

### collector — :construction: placeholder (chips/dropdown deferred)

`Collector.styles.ts` `Placeholder` grey-500 → `--ds-form-field-text-placeholder` (exact). **Deferred:**
value chips (grey-200 — chips use semantic, no form chip token), error chips (red-600), scroll-fade
gradients (decorative), `DropdownContent`/`NavigationWrapper` (dropdown + footer). Elements/ subfolders
delegate to ds-input/ds-button.

### factors — :construction: field action/search icons (composition; rest deferred)

Mostly a composition delegating to ds-input/ds-date-picker. Field action/search icons only:
`FactorValue/Text/Text.tsx` fullscreen expansible icon grey-600 → `--ds-form-icon-color-default`;
`FactorValue/Parameter/ParameterDropdown.tsx` search icon grey-600 → `--ds-form-icon-color-default` (both
`var()` strings; removed now-unused `useTheme`). Exact. **Deferred:** hover blue-600 icon (`Text.styles.tsx`
— no grey form-icon-hover match; semantic brand-hover later), red clear icons (`RelativeDate*` — danger,
no form token), type-switcher button focus ring, transparent array textarea, dropdown/list-item/dynamic/
danger-delete/count-pill.

### code-area — :construction: field surface + error text (Monaco/fullscreen deferred)

`CodeArea.styles.ts` `EditorWrapper` (Monaco field container) + `BottomBar` (in-field footer): border
default grey-200 → `--ds-form-field-border-default` (⚑ grey-300, darker); error border/ring red-600 →
`--ds-form-field-border-validated`; error bg red-050 → `--ds-form-field-bg-validated`; footer bg white →
`--ds-form-field-bg-default`; readOnly bg grey-050 → `--ds-form-field-bg-disabled` (⚑ grey-100, darker);
`ErrorText` red-600 → `--ds-form-error-text-color`. **Kept on palette:** `constants.ts` Monaco colours
(foreground/lineNumber/scrollbar) — Monaco's JS theming needs concrete values, **can't consume CSS vars**
(flag 2); fullscreen wrapper bg white (`:97`) — overlay chrome, semantic later.

### item-picker — :construction: trigger field surface (isNew; shared trigger; dropdown/list deferred)

`ItemPickerTrigger/Trigger.styles.ts` (shared by the **isNew and legacy** pickers — single code path, so
the deprecated legacy trigger changes too, agreed): field border default/hover/error/focus →
`--ds-form-field-border-{default,hover,validated,focus}`; bg disabled/error/focus/default →
`--ds-form-field-bg-{disabled,validated,focus,default}` (large default stays `transparent`); selected-large
border/hover → `--ds-form-field-border-{default,hover}`; placeholder → `--ds-form-field-text-placeholder`;
value → `--ds-form-field-text-value`; disabled IconWrapper opacity → `--ds-opacity-disabled`. Icons
(`Trigger.tsx` + prefix svg): value/hover prefix + angle → `--ds-form-icon-color-default`; placeholder
prefix grey-500 (no form-icon at that value) → `--ds-color-icon-base-subtle`; clear × →
`--ds-color-icon-danger-default`; warning → `--ds-color-icon-warning-default`; placeholder-hover text
(large) → `--ds-color-text-base-muted`. `theme` import removed from `Trigger.tsx`.

**Value shifts (⚑, adopted by role — aligns the trigger to the standard DS field):** default border
grey-400→grey-300; hover border grey-500→grey-400; value text grey-800→grey-700. All other mappings exact.
**Deferred (kept on palette, 13 refs):** `ItemPickerDropdown` (legacy overlay), `ItemPickerList`
list/search/footer rows, `ListSearchInput`, `ErrorMessage` — pending dropdown/list-item module tokens.

### date-picker — :construction: trigger field (overlay/calendar deferred)

`Elements/PickerInput/PickerInput.styles.tsx` + `PickerInput.tsx` (base input states delegate to the
already-tokenised ds-input): affix boxes `Prefixel`/`Suffixel` border grey-300 → `--ds-form-field-affix-border`,
bg grey-050 → `--ds-form-field-affix-bg`; `activeStyle` focus ring/border blue-600 →
`--ds-form-field-border-focus`, bg blue-050 → `--ds-form-field-bg-focus`; default calendar icon →
`--ds-form-icon-color-{default,hover}` (coloured via the wrapper `color`, not `svg { fill }`); clear × icon
red-600 → `--ds-color-icon-danger-default`. `useTheme`/`theme` removed from `PickerInput.tsx`.
**⚑ Shift (adopted by role):** calendar icon default grey-400→grey-600 and **hover inverts** grey-600→grey-400.
**Deferred:** `DatePicker.styles.ts` overlay bg/dividers (dropdown); `DayPicker`/`GridPicker`/`Navbar`/
`QuickPicks` grids + nav (calendar); `TimePicker` delegates to ds-time-picker.

### date-range-picker — :construction: trigger field (overlay/calendar deferred)

`RangePickerInput/RangePickerInput.styles.tsx` + `.tsx` (base states delegate to ds-input `InputWrapper`):
non-highlight date segment grey-500 → `--ds-form-field-text-placeholder`; `DateValue` grey-600 →
`--ds-form-field-text-value` (⚑ grey-700); default calendar icon → `--ds-form-icon-color-{default,hover}`
(via wrapper `color`, ⚑ hover grey-600→grey-400); clear × icon red-600 → `--ds-color-icon-danger-default`.
**Kept on palette:** active-edit segment highlight blue-600 (no form token); `→` separator icon grey-400
(decorative). **Deferred:** overlay/footer surfaces + shadows/dividers (dropdown); `RangePicker`/`TimeWindow`
grids (calendar); danger/secondary text across RangeFilter/RelativeRangePicker (semantic later).

### input-number — :white_check_mark: full field (DS-native, no dropdown)

`InputNumber.styles.tsx`: value grey-700 → `--ds-form-field-text-value`; placeholder grey-500 →
`--ds-form-field-text-placeholder`; bg default/error/focus white/red-050/blue-050 →
`--ds-form-field-bg-{default,validated,focus}`; border default/hover/focus/error grey-300/grey-400/blue-600/
red-600 → `--ds-form-field-border-{default,hover,focus,validated}` (inset box-shadow rings, widths unchanged);
prefix/suffix `Addon` grey-050/grey-300 → `--ds-form-field-affix-bg`/`-affix-border`; stepper glyph grey-600 →
`--ds-form-icon-color-default`; stepper dividers grey-300 → `--ds-form-field-border-default`; disabled text
grey-400 → `--ds-form-field-text-disabled`; stepper disabled opacity 0.4 → `--ds-opacity-disabled`.
**⚑ Shift (adopted by role):** disabled bg grey-050 → `--ds-form-field-bg-disabled` (grey-100, darker).

### condition — :white_check_mark: semantic (ConditionConnections connectors excluded)

`Condition.style.ts`: `ErrorWrapper` red-600 → `--ds-color-text-danger-default`; `StepName` grey-800 →
`--ds-color-text-base-default`; `DraggedLabel` grey-600 → `--ds-color-text-base-muted`; step suffix (`Step:after`)
bg white → `--ds-color-background-base-default`, text `#3f4c5b` → `--ds-color-text-base-default` (⚑ off-palette
hex → grey-800, marginally darker); `Step:hover` bg grey-050 → `--ds-color-background-base-subtle` (×2);
drag-overlay bg white → `--ds-color-background-base-default`, shadow `0 16px 32px #23293619` →
`--ds-shadows-shadow-2` (⚑ ~equal — alpha 0x19≈0x1a); dragged bg blue-050 → `--ds-color-background-brand-subtle`,
text/border blue-600 → `--ds-color-text-brand-default` / `--ds-color-border-brand-default`. Inline icons:
`ConditionRow` clear × red-600 → `--ds-color-icon-danger-default`; `EmptyCondition` icon grey-500 →
`--ds-color-icon-base-subtle` (both `var()` strings; static `theme` import removed from both `.tsx` — no
`useTheme` needed since nothing else uses it). All exact except the two ⚑ noted.

**Excluded (kept on palette, per request):** `ConditionConnections` `:before`/`:after` connector lines
(`grey-300` — `Condition.style.ts:321,335`).

---

## Not-started semantic components pass (2026-07-21)

Tokenising the remaining **not-started, unblocked** components that already have a decided per-usage
mapping in `TOKEN_AUDIT.md`. Each maps to the **semantic layer** (no module namespace); all mappings are
**exact-value** (verified against `packages/tokens/dist/css/light.css`) → zero visual change unless a `⚑`
shift is called out. Each component is its own commit.

### unordered-list — :white_check_mark:

`Unordered-list.styles.ts` `Label` text grey-800 → `--ds-color-text-base-default` (exact). The sole
`theme.palette` ref removed. No visual diff. (`Label` is exported but **unused** — the section label
renders via ds-form-field's `FormFieldLabel`.)

### subject — :white_check_mark:

`SubjectList/SubjectList.styles.ts`: `SearchResult` grey-500 → `--ds-color-text-neutral-default`;
`SearchResultHighlight` grey-700 → `--ds-color-text-base-subtle` (both exact). `theme.palette` removed. No
visual diff. (Both spans are exported but **unused** — highlighting is done via ds-list-item's `highlight`
prop; `Subject.tsx`'s cyan/green stays dynamic `type="custom-color"` on ds-button, out of scope.)

### estimation — :white_check_mark:

Consumes the **progressbar** module token by role (renders a progress bar):
- `EstimationProgressBarSkeleton.tsx` skeleton/empty bar fill grey-200 → `--ds-progressbar-bar-bg-track`
  (exact; emitted as a literal `'var(…)'` string to `Multivalue`'s JS `color` prop; `useTheme` dropped)
- `EstimationProgressBar.styles.ts` legend-dot ring white → `--ds-color-background-base-default` (semantic, exact)

No visual diff. **Kept dynamic:** the legend-dot **fill** is a per-entry data colour. ✅ **Follow-up done**
(branch `refactor/estimation-badge-legend-dot`): the bespoke `EstimationProgressBarLegendItem` dot was replaced
by `@synerise/ds-badge`'s `BadgeWithLabel` (`dot` + `customColor={value.color}`), removing the duplicated
ring+fill chrome. ⚑ Visual delta: the DS-standard badge dot is 6px ring-less (was ~10px + 2px white ring) —
flagged for Chromatic/UX.

### loader — :white_check_mark:

`Loader.styles.ts` `HeaderWrapper` text grey-800 → `--ds-color-text-base-default` (exact). No visual diff.
**Custom colour:** the spinner `border` colour is driven by the public `color` prop (default `grey` →
grey-600); migrated off `theme.palette` to `resolveCustomColor` (`@synerise/ds-utils`) → theme-aware
categorical tokens, still dynamic per prop (dropping the prop is a public
API change, out of scope). **Decorative:** `border-top: transparent` (the spinner's rotation gap).

### panel — :white_check_mark:

`Panel.styles.ts` `PanelWrapper`: bg white → `--ds-color-background-base-default`; `greyBackground` box-shadow
`0 4px 12px 0 rgba(35,41,54,0.04)` → `--ds-shadows-shadow-1` (elevation, exact — `#2329360a`); default border
grey-200 → `--ds-color-border-base-default` (exact, `1px solid` geometry kept). `theme.palette` fully removed.
No visual diff.

### result — :white_check_mark:

`Result.styles.ts` + `Result.tsx` (all exact):
- `PanelContainer` textarea bg white → `--ds-color-background-base-default`; `.ant-list` border grey-300 →
  `--ds-color-border-base-strong` (`1px solid` geometry kept)
- `mapTypeToStatus` icon colours refactored from palette-key strings to token `var()`s — info →
  `--ds-color-icon-brand-default`, warning → `-warning-default`, error → `-danger-default`, success →
  `-success-default`, progress/no-results → `--ds-color-icon-base-default`; `StatusIconContainer` now applies
  `props.iconColor` directly (dropped the `theme.palette[…]` indexing). Icons colour via the container's
  `color` (currentColor). `iconColor` is a closed set (never consumer-supplied). No visual diff.

### sortable — :white_check_mark:

`Sortable.styles.ts` (all exact): drag-placeholder `&:before` border blue-300 →
`--ds-color-border-brand-strong` (`1px dashed` geometry kept), bg blue-050 →
`--ds-color-background-brand-subtle`; grabbed-overlay content bg white →
`--ds-color-background-base-default`, box-shadow `0 16px 32px rgba(35,41,54,0.1)` → `--ds-shadows-shadow-2`
(drag elevation). `props.theme.palette` fully removed (the `ThemeProps` **type** import stays — used by the
`placeholderCss` interpolation). No visual diff. **Kept (functional):** `opacity: 0` (hide source while
dragging) + `SortableItem.tsx` inline `opacity: 1` reset.

### panels-resizer — :white_check_mark:

`Resizer/Resizer.styles.tsx`: grip-bar `Handler` hover bg blue-100 →
`--ds-color-background-brand-subtlehover` (exact); `HandlerIcon` svg fill grey-600 →
`--ds-color-icon-base-default` (exact, `isHorizontal` rotate block kept); hover color blue-600 →
`--ds-color-icon-brand-default` (exact). `theme.palette` fully removed.

| Property | Was | Token resolves to | Delta |
|----------|-----|-------------------|-------|
| Grip-bar default bg | grey-200 `#e9edee` | `--ds-color-background-base-muted` grey-100 `#f3f5f6` | ⚑ Lighter (per UX 2026-07-21) |

### toolbar — :white_check_mark:

`Toolbar.styles.ts` (all exact): `ToolbarDivider` bg grey-200 → `--ds-color-border-base-default`;
`ToolbarLabel` text grey-600 → `--ds-color-text-base-muted`; `ToolbarGroup` surface white →
`--ds-color-background-base-default`, box-shadow `0 4px 12px #2329360a` (built from grey-900 + `0A`) →
`--ds-shadows-shadow-1`. `theme.palette` fully removed. No visual diff.

### tray — :white_check_mark: (reuses the modal module)

The tray is a floating overlay panel, so it consumes the existing **modal** module namespace by role
(`Tray.styles.ts`): container surface white → `--ds-modal-container-bg` (exact); footer bg grey-050 →
`--ds-modal-footer-bg` (exact); footer border grey-100 → `--ds-modal-footer-border-color` (exact). Overlay
elevation `box-shadow-2` → semantic `--ds-shadows-shadow-2` (exact — modal has no emitted `*-shadow` var, see
the modal report's module-shadow gap). `theme.palette` removed; the `zindex-tooltip` antd variable stays
(not Phase 1).

| Property | Was | Token resolves to | Delta |
|----------|-----|-------------------|-------|
| Header border-bottom | grey-200 `#e9edee` | `--ds-modal-header-border-color` grey-100 `#f3f5f6` | ⚑ Lighter (adopts modal header border; per UX 2026-07-21) |

### insight — :white_check_mark:

`Insight.styles.tsx` (all exact): `InsightContainer` bg white → `--ds-color-background-base-default`,
bottom-border grey-200 → `--ds-color-border-base-default`, `hasHover` `:hover` bg grey-050 →
`--ds-color-background-base-defaulthover`; `Title` label text grey-800 → `--ds-color-text-base-default`.
`theme.palette` fully removed. No visual diff.

### confirmation — :white_check_mark:

`ICON_COLOR_MAPPING` (`Confirmation.const.ts`) refactored from palette keys to type-driven icon token
`var()`s — negative → `--ds-color-icon-danger-default`, success → `-success-default`, warning →
`-warning-default`, informative → `--ds-color-icon-base-default` (all exact). `getIconColor` simplified to
return the var directly (dropped the `theme` param); `useTheme` removed from `Confirmation.tsx`. Icon colours
via the `<Icon color>` prop. No visual diff. **Kept:** the dialog surface/overlay/header/footer are delegated
to `@synerise/ds-modal` (already on the modal module — nothing local). **Kept (dynamic keyword):**
`BUTTON_COLOR_MAPPING` (`custom-color` ds-button keyword). ⚑ **Follow-up (DS):** buttons should use a semantic
ds-button `type` (`primary-danger`/`primary-success`/`primary-warning`) instead of a fixed custom-color map.

### step-card — :white_check_mark:

`StepCard.styles.ts` (a drag-reorderable filter/condition card — plain `div`, not ds-card; no
numbered-step state colours). All semantic, exact except the flagged footer bg: drop-label text brand
blue-600 → `--ds-color-text-brand-default`; card surface white → `--ds-color-background-base-default`,
box-shadow `0 4px 12px #2329360a` → `--ds-shadows-shadow-1` (byte-identical); `CountDownSpinner` `<g>` stroke
grey-500 → `--ds-color-icon-base-subtle`; `AdditionalFields` divider grey-200 → `--ds-color-border-base-default`;
footer divider grey-100 → `--ds-color-border-base-subtle`; drag-placeholder-tag `opacity: 0.4` →
`--ds-opacity-disabled`. `theme.palette` fully removed. **Kept (functional/animation):** the remaining
`opacity` refs (cruds hover-reveal `opacity: 0/1`, drag states).

| Property | Was | Token resolves to | Delta |
|----------|-----|-------------------|-------|
| Footer background | `rgba(249,250,251,0.6)` (translucent grey-50) | `--ds-color-background-base-subtle` solid grey-50 `#f9fafb` | ⚑ Solid, 0.6 opacity dropped (per UX 2026-07-21) |

### layout — :white_check_mark:

`Layout.styles.ts` + `Page/Page.styles.tsx` + `Sidebar/Sidebar.tsx`, all **exact hex** (no visual shift):
- `LayoutSubheader` + `LayoutSidebar` box-shadow `0 4px 12px #2329360a` → `--ds-shadows-shadow-1`
- `LayoutSidebar` bg `#fff` → `--ds-color-background-base-default`
- `PageContainer` bg `rgb(243,245,246)` → `--ds-page-bg` (module `page` → background-base-muted, grey-100 exact)
- `Sidebar.tsx` `ArrowIcon`/`CloseIcon` `color` (white, was via `useTheme()`) → `--ds-color-icon-onsolid-default`;
  `useTheme` removed
- **Fixed a malformed CSS site** (`SidebarButton` `≤medium`): the template injected a bare `${theme.palette.white}`
  (`#ffffff`) with no property — invalid CSS that silently swallowed the adjacent `opacity: 1`. Removed the stray
  value, leaving valid `display: flex; opacity: 1; visibility: visible`.

**Kept (functional):** `SidebarButton` `opacity: 1`/`visibility` toggles. ⚑ **Name-mismatch flags (exact hex,
no visual change):** `SidebarButton` resting bg uses `--ds-color-background-base-stronghover` (grey-500) and its
opened/hover bg uses `--ds-color-background-neutral-solidhover` (grey-600) — "hover"-named tokens applied at a
resting/opened state. Cleaner future home is a `button-expander` module (the button is functionally an expander;
out of layout scope).

### wizard — :white_check_mark:

`Wizard.styles.ts` (all exact): `WizardWrapper`/`WizardContainer`/`WizardFooter` surfaces white →
`--ds-color-background-base-default`; `WizardHeader`/`HeaderActions` `:after` dividers + `WizardFooter`
border-top grey-200 → `--ds-color-border-base-default` (1px pseudo-elements/borders). `theme.palette` fully
removed. No visual diff. (Step-indicator states aren't styled here — the wizard consumes a passed-in
ds-stepper node.)

### tags — :white_check_mark:

`Tags.styles.ts` `Title` text grey-800 → `--ds-color-text-base-default` (exact); `AddTags.styles.ts`
`Separator` dashed-line colour grey-300 → `--ds-color-border-base-strong` (exact; the `transparent` gradient
gap kept). The `AddTags` create/search/add icons were already colour-prop-free (inherit the default —
prior commit). No visual diff. **Kept dynamic:** `LimitedTags` "+N" pill `color`/`textColor` (grey-100/grey-700
via `useTheme`) are passed to ds-tag, which does its own internal colour math — a `var()` string would break
it, so they stay resolved-hex.

### typography — :white_check_mark:

`CommonElements.ts` + `style/macro-utils.ts` (semantic text/opacity tokens): `Description` grey-600 →
`--ds-color-text-base-muted`, disabled `opacity: 0.4` → `--ds-opacity-disabled`; `ErrorText` red-600 →
`--ds-color-text-danger-default`; `Label` + `heading` mixin + `linkbutton` `:hover` grey-800 →
`--ds-color-text-base-default`; `link` macro blue-600 → `--ds-color-text-brand-default`; `linkbutton` grey-600
→ `--ds-color-text-base-muted`. `theme.palette` fully removed. All exact except the accepted link-hover shift.

| Property | Was | Token resolves to | Delta |
|----------|-----|-------------------|-------|
| `link` macro `:hover` colour | blue-500 `#238afe` | `--ds-color-text-brand-hover` blue-700 `#0044d9` | ⚑ Darker hover (accepted, UX 2026-07-21) |

### avatar-group — :white_check_mark: (reuses the avatar module)

The +N "MoreInfo" avatar is `styled(Avatar)`, so it now reuses the **avatar** module tokens (re-aligning it to
the standard muted-grey avatar surface): bg → `--ds-avatar-bg-default`, border → `--ds-avatar-border-color-default`,
text (+ `!important` span) → `--ds-avatar-text-default`, hover text → `--ds-avatar-text-hover`, hover border →
`--ds-avatar-border-color-hover`. The collapsed overlap ring `box-shadow` opaque-white → semantic
`--ds-color-background-base-default` (exact), and its faded hover endpoint → `transparent` (exact).
`theme.palette` fully removed. **Kept (fan-out animation):** badge-dot `opacity: 0/1`.

| Property | Was | Token resolves to | Delta |
|----------|-----|-------------------|-------|
| +N background | white | `--ds-avatar-bg-default` grey-100 `#f3f5f6` | ⚑ Darker (muted-grey surface) |
| +N border | grey-300 `#dbe0e3` | `--ds-avatar-border-color-default` grey-200 `#e9edee` | ⚑ Lighter |
| +N text (default) | grey-400 `#b5bdc3` | `--ds-avatar-text-default` grey-600 `#6a7580` | ⚑ Darker |
| +N text (hover/active) | grey-500 `#949ea6` | `--ds-avatar-text-hover` grey-600 `#6a7580` | ⚑ Darker |
| +N border (hover/active) | grey-500 `#949ea6` | `--ds-avatar-border-color-hover` brand blue-600 `#0b68ff` | ⚑ **grey → brand blue** (prominent) |

### sidebar-object — :white_check_mark:

Mixed, all **exact** (no visual diff): `FooterContainer` bg grey-050 → `--ds-modal-footer-bg`, border grey-100
→ `--ds-modal-footer-border-color`; `Header` `DropdownWrapper` bg white → `--ds-modal-container-bg` (overlay
surface, reuses modal module); dashed borders grey-300 (`Content` TagsWrapper/InlineEditWrapper, `ObjectSummary`
ContentWrapper, `Header` HeaderWrapper) → `--ds-color-border-base-strong`; nested inline-edit bg white →
`--ds-color-background-base-default`. `Overview.tsx` folder-footer `Add3M` icon dropped its explicit
`grey-500` `color` prop (inherits from its ghost button); `useTheme` removed. `theme.palette` fully removed.

### badge — ⛔ deferred (blocked: badge module missing)

**Not tokenised this pass.** `TOKEN_AUDIT.md` decided **`module: badge`** for the status/default bg, count
text, outline ring, border, and label — but **no `--ds-badge-*` tokens are emitted** in
`packages/tokens/dist/css/light.css` (nor a `badge` key in `modules/base.json`). Per the "missing intended
module → defer, don't semantic-fallback" rule, badge is left on `theme.palette` and **blocked pending the
upstream badge module**. (All values would map cleanly to semantic solids — active→`background-success-solid`,
inactive→`background-base-strong`, blocked/default→`background-danger-solid`, processing→`background-brand-solid`,
warning→`background-warning-solid` (⚑ yellow-600→yellow-500), count→`text-onsolid-default`, ring/border→
`background-base-default`, label→`text-base-muted` — recorded here so the swap is fast once the module lands or
if a semantic fallback is later authorised.) `customColor` stays dynamic; pulse/flag halos decorative.

### sidebar — :white_check_mark:

All semantic, exact (no visual diff), across 6 files:
- `Collapse/Collapse.styles.ts`: base tint blue-050 → `--ds-color-background-brand-subtle`; header/panel surfaces
  white → `--ds-color-background-base-default`; header text grey-700 → `--ds-color-text-base-subtle`, hover
  grey-800 → `--ds-color-text-base-default`; panel border grey-200 → `--ds-color-border-base-default`;
  drag-overlay box-shadow `box-shadow-2` → `--ds-shadows-shadow-2`
- `Sidebar.styles.ts`: drag-overlay header border grey-200 → `--ds-color-border-base-default`, content bg white
  → `--ds-color-background-base-default`
- `SidebarWithButton.styles.ts`: title grey-700 → `--ds-color-text-base-subtle`
- Icons via `<Icon color>`: expand chevron grey-600 → `--ds-color-icon-base-default` (`Sidebar.tsx` +
  `DragOverlayPanel.tsx`); drag-handle grey-400 → `--ds-color-icon-base-muted` (`PanelContent.tsx` +
  `DragOverlayPanel.tsx`)
- Removed `useTheme` (`Sidebar.tsx`, incl. its `useMemo` dep) and 2 static `import { theme }`
  (`PanelContent.tsx`, `DragOverlayPanel.tsx`). **Kept (decorative):** `SidebarHandle` `opacity: 1`.

### items-roll — :white_check_mark:

`ItemsRoll.styles.ts` + `ItemRemoveIcon.tsx`, all semantic, exact except the flagged WarningIcon:
- Text: HeaderLeft/Bold grey-800 → `--ds-color-text-base-default`; ShowButton span grey-700 →
  `--ds-color-text-base-subtle`; group-title grey-500 → `--ds-color-text-neutral-default`; NoResults grey-600 →
  `--ds-color-text-base-muted`; ChangeSelection blue-600 → `--ds-color-text-brand-default`
- Surfaces: `:focus:hover` bg grey-050 → `--ds-color-background-base-subtle`; group divider grey-300 →
  `--ds-color-border-base-strong`
- Icons converted to wrapper `color` + native `currentColor` (dropped `svg { fill }`): `ArrowIcon` /
  `NoResultIconWrapper` grey-600 → `--ds-color-icon-base-default`; `ChangeSelection` icon → brand;
  `WarningIcon` → `--ds-color-icon-warning-default`; `ItemRemoveIcon.tsx` `color` prop red-600 →
  `--ds-color-icon-danger-default` (static `import { theme }` removed)
- The nested `.items-roll-list-item :hover svg` + `.element-remove-icon svg` rules are **tokenised in place**
  (`fill: var(…)`). **Investigated 2026-07-21 — not convertible** to wrapper-`color` + `currentColor`: a row-level
  `color` would leak onto the row text, and the row/remove icons are rendered with explicit `<Icon color>` props
  (e.g. `ItemRemoveIcon`), which a parent `color` can't override. The `svg { fill }` override (with `!important`
  on the remove icon) is the correct, robust mechanism here.

| Property | Was | Token resolves to | Delta |
|----------|-----|-------------------|-------|
| WarningIcon fill | yellow-500 `#ffc300` | `--ds-color-icon-warning-default` yellow-600 `#fab700` | ⚑ Darker (no yellow-500 icon token) |

### tag — :white_check_mark:

`Tag.styles.ts`, mixed (custom-colour surfaces stay dynamic; status/danger/disabled → semantic):
- **Status shapes:** SUCCESS/ERROR/WARNING borders → `--ds-color-border-{success,danger,warning}-default`
  (exact); text → `--ds-color-text-{success,danger,warning}-default`
- **Remove/icon-hover (danger):** `Content`/`PrefixWrapper`/`DefaultPrefixWrapper` badge text → `text-danger-default`,
  1px rings → `border-danger-default`, `.ds-icon svg` fills → `icon-danger-default`. **`RemoveButton` hover
  converted** (2026-07-21, branch `refactor/svg-fill-currentcolor`): its close icon dropped the `color` prop, and
  the wrapper's default `color` + `&&&:hover .ds-icon { color: danger }` now drive it via `currentColor` (svg
  `fill … !important` override removed). The **prefix-wrapper** `.ds-icon svg { fill }` rules **stay** — those
  icons are consumer-supplied (`prefixel`), so we can't drop *their* `color` prop and the `svg { fill }` override
  is the robust mechanism; `RemoveButton` hover svg →
  `icon-danger-default`, `:before` fallback → `icon-danger-default`; `Tag` iconHover `:before` bg red-050 →
  `--ds-color-background-danger-subtle`
- **`getColorText` helper:** returns `--ds-color-text-base-muted` / `--ds-color-text-onsolid-default`; SMALL_SQUARE/
  SMALL_ROUND `#fff` fallback → `text-onsolid-default`; addon badge border white → `background-base-default`
  (⚑ role — no border-onsolid token)
- **Disabled** `opacity: 0.4` → `--ds-opacity-disabled`

**Kept on `theme.palette` (intentional):** the `grey-200` **JS comparisons** in `getColorText`/`getFilterColor`
(a `var()` can't be compared in JS — needs a resolved hex), and the `grey-500` **custom-colour fallbacks** in
STATUS_NEUTRAL + the `&:before` surface (user `color`/`textColor` props drive these; grey-500 has no exact border
token). **Kept (decorative):** RemoveButton `opacity: 0.8`/`0.3`.

| Property | Was | Token resolves to | Delta |
|----------|-----|-------------------|-------|
| STATUS_SUCCESS text | green-600 `#54cb0b` | `--ds-color-text-success-default` green-700 `#399903` | ⚑ Darker (border stays green-600) |
| STATUS_WARNING text | yellow-600 `#fab700` | `--ds-color-text-warning-default` yellow-700 `#eda600` | ⚑ Darker (border stays yellow-600) |

### manageable-list — :white_check_mark: (semantic now → dedicated module later)

The largest remaining component (~65 refs across `ManageableList.styles.ts`, `Item/*` styles + `.tsx`). Per
UX 2026-07-21 the **whole component tokenises to the semantic layer now**; the eventual target is a dedicated
`manageable-list` module namespace (a future upstream request — **not** a current blocker, and **not** reusing
`list-item`). Row text/title/icon states, selected/hover, drag placeholder/overlay, dashed containers, ItemMeta
date, FilterItem menu rows, actions and disabled opacity all → the matching semantic text/icon/border/background
tokens (exact). SVG `color`+`fill` pairs and `<Icon color>` props take the token; the `getColorText` helper is
untouched (already grey — Tag-style). Removed the static `import { theme }` in `ItemActions.tsx` (dark-mode
safe) and the now-unused `useTheme()` in `BlankItem`/`FilterItem`/`ContentItemHeader`. `ItemName` `(i)` info
icon → `--ds-color-icon-base-muted` (interim; a `form` info-icon token is the eventual home, matching form-field).

| Property | Was | Token resolves to | Delta |
|----------|-----|-------------------|-------|
| ContentItem / BlankItem drag-overlay shadow | solid `0 16px 32px grey-200` | `--ds-shadows-shadow-2` (`#2329361a`) | ⚑ solid grey → translucent elevation |
| FilterItem unselected `CircleShapeM` | grey-300 `#dbe0e3` | `--ds-color-icon-base-muted` grey-400 `#b5bdc3` | ⚑ Darker (no icon token at grey-300) |

### item-filter — :white_check_mark: (deprecated pkg, tokenised on request)

`@deprecated` package, but tokenised per request (2026-07-21, branch `refactor/item-filter-tokens`). Both refs
semantic + **exact** (no visual change):
- `ItemFIlter.styles.ts` `FiltersList ${ItemContainer}` bg grey-050 → `--ds-color-background-base-subtle`
  (overrides the imported manageable-list row surface)
- `ItemFilter.tsx` `SearchM` search-icon `color` grey-600 → `--ds-color-icon-base-default`; the now-unused
  `useTheme()` was removed (`withTheme` HOC stays — separate concern).

`box-shadow: none` at `ItemFIlter.styles.ts:9` is a reset override on the imported row (not elevation). No
`theme.palette` refs remain.

---

## Dropdown / list-item / search-bar / badge module-landing pass (2026-07-22)

The upstream token sync landed the **`dropdown`**, **`list-item`**, **`badge`**, and **`search-bar`**
module namespaces (plus the form **label-icon** role). This pass applies them across the components that
were previously deferred *"pending module tokens"*, plus new module tokenisations. Each component was its
own MR off `chore/tokenisation`, all reviewed and merged. Mappings are **exact** unless a `⚑` shift is
noted. This **supersedes the deferred / `:construction:` markers** for these components in the earlier
passes above.

### ⚑ Flags / follow-ups for the UX / token team (this pass)

1. **dropdown module gaps** — no `footer-text` / `footer-icon` (collector, item-picker used exact semantic
   grey-600), and no `bottom-action-*` / `back-action-*` / `search-icon` tokens (the `dropdown` component
   is left `🚧` on those roles).
2. **list-item has no section/group-title token** — the uppercase group headers in operators,
   context-selector, icon-picker, item-picker and search all used the exact semantic
   `--ds-color-text-neutral-default` (grey-500); `role-normal-text-default` (grey-700) would shift them.
3. **search-bar has no prefix-text token** — the value-prefix hover/focus used the exact semantic
   `--ds-color-text-brand-default` (blue-600).
4. **tabs `item-text-focus` not authored** — the `:focus` `blue-500` on the `Tab` label/icon stays on
   palette (deferred, not forced onto an off-role semantic).
5. **button `ghost-primary-warning`** not yet wired — tokens exist
   (`--ds-buttons-variant-ghost-primary-warning-*`); only the solid `warning` variant was migrated.
6. **inline-edit has no `icon-btn-icon-error` token** — the error edit-icon uses semantic
   `--ds-color-icon-danger-default`.
7. **form-field counter** (`RightSide` grey-500) — uses semantic `text-neutral-default` (exact grey-500); ⚑ could get a dedicated form-counter module token.

### Dropdown-module consumers (overlay / footer surfaces)

- **information-card** — :white_check_mark: overlay bg → `--ds-dropdown-bg`, shadow → `--ds-dropdown-shadow`,
  body text → `-text-additional`, footer border → `-footer-border`. ⚑ footer bg grey-050→grey-100.
- **operators** — :white_check_mark: `SearchResult`/`Highlight`/group `Title` + selected checkmark tokenised
  (semantic); dead `backgorund` typo rule on `ItemsList` dropped; 2 static `theme` imports removed.
- **collector** — :white_check_mark: chips (danger/muted), scroll-fade gradient stops
  (`--ds-form-field-bg-*`), overlay bg/shadow, nav-hint footer; footer text/icon → semantic (no dropdown
  footer-text token). ⚑ chip bg grey-200→grey-100, overlay shadow α0.12→0.10, footer bg grey-050→grey-100.
- **context-selector** — :white_check_mark: overlay bg → `--ds-dropdown-bg`; text + checkmark semantic;
  group `Title` semantic grey-500.
- **format-picker** — :white_check_mark: overlay panels + footer → dropdown; currency rows →
  `--ds-list-item-role-normal-text-default` (label) / `-content-description-color` (suffix, ⚑ grey-500→grey-600).
  ⚑ footer bg grey-050→grey-100.
- **icon-picker** — :white_check_mark: `Overlay` bg → `--ds-dropdown-bg`; category header → semantic grey-500;
  empty-state circle bg dropped (per UX).
- **item-picker** — :white_check_mark: legacy + list overlays/footers → dropdown; footer action text/icon →
  semantic (`-text-base-muted` / `-icon-base-default` via `.ds-icon`/currentColor); section `Title` semantic;
  `ErrorMessage` `WarningL` → `<Icon color=icon-danger>`; 2 inline icon `color` props dropped; 2 `useTheme`
  removed. ⚑ footer bg grey-050→grey-100, shortcut-hint arrow white→grey-200.
- **search** — :white_check_mark: field/chrome → form module, filled + focus ring →
  `--ds-form-field-border-focus`/`-bg-focus`, overlay → dropdown, `MenuHeader` semantic grey-500, header
  `(i)` → `--ds-form-label-icon-color`, clear × → `--ds-color-icon-danger-default`. ⚑ disabled bg grey-050→grey-100.
- **autocomplete** — :white_check_mark: the deferred `AutocompleteDropdown` NotFound text →
  `--ds-dropdown-text-additional` (field surface was done in the 2026-07-20 form pass).
- **completed-within** — :white_check_mark: `Settings` panel bg → `--ds-dropdown-bg`.
- **color-picker** — :white_check_mark: picker panel bg → `--ds-dropdown-bg`, borders/focus rings → semantic
  border tokens, swatch/creator glyphs → semantic; react-colorful `.pointer-fill` white → semantic `background-base-default` (exact).
- **dropdown** — :construction: `Wrapper`/`DropdownOverlay` bg → `--ds-dropdown-bg`, shadow →
  `--ds-dropdown-shadow`, `DropdownFooter` bg → `-footer-bg`; `TextTrigger` hover/focus/disabled-opacity →
  semantic brand + `--ds-opacity-disabled` (icon coloured via `.ds-icon` `color`, no `svg fill`).
  **Deferred:** `BottomAction`, `BackAction`, `DropdownMenu` search icon (await dropdown module tokens).

### New / own-module tokenisations

- **badge** — :white_check_mark: (❌→✅) badge module applied: `resolveColor` →
  `--ds-badge-variant-{success,neutral,error,info,warning}-bg`, count text → `-text-onsolid`, outline
  ring + dot border → `-ring-color`; `customColor` kept dynamic. ⚑ label grey-600→`-variant-neutral-text` (grey-500).
- **search-bar** — :white_check_mark: (→ module) full `--ds-search-bar-*` module: input bg/border/
  focus-underline/placeholder + search/clear/prefix icon states; prefix-text hover/focus → semantic brand
  (no prefix-text token). All exact.
- **button (warning)** — :white_check_mark: `variantWarning` → `--ds-buttons-variant-primary-warning-*`
  (bg/text/border/focus, all exact); disabled = solid token + `--ds-buttons-disabled-opacity` (option A);
  readOnly `ant-btn-warning` override tokenised; ripple kept on palette.

### Form label-icon + refinements

- **mapping** — :white_check_mark: (❌→✅) both column-title `(i)` `InfoFillS` → `--ds-form-label-icon-color`;
  batch-selection border → `--ds-color-border-base-strong`; static `theme` import dropped.
- **metric-card** — :white_check_mark: (❌→✅) value text → `--ds-color-text-base-default`; `(i)` icon →
  `--ds-form-label-icon-color`.
- **form-field** — :white_check_mark: `IconWrapper` `(i)` → `--ds-form-label-icon-color`; counter (`RightSide`
  grey-500) → semantic `text-neutral-default` (exact; ⚑ could get a form-counter module token).
- **avatar-group** — :white_check_mark: +N `MoreInfo` chrome re-pointed from generic `--ds-avatar-*` to the
  dedicated `--ds-avatar-more-*` tokens.
- **inline-edit** — :white_check_mark: edit-icon override split from the text resolver to an icon resolver:
  error → `--ds-color-icon-danger-default`, default → `--ds-inline-edit-icon-btn-icon-default`.
  ⚑ default icon grey-800→grey-600 (was leaking the text token).

### Buttons-module separator pass (2026-07-24)

- **button-group** — :white_check_mark: (❌→✅) first consumer of the new per-variant
  `--ds-buttons-variant-*-separator` tokens (UX `buttons.variant.<variant>.separator`), which resolved the
  previously-missing split-mode separator token. Split-mode divider borders → `buttons` module per variant
  (primary / custom-color / tertiary / tertiary-white); disabled tertiary label →
  `--ds-buttons-variant-tertiary-text-disabled`; uniform error outline + hover ring → semantic
  `--ds-color-border-danger-default` (exact); `Description` text → `--ds-color-text-base-muted`; `ButtonDivider`
  line → `--ds-divider-line-color-solid` (exact, grey-300). No own namespace, no `.less`, no static `theme`
  imports. ⚑ separators adopt UX per-variant colours (state-agnostic now) + disabled-label/description
  grey-500→grey-600 (see Value shifts).
