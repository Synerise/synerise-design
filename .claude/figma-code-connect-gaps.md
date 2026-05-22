# Figma ↔ Code Connect Gaps

Tracking mismatches between Figma component sets and their React DS components — discovered while writing `.figma.tsx` Code Connect mappings.

Each entry lists:
- **Figma → React** gaps (Figma feature with no React equivalent — won't render correctly in dev mode codegen)
- **React → Figma** gaps (React prop with no Figma representation — designers can't preview it)
- **Figma setup issues** (broken/missing variant property definitions that block clean Code Connect mapping)

---

## Checkbox

Component set: `248:3956`
File: `packages/components/checkbox/src/Checkbox.figma.tsx`

### Figma setup issues
- **Component set `componentPropertyDefinitions` is empty.** Variant axes `Content Type` and `State` are only encoded in child component names, not declared as variant properties on the set. Forced the .figma.tsx to connect each variant by individual node ID (21 separate `figma.connect()` calls) instead of using the cleaner `variant: { ... }` syntax. **Fix in Figma:** open the component set, expose `Content Type` and `State` as variant properties.

### Figma → React
- **State: Blocked** — no equivalent prop on DS Checkbox. The "Blocked" variant (solid filled white-inner-box style) isn't representable in code. Not mapped.
- **State: Hover / Focused** — pure CSS interaction states, no prop. Not mapped (browser handles them automatically).

### React → Figma
- None observed.

### Notes
- Solo + Validated variant uses `hasError` (no `errorText`) since there's no label to anchor the error message visually.
- Skeleton state maps to `CheckboxSkeleton` from `@synerise/ds-skeleton` (separate component, separate `figma.connect()` calls).

---

## Divider

Component set: `316:4940`
File: `packages/components/divider/src/Divider.figma.tsx`

### Figma setup issues
- **Variant names `Line Type3` / `Line Type4` are non-semantic.** They mean "solid no-margin" and "dashed no-margin" respectively (inferred from layout). Rename to e.g. `Solid Line` / `Dashed Line` with the existing `withSideMargin=False` axis to make the relationship explicit.

### Figma → React
- **`Show Counter` / `Counter Text` properties** — DS Divider has no counter prop. The "12" counter shown on the right of the header section is dropped from generated code. **Fix in code:** add a `counter?: ReactNode` (or `counter?: string`) prop to `Divider`. **Fix in Figma:** remove if unused.

### React → Figma
- **`type='vertical'`** — Figma Divider only renders horizontal. No variant for vertical.
- **`labelAbove`** — Figma always renders the header below the line (mapped as `labelBelow`). No variant for label-above-line.
- **`marginTop` / `marginBottom`** — numeric spacing not represented; Figma uses fixed layout.
- **`dashed` × `withSideMargin=False`** — Code Connect maps this via `Line Type4`, but a designer browsing the Figma library wouldn't intuit that "Line Type4" = dashed no-margin.

### Notes
- Figma header renders below the line per design context, mapped as `labelBelow`.

---

## AppMenu

Component set: `319:5906` ("App Menu")
File: `packages/components/app-menu/src/AppMenu.figma.tsx`

### Figma → React
- **`State: Collapsed` / `State: Expanded` variant has no prop equivalent.** AppMenu manages open/closed state internally via `useState`. Both Figma variants produce identical React code — only the runtime click behavior differs.
- **Individual menu items / sub-menu items are not separately componentized in Figma** (or weren't inspected here). Code Connect cannot auto-populate `AppMenu.Item` from the Figma item layers without separate mappings.

### React → Figma
- **`activeItem` (required string)** — no Figma representation; the "active" item highlight in Figma is visual-only.
- **`footer` slot** — no clear Figma counterpart.
- **`top` (numeric offset)** — layout positioning not modelled in Figma.

### Notes
- Compound API (`AppMenu`, `AppMenu.Item`, `AppMenu.Item.Icon`, `AppMenu.SubMenu`, `AppMenu.SubMenu.Title`, `AppMenu.SubMenu.SubTitle`, `AppMenu.SubMenu.Item`) requires hand-written examples — auto-generation from variants is limited.
- Examples use `<></>` placeholders for `Icon active`/`inActive` to avoid forcing a specific `@synerise/ds-icon` import.

---

## Avatar

Component set: `252:4297`
File: `packages/components/avatar/src/Avatar.figma.tsx`

### Figma setup issues
- **`Badge` variant has only one value (`False`).** Suggests badge variants were planned but never built. Either complete the `True` variant in Figma, or remove the `Badge` axis from the component set.

### Figma → React
- **No text property for initials.** Figma hardcodes "BG"/"W" per variant. The React `text` prop / `user.firstName`/`lastName` can't be driven from Figma. Code Connect examples use static placeholder text. **Fix in Figma:** expose initials as a TEXT property on the component set.
- **State: Hover** — pure CSS state, no prop. Not mapped.

### React → Figma
- **`backgroundColor` + `backgroundColorHue` props** — Figma has no color-swap variant; all variants use the same fixed palette tokens. Designers can't preview alternate background colors from the library.
- **`hasStatus` / `badgeStatus`** — the Figma `Badge` variant axis exists but is non-functional (single-value).
- **`tooltip` config** — runtime feature, no Figma equivalent.
- **100 default SVG avatars (`avatarId`)** — `UserAvatar` can render any of 100 generated SVGs from a deterministic hash. No Figma representation.
- **`shape` override on base Avatar** — Figma decides shape from `Type` (User=circle, Object=square); the base `Avatar` allowing explicit `shape='square'` for Type=User isn't representable.

### Notes
- Used `UserAvatar` for `Type=User` and `ObjectAvatar` for `Type=Object` (recommended high-level components) rather than the base `Avatar`. 6 connects total (2 Types × 3 Content Types); `Size` and `State` mapped via `figma.enum` to avoid the 48-combo explosion.
- Required broadening `figma.config.json` `include` glob to `src/**/*.tsx` so the parser could resolve `UserAvatar`/`ObjectAvatar` which live in subfolders. Worth keeping — also fixes the older `CheckboxSkeleton` import warning.
- `figma.enum` requires inline object literals as the 2nd argument; extracting the map to a `const` triggers `figma.enum second argument should be an object literal`.

---

## AvatarGroup

Component set: `252:4918`
File: `packages/components/avatar-group/src/AvatarGroup.figma.tsx`

### Figma → React
- **`Size = Extra Large`** — Figma offers 4 sizes but `AvatarGroup` only supports `small | medium | large`. Mapped `Extra Large → large` as fallback. Either drop the `Extra Large` size from the Figma component or add `extraLarge` support to AvatarGroup.

### React → Figma
- `dataSource` (required), `numberOfVisibleUsers`, `moreInfoTooltip`, `hasStatus`, `groupModal` — runtime-only props with no Figma representation.

---

## Autocomplete

Component set: `15751:18999`
File: `packages/components/autocomplete/src/Autocomplete.figma.tsx`

### Figma → React
- **`State = Loading`** — Autocomplete has no `loading` prop; the dropdown spinner is controlled at consumer level via `options=[]` + custom render. Loading variant produces the same JSX as Default.
- **No `Size` variant** in Figma (unlike Input). React `size` prop not surfaced.

### React → Figma
- `icon1Tooltip`/`icon2Tooltip`, `autoResize`, `readOnly`, `handleInputRef`, `tooltip`, `tooltipConfig`, `getPopupContainer` — no Figma equivalent.

---

## Badge

Component sets: `366:7197` (dot), `366:7250` (dot pulsing), `366:7133` (number)
File: `packages/components/badge/src/Badge.figma.tsx`

### Figma setup issues
- **Typo: `Comntent` variant property** on the Badge number set (should be `Content`). Worth fixing in Figma; existing Code Connect mappings will need updating once renamed.

### Figma → React
- **`Type = Error` / `Success`** — no direct match in `BadgeStatus` (`active | inactive | blocked | processing | warning`). Mapped `Error → blocked` (red), `Success → active` (green). Could alternately use `customColor` for literal hex mapping.

### React → Figma
- `disabled`, `size`, `customColor`, `count` numeric formatting — not exposed in Figma.

### Notes
- Number badge split into 3 connects (Full Color / Full Color+Outline / Outline) because React expresses "outline mode" via swapped color props rather than a single boolean.

---

## Banner

Component sets: `8530:1698` (Expandable), `8530:1704` (Static)
File: `packages/components/banner/src/Banner.figma.tsx`

### Figma → React
- **Slide content not surfaced as component-set props.** The Static set's nested `Content` instances expose text/media slots only as hard-baked overrides per variant, not as parent-level properties. Code Connect can't map them; example uses a generic title placeholder.
- **No `autoPlay`, `autoPlaySpeed`, `transitionEffect`, `closeTooltip`** — runtime-only props.

### Notes
- Slider-nav toggle drives `slides.length` (1 vs 2) in the Static connect via `figma.boolean('Show slider nav', { true: [...], false: [...] })`.
- **Parser trap:** conditional expressions like `closeButton ? () => {} : undefined` in `example` body cause `Could not find prop mapping`. Move the conditional into `figma.boolean({ true: fn, false: undefined })` mapping instead.

---

## BroadcastBar

Component set: `719:13397`
File: `packages/components/broadcast-bar/src/BroadcastBar.figma.tsx`

### Figma setup issues
- **Naming mismatch:** Figma uses `Error`, React uses `negative`. Mapped explicitly per variant. Either rename Figma `Error → Negative` or add an alias to `BroadcastBarType`.

### Figma → React
- **Close button always present in Figma**, no toggle. React `withClose` is optional but example hardcodes it as `true`.
- **`customIcon`** (React) — no Figma instance-swap property; default icon is fixed per type.

### Notes
- `Show Button` boolean drives `button` slot via `figma.boolean({ true: <Button>Action</Button>, false: undefined })`.

---

## ButtonGroup

Component set: `5491:11179`
File: `packages/components/button-group/src/ButtonGroup.figma.tsx`

### Figma → React
- **No variants** for `compact`, `splitMode`, `fullWidth`, `buttonsPosition`, `disabled`, `error`, `title`, `description` (all rich in code). Only `Size` (Large/Small) is exposed.
- **Empty `container` child** in Figma — no nested Button instances surfaced; example hardcodes 3 `<Button type="secondary">` children.

### Figma → React (cross-package)
- `Button` imported from `@synerise/ds-button` (workspace package) since `ButtonGroup` doesn't re-export it.

---

## Card

Component set: `342:7789`
File: `packages/components/card/src/Card.figma.tsx`

### Figma → React
- **State: Hover** mapped to `lively` (DS prop that drives hover shadow), not skipped — `lively` is a real prop, not just a CSS state.
- **No nested booleans for header/content/footer/icon/avatar slots** — every Figma variant always has Header Content. `withHeader` is always `true` in connects.

### React → Figma
- `headerSideChildren`, `compactHeader`, `titleTag`, `icon`, `avatar`, `renderBadge`, `CardBadge`, `CardGroup`, `CardSummary` — not exposed in Figma.

### Notes
- `Filled` state uses a literal `<div>Summary</div>` rather than `<CardSummary />` to keep the snippet self-contained.

---

## CardTabs (CardTab)

Component set: `372:9120`
File: `packages/components/card-tabs/src/CardTabs.figma.tsx`

### Figma setup issues
- **Single-tab component, not the strip.** Connected to `CardTab` not `CardTabs`. The Figma node represents one tab card; no `CardTabs` parent container node exists.
- **`Background=White` → `greyBackground={true}`** looks inverted but is correct per the source (`greyBackground` means "white card with shadow").

### Figma → React
- **CSS-only states skipped:** Hover, Active Hover, Grabbed (15 of 20 possible state combos covered).
- **No suffix icon, action buttons, dropdown, or CRUD-action slots** — only `Prefix` icon. `actionsAsDropdown` not connected.
- **`color` (yellow/blue/red/etc.)** not exposed in Figma; auto-assigned by parent from `defaultColorsOrder`.

---

## CardSelect

Component set: `497:10607`
File: `packages/components/card-select/src/CardSelect.figma.tsx`

### Figma setup issues
- **Typo: `Tag = "Tru"` variant** (should be `True`). Not connected. Worth fixing in Figma.
- **Typo: `Rised` variant property** (should be `Raised`). Mapped as-is.

### Figma → React
- **`Show Info Icon` boolean** has no Figma property for the actual tooltip content; stubbed as `{ title: 'Info' }`.
- **`Tag = True`** has no Figma properties for tag text/color; stubbed as `{ name: 'NEW' }`.
- **Icon swap** — Figma has separate `Icon XL` (Normal size) and `Icon L` (Small size) slots; the React `icon` prop is a single slot. Always using `Icon XL` (the parser doesn't allow conditional selection between them).

### React → Figma
- `elementsPosition`, `stretchToFit`, `error`, `customTickVisible*`, `onChange`, `onClick`, `iconSize`, `tickSize` — no Figma equivalent.

---

## Collector

Component set: `729:13722`
File: `packages/components/collector/src/Collector.figma.tsx`

### Figma → React
- **`Show button secondary` boolean ignored** — corresponds to `buttonPanelPrefix: ReactNode`, which can't be represented by a generic boolean.
- **`onItemSelect` is required** in `CollectorProps`. Every connect must include a stub callback.

### React → Figma
- `disableButtonPanel`, `disableSearch`, `fixedHeight`, `dropdownContent`, `allowMultipleValues` true/false toggle — no Figma representation (multi-value shown only as a visual filled state).

---

## ColorPicker

Component set: `1894:25476`
File: `packages/components/color-picker/src/ColorPicker.figma.tsx`

### Figma → React
- **No nested props in Figma** — no Label/Description text props, no icon instance, no `Size` variant. Example uses literal sample placeholder and value.
- **`Filled+Focus` and `Filled`** produce the same React snippet (focus is a CSS pseudo-state).

### React → Figma
- `description`, `tooltip`, `colors`, `isShownSavedColors`, `size`, `infix`, `readOnly` — not surfaced as Figma variant properties.

---

## Condition

Component: `14759:948` (single COMPONENT, not a set)
File: `packages/components/condition/src/Condition.figma.tsx`

### Figma → React
- **No variants/properties on parent.** Interesting variants live on nested instances (`Subject.ConditionBuilder` Type=Event/Attribute/Context, `Line.ConditionSelector`), but they're owned by other component sets and not surfaced through the parent's component properties.
- **All callbacks required** in React (`onChangeSubject`, `onChangeContext`, `onChangeParameter`, `onChangeOperator`, `onChangeFactorValue`, `onChangeFactorType`). Stubbed as no-ops in the connect.

---

## Confirmation

Component set: `11374:54519`
File: `packages/components/confirmation/src/Confirmation.figma.tsx`

### Figma setup issues
- **`Message type` variants are pre-composed compositions** (11 variants like "Deleting objects", "Quiting without save", "Saving changes"). Title/description/icon are baked into each variant — no per-variant text/icon swap props.

### Figma → React
- All `props` are hardcoded literals in each `example` rather than mapped via `figma.string`/`figma.instance`.
- **`BaseConfirmation`** internal variants (Error/Warning/Success/Informative + boolean props) are not surfaced at the parent `Confirmation` component-set level.
- **`Prompt`** (simpler variant exported from this package) has no matching Figma node.

### Notes
- `batchActionItems` examples use minimal `{ name: '...' }` items; real consumers pass full `ListItemProps`.
- `relatedObjects` placeholder is `<div>` since the related-objects table is consumer-provided.
- "XXX" placeholder descriptions come directly from Figma source content.

---

## Cruds

Component: `148:2011`
File: `packages/components/cruds/src/Cruds.figma.tsx`

### Figma setup issues
- **Figma `Delete` is ambiguous** — `icon4` uses TrashS (delete), `icon8` uses CloseS (remove). Mapped `icon8 → onRemove`, `icon4 → onDelete` per source icon types.

### Figma → React
- **No tooltip text props** — tooltips hardcoded as placeholders.
- **No custom icon swap** — only boolean visibility toggles for 9 fixed icon slots.

### React → Figma
- `moveUpInactive` / `moveDownInactive`, `Cruds.CustomAction` — no Figma counterpart.

---

## DatePicker

Component set: `2012:35636`
File: `packages/components/date-picker/src/DatePicker.figma.tsx`

### Figma → React
- **`State` variants don't map to user-facing props.** `Default`, `Selected`, `Months`, `Year`, `Years range` are all internal calendar modes the user navigates by clicking; there's no public API to render the DatePicker in `'months'` or `'year'` mode directly. All 5 produce the same snippet (with `value={new Date()}` for Selected).
- **`Time picker 12h` vs `Time Picker 24h`** can't be distinguished — DatePicker only has `showTime: boolean`, no 12h/24h toggle.
- **No `Disabled` variant** in Figma (despite being a common interaction state).

### React → Figma
- `onApply` is required (non-optional) — every snippet includes `onApply={() => {}}` stub.
- Most of DatePicker's rich API (`relativeMode`, `texts`, custom triggers, validation, format options) not surfaced.

---

## DateRangePicker

Component set: `12409:37818`
File: `packages/components/date-range-picker/src/DateRangePicker.figma.tsx`

### Figma setup issues
- **Generic variant property name: `Property 1`** (should be e.g. `Picker mode`). Worth renaming in Figma.

### Figma → React
- Only 5 enum variants (no string/boolean/instance props on the set). Each connect uses a hardcoded `example` rather than a `props` block.

### React → Figma
- `value`, `onApply`, relative picker, custom triggers, popover config, texts, validation, format options (~60 other props) — not surfaced.

---

## Description

Component set: `746:16119`
File: `packages/components/description/src/Description.figma.tsx`

### Figma setup issues
- **Figma "Description Line" represents a single row** (label + value). Connected to the container `Description`; wrapping a single `DescriptionRow` with hardcoded `"Value"`. Figma doesn't expose a "Value" text prop on this node.

### Figma → React
- **`25-75` ratio**: Figma renders the value column with a fixed `192px` width; DS uses `25% 75%` grid — visually close but not identical pixel-for-pixel.
- **`numbered-list` type** has no corresponding Figma variant.

### React → Figma
- `DescriptionRow` props (`labelIcon`, `prefixEl`, `suffixEl`, `copyValue`, `starType`, `texts`) — no Figma representation.

---

## Drawer

Component: `805:15260`
File: `packages/components/drawer/src/Drawer.figma.tsx`

### Figma → React
- **No variants** on the Drawer itself — just booleans (`Show Tabs`, `Show Back`, `Show Avatar`, `Show Edit Icon`). Single connect with 5 mapped properties.
- **Tabs/Avatar/Button slot contents** can't be cross-package imported into the Drawer's `.figma.tsx`; example uses placeholder string-tagged spans.

### React → Figma
- `placement`, `width`, `open`, `onClose` — not surfaced in Figma. Defaults from CLAUDE.md usage example.

---

## Dropdown

Component: `2104:37656` ("Dropdown Custom")
File: `packages/components/dropdown/src/Dropdown.figma.tsx`

### Figma → React
- **`Show Tabs` boolean** is not connected — tabs aren't provided by `@synerise/ds-dropdown`; would require composing `@synerise/ds-tabs` at the consumer level.
- **`Content` is freeform** in Figma — represented as a `<MenuItems />` placeholder.
- **`Footer` content** has no exposed Figma prop — uses `<span>{'<Footer />'}</span>` placeholder.
- **No `Variant=` enum** — variants are expressed via individual props (Size, Show Search, Show Navigation, Show Footer), so one connect call covers all combinations.

### React → Figma
- `Dropdown` requires a trigger as `children`; Figma "Dropdown Custom" is the overlay only — used a `<Trigger />` span placeholder.

---

## Cross-cutting parser learnings

These bit nearly every component in the batch. Save them for future Code Connect work:

1. **`figma.enum` 2nd argument MUST be an inline object literal.** Extracting the map to a `const` produces `figma.enum second argument should be an object literal`.
2. **No conditional expressions in `example` body.** Patterns like `bool ? value : undefined` produce `Could not find prop mapping for X ? Y : Z in the props object`. Move the conditional into the `props` definition via `figma.boolean('Name', { true: X, false: undefined })` and reference the prop directly in `example`.
3. **URLs must be string literals.** Helpers like `url('123-456')` cause `The second argument to figma.connect() must be a string literal`.
4. **Subfolder components need full-path imports.** `import X from './X/X';` — relying on `./X/index.ts` doesn't always resolve. Requires `figma.config.json` `include` glob `src/**/*.tsx` (broadened from `src/*.tsx`).
5. **Token expired (403) → token missing scope (403 Invalid scope).** Figma access tokens for `figma connect publish` require BOTH `file_code_connect:write` AND `file_content:read` scopes.
6. **Pre-existing broken validation can block publish.** Use `--skip-validation` to bypass single-node errors like the long-broken `Icon` mapping (node `115:291` removed from Figma).
7. **`null` as a prop value triggers `InternalError: Cannot use 'in' operator to search for 'kind' in null`.** Use `undefined` instead. Discovered while mapping Modal's `footer` prop.

---

## Batch 2 & 3 — condensed gaps

The remaining ~52 components share many of the same patterns. Highlights and notable issues:

### Components with Figma typos to fix in Figma
- **Badge** — `Comntent` variant (should be `Content`)
- **CardSelect** — `Tag = "Tru"` value (should be `True`); `Rised` property (should be `Raised`)
- **DateRangePicker** — `Property 1` (should be e.g. `Picker mode`)
- **Select** — `Read Onl` variant for `Prefix=True, Suffix=True` (truncated `Read Only`)
- **Slider** — duplicate property names (`Show Header` vs `showHeader`, `Bar Thickness` vs `Bar thickness`) across sub-components
- **Search** — `^Placeholder.Search` text node used for both empty placeholder and filled value

### Components where Figma variants don't map to React props
- **AppMenu** — `State=Collapsed/Expanded` is internal React state (`useState`), not a prop
- **DatePicker** — internal calendar modes (`Months`, `Year`, `Years range`) have no public API; 12h/24h indistinguishable in code
- **Search** — collapsed vs expanded modeled by `alwaysExpanded`, no direct prop for expansion state
- **Slider** — Figma `Variants=1..5` shape doesn't match the `variants: AllocationVariant[]` prop semantics 1:1
- **Tabs** — per-tab variants (`Active Underline`, `Disabled`) live on nested `.SingleTab` instances, not on parent
- **TimePicker** — only the trigger frame is modeled in Figma; no AM/PM or 12h/24h variants

### Components with Figma-only "decorative" features
- **Banner** — slide content (text/media slots) baked per variant, not surfaced as parent props
- **Confirmation** — 11 pre-composed `Message type` variants with hardcoded title/description/icon (no per-variant text swap)
- **EmptyStates** — Figma `Label` (top text) maps to React `text` while Figma `Description` maps to React `label` — names are inverted between the two systems
- **Estimation** — `Type` is purely visual (progress-bar segment composition); approximated via `progressBarValues` shape
- **InformationCard** — variants use color-bound Figma variables that aren't exposed as resolved tokens via REST API
- **Tag** — `Color=Color` variant hardcoded as purple `#5A32FB`; Figma doesn't expose granular color picker

### Components with React-only props (no Figma representation)
- **Avatar/Group** — `dataSource`, `numberOfVisibleUsers`, `groupModal`, status badges
- **Collector** — `onItemSelect` (required), `disableButtonPanel`, `dropdownContent`
- **Cruds** — tooltip text, custom icon swap, `moveUp/DownInactive`
- **Drawer** — `placement`, `width`, `open`, `onClose`
- **Dropdown** — `Show Tabs` boolean would need composing `@synerise/ds-tabs`
- **Modal** — `bodyBackground`, `blank`, `headerActions`, `headerBottomBar`, `maxViewportHeight`, footer slot ReactNodes
- **Navbar** — entire content slot tree is unbaked (empty `Left side` / `Right side` frames)
- **Pagination** — `current`, `total`, `pageSize`, `onChange`, `showQuickJumper`, `simple`, `size`, `disabled`
- **Progress-bar** — `customColor`, `steps`, `width`, segmented multi-value, `ProgressTiles`
- **Result** — `customIcon`, `Show Panel`/`Show Buttons` are ReactNode slots
- **Search/Search-bar** — `valuePrefix`, `autofocus`, `borderRadius`, recent items/parameters
- **Sidebar** — multi-panel composition not modeled; `Grabbed`/`Placeholder` are runtime drag states
- **Status** — `primary` and `disabled` `StatusType` values have no Figma variant
- **Stepper** — `orientation`, `size`, `vertical`, per-step states (`done`, `warning`, `tooltip`)
- **Switch** — already documented in initial set
- **Toast** — `customIcon`, action button `button: ReactNode` slot, `expandedContent`, imperative API
- **Toolbar** — only `Actions=Left/Right/Both` axis; group/button content slots not bound
- **Tooltip** — `shortCuts` text, `Image` content, `status` prop, `Show Header` & `Show Description` toggles
- **Wizard** — header text & footer button visibility booleans live on nested instances unreachable from root

### Sub-component limitations
- **Flag** — REST API caps response at 100 nodes; only A-HK countries currently mapped, remaining ~158 (HM-ZW + subnational codes like `GB-*`/`US-CA`) need separate batched calls
- **List-item** — `Solo` variant exists in Figma children but not in official `Content Type` variantOptions; `Hover`/`Focused`/`Active`/`Read Only` skipped
- **ManageableList** — 32 connects across `ManageableList` (8 Stories variants) + `ContentItem` (24 State × Background × Size combos)
- **Skeleton** — only `Skeleton` (single + group) connected; `DropdownSkeleton`, `OrderedListSkeleton`, `SkeletonAvatar` have no Figma nodes in the inspected section
- **Table-new** — node is a *composed example*, not a true variant set; row/header/subheader instances have props that don't bubble up
- **Tabs** — connected only at parent level (2 connects: `Default`/`Stacked`); per-tab content/state needs separate `.SingleTab` mapping
- **TableNew/Tabs/Wizard** — many useful props live on nested instances and are unreachable from the top-level `figma.connect`

### Connect counts (this batch's notable values)
- **Flag**: 100 connects (one per country, capped by REST API)
- **ManageableList + ContentItem**: 32
- **Select**: 25
- **CardTabs (CardTab)**: 20
- **List-item**: 15
- **File-uploader**: 13
- **Short-cuts**: 12
- **Radio**: 12
- **Confirmation**: 11
- **Status**: 10
- **Estimation**: 9
- **DatePicker**: 8
- **Tag**: 8
- **Empty-states**: 6, **Card-select**: 6, **CardSelect**: 6
- ...most components: 1-5 connects

### Sticky parser pitfalls (still relevant)
All the rules from "Cross-cutting parser learnings" above continue to bite. Most common in this batch:
- **Rule #3 (no conditionals in example)** — broke CardSelect, BroadcastBar, Modal (multiple times). The `figma.boolean('Name', { true: X, false: undefined })` pattern is the only safe way.
- **Rule #7 (no `null`)** — broke Modal once.
- **Cross-package imports** — Some components (BroadcastBar uses Button, ButtonGroup uses Button) need explicit `import X from '@synerise/ds-X';` from sibling packages, which works because `figma.config.json` now walks `src/**/*.tsx` globally.

### Token rotation reminder
Multiple Figma access tokens have appeared in the conversation transcript across batches. After this batch is committed, rotate the active token at https://www.figma.com/developers/api with both `file_code_connect:write` + `file_content:read` scopes.

---

## Components without Code Connect (`.figma.tsx`) yet

40 packages in `packages/components/` have no `.figma.tsx` file. Grouped by likely reason:

### Utility / non-visual packages (no Figma node expected)
These don't render UI on their own — they're tokens, helpers, mocks, or layout primitives — so they likely shouldn't have Code Connect at all. Confirm with designer before skipping permanently.

- **core** — ThemeProvider, palette/typography tokens, hooks
- **utils** — generic utility helpers (`useOnClickOutside`, `selectColorByLetter`, etc.)
- **mocks** — test fixtures & factories
- **design-system** — meta/umbrella package
- **data-format** — data formatting utilities (numbers, dates)
- **typography** — already covered partially via in-place use in other components (Title, Text, Description, ErrorText, Label) — no standalone Figma node expected
- **logic** — boolean-logic helpers used by Condition/Factors
- **operators** — operator metadata used by Condition builder
- **factors** — factor-type metadata used by Condition
- **subject** — subject-type metadata used by Condition
- **expression-editor** — text-mode expression UI; unclear if Figma models it
- **filter** — filter state/logic (vs `item-filter` which is more visual)

### Layout primitives (Figma likely doesn't model these as components)
- **flex-box** — flex container primitive
- **grid** — grid layout primitive
- **layout** — page-shell layout primitive
- **panel** — panel container (vs `panels-resizer` which has its own Figma node)
- **footer** — page footer slot
- **page-header** — page header slot

### Visual UI packages — need Figma URLs (high priority for next batch)
These look like real visual components that probably do have Figma counterparts and should be connected. Need URLs from designer:

- **alert** — confirmation-style alert dialog
- **block** — block-style container
- **cascader** — cascading dropdown selector
- **checkbox-tristate** — already covered logically via `Checkbox` with `tristate` prop in `Checkbox.figma.tsx`. Could remain unmapped at package level.
- **column-manager** — table column visibility/order manager (referenced in Confirmation gaps)
- **completed-within** — relative-date filter
- **context-selector** — context/scope picker
- **copy-icon** — copy-to-clipboard icon button
- **editable-items-list** — list with inline-edit items
- **emoji-picker** — emoji selector
- **insight** — insight/recommendation card
- **item-filter** — filter UI for item lists
- **list** — generic List component (vs `list-item` which is the row)
- **menu** — menu/dropdown content panel
- **popover** — popover overlay (sibling to `tooltip` and `popconfirm`)
- **sidebar-object** — sidebar object detail variant (sibling to `sidebar`)
- **sortable** — sortable list/grid wrapper
- **step-card** — card variant for step content
- **table** — legacy Table (vs `table-new`)
- **tray** — bottom tray/sheet overlay
- **form** — form container with submission handling
- **form-field** — `FormField` wrapper providing label/tooltip/description/error slots (used heavily by Input/Select/etc.)

### Suggested next actions
- Ask designer for Figma node URLs for the "Visual UI packages" list (22 components). Many of these are likely already in the design library under existing categories.
- Confirm with designer that utility/layout/typography packages don't need Code Connect.
- `checkbox-tristate` could simply be marked as covered-by-Checkbox and not need its own file.

