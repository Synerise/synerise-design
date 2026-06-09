# antd Migration Status

Living tracker for removing `antd` from `@synerise/ds-*`. See `docs/adr/0001-remove-antd-dependency.md`
for the decision and rationale.

**Status legend:** ⬜ Not started · 🟦 Branch created · 🟨 In progress (MR open) · ✅ Done (antd-free) · ⏭️ Out of scope

**Audit date:** 2026-06-08 · scope: `packages/components/*/src` · `ds-table` excluded.

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
| `avatar` | `Avatar` + `AvatarProps` type; styles target `.ant-avatar-*`; imports `antd/lib/avatar/style` LESS | No (antd usage is internal) | `refactor/deantd-avatar` | 🟨 MR !3729 |
| `badge` | `Badge` + `BadgeProps` type; styles target `.ant-badge-*`/`.ant-scroll-number-*`; imports `antd/lib/badge/style` LESS | No (internal) | `refactor/deantd-badge` | 🟨 MR !3725 |
| `switch` | `Switch`; `RawSwitch = antd Switch` is a **public export**; styles target `.ant-switch`; imports `antd/lib/switch/style` LESS | **Yes** — `RawSwitch` used by `column-manager`, `field-set`, bridge `automations` | `refactor/deantd-switch` | 🟨 MR !3728 |
| `typography` | **default export = antd `Typography`** (used with `copyable`/`Typography.Title`); `TitleProps` type from `antd/es/typography/Title`. DS `Title`/`Text`/`Paragraph` are already pure styled-components | **Yes** — default export consumed in `sidebar-object` + 30+ bridge files | `refactor/deantd-typography` | 🟨 MR !3726 |

> Note: `avatar`, `badge`, `switch` all depend on `ds-typography` (`macro`/`FormFieldLabel`), but only
> via styled-components helpers — not the antd default export. Migrating `typography`'s named exports
> does not block them; replacing its antd **default export** is the breaking piece.

## Tier 2 — medium runtime components

| Component | antd surface | Breaking? | Status |
|---|---|---|---|
| `pagination` | `Pagination` + `PaginationProps` | TBD | ⬜ |
| `alert` | `Alert` + `AlertProps` | No | ⬜ |
| `banner` | `Carousel` + `CarouselRef` | No | ⬜ |
| `popconfirm` | `Carousel` (image carousel in body) | No | ⬜ |
| `sidebar` | `Collapse` + `CollapseProps` | No | ⬜ |
| `list` | `List` + `RadioGroupProps` | No | ⬜ |
| `checkbox` | `Checkbox` + `CheckboxChangeEvent` (note: `checkbox-tristate` depends on this) | No | ⬜ |
| `radio` | `Radio` + `Radio.Group` | No | ⬜ |
| `input-number` | `InputNumber` + props | No | ⬜ |

## Tier 3 — complex / foundational

| Component | antd surface | Notes | Status |
|---|---|---|---|
| `drawer` | `Drawer` | portal, mask, animation, placement | ⬜ |
| `menu` | `Menu` + `MenuProps` | nested submenus, keyboard nav | ⬜ |
| `search` | antd `Input` + `InputRef` | blocked on `input` | ⬜ |
| `autocomplete` | `AutoComplete` + `RefSelectProps` | input + dropdown | ⬜ |
| `select` | `Select` + `SelectProps`/`SelectValue` | ~11 DS consumers; large surface | ⬜ |
| `input` | `Input` + `TextArea` (11 files, many type subpaths) | ~37 DS consumers | ⬜ |
| `core` | `ConfigProvider` + 5 antd `locale/*` imports | ~354 DS consumers; remove LAST | ⬜ |

## Tier 0 — type-only imports (migrate LAST)

Switch these to types defined by the already-migrated owning packages, not ad-hoc local types.

| Component | antd type | Likely new source | Status |
|---|---|---|---|
| `table-new` | `PaginationProps` | `ds-pagination` | ⬜ |
| `mocks` | `PaginationProps` | `ds-pagination` (test infra) | ⬜ |
| `completed-within` | `SizeType` | local union `'small'\|'middle'\|'large'` | ⬜ |
| `date-picker` | `SizeType` | local union | ⬜ |
| `factors` | `RefSelectProps` | `ds-select` | ⬜ |
| `form` | `InputProps` | `ds-input` | ⬜ |
| `subtle-form` | `InputProps` | `ds-input` | ⬜ |

## Out of scope

| Component | Reason |
|---|---|
| `table` | Excluded from this initiative (tracked separately). |

## Stale peerDeps — config-only cleanup (no source change)

Declare `antd` in `package.json` but never import it. Remove the peerDep when convenient:

`block` · `card` · `card-select` · `card-tabs` · `checkbox-tristate` · `code-area` · `collector` ·
`color-picker` · `column-manager` · `design-system` · `field-set` · `manageable-list` · `mapping` ·
`navbar` · `page-header` · `sidebar-object` · `tabs` · `time-picker` · `toolbar`

## Done-check (whole initiative)

- `rg -l "antd" packages/components/*/src` returns empty (excluding `ds-table`).
- No `antd` entry remains in any `package.json` except `ds-table`.
- Storybook visual review + unit/interaction tests green per package.
