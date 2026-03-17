# Autocomplete (`@synerise/ds-autocomplete`)

> Ant Design `AutoComplete` wrapper that adds a `FormField` label/error/description layer, optional icon slots, `readOnly` mode, and auto-resize behaviour.

## Package structure

```
src/
  Autocomplete.tsx        — main component
  Autocomplete.types.ts   — AutocompleteProps, OverrideProps
  Autocomplete.styles.ts  — AutocompleteWrapper, ComponentWrapper, IconWrapper
  Autocomplete.const.ts   — ICON_WIDTH (24), ICON_GAP (4), ICON_OFFSET (8)
  index.ts                — exports default + AutocompleteProps type
  utils/
    getIconsWidth.ts      — calculates right-padding offset for 1–2 icons
  style/
    index.less            — global Ant Design overrides for the dropdown
    autocomplete.mixin.less
  __specs__/
    Autocomplete.spec.tsx — Vitest tests
```

## Public exports

### `Autocomplete` (default)

Wraps `antd/lib/auto-complete`. Props:

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
| `handleInputRef` | `(ref: MutableRefObject<RefSelectProps \| null>) => void` | `undefined` | Callback to receive the internal Ant Design Select ref |
| `autoResize` | `AutoResizeProp` | `undefined` | Resizes input width to text content (see below) |
| `getPopupContainer` | `(node: HTMLElement) => HTMLElement` | parent node | Container for the dropdown; defaults to `triggerNode.parentNode` (not `document.body`) |
| `icon1` | `ReactNode` | `undefined` | First icon rendered at the right end of the input |
| `icon1Tooltip` | `ReactNode` | `undefined` | Tooltip for `icon1` |
| `icon2` | `ReactNode` | `undefined` | Second icon rendered at the right end of the input |
| `icon2Tooltip` | `ReactNode` | `undefined` | Tooltip for `icon2` |

All other props are forwarded to `AntdAutoComplete`. The following Ant Design props are **omitted** from the API: `tagRender`, `fieldNames`, `filterSort`, `filterOption`, `tokenSeparators`, `transitionName`, `showArrow`, `animation`, `searchValue`, `listItemHeight`, `menuItemSelectedIcon`, `maxTagCount`, `maxTagPlaceholder`, `maxTagTextLength`, `backfill`, `bordered`, `choiceTransitionName`, `showSearch`.

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

Re-exported directly from `AntdAutoComplete.Option`. Use to define dropdown items declaratively via children.

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

// Accessing the Select ref
<Autocomplete
  handleInputRef={(ref) => { selectRef.current = ref.current; }}
  options={options}
/>

// Declarative options via Option
<Autocomplete>
  <Autocomplete.Option value="foo">Foo</Autocomplete.Option>
  <Autocomplete.Option value="bar">Bar</Autocomplete.Option>
</Autocomplete>
```

## Styling

Styles live in `Autocomplete.styles.ts`. Uses `@synerise/ds-core` theme palette tokens (`blue-600`, `blue-050`, `red-600`, `red-050`, `grey-600`, `grey-700`, `white`). No hardcoded colour values.

Three styled components:
- `AutocompleteWrapper` — outermost `div`; handles `autoResize` width and imports `autoresizeConfObjToCss` from `ds-input`.
- `ComponentWrapper` — wraps the Ant Design select; applies `error`, `readOnly`, and icon-offset states. Uses `&&& {}` specificity override to beat Ant Design selectors.
- `IconWrapper` — absolutely positioned container for `icon1`/`icon2`; positioned `right: 8px`, vertically centred, `z-index: 5`.

The dropdown gets class `ds-autocomplete-dropdown ps__child--consume` (PerfectScrollbar integration).

## Key dependencies

- `antd/lib/auto-complete` — base component being wrapped
- `@synerise/ds-form-field` — provides label, description, error, tooltip layout
- `@synerise/ds-input` — provides `AutosizeWrapper`, `AutosizeInputRefType`, `autoresizeConfObjToCss`
- `@synerise/ds-tooltip` — wraps `icon1`/`icon2` when tooltip props are provided
- `@synerise/ds-utils` — `useResizeObserver` for `stretchToFit` behaviour

## Implementation notes

- **`readOnly` disables the input** — `readOnly` is forwarded as `disabled` to `AntdAutoComplete`. There is no native `readOnly` on Ant Design's Select; the prop only controls styling (white background, auto cursor) via `ComponentWrapper`.
- **Icon count adjusts input padding** — When icons are present, `ComponentWrapper` overrides `.ant-select-selection-search { right: N }` to prevent text from overlapping icons. The offset is computed by `getIconsWidth(iconCount)`.
- **`autoResize` uses three refs** — `elementRef` (wrapper), `autosizeRef` (AutosizeWrapper), `autocompleteInputRef` (inner input wrapper), and `inputRef` (native `<input>`). The autosize chain is: `preAutosize` → clears `max-width` and captures `scrollLeft` → `onAutosize` → sets new `max-width` and restores scroll position.
- **`getPopupContainer` defaults to parent node** — unlike vanilla Ant Design (which defaults to `document.body`), this component mounts the dropdown as a sibling of the input by default, avoiding z-index stacking issues.
- **`AUTOSIZE_EXTRA_WIDTH = 27`** — added to the base icon offset in `AutosizeWrapper.extraWidth` to account for internal Ant Design padding.
