# Operators (`@synerise/ds-operators`)

> A dropdown button that lets users choose a logical operator (e.g. Equal, More than) from a grouped, searchable list.

## Package structure

```
src/
  Operators.tsx                               — main component; trigger button + Dropdown
  Operator.types.ts                           — OperatorsProps, OperatorsItem, OperatorsGroup, OperatorsDropdownProps, OperatorTexts
  Operators.style.ts                          — styled components
  index.ts                                    — public exports
  OperatorsDropdown/
    OperatorsDropdown.tsx                     — dropdown overlay: tabs (one per group), search, scrollable item list
    OperatorsDropdownGroupName.tsx            — group heading row
    OperatorsDropdownItem.tsx                 — individual operator row
  utils/
    groupByGroupName.ts                       — groups items by their groupName field
  constants.ts                                — DROPDOWN_HEIGHT, SEARCH_HEIGHT, TABS_HEIGHT, etc.
  __specs__/
    Operators.spec.tsx                        — Jest tests
```

## Public exports

### `Operators` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `OperatorsItem[]` | — (required) | All available operators |
| `groups` | `OperatorsGroup[]` | — (required) | Group definitions shown as tabs in the dropdown |
| `onChange` | `(item: OperatorsItem \| undefined) => void` | — (required) | Called when user selects an operator (or clears it) |
| `value` | `OperatorsItem \| undefined` | `undefined` | Currently selected operator |
| `texts` | `Partial<OperatorTexts>` | see defaults | i18n overrides |
| `opened` | `boolean` | `false` | Controlled open state; synced via `useEffect` |
| `onActivate` | `() => void` | — | Called when dropdown opens |
| `onDeactivate` | `() => void` | — | Called when dropdown closes (via `onDismiss`) |
| `readOnly` | `boolean` | `false` | Disables the dropdown; shows selected value without open arrow |
| `errorText` | `ReactNode` | — | Puts the trigger button in error state; the text is not rendered |
| `getPopupContainerOverride` | `(trigger: HTMLElement \| null) => HTMLElement` | `getPopupContainer` | Overrides popup container for nested dropdowns/tooltips |
| `dropdownDimensionsConfig` | `{ defaultHeight?, lowerHeight?, threshold? }` | see constants | Override responsive height thresholds |

### `OperatorsProps`

Full props type re-export.

### `OperatorsGroup`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ReactText` | Unique identifier |
| `name` | `string` | Group label (shown as tab) |
| `icon` | `ReactNode` | Tab icon |
| `tooltip` | `string` | Hover tooltip on the tab |
| `defaultGroup` | `boolean` | Whether this is the pre-selected tab |
| `itemType` | `string` | — |
| `subGroups` | `OperatorsGroup[]` | Nested group definitions |

### `OperatorsItem`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ReactText` | Unique identifier |
| `name` | `string` | Display name |
| `icon` | `ReactNode` | Operator icon |
| `groupId` | `ReactText` | Links this item to its `OperatorsGroup.id` |
| `group` | `string` | Group key string (redundant with `groupId`) |
| `groupName` | `string` | Displayed group heading in the item list |
| `logic` | `string` | Logic operator code (e.g. `'EQUAL'`) |
| `value` | `string` | Arbitrary value string |
| `subGroups` | `OperatorsGroup[]` | — |

### `OperatorTexts` (i18n defaults)

| Key | Default |
|-----|---------|
| `buttonLabel` | `'Choose'` |
| `searchPlaceholder` | `'Search'` |
| `noResults` | `'No results'` |

## Usage patterns

```tsx
import Operators from '@synerise/ds-operators';
import type { OperatorsItem, OperatorsGroup } from '@synerise/ds-operators';

<Operators
  groups={groups}
  items={items}
  value={selectedOperator}
  onChange={(item) => setSelectedOperator(item)}
  texts={{ buttonLabel: 'Choose operator' }}
/>
```

## Styling

`Operators.style.ts` — minimal; most styles are in `OperatorsDropdown`. Uses `theme.palette` tokens. The `ItemsList` styled component has a typo: `backgorund` instead of `background` — silently ignored by browsers.

## Key dependencies

- `@synerise/ds-dropdown` — wraps the operator list as a click-triggered dropdown overlay
- `@synerise/ds-tabs` — renders one tab per group in the dropdown header
- `@synerise/ds-scrollbar` — scrollable item list inside the dropdown
- `@synerise/ds-result` — empty/no-results state inside the dropdown
- `react-intl` — i18n for default text values; requires `IntlProvider` in the tree
- `uuid` — generates unique keys for group items

## Implementation notes

- **`onChange` type vs README** — the README documents `(item: OperatorsItem | OperatorsGroup | undefined) => void` but the actual TS type is `(item: OperatorsItem | undefined) => void`. The internal `handleChange` filters out `OperatorsGroup` values before calling `onChange`.
- **`onActivate` signature vs README** — README says `(fieldType: string) => void`; actual type is `() => void`.
- **`error` vs `errorText`** — README documents an `error: boolean` prop that does not exist; the real prop is `errorText: ReactNode` which puts the button in error state.
- **Undocumented props** — `readOnly`, `errorText`, `dropdownDimensionsConfig` are all missing from the README.
- **Responsive height** — viewport height is checked on mount and resize; `defaultHeight=420` is used when `window.innerHeight >= 900`, `lowerHeight=350` otherwise.
- **Test runner is Jest** (not Vitest).
