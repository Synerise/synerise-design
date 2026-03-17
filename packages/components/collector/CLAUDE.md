# Collector (`@synerise/ds-collector`)

> Tag-input / multi-value picker with a filterable suggestions dropdown, paste-splitting, keyboard navigation, confirm/cancel buttons, and an optional item counter — all in a single focusable field.

## Package structure

```
src/
  Collector.tsx                 — main component; attaches sub-components as static props
  Collector.types.ts            — CollectorProps, CollectorValue, CollectorTexts, LookupConfig, CollectorValuesSeparator
  Collector.styles.ts           — styled components (Container, CollectorInput, MainContent, etc.)
  utils.ts                      — filterValueSuggestions, isOverflown, scrollWithHorizontalArrow, filterOut* helpers
  index.ts                      — public exports
  hooks/
    useTranslations.tsx         — merges default i18n strings with consumer-provided texts
  Elements/
    ButtonPanel/                — add/cancel button row (right side of input)
    OptionsDropdown/            — floating dropdown with filtered suggestions
    NavigationHint/             — keyboard navigation tip rendered at bottom of dropdown
    Values/                     — list of selected tag chips inside the input
```

## Public exports

### `Collector` (default)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `CollectorValue[]` | _(required)_ | Currently selected items shown as chips. |
| `suggestions` | `CollectorValue[]` | _(required)_ | Full list of available options shown in the dropdown. |
| `onItemSelect` | `(item: CollectorValue) => void` | _(required)_ | Called when user selects an item from the dropdown. |
| `onItemAdd` | `(itemName: string \| number) => CollectorValue` | `undefined` | Factory for creating a new `CollectorValue` from a typed string. Required for `allowCustomValue` and `allowMultipleValues` to work. |
| `onConfirm` | `(values: CollectorValue[]) => void` | `undefined` | Called when user clicks Add or presses Enter with selected values. |
| `onCancel` | `() => void` | `undefined` | Called when user clicks Cancel. |
| `onItemDeselect` | `(item: CollectorValue) => void` | `undefined` | Called when a chip is removed. |
| `onMultipleItemsSelect` | `(items: CollectorValue[]) => void` | `undefined` | Called after a paste that produces multiple items. |
| `onSearchValueChange` | `(value: string) => void` | `undefined` | Called on every input keystroke (for controlled search). |
| `allowMultipleValues` | `boolean` | `undefined` | Enables multi-chip mode (chips shown, `selected` array managed externally). |
| `allowCustomValue` | `boolean` | `undefined` | Allows typing values not in `suggestions`. |
| `allowPaste` | `boolean` | `undefined` | Enables paste-splitting: pasted text containing the separator is auto-split into multiple items. |
| `valuesSeparator` | `CollectorValuesSeparator` | `';'` | Delimiter for paste-splitting. One of `';'` / `','` / `'|'`. |
| `valuesEscapeOpenTag` | `string` | `'```'` | Opening escape tag — text wrapped in open+close tags is treated as a literal value (separator inside is ignored). |
| `valuesEscapeCloseTag` | `string` | `'```'` | Closing escape tag. |
| `searchValue` | `string` | `undefined` | Controlled input value. |
| `texts` | `Partial<CollectorTexts>` | `undefined` | Override i18n strings. |
| `label` | `ReactNode` | `undefined` | Label rendered above the input. |
| `description` | `ReactNode` | `undefined` | Helper text rendered below the input. |
| `error` | `boolean` | `undefined` | Puts the input in error state (red border) without a message. |
| `errorText` | `ReactNode` | `undefined` | Error message; also activates error state. |
| `disabled` | `boolean` | `undefined` | Disables the entire component. |
| `disableSearch` | `boolean` | `undefined` | Hides the text input (values/chips still work). |
| `disableButtonPanel` | `boolean` | `undefined` | Hides the Add/Cancel button row on the right side. |
| `fixedHeight` | `boolean` | `undefined` | Input area stays a fixed height with horizontal scroll instead of growing. |
| `showCount` | `boolean` | `undefined` | Displays "N Item(s)" counter above the input. |
| `showNavigationHints` | `boolean` | `undefined` | Shows keyboard navigation hint (↑↓ / Enter) at the bottom of the dropdown. |
| `keepSearchQueryOnSelect` | `boolean` | `undefined` | Preserves the typed query after an item is selected from the dropdown. |
| `enableCustomFilteringSuggestions` | `boolean` | `undefined` | Disables internal suggestion filtering — consumer must update `suggestions` externally in response to `onSearchValueChange`. |
| `lookupConfig` | `LookupConfig` | `{ filter: 'text', display: 'text' }` | Keys to use for filtering (`filter`) and display (`display`) on `CollectorValue` objects. |
| `addButtonProps` | `Partial<ButtonProps & DataAttributes>` | `undefined` | Extra props merged onto the Add button (e.g. `data-*` attributes). `disabled` is auto-managed. |
| `cancelButtonProps` | `Partial<ButtonProps & DataAttributes>` | `undefined` | Extra props merged onto the Cancel button. |
| `buttonPanelPrefix` | `ReactNode` | `undefined` | Content rendered to the left of the Add/Cancel buttons. |
| `dropdownContent` | `ReactNode` | `undefined` | Replaces the default suggestion list with custom content. |
| `dropdownItemHeight` | `'large'` | `undefined` | Increases the height of dropdown list items. |
| `renderItem` | `(value: CollectorValue) => JSX.Element` | `undefined` | Custom renderer for each suggestion item. |
| `listHeader` | `ReactNode` | `undefined` | Content rendered at the top of the dropdown list. |
| `hideDropdownOnClickOutside` | `boolean` | `true` | Closes the dropdown when user clicks outside the component. |
| `className` | `string` | `undefined` | Extra class on the inner `CollectorInput` element (always includes `ds-collector`). |
| `scrollbarProps` | `ScrollbarAdditionalProps` | `undefined` | Defined in types but currently not passed to any rendered element. |

### Static sub-components

`Collector.Values`, `Collector.ButtonPanel`, `Collector.OptionsDropdown`, `Collector.NavigationHint` are attached to the default export. These are internal elements exposed for advanced composition — not intended for standalone use outside a `Collector`.

### Types (exported)

| Export | Description |
|--------|-------------|
| `CollectorProps` | Full props interface |
| `CollectorValue` | `{ [key: string]: any }` — arbitrary object used as item data |
| `CollectorTexts` | Shape of the `texts` override object |
| `CollectorValuesSeparator` | `';' \| ',' \| '\|'` |

## Custom hooks

### `useTranslations`

Merges consumer-provided `Partial<CollectorTexts>` with `react-intl` defaults. Returns a complete `CollectorTexts` object. Calls `useIntl()` unconditionally — `IntlProvider` must be present in the tree.

i18n defaults: `add` = "Add", `cancel` = "Cancel", `placeholder` = "Type value", `toNavigate` = "to navigate", `toSelect` = "to select".

## Usage patterns

```tsx
import Collector, { type CollectorValue } from '@synerise/ds-collector';

const [selected, setSelected] = useState<CollectorValue[]>([]);

<Collector
  selected={selected}
  suggestions={[{ text: 'Option A' }, { text: 'Option B' }]}
  onItemSelect={(item) => setSelected(prev => [...prev, item])}
  onItemDeselect={(item) => setSelected(prev => prev.filter(v => v !== item))}
  onItemAdd={(name) => ({ text: name })}
  onConfirm={(values) => console.log(values)}
  allowMultipleValues
  allowCustomValue
  texts={{ add: 'Add', cancel: 'Cancel', placeholder: 'Type to search…' }}
/>
```

## Key dependencies

- `copy-to-clipboard` — not used here; see `@synerise/ds-copy-icon`
- `@synerise/ds-utils` `useOnClickOutside`, `focusWithArrowKeys`, `useDelimiterEscape` — click-outside dismissal, arrow-key focus, separator escape logic
- `@synerise/ds-scrollbar` — wraps the values area in non-fixed-height mode
- `lodash.isequal` — deep comparison when filtering already-selected items from suggestions
- `react-intl` (peer dep) — default tooltip/label strings via `useTranslations`

## Implementation notes

- **`selected`, `suggestions`, `onItemSelect` are required** (no `?` in types) — TypeScript will error if omitted.
- **`useIntl()` is called unconditionally** in `useTranslations` — an `IntlProvider` must exist in the tree even when `texts` fully overrides all strings.
- **Separator auto-split on keyUp** — when the typed value contains `valuesSeparator` (and is not wrapped in escape tags), `handleKeyUp` splits the input into multiple items automatically. Pressing `;` (default) mid-word commits the preceding token.
- **Paste splitting** requires both `allowMultipleValues` and `allowPaste` to be true — paste events containing the separator are split and passed to `onMultipleItemsSelect`.
- **Escape tag** — wrapping a value in `` ``` … ``` `` (defaults) prevents separator-based splitting. The open tag prefix is stripped before the item is created.
- **`enableCustomFilteringSuggestions`** — when `true`, internal filtering is disabled. The consumer is responsible for updating `suggestions` via `onSearchValueChange`. When `false` (default), the component filters `suggestions` by the typed value internally.
- **`lookupConfig` defaults** — if not provided, the component uses `'text'` for both filter and display keys. `CollectorValue` objects must have a `text` field for default behaviour to work.
- **`scrollbarProps` is a no-op** — it is declared in `CollectorProps` but never destructured or passed to any element in the current implementation.
- **`isAddActive`** — the Add button is enabled only when `selected.length > 0` or `canCreateItemFromValue()` returns `true`. `canCreateItemFromValue` checks `allowCustomValue || suggestionsIncludesItem(value)`.
- **Backspace removes last chip** — in `allowMultipleValues` mode with an empty input and at least one selected item, Backspace calls `onItemDeselect` on the last element of the `selected` array (via direct `.pop()` mutation — a side effect on the consumer's array).
