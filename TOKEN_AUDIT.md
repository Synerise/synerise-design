# Token requirements audit

> **Read-only planning artifact** produced by the `audit-tokens` skill. For each package it lists every
> tokenisable `theme.palette` / hex / rgba / shadow / opacity value, **what it styles**, and the
> **decision** — semantic layer vs a module namespace (and which) — plus `svg { fill/stroke }` CSS rules to
> convert to `currentColor` and static `theme` imports to fix.
>
> This says *what should happen*; the migration is executed by the [`apply-tokens`](.claude/skills/apply-tokens/SKILL.md)
> skill, which then records *what happened* in the trio:
> [`TOKENISATION_STATUS.md`](./TOKENISATION_STATUS.md) ·
> [`UNTOKENISED_COMPONENTS.md`](./UNTOKENISED_COMPONENTS.md) ·
> [`TOKEN_USAGE_BY_COMPONENT.md`](./TOKEN_USAGE_BY_COMPONENT.md).
>
> **Sections are sorted alphabetically.** Values verified against `packages/tokens/dist/css/light.css`.
> Re-derive the live token set each run — names/values change. Dynamic (user-supplied `color`/`customColor`)
> and decorative (gradients, transparent stops) values are recorded as `keep` and are **not** defects.
>
> **Batches (2026-07-21).** *l/m/o/p* (10): layout, list, loader, logic, manageable-list, mapping,
> metric-card, operators, panel, panels-resizer. *r→w* (22): result, scrollbar, search, search-bar,
> short-cuts, sidebar, sidebar-object, skeleton, slider, sortable, step-card, subject, subtle-form,
> table-new, tag, tags, toolbar, tooltip, tray, typography, unordered-list, wizard. Together these cover
> every remaining un-tokenised UI component from **l to the end of the alphabet** (32 packages). None has
> its own module namespace; list/manageable-list/sidebar rows reuse `list-item`; search/search-bar/
> subtle-form/tags fields reuse `form`.
>
> **UX-decision pass (2026-07-21).** Applying the module-vs-semantic decisions the team recorded in
> `UNTOKENISED_COMPONENTS.md` for **image → skeleton**. The per-component **Decision** / **Suggested token**
> columns reflect those. `module: <name> (pending)` = the namespace was chosen but is **not yet in
> `base.json`** — consume once it lands upstream.
>
> **Cross-cutting `(i)`-icon rule (2026-07-21).** Every **InfoFillS `(i)` tooltip/info icon** maps to a
> **dedicated `form` info-icon token — pending upstream** (NOT semantic `--ds-color-icon-base-muted`). Interim
> exact value is grey-400. Applies wherever an InfoFillS info icon appears: `form-field`, `mapping`,
> `metric-card`, `manageable-list`, `search`, `file-uploader`, and the already-tokenised `card-select` /
> `list-item` (revisit). `form-field`'s committed code currently uses `--ds-color-icon-base-muted` → re-point
> when the token lands (already flagged in `UNTOKENISED_COMPONENTS.md`).

## Audited packages

| Component | palette refs | Decision | Blockers | Static `theme` import | `svg{fill/stroke}` rules |
|---|--:|---|---|:--:|:--:|
| [autocomplete](#autocomplete) | 1 (field done) | `dropdown` (pending); field = `form` ✓ | dropdown pending | — | — |
| [avatar-group](#avatar-group) | 8 | module (`avatar`) | none | — | — |
| [badge](#badge) | 8 | module (`badge`) | none | — | — |
| [card-tabs](#card-tabs) | 82 (+2 shadow, +4 opacity) | module (`card-tabs`, pending) | **card-tabs tokens pending** | — | 10 |
| [cascader](#cascader) | 37 | module (`dropdown` + `cascader`, pending) + semantic | dropdown/cascader pending | 4 | 7 |
| [code-area](#code-area) | 18 (11 applied) | module (`form`) + semantic (Monaco via `theme.tokens`) | none | 1 | — |
| [code-snippet](#code-snippet) | 21 (7 applied) | module (`code-snippet`, pending) + semantic | **.less** + code-snippet pending | — | — |
| [collector](#collector) | 13 | module (`form` + `dropdown` pending) + semantic danger | dropdown pending | — | 1 |
| [color-picker](#color-picker) | 14 (2 applied) | `form` (trigger) + semantic (panel controls) + `dropdown` (panel bg, pending) | dropdown pending | — | — |
| [completed-within](#completed-within) | 1 | module (`dropdown` pending); clear done | dropdown pending | — | — |
| [condition](#condition) | 2 (14 applied) | semantic; connectors deferred | connector tokens pending | — | — |
| [confirmation](#confirmation) | 2 | module (`modal`, delegated) + semantic type icons | none | — | — |
| [image](#image) | 12 (+1 shadow) | module (`image`, pending) + semantic | **image tokens pending** | — | — |
| [information-card](#information-card) | 5 | module (`dropdown`, pending) | **dropdown tokens pending** | — | — |
| [insight](#insight) | 4 | semantic | none | — | — |
| [item-filter](#item-filter) | 2 | semantic | **deprecated** | — | — |
| [item-picker](#item-picker) | 13 (overlay/list; trigger done) | module (`dropdown`+`list-item`, pending) + semantic | **dropdown/list-item pending** | 1 | 2 |
| [items-roll](#items-roll) | 16 | semantic | none | 1 | 7 |
| [layout](#layout) | 6 (+2 hex, +2 shadow) | semantic (+ `page` bg) | none | — | — |
| [list](#list) | 13 (+1 opacity) | **deferred** (until de-ant'd) | **.less / de-antd** | — | 2 |
| [loader](#loader) | 3 | semantic (mostly dynamic/decorative) | none | — | — |
| [logic](#logic) | 13 | module (`logic/filter`, pending) | **logic/filter pending** | **1** (Placeholder.tsx) | — |
| [manageable-list](#manageable-list) | 65 (+hex/shadow/opacity) | semantic now → dedicated `manageable-list` module later | none | **1** (ItemActions.tsx) | 10 |
| [mapping](#mapping) | 3 | semantic (border) + `form` (i)-icon pending | (i) token pending | **1** (TitleRow.tsx) | — |
| [metric-card](#metric-card) | 2 | semantic + `form` (i)-icon pending | (i) token pending | — | — |
| [operators](#operators) | 6 | mixed (`dropdown` bg + `list-item` title + semantic) | dropdown pending | **2** (OperatorsDropdown*.tsx) | — |
| [panel](#panel) | 2 (+1 shadow) | semantic | none | — | — |
| [panels-resizer](#panels-resizer) | 4 | semantic | none | — | 1 |
| [result](#result) | 9 | semantic | none | — | — |
| [scrollbar](#scrollbar) | 17 (+rgba) | semantic | **.less** | — | 2 |
| [search](#search) | 23 (+shadow) | mixed (form + dropdown + list-item + form (i)) | dropdown pending | **1** | 3 |
| [search-bar](#search-bar) | 12 | module (`search-bar`, pending) | **search-bar tokens pending** | — | 5 |
| [short-cuts](#short-cuts) | 8 | semantic | shadow token gap | **1** | — |
| [sidebar](#sidebar) | 13 | semantic | none | **2** | — |
| [sidebar-object](#sidebar-object) | 9 | mixed (`modal` footer + semantic) | none | — | — |
| [skeleton](#skeleton) | 5 (+shimmer) | module (`skeleton`, pending) | **skeleton tokens pending** | — | — |
| [slider](#slider) | 15 | semantic | focus-ring token gap | — | — |
| [sortable](#sortable) | 3 | semantic | none | — | — |
| [step-card](#step-card) | 8 | semantic | none | — | 1 |
| [subject](#subject) | 2 | semantic | none | — | — |
| [subtle-form](#subtle-form) | 11 | semantic | translucent-surface token gap | — | — |
| [table-new](#table-new) | 69 | semantic now → dedicated `table-new` module later | **WIP** | **1** | 6 |
| [tag](#tag) | 27 | mixed (many dynamic) | none | — | 3 |
| [tags](#tags) | 7 (+rgba) | mixed (form icon) | none | — | — |
| [toolbar](#toolbar) | 4 | semantic | none | — | — |
| [tooltip](#tooltip) | 7 | module (`tooltip`, pending) | **tooltip tokens pending** | — | — |
| [tray](#tray) | 5 | module (`modal`) | none | — | — |
| [typography](#typography) | 8 | semantic | ⚑ link-hover shift | — | — |
| [unordered-list](#unordered-list) | 1 | semantic | none | — | — |
| [wizard](#wizard) | 6 | semantic | none | — | — |

---

## autocomplete

**Summary.** 🚧 partial — the input **field is already on `--ds-form-field-*`** (applied 2026-07-20). Decision (UX 2026-07-21): **form** (field ✓) + **dropdown** (overlay). Only 1 remaining ref: the suggestion-overlay empty-state text → `dropdown` module (pending). blockers: `dropdown` module tokens not yet available.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/autocomplete/src/AutocompleteDropdown/AutocompleteDropdown.style.ts:35 | grey-600 #6a7580 | `NotFound` / empty-state text · suggestion overlay | Static | module (pending) | `module: dropdown` (overlay text) | field already `--ds-form-field-*` (2026-07-20) |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## avatar-group

**Summary.** 8 palette refs; recommended decision (UX 2026-07-21): **module `avatar`** (existing namespace) — the +N "MoreInfo" avatar chrome and the overlap separator ring reuse the avatar module. The row avatars delegate to ds-avatar; the modal to ds-modal/ds-table (no refs). blockers: none (avatar namespace exists). Ring alpha (FF→00) + badge-dot opacity are the fan-out animation (kept).

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/avatar-group/src/AvatarGroup.styles.ts:63 | white | MoreInfo (+N avatar) · background | Static | module (`avatar`) | `module: avatar` (bg) | |
| packages/components/avatar-group/src/AvatarGroup.styles.ts:64 | grey-300 #dbe0e3 | MoreInfo (+N) · border | Static | module (`avatar`) | `module: avatar` (border) | |
| packages/components/avatar-group/src/AvatarGroup.styles.ts:65,68 | grey-400 #b5bdc3 | MoreInfo (+N) · text (`!important` on span) | Static | module (`avatar`) | `module: avatar` (text) | |
| packages/components/avatar-group/src/AvatarGroup.styles.ts:78,79 | grey-500 #949ea6 | MoreInfo (+N) · text + border · hover/active | Static | module (`avatar`) | `module: avatar` (hover text/border) | |
| packages/components/avatar-group/src/AvatarGroup.styles.ts:37 | `white` @FF (opaque) | avatar · 2px overlap ring · collapsed | Static | module (`avatar`) | `module: avatar` (overlap ring) | `FF` alpha = collapsed state of the fade animation |
| packages/components/avatar-group/src/AvatarGroup.styles.ts:51 | `white` @00 (transparent) | avatar · overlap ring · hover (faded out) | Static | keep | — | transparent animation endpoint |
| packages/components/avatar-group/src/AvatarGroup.styles.ts:33,47 | opacity 0/1 | badge dot · fade on hover | Static | keep (decorative) | — | fan-out animation |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## badge

**Summary.** 8 refs; recommended decision (UX 2026-07-21): **module `badge`** (existing namespace) — status/default bg, count text, outline ring, border, and label text reuse the badge module (the status→colour map becomes badge status-bg tokens). User `customColor` stays dynamic; flag/pulse halos stay decorative. blockers: none (badge namespace exists).

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/badge/src/Badge.styles.tsx:30-31 | `palette[customColor]` / `[${customColor}-600]` | badge bg · user `customColor` | Dynamic | keep (dynamic) | — | user prop / raw CSS colour; not a defect |
| packages/components/badge/src/Badge.styles.tsx:44 | `STATUS_COLOR_TOKEN[$status]` (green/grey/red/blue/yellow-600) | badge bg · status variant | Static (per `$status`) | module (`badge`) | `module: badge` (status bg) | active/inactive/blocked/processing/warning → badge status tokens (JS map → conditional module vars) |
| packages/components/badge/src/Badge.styles.tsx:46 | red-600 | badge bg · default (no status/custom) | Static | module (`badge`) | `module: badge` (default bg) | |
| packages/components/badge/src/Badge.styles.tsx:109 | white | count · text | Static | module (`badge`) | `module: badge` (count text) | |
| packages/components/badge/src/Badge.styles.tsx:110-111 | white | count · outline ring (`$outlined`, `0 0 0 1px`) | Static | module (`badge`) | `module: badge` (outline ring) | keep geometry |
| packages/components/badge/src/Badge.styles.tsx:151 | white | dot/count · 2px border (standalone) | Static | module (`badge`) | `module: badge` (border) | |
| packages/components/badge/src/BadgeWithLabel.styles.ts:11 | grey-600 | label · text | Static | module (`badge`) | `module: badge` (label text) | |
| packages/components/badge/src/Badge.styles.tsx:71,75,82,86 | opacity 0.9/0 | flag/pulse halos · keyframes | Static | keep (decorative) | — | pulse animation |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

_(`box-shadow: none` at :152 = reset.)_

---

## card-tabs

**Summary.** 82 `theme.palette` colour refs + 2 `box-shadow` + 4 disabled-`opacity` (88 total), all in `packages/components/card-tabs/src/CardTab/CardTab.styles.ts`. Decision (UX 2026-07-21): **module `card-tabs`** — new dedicated namespace, **pending upstream** (not in base.json). ~66 static → module; 10 dynamic (user `color` prop / `getColor` / `getLighterColor`) → keep; 6 decorative (InlineEdit fake-caret gradient stops) → keep. 2 shadows + 4 disabled-opacity → module. No `.less`; no static `theme` imports. 10 `svg { fill }` rules → currentColor.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:32 | `grey-600` | CardTabLabel · color · rest | Static | module (pending) | module: card-tabs (text.default) | |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:49 | `grey-800` | CardTabLabel InlineEdit input · color · edit | Static | module (pending) | module: card-tabs (text.strong) | |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:63,73 | `white` | CardTabTag / CardDotPrefix · color · rest | Static | module (pending) | module: card-tabs (text.on-color) | |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:129 | `red-600` | CardTabContainer · background · invalid+active | Static | module (pending) | module: card-tabs (bg.error) | |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:135,226,332 | `white` | CardTabContainer · background · greyBackground (rest/hover/pressed) | Static | module (pending) | module: card-tabs (surface.raised) | |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:137,228 | `grey-050` | CardTabContainer · background · default (rest/hover) | Static | module (pending) | module: card-tabs (surface.default[.hover]) | |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:334 | `grey-100` | CardTabContainer · background · pressed (default) | Static | module (pending) | module: card-tabs (surface.default.pressed) | |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:145 | `red-600` | CardTabContainer · border-color · invalid | Static | module (pending) | module: card-tabs (border.error) | |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:150 | `grey-300` | CardTabContainer · border-color · inactive | Static | module (pending) | module: card-tabs (border.default) | |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:158,247 | `white` | CardTabTag · background · active | Static | module (pending) | module: card-tabs (tag.bg.active) | inactive uses `${color}` (dynamic) |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:160,255 | `white` | CardTabTag · color · inactive | Static | module (pending) | module: card-tabs (tag.text) | active uses `${color}` (dynamic) |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:176 | `white` | CardDotPrefix · border-color · active & !edited | Static | module (pending) | module: card-tabs (border.on-color) | |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:184-317,382-403 | `white` (active) / `grey-600` (inactive) | prefix/suffix/handle icons · color+fill · rest/hover/active | Static | module (pending) | module: card-tabs (icon.on-color / icon.default) | many svg fill rules → SVG table |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:207,209 | `white` (active) / `red-600` (inactive) | CardTabSuffix .remove · svg color+fill | Static | module (pending) | module: card-tabs (icon.on-color / icon.danger) | svg fill → SVG table |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:394,396 | `white` (active) / `grey-400` (inactive) | drag-handle icon · color+fill | Static | module (pending) | module: card-tabs (icon.on-color / icon.subtle) | svg fill → SVG table |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:220,326 | `red-500` (`getLighterColor('red-600')`) | CardTabContainer · background · invalid hover/pressed | Static | module (pending) | module: card-tabs (bg.error.hover/pressed) | deterministic from literal red-600 |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:239,241,372,374,342,344 | `white` (active) / `grey-800`\|`grey-600` (inactive) | CardTabLabel / InlineEdit input · color · states | Static | module (pending) | module: card-tabs (text.on-color / text.strong / text.default) | |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:140,216 | `0 4px 12px 0 rgba(35,41,54,0.04)` | CardTabContainer · box-shadow · greyBackground (rest/hover) | Static | module (pending) | module: card-tabs (shadow.raised) | = shadow-1 value |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:376,386,390,407 | `0.4` | Label / suffix-icon / prefix / suffix · opacity · disabled | Static | module (pending) | module: card-tabs (opacity.disabled) | enabled = 1 |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:132,149,158,160,165,167,223,249,253,329 | `${color}` / `getColor(color)` / `getLighterColor(color)` | container/tag/dot · bg/border/text · active + hover | Dynamic | keep (dynamic) | — | user/auto-assigned tab colour |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:52-55,351-364 | `blue-600` / `white` / `grey-800` / `rgba(255,255,255,0)` | InlineEdit input · linear-gradient (fake caret) stops | Static | keep (decorative) | — | gradient caret |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:167 | `transparent` | CardDot · background · active (hidden) | Static | keep (decorative) | — | show/hide |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:188,201,267,284,301,313,383,402 | `fill: active ? white : grey-600 !important` (prefix/suffix/handle icons) | drop `fill:`; wrapper `color` + `svg { fill: currentColor }` from module token (icon.on-color / icon.default) |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:208 | `fill: active ? white : red-600 !important` (remove icon) | wrapper `color` + `currentColor` (icon.on-color / icon.danger) |
| packages/components/card-tabs/src/CardTab/CardTab.styles.ts:395 | `fill: getColor(active, white, grey-400)` (drag-handle) | wrapper `color` + `currentColor` (icon.on-color / icon.subtle) |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## cascader

**Summary.** 37 refs; decision (UX 2026-07-21): **mixed** — overlay panel + footer → `module: dropdown` (pending); breadcrumb / back-action / nav-header rows → new dedicated **`cascader` module** (pending, NOT list-item); selected checkmarks → semantic success; search-field icon → **drop** (inherit); decoratives kept. blockers: **`dropdown` + `cascader` module tokens pending**. ⚑ `InputWrapper` (row 1) + `BottomAction` (rows 9–12) appear **unused by Cascader** — verify / check consumers for deep imports before removing. 7 `svg { fill }` rules; 4 static `theme` imports to convert (the search-icon import is removed by dropping its `color`).

### Palette / colour usage
| # | file:line | value | role | Decision → token |
|--:|---|---|---|---|
| 1 | Cascader.styles.tsx:6 | rgba(35,41,54,0.05) | InputWrapper — box-shadow | `module: dropdown` (panel shadow) — ⚑ alpha 0.05 vs shadow-2 0.10; ⚑ **InputWrapper unused — check consumers for deep imports** |
| 2 | Cascader.styles.tsx:12 | white | SearchResults overlay — bg | `module: dropdown` (panel bg) |
| 3 | Cascader.styles.tsx:15 | rgba(35,41,54,0.05) | SearchResults overlay — box-shadow | `module: dropdown` (panel shadow) — ⚑ alpha |
| 4 | Cascader.tsx:196 | grey-600 | SearchBar left icon (SearchM) — color prop | **drop** (inherit default) — removes the static `theme` import |
| 5 | BackAction.styles.ts:7 | grey-700 | back-action row — text · default | `module: cascader` (pending) |
| 6 | BackAction.styles.ts:15 | grey-700 | back-action row — icon svg fill · default | `module: cascader` (pending); svg rule |
| 7 | BackAction.styles.ts:23 | blue-600 | back-action row — text · hover | `module: cascader` (pending) |
| 8 | BackAction.styles.ts:26 | blue-600 | back-action row — icon (wrapper color) · hover | `module: cascader` (pending) |
| 9 | BottomAction.styles.ts:6 | grey-600 | bottom-action bar — icon svg fill | `module: dropdown` (footer icon); svg rule — ⚑ **verify unused** |
| 10 | BottomAction.styles.ts:15 | grey-050 | bottom-action bar — bg | `module: dropdown` (footer bg) — ⚑ verify unused |
| 11 | BottomAction.styles.ts:20 | grey-600 | bottom-action bar — text | `module: dropdown` (footer text) — ⚑ verify unused |
| 12 | BottomAction.styles.ts:23 | grey-100 | bottom-action bar — border-top | `module: dropdown` (footer border) — ⚑ verify unused |
| 13 | Breadcrumb.styles.tsx:42 | grey-600 | crumb — description text · default | `module: cascader` (pending) |
| 14 | Breadcrumb.styles.tsx:61 | grey-050 | crumb overflow-fade `::before` gradient stop | `module: cascader` (pending) |
| 15 | Breadcrumb.styles.tsx:75 | white | crumb overflow-fade `::after` gradient stop | `module: cascader` (pending) |
| 16 | Breadcrumb.styles.tsx:82 | grey-600 | crumb — name text · default | `module: cascader` (pending) |
| 17 | Breadcrumb.styles.tsx:91 | white `!important` | non-clickable crumb — bg | `module: cascader` (pending) |
| 18 | Breadcrumb.styles.tsx:92 | transparent | non-clickable crumb — inset ring | keep (decorative) |
| 19 | Breadcrumb.styles.tsx:94 | grey-600 | non-clickable crumb — name/desc text | `module: cascader` (pending) |
| 20 | Breadcrumb.styles.tsx:97 | grey-600 | crumb arrow (ArrowRight) — icon svg fill · default | `module: cascader` (pending); svg rule |
| 21 | Breadcrumb.styles.tsx:102 | grey-600 / blue-600 | crumb — text · hover (disabled ternary) | `module: cascader` (pending) |
| 22 | Breadcrumb.styles.tsx:107 | grey-600 | crumb prefix icon — svg fill `!important` · default | `module: cascader` (pending); svg rule |
| 23 | Breadcrumb.styles.tsx:114 | blue-600 | crumb prefix icon — svg fill `!important` · hover | `module: cascader` (pending); svg rule |
| 24 | Breadcrumb.styles.tsx:168 | transparent | nav crumb Inner — bg · hover/active/focus | keep (decorative) |
| 25 | Breadcrumb.styles.tsx:172 | grey-600 / blue-600 | nav crumb — text · hover (disabled ternary) | `module: cascader` (pending) |
| 26 | Breadcrumb.styles.tsx:178 | blue-600 | nav crumb prefix icon — svg fill `!important` · hover | `module: cascader` (pending); svg rule |
| 27 | Breadcrumb.styles.tsx:189 | grey-050 | crumb row — bg · hover (non-nav) | `module: cascader` (pending) |
| 28 | Breadcrumb.styles.tsx:190 | blue-600 | crumb row — text · hover | `module: cascader` (pending) |
| 29 | Breadcrumb.styles.tsx:192-194 | grey-600 / blue-600 | crumb arrow icon — svg fill · hover (disabled ternary) | `module: cascader` (pending); svg rule |
| 30 | Breadcrumb.styles.tsx:197-200 | grey-600 / blue-600 | crumb — name/desc text · hover (disabled ternary) | `module: cascader` (pending) |
| 31 | Breadcrumb.styles.tsx:204 | blue-600 | crumb — inset box-shadow focus ring | `module: cascader` (pending) |
| 32 | Breadcrumb.styles.tsx:208 | grey-100 | crumb overflow-fade `::before` gradient · focus:active | `module: cascader` (pending) |
| 33 | Breadcrumb.styles.tsx:15,27,54,66,156,159 | opacity 0/1 | fade/arrow visibility toggles | keep (decorative) |
| 34 | Breadcrumb.tsx:117 | grey-600 | crumb separator (AngleRightS) — Icon color | `module: cascader` (pending); static import |
| 35 | BreadcrumbsList.tsx:35 | green-600 | search-result — selected checkmark (CheckS) | semantic `--ds-color-icon-success-default`; static import |
| 36 | CategoriesList.tsx:41 | green-600 | category — selected checkmark (CheckS) | semantic `--ds-color-icon-success-default`; static import |
| 37 | Navigation.tsx:31 | grey-600 | breadcrumb home prefix (HomeM) — Icon color | `module: cascader` (pending); static import |

### SVG fill/stroke rules to replace
| # | file:line | Current rule | Replacement |
|--:|---|---|---|
| 6 | BackAction.styles.ts:13-15 | `svg { fill: grey-700 }` (IconWrapper) | `currentColor` + wrapper `color: var(--ds-cascader-…)` (pending) |
| 9 | BottomAction.styles.ts:5-6 | `svg { fill: grey-600 }` | `currentColor` + `module: dropdown` icon token (verify unused) |
| 20,22,23,26,29 | Breadcrumb.styles.tsx:96-98/106-108/112-115/176-179/191-195 | `.ds-icon svg { fill: grey-600 / blue-600 !important }` | `currentColor` + wrapper `color: var(--ds-cascader-…)` (pending) |

### Static `theme` imports
| # | file:line | Usage | Resolution |
|--:|---|---|---|
| 34 | Breadcrumb.tsx:3 | `theme.palette['grey-600']` → AngleRightS Icon color | pass `var(--ds-cascader-…)` (pending); remove import |
| 35 | BreadcrumbsList.tsx:3 | `theme.palette['green-600']` → CheckS color | pass `var(--ds-color-icon-success-default)`; remove import |
| 36 | CategoriesList.tsx:4 | `theme.palette['green-600']` → CheckS color | pass `var(--ds-color-icon-success-default)`; remove import |
| 37 | Navigation.tsx:3 | `theme.palette['grey-600']` → HomeM Icon color | pass `var(--ds-cascader-…)` (pending); remove import |

_(Row 4's `Cascader.tsx:13` static import is removed by dropping the search-icon `color` prop.)_

---

## code-area

**Summary.** 18 refs; decision (UX 2026-07-21): **module `form`** (editor field — **11 already applied** as `--ds-form-*`) + semantic (fullscreen overlay bg) + **Monaco constants reworked to `theme.tokens[…]`** (resolved values, replacing `theme.palette[…]`) mapped to semantic tokens. blockers: none (the earlier "Monaco can't use CSS vars" constraint is resolved by using the resolved-value `theme.tokens` map). NB: `constants.ts` keeps its `theme` import but switches `.palette` → `.tokens`.

### Palette / colour usage
| # | file:line | value | role | Decision → token |
|--:|---|---|---|---|
| 1 | CodeArea.styles.ts:44-48 | `var(--ds-form-field-border-validated/default)` | EditorWrapper — border · error/default | ✅ applied (`module form`) |
| 2 | CodeArea.styles.ts:58 | `var(--ds-form-field-bg-validated)` | EditorWrapper — bg · error | ✅ applied |
| 3 | CodeArea.styles.ts:59-61 | `inset 0 0 0 1px var(--ds-form-field-border-validated)` | EditorWrapper — box-shadow ring · error | ✅ applied |
| 4 | CodeArea.styles.ts:131 | `var(--ds-form-field-bg-disabled)` | EditorWrapper — bg · readOnly | ✅ applied |
| 5 | CodeArea.styles.ts:160,161,166,170,173,174 | `var(--ds-form-field-bg/border-*)` | BottomBar — bg/border · default/error (6 refs) | ✅ applied |
| 6 | CodeArea.styles.ts:196 | `var(--ds-form-error-text-color)` | ErrorText — color · error | ✅ applied |
| 7 | CodeArea.styles.ts:97 | `theme.palette.white` | CodeAreaWrapper — bg · fullscreen overlay | semantic `--ds-color-background-base-default` (exact; styled-component CSS var) |
| 8 | CodeArea.styles.ts:64 | `opacity: 0` | EditorWrapper `canvas` — load hide | keep (functional, non-colour) |
| 9 | CodeArea.styles.ts:94 | `theme.variables['zindex-modal']` | CodeAreaWrapper — z-index · fullscreen | keep (non-colour) |
| 10 | constants.ts:24 | `#00000000` | Monaco `editor.background` / overviewRuler border | **`theme.tokens['--ds-color-transparent']`** (keeps transparent → shows form-field bg) |
| 11 | constants.ts:31 | grey-800 | Monaco `editor.foreground` (code text) | **`theme.tokens['--ds-color-text-base-default']`** (exact grey-800) |
| 12 | constants.ts:35 | grey-300 | Monaco `scrollbarSlider.background` | **`theme.tokens['--ds-color-border-base-strong']`** (grey-300 exact; bg↔border name-mismatch) |
| 13 | constants.ts:36,37 | grey-500 | Monaco `scrollbarSlider.hover/activeBackground` | **`theme.tokens['--ds-color-background-base-stronghover']`** (grey-500 exact) |
| 14 | constants.ts:38 | grey-500 | Monaco `editorLineNumber.foreground` | **`theme.tokens['--ds-color-text-neutral-default']`** (grey-500 exact) |

### SVG fill/stroke rules to replace
| # | file:line | Current rule | Replacement |
|--:|---|---|---|
| — none — |  |  |

### Static `theme` imports
| # | file:line | Usage | Resolution |
|--:|---|---|---|
| 1 | constants.ts:3 | `import { theme }` → Monaco `DS_MONACO_THEME` colours | keep the import but read `theme.tokens['--ds-…']` (resolved values) instead of `theme.palette[…]` — see rows 10–14 |

---

## code-snippet

**Summary.** 21 refs; decision (UX 2026-07-21): block chrome → **semantic** (**7 already applied**); the 12 syntax-highlight hues + the inline-code accent → new dedicated **`code-snippet` module** (pending upstream — no semantic equivalent for code-syntax colours, documented as a gap). blockers: **`.less` present** (`src/style/index.less`, IBM Plex Mono `@font-face`, side-effect imported) + `code-snippet` module pending. No svg rules, no static imports (uses `props.theme`).

### Palette / colour usage
| # | file:line | value | role | Decision → token |
|--:|---|---|---|---|
| 1 | Highlight.styles.ts:5 | grey-700 | `.hljs` base code text | `module: code-snippet` (pending) |
| 2 | Highlight.styles.ts:10 | blue-600 | `.hljs-attr` / template-tag | `module: code-snippet` (pending) |
| 3 | Highlight.styles.ts:16 | cyan-600 | `.hljs-comment/doctag/quote` | `module: code-snippet` (pending) |
| 4 | Highlight.styles.ts:20 | grey-600 | `.hljs-params` | `module: code-snippet` (pending) |
| 5 | Highlight.styles.ts:24 | violet-600 | `.hljs-regexp` | `module: code-snippet` (pending) |
| 6 | Highlight.styles.ts:31 | red-600 | `.hljs-tag/selector-id/number/literal` | `module: code-snippet` (pending) |
| 7 | Highlight.styles.ts:36 | blue-600 | `.hljs-meta` | `module: code-snippet` (pending) |
| 8 | Highlight.styles.ts:53 | blue-600 | `.hljs-selector-class…keyword` | `module: code-snippet` (pending) |
| 9 | Highlight.styles.ts:59 | orange-600 | `.hljs-built_in/title/deletion` | `module: code-snippet` (pending) |
| 10 | Highlight.styles.ts:68 | yellow-600 | `.hljs-type/section/function/name/property/attribute` | `module: code-snippet` (pending) |
| 11 | Highlight.styles.ts:77 | green-600 | `.hljs-string/subst/symbol/bullet/addition` | `module: code-snippet` (pending) |
| 12 | Highlight.styles.ts:81 | purple-600 | `.hljs-selector-tag` | `module: code-snippet` (pending) |
| 13 | InlineCode.styles.ts:11 | `#e31a5d` (pink, not in palette) | inline `<code>` — text | `module: code-snippet` (pending, inline-code) |
| 14 | InlineCode.styles.ts:12 | pink-100 | inline `<code>` — bg | `module: code-snippet` (pending, inline-code) |
| 15 | SingleCode.styles.ts:20,21,25 | `var(--ds-color-background-base-muted / icon-base-muted / icon-brand-default)` | copy button/icon (+hover) | ✅ applied (semantic) |
| 16 | SingleCode.styles.ts:34,58 | `var(--ds-color-background-base-muted / text-base-muted)` | block surface + code text | ✅ applied (semantic) |
| 17 | MultiCode.styles.ts:28,53 | `var(--ds-color-background-base-muted)` | edge/bottom fade masks | ✅ applied (semantic) |
| 18 | MultiCode.styles.ts:116,122 | `opacity: 0` | scrollbar rails — functional hide | keep (non-colour) |

### SVG fill/stroke rules to replace
| # | file:line | Current rule | Replacement |
|--:|---|---|---|
| — none — |  |  |

### Static `theme` imports
| # | file:line | Usage | Resolution |
|--:|---|---|---|
| — none — |  |  |

---

## collector

**Summary.** ~14 refs; decision (UX 2026-07-21): **module `form`** (field placeholder — applied; cross-fade gradients → form-field bg) + **`dropdown`** (pending, suggestions overlay + nav-hint footer) + **semantic** (error chip → danger; grey value chip → base-muted ⚑). Field surface/border delegate to ds-input (out of scope). blockers: `dropdown` module pending. No static imports, no `.less`. 1 svg fill rule.

### Palette / colour usage
| # | file:line | value | role | Decision → token |
|--:|---|---|---|---|
| 1 | Collector.styles.ts:181 | `var(--ds-form-field-text-placeholder)` | field placeholder text | ✅ applied (`module form`) |
| 2 | Collector.styles.ts:69 | grey-200 | `.ds-input-value-wrapper` value chip — bg | semantic `--ds-color-background-base-muted` — ⚑ shift grey-200→grey-100 (lighter) |
| 3 | Collector.styles.ts:137 | red-600 | error chip — bg | semantic `--ds-color-background-danger-solid` |
| 4 | Collector.styles.ts:138 | white | error chip — text | semantic `--ds-color-text-onsolid-danger` |
| 5 | Collector.styles.ts:140 | white | error chip — icon | semantic `--ds-color-icon-onsolid-danger` |
| 6 | Collector.styles.ts:160 | white | DropdownContent overlay — bg | `module: dropdown` (pending) |
| 7 | Collector.styles.ts:167 | `0 16px 32px rgba(35,41,54,0.12)` | DropdownContent overlay — box-shadow | `module: dropdown` (overlay shadow, pending) — ⚑ α 0.12 vs shadow-2 0.10 |
| 8 | Collector.styles.ts:217 | grey-100 | nav-hint footer — border-top | `module: dropdown` (footer border, pending) |
| 9 | Collector.styles.ts:218 | grey-050 | nav-hint footer — bg | `module: dropdown` (footer bg, pending) |
| 10 | Collector.styles.ts:222 | grey-400 | nav-hint footer — text | `module: dropdown` (footer text, pending) |
| 11 | Collector.styles.ts:226 | grey-400 | nav-hint footer — icon svg fill | `module: dropdown` (footer icon, pending); svg rule |
| 12 | Collector.styles.ts:77,95 | blue-050 (focus) / white (blur) | scroll-fade gradient — **solid stop** | **`module: form`** → `--ds-form-field-bg-focus` (focus) / `--ds-form-field-bg-default` (blur) — match field bg |
| 12b | Collector.styles.ts:78,96 | rgba(255,255,255,0) | scroll-fade gradient — transparent stop | keep (transparent) |
| 13 | Collector.styles.ts:123 | transparent | Input — hides typed text while placeholder shows | keep (functional) |
| 14 | Collector.styles.ts:25 | (transition prop) | scroll-fade transition | keep (non-colour) |

### SVG fill/stroke rules to replace
| # | file:line | Current rule | Replacement |
|--:|---|---|---|
| 11 | Collector.styles.ts:226 | `.ds-icon > svg { fill: grey-400 }` (nav-hint footer) | wrapper `color` + `currentColor` (dropdown footer-icon token, pending) |

### Static `theme` imports
| # | file:line | Usage | Resolution |
|--:|---|---|---|
| — none — |  |  |

---

## color-picker

**Summary.** 14 refs; decision (UX 2026-07-21): trigger affix → **`module form`** (2 applied); the panel **surface bg** → **`module: dropdown`** (pending); the panel **control chrome** (creator/swatch/placeholder/preview borders + focus rings + selected dot) → **semantic** (exact correct-category tokens); react-colorful vendor chrome kept; swatch colours dynamic. blockers: `dropdown` module pending. No svg rules, no static imports, no `.less`.

### Palette / colour usage
| # | file:line | value | role | Decision → token |
|--:|---|---|---|---|
| 1 | ColorPicker.styles.ts:15 | white | Container (picker panel wrapper) — bg | `module: dropdown` (overlay surface, pending) |
| 2 | ColorPicker.styles.ts:41 | grey-300 | `.react-colorful__hue-pointer` — border | semantic `--ds-color-border-base-strong` (grey-300 exact) |
| 3 | ColorPicker.styles.ts:42 | `box-shadow: none` | `.react-colorful__hue-pointer` | keep (vendor reset) |
| 4 | ColorPicker.styles.ts:44 | white | `.react-colorful__pointer-fill` — bg | keep (react-colorful vendor chrome) |
| 5 | ColorPicker.styles.ts:60 | `var(--ds-form-field-affix-border)` | ColorTag (trigger preview swatch) — border | ✅ applied (`module form`) |
| 6 | ColorPicker.styles.ts:77 | grey-800 | SwatchCreatorButton ("+") — icon glyph color | semantic `--ds-color-icon-base-default` — ⚑ shift grey-800→grey-600 (no icon token at grey-800) |
| 7 | ColorPicker.styles.ts:82 | grey-200 | SwatchCreatorButton — bg · hover | semantic `--ds-color-background-base-mutedhover` (grey-200 exact) |
| 8 | ColorPicker.styles.ts:86 | blue-600 | SwatchCreatorButton — outline/ring · focus-visible | semantic `--ds-color-border-brand-default` (blue-600 exact) |
| 9 | ColorPicker.styles.ts:105 | blue-600 | Swatch — outline/ring · focus-visible | semantic `--ds-color-border-brand-default` (exact) |
| 10 | ColorPicker.styles.ts:115 | white | SwatchDot (selected-swatch centre dot) | semantic `--ds-color-icon-onsolid-default` (always-white indicator) |
| 11 | ColorPicker.styles.ts:123 | grey-300 | SwatchPlaceholder (empty slot) — border | semantic `--ds-color-border-base-strong` (grey-300 exact) |
| 12 | ColorPicker.styles.ts:164 | grey-300 | PrefixTag `.ds-tag` (panel preview square) — border | semantic `--ds-color-border-base-strong` (exact) |
| 13 | ColorPicker.styles.ts:192 | `var(--ds-form-field-affix-text)` | PreffixWrapper ("#" hex prefix) — text | ✅ applied (`module form`) |
| 14 | ColorPicker.tsx:32 | `#ffffff` (DEFAULT_COLOR) | initial picker colour value | keep (dynamic value) |

### SVG fill/stroke rules to replace
| # | file:line | Current rule | Replacement |
|--:|---|---|---|
| — none — |  |  |

### Static `theme` imports
| # | file:line | Usage | Resolution |
|--:|---|---|---|
| — none — |  |  |

---

## completed-within

**Summary.** 1 remaining ref; decision (UX 2026-07-21): **module `dropdown`** (pending) for the Settings panel bg; clear icon already `--ds-color-icon-danger-default` (2026-07-20). Form controls + buttons delegate to their DS components. blockers: `dropdown` module pending. No svg/static/`.less`.

### Palette / colour usage
| # | file:line | value | role | Decision → token |
|--:|---|---|---|---|
| 1 | Settings/Settings.styles.ts:11 | white | Settings dropdown panel — bg | `module: dropdown` (overlay bg, pending) |
| 2 | CompleteWithin.styles.ts:18 | `var(--ds-color-icon-danger-default)` | ClearButton icon — color | ✅ applied (clear icon, 2026-07-20) |
| 3 | CompleteWithin.styles.ts:12 | `opacity: 0` | ClearButton — hidden (no value) | keep (dynamic show/hide) |
| 4 | CompleteWithin.styles.ts:52 | `opacity: 1` | ClearButton — visible | keep (dynamic show/hide) |
| 5 | CompleteWithin.styles.ts:23 | `box-shadow: none` | ClearButton `.btn-focus` — focus reset | keep (decorative) |

### SVG fill/stroke rules to replace
| # | file:line | Current rule | Replacement |
|--:|---|---|---|
| — none — |  |  |

### Static `theme` imports
| # | file:line | Usage | Resolution |
|--:|---|---|---|
| — none — |  |  |

---

## condition

**Summary.** 16 refs; decision (UX 2026-07-21): **semantic** — 14 already applied (2026-07-20); only the 2 `ConditionConnections` connector lines remain, **kept on palette (deferred, pending a connector token)**. blockers: connector token pending. Opacity values are visibility toggles (keep). No svg rules, no static imports (uses `props.theme`), no `.less`.

### Palette / colour usage
| # | file:line | value | role | Decision → token |
|--:|---|---|---|---|
| 1 | Condition.style.ts:321 | grey-300 | `ConditionConnections` `:before` — horizontal connector line bg | **keep (deferred)** — pending dedicated connector token |
| 2 | Condition.style.ts:335 | grey-300 | `ConditionConnections` `:after` — vertical connector line bg | **keep (deferred)** — pending connector token |
| — | (14 other refs) | `var(--ds-*)` | base text/bg/border/icon + `--ds-shadows-shadow-2` | ✅ already applied (semantic, 2026-07-20) |

### SVG fill/stroke rules to replace
| # | file:line | Current rule | Replacement |
|--:|---|---|---|
| — none — |  |  |

### Static `theme` imports
| # | file:line | Usage | Resolution |
|--:|---|---|---|
| — none — |  |  |

---

## confirmation

**Summary.** 2 type-driven colour refs; decision (UX 2026-07-21): dialog surface → **`module: modal`** (delegated to `@synerise/ds-modal`, applied upstream — nothing local); the type-driven icon → **semantic** per type (all exact). blockers: none. `useTheme()` (Confirmation.tsx:4) is a hook, removable once the icon colour is a CSS var.

### Palette / colour usage
| # | file:line | value | role | Decision → token |
|--:|---|---|---|---|
| 1 | Confirmation.utils.ts:8 (+ const.ts:10) | `palette[ICON_COLOR_MAPPING[type]]` → red-600 / green-600 / yellow-600 / grey-600 | type-driven `<Icon>` color (size 96) · per `type` | **semantic**: negative→`--ds-color-icon-danger-default`, success→`--ds-color-icon-success-default`, warning→`--ds-color-icon-warning-default`, informative→`--ds-color-icon-base-default` (all exact) |
| 2 | Confirmation.const.ts:3 | `BUTTON_COLOR_MAPPING` = red/green/yellow/blue | `<Button type="custom-color" color={…}>` · per `type` | keep (ds-button `custom-color` keyword) — ⚑ **follow-up: buttons should use a semantic ds-button `type` (e.g. `primary-danger`/`primary-success`/`primary-warning`) instead of a fixed custom-color mapping** |
| — | dialog surface/overlay/header/footer | — | delegated to `<Modal>` (`@synerise/ds-modal`) | ✅ `module: modal` applied upstream (nothing local) |

### SVG fill/stroke rules to replace
| # | file:line | Current rule | Replacement |
|--:|---|---|---|
| — none — |  |  |

### Static `theme` imports
| # | file:line | Usage | Resolution |
|--:|---|---|---|
| — none — |  |  |

_(Note: informative-type icon is grey (`icon-base-default`) while its button accent is blue — an existing inconsistency; icon stays grey, no `icon-info` token.)_

---

## image

**Summary.** 13 tokenisable refs (12 palette + 1 shadow); own module namespace: **`image` — pending upstream (not in `base.json` yet)**; recommended decision: **module (`image`) + semantic** — image-specific surfaces (thumbnail/placeholder bg+fg, hover overlay, preview backdrop, overlay icon) → `image` module; generic focus ring / danger delete / elevation → semantic (per UX 2026-07-21); blockers: **`image` module tokens not yet available**. Dark scrims use hex-alpha suffixes (`4D`=30%, `CC`=80%) baked onto the palette hex — the `image` tokens must carry that opacity.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/image/src/Thumbnail/Thumbnail.styles.ts:56 | grey-050 #f9fafb | Clip · background · subtle-grey thumbnail | Static | module (pending) | `module: image` (thumbnail bg) | pending upstream |
| packages/components/image/src/Thumbnail/Thumbnail.styles.ts:77 | grey-050 #f9fafb | EmptyPlaceholder · background | Static | module (pending) | `module: image` (placeholder bg) | pending upstream |
| packages/components/image/src/Thumbnail/Thumbnail.styles.ts:76 | grey-600 #6a7580 | EmptyPlaceholder · color (icon/text) | Static | module (pending) | `module: image` (placeholder fg) | pending upstream |
| packages/components/image/src/Thumbnail/Thumbnail.styles.ts:90 | grey-900 @30% (`4D`) | HoverOverlay · background (dark scrim) · hover | Static | module (pending) | `module: image` (hover overlay) | no semantic token at 30% |
| packages/components/image/src/shared/ImageContent.styles.ts:12 | grey-050 #f9fafb | broken-image placeholder · background | Static | module (pending) | `module: image` (placeholder bg) | pending upstream |
| packages/components/image/src/shared/ImageContent.styles.ts:11 | grey-600 #6a7580 | broken-image placeholder · color (icon) | Static | module (pending) | `module: image` (placeholder fg) | pending upstream |
| packages/components/image/src/Preview/ImagePreview.styles.ts:25 | grey-900 @80% (`CC`) | Preview Overlay · background (lightbox backdrop) | Static | module (pending) | `module: image` (preview backdrop) | no semantic token at 80%; cf. modal mask |
| packages/components/image/src/Preview/ImagePreview.styles.ts:78 | grey-050 #f9fafb | Preview FallbackBox · background | Static | module (pending) | `module: image` (placeholder bg) | pending upstream |
| packages/components/image/src/Preview/ImagePreview.styles.ts:77 | grey-600 #6a7580 | Preview FallbackBox · color (icon) | Static | module (pending) | `module: image` (placeholder fg) | pending upstream |
| packages/components/image/src/Thumbnail/Thumbnail.styles.ts:88 | white #ffffff | HoverOverlay · color (centered show icon) · hover | Static | module (pending) | `module: image` (overlay icon) | white icon on scrim |
| packages/components/image/src/Thumbnail/Thumbnail.styles.ts:40 | blue-600 #0b68ff | Tile · box-shadow ring (2px) · :focus-visible | Static | semantic | `--ds-color-border-brand-default` | exact; keep `0 0 0 2px` geometry |
| packages/components/image/src/Thumbnail/Thumbnail.styles.ts:116 | red-600 #f52922 | DeleteButton · color (danger disc, drives icon fill) · hover | Static | semantic | `--ds-color-icon-danger-default` | exact |
| packages/components/image/src/Preview/ImagePreview.styles.ts:56 | `box-shadow-4` (0 60px 80px #23293633) | Preview Image · box-shadow (elevation) | Static | semantic | `--ds-shadows-shadow-4` | 1:1 mapping |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## information-card

**Summary.** 5 palette/shadow refs (all → `dropdown` module per UX 2026-07-21) incl. a hardcoded `white` surface; own module namespace: **`dropdown` — pending upstream (not in `base.json` yet)**; recommended decision: **module (`dropdown`)** — a floating info-card/popover; its whole overlay (surface, shadow, footer, text) → the dropdown module; blockers: **`dropdown` module tokens not yet available**.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/information-card/src/InformationCard.styles.tsx:96 | white (keyword) | InfoCardWrapper · background (floating card surface) | Static | module (pending) | `module: dropdown` (overlay surface bg) | hardcoded keyword → token |
| packages/components/information-card/src/InformationCard.styles.tsx:98-101 | `0 16px 32px rgba(35,41,54,0.1)` | InfoCardWrapper · box-shadow (elevation) · non-tooltip | Static | module (pending) | `module: dropdown` (overlay shadow) | = semantic `--ds-shadows-shadow-2` exact; UX chose dropdown module |
| packages/components/information-card/src/InformationCard.styles.tsx:50 | grey-050 #f9fafb | FooterWrapper · background | Static | module (pending) | `module: dropdown` (footer bg) | pending upstream |
| packages/components/information-card/src/InformationCard.styles.tsx:51 | grey-100 #f3f5f6 | FooterWrapper · border-top (1px) | Static | module (pending) | `module: dropdown` (footer border) | pending upstream |
| packages/components/information-card/src/InformationCard.styles.tsx:77 | grey-600 #6a7580 | InfoCardWrapper · color (body text) | Static | module (pending) | `module: dropdown` (text) | pending upstream |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

_(`opacity: 0/1` Copyable hover-reveal + `box-shadow: unset` at :151 → decorative/reset, not tokenisable.)_

---

## insight

**Summary.** 4 palette refs (all → semantic, exact — zero visual change); own module namespace: none; recommended decision: **semantic** (per UX 2026-07-21); blockers: none.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/insight/src/Insight.styles.tsx:6 | white #ffffff | InsightContainer · background (card surface) | Static | semantic | `--ds-color-background-base-default` | exact |
| packages/components/insight/src/Insight.styles.tsx:10 | grey-200 #e9edee | InsightContainer · border-bottom (divider, 1px) | Static | semantic | `--ds-color-border-base-default` | exact |
| packages/components/insight/src/Insight.styles.tsx:14 | grey-050 #f9fafb | InsightContainer · background · :hover (clickable) | Static | semantic | `--ds-color-background-base-defaulthover` | exact (hover of base-default) |
| packages/components/insight/src/Insight.styles.tsx:29 | grey-800 #384350 | Title `<label>` · color | Static | semantic | `--ds-color-text-base-default` | exact |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## item-filter

**Summary.** 2 palette refs (both → semantic, exact); own module namespace: none; recommended decision: **semantic** (per UX 2026-07-21); blockers: **`@deprecated` package**.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/item-filter/src/ItemFIlter.styles.ts:10 | grey-050 #f9fafb | `FiltersList ${ItemContainer}` · background (filter-row surface) | Static | semantic | `--ds-color-background-base-subtle` | exact; overrides imported manageable-list row |
| packages/components/item-filter/src/ItemFilter.tsx:185 | grey-600 #6a7580 | `SearchM` search icon · color prop | Static (withTheme, provider-aware) | semantic | `--ds-color-icon-base-default` | exact |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

_(`box-shadow: none` at :9 = reset override on the imported row.)_

---

## item-picker

**Summary.** 🚧 partial — the **trigger is already tokenised** (`--ds-form-*` + semantic, 2026-07-20); this covers the remaining **dropdown overlay + list panel** (13 refs). Per UX 2026-07-21: overlay/footer surfaces → `dropdown` module (pending); section-header title → `list-item` module (pending); footer icon + hover states + error icon → semantic; 2 inline icon `color` props to be **dropped**. Blockers: **`dropdown`/`list-item` module tokens not yet available**. List rows delegate to `@synerise/ds-list-item` (no row refs here).

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/item-picker/src/components/ItemPickerDropdown/ItemPickerDropdown.style.ts:22 | white | legacy dropdown · overlay surface bg | Static | module (pending) | `module: dropdown` (overlay bg) | |
| packages/components/item-picker/src/components/ItemPickerDropdown/ItemPickerDropdown.style.ts:33 | grey-050 #f9fafb | legacy DropdownFooter · bg | Static | module (pending) | `module: dropdown` (footer bg) | |
| packages/components/item-picker/src/components/ItemPickerDropdown/ItemPickerDropdown.style.ts:37 | grey-100 #f3f5f6 | legacy DropdownFooter · border-top | Static | module (pending) | `module: dropdown` (footer border) | |
| packages/components/item-picker/src/components/ItemPickerList/ItemPickerList.styles.ts:68 | grey-050 #f9fafb | FooterWrapper · panel footer bg | Static | module (pending) | `module: dropdown` (footer bg) | |
| packages/components/item-picker/src/components/ItemPickerList/ItemPickerList.styles.ts:75 | grey-600 #6a7580 | FooterWrapper · footer text (default) | Static | module (pending) | `module: dropdown` (footer text) | |
| packages/components/item-picker/src/components/ItemPickerList/ItemPickerList.styles.ts:77 | grey-100 #f3f5f6 | FooterWrapper · border-top | Static | module (pending) | `module: dropdown` (footer border) | |
| packages/components/item-picker/src/components/ItemPickerList/ItemPickerList.styles.ts:63 | grey-600 #6a7580 | FooterWrapper IconWrapper · svg fill (default) | Static | semantic | `--ds-color-icon-base-default` | exact; + svg→currentColor |
| packages/components/item-picker/src/components/ItemPickerList/ItemPickerList.styles.ts:79 | blue-600 #0b68ff | FooterWrapper · text · :hover | Static | semantic | `--ds-color-text-brand-default` | exact |
| packages/components/item-picker/src/components/ItemPickerList/ItemPickerList.styles.ts:82 | blue-600 #0b68ff | FooterWrapper IconWrapper · svg fill · :hover | Static | semantic | `--ds-color-icon-brand-default` | exact; + svg→currentColor |
| packages/components/item-picker/src/components/ItemPickerList/ItemPickerList.styles.ts:144 | grey-500 #949ea6 | Title · uppercase section-header text | Static | module (pending) | `module: list-item` (section title) | |
| packages/components/item-picker/src/components/ItemPickerList/components/ErrorMessage.tsx:16 | red-600 #f52922 | `WarningL` · error-state icon fill | Static (static import) | semantic | `--ds-color-icon-danger-default` | exact; convert static import → useTheme/token |
| packages/components/item-picker/src/components/ItemPickerList/components/ListSearchInput.tsx:96 | grey-600 #6a7580 | `SearchM` · dropdown search-field icon color prop | Static | **drop** | — (inherit default) | remove the `color` prop |
| packages/components/item-picker/src/components/ItemPickerList/ItemPickerList.tsx:327 | white | `ArrowLeftM` · shortcut-hint icon on dark tooltip | Static | **drop** | — (inherit tooltip text) | ⚑ removing → inherits onsolid-subtle grey-200 (matches sibling `⌘`); minor visual shift white→grey-200 |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| packages/components/item-picker/src/components/ItemPickerList/ItemPickerList.styles.ts:63 | `IconWrapper svg { fill: grey-600 }` (default) | `IconWrapper { color: var(--ds-color-icon-base-default) }` + `svg { fill: currentColor }` |
| packages/components/item-picker/src/components/ItemPickerList/ItemPickerList.styles.ts:82 | `:hover IconWrapper svg { fill: blue-600 }` | `:hover IconWrapper { color: var(--ds-color-icon-brand-default) }` + `svg { fill: currentColor }` |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| packages/components/item-picker/src/components/ItemPickerList/components/ErrorMessage.tsx:3 | `import { theme }` → :16 `red-600` WarningL fill | convert to `useTheme()` (or drop, passing the token); tokenise → `--ds-color-icon-danger-default` |

---

## items-roll

**Summary.** 16 refs (all → semantic per UX 2026-07-21); own module namespace: none; recommended decision: **semantic**; blockers: none. One ⚑ shift (WarningIcon yellow-500→yellow-600); 7 `svg { fill }` rules → currentColor; 1 static `theme` import.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/items-roll/src/ItemsRoll.styles.ts:20 | grey-800 #384350 | HeaderLeft · text | Static | semantic | `--ds-color-text-base-default` | exact |
| packages/components/items-roll/src/ItemsRoll.styles.ts:98 | grey-800 #384350 | Bold · text | Static | semantic | `--ds-color-text-base-default` | exact |
| packages/components/items-roll/src/ItemsRoll.styles.ts:133 | grey-700 #57616d | ShowButton span · text | Static | semantic | `--ds-color-text-base-subtle` | exact |
| packages/components/items-roll/src/ItemsRoll.styles.ts:77 | grey-500 #949ea6 | group-title · uppercase section header | Static | semantic | `--ds-color-text-neutral-default` | exact |
| packages/components/items-roll/src/ItemsRoll.styles.ts:167 | grey-600 #6a7580 | NoResults · text (drives icon) | Static | semantic | `--ds-color-text-base-muted` | exact |
| packages/components/items-roll/src/ItemsRoll.styles.ts:111 | blue-600 #0b68ff | ChangeSelection button · text | Static | semantic | `--ds-color-text-brand-default` | exact |
| packages/components/items-roll/src/ItemsRoll.styles.ts:64 | grey-050 #f9fafb | list-item · background · :focus:hover | Static | semantic | `--ds-color-background-base-subtle` | exact |
| packages/components/items-roll/src/ItemsRoll.styles.ts:90 | grey-300 #dbe0e3 | group divider · border-bottom (dashed) | Static | semantic | `--ds-color-border-base-strong` | exact |
| packages/components/items-roll/src/ItemsRoll.styles.ts:45 | blue-600 #0b68ff | list-item · svg fill · :hover | Static | semantic | `--ds-color-icon-brand-default` | exact; + svg→currentColor |
| packages/components/items-roll/src/ItemsRoll.styles.ts:116 | blue-600 #0b68ff | ChangeSelection · svg fill | Static | semantic | `--ds-color-icon-brand-default` | exact; + svg→currentColor |
| packages/components/items-roll/src/ItemsRoll.styles.ts:157 | grey-600 #6a7580 | ArrowIcon · svg fill | Static | semantic | `--ds-color-icon-base-default` | exact; + svg→currentColor |
| packages/components/items-roll/src/ItemsRoll.styles.ts:181 | grey-600 #6a7580 | NoResultIconWrapper · svg fill | Static | semantic | `--ds-color-icon-base-default` | exact; + svg→currentColor |
| packages/components/items-roll/src/ItemsRoll.styles.ts:50 | red-600 #f52922 | remove-icon · svg fill `!important` · row hover | Static | semantic | `--ds-color-icon-danger-default` | exact; + svg→currentColor |
| packages/components/items-roll/src/ItemsRoll.styles.ts:53 | red-600 #f52922 | remove-icon · svg fill · :hover | Static | semantic | `--ds-color-icon-danger-default` | exact; + svg→currentColor |
| packages/components/items-roll/src/ItemsRoll.styles.ts:194 | yellow-500 #ffc300 | WarningIcon · svg fill | Static | semantic | `--ds-color-icon-warning-default` | ⚑ shift yellow-500→yellow-600 (no yellow-500 icon token); + svg→currentColor |
| packages/components/items-roll/src/ItemsRollComponents/ItemRemoveIcon.tsx:27 | red-600 #f52922 | remove icon · `color` prop | Static (static import) | semantic | `--ds-color-icon-danger-default` | exact; convert static import → useTheme/token |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| packages/components/items-roll/src/ItemsRoll.styles.ts:45 | `.items-roll-list-item :hover svg { fill: blue-600 }` | wrapper `color: var(--ds-color-icon-brand-default)` + `svg { fill: currentColor }` |
| packages/components/items-roll/src/ItemsRoll.styles.ts:50,53 | `.element-remove-icon svg { fill: red-600 !important }` (+ `:hover`) | wrapper `color: var(--ds-color-icon-danger-default)` + `svg { fill: currentColor }` |
| packages/components/items-roll/src/ItemsRoll.styles.ts:116 | `ChangeSelection .ds-icon svg { fill: blue-600 }` | wrapper `color: var(--ds-color-icon-brand-default)` + `svg { fill: currentColor }` |
| packages/components/items-roll/src/ItemsRoll.styles.ts:157 | `ArrowIcon svg { fill: grey-600 }` | wrapper `color: var(--ds-color-icon-base-default)` + `svg { fill: currentColor }` |
| packages/components/items-roll/src/ItemsRoll.styles.ts:181 | `NoResultIconWrapper .ds-icon svg { fill: grey-600 }` | wrapper `color: var(--ds-color-icon-base-default)` + `svg { fill: currentColor }` |
| packages/components/items-roll/src/ItemsRoll.styles.ts:194 | `WarningIcon svg { fill: yellow-500 }` | wrapper `color: var(--ds-color-icon-warning-default)` + `svg { fill: currentColor }` (⚑ shift) |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| packages/components/items-roll/src/ItemsRollComponents/ItemRemoveIcon.tsx:3 | `import { theme }` → :27 `red-600` remove-icon color | convert to `useTheme()` / token → `--ds-color-icon-danger-default` |

---

## layout

**Summary.** 10 tokenisable values (6 `theme.palette` + 2 hardcoded colours + 2 box-shadows); recommended decision: **semantic + `page` module for the page bg** (per UX 2026-07-21). PageContainer bg → `--ds-page-bg` (module `page`, exists); everything else semantic (incl. the two white sidebar-button icons → `--ds-color-icon-onsolid-default`). One broken CSS site (`:146`, bare `#ffffff`). The `SidebarButton` grey backgrounds hit "hover"-named tokens at their resting state (exact hex, ⚑ name-mismatch) — functionally a `button-expander` (out of layout scope). `modules.d.ts` declares `*.less` but no `.less` files exist; blockers: none.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/layout/src/Layout.styles.ts:42 | `0 4px 12px 0 rgba(35,41,54,0.04)` | LayoutSubheader · box-shadow · default | Static | tokenise | `--ds-shadows-shadow-1` | exact (geometry + colour `#2329360a`) |
| packages/components/layout/src/Layout.styles.ts:208 | `0 4px 12px 0 rgba(35,41,54,0.04)` | LayoutSidebar · box-shadow · default | Static | tokenise | `--ds-shadows-shadow-1` | exact |
| packages/components/layout/src/Layout.styles.ts:206 | `#fff` | LayoutSidebar · background-color · default | Static | tokenise | `--ds-color-background-base-default` | exact (mono-00 = #ffffff) |
| packages/components/layout/src/Layout.styles.ts:127 | `grey-500` #949ea6 | SidebarButton · background-color · default | Static | tokenise | `--ds-color-background-base-stronghover` | exact hex; ⚑ name-mismatch (a "hover" token used for default). Cleaner home = `button-expander` module (out of scope) |
| packages/components/layout/src/Layout.styles.ts:264 | `grey-600` #6a7580 | SidebarButton · background-color · :hover | Static | tokenise | `--ds-color-background-neutral-solidhover` | exact hex; ⚑ name-mismatch |
| packages/components/layout/src/Layout.styles.ts:177 | `grey-600` #6a7580 | SidebarButton · background-color · opened @ ≤medium | Static | tokenise | `--ds-color-background-neutral-solidhover` | exact hex; same caveat as :264 |
| packages/components/layout/src/Layout.styles.ts:146 | `theme.palette.white` #ffffff | SidebarButton · (no CSS property — bare value injected) · ≤medium | Static | fix (broken) | — (remove or fix) | ⚑ malformed: injects bare `#ffffff` with no property → invalid/no-op CSS; fix before tokenising |
| packages/components/layout/src/Page/Page.styles.tsx:11 | `rgb(243,245,246)` #f3f5f6 | PageContainer · background-color · default | Static | module (`page`) | `--ds-page-bg` | exact (grey-100); `page` namespace **exists** (→ background-base-muted) |
| packages/components/layout/src/Sidebar/Sidebar.tsx:86 | `theme.palette.white` #ffffff (via `useTheme()`) | ArrowIcon · `color` prop (on solid grey btn) · default | Static | semantic | `--ds-color-icon-onsolid-default` | exact (white); token exists |
| packages/components/layout/src/Sidebar/Sidebar.tsx:88 | `theme.palette.white` #ffffff (via `useTheme()`) | CloseIcon · `color` prop · default | Static | semantic | `--ds-color-icon-onsolid-default` | exact (white); token exists |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## list

**Summary.** 🔸 **DEFERRED until de-ant'd** (UX 2026-07-21). `list` is a thin passthrough over **antd `List`** (rows are caller-controlled via `renderItem`); the coloured row below is the **optional `List.Item` helper** (`static Item = TextItem`) that duplicates `ds-list-item`. Decision deferred: revisit after de-antd — likely **deprecate `List.Item` → `ds-list-item`** (remove these colours) rather than tokenise the duplicate. Blockers: **`.less`** (`src/style/index.less` + `src/style/list.mixin.less`, side-effect imported in `List.tsx`) + class `PureComponent` on antd `List`. 13 palette refs + 1 opacity; if tokenised in place they'd map to `--ds-list-item-*` (row/icon/opacity) + semantic focus ring — table kept below for reference.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/list/src/Elements/Text/Text.styles.ts:22 | `red-600` #f52922 | Wrapper `<li>` row · color · danger | Static | tokenise (list-item) | `--ds-list-item-role-delete-text-default` | exact |
| packages/components/list/src/Elements/Text/Text.styles.ts:26 | `grey-700` #57616d | Wrapper `<li>` row · color · disabled | Static | tokenise (list-item) | `--ds-list-item-role-normal-text-disabled` | exact (disabled dimming via opacity) |
| packages/components/list/src/Elements/Text/Text.styles.ts:29 | `grey-700` #57616d | Wrapper `<li>` row · color · default | Static | tokenise (list-item) | `--ds-list-item-role-normal-text-default` | exact |
| packages/components/list/src/Elements/Text/Text.styles.ts:53 | `red-600` #f52922 | IconWrapper svg · fill · default (danger) | Static | tokenise (list-item) | `--ds-list-item-role-delete-icon-default` | exact |
| packages/components/list/src/Elements/Text/Text.styles.ts:53 | `grey-600` #6a7580 | IconWrapper svg · fill · default (normal) | Static | tokenise (list-item) | `--ds-list-item-role-normal-icon-default` | exact |
| packages/components/list/src/Elements/Text/Text.styles.ts:63 | `red-600` #f52922 | IconWrapper svg · fill · hover (danger) | Static | tokenise (list-item) | `--ds-list-item-role-delete-icon-hover` | exact |
| packages/components/list/src/Elements/Text/Text.styles.ts:63 | `blue-600` #0b68ff | IconWrapper svg · fill · hover (normal) | Static | tokenise (list-item) | `--ds-list-item-role-normal-icon-hover` | exact |
| packages/components/list/src/Elements/Text/Text.styles.ts:66 | `red-600` #f52922 | Wrapper `<li>` row · color · hover (danger) | Static | tokenise (list-item) | `--ds-list-item-role-delete-text-hover` | exact |
| packages/components/list/src/Elements/Text/Text.styles.ts:66 | `blue-600` #0b68ff | Wrapper `<li>` row · color · hover (normal) | Static | tokenise (list-item) | `--ds-list-item-role-normal-text-hover` | exact |
| packages/components/list/src/Elements/Text/Text.styles.ts:67 | `red-050` #fff6f4 | Wrapper `<li>` row · background · hover (danger) | Static | tokenise (list-item) | `--ds-list-item-role-delete-bg-hover` | exact (→ background-danger-subtle) |
| packages/components/list/src/Elements/Text/Text.styles.ts:67 | `grey-050` #f9fafb | Wrapper `<li>` row · background · hover (normal) | Static | tokenise (list-item) | `--ds-list-item-role-normal-bg-hover` | exact (→ background-base-subtle) |
| packages/components/list/src/Elements/Text/Text.styles.ts:70 | `blue-600` #0b68ff | nested title `span` · color · hover | Static | tokenise (list-item) | `--ds-list-item-role-normal-text-hover` | exact |
| packages/components/list/src/Elements/Text/Text.styles.ts:76 | `blue-600` #0b68ff | Wrapper `<li>` row · box-shadow focus-ring colour · focus | Static | tokenise (semantic) | `--ds-color-border-brand-default` | exact; ring geometry `inset 0 0 0 2px` kept |
| packages/components/list/src/Elements/Text/Text.styles.ts:31 | `0.4` | Wrapper `<li>` row · opacity · disabled | Static | tokenise (list-item) | `--ds-list-item-states-disabled-opacity` | exact (→ opacity-disabled 0.4); `'1'` default branch needs no token |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| packages/components/list/src/Elements/Text/Text.styles.ts:53 | `${IconWrapper} svg { fill: ${danger ? red-600 : grey-600} }` (default) | keep branch; `fill: var(--ds-list-item-role-delete-icon-default)` (danger) / `var(--ds-list-item-role-normal-icon-default)` (normal) |
| packages/components/list/src/Elements/Text/Text.styles.ts:63 | `${IconWrapper} svg { fill: ${danger ? red-600 : blue-600} }` (hover) | keep branch; `fill: var(--ds-list-item-role-delete-icon-hover)` (danger) / `var(--ds-list-item-role-normal-icon-hover)` (normal) |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

_(Only ds-core import is `import { type ThemeProps }` at Text.styles.ts:3, used provider-aware via `props.theme.palette[…]` — not a finding.)_

---

## loader

**Summary.** 3 colour usages (1 static-tokenisable · 1 dynamic-kept · 1 decorative/unmapped); own module namespace: none; recommended decision: **semantic**; blockers: none.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/loader/src/Loader.styles.ts:48 | `grey-800` #384350 | HeaderWrapper (text header) · color · default | Static | tokenise (semantic) | `--ds-color-text-base-default` | exact; provider-aware `props.theme.palette` |
| packages/components/loader/src/Loader.styles.ts:20 | `theme.palette[\`${props.color}-600\`]` | Loader spinner · border color · default | Dynamic | keep (dynamic) — **verify** | — | driven by `color` prop (default `grey` → grey-600). ⚑ **Verify the `color` prop is actually consumed anywhere; if unused → drop the prop and tokenise the spinner border to the grey-600 default** (semantic `--ds-color-icon-base-default`). |
| packages/components/loader/src/Loader.styles.ts:21 | `transparent` (`border-top`) | Loader spinner · border-top color · default | Static | keep (decorative) | — | spinner rotation gap |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## logic

**Summary.** 13 refs; recommended decision: **module `logic/filter`** — a **new namespace (logic+filter), not in `base.json` yet → pending** (UX 2026-07-21). All themeable colours (title + underline line, matching toggle text incl. matching/not-matching state, placeholder bg/text/icon) → `logic/filter` module. The 4 dashed-underline **gap** stops (white) → **change to `transparent`** (drop colour; dark-mode fix — today they paint white gaps on any non-white surface). blockers: **`logic/filter` module tokens not yet available**; 1 static `theme` import to convert.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/logic/src/Logic.style.ts:34 | `blue-700` #0044d9 | `.ds-title` · color · hover | Static | module (pending) | `module: logic/filter` (title hover) | module value avoids blue-700→blue-600 shift |
| packages/components/logic/src/Logic.style.ts:20 | `grey-600` #6a7580 | `.ds-title::after` · dashed-underline **line** colour · default | Static | module (pending) | `module: logic/filter` (title underline) | dash line (the visible dash of the gradient) |
| packages/components/logic/src/Logic.style.ts:38 | `blue-700` #0044d9 | `.ds-title::after` · dashed-underline **line** colour · hover | Static | module (pending) | `module: logic/filter` (title underline hover) | dash line |
| packages/components/logic/src/Logic.style.ts:21 | `white` #ffffff | `.ds-title::after` · dashed-underline **gap** · default | Static | **change → `transparent`** | — (drop) | gap should show background; dark-mode fix |
| packages/components/logic/src/Logic.style.ts:39 | `white` #ffffff | `.ds-title::after` · dashed-underline **gap** · hover | Static | **change → `transparent`** | — (drop) | gap should show background |
| packages/components/logic/src/Matching/Matching.styles.ts:18 | `grey-800` #384350 | `Toggle` · color · readOnly | Static | module (pending) | `module: logic/filter` (toggle text) | |
| packages/components/logic/src/Matching/Matching.styles.ts:28 | `grey-800` #384350 | `MatchingWrapper` · color · default | Static | module (pending) | `module: logic/filter` (text) | |
| packages/components/logic/src/Matching/Matching.styles.ts:21 | `green-{600\|700}` / `red-{600\|700}` (computed) | `Toggle` · color · matching / not-matching (+hover) | Dynamic → static states | module (pending) | `module: logic/filter` (matching / not-matching text +hover) | needs matching/not-matching state tokens; replace computed lookup with conditional module vars |
| packages/components/logic/src/Matching/Matching.styles.ts:63 | `white` #ffffff | `Toggle::after` · dashed-underline **gap** · default | Static | **change → `transparent`** | — (drop) | gap; dash line = dynamic `getColor` (matching/not-matching → module) |
| packages/components/logic/src/Matching/Matching.styles.ts:84 | `white` #ffffff | `Toggle::after` · dashed-underline **gap** · hover | Static | **change → `transparent`** | — (drop) | gap |
| packages/components/logic/src/Placeholder/Placeholder.styles.ts:8 | `white` #ffffff | `PlaceholderContainer` · background-color · default | Static | module (pending) | `module: logic/filter` (placeholder bg) | |
| packages/components/logic/src/Placeholder/Placeholder.styles.ts:18 | `grey-600` #6a7580 | `span.ds-text` · color · default | Static | module (pending) | `module: logic/filter` (placeholder text) | |
| packages/components/logic/src/Placeholder/Placeholder.tsx:16 | `grey-600` #6a7580 | `ClickM` Icon · color prop · default | Static | module (pending) | `module: logic/filter` (placeholder icon) | via static `theme` import (below) → convert |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| packages/components/logic/src/Placeholder/Placeholder.tsx:3 | `import { theme } from '@synerise/ds-core'` → :16 `theme.palette['grey-600']` for Icon `color` (non-provider-aware) | Replace with `var(--ds-color-icon-base-default)`; drop the value import |
| packages/components/logic/src/Matching/Matching.styles.ts:3 | `import { type ThemeProps }` (type-only; provider-aware `props.theme.palette`) | Not a finding |

---

## manageable-list

**Summary.** 65 palette refs (65 static-tokenisable · 0 dynamic · 0 decorative) + 1 hex + 3 box-shadow + 1 rgba elevation + 3 disabled-opacity + 1 decorative gradient + 1 shadow reset; recommended decision: **semantic now → dedicated `manageable-list` module later** (UX 2026-07-21: "na start semantyka, docelowo modulowo"). The whole component tokenises to the **semantic layer now** (exact-match); the eventual target is a **new dedicated `manageable-list` module namespace** — **not** reusing `list-item`/`dropdown`. blockers: none (`manageable-list` module is a future upstream request, not a current blocker). `ItemActions.tsx` uses a static `import { theme }` (breaks dark-mode) → convert.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| ManageableList.styles.ts:40 | blue-600 | ShowMoreButton · color · hover | Static | tokenise | `--ds-color-text-brand-default` | exact |
| Item/Item.styles.ts:10 | grey-600 | ItemLabel (row primary text) · color · default | Static | tokenise (semantic) | `--ds-color-text-base-muted` | exact; → `manageable-list` module later |
| Item/Item.styles.ts:27 | grey-800 | .search-highlight · color | Static | tokenise | `--ds-color-text-base-default` | exact |
| Item/Item.styles.ts:98 | blue-050 | ItemContainer (row) · background · selected | Static | tokenise (semantic) | `--ds-color-background-brand-subtle` | exact (blue-50); → `manageable-list` module later |
| Item/Item.styles.ts:98 | white | ItemContainer (row) · background · default | Static | tokenise | `--ds-color-background-base-default` | exact (list-item bg-default is transparent) |
| Item/Item.styles.ts:103 | blue-600 | li .title · color · selected | Static | tokenise (semantic) | `--ds-color-text-brand-default` | exact; → `manageable-list` module later |
| Item/Item.styles.ts:103 | grey-600 | li .title · color · default | Static | tokenise (semantic) | `--ds-color-text-base-muted` | exact; → `manageable-list` module later |
| Item/Item.styles.ts:116,118 | blue-600 | .item-icon svg · color+fill · selected | Static | tokenise (semantic) | `--ds-color-icon-brand-default` | exact; → `manageable-list` module later |
| Item/Item.styles.ts:116,118 | grey-600 | .item-icon svg · color+fill · default | Static | tokenise (semantic) | `--ds-color-icon-base-default` | exact; → `manageable-list` module later |
| Item/Item.styles.ts:129,130 | blue-600 | .item-icon svg · color+fill · row hover | Static | tokenise (semantic) | `--ds-color-icon-brand-default` | exact; → `manageable-list` module later |
| Item/ItemMeta/ItemMeta.styles.ts:4 | grey-500 | ItemMetaCreated (date text) · color | Static | tokenise | `--ds-color-text-neutral-default` | exact |
| Item/ItemActions/ItemActions.styles.ts:15 | blue-600 | action icon · fill · hover | Static | tokenise | `--ds-color-icon-brand-default` | exact |
| Item/ItemActions/ItemActions.tsx:10 | grey-500 | edit/duplicate action icons (DEFAULT_COLOR) · color | Static | tokenise | `--ds-color-icon-base-subtle` | exact; via **static** `theme` import |
| Item/ItemActions/ItemActions.tsx:112 | red-600 | delete (✕) action icon · color | Static | tokenise | `--ds-color-icon-danger-default` | exact; via **static** `theme` import |
| Item/ContentItem/ContentItem.styles.ts:14 | grey-300 | dashed container · border · default | Static | tokenise | `--ds-color-border-base-strong` | exact |
| Item/ContentItem/ContentItem.styles.ts:17 | grey-400 | dashed container · border · hover | Static | tokenise | `--ds-color-border-base-stronghover` | exact |
| Item/ContentItem/ContentItem.styles.ts:62,63 | grey-400 | drag-handle svg · color+fill · default | Static | tokenise (semantic) | `--ds-color-icon-base-muted` | exact; → `manageable-list` module later |
| Item/ContentItem/ContentItem.styles.ts:82,83 | blue-600 | dropdown-trigger svg · color+fill · hover/open | Static | tokenise | `--ds-color-icon-brand-default` | exact |
| Item/ContentItem/ContentItem.styles.ts:130 | grey-800 | ItemLabel · color · header hover | Static | tokenise | `--ds-color-text-base-default` | exact (diverges from list-item hover=brand) |
| Item/ContentItem/ContentItem.styles.ts:137,138 | grey-600 | drag-handle svg · color+fill · hover | Static | tokenise | `--ds-color-icon-base-default` | exact |
| Item/ContentItem/ContentItem.styles.ts:150 | grey-200 | ContentWrapper · border-top (divider) | Static | tokenise | `--ds-color-border-base-default` | exact |
| Item/ContentItem/ContentItem.styles.ts:159 | `0 4px 12px rgba(35,41,54,0.04)` | container standardShadow · box-shadow (elevation) | Static | tokenise | `--ds-shadows-shadow-1` | exact |
| Item/ContentItem/ContentItem.styles.ts:160 | grey-200 | container standardShadow · box-shadow `0 0 0 1px` (ring) | Static | tokenise (ring colour) | `--ds-color-border-base-default` | exact; keep geometry |
| Item/ContentItem/ContentItem.styles.ts:185 | blue-600 | container · outline `2px solid` · selected | Static | tokenise (ring colour) | `--ds-color-border-brand-default` | exact; keep 2px |
| Item/ContentItem/ContentItem.styles.ts:190 | grey-200 | drag-overlay · box-shadow `16px 32px` (elevation) | Static | tokenise (elevation) | `--ds-shadows-shadow-2` | ⚑ shift: solid #e9edee → shadow-2 |
| Item/ContentItem/ContentItem.styles.ts:198 | blue-050 | drag placeholder · background | Static | tokenise | `--ds-color-background-brand-subtle` | exact |
| Item/ContentItem/ContentItem.styles.ts:199 | blue-300 | drag placeholder · outline `1px dashed` | Static | tokenise | `--ds-color-border-brand-strong` | exact |
| Item/ContentItem/ContentItem.styles.ts:212 | white | container · background · default | Static | tokenise | `--ds-color-background-base-default` | exact |
| Item/ContentItem/ContentItem.styles.ts:227 | grey-300 | container · box-shadow `0 0 0 1px` · hover (ring) | Static | tokenise (ring colour) | `--ds-color-border-base-strong` | exact |
| Item/BlankItem/BlankItem.styles.ts:8 | blue-600 | BlankItemActions svg · fill · hover | Static | tokenise | `--ds-color-icon-brand-default` | exact |
| Item/BlankItem/BlankItem.styles.ts:15 | grey-400 | DragHandle svg · fill · default | Static | tokenise (semantic) | `--ds-color-icon-base-muted` | exact; → `manageable-list` module later |
| Item/BlankItem/BlankItem.styles.ts:19 | grey-600 | DragHandle svg · fill · hover | Static | tokenise | `--ds-color-icon-base-default` | exact |
| Item/BlankItem/BlankItem.styles.ts:31 | blue-050 | drag placeholder · background | Static | tokenise | `--ds-color-background-brand-subtle` | exact |
| Item/BlankItem/BlankItem.styles.ts:32 | blue-300 | drag placeholder · border `1px dashed` | Static | tokenise | `--ds-color-border-brand-strong` | exact |
| Item/BlankItem/BlankItem.styles.ts:42 | grey-200 | drag-overlay · box-shadow `16px 32px` (elevation) | Static | tokenise (elevation) | `--ds-shadows-shadow-2` | ⚑ shift: solid #e9edee → shadow-2 |
| Item/BlankItem/BlankItem.styles.ts:43 | white | drag-overlay · background | Static | tokenise | `--ds-color-background-base-default` | exact |
| Item/FilterItem/FilterItem.styles.tsx:21 | green-600 | SelectFilterItem ::before (selected dot) · background | Static | tokenise | `--ds-color-background-success-solid` | exact (#54cb0b) |
| Item/FilterItem/FilterItem.styles.tsx:46,52 | red-050 / white | MenuItem · background · danger/default (+hover) | Static | tokenise (semantic) | `--ds-color-background-danger-subtle` / `--ds-color-background-base-default` | → `manageable-list` module later |
| Item/FilterItem/FilterItem.styles.tsx:47,53 | red-600 / grey-700 | MenuItem · color · danger/default (+hover) | Static | tokenise (semantic) | `--ds-color-text-danger-default` / `--ds-color-text-base-subtle` | → `manageable-list` module later |
| Item/FilterItem/FilterItem.styles.tsx:59,60 | red-600 / grey-600 | MenuItem icon svg · color+fill · danger/default | Static | tokenise (semantic) | `--ds-color-icon-danger-default` / `--ds-color-icon-base-default` | → `manageable-list` module later |
| Item/FilterItem/FilterItem.styles.tsx:77 | grey-800 | ItemHeader hover ItemLabel · color | Static | tokenise | `--ds-color-text-base-default` | exact |
| Item/FilterItem/FilterItem.tsx:71,80 | grey-600 | DropdownMenu prefixel icons (Edit/Duplicate) · color | Static | tokenise (semantic) | `--ds-color-icon-base-default` | → `manageable-list` module later; Icon `color=` (useTheme) |
| Item/FilterItem/FilterItem.tsx:123 | white | CheckS on success dot · color | Static | tokenise | `--ds-color-icon-onsolid-success` | exact |
| Item/FilterItem/FilterItem.tsx:136 | yellow-600 | Popconfirm WarningFillM icon · color | Static | tokenise | `--ds-color-icon-warning-default` | exact (#fab700) |
| Item/FilterItem/FilterItem.tsx:142 | grey-300 | CircleShapeM (unselected indicator) · color | Static | tokenise | `--ds-color-icon-base-muted` | ⚑ shift #dbe0e3 → #b5bdc3 (no icon token at grey-300) |
| Item/FilterItem/FilterItem.tsx:173 | grey-600 | OptionHorizontalM dropdown trigger · color | Static | tokenise | `--ds-color-icon-base-default` | exact |
| Item/ContentItem/ContentItemHeader.tsx:145 | grey-600 | item leading icon · color | Static | tokenise (semantic) | `--ds-color-icon-base-default` | exact; → `manageable-list` module later; Icon `color=` (useTheme) |
| Item/ContentItem/ContentItemHeader.tsx:214 | grey-600 | OptionHorizontalM dropdown trigger · color | Static | tokenise | `--ds-color-icon-base-default` | exact |
| Item/BlankItem/BlankItem.tsx:69 | grey-600 | DuplicateS action icon · color | Static | tokenise | `--ds-color-icon-base-default` | exact (ItemActions uses grey-500 for same role — inconsistent) |
| Item/BlankItem/BlankItem.tsx:84 | red-600 | CloseS delete action · color | Static | tokenise | `--ds-color-icon-danger-default` | exact |
| Item/ItemName/ItemName.tsx:102 | `#b5bdc3` (hardcoded hex) | DescriptionIcon (InfoFillS) **(i)** icon · color | Static | module (pending) | `module: form` — info-icon token (pending) | (i)-icon rule (overrides manageable-list-module target for this icon); grey-400 interim = `--ds-color-icon-base-muted` |
| Item/Item.styles.ts:93 | opacity 0.4 | ItemContainer · opacity · disabled | Static | tokenise | `--ds-opacity-disabled` | exact |
| Item/ContentItem/ContentItem.styles.ts:30 | opacity 0.4 | DraggerWrapper · opacity · disabled | Static | tokenise | `--ds-opacity-disabled` | exact |
| Item/ContentItem/ContentItem.styles.ts:217 | opacity 0.4 | ItemContainer · opacity · disabled | Static | tokenise | `--ds-opacity-disabled` | exact |
| Item/Item.styles.ts:43-47 | linear-gradient rgba(0,0,0,0)→rgba(255,255,255,1) | ItemTagList ::after · scroll-fade mask (white fade-endpoint) | Static | tokenise (semantic) | `--ds-color-background-base-default` | white endpoint → base-default; the rgba(...,0) transparent stop stays |
| Item/ContentItem/ContentItem.styles.ts:13 | `0 0 0 0 transparent` | dashedStyle · box-shadow reset | Static | keep (decorative) | — | no-op reset |

_(Paths above are relative to `packages/components/manageable-list/src/`.)_

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| Item/Item.styles.ts:117,118 | `fill: isSelected ? blue-600 : grey-600` (row icon) | `fill: var(--ds-list-item-role-normal-icon-active)` / `…-default` |
| Item/Item.styles.ts:130 | `fill: blue-600` (row icon, hover) | `fill: var(--ds-list-item-role-normal-icon-hover)` |
| Item/ItemActions/ItemActions.styles.ts:15 | `fill: blue-600` (action icon hover) | `fill: var(--ds-color-icon-brand-default)` |
| Item/ContentItem/ContentItem.styles.ts:63 | `fill: grey-400` (drag handle) | `fill: var(--ds-list-item-icon-color)` |
| Item/ContentItem/ContentItem.styles.ts:83 | `fill: blue-600` (dropdown trigger hover) | `fill: var(--ds-color-icon-brand-default)` |
| Item/ContentItem/ContentItem.styles.ts:138 | `fill: grey-600` (drag handle hover) | `fill: var(--ds-color-icon-base-default)` |
| Item/BlankItem/BlankItem.styles.ts:8 | `fill: blue-600` (action hover) | `fill: var(--ds-color-icon-brand-default)` |
| Item/BlankItem/BlankItem.styles.ts:15 | `fill: grey-400` (drag handle) | `fill: var(--ds-list-item-icon-color)` |
| Item/BlankItem/BlankItem.styles.ts:19 | `fill: grey-600` (drag handle hover) | `fill: var(--ds-color-icon-base-default)` |
| Item/FilterItem/FilterItem.styles.tsx:60 | `fill: danger ? red-600 : grey-600` (menu icon) | defer → `dropdown` module (planned) |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| Item/ItemActions/ItemActions.tsx:3 | `import { theme } from '@synerise/ds-core'` → `theme.palette['grey-500']` (:10), `['red-600']` (:112) | **Finding** — static import not provider-aware (breaks dark-mode). Migrate to `useTheme()` or CSS-var tokens |
| Item/FilterItem/FilterItem.tsx · ContentItemHeader.tsx · BlankItem.tsx | `import { useTheme }` → `const theme = useTheme()` | Not a finding — provider-aware |
| Item/ContentItem/ContentItem.styles.ts:4 | `import { type ThemeProps }` (type-only) | Not a finding |

---

## mapping

**Summary.** 3 palette refs; recommended decision (UX 2026-07-21): **border → semantic; the two (i) InfoFillS icons → dedicated `form` info-icon token (pending upstream, per the cross-cutting (i)-icon rule)**; blockers: (i) token pending. Static `theme` import (TitleRow.tsx) → convert.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/mapping/src/Mapping.styles.ts:37 | `grey-300` #dbe0e3 (`props.theme`) | `BatchSelectionWrapper` · border-bottom colour · default | Static | tokenise (semantic) | `--ds-color-border-base-strong` | exact |
| packages/components/mapping/src/components/TitleRow/TitleRow.tsx:28 | `grey-400` #b5bdc3 | left-title `InfoFillS` **(i)** icon · color prop · default | Static | module (pending) | `module: form` — info-icon token (pending) | (i)-icon rule; grey-400 interim = `--ds-color-icon-base-muted`; via static `theme` import |
| packages/components/mapping/src/components/TitleRow/TitleRow.tsx:42 | `grey-400` #b5bdc3 | right-title `InfoFillS` **(i)** icon · color prop · default | Static | module (pending) | `module: form` — info-icon token (pending) | (i)-icon rule; grey-400 interim = `--ds-color-icon-base-muted`; via static `theme` import |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| packages/components/mapping/src/components/TitleRow/TitleRow.tsx:3 | `import { theme } from '@synerise/ds-core'` → `theme.palette['grey-400']` to Icon `color` (:28, :42) | Replace both with `var(--ds-color-icon-base-muted)`, then drop the static import (`Mapping.styles.ts:37` uses provider-aware `props.theme` — leave as a normal styled candidate) |

---

## metric-card

**Summary.** 2 palette refs; recommended decision (UX 2026-07-21): **semantic**, **except** the title **(i) InfoFillS** icon → dedicated `form` info-icon token (pending, per the cross-cutting (i)-icon rule — overrides the original "everything semantic incl. (i)" note). `greyBackground` delegates the card surface to `ds-panel` (out of scope). blockers: (i) token pending.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/metric-card/src/MetricCard.styles.tsx:70 | `grey-800` #384350 (`props.theme`) | MetricValue (value text) · color · rest | Static | tokenise | `--ds-color-text-base-default` | exact |
| packages/components/metric-card/src/MetricCard.styles.tsx:96 | `grey-400` #b5bdc3 (`props.theme`) | IconWrapper (title **(i)** info icon `InfoFillS`) · color · rest | Static | module (pending) | `module: form` — info-icon token (pending) | (i)-icon rule (overrides metric-card "semantic (i)" note); grey-400 interim = `--ds-color-icon-base-muted` |
| packages/components/metric-card/src/MetricCard.styles.tsx:26 | opacity 0 | CopyIcon · opacity · rest (hidden) | Static | keep (decorative) | — | hover-reveal toggle 0↔1, not disabled/muted |
| packages/components/metric-card/src/MetricCard.styles.tsx:59 | opacity 1 | CopyIcon · opacity · hover | Static | keep (decorative) | — | hover-reveal toggle |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## operators

**Summary.** 6 palette refs; recommended decision (UX 2026-07-21): **mixed** — dropdown overlay bg → `dropdown` module (pending); uppercase section-header title → `list-item` module; search-result text + selected checkmark → semantic; the dropdown search-field icon → **drop** the `color` prop (inherit default). blockers: `dropdown` module pending. 2 static `theme` imports (one removed by the drop, one converted).

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/operators/src/Operators.style.ts:13 | `white` #ffffff | `ItemsList` div · background (dropdown overlay) · default | Static | module (pending) | `module: dropdown` (overlay bg) | prop typo `backgorund` — currently inert |
| packages/components/operators/src/Operators.style.ts:20 | `grey-500` #949ea6 | `SearchResult` span · color (non-matched text) · default | Static | tokenise | `--ds-color-text-neutral-default` | exact |
| packages/components/operators/src/Operators.style.ts:25 | `grey-700` #57616d | `SearchResultHighlight` span · color (matched text) · default | Static | tokenise | `--ds-color-text-base-subtle` | exact |
| packages/components/operators/src/Operators.style.ts:33 | `grey-500` #949ea6 | `Title` div · uppercase section-header text · default | Static | module (list-item) | `module: list-item` (section/group title) | per UX 2026-07-21 |
| packages/components/operators/src/OperatorsDropdown/OperatorsDropdown.tsx:215 | `grey-600` #6a7580 | search input left icon (`SearchM`) · Icon color prop · default | Static | **drop** | — (inherit default) | remove `color` prop → the static `theme` import becomes unused, remove it too |
| packages/components/operators/src/OperatorsDropdown/OperatorsDropdownItem.tsx:36 | `green-600` #54cb0b | selected-item checkmark (`CheckS`) · Icon color prop · selected | Static | tokenise | `--ds-color-icon-success-default` | exact; via static `theme` import |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| packages/components/operators/src/OperatorsDropdown/OperatorsDropdown.tsx:10 | `import { theme }` → :215 `theme.palette['grey-600']` | **Drop** the `color` prop (icon inherits default) → then remove the now-unused static import |
| packages/components/operators/src/OperatorsDropdown/OperatorsDropdownItem.tsx:3 | `import { theme }` → :36 `theme.palette['green-600']` | Replace with `var(--ds-color-icon-success-default)`; drop import |

---

## panel

**Summary.** 2 palette refs + 1 hardcoded box-shadow (3 static-tokenisable · 0 dynamic · 0 decorative); own module namespace: none; recommended decision: **semantic**; blockers: none.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/panel/src/Panel.styles.ts:9 | `white` #ffffff (`props.theme`) | PanelWrapper · background-color · always | Static | tokenise | `--ds-color-background-base-default` | exact |
| packages/components/panel/src/Panel.styles.ts:13 | `0 4px 12px 0 rgba(35,41,54,0.04)` | PanelWrapper · box-shadow · greyBackground=true | Static | tokenise | `--ds-shadows-shadow-1` | elevation → exact |
| packages/components/panel/src/Panel.styles.ts:15 | `grey-200` #e9edee (`props.theme`) | PanelWrapper · border (`solid 1px`) · greyBackground=false | Static | tokenise | `--ds-color-border-base-default` | exact; keep `1px solid` geometry |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## panels-resizer

**Summary.** 4 palette refs — all → **semantic** (UX 2026-07-21); blockers: none. Grip-bar default bg → `--ds-color-background-base-muted` (⚑ shift grey-200→grey-100); hover bg → `--ds-color-background-brand-subtlehover` (exact); drag-handle icon default/hover → icon-base/brand (exact).

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/panels-resizer/src/Resizer/Resizer.styles.tsx:21 | `grey-200` #e9edee | Handler (grip bar) · background-color · default | Static | tokenise (semantic) | `--ds-color-background-base-muted` | ⚑ shift grey-200 → grey-100 (lighter; per UX 2026-07-21) |
| packages/components/panels-resizer/src/Resizer/Resizer.styles.tsx:32 | `blue-100` #d9eeff | Handler · background-color · :hover | Static | tokenise (semantic) | `--ds-color-background-brand-subtlehover` | exact (blue-100) — corrects earlier "decorative" |
| packages/components/panels-resizer/src/Resizer/Resizer.styles.tsx:40 | `grey-600` #6a7580 | HandlerIcon (DragHandle svg) · fill · default | Static | tokenise | `--ds-color-icon-base-default` | exact (also see SVG section) |
| packages/components/panels-resizer/src/Resizer/Resizer.styles.tsx:52 | `blue-600` #0b68ff | HandlerIcon · color (→ currentColor fill) · :hover | Static | tokenise | `--ds-color-icon-brand-default` | exact; brand-blue active handle = real state |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| packages/components/panels-resizer/src/Resizer/Resizer.styles.tsx:40 | `svg { fill: props.theme.palette['grey-600'] }` | `svg { fill: var(--ds-color-icon-base-default) }` (keep the `isHorizontal` rotate block) |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## result

**Summary.** 9 palette refs (9 static-tokenisable · 0 dynamic · 0 decorative); own module namespace: none; recommended decision: **semantic**; blockers: none. Status-icon colours come from a `mapTypeToStatus` map (`iconColor` is never consumer-supplied → closed set); refactor the map to emit token vars. Title/subtitle colours are delegated to ds-typography.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/result/src/Result.styles.ts:40 | `white` #ffffff | `PanelContainer` textarea · background-color | Static | tokenise | `--ds-color-background-base-default` | exact |
| packages/components/result/src/Result.styles.ts:44 | `grey-300` #dbe0e3 | `PanelContainer .ant-list` · border (1px solid) | Static | tokenise | `--ds-color-border-base-strong` | exact; keep geometry |
| packages/components/result/src/Result.styles.ts:63 | `palette[props.iconColor]` | `StatusIconContainer` · color (status icon wrapper) | Static (closed set from `mapTypeToStatus`) | tokenise (map refactor) | per-type icon token (rows below) | refactor map to emit token vars; drop palette-key indexing |
| packages/components/result/src/Result.tsx:17 | `blue-600` (type `info`) | info status Icon · color | Static | tokenise | `--ds-color-icon-brand-default` | exact |
| packages/components/result/src/Result.tsx:21 | `yellow-600` (type `warning`) | warning status Icon · color | Static | tokenise | `--ds-color-icon-warning-default` | exact |
| packages/components/result/src/Result.tsx:25 | `red-600` (type `error`) | error status Icon · color | Static | tokenise | `--ds-color-icon-danger-default` | exact |
| packages/components/result/src/Result.tsx:29 | `green-600` (type `success`) | success status Icon · color | Static | tokenise | `--ds-color-icon-success-default` | exact |
| packages/components/result/src/Result.tsx:33 | `grey-600` (type `progress`) | progress status Icon · color | Static | tokenise | `--ds-color-icon-base-default` | exact |
| packages/components/result/src/Result.tsx:37 | `grey-600` (type `no-results`) | no-results status Icon · color | Static | tokenise | `--ds-color-icon-base-default` | exact |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## scrollbar

**Summary.** All → **semantic** (UX 2026-07-21). Greys → border/background base tokens; large-thumb blues → `--ds-color-background-brand-subtle`/`-subtlehover` (exact — corrected from earlier "defer"); DnD spinner blue-600 → `--ds-color-icon-brand-default`; white loading scrim → `--ds-color-background-base-default` + opacity; content-dim → `--ds-opacity-muted`. Track reveal + loader show/hide opacities → keep (decorative — animation, not state). blockers: **2 `.less` files** (`style/index.less`, `style/scrollbar.mixin.less`) — the actual thumb/track colours live in antd Less vars (styled-component colours duplicate them; de-ant'd together). ⚑ Flag: `Scrollbar` spinner (grey-600) vs `DnDScrollbar` spinner (blue-600) inconsistent — team to pick one.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/scrollbar/src/Scrollbar.tsx:51 | `grey-600` #6a7580 | loading spinner Icon · color · loading | Static (useTheme) | tokenise | `--ds-color-icon-base-default` | exact; prop not CSS rule |
| packages/components/scrollbar/src/Scrollbar.styles.tsx:29 | `grey-600` #6a7580 | `Loader svg` · color · loading | Static | tokenise | `--ds-color-icon-base-default` | see SVG table |
| packages/components/scrollbar/src/Scrollbar.styles.tsx:30 | `grey-600` #6a7580 | `Loader svg` · fill · loading | Static | tokenise (drop) | via currentColor | redundant fill |
| packages/components/scrollbar/src/Scrollbar.styles.tsx:40 | `rgba(255,255,255,0.6)` | `LoaderWrapper` · background · loading mask | Static | tokenise (semantic) | `--ds-color-background-base-default` + opacity | UX 2026-07-21: default bg colour + opacity (rework the rgba into `background: base-default` + `opacity`); 0.6 has no opacity token → literal |
| packages/components/scrollbar/src/Scrollbar.styles.tsx:24 | `opacity 1/0` | `Loader` · opacity · loading toggle | Dynamic | keep (dynamic) | — | visibility fade |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:42 | `grey-300` #dbe0e3 | `ThumbVertical` · background · default (small) | Static | tokenise | `--ds-color-border-base-strong` | exact; `background base-strong` would ⚑ #dbe0e3→#b5bdc3 |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:41 | `blue-050` | `ThumbVertical` · background · default (large) | Static | tokenise (semantic) | `--ds-color-background-brand-subtle` | exact (blue-50) — corrects earlier "defer" |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:47 | `grey-300` #dbe0e3 | `ThumbVertical` · border · default (large) | Static | tokenise | `--ds-color-border-base-strong` | exact; keep geometry |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:54 | `grey-500` #949ea6 | `ThumbVertical` · background · hover/active (small) | Static | tokenise | `--ds-color-background-base-stronghover` | exact |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:53 | `blue-100` | `ThumbVertical` · background · hover (large) | Static | tokenise (semantic) | `--ds-color-background-brand-subtlehover` | exact (blue-100) — corrects "defer" |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:57 | `grey-400` #b5bdc3 | `ThumbVertical` · border · hover (large) | Static | tokenise | `--ds-color-border-base-stronghover` | exact; keep geometry |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:32 | `opacity 0.2` | `ScrollbarWrapper > *` · opacity · loading | Static | tokenise | `--ds-opacity-muted` | exact |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:79 | `grey-300` #dbe0e3 | track `${ThumbVertical}` · background · default (small) | Static | tokenise | `--ds-color-border-base-strong` | dup of :42 |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:78 | `blue-050` | ↑ · background · default (large) | Static | tokenise (semantic) | `--ds-color-background-brand-subtle` | exact; dup of :41 |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:82 | `grey-300` #dbe0e3 | ↑ · border · default (large) | Static | tokenise | `--ds-color-border-base-strong` | dup of :47 |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:91 | `grey-500` #949ea6 | ↑ · background · hover (small) | Static | tokenise | `--ds-color-background-base-stronghover` | dup of :54 |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:90 | `blue-100` | ↑ · background · hover (large) | Static | tokenise (semantic) | `--ds-color-background-brand-subtlehover` | exact; dup of :53 |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:94 | `grey-400` #b5bdc3 | ↑ · border · hover (large) | Static | tokenise | `--ds-color-border-base-stronghover` | dup of :57 |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:101 | `opacity 0.2` | `TrackVertical` · opacity · faint track | Static | keep (decorative) | — | decorative reveal (→0.6 hover) |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:114 | `opacity 0.6` | `TrackVertical` · opacity · hover/active/focus | Static | keep (decorative) | — | reveal-on-hover |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:142 | `blue-600` | `Loader svg` · color · loading | Static | tokenise (semantic) | `--ds-color-icon-brand-default` | exact; ⚑ inconsistent with `Scrollbar.styles` spinner (grey-600 = icon-base-default) — team to pick one; see SVG table |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:143 | `blue-600` | `Loader svg` · fill · loading | Static | tokenise (drop) | via currentColor | redundant fill |
| packages/components/scrollbar/src/VirtualScrollbar/VirtualScrollbar.styles.tsx:25 | `opacity 0.2` | `ScrollbarWrapper > *` · opacity · loading | Static | tokenise | `--ds-opacity-muted` | exact |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| packages/components/scrollbar/src/Scrollbar.styles.tsx:28-31 | `svg { color: grey-600; fill: grey-600 }` | wrapper `color: var(--ds-color-icon-base-default)` + `svg { fill: currentColor }`; drop redundant fill |
| packages/components/scrollbar/src/DnDScrollbar/DnDScrollbar.styles.tsx:141-144 | `svg { color: blue-600; fill: blue-600 }` | wrapper `color` (blue accent — no token → defer) + `currentColor`; drop fill |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

_(`Scrollbar.tsx:3` uses `useTheme()` — not a finding.)_

---

## search

**Summary.** 23 `theme.palette` refs + 1 hardcoded rgba box-shadow; recommended decision (UX 2026-07-21): **mixed** — field surface/border/text/placeholder + search action icon → `form`; dropdown overlay surface/shadow → `dropdown` (pending); MenuHeader section-header → `list-item`; header (i) InfoFillS → `form` info-icon token (pending); filter chip + focus accents → semantic brand; clear ✕ → `--ds-color-icon-danger-default`; result rows delegate to ds-list-item. blockers: `dropdown` pending (CLAUDE.md lists `.less` but none exist on disk). All `opacity` occurrences are 0↔1 animation → keep (decorative).

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/search/src/Search.styles.tsx:57 | blue-600 | `Filter` chip · color · default | Static | tokenise | `--ds-color-text-brand-default` | exact; brand accent |
| packages/components/search/src/Search.styles.tsx:77 | blue-600 | `Filter svg` · fill · default | Static | tokenise | `--ds-color-icon-brand-default` | exact; see SVG table |
| packages/components/search/src/Search.styles.tsx:88 | blue-600 | `Label` · color · default | Static | tokenise | `--ds-color-text-brand-default` | exact |
| packages/components/search/src/Search.styles.tsx:106 | blue-600 | `SearchButton svg` · fill · focused&&open | Static | tokenise | `--ds-color-icon-brand-default` | exact; see SVG table |
| packages/components/search/src/Search.styles.tsx:107 | grey-600 | `SearchButton svg` · fill · default | Static | tokenise | `--ds-form-icon-color-default` | exact; see SVG table |
| packages/components/search/src/Search.styles.tsx:142 | blue-600 | `SearchInner input` · box-shadow ring · filled | Static | tokenise | `--ds-form-field-border-focus` | exact; keep `inset 0 0 0 1px` |
| packages/components/search/src/Search.styles.tsx:143 | blue-600 | `SearchInner input` · border-color · filled | Static | tokenise | `--ds-form-field-border-focus` | exact |
| packages/components/search/src/Search.styles.tsx:144 | blue-050 | `SearchInner input` · background · filled | Static | tokenise | `--ds-form-field-bg-focus` | exact |
| packages/components/search/src/Search.styles.tsx:153 | blue-600 | `SearchInner input` · box-shadow ring · :focus-within | Static | tokenise | `--ds-form-field-border-focus` | exact; keep geometry |
| packages/components/search/src/Search.styles.tsx:154 | blue-600 | `SearchInner input` · border-color · :focus-within | Static | tokenise | `--ds-form-field-border-focus` | exact |
| packages/components/search/src/Search.styles.tsx:155 | blue-050 | `SearchInner input` · background · :focus-within | Static | tokenise | `--ds-form-field-bg-focus` | exact |
| packages/components/search/src/Search.styles.tsx:174 | grey-300 | `SearchNativeInput` · border · default | Static | tokenise | `--ds-form-field-border-default` | exact |
| packages/components/search/src/Search.styles.tsx:176 | white | `SearchNativeInput` · background · default | Static | tokenise | `--ds-form-field-bg-default` | exact |
| packages/components/search/src/Search.styles.tsx:177 | grey-700 | `SearchNativeInput` · color · value text | Static | tokenise | `--ds-form-field-text-value` | exact |
| packages/components/search/src/Search.styles.tsx:186 | grey-500 | `SearchNativeInput::placeholder` · color | Static | tokenise | `--ds-form-field-text-placeholder` | exact |
| packages/components/search/src/Search.styles.tsx:190 | grey-400 | `SearchNativeInput` · border-color · :hover | Static | tokenise | `--ds-form-field-border-hover` | exact |
| packages/components/search/src/Search.styles.tsx:194 | grey-050 | `SearchNativeInput` · background · :disabled | Static | tokenise | `--ds-form-field-bg-disabled` | ⚑ shift #f9fafb → #f3f5f6 (aligns to form standard) |
| packages/components/search/src/Search.styles.tsx:195 | grey-400 | `SearchNativeInput` · color · :disabled | Static | tokenise | `--ds-form-field-text-disabled` | exact |
| packages/components/search/src/Search.styles.tsx:217 | grey-700 | `SearchInputContent.is-open input` · color · value | Static | tokenise | `--ds-form-field-text-value` | exact |
| packages/components/search/src/Search.styles.tsx:246 | white | `SearchDropdownContent` · background · results overlay | Static | defer | module: dropdown (planned) | overlay surface |
| packages/components/search/src/Search.styles.tsx:252 | rgba(35,41,54,0.1) | `SearchDropdownContent` · box-shadow · overlay | Static | defer | module: dropdown (planned) | overlay elevation |
| packages/components/search/src/Search.styles.tsx:270 | grey-500 | `MenuHeader` · color · section header | Static | module (list-item) | `module: list-item` (section/group title) | per UX 2026-07-21 (consistent with operators); grey-500 interim = `--ds-color-text-neutral-default` |
| packages/components/search/src/Search.styles.tsx:279 | grey-400 | `HeaderIconWrapper svg` · fill · header **(i)** info icon (InfoFillS, SearchHeader.tsx:19) | Static | module (pending) | `module: form` — info-icon token (pending) | (i)-icon rule (was deferred-dropdown); grey-400 interim = `--ds-color-icon-base-muted`; see SVG table |
| packages/components/search/src/Elements/SearchInput/SearchInput.tsx:236 | red-600 | clear (✕ `Close3M`) Icon · color prop | Static (static import) | tokenise | `--ds-color-icon-danger-default` | exact; resolves the static import below |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| packages/components/search/src/Search.styles.tsx:77 | `svg { fill: blue-600 }` (Filter) | wrapper `color: var(--ds-color-icon-brand-default)` + `svg { fill: currentColor }` |
| packages/components/search/src/Search.styles.tsx:104-108 | `svg { fill: focused&&open ? blue-600 : grey-600 !important }` (SearchButton) | conditional wrapper `color` (icon-brand-default vs form-icon-color-default) + `svg { fill: currentColor !important }` |
| packages/components/search/src/Search.styles.tsx:279 | `.ds-icon > svg { fill: grey-400 }` (HeaderIconWrapper, (i) info icon) | wrapper `color: var(<form info-icon token, pending>)` + `svg { fill: currentColor }` |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| packages/components/search/src/Elements/SearchInput/SearchInput.tsx:10 | `import { theme }` → :236 `color={theme.palette['red-600']}` (clear ✕) | Replace with `--ds-color-icon-danger-default`, then remove the now-unused static import |

---

## search-bar

**Summary.** 12 palette refs; recommended decision (UX 2026-07-21): **dedicated `search-bar` module** — a **new namespace, not in `base.json` yet → pending** (not reusing `form`). All colours (input bg/border/placeholder/focus underline + search/clear/prefix icons & text, incl. brand-hover and danger-clear) → `search-bar` module. blockers: **`search-bar` module tokens not yet available** (CLAUDE.md `.less` refs don't exist; no static `theme` import; colours via `props.theme`/`useTheme()`).

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/search-bar/src/SearchBar.styles.tsx:85 | grey-500 #949ea6 | PlaceholderWrapper · color · custom placeholder | Static | module (pending) | `module: search-bar` (placeholder text) | pending upstream |
| packages/components/search-bar/src/SearchBar.styles.tsx:100 | grey-050 #f9fafb | SearchBar input · background · default | Static | module (pending) | `module: search-bar` (input bg) | pending upstream |
| packages/components/search-bar/src/SearchBar.styles.tsx:105 | blue-600 #0b68ff | SearchBar input · box-shadow (inset underline) · :focus | Static | module (pending) | `module: search-bar` (focus underline) | keep geometry `inset 0 -2px 0 0` |
| packages/components/search-bar/src/SearchBar.styles.tsx:138 | grey-100 #f3f5f6 | SearchBarWrapper · border-bottom (1px) · default | Static | module (pending) | `module: search-bar` (border) | pending upstream |
| packages/components/search-bar/src/SearchBar.styles.tsx:148 | grey-400 #b5bdc3 | wrapper svg · fill · disabled | Dynamic (disabled ternary) | module (pending) | `module: search-bar` (icon disabled) | keep ternary; see SVG table |
| packages/components/search-bar/src/SearchBar.styles.tsx:160 | blue-600 #0b68ff | IconLeftWrapper svg · fill · :hover | Static | module (pending) | `module: search-bar` (search icon hover) | see SVG table |
| packages/components/search-bar/src/SearchBar.styles.tsx:165 | red-600 #f52922 | ClearInputWrapper svg · fill · :hover | Static | module (pending) | `module: search-bar` (clear icon hover) | see SVG table |
| packages/components/search-bar/src/SearchBar.styles.tsx:169 | blue-600 #0b68ff | ValuePrefixTitle · color · :hover | Static | module (pending) | `module: search-bar` (prefix text hover) | |
| packages/components/search-bar/src/SearchBar.styles.tsx:177 | blue-600 #0b68ff | IconLeftWrapper svg · fill · .is-focused | Static | module (pending) | `module: search-bar` (search icon focused) | see SVG table |
| packages/components/search-bar/src/SearchBar.styles.tsx:182 | red-600 #f52922 | ClearInputWrapper svg · fill · .is-focused | Static | module (pending) | `module: search-bar` (clear icon focused) | see SVG table |
| packages/components/search-bar/src/SearchBar.styles.tsx:186 | blue-600 #0b68ff | ValuePrefixTitle · color · .is-focused | Static | module (pending) | `module: search-bar` (prefix text focused) | |
| packages/components/search-bar/src/SearchBar.tsx:107 | grey-500 #949ea6 | clear (`Close3M`) Icon · color prop · default | Static (useTheme) | module (pending) | `module: search-bar` (clear icon default) | pending upstream |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| packages/components/search-bar/src/SearchBar.styles.tsx:147-148 | `svg { fill: disabled ? grey-400 : '' }` | wrapper `color: var(--ds-form-icon-color-disabled)` when disabled + `svg { fill: currentColor }` (keep conditional) |
| packages/components/search-bar/src/SearchBar.styles.tsx:159-160 | `:hover ${IconLeftWrapper} svg { fill: blue-600 }` | hover `IconLeftWrapper { color: var(--ds-color-icon-brand-default) }` + `currentColor` |
| packages/components/search-bar/src/SearchBar.styles.tsx:164-165 | `:hover ${ClearInputWrapper} svg { fill: red-600 }` | hover `ClearInputWrapper { color: var(--ds-color-icon-danger-default) }` + `currentColor` |
| packages/components/search-bar/src/SearchBar.styles.tsx:176-177 | `.is-focused ${IconLeftWrapper} svg { fill: blue-600 }` | `.is-focused` `IconLeftWrapper { color: var(--ds-color-icon-brand-default) }` + `currentColor` |
| packages/components/search-bar/src/SearchBar.styles.tsx:181-182 | `.is-focused ${ClearInputWrapper} svg { fill: red-600 }` | `.is-focused` `ClearInputWrapper { color: var(--ds-color-icon-danger-default) }` + `currentColor` |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

_(Uses `useTheme()` hook + `props.theme` — not static-import findings.)_

---

## short-cuts

**Summary.** 8 palette refs + 1 custom box-shadow; all → **semantic** (UX 2026-07-21). Light variant exact; dark variant: bg → `--ds-color-background-neutral-solid` (⚑ grey-600→grey-700), border → `--ds-color-border-neutral-subtle` (exact grey-500). Key-cap box-shadow has **no `shadow-N` match** → design-tokens follow-up (key-cap shadow token). 1 static `theme` import (ShortCuts.tsx:29) → convert. blockers: shadow-token gap.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/short-cuts/src/ShortCuts.style.ts:47 | grey-600 #6a7580 | key cap · background · dark | Static (variant) | tokenise | `--ds-color-background-neutral-solid` | ⚑ shift grey-600 → grey-700 (exact #6a7580 only exists as a *hover* bg token) |
| packages/components/short-cuts/src/ShortCuts.style.ts:48 | white #ffffff | key cap · background · light/default | Static (variant) | tokenise | `--ds-color-background-base-default` | exact |
| packages/components/short-cuts/src/ShortCuts.style.ts:52 | grey-500 #949ea6 | key cap · border-bottom · dark | Static (variant) | tokenise (semantic) | `--ds-color-border-neutral-subtle` | exact (grey-500) |
| packages/components/short-cuts/src/ShortCuts.style.ts:53 | grey-300 #dbe0e3 | key cap · border-bottom · light/default | Static (variant) | tokenise | `--ds-color-border-base-strong` | exact |
| packages/components/short-cuts/src/ShortCuts.style.ts:57 | white #ffffff | key cap · color (text) · dark | Static (variant) | tokenise | `--ds-color-text-onsolid-default` | exact |
| packages/components/short-cuts/src/ShortCuts.style.ts:58 | grey-600 #6a7580 | key cap · color (text) · light/default | Static (variant) | tokenise | `--ds-color-text-base-muted` | exact |
| packages/components/short-cuts/src/ShortCuts.style.ts:61-67 | `box-shadow 0 1px 8px rgba(35,41,54, 0.5/0.08)` | key cap · box-shadow · dark/light | Dynamic (opacity via variant) | keep — **missing token** | — | ⚑ no `--ds-shadows-shadow-N` match (custom `0 1px 8px` geometry + 0.5/0.08 alpha) → **design-tokens follow-up: needs a key-cap shadow token** |
| packages/components/short-cuts/src/ShortCuts.tsx:29 | white #ffffff | Icon · color · dark | Static (variant; static import) | tokenise | `--ds-color-icon-onsolid-default` | exact; see static-import table |
| packages/components/short-cuts/src/ShortCuts.tsx:29 | grey-600 #6a7580 | Icon · color · light/default | Static (variant; static import) | tokenise | `--ds-color-icon-base-default` | exact; see static-import table |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| packages/components/short-cuts/src/ShortCuts.tsx:3 | `import { theme }` → :29 `color={dark ? theme.palette.white : theme.palette['grey-600']}` | Both branches map to icon tokens (icon-onsolid-default / icon-base-default) — pass the token and remove the static import |

---

## sidebar

**Summary.** 13 colour refs (10 `theme.palette` + 3 literal `white`) + 1 box-shadow + 1 `opacity:1`; all → **semantic** (UX 2026-07-21). Base surfaces/borders → semantic; sidebar base tint → `--ds-color-background-brand-subtle`; header nav-row text + expand icons → semantic (`text-base-subtle`/`-default`, `icon-base-default`); drag-handle → `icon-base-muted`; drag-overlay → `shadow-2`. 1 opacity keep (handle always-visible); 2 static `theme` imports → convert. blockers: none.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/sidebar/src/Collapse/Collapse.styles.ts:34 | blue-050 #f4faff | CollapseRoot · background · base | Static | tokenise | `--ds-color-background-brand-subtle` | exact; sidebar base tint |
| packages/components/sidebar/src/Collapse/Collapse.styles.ts:17 | white #ffffff | headerStyle · background · default | Static | tokenise | `--ds-color-background-base-default` | exact (list-item bg-default would ⚑ to transparent) |
| packages/components/sidebar/src/Collapse/Collapse.styles.ts:14 | grey-700 #57616d | headerStyle · color (text) · default | Static | tokenise (semantic) | `--ds-color-text-base-subtle` | exact |
| packages/components/sidebar/src/Collapse/Collapse.styles.ts:22 | grey-800 #384350 | headerStyle · color (text) · hover | Static | tokenise (semantic) | `--ds-color-text-base-default` | exact (keeps the darken behaviour) |
| packages/components/sidebar/src/Collapse/Collapse.styles.ts:44 | grey-200 #e9edee | PanelItem · border-top · base | Static | tokenise | `--ds-color-border-base-default` | exact; keep geometry |
| packages/components/sidebar/src/Collapse/Collapse.styles.ts:73 | white #ffffff | PanelContent · background · base | Static | tokenise | `--ds-color-background-base-default` | exact |
| packages/components/sidebar/src/Collapse/Collapse.styles.ts:50 | `box-shadow-2` (0 16px 32px #2329361a) | PanelItem · box-shadow · $isDragOverlay | Static | tokenise | `--ds-shadows-shadow-2` | themed variable → shadow token |
| packages/components/sidebar/src/Sidebar.styles.ts:40 | grey-200 #e9edee | DragOverlayHeader · border-top · base | Static | tokenise | `--ds-color-border-base-default` | exact |
| packages/components/sidebar/src/Sidebar.styles.ts:46 | white #ffffff | DragOverlayContent · background · base | Static | tokenise | `--ds-color-background-base-default` | exact |
| packages/components/sidebar/src/Sidebar.styles.ts:7 | `opacity: 1` | SidebarHandle · opacity · default | Static | keep (decorative) | — | always-visible base state |
| packages/components/sidebar/src/Sidebar.tsx:134 | grey-600 #6a7580 | expand chevron Icon · color · default | Static (useTheme) | tokenise (semantic) | `--ds-color-icon-base-default` | exact |
| packages/components/sidebar/src/SidebarWithButton/SidebarWithButton.styles.ts:9 | grey-700 #57616d | title text · color · default | Static | tokenise | `--ds-color-text-base-subtle` | exact (not a hover row) |
| packages/components/sidebar/src/PanelContent/PanelContent.tsx:29 | grey-400 #b5bdc3 | drag-handle Icon · color · default | Static (static import) | tokenise | `--ds-color-icon-base-muted` | exact; see static-import table |
| packages/components/sidebar/src/DragOverlayPanel/DragOverlayPanel.tsx:23 | grey-400 #b5bdc3 | drag-handle Icon · color · default | Static (static import) | tokenise | `--ds-color-icon-base-muted` | exact; see static-import table |
| packages/components/sidebar/src/DragOverlayPanel/DragOverlayPanel.tsx:29 | grey-600 #6a7580 | expand chevron Icon · color · default | Static (static import) | tokenise (semantic) | `--ds-color-icon-base-default` | exact; see static-import table |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — | (icons use `<Icon color>` + currentColor; no `svg { fill }` rules) |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| packages/components/sidebar/src/PanelContent/PanelContent.tsx:3 | `import { theme }` → :29 `grey-400` drag-handle icon | tokenise (icon-base-muted) then remove the now-unused static import |
| packages/components/sidebar/src/DragOverlayPanel/DragOverlayPanel.tsx:3 | `import { theme }` → :23 grey-400, :29 grey-600 | tokenise both then remove the static import |

_(`Sidebar.tsx:12` imports `useTheme` — not a static-import finding.)_

---

## sidebar-object

**Summary.** 9 palette refs; recommended decision (UX 2026-07-21): **mixed** — footer (FooterContainer bg + border) & DropdownWrapper bg → `module: modal` (existing namespace); dashed borders + nested inline-edit bg → semantic; the folder-dropdown footer `Add3M` icon (inside a button) → **drop** the `color` prop (inherit from ds-button). blockers: none.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/sidebar-object/src/SidebarObject.style.ts:8 | grey-050 #f9fafb | `FooterContainer` · background · default | Static | module (`modal`) | `module: modal` (footer bg) | UX 2026-07-21; modal namespace exists |
| packages/components/sidebar-object/src/SidebarObject.style.ts:9 | grey-100 #f3f5f6 | `FooterContainer` · border-top (1px) · default | Static | module (`modal`) | `module: modal` (footer border) | keep geometry; modal namespace exists |
| packages/components/sidebar-object/src/Elements/Content/Content.style.ts:10 | grey-300 #dbe0e3 | `TagsWrapper` · border-top (dashed) | Static | tokenise | `--ds-color-border-base-strong` | exact; keep dashed |
| packages/components/sidebar-object/src/Elements/Content/Content.style.ts:13 | grey-300 #dbe0e3 | `InlineEditWrapper` · border-top (dashed) | Static | tokenise | `--ds-color-border-base-strong` | exact |
| packages/components/sidebar-object/src/Elements/Content/Content.style.ts:18 | white #ffffff | nested inline-edit · background · default | Static | tokenise | `--ds-color-background-base-default` | exact |
| packages/components/sidebar-object/src/Elements/ObjectSummary/ObjectSummary.style.ts:6 | grey-300 #dbe0e3 | `ContentWrapper` · border-bottom (dashed) | Static | tokenise | `--ds-color-border-base-strong` | exact |
| packages/components/sidebar-object/src/Elements/Header/Header.style.ts:8 | grey-300 #dbe0e3 | `HeaderWrapper` · border-bottom (dashed) · when `dashed` | Static | tokenise | `--ds-color-border-base-strong` | exact |
| packages/components/sidebar-object/src/Elements/Header/Header.style.ts:35 | white #ffffff | `DropdownWrapper` · background · default | Static | module (`modal`) | `module: modal` | UX 2026-07-21; modal namespace exists |
| packages/components/sidebar-object/src/Elements/Overview/Overview.tsx:89 | grey-500 #949ea6 | `Add3M` Icon (inside a button) · color prop · default | Static (useTheme) | **drop** | — (inherit from ds-button) | remove the `color` prop; icon inside a button inherits its colour |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## skeleton

**Summary.** All → dedicated **`skeleton` module** — a **new namespace, not in `base.json` yet → pending** (UX 2026-07-21). Base placeholder block bg **and** the animated shimmer (gradient stops + keyframe opacity) → `skeleton` module tokens. blockers: **`skeleton` module tokens not yet available**.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/skeleton/src/Skeleton.styles.ts:56 | grey-050 #f9fafb | `Wrapper` · background · base | Static | module (pending) | `module: skeleton` (block bg) | pending upstream |
| packages/components/skeleton/src/CheckboxSkeleton/CheckboxSkeleton.styles.ts:43 | grey-050 #f9fafb | `Wrapper` · background · base | Static | module (pending) | `module: skeleton` (block bg) | pending upstream |
| packages/components/skeleton/src/DropdownSkeleton/DropdownSkeleton.styles.ts:44 | grey-050 #f9fafb | `Wrapper` · background · base | Static | module (pending) | `module: skeleton` (block bg) | pending upstream |
| packages/components/skeleton/src/OrderedListSkeleton/OrderedListSkeleton.styles.ts:43 | grey-050 #f9fafb | `Wrapper` · background · base | Static | module (pending) | `module: skeleton` (block bg) | pending upstream |
| packages/components/skeleton/src/SkeletonAvatar/SkeletonAvatar.styles.ts:56 | grey-050 #f9fafb | `Wrapper` · background · base | Static | module (pending) | `module: skeleton` (block bg) | pending upstream |
| packages/components/skeleton/src/Skeleton.styles.ts:6 | `linear-gradient(#fcfcff, #f3f3f5, #9c9d9d)` | `SkeletonBar` · background (shimmer) · animated | Static | module (pending) | `module: skeleton` (shimmer gradient stops) | 3-stop shimmer → skeleton module tokens |
| packages/components/skeleton/src/Skeleton.styles.ts:14,18,22 (+ sub-skeletons) | `opacity 0.1/0.4/0.1` | `SkeletonBar` · opacity · shimmer keyframe | Static | module (pending) | `module: skeleton` (shimmer opacity) | keyframe fade → skeleton module |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## slider

**Summary.** 15 colour usages; all → **semantic** (UX 2026-07-21). Rail/handle/dot/tooltip → semantic border/background/text; dark value-tooltip → `--ds-color-background-overlay-solid` + `--ds-color-text-onsolid-default` (exact); mark-badge text → `text-onsolid-default`. 3 static fallbacks behind dynamic colour-map props (tokenise fallback, keep prop path); 1 fully dynamic filled track (keep). **Gap:** active focus ring `rgba(35,138,254,0.25)` has no translucent focus-ring/glow token → kept, design-tokens follow-up. blockers: focus-ring token gap.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/slider/src/Slider.styles.ts:20 | grey-200 #e9edee (fallback) | SliderLine (rail) · background · rest | Mixed | tokenise fallback | `--ds-color-border-base-default` | `lineColor` overrides when inverted (dynamic → keep) |
| packages/components/slider/src/Slider.styles.ts:172 | grey-300 #dbe0e3 | SliderLine (rail) · background · hover | Static | tokenise | `--ds-color-border-base-strong` | exact |
| packages/components/slider/src/Slider.styles.ts:107 | grey-400 #b5bdc3 | SliderHandle · background · rest | Static | tokenise | `--ds-color-background-base-strong` | exact |
| packages/components/slider/src/Slider.styles.ts:124 | blue-600 #0b68ff | SliderHandle · background · active/grabbing | Static | tokenise | `--ds-color-background-brand-solid` | exact; brand state |
| packages/components/slider/src/Slider.styles.ts:127 | rgba(35,138,254,0.25) | SliderHandle · box-shadow ring · active | Static | keep — **missing token** | — | ⚑ shift too big (blue-500 @25% → solid blue-600 loses hue + translucency) → **design-tokens follow-up: needs a translucent focus-ring/glow token** |
| packages/components/slider/src/Slider.styles.ts:134 | grey-300 #dbe0e3 | SliderHandle · background · disabled | Static | tokenise | `--ds-color-background-base-disabled` | ⚑ #dbe0e3 → #f3f5f6 (per role) |
| packages/components/slider/src/Slider.styles.ts:106 | white #ffffff | SliderHandle · border (3px ring) | Static | tokenise | `--ds-color-background-base-default` | exact |
| packages/components/slider/src/Slider.styles.ts:187 | white #ffffff | SliderDot · border (3px ring) | Static | tokenise | `--ds-color-background-base-default` | exact |
| packages/components/slider/src/Slider.styles.ts:185 | grey-200 #e9edee (fallback) | SliderDot · background · rest | Mixed | tokenise fallback | `--ds-color-border-base-default` | `$color` prop overrides → keep dynamic |
| packages/components/slider/src/Slider.styles.ts:97 | grey-800 #384350 | SliderHandleValue (tooltip) · color · inactive | Static | tokenise | `--ds-color-text-base-default` | exact |
| packages/components/slider/src/Slider.styles.ts:93 | rgba(56,67,80,0.9) | SliderHandleValue (tooltip) · background · active | Static | tokenise (semantic) | `--ds-color-background-overlay-solid` | exact — grey-800 @90%, same as ds-tooltip |
| packages/components/slider/src/Slider.styles.ts:94 | white #ffffff | SliderHandleValue (tooltip) · color · active | Static | tokenise (semantic) | `--ds-color-text-onsolid-default` | exact — white on dark tooltip |
| packages/components/slider/src/components/AllocationMarks.styles.ts:35 | grey-400 #b5bdc3 (fallback) | MarkLetter badge · background · rest | Mixed | tokenise fallback | `--ds-color-background-base-strong` | `$color` overrides → keep dynamic |
| packages/components/slider/src/components/AllocationMarks.styles.ts:32 | white (keyword) | MarkLetter badge · color · rest | Static | tokenise (semantic) | `--ds-color-text-onsolid-default` | exact — text on coloured badge |
| packages/components/slider/src/components/SliderSections.tsx:47 | `palette[tracksColorMap[index]]` | SliderSection (filled track) · background | Dynamic | keep (dynamic) | — | colour-map driven |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## sortable

**Summary.** 3 palette refs (blue-300, blue-050, white) + 1 box-shadow + 2 functional opacity; own module namespace: none; recommended decision: **semantic**; blockers: none. Only the placeholder (`:before`) and grabbed-overlay content are styled here — no row bg/border, so list-item does not apply.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/sortable/src/Sortable.styles.ts:26 | blue-300 #8bcaff | drag placeholder `&:before` · border (1px dashed) · isDragged | Static | tokenise | `--ds-color-border-brand-strong` | exact; keep geometry |
| packages/components/sortable/src/Sortable.styles.ts:27 | blue-050 #f4faff | drag placeholder `&:before` · background · isDragged | Static | tokenise | `--ds-color-background-brand-subtle` | exact |
| packages/components/sortable/src/Sortable.styles.ts:36 | white #ffffff | grabbed item content · background · isGrabbed | Static | tokenise | `--ds-color-background-base-default` | exact |
| packages/components/sortable/src/Sortable.styles.ts:37 | `0 16px 32px rgba(35,41,54,0.1)` | grabbed item content · box-shadow · isGrabbed | Static | tokenise | `--ds-shadows-shadow-2` | drag elevation |
| packages/components/sortable/src/Sortable.styles.ts:17 | `opacity: 0` | content · opacity · isDragged (w/ visibility:hidden) | Static | keep (functional) | — | hide source while dragging |
| packages/components/sortable/src/SortableItem.tsx:25 | `opacity: 1` | item wrapper inline style · opacity | Static | keep (functional) | — | default reset |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## step-card

**Summary.** 8 tokenisable refs; all → **semantic** (UX 2026-07-21; surface is a plain `div`, not ds-card). All exact: drop-label brand text, card surface + shadow-1, spinner stroke → `icon-base-subtle` (grey-500), dividers → `border-base-default`/`-subtle` (grey-200/grey-100), disabled-tag opacity → `opacity-disabled`; footer → solid `background-base-subtle` (0.6 opacity dropped, per UX). blockers: none. NB: a drag-reorderable filter/condition card, not a numbered-step indicator — no active/done/error state colours.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/step-card/src/StepCard.styles.ts:31 | blue-600 #0b68ff | DragPlaceholderContent · color (drop label via currentColor) · drag | Static | tokenise | `--ds-color-text-brand-default` | exact |
| packages/components/step-card/src/StepCard.styles.ts:44 | white #ffffff | Content · background (card surface) · all | Static | tokenise | `--ds-color-background-base-default` | exact; plain div, not card module |
| packages/components/step-card/src/StepCard.styles.ts:45 | `0 4px 12px #2329360a` | Content · box-shadow (elevation) · all | Static | tokenise | `--ds-shadows-shadow-1` | byte-identical |
| packages/components/step-card/src/StepCard.styles.ts:123 | grey-500 #949ea6 | CountDownSpinner `<g>` · stroke · pending-move | Static | tokenise (semantic) | `--ds-color-icon-base-subtle` | exact (grey-500); see SVG table |
| packages/components/step-card/src/StepCard.styles.ts:223 | grey-200 #e9edee | AdditionalFields · border-top (divider) · all | Static | tokenise | `--ds-color-border-base-default` | exact |
| packages/components/step-card/src/StepCard.styles.ts:227 | rgba(249,250,251,0.6) | Footer · background · all | Static | tokenise (semantic) | `--ds-color-background-base-subtle` | UX 2026-07-21: drop the 0.6 opacity → solid base-subtle (grey-50) |
| packages/components/step-card/src/StepCard.styles.ts:228 | grey-100 #f3f5f6 | Footer · border-top (divider) · all | Static | tokenise (semantic) | `--ds-color-border-base-subtle` | exact (grey-100) |
| packages/components/step-card/src/StepCard.styles.ts:37 | `opacity: 0.4` | DragPlaceholderTag · opacity (faded) · drag | Static | tokenise | `--ds-opacity-disabled` | 0.4 exact (intent "faded" not "disabled") |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| packages/components/step-card/src/StepCard.styles.ts:123 | `stroke: props.theme.palette['grey-500']` (CountDownSpinner `styled.g`) | `stroke: var(--ds-color-icon-base-subtle)` (exact grey-500), or `stroke: currentColor` driven by wrapper token |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## subject

**Summary.** 2 palette refs (both static greys in `SubjectList.styles.ts`); own module namespace: none; recommended decision: **semantic**; blockers: none. NB: both styled components are exported but **unused** (dead code — highlighting is done by ds-list-item's `highlight` prop).

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/subject/src/SubjectList/SubjectList.styles.ts:5 | grey-500 #949ea6 | `SearchResult` span · color · dimmed text | Static | tokenise | `--ds-color-text-neutral-default` | exact; component unused (dead code) |
| packages/components/subject/src/SubjectList/SubjectList.styles.ts:10 | grey-700 #57616d | `SearchResultHighlight` span · color · matched text | Static | tokenise | `--ds-color-text-base-subtle` | exact; component unused (dead code) |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

_(`Subject.tsx` cyan/green is a dynamic `type="custom-color"` string to ds-button — out of scope.)_

---

## subtle-form

**Summary.** 11 palette refs; all → **semantic** (UX 2026-07-21). Text/value/placeholder + edit-icon (×5) → semantic text/icon tokens (exact). The 3 translucent bg washes (`hexToRgba(base, 0.4)`) **preserve their translucency** — kept as-is because there's **no translucent/alpha surface token** (opaque semantic tokens would drop the see-through "subtle" tint). blockers: **translucent-surface token gap** (design-tokens follow-up). NB: disabled `opacity: 0.5` (:95) differs from `--ds-opacity-disabled` (0.4).

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/subtle-form/src/SubtleForm.styles.ts:125 | `hexToRgba(grey-300, 0.4)` | `Inactive` · background · :hover | Static | keep — **translucent gap** | — (base ≈ `--ds-color-background-base-muted`) | preserve translucency; no translucent surface token → design-tokens follow-up |
| packages/components/subtle-form/src/SubtleForm.styles.ts:130 | grey-600 #6a7580 | `MaskedDatePlaceholder` · color · :hover+$mask | Static | tokenise (semantic) | `--ds-color-text-base-muted` | exact |
| packages/components/subtle-form/src/SubtleForm.styles.ts:149 | grey-500 #949ea6 | `ValueArea` · text-shadow (text colour) · placeholder | Static | tokenise (semantic) | `--ds-color-text-neutral-default` | exact |
| packages/components/subtle-form/src/SubtleForm.styles.ts:150 | grey-600 #6a7580 | `ValueArea` · text-shadow (text colour) · value | Static | tokenise (semantic) | `--ds-color-text-base-muted` | exact |
| packages/components/subtle-form/src/SubtleForm.styles.ts:220 | `hexToRgba(red-100, 0.4)` | `${TextareaWrapper}:focus-within` · background · error | Static | keep — **translucent gap** | — (base ≈ `--ds-color-background-danger-subtle`) | preserve translucency; no translucent surface token → follow-up |
| packages/components/subtle-form/src/SubtleForm.styles.ts:221 | `hexToRgba(blue-100, 0.4)` | `${TextareaWrapper}:focus-within` · background · no-error | Static | keep — **translucent gap** | — (base ≈ `--ds-color-background-brand-subtle`) | preserve translucency; no translucent surface token → follow-up |
| packages/components/subtle-form/src/Elements/Input/Input.tsx:92 | grey-600 #6a7580 | edit/suffix Icon · color · inactive | Static (useTheme) | tokenise (semantic) | `--ds-color-icon-base-default` | exact |
| packages/components/subtle-form/src/Elements/DatePicker/DatePicker.tsx:139 | grey-600 #6a7580 | edit/suffix Icon · color · inactive | Static (useTheme) | tokenise (semantic) | `--ds-color-icon-base-default` | exact |
| packages/components/subtle-form/src/Elements/Field/Field.tsx:83 | grey-600 #6a7580 | edit/suffix Icon · color · inactive | Static (useTheme) | tokenise (semantic) | `--ds-color-icon-base-default` | exact |
| packages/components/subtle-form/src/Elements/TextArea/TextArea.tsx:177 | grey-600 #6a7580 | edit/suffix Icon · color · inactive | Static (useTheme) | tokenise (semantic) | `--ds-color-icon-base-default` | exact |
| packages/components/subtle-form/src/Elements/Select/Select.tsx:78 | grey-600 #6a7580 | edit/suffix Icon · color · inactive | Static (useTheme) | tokenise (semantic) | `--ds-color-icon-base-default` | exact |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## table-new

**Summary.** 69 palette refs (semantic bg/border/text/icon across header, grid, rows, sort/copy icons, pagination footer + a few no-token cases: `yellow-600` star, `blue-400` sorted border, dynamic TreeTable level colours) + 7 disabled-opacity + 2 `theme.variables` shadows; recommended decision (UX 2026-07-21): **semantic now → dedicated `table-new` module later** (rows are table rows, not list-item; the deprecated `table` module is not reused). All 69 refs tokenise to the **semantic layer now**; the eventual target is a **new dedicated `table-new` module namespace**. blockers: **WIP** (new table replacing deprecated `table`; two parallel `TableContainer` defs), **1 static `theme` import** (TreeTable.tsx), **`'gray-600'` typo** in both sort-icon files (key is `grey-600` → resolves undefined today — fix regardless). Paths below relative to `packages/components/table-new/src/`.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| Table.styles.ts:17 · BaseTable.styles.ts:55,150 · TableColumns.styles.ts:23 · TableHeader.styles.ts:11 · TableBody.styles.ts:23 | white | container/header-cell/toolbar/expanded-row · background · default | Static | tokenise | `--ds-color-background-base-default` | exact |
| TableRow.styles.ts:11,36 | `isChild ? grey-050 : white` | body row Td · background · default | Static (2 tokens) | tokenise | parent `--…-background-base-default` / child `--…-base-subtle` | exact |
| TableRow.styles.ts:16,57 | `isChild ? grey-100 : grey-050` | body row Td · background · hover | Static (2 tokens) | tokenise | parent `--…-base-defaulthover` / child `--…-base-subtlehover` | exact |
| TableBody.styles.ts:10 | grey-050 | body Tr Td · background · row hover | Static | tokenise | `--ds-color-background-base-defaulthover` | exact |
| TableColumns.styles.ts:38 | grey-050 | Th header cell · background · hover | Static | tokenise | `--ds-color-background-base-defaulthover` | exact |
| TablePagination.styles.ts:4 | grey-050 | pagination footer · background · default | Static | tokenise | `--ds-color-background-base-subtle` | exact (pagination *module* is for the control) |
| TableBody.styles.ts:28 | grey-050 | expanded-row cell · background · default | Static | tokenise | `--ds-color-background-base-subtle` | exact |
| TableBody.styles.ts:33 | grey-100 | expanded-row cell · background · tr:hover | Static | tokenise | `--ds-color-background-base-subtlehover` | exact |
| TableHeaderSelection.styles.ts:41 | grey-100 | selection wrapper · background · hover | Static | tokenise | `--ds-color-background-base-subtlehover` | exact |
| Table.styles.ts:15,45 · BaseTable.styles.ts:46 · TableBody.styles.ts:29 · TableHeader.styles.ts:17 | grey-200 | container/cell/expanded/toolbar · grid border | Static | tokenise | `--ds-color-border-base-default` | exact (grid lines) |
| TableHeader.styles.ts:63 · TableLimit.styles.ts:34 | grey-200 | title/limit vertical separator (1px) · background | Static | tokenise | `--ds-color-border-base-default` | exact (or divider module) |
| TableColumns.styles.ts:24 | grey-300 | Th cell · bottom-border · default | Static | tokenise | `--ds-color-border-base-strong` | exact |
| TableColumns.styles.ts:39 | grey-400 | Th cell · bottom-border · hover | Static | tokenise | `--ds-color-border-base-stronghover` | exact |
| TableColumns.styles.ts:40 | grey-400 | Th · box-shadow underline · hover | Static | tokenise (colour only) | `--ds-color-border-base-stronghover` | keep `inset 0 -1px 0` |
| TableColumns.styles.ts:54 · TableCell.styles.ts:33 | blue-050 | Th/Td sorted column · background · sorted | Static | tokenise | `--ds-color-background-brand-subtle` | exact |
| BaseTable.styles.ts:114,120 | blue-050 | row-highlight keyframe fallback · background | Static | tokenise | `--ds-color-background-brand-subtle` | exact |
| TableColumns.styles.ts:59 | blue-100 | Th sorted column · background · sorted+hover | Static | tokenise | `--ds-color-background-brand-subtlehover` | exact |
| TableColumns.styles.ts:55 | blue-400 | Th sorted column · bottom-border · sorted | Static | tokenise | `--ds-color-border-brand-strong` (blue-300) | ⚑ no blue-400 token → shift to blue-300 (or brand-default) |
| TableColumns.styles.ts:56 | blue-400 | Th sorted · box-shadow underline · sorted | Static | tokenise (colour only) | `--ds-color-border-brand-strong` | keep geometry; same ⚑ |
| TableColumns.styles.ts:60 | blue-600 | Th sorted column · bottom-border · sorted+hover | Static | tokenise | `--ds-color-border-brand-default` | exact |
| TableColumns.styles.ts:61 | blue-600 | Th sorted · box-shadow underline · sorted+hover | Static | tokenise (colour only) | `--ds-color-border-brand-default` | keep geometry |
| TableColumns.styles.ts:25 · TableHeader.styles.ts:38 · TableLimit.styles.ts:13 · AvatarLabel.styles.ts:61,82 · StatusLabel.styles.ts:11 | grey-700 | header/title/limit/avatar/status label · color · default | Static | tokenise | `--ds-color-text-base-subtle` | exact |
| Copyable.styles.ts:15 | grey-800 | copyable cell · color · hover | Static | tokenise | `--ds-color-text-base-default` | exact |
| LabelsWithShowMore.styles.ts:13 | grey-500 | "+N more" · color · default | Static | tokenise | `--ds-color-text-neutral-default` | exact |
| EditableCell.styles.ts:25 | `asPlaceholder ? grey-400 : inherit` | editable value · color · placeholder | Static (conditional) | tokenise | `--ds-color-text-base-disabled` | grey-400 branch; exact |
| IconTooltipCell.styles.ts:12 | grey-600 | main-icon · svg fill · default | Static | tokenise | `--ds-color-icon-base-default` | exact; see SVG table |
| StringSortIcon.tsx:16,20,23 · DefaultSortIcon.tsx:21,27,31 | `theme.palette['gray-600']` | sort icon · Icon color · asc/desc/none | Static (useTheme) | tokenise | `--ds-color-icon-base-default` | **BUG: `'gray-600'` typo** (should be `grey-600`) |
| IconTooltipCell.styles.ts:17 | grey-400 | tooltip-icon · svg fill · default | Static | tokenise | `--ds-color-icon-base-muted` | exact; see SVG table |
| Copyable.styles.ts:25,26 | grey-400 | copy icon · svg fill + color · default | Static | tokenise | `--ds-color-icon-base-muted` | exact; see SVG table |
| TreeTable.tsx:152 | `theme.palette['grey-400']` | child-row indicator icon · Icon color | Static (**static import**) | tokenise | `--ds-color-icon-base-muted` | exact; see static-import table |
| Copyable.styles.ts:30,31 | blue-600 | copy icon · svg fill + color · hover | Static | tokenise | `--ds-color-icon-brand-default` | exact; see SVG table |
| TagsGroup.tsx:25 | red-600 | error WarningFill icon · Icon color | Static (useTheme) | tokenise | `--ds-color-icon-danger-default` | exact |
| StarCell.tsx:22 | grey-300 | inactive star · Icon color | Static (useTheme) | tokenise | `--ds-color-icon-base-muted` | ⚑ no icon token @ #dbe0e3 → grey-400 |
| StarCell.tsx:20 · StarCell.styles.ts:17,23 | yellow-600 | active star · Icon color / svg fill | Static/Dynamic | keep (no token) | — | no semantic yellow icon token; see SVG table |
| StarCell.styles.ts:24 | blue-600 | star · svg fill · hover (onClick branch) | Dynamic (onClick) | tokenise (colour) | `--ds-color-icon-brand-default` | exact; see SVG table |
| TableBody.styles.ts:42 | grey-600 | expanded-row `:before` accent bar (2px) · background | Static | tokenise ⚑ | nearest `--ds-color-icon-base-default` | no bg/border token @ #6a7580 |
| TableRow.styles.ts:50 | grey-500 | child VirtualRow `:before` indent bar (2px) · background | Static | tokenise ⚑ | nearest `--ds-color-icon-base-subtle` | no bg/border token @ #949ea6 |
| TreeTable.styles.ts:43-48 | `palette[`${LEVEL_COLORS}-${hue}`]` else grey-600 | IndentBar `:before` · background · per-level | Dynamic | keep (dynamic) | — | level×hue matrix |
| BaseTable.styles.ts:52 | `variables['box-shadow-2']` | card container · box-shadow · cardStyles | Static | tokenise | `--ds-shadows-shadow-2` | already DS variable |
| BaseTable.styles.ts:155 | `variables['box-shadow-1']` | sticky column scroll · box-shadow | Static | tokenise | `--ds-shadows-shadow-1` | already DS variable |
| TableHorizontalScroll.styles.ts:22,33 | `hexToRgba(grey-500,0.12)` | left/right scroll fade · box-shadow inset | Static | keep (decorative) | — | scroll-fade overlay |
| IconLabel.styles.ts:10 · AvatarLabel.styles.ts:18 · StatusLabel.styles.ts:7 · IconTooltipCell.styles.ts:9 · TagIcon.styles.ts:10 · TagsGroup.styles.ts:20 · InputNumberCell.styles.tsx:11 | `opacity: 0.4` | cell wrapper · opacity · disabled | Static | tokenise | `--ds-opacity-disabled` | exact (×7) |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| StarCell.styles.ts:17 | `svg { fill: yellow-600 }` (active) | wrapper `color` (yellow — no token) + `fill: currentColor` |
| StarCell.styles.ts:21-24 | `&:hover svg { fill: active ? yellow-600 : onClick && blue-600 }` | wrapper `color` (yellow keep / icon-brand-default for blue) + `fill: currentColor` |
| Copyable.styles.ts:25 | `svg { fill: grey-400 }` | wrapper `color: var(--ds-color-icon-base-muted)` + `fill: currentColor` |
| Copyable.styles.ts:30 | `&:hover svg { fill: blue-600 }` | wrapper `color: var(--ds-color-icon-brand-default)` + `fill: currentColor` |
| IconTooltipCell.styles.ts:12 | `.main-icon svg { fill: grey-600 }` | `.main-icon { color: var(--ds-color-icon-base-default) } svg { fill: currentColor }` |
| IconTooltipCell.styles.ts:17 | `.tooltip-icon svg { fill: grey-400 }` | `.tooltip-icon { color: var(--ds-color-icon-base-muted) } svg { fill: currentColor }` |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| components/TreeTable/TreeTable.tsx:4 | `import { theme }` → :152 `grey-400` child-row icon | swap to `useTheme()` then tokenise to `--ds-color-icon-base-muted` |

---

## tag

**Summary.** 27 colour refs (25 palette + 2 hex `#fff`) + 3 opacity + 2 danger box-shadow rings + 3 `svg{fill}` rules; own module namespace: none; recommended decision: **mixed** (custom-colour surfaces stay dynamic; status/danger-hover/disabled tokenise to semantic); blockers: none.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/tag/src/Tag.styles.ts:19 | grey-200 #e9edee | `getColorText` JS compare (is-light-grey?) | Static | tokenise ⚑ | `--ds-color-border-base-default` | JS comparison needs a resolved hex constant, not a `var()` |
| packages/components/tag/src/Tag.styles.ts:20 | grey-600 #6a7580 | tag text (light-grey bg) / remove-icon · color | Static | tokenise | `--ds-color-text-base-muted` | also feeds Icon color (icon-base-default) |
| packages/components/tag/src/Tag.styles.ts:21 | white #ffffff | tag text (coloured bg) / remove-icon · color | Static | tokenise | `--ds-color-text-onsolid-default` | icon reuse → icon-onsolid-default |
| packages/components/tag/src/Tag.styles.ts:48 | grey-200 #e9edee | `getFilterColor` JS compare · hover | Static | tokenise ⚑ | `--ds-color-border-base-default` | JS-compare caveat |
| packages/components/tag/src/Tag.styles.ts:51 | grey-200 #e9edee | `getFilterColor` JS compare · hover | Static | tokenise ⚑ | `--ds-color-border-base-default` | JS-compare caveat |
| packages/components/tag/src/Tag.styles.ts:64 | white #ffffff | prefix/suffix badge · border-color | Static | tokenise ⚑ | `--ds-color-background-base-default` | no border-onsolid token (role shift) |
| packages/components/tag/src/Tag.styles.ts:92 | `props.color \|\| red-600` | RemoveButton `&:before` · color | Dynamic (+fallback) | keep (dynamic) | fallback `--ds-color-icon-danger-default` | user color precedes |
| packages/components/tag/src/Tag.styles.ts:105 | red-600 #f52922 | remove ✕ `.ds-icon svg` · fill · hover | Static | tokenise | `--ds-color-icon-danger-default` | see SVG table |
| packages/components/tag/src/Tag.styles.ts:257 | `props.color \|\| grey-500` | STATUS_NEUTRAL · border | Dynamic (+fallback) | keep (dynamic) | fallback neutral | grey-500 has no exact border token |
| packages/components/tag/src/Tag.styles.ts:258-260 | `textColor \|\| color \|\| grey-500` | STATUS_NEUTRAL · color | Dynamic (+fallback) | keep (dynamic) | fallback `--ds-color-text-neutral-default` | exact |
| packages/components/tag/src/Tag.styles.ts:266 | green-600 #54cb0b | STATUS_SUCCESS · border | Static | tokenise | `--ds-color-border-success-default` | exact |
| packages/components/tag/src/Tag.styles.ts:267 | green-600 #54cb0b | STATUS_SUCCESS · color (text) | Static | tokenise ⚑ | `--ds-color-text-success-default` | shift #54cb0b → #399903 (text uses green-700) |
| packages/components/tag/src/Tag.styles.ts:273 | red-600 #f52922 | STATUS_ERROR · border | Static | tokenise | `--ds-color-border-danger-default` | exact |
| packages/components/tag/src/Tag.styles.ts:274 | red-600 #f52922 | STATUS_ERROR · color (text) | Static | tokenise | `--ds-color-text-danger-default` | exact |
| packages/components/tag/src/Tag.styles.ts:280 | yellow-600 #fab700 | STATUS_WARNING · border | Static | tokenise | `--ds-color-border-warning-default` | exact |
| packages/components/tag/src/Tag.styles.ts:281 | yellow-600 #fab700 | STATUS_WARNING · color (text) | Static | tokenise ⚑ | `--ds-color-text-warning-default` | shift #fab700 → #eda600 (text uses yellow-700) |
| packages/components/tag/src/Tag.styles.ts:317 | red-600 #f52922 | Content · color · remove-hover | Static | tokenise | `--ds-color-text-danger-default` | exact |
| packages/components/tag/src/Tag.styles.ts:326 | red-600 #f52922 | PrefixWrapper badge-number · color · iconHover | Static | tokenise | `--ds-color-text-danger-default` | exact |
| packages/components/tag/src/Tag.styles.ts:327 | red-600 #f52922 | PrefixWrapper badge-number · box-shadow (1px ring) · iconHover | Static | tokenise | `--ds-color-border-danger-default` | ring, not elevation |
| packages/components/tag/src/Tag.styles.ts:330 | red-600 #f52922 | PrefixWrapper `.ds-icon svg` · fill · iconHover | Static | tokenise | `--ds-color-icon-danger-default` | see SVG table |
| packages/components/tag/src/Tag.styles.ts:341 | red-600 #f52922 | DefaultPrefixWrapper badge-number · color · iconHover | Static | tokenise | `--ds-color-text-danger-default` | exact |
| packages/components/tag/src/Tag.styles.ts:342 | red-600 #f52922 | DefaultPrefixWrapper badge-number · box-shadow (1px ring) · iconHover | Static | tokenise | `--ds-color-border-danger-default` | ring |
| packages/components/tag/src/Tag.styles.ts:345 | red-600 #f52922 | DefaultPrefixWrapper `.ds-icon svg` · fill · iconHover | Static | tokenise | `--ds-color-icon-danger-default` | see SVG table |
| packages/components/tag/src/Tag.styles.ts:371 | red-050 #fff6f4 | Tag `&&&:before` · background · iconHover | Static | tokenise | `--ds-color-background-danger-subtle` | exact |
| packages/components/tag/src/Tag.styles.ts:392 | `props.color \|\| grey-500` | Tag `&:before` · background | Dynamic (+fallback) | keep (dynamic) | fallback neutral | custom-colour surface |
| packages/components/tag/src/Tag.styles.ts:119 | `props.textColor \|\| '#fff'` | SMALL_SQUARE · color | Dynamic (+fallback) | tokenise (fallback) | `--ds-color-text-onsolid-default` | replace `#fff` literal |
| packages/components/tag/src/Tag.styles.ts:132 | `props.textColor \|\| '#fff'` | SMALL_ROUND · color | Dynamic (+fallback) | tokenise (fallback) | `--ds-color-text-onsolid-default` | replace `#fff` literal |
| packages/components/tag/src/Tag.styles.ts:89 | `opacity: 0.8` | RemoveButton · opacity | Static | keep (decorative) | — | no matching opacity token |
| packages/components/tag/src/Tag.styles.ts:94 | `opacity: 0.3` | RemoveButton `&:before` · opacity | Static | keep (decorative) | — | no matching token |
| packages/components/tag/src/Tag.styles.ts:378 | `opacity: 0.4` | Tag · opacity · disabled | Static | tokenise | `--ds-opacity-disabled` | exact |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| packages/components/tag/src/Tag.styles.ts:104-106 | `&&&:hover .ds-icon svg { fill: red-600 !important }` | wrapper `color: var(--ds-color-icon-danger-default)` + `svg { fill: currentColor }` |
| packages/components/tag/src/Tag.styles.ts:329-331 | `.ds-icon svg { fill: red-600 }` (PrefixWrapper, iconHover) | wrapper `color` + `fill: currentColor`, or `fill: var(--ds-color-icon-danger-default)` |
| packages/components/tag/src/Tag.styles.ts:344-346 | `.ds-icon svg { fill: red-600 }` (DefaultPrefixWrapper, iconHover) | as above |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

_(`Tag.styles.ts:3` imports only types; `Tag.tsx:3` uses `useTheme()` — not findings.)_

---

## tags

**Summary.** 7 palette refs + 1 rgba (5 static → tokenise, 2 chip color/textColor props delegated to ds-tag → keep, 1 transparent gap → keep); own module namespace: none; recommended decision: **mixed** (semantic text/icon/border + `form` icon for the search-bar; two chip colours stay dynamic via ds-tag); blockers: none.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/tags/src/Tags.styles.ts:33 | grey-800 #384350 | `Title` · color · default | Static | tokenise | `--ds-color-text-base-default` | exact |
| packages/components/tags/src/components/AddTags/AddTags.tsx:131 | grey-500 #949ea6 | create-tag `Add3M` icon · color · default | Static | tokenise | `--ds-color-icon-base-subtle` | exact |
| packages/components/tags/src/components/AddTags/AddTags.tsx:154 | grey-600 #6a7580 | search-bar left `SearchM` icon · color · default | Static | tokenise | `--ds-form-icon-color-default` | exact; semantic fallback icon-base-default |
| packages/components/tags/src/components/AddTags/AddTags.tsx:172 | grey-500 #949ea6 | `AddTagButton` `Add3M` icon · color · default | Static | tokenise | `--ds-color-icon-base-subtle` | exact |
| packages/components/tags/src/components/AddTags/AddTags.styles.ts:50 | grey-300 #dbe0e3 | `Separator` dashed line · background-image colour | Static | tokenise | `--ds-color-border-base-strong` | exact; divider module `--ds-divider-line-color-dashed` would ⚑ to grey-400 |
| packages/components/tags/src/components/AddTags/AddTags.styles.ts:51 | rgba(255,255,255,0) | `Separator` gradient gap | Static | keep (decorative) | — (use `transparent`) | dash spacing |
| packages/components/tags/src/components/LimitedTags/LimitedTags.tsx:46 | grey-100 #f3f5f6 | "+N" overflow pill · ds-tag `color` prop | Dynamic | keep (dynamic) | delegated to ds-tag | runtime colour math |
| packages/components/tags/src/components/LimitedTags/LimitedTags.tsx:47 | grey-700 #57616d | "+N" overflow pill · ds-tag `textColor` prop | Dynamic | keep (dynamic) | delegated to ds-tag | owned by ds-tag |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

_(Uses `useTheme()` + `props.theme` — not findings.)_

---

## toolbar

**Summary.** 4 palette refs; decision (UX 2026-07-21): **semantic** — all exact (divider border, label text, group surface, shadow-1). blockers: none.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/toolbar/src/Toolbar.styles.ts:12 | grey-200 #e9edee | ToolbarDivider · background (1px divider) · default | Static | tokenise | `--ds-color-border-base-default` | exact |
| packages/components/toolbar/src/Toolbar.styles.ts:20 | grey-600 #6a7580 | ToolbarLabel · color (text) · default | Static | tokenise | `--ds-color-text-base-muted` | exact |
| packages/components/toolbar/src/Toolbar.styles.ts:26 | white #ffffff | ToolbarGroup · background (surface) · default | Static | tokenise | `--ds-color-background-base-default` | exact |
| packages/components/toolbar/src/Toolbar.styles.ts:30 | `0 4px 12px #2329360a` | ToolbarGroup · box-shadow · default | Static | tokenise | `--ds-shadows-shadow-1` | exact |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## tooltip

**Summary.** 7 colour/shadow refs + 2 decorative opacities; decision (UX 2026-07-21): **dedicated `tooltip` module** — new namespace, **pending upstream** (not in base.json). All → `tooltip` module incl. **both shadows** (the wrapper elevation and the key-cap shadow that had no semantic match). Fade opacities kept (animation). blockers: **`tooltip` module tokens not yet available**. NB: the arrow is rendered by ds-popover (out of scope here).

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/tooltip/src/Tooltip.styles.tsx:119 | rgba(56,67,80,0.9) | `TooltipComponent` · background · default | Static | module (pending) | `module: tooltip` (surface bg) | grey-800 @90% dark surface |
| packages/components/tooltip/src/Tooltip.styles.tsx:68 | rgba(56,67,80,0.9) | `TooltipButton` · background (footer bar) | Static | module (pending) | `module: tooltip` (footer/button bg) | |
| packages/components/tooltip/src/Tooltip.styles.tsx:123 | grey-200 #e9edee | `TooltipComponent` · color (body text on dark) | Static | module (pending) | `module: tooltip` (text) | |
| packages/components/tooltip/src/Tooltip.styles.tsx:59 | grey-700 #57616d | `TooltipKey` · background (key-cap) | Static | module (pending) | `module: tooltip` (key-cap bg) | |
| packages/components/tooltip/src/Tooltip.styles.tsx:60 | grey-500 #949ea6 | `TooltipKey` · border-bottom · default | Static | module (pending) | `module: tooltip` (key-cap border) | |
| packages/components/tooltip/src/Tooltip.styles.tsx:104 | `box-shadow-2` | `TooltipWrapper` · box-shadow | Static | module (pending) | `module: tooltip` (shadow) | |
| packages/components/tooltip/src/Tooltip.styles.tsx:61 | `0 1px 8px rgba(35,41,54,0.5)` | `TooltipKey` · box-shadow (key-cap) | Static | module (pending) | `module: tooltip` (key-cap shadow) | resolves the no-shadow-token gap |
| packages/components/tooltip/src/Tooltip.utils.ts:9,12 | `opacity 1/0` | fade open/initial | Dynamic | keep (decorative) | — | popover fade transition |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## tray

**Summary.** 5 colour/elevation refs; decision (UX 2026-07-21): **module `modal`** (existing namespace) — the tray is a floating overlay panel (surface + header + footer + elevation), all reusing the modal module. blockers: none (modal namespace exists).

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/tray/src/Tray.styles.ts:36 | white #ffffff | TrayWrapper · background (panel surface) · default | Static | module (`modal`) | `module: modal` (container surface) | UX 2026-07-21; modal namespace exists |
| packages/components/tray/src/Tray.styles.ts:30 | `box-shadow-2` (0 16px 32px #2329361a) | TrayWrapper · box-shadow (overlay elevation) · default | Static | module (`modal`) | `module: modal` (container shadow) | |
| packages/components/tray/src/Tray.styles.ts:44 | grey-200 #e9edee | TrayHeader · border-bottom · default | Static | module (`modal`) | `module: modal` (header border) | |
| packages/components/tray/src/Tray.styles.ts:57 | grey-100 #f3f5f6 | TrayFooter · border-top · default | Static | module (`modal`) | `module: modal` (footer border) | |
| packages/components/tray/src/Tray.styles.ts:58 | grey-050 #f9fafb | TrayFooter · background · default | Static | module (`modal`) | `module: modal` (footer bg) | |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## typography

**Summary.** 8 palette refs + 1 opacity (0.4 disabled); decision (UX 2026-07-21): **semantic** text tokens (all exact) — reuse semantic text/opacity tokens. One **accepted ⚑ shift**: link `:hover` blue-500 → `--ds-color-text-brand-hover` (blue-700, darker) — flagged for Chromatic. All via `props.theme.palette`. blockers: none.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/typography/src/CommonElements.ts:31 | grey-800 #384350 | `Label` · color · default | Static | tokenise | `--ds-color-text-base-default` | exact |
| packages/components/typography/src/CommonElements.ts:21 | grey-600 #6a7580 | `Description` · color · default | Static | tokenise | `--ds-color-text-base-muted` | exact |
| packages/components/typography/src/CommonElements.ts:26 | red-600 #f52922 | `ErrorText` · color · default | Static | tokenise | `--ds-color-text-danger-default` | exact |
| packages/components/typography/src/CommonElements.ts:22 | `opacity: 0.4` | `Description` · opacity · disabled | Static | tokenise | `--ds-opacity-disabled` | exact |
| packages/components/typography/src/style/macro-utils.ts:5 | grey-800 #384350 | `heading` mixin (all Title levels) · color · default | Static | tokenise | `--ds-color-text-base-default` | exact |
| packages/components/typography/src/style/macro-utils.ts:84 | blue-600 #0b68ff | `link` macro · color · default | Static | tokenise | `--ds-color-text-brand-default` | exact |
| packages/components/typography/src/style/macro-utils.ts:87 | blue-500 #238afe | `link` macro · color · :hover | Static | tokenise ⚑ | `--ds-color-text-brand-hover` | ⚑ **accepted shift (UX 2026-07-21)**: blue-500 → blue-700 (darker hover) — flag for Chromatic |
| packages/components/typography/src/style/macro-utils.ts:93 | grey-600 #6a7580 | `linkbutton` macro · color · default | Static | tokenise | `--ds-color-text-base-muted` | exact |
| packages/components/typography/src/style/macro-utils.ts:95 | grey-800 #384350 | `linkbutton` macro · color · :hover | Static | tokenise | `--ds-color-text-base-default` | exact |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

_(Form-scoped alts exist for Label/Description/ErrorText — `--ds-form-{label,description,error}-text-*` — but typography is generic → use the semantic layer.)_

---

## unordered-list

**Summary.** 1 palette ref (grey-800 on `Label` text); decision (UX 2026-07-21): **semantic** → `--ds-color-text-base-default` (exact). blockers: none. NB: `Label` is exported but unused (the section label renders via ds-form-field's `FormFieldLabel`).

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/unordered-list/src/Unordered-list.styles.ts:23 | grey-800 #384350 | `Label` · color · default | Static | tokenise | `--ds-color-text-base-default` | exact; `Label` currently unused |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |

---

## wizard

**Summary.** 6 palette refs (3× white surfaces, 3× grey-200 divider/border); decision (UX 2026-07-21): **semantic** — all exact (surfaces → `background-base-default`, dividers/border → `border-base-default`). blockers: none. NB: step-indicator states aren't styled here — the wizard consumes a passed-in ds-stepper node; only surface/border tokens apply.

### Palette / colour usage
| file:line | Current value | Applied to (element · property · state) | Static / Dynamic | Decision | Suggested token or module | Notes |
|---|---|---|---|---|---|---|
| packages/components/wizard/src/Wizard.styles.ts:10 | white #ffffff | WizardWrapper (overlay) · background · idle | Static | tokenise | `--ds-color-background-base-default` | exact |
| packages/components/wizard/src/Wizard.styles.ts:29 | grey-200 #e9edee | WizardHeader `:after` (divider) · background · idle | Static | tokenise | `--ds-color-border-base-default` | exact; 1px pseudo-element → border layer |
| packages/components/wizard/src/Wizard.styles.ts:47 | white #ffffff | WizardContainer (content) · background · idle | Static | tokenise | `--ds-color-background-base-default` | exact |
| packages/components/wizard/src/Wizard.styles.ts:130 | white #ffffff | WizardFooter · background · idle | Static | tokenise | `--ds-color-background-base-default` | exact |
| packages/components/wizard/src/Wizard.styles.ts:131 | grey-200 #e9edee | WizardFooter · border-top (1px) · idle | Static | tokenise | `--ds-color-border-base-default` | exact |
| packages/components/wizard/src/Wizard.styles.ts:160 | grey-200 #e9edee | HeaderActions `:after` (divider) · background · idle | Static | tokenise | `--ds-color-border-base-default` | exact; 1px pseudo-element → border layer |

### SVG fill/stroke rules to replace
| file:line | Current rule | Replacement |
|---|---|---|
| — none — |  |  |

### Static `theme` imports
| file:line | Usage | Resolution |
|---|---|---|
| — none — |  |  |
