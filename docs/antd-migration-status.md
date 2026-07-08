# antd Migration Status

Living tracker for removing `antd` from `@synerise/ds-*`. See `docs/adr/0001-remove-antd-dependency.md`
for the decision and rationale.

**Status legend:** ⬜ Not started · 🟦 Branch created · 🟨 In progress · ⏸️ Blocked (waiting on another branch/merge) · 🧪 Code-complete, in QA (branch not yet merged) · ✅ Done (antd-free, merged to master) · 🗑️ Deprecate (no reimplementation) · ⏭️ Out of scope

**Audit date:** 2026-06-08 · scope: `packages/components/*/src` · `ds-table` excluded.
**Last updated:** 2026-07-07 · Tier 1 + Tier 2 merged to master; Tier 2.5 (input family — now incl. `search`) code-complete on `feature/deantd-input-autosize`, in QA integration testing. Active phase: **Tier 3** — `drawer` + `list` ported; `select` in progress on master (deferred to land after Tier 2.5); `menu` deprecated; `core` last.

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
| `alert` | `Alert` + `AlertProps` | No | ⏭️ excluded (deprecated; keep antd until deleted) |
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

_**Priority (updated 2026-07-06):** `menu` deprecated (MR !3773). `drawer` (MR !3774) + `list`
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
| `menu` | `Menu` + `MenuProps` | **Deprecate only — do NOT reimplement.** Deprecation markers applied (pending MR): `@deprecated` JSDoc on `Menu` + `AntdMenuProps`, `deprecated` field in `package.json`, `deprecated` Storybook tag + note → all point to `@synerise/ds-list-item` (`ListItem` / `ListWrapper`). antd stays until the package is retired. | 🗑️ deprecate (applied) |
| `core` | `ConfigProvider` + 5 antd `locale/*` imports | ~354 DS consumers; remove **LAST** | ⬜ |

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
| `mocks` | `PaginationProps` | `ds-pagination` (test infra) | ⬜ |
| `completed-within` | `SizeType` | local union `'small'\|'middle'\|'large'` | ⬜ |
| `date-picker` | `SizeType` | local union | ⬜ |

## Out of scope

| Component | Reason |
|---|---|
| `table` | Excluded from this initiative (tracked separately). |

## Stale peerDeps — config-only cleanup (no source change)

Declare `antd` in `package.json` but never import it. Remove the peerDep when convenient:

`block` · `card` · `card-select` · `card-tabs` · `checkbox-tristate` · `code-area` · `collector` ·
`color-picker` · `column-manager` · `design-system` · `field-set` · `manageable-list` · `mapping` ·
`navbar` · `page-header` · `sidebar-object` · `tabs` · `time-picker` · `toolbar`

## Post-migration consolidation (TODO)

Cleanups to do **after** the antd removal lands — the de-antd work reimplemented similar helpers
per package; fold the reusable pieces into a single source (prefer `@synerise/ds-utils`) and delete
the duplicates.

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
- [ ] **Delete residual antd LESS** from de-antd'd packages once their `.ant-*`-class consumers migrate
  (e.g. `ds-select`'s `style/*.less`, kept temporarily because `ds-table` + master `ds-autocomplete`
  `@import` it; and any package's `style/*.less` that only exists to pull antd LESS).
- [ ] **Shared native primitives already extracted** (reuse, don't re-add): `@synerise/ds-carousel`
  (banner/popconfirm), `useFocusTrap`/`useAutosizeWidth`/`useStretchToFit`/`PassthroughAttributes`
  (ds-utils), the `ds-dropdown`(floating-ui) + `ds-list-item` + `ds-scrollbar` combobox stack
  (autocomplete/select). Prefer these over new per-component implementations.

## Done-check (whole initiative)

- `rg -l "antd" packages/components/*/src` returns empty (excluding `ds-table`).
- No `antd` entry remains in any `package.json` except `ds-table`.
- Storybook visual review + unit/interaction tests green per package.

> **Current-state caveat:** on **master**, `antd` still remains (legitimately) in `ds-table`
> (permanently excluded), `ds-alert` (excluded; deprecated), and the open Tier 3 packages —
> `ds-list`, `ds-drawer`, `ds-select`, `ds-menu` (to be deprecated, not migrated) and
> `ds-core` (removed last). The Tier 2.5 branch (`feature/deantd-input-autosize`) additionally clears
> `ds-input`, `ds-input-number`, `ds-autocomplete`, `ds-search` and the input-typed Tier 0 dependents — that antd
> usage disappears from master once the branch merges. The done-check above describes the final
> target; today the residual `antd` usage is confined to those packages plus the stale peerDeps
> listed above.
