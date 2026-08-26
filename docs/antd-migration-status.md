# antd Migration Status

Living tracker for removing `antd` from `@synerise/ds-*`. See `docs/adr/0001-remove-antd-dependency.md`
for the decision and rationale.

**Status legend:** ⬜ Not started · 🟦 Branch created · 🟨 In progress · ⏸️ Blocked (waiting on another branch/merge) · 🧪 Code-complete, in QA (branch not yet merged) · ✅ Done (antd-free, merged to master) · 🗑️ Deprecate (no reimplementation) · ⏭️ Out of scope

**Audit date:** 2026-06-08 · scope: `packages/components/*/src` · `ds-table` excluded.
**Last updated:** 2026-08-26 · Tiers 1, 2, 2.5 and Tier 3 (`drawer`, `list`, `select`) are merged to master. `core` is done (STOR-2341, MR 1 = JS, MR 2 = CSS) and Tier 0 + the stale peerDeps are cleared (STOR-2342). The initiative is complete apart from `menu`, `alert` and `table` — all three are now deprecated, keep antd until they are deleted, and no DS package imports any of them any more (MRs !3790, !3905, !3920). The `design-system` umbrella no longer ships `ds-menu` / `ds-alert` / `ds-table` and no longer declares an `antd` peerDep (**breaking — `@synerise/design-system` 2.0.0**); `antd` is now declared **only** by those three packages and by the repo root.

**Playbook:** use the **`deantd-component`** skill (`.claude/skills/deantd-component/`) for the
per-component process (API audit → DS-native reimplementation → verify → consumer migration → MR).

## Jira

Epic **[STOR-2321]** — _Remove Ant Design (antd) dependency from the design system_ (project `STOR`,
label `antd-removal`). One task per component; reference it in the MR description (`Resolves task: STOR-XXXX`).

| Component | Jira | Component | Jira |
|---|---|---|---|
| avatar | STOR-2322 | list | STOR-2331 |
| badge | STOR-2323 | checkbox | STOR-2332 |
| switch | STOR-2324 | radio | STOR-2333 |
| typography | STOR-2325 | input-number | STOR-2334 |
| pagination | STOR-2326 | drawer | STOR-2335 |
| alert | STOR-2327 | menu | STOR-2336 |
| banner | STOR-2328 | search | STOR-2337 |
| popconfirm | STOR-2329 | autocomplete | STOR-2338 |
| sidebar | STOR-2330 | select | STOR-2339 |
| input | STOR-2340 | core | STOR-2341 |
| type-only (Tier 0) | STOR-2342 | | |

---

## Tier 1 — standalone leaf components (first wave)

All four render a real antd component and style it via antd CSS classes; avatar/badge/switch also
import antd's component LESS. None are thin re-exports.

| Component | antd surface | Breaking? | Branch | Status |
|---|---|---|---|---|
| `avatar` | `Avatar` + `AvatarProps` type; styles target `.ant-avatar-*`; imports `antd/lib/avatar/style` LESS | No (antd usage is internal) | `refactor/deantd-avatar` | ✅ merged (MR !3729) |
| `badge` | `Badge` + `BadgeProps` type; styles target `.ant-badge-*`/`.ant-scroll-number-*`; imports `antd/lib/badge/style` LESS | No (internal) | `refactor/deantd-badge` | ✅ merged (MR !3725) |
| `switch` | `Switch`; `RawSwitch = antd Switch` is a **public export**; styles target `.ant-switch`; imports `antd/lib/switch/style` LESS | **Yes** — `RawSwitch` used by `column-manager`, `field-set`, bridge `automations` | `refactor/deantd-switch` | ✅ merged (MR !3728) |
| `typography` | **default export = antd `Typography`** (used with `copyable`/`Typography.Title`); `TitleProps` type from `antd/es/typography/Title`. DS `Title`/`Text`/`Paragraph` are already pure styled-components | **Yes** — default export consumed in `sidebar-object` + 30+ bridge files | `refactor/deantd-typography` | ✅ merged (MR !3726) |

> Note: `avatar`, `badge`, `switch` all depend on `ds-typography` (`macro`/`FormFieldLabel`), but only
> via styled-components helpers — not the antd default export. Migrating `typography`'s named exports
> does not block them; replacing its antd **default export** is the breaking piece.

## Tier 2 — medium runtime components — ✅ released to master

> **Released.** All Tier 2 components below are merged and antd-free on `master`.
> `@synerise/ds-carousel` (MR !3751) shipped as the shared primitive replacing antd `Carousel` for
> both banner and popconfirm; its API also covers the multi-slide puib `CardWithSlider` usage.
> **Decisions carried forward:** `alert` stays **excluded** (deprecated — keep antd until the package
> is deleted); `input-number` was **pulled out of the deferral** and completed in **Tier 2.5** (below);
> `list` remains **deferred** and is now tracked under **Tier 3** (its `radio` blocker has merged).

| Component | antd surface | Breaking? | Status |
|---|---|---|---|
| `ds-carousel` (new) | — (replaces antd `Carousel`) | No | ✅ merged (MR !3751) |
| `pagination` | `Pagination` + `PaginationProps` | DS-native, emits `ds-pagination-*` only (no `ant-` hooks). `ds-table` (excluded — still renders antd's own `Pagination`) now owns its `.ant-pagination-*` styling via a local `style/pagination.less` instead of borrowing ds-pagination's deleted LESS; `ds-table-new` `PaginationProps` type repointed to ds-pagination (**closes that Tier 0 item**) | ✅ merged (MR !3755) |
| `alert` | `Alert` + `AlertProps` | No | ⏭️ excluded (deprecated; keep antd until deleted). **No DS package imports it any more** — the nine internal call sites all reached antd-free components (`Alert.InlineAlert`, `IconAlert`, the local `InlineAlert`) through an antd-backed namespace, and now use `@synerise/ds-inline-alert` directly, matching what `ds-table-new` already did. `Alert.stories.tsx` deleted with them; only `ds-mocks`' mock target and the `design-system` umbrella dep still name the package. It can now be deleted without touching a consumer. |
| `banner` | `Carousel` + `CarouselRef` → ds-carousel | No | ✅ merged (MR !3753) |
| `popconfirm` | `Carousel` (image carousel in body) → ds-carousel | No | ✅ merged (MR !3752) |
| `sidebar` | `Collapse` + `CollapseProps` | No | ✅ merged (MR !3754) |
| `checkbox` | `Checkbox` + `CheckboxChangeEvent`; `Checkbox.Group` → DS context (also drops `checkbox-tristate`'s antd peerDep) | No | ✅ merged (MR !3756) |
| `radio` | `Radio` + `Radio.Group` + `Radio.Button` → DS (context); own `RadioGroupProps` (list/format-picker consumers fixed in-repo) | No | ✅ merged (MR !3757) |

## Tier 2.5 — input family (autosize) — 🧪 in QA

Bundled on **`feature/deantd-input-autosize`** (built on the input-autosize refactor, 62 commits).
Removes antd from the text-input family and, in doing so, closes the input-typed Tier 0 items.
**Code-complete; currently in QA integration testing — not yet merged to master.**

| Component | antd surface removed | Breaking? | Status |
|---|---|---|---|
| `input` | `Input` + `TextArea` (+ antd input LESS, `InputProps` type, peerDep); legacy children-based autosize API replaced by `useAutosizeWidth`/`useStretchToFit` | **Yes** — antd input LESS is no longer bundled; downstream packages that leaned on `.ant-input-*` must own their styling | 🧪 in QA |
| `input-number` | `InputNumber` + `InputNumberProps<number>` → from-scratch numeric input (`role="spinbutton"`, min/max/step/precision, blur re-align to range, `.ds-*` class hooks) | No | 🧪 in QA (was Tier 2 "deferred") |
| `autocomplete` | `AutoComplete` + `RefSelectProps` → native DS combobox (input + dropdown, client-side `filterOption`) | No | 🧪 in QA (was Tier 3) |
| `search` | antd `Input` + `InputRef` + antd input LESS → native styled input (`SearchInput` with a `ds-search-input` hook; base input chrome reproduced in `Search.styles`; `inputProps` → `React.InputHTMLAttributes`; antd input LESS + mixin deleted; ds-items-roll consumer spec updated) | **Yes** — `SearchInput` no longer accepts antd-only input props (e.g. `onPressEnter`); consumers use native handlers | 🧪 in QA (MR !3778, was Tier 3) |

**Tier 0 items closed by this branch:** `factors` (`RefSelectProps`), `form` (`InputProps`),
`subtle-form` (`InputProps`) are now antd-free. Consumers fixed in-branch: `color-picker`,
`date-range-picker`, `inline-edit`, `search-bar`.

> `search` (MR !3778) was **folded into this family** — its `SearchInput` now uses the native
> `ds-input` instead of antd's `Input`, so it rides Tier 2.5 into master rather than waiting as a
> separate Tier 3 item.

## Tier 3 — complex / foundational

_**Priority (updated 2026-08-17):** `menu` deprecated (MR !3773) and all DS-internal consumers
migrated off it (MR !3790). `drawer` (MR !3774) + `list`
(MR !3775) ported to **master**. `search` **moved into the Tier 2.5 input family** (MR !3778 →
`feature/deantd-input-autosize`) — see the Tier 2.5 table above; it needed the native `ds-input`.
`select` is being built **on master** directly — its foundation (`ds-dropdown`/floating-ui) is already
on master and it folds in `fix/select-transient-props`; **increment 1 (single-select) done**,
multiple/tags/search + LESS deletion + `.ant-select-*`→`.ds-select-*` consumer migration to follow.
`core` removed **last**._

| Component | antd surface | Notes | Status |
|---|---|---|---|
| `drawer` | `Drawer` | **Ported (pending MR).** DS-native on `createPortal` + `useFocusTrap` (ds-utils) — modeled on ds-modal: `open`/`visible` both accepted, mask + slide animation (transform per placement), focus-trap only in mask mode, `maskClosable`/`keyboard`(Esc)/`destroyOnClose`/`afterVisibleChange`/`getContainer` (incl. `false`=inline no-portal mode), 6 styled statics kept, `.ant-drawer*`+`.ds-drawer*` class hooks retained (consumers target `.ant-drawer` for z-index). Dropped: `push`/non-right-nothing (only `right` used), `title`/`closable` swallowed as before. antd LESS deleted (no consumer `@import`s it). types+8 tests+build green. | 🧪 ported (branch, pending MR) |
| `list` | `List` + `RadioGroupProps` | **Ported (pending MR).** DS-native list reproducing antd's DOM + `.ant-list*`/`.ds-list*` class hooks (`.ant-list-items` ul, `.ant-list-header`, `.ant-list-empty-text`, `.ant-list-split`, `.ant-list-bordered`) — the ~19 consumer stylesheets targeting those keep working. Kept: `renderItem` (flattened item + index), flat/nested `T[][]`→multi-list+`ListDivider`, `header`/`bordered`/`split`/`locale.emptyText`/`itemLayout`/`size`/`loadMore`/`rowKey`, DS `radio`/`options`/`dashed`, statics `List.Item`/`ItemWrapper`/`Divider`. **Dropped (0 real usage):** `grid`, `pagination`, `List.Item.Meta`. `loading` → ds-loader. Sub-components were already antd-free; only `List.tsx` changed. Deleted antd LESS + stray `.ant-dropdown-menu-items` mixin rule (flag in MR). types+7 tests+build green. | 🧪 ported (branch, pending MR) |
| `select` | `Select` + `SelectProps`/`SelectValue` + `Select.Option` | **In progress on master (increment 1 done).** DS-native on `ds-dropdown`/floating-ui + `ds-list-item` + `ds-form-field` (`ds-select-*` hooks only; folds in `fix/select-transient-props`). Increment 1 = single-select (types + `Option`/`getOptionsFromChildren` + selector + option-list dropdown + `value`/`onChange`/`allowClear`/`size`/`prefixel`/`suffixel`/`getPopupContainer`/`dropdownMatchSelectWidth`/`loading`/`dropdownRender`); **increment 2 TODO:** multiple chip selector, tags free-text, in-selector `showSearch` + remote `onSearch`, keyboard/ARIA, delete antd LESS, migrate `.ant-select-*` consumers → `.ds-select-*`, drop antd peerDep. **Heaviest Tier 3 item — effectively a from-scratch `rc-select` reimplementation.** Usage audit (2026-07-06): ~217 files in **puib** use the near-complete antd surface — `mode="multiple"` (~10) **and** `mode="tags"` (4, `tokenSeparators`/`maxTagCount`), `showSearch` (22) + custom `filterOption` (14) + remote `onSearch`/`filterOption={false}` (~9), `dropdownRender` (15), `optionLabelProp` (9), `loading` (24), `dropdownMatchSelectWidth` (10), `getPopupContainer` (31), plus **~480 `<Select.Option>` children across 171 files** and 18 files importing `SelectValue` from `antd/lib/select`. DS-internal (~10 sites: pagination, date-range-picker, factors, completed-within, subtle-form) + portal-next (~10) are simple single-selects, but **6 DS packages style Select via `.ant-select-*` internals** (autocomplete + input heaviest — both shed this in Tier 2.5; `table`/`factors`/`subtle-form`/`completed-within` remain) and `table` `@import`s select's LESS. **Droppable (0 real usage):** `OptGroup`, `labelInValue`, `fieldNames`, `virtual`, `notFoundContent` (apps). Everything else must be reproduced. | 🟨 in progress (increment 1) |
| `menu` | `Menu` + `MenuProps` | **Deprecate only — do NOT reimplement.** Deprecation markers applied (MR !3773): `@deprecated` JSDoc on `Menu` + `AntdMenuProps`, `deprecated` field in `package.json`, `deprecated` Storybook tag + note → all point to `@synerise/ds-list-item` (`ListItem` / `ListWrapper`). **Every DS-internal consumer is now migrated off it (MR !3790)** — `sidebar`/`information-card` render `ListWrapper`+`ListItem`, `search` dropped the deprecated `renderInMenu` branch, three dead `styled(Menu)` exports (`table` `SelectionMenu`, `tabs` `DropdownMenu`, `column-manager` `FixedMenu`) deleted, four stale manifest deps removed, Menu stories deleted, and the leftover dead `.ant-menu-*` CSS in `items-roll`/`cascader`/`list-item` swept. The `ds-mocks` Menu mock is kept (deprecated) for downstream repos. The package stays **published + deprecated**; deleting it is gated on external consumers — portal-ui-bridge (12 files, epic CFM-904) and universal-list (2 story files). | 🧪 internal consumers migrated (MR !3790) |
| `core` | `ConfigProvider` + 5 antd `locale/*` imports (JS) · `~antd/lib/style/index.less` + `~antd/lib/empty/style/index.less` (CSS) | ~354 DS consumers; removed **LAST**, split into two MRs so the CSS swap gets its own VR review. **MR 1 (JS, done):** `LocaleProvider` drops antd's `ConfigProvider`, `antLocales.ts` deleted, `getAntMessages` gone — all internal, no public API change (`core/src/js/index.ts` only exports `DSProvider`). **Consequence:** antd's `LocaleReceiver` now falls back to `en_US` for the strings `ds-table` doesn't pass itself — column-filter buttons, `items_per_page`/`jump_to` (with `showSizeChanger`/`showQuickJumper`), pagination prev/next `title`s and the `SELECTION_ALL`/`SELECTION_INVERT` labels lose pl/es/pt/fr. `ds-table` is deliberately left untouched; the mitigation is a portal-side `ConfigProvider` in puib's root `Provider` (see consolidation TODO). **MR 2 (CSS, done):** antd's reboot replaced by a vendored `src/style/reset.less` (same output — global `box-sizing`, body typography, `::selection`, the element normalize block); `.anticon` + `~antd/lib/style/core/motion.less` relocated into `ds-table` (sorter/selection carets, the embedded select's slide animation) and `motion.less` into `ds-menu` (submenu slide-up/zoom-big popups); `~antd/lib/empty/style` dropped (nothing renders antd `Empty` — `ds-table` always passes `locale.emptyText`); `antd` peerDep gone. `core.css` 22,719 → 4,244 bytes. Verified by rule-level CSS diff: **zero new rules**, and the only rules not carried over are `.ant-empty-*`, `.clearfix` (no consumer anywhere), `@-ms-viewport` and the `-ms-clear`/`-ms-reveal` IE-only blocks. | ✅ done |

> **Select — foundation evaluation (2026-07-06):** build DS-native on the **in-house floating-ui base
> (`@synerise/ds-dropdown` → `@floating-ui/react`)**, generalizing the combobox scaffolding
> **autocomplete** established in Tier 2.5 — `getOptionsFromChildren` (`<Option>` children → data),
> a DS-native `Option`, and the dropdown list built from `ds-list-item` `ListWrapper` + `ds-scrollbar`.
> Select adds the multi/tags chip-selector, remote search, `optionLabelProp`, `dropdownRender` and
> `loading` on top. **Rejected:** external headless libs (downshift/ariakit/react-aria — add a runtime
> dep against the ADR, and none cover tags + `tokenSeparators` + remote search + `dropdownRender` +
> arbitrary JSX children out of the box) and `rc-select` (same rc-* EOL/React-19 baggage the ADR is
> removing). **Consequence:** the base lives on the unmerged Tier 2.5 branch, so select should land
> **after Tier 2.5 merges**, alongside `search` (also gated on that branch). `drawer` and `list` have
> no such dependency and are being ported now.

## Tier 0 — type-only imports (migrate LAST)

Switch these to types defined by the already-migrated owning packages, not ad-hoc local types.

| Component | antd type | Likely new source | Status |
|---|---|---|---|
| `table-new` | `PaginationProps` | `ds-pagination` | ✅ done (with pagination MR !3755) |
| `factors` | `RefSelectProps` | `ds-autocomplete` | ✅ done (Tier 2.5) |
| `form` | `InputProps` | `ds-input` | ✅ done (Tier 2.5) |
| `subtle-form` | `InputProps` | `ds-input` | ✅ done (Tier 2.5) |
| `mocks` | `PaginationProps` | `ds-pagination` (test infra) | ✅ done (STOR-2342) |
| `completed-within` | `SizeType` | — | ✅ done (import already gone; peerDep dropped in STOR-2342) |
| `date-picker` | `SizeType` | `InputSize` from `ds-input` | ✅ done (STOR-2342) |

> `ds-input` now exports its `InputSize` union (`'small' \| 'middle' \| 'large'`) publicly — prefer it over
> a local union wherever an antd `SizeType` is being replaced.

## Out of scope

| Component | Reason |
|---|---|
| `table` | 🗑️ **Deprecate — do NOT reimplement.** Never in scope for an antd-native rewrite: `@synerise/ds-table-new` already replaces it. Deprecation markers applied (`[DEPRECATED]` description + `deprecated` field in `package.json`, README/CLAUDE.md banner, `@deprecated` JSDoc on every `src/index.ts` export, `deprecated` Storybook tag + docs banner via the shared `TableMeta`) → all point to `@synerise/ds-table-new`. **Every DS-internal consumer is now migrated off it** — `avatar-group`'s group modal renders `ds-table-new`'s `VirtualTable`, and the Typography/Layout/Confirmation stories that used the old table as filler moved too. The `Components/Table/*` stories are kept (deprecated, not deleted) as the only VR coverage of a still-published package, and the `ds-mocks` Table mock is kept (deprecated) for downstream suites. A prop-mapping migration guide lives in `table/README.md` and **Components/TableNew/Migration from Table**. The package stays **published + deprecated**; deleting it is gated on external consumers — portal-ui-bridge (~41 files) and universal-list. |

## Stale peerDeps — config-only cleanup (no source change) — ✅ done (STOR-2342)

Declared `antd` in `package.json` but never imported it. All cleared:

`block` · `card` · `card-select` · `card-tabs` · `code-area` · `collector` · `color-picker` ·
`column-manager` · `completed-within` · `factors` · `field-set` · `form` · `manageable-list` ·
`mapping` · `navbar` · `page-header` · `sidebar-object` · `subtle-form` · `table-new` · `tabs` ·
`time-picker` · `toolbar` — plus `date-picker` and `storybook` once their imports went.

`checkbox-tristate` was already clean (dropped with the checkbox MR !3756). `design-system`'s peerDep
goes with this MR: the umbrella ships no code of its own (`src/index.ts` is empty) and no longer
declares `table`/`menu`/`alert`, so it has no antd surface left.

## Post-migration consolidation (TODO)

Cleanups to do **after** the antd removal lands — the de-antd work reimplemented similar helpers
per package; fold the reusable pieces into a single source (prefer `@synerise/ds-utils`) and delete
the duplicates.

- [ ] **Restore antd locale for `ds-table` — portal-side (`portal-ui-bridge`).** STOR-2341 MR 1 removed
  antd's `ConfigProvider` from `ds-core`, so the antd `Table` strings `ds-table` doesn't supply itself
  fall back to `en_US`. `ds-table` is intentionally left alone (permanently out of scope), so the fix
  belongs in puib's root `Provider` (`packages/components/common/src/providers/Provider/Provider.tsx`),
  which already renders `DSProvider` and already depends on antd directly: wrap `DSProvider`'s children
  in antd's own `ConfigProvider` with the locale derived from `currentLocale`. Affects the ~41 puib
  files still on `@synerise/ds-table` (the antd-free `ds-table-new`, 107 files, is unaffected).
- [ ] **`cx` class-name join → single source.** The migrations join class-name hooks ad-hoc — a local
  `cx(...)` (ds-select), inline `[...].filter(Boolean).join(' ')` (ds-search, ds-drawer, ds-list) and
  `classnames` elsewhere. Add one `cx` util to `ds-utils` and replace the per-component copies.
- [ ] **`getOptionsFromChildren` (+ `findOption`) → single source.** Maps `<X.Option>` children to the
  internal option shape — now **duplicated in `ds-autocomplete` and `ds-select`**. Extract a shared
  `optionsFromChildren` helper (ds-utils or a small shared package) and have both import it.
- [ ] **`prefixel`/`suffixel` plain-text wrapper → single source (`ds-form-field`).** Unify addon
  handling: a plain `string`/`number` addon should be wrapped in a shared addon-text element (side
  margin + ellipsis truncation, **no fixed max-width** so short text is never clipped), while a
  `ReactNode` renders as-is. Today this is inconsistent — `ds-tag`/`ds-list-item`/`ds-menu` each do
  their own `typeof === 'string' | 'number'` check, whereas `ds-input`/`ds-input-number`/`ds-select`
  render the addon bare. Plan: add `AddonText` (styled span) + a `renderAddon(node)` helper to
  `@synerise/ds-form-field` (the common dep of input/input-number/select), consume it in those three
  (cascader/date-picker/item-picker/etc. inherit it via Input/Select), and later fold the
  tag/list-item/menu copies into the same source. Deferred from the select work (2026-07-07).
- [ ] **`ant-*` → `ds-*` class-hook sweep (initiative-wide).** Migrated components should expose
  **`ds-*` hooks only**. Done: `ds-search` (`ds-search-input`), `ds-select` (`ds-select-*`). **Pending:**
  `ds-drawer` and `ds-list` still emit `ant-*` **and** `ds-*` side-by-side — drop the `ant-*` hooks and
  migrate the consumer stylesheets that target them (≈19 files target `.ant-list-*`; a few target
  `.ant-drawer`). Also the Tier 1/2 merged packages (avatar/badge/switch/pagination/…) — audit for
  residual `.ant-*` hooks and consumer coupling.
- [ ] **Delete residual antd LESS** from de-antd'd packages once their `.ant-*`-class consumers migrate.
  `ds-select` is **done** — its `style/*.less` was relocated into `ds-table`
  (`table/src/style/select.mixin.less` + a direct `@import '~antd/lib/select/style'`) and its `antd`
  peerDep dropped, so ds-select is fully antd-free. Remaining: any package's `style/*.less` that only
  exists to pull antd LESS for an out-of-scope consumer.
- [ ] **Shared native primitives already extracted** (reuse, don't re-add): `@synerise/ds-carousel`
  (banner/popconfirm), `useFocusTrap`/`useAutosizeWidth`/`useStretchToFit`/`PassthroughAttributes`
  (ds-utils), the `ds-dropdown`(floating-ui) + `ds-list-item` + `ds-scrollbar` combobox stack
  (autocomplete/select). Prefer these over new per-component implementations.
- [ ] **Co-locate the form-input stories & tests.** Move the `Select` stories & tests in with the
  other input elements (Storybook `InputElements` grouping), and likewise relocate `subtle-form`,
  `radio` and `checkbox` so all form inputs live together.

## Done-check (whole initiative)

- `rg -l "antd" packages/components/*/src` returns only `ds-table`, `ds-menu`, `ds-alert` (plus a
  provenance comment in `ds-core`'s vendored `style/reset.less`).
- No DS package **imports** `@synerise/ds-table`. The only remaining references are its own
  source, the deprecated `ds-mocks` Table mock and the deprecated `Components/Table/*` stories.
- No `antd` entry remains in any `package.json` except those three and the root — which keeps antd
  installed so they can build and so the Storybook stories that render antd directly still resolve it.
- Storybook visual review + unit/interaction tests green per package.

> **Current-state caveat:** `antd` now remains only in `ds-table` (permanently excluded) and in
> `ds-menu` / `ds-alert` (deprecated — antd stays until those packages are retired). Those three also
> own the last fragments of antd's base stylesheet: `ds-table` imports `core/iconfont.less` and
> `core/motion.less`, `ds-menu` imports `core/motion.less`. Everything else — `ds-core` and the
> `design-system` umbrella included — is antd-free in both source and `package.json`.
>
> **Umbrella caveat:** dropping the three from `@synerise/design-system`'s `dependencies` only stops
> the *umbrella* installing them; packages that depend on them directly still pull them in. Those
> edges are cut by the three sibling MRs: `ds-alert`'s five (`ds-factors`, `ds-item-picker`,
> `ds-step-card`, `ds-information-card`, `ds-table`) went with !3905, `ds-menu`'s nine with !3790, and
> `ds-avatar-group` → `ds-table` with !3920. Once all four are merged, nothing in the DS depends on
> them and only `ds-mocks` keeps its deliberate mock targets.
