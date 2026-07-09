# Autocomplete (`@synerise/ds-autocomplete`)

> Fully native (no Ant Design) autocomplete: an autosizing text-input trigger plus a floating options dropdown built on `@synerise/ds-dropdown`. Adds a `FormField` label/error/description layer, optional icon slots, `readOnly` mode, and auto-resize behaviour.

## Package structure

```
src/
  Autocomplete.tsx        — main component (native input + ds-dropdown)
  Autocomplete.types.ts   — AutocompleteProps, AutocompleteOption, AutocompleteInputHandle
  Autocomplete.styles.ts  — AutocompleteWrapper, ComponentWrapper, InputContainer, NativeInput, IconWrapper, ClearButton
  Autocomplete.const.ts   — ICON_WIDTH (24), ICON_GAP (4), ICON_OFFSET (8)
  Option.tsx              — Autocomplete.Option marker component (renders null; props are read to build options)
  index.ts                — exports default + AutocompleteProps/AutocompleteOption/AutocompleteInputHandle/OptionProps types
  AutocompleteDropdown/
    AutocompleteDropdown.tsx    — virtualised options overlay (SearchItems + ListItem in a Scrollbar)
    AutocompleteDropdown.types.ts
    AutocompleteDropdown.style.ts
  utils/
    getIconsWidth.ts            — calculates right-padding offset for 1–2 icons
    getOptionsFromChildren.ts   — maps <Autocomplete.Option> children → AutocompleteOption[]
  __specs__/
    Autocomplete.spec.tsx — Vitest tests (native role/data-testid selectors)
```

> There is **no `style/` LESS** — the package is fully de-antd'd. The dropdown overlay's
> box-shadow comes from `@synerise/ds-dropdown`'s `DropdownOverlay`; all other styling is
> styled-components in `*.styles.ts` / `AutocompleteDropdown/AutocompleteDropdown.style.ts`.

## Architecture (native rewrite)

- The trigger is a styled native `<input role="combobox">` (`S.NativeInput`), autosized via `useAutosizeWidth` from `@synerise/ds-input` (hidden `<span>` sizer; `stretchToFit` via `useStretchToFit`).
- The dropdown is `@synerise/ds-dropdown` (`asChild`, `size="match-trigger"`), controlled via `open`/`onOpenChange`. **`trigger={[]}`** — Autocomplete owns the open state through the input's focus/click/change handlers, so ds-dropdown is used only for positioning + outside-dismiss and does **not** toggle on trigger click (delegating the toggle to ds-dropdown as well double-fired against the focus-open and flashed the panel open→closed on re-click). The overlay (`AutocompleteDropdown`) renders the options with `SearchItems` (react-window) → `@synerise/ds-list-item` `ListItem`s inside `@synerise/ds-scrollbar`.
- The component does **not** filter options — it renders `options` (or the children-derived list) as given; the consumer filters via `onSearch`.
- Keyboard navigation is delegated to `@synerise/ds-dropdown`'s built-in floating-ui list navigation (`useListNavigation`): ArrowDown/Up move focus through the `ListItem`s and the focused item selects on Enter/click (ds-list-item's own keydown handler). Autocomplete does **not** keep a second manual highlight — that produced a duplicate active row offset from the real focused one. As antd parity for `defaultActiveFirstOption` (default `true`), an input-level Enter handler selects the first enabled option when Enter is pressed *before* arrow-navigating into the list (once arrowed, focus is on the item so that handler no longer fires).
- `Autocomplete.Option` is a marker that renders `null`; `getOptionsFromChildren` reads `value`/`children`(→`label`) off direct `Option` children when `options` is not provided.

## Public exports

### `Autocomplete` (default)

Fully native (no antd). Props:

**From `FormFieldCommonProps`** (rendered via `ds-form-field`):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | `undefined` | Field label rendered above the input |
| `tooltip` | `ReactNode` | `undefined` | Tooltip icon shown next to the label |
| `tooltipConfig` | `TooltipProps` | `undefined` | Extra config passed to `ds-tooltip` |
| `description` | `ReactNode` | `undefined` | Helper text rendered below the input |
| `errorText` | `ReactNode` | `undefined` | Error message; also triggers error styling |

**DS-specific overrides:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS class on the outer wrapper |
| `error` | `boolean` | `undefined` | Explicit error state (without message); combined with `!!errorText` |
| `readOnly` | `boolean` | `undefined` | Renders as disabled + read-only styles (white bg, auto cursor, grey text) |
| `handleInputRef` | `(ref: MutableRefObject<AutocompleteInputHandle \| null>) => void` | `undefined` | Callback receiving a native handle `{ focus, blur, input }` (no longer the antd `RefSelectProps`) |
| `autoResize` | `AutoResizeProp` | `undefined` | Resizes input width to text content (see below) |
| `getPopupContainer` | `(node: HTMLElement) => HTMLElement` | parent node | Container for the dropdown; defaults to `triggerNode.parentNode` (not `document.body`) |
| `icon1` | `ReactNode` | `undefined` | First icon rendered at the right end of the input |
| `icon1Tooltip` | `ReactNode` | `undefined` | Tooltip for `icon1` |
| `icon2` | `ReactNode` | `undefined` | Second icon rendered at the right end of the input |
| `icon2Tooltip` | `ReactNode` | `undefined` | Tooltip for `icon2` |

**Native autocomplete props** (no longer derived from antd):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `AutocompleteOption[]` | `undefined` | Options to show; `{ value: string; label?: ReactNode; disabled?: boolean }`. Rendered as given (no internal filtering) |
| `value` | `string` | `undefined` | Controlled input value |
| `onChange` | `(value: string) => void` | `undefined` | Fired on keystroke and on select |
| `onSearch` | `(value: string) => void` | `undefined` | Fired on every keystroke |
| `onSelect` | `(value: string) => void` | `undefined` | Fired when an option is chosen |
| `open` | `boolean` | `undefined` | Controlled dropdown visibility |
| `onDropdownVisibleChange` | `(open: boolean) => void` | `undefined` | Fired when visibility changes |
| `placeholder` | `ReactNode` | `undefined` | Input placeholder (string used for autosize measuring) |
| `disabled` | `boolean` | `undefined` | Disables the input + dropdown |
| `allowClear` | `boolean` | `undefined` | Shows a clear (×) button when the input has a value |
| `defaultActiveFirstOption` | `boolean` | `true` | antd parity: pressing Enter while open, before arrow-navigating, selects the first enabled option. `false` requires explicit arrow-nav before Enter selects |
| `notFoundContent` | `ReactNode` | `undefined` | Rendered when there are no options |
| `autoFocus` | `boolean` | `undefined` | Focuses the input on mount |
| `maxLength` | `number` | `undefined` | Native input max length |
| `id` | `string` | `undefined` | Input id (also used by `FormField`) |
| `placement` | `DropdownPlacement` | `'bottomLeft'` | Dropdown placement |

#### `AutoResizeProp`

```ts
type AutoResizeProp = boolean | {
  minWidth: string;
  maxWidth?: string;
  stretchToFit?: boolean;
};
```

- `true` — enables auto-resize with no constraints.
- Object form — sets min/max width constraints.
- `stretchToFit: true` — the input grows to fill the wrapper element (uses `ResizeObserver` on the outer `div`). If the input is inside a flex item, the flex item needs `min-width: 0; flex-grow: 1` to avoid layout issues.

### `Autocomplete.Option`

Native marker component (`Option.tsx`) that renders `null`. Use it to define dropdown items declaratively via children; `getOptionsFromChildren` reads each `Option`'s `value` and `children` (→ `label`) to build the internal options list. Ignored when the `options` prop is provided.

## Usage patterns

```tsx
import Autocomplete from '@synerise/ds-autocomplete';

// Minimal
<Autocomplete options={[{ value: 'foo' }, { value: 'bar' }]} />

// With form-field decoration
<Autocomplete
  label="Search"
  description="Type to filter"
  errorText={errors.search}
  placeholder="Start typing..."
  onSearch={handleSearch}
  onChange={handleChange}
  options={options}
/>

// With icons
<Autocomplete
  icon1={<SearchIcon />}
  icon1Tooltip="Search"
  options={options}
/>

// Auto-resize with stretch
<Autocomplete
  autoResize={{ minWidth: '80px', stretchToFit: true }}
  options={options}
/>

// Accessing the input handle ({ focus, blur, input })
<Autocomplete
  handleInputRef={(ref) => { inputHandleRef.current = ref.current; }}
  options={options}
/>

// Declarative options via Option
<Autocomplete>
  <Autocomplete.Option value="foo">Foo</Autocomplete.Option>
  <Autocomplete.Option value="bar">Bar</Autocomplete.Option>
</Autocomplete>
```

## Styling

Styles live in `Autocomplete.styles.ts`. Uses `@synerise/ds-core` theme palette tokens (`blue-600`, `blue-050`, `red-600`, `red-050`, `grey-300`, `grey-400`, `grey-600`, `grey-700`, `white`). No hardcoded colour values. **All selectors are `.ds-*` / styled-components — no `.ant-*`.**

Styled components:
- `AutocompleteWrapper` — outermost `div`; stretches the `InputContainer` to `100%` when `autoResize` is set.
- `InputContainer` — relative flex container holding the input, sizer span, clear button, and icons.
- `NativeInput` — the styled native `<input role="combobox">`; carries border/focus/hover states and applies `autoresizeConfObjToCss` (min/max width) + `box-sizing: content-box` when `autoResize` is set; right-padding accounts for `iconCount`.
- `ComponentWrapper` — applies `error`/`readOnly` state styling onto `${NativeInput}`. Uses `&&& {}` specificity bump.
- `IconWrapper` — absolutely positioned container for `icon1`/`icon2`; `right: 8px`, vertically centred, `z-index: 5`.
- `ClearButton` — × button shown when `allowClear` + value present.

The dropdown overlay keeps class `ds-autocomplete-dropdown ps__child--consume` (PerfectScrollbar integration). The overlay box-shadow comes from `@synerise/ds-dropdown`'s `DropdownOverlay`; the active/focused row highlight is ds-list-item's own hover/focus styling (floating-ui moves DOM focus through the items). The overlay layout (wrapper/list/scrollbar/list-item) is in `AutocompleteDropdown/AutocompleteDropdown.style.ts`.

## Key dependencies

- `@synerise/ds-dropdown` — floating dropdown wrapper (`open`/`onOpenChange`/`placement`/`overlay`/`asChild`/`trigger`/`getPopupContainer`/`size="match-trigger"`)
- `@synerise/ds-search` — `SearchItems` (react-window virtualised list) renders the option rows
- `@synerise/ds-list-item` — `ListItem` rows + `ListItemProps`
- `@synerise/ds-scrollbar` — `Scrollbar` wrapping the option list
- `@synerise/ds-form-field` — provides label, description, error, tooltip layout
- `@synerise/ds-input` — provides `useAutosizeWidth`, `useStretchToFit`, `SIZER_STYLE`, `autoresizeConfObjToCss`
- `@synerise/ds-tooltip` — wraps `icon1`/`icon2` when tooltip props are provided
- `@synerise/ds-utils` — used transitively (no direct import in the rewrite)

> **No `antd` dependency** — antd was removed from `peerDependencies` and from all `src` imports/`.ant-*` selectors as part of the antd-removal effort.

## Implementation notes

- **`readOnly` disables the input** — `readOnly || disabled` is passed to the native input's `disabled` and to `Dropdown`'s `disabled` (so the popover never opens). `readOnly` additionally applies white-background/auto-cursor styling via `ComponentWrapper`.
- **Icon count adjusts input padding** — When icons are present, `NativeInput` adds right-padding `getIconsWidth(iconCount)` so the value never overlaps the icons. Clicking the icons focuses the input (`handleIconsClick`).
- **Controlled visibility** — `open` + `onDropdownVisibleChange` map directly to `ds-dropdown`'s `open`/`onOpenChange`. When `open` is omitted, internal state drives it; focus/typing/click **opens** (never toggles), select/Escape/outside-click closes. Opening is idempotent (each handler only calls `setOpen(true)` when closed), so no single interaction can open-then-close.
- **Keyboard nav** — delegated to `@synerise/ds-dropdown`'s floating-ui list navigation (not a local `activeIndex`). ArrowDown/Up move DOM focus through the `ListItem`s; the focused item selects on Enter/click via ds-list-item's own keydown. `defaultActiveFirstOption` (default `true`) adds an input-level Enter handler that selects the first enabled option when Enter is pressed before arrow-navigating (once focus is on an item, that handler no longer fires — no double-select).
- **Options precedence** — the `options` prop wins; only when it's empty/absent are `<Autocomplete.Option>` children parsed (`getOptionsFromChildren`).
- **`handleInputRef` is native now** — receives `MutableRefObject<AutocompleteInputHandle | null>` where `AutocompleteInputHandle = { focus, blur, input }`, replacing the antd `RefSelectProps`.
- **`autoResize`** — `useAutosizeWidth` writes the content-box width onto the `<input>`; `useStretchToFit` clamps `max-width` to the wrapper when `stretchToFit` is set (capturing/restoring `scrollLeft`). `AUTOSIZE_EXTRA_WIDTH = 27` (+ icon width) is the `extraWidth`.
- **`getPopupContainer` defaults to parent node** — `getParentNode` mounts the dropdown as a sibling of the trigger (not `document.body`), avoiding z-index stacking issues.
- **No `@floating-ui/react` import** — refs are merged with a small local callback (the package does not depend on `@floating-ui/react`).
