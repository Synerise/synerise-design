# Factors (`@synerise/ds-factors`)

> A polymorphic input component that renders different input UIs based on a selected factor type (text, number, date, parameter, etc.) with an optional type-switcher dropdown.

## Package structure

```
src/
  Factors.tsx                     — main component; defines FACTOR_TYPE_MAPPING
  Factors.types.ts                — all types (FactorsProps, FactorsTexts, value types, etc.)
  index.ts                        — public exports
  style/
    Factors.style.ts              — Group wrapper styled component
  hooks/
    useTexts.tsx                  — merges user texts with react-intl defaults
  FactorTypeSelector/
    FactorTypeSelector.tsx        — dropdown to switch between factor types
    FactorTypeSelector.styles.ts  — type selector button styles
  FactorValue/
    FactorValue.tsx               — dispatcher that renders the correct input component
    FactorValue.style.ts          — input wrapper styles
    Text/                         — text input (default, expansible-modal, autocomplete modes)
    Number/                       — number input via @synerise/ds-input-number
    Parameter/                    — parameter selector with grouped/search/virtualized list
    DynamicKey/                   — two-field key-value input
    Formula/                      — formula editor trigger + modal
    Date/                         — date picker via @synerise/ds-date-picker
    DateRange/                    — date range picker via @synerise/ds-date-range-picker
    RelativeDate/                 — relative date selector (offset + unit + before/after)
    Array/                        — array editor with creator, raw paste, and collector modes
  __specs__/
    Factors.spec.tsx              — Vitest tests
    Factors.array.spec.tsx        — Vitest tests for array type
```

## Public exports

### `Factors` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedFactorType` | `FactorType` | — | **Required.** Currently active factor type |
| `onChangeValue` | `(value: FactorValueType) => void` | — | **Required.** Called when the value changes |
| `value` | `FactorValueType` | — | **Required.** Current value |
| `defaultFactorType` | `FactorType` | `'text'` | Fallback type used when `selectedFactorType` is undefined or unrecognised |
| `setSelectedFactorType` | `(factor: FactorType) => void` | `NOOP` | Called when user picks a new type from the selector |
| `textType` | `'default' \| 'expansible' \| 'autocomplete'` | `'default'` | Variant of the text input |
| `allowClear` | `boolean` | `true` | Shows clear button on inputs that support it |
| `withoutTypeSelector` | `boolean` | `false` | Hides the type-switcher dropdown |
| `uncontrolledComponent` | `boolean` | `false` | Sub-components manage their own open/close state internally |
| `error` | `boolean` | — | Shows error styling on the input |
| `errorText` | `ReactNode` | — | Error message (usage depends on the input type) |
| `unavailableFactorTypes` | `FactorType[]` | — | Types to exclude from the switcher |
| `availableFactorTypes` | `FactorType[]` | — | Explicit allowlist of types to show in the switcher |
| `customFactorValueComponents` | `Partial<FactorTypeMapping>` | — | Override `component`, `name`, or `icon` for any built-in factor type |
| `factorValueExtraProps` | `Partial<ExtraPropsMapping>` | — | Pass extra icon/tooltip props to `text` or `dynamicKey` inputs |
| `getPopupContainerOverride` | `(trigger: HTMLElement \| null) => HTMLElement` | — | Overrides popup container for child dropdowns/tooltips |
| `onActivate` | `() => void` | — | Called when the input opens/focuses |
| `onDeactivate` | `() => void` | — | Called when the input closes/blurs |
| `opened` | `boolean` | — | Externally controls whether the dropdown/modal is open |
| `loading` | `boolean` | — | Shows loading state in the input |
| `preventAutoloadData` | `boolean` | — | Prevents auto-fetching data in parameter input |
| `arrayProps` | `{ itemType?: 'string' \| 'number'; limit?: number; collectorSuggestions?: CollectorValue[] }` | — | Configuration for the array factor type |
| `autoResize` | `AutoResizeProp` | — | Auto-resize behaviour for text inputs |
| `relativeDateProps` | `{ triggerValueFormatter?: (value) => string; availableUnits?: RelativeDateUnit[] }` | — | Customise relative date display and available units |
| `autocompleteText` | `{ options: string[] }` | — | Autocomplete suggestions (used when `textType='autocomplete'`) |
| `parameters` | See below | — | Configuration for `parameter` / `contextParameter` types |
| `onParamsClick` | `() => void` | — | Called when the parameter button is clicked (alternative to full parameter dropdown) |
| `formulaEditor` | `ReactNode` | — | Content rendered inside the formula editor modal |
| `texts` | `DeepPartial<FactorsTexts>` | — | Override any subset of i18n strings |
| `factorKey` | `ReactText` | — | Unique key for the factor instance; used to reset state on remount |
| `inputProps` | `Partial<Omit<InputProps, 'value' \| 'onChange' \| ...>>` | — | Extra props forwarded to text inputs |
| `readOnly` | `boolean` | — | Disables all interaction |

#### `parameters` shape

| Field | Type | Description |
|-------|------|-------------|
| `buttonLabel` | `ReactNode` | Label shown on the parameter trigger button |
| `buttonIcon` | `ReactNode` | Icon shown on the trigger button |
| `items` | `ParameterItem[]` | Full list of selectable parameters |
| `groups` | `ParameterGroup[]` | Group definitions for grouping items |
| `recentItems` | `ParameterItem[]` | Items shown at the top as recently used |
| `selectedButtonColored` | `boolean` | Apply accent colour to the button when a value is selected |
| `renderEmptyGroups` | `boolean` | Show group headers even if the group has no items |
| `showAllGroup` | `boolean` | **@deprecated** |
| `dropdownDimensionsConfig` | `{ defaultHeight?, lowerHeight?, threshold? }` | Override dropdown height at different viewport sizes |

### `factorTypes`

The built-in `FACTOR_TYPE_MAPPING` exported as a named value. Maps each `DefinedFactorTypes` key to `{ name, icon, component }`. Use alongside `customFactorValueComponents` to extend or inspect defaults.

### Types exported

| Export | Description |
|--------|-------------|
| `ALL_FACTOR_TYPES` | Readonly tuple of all 10 type strings |
| `FactorType` | `LiteralStringUnion` of the 10 types (accepts custom strings) |
| `DefinedFactorTypes` | Strict union of the 10 built-in type strings |
| `FactorValueType` | Union of all possible value types |
| `FactorsProps` | Full props interface |
| `FactorsTexts` | Full texts interface |
| `ParameterValueType` | Shape of a selected parameter value |
| `ParameterItem` | Shape of an item in the parameter list |
| `ParameterGroup` | Shape of a parameter group |
| `FactorValueComponentProps` | Props received by each factor-value component |
| `InputProps` | **@deprecated** alias for `FactorValueComponentProps` |
| `FactorValueType` | All possible value shapes |
| `DynamicKeyValueType` | `{ key: ReactText; value: ReactText }` |
| `FormulaValueType` | `{ name: string; value: string }` |
| `SelectedFactorType` | `{ name, icon, component }` — one entry from the type mapping |
| `FactorTypeSelectorProps`, `FormulaModalProps`, `TextModalProps`, `ParameterDropdownProps` | Internal component props (for extensibility) |

## Usage patterns

```tsx
import Factors from '@synerise/ds-factors';
import type { FactorType, FactorValueType } from '@synerise/ds-factors';

const [factorType, setFactorType] = useState<FactorType>('text');
const [value, setValue] = useState<FactorValueType>('');

<Factors
  selectedFactorType={factorType}
  setSelectedFactorType={setFactorType}
  defaultFactorType="text"
  value={value}
  onChangeValue={setValue}
/>

// Without type selector
<Factors
  selectedFactorType="number"
  defaultFactorType="number"
  withoutTypeSelector
  value={42}
  onChangeValue={setValue}
/>

// Array type with limit
<Factors
  selectedFactorType="array"
  defaultFactorType="array"
  value={['a', 'b']}
  onChangeValue={setValue}
  arrayProps={{ itemType: 'string', limit: 10 }}
/>

// Custom factor component override
import { factorTypes } from '@synerise/ds-factors';
<Factors
  selectedFactorType="text"
  defaultFactorType="text"
  value=""
  onChangeValue={setValue}
  customFactorValueComponents={{
    text: { ...factorTypes.text, component: MyCustomTextInput },
  }}
/>
```

## Custom hooks

### `useTexts`

Merges the user-provided `texts` (any `DeepPartial<FactorsTexts>`) with react-intl defaults using `lodash.merge`. Returns a complete `FactorsTexts` object. All default strings come from `DS.FACTORS.*` intl message IDs. Requires an `IntlProvider` ancestor.

## Styling

Styles are minimal — the outer `Group` wrapper uses `@synerise/ds-input` group primitives. Individual factor value components each have their own styles files. All use `@synerise/ds-core` theme tokens; no hardcoded colours.

## Key dependencies

- `@synerise/ds-input` — text and number inputs
- `@synerise/ds-date-picker` / `@synerise/ds-date-range-picker` — date/dateRange types
- `@synerise/ds-collector` — multi-value entry in the array editor
- `@synerise/ds-autocomplete` — text type with `textType='autocomplete'`
- `@synerise/ds-information-card` — optional info card on parameter items
- `react-window` — virtualized list in the parameter dropdown
- `react-intl` — i18n for all default text strings

## Implementation notes

- **`FactorType` vs `DefinedFactorTypes`**: `FactorType` is a `LiteralStringUnion` that accepts any string (for custom types). `DefinedFactorTypes` is the strict union of the 10 built-in types. If `selectedFactorType` is not in `FACTOR_TYPE_MAPPING`, the component silently falls back to `defaultFactorType` (default `'text'`).
- **`customFactorValueComponents` merging**: Custom entries are shallowly merged with `FACTOR_TYPE_MAPPING` entries — you can override only `component`, `name`, or `icon` independently.
- **`parameter` vs `contextParameter`**: Both use the same `ParameterInput` component. The distinction is semantic and controlled by the consumer.
- **`uncontrolledComponent`**: When `true`, each sub-component manages its own open state. When `false` (default), the parent controls open state via the `opened` prop.
- **Array raw mode**: Backtick-wrapped items (`` `value` ``) are treated as single units containing commas. Numeric arrays validate each item on paste.
- **`parameters.showAllGroup`** is `@deprecated` — do not use.
- **`InputProps` export** is `@deprecated** — use `FactorValueComponentProps` instead.
- **`react-intl` is a peer dependency** — component throws at runtime without an `IntlProvider` ancestor.
- **Vitest**: This package uses Vitest (not Jest) — `vitest.config.ts` is present.
