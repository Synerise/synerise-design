# FormatPicker (`@synerise/ds-format-picker`)

> A dropdown button that opens a number-format settings panel — lets users choose between numeric / percent / cash formats, a currency, decimal places, 1000-separator, and compact notation.

## Package structure

```
src/
  FormatPicker.tsx              — main component; trigger button + Dropdown shell
  FomartPicker.types.ts         — all types (NOTE: filename typo: Fomart vs Format)
  index.ts                      — public exports
  FormatSettings/
    FormatSettings.tsx          — dropdown overlay: format buttons, currency picker, checkboxes, footer
    FormatSettings.types.ts     — FormatSettingsProps (internal)
    FormatSettings.styles.ts    — all styled components for the settings panel
  __specs__/
    FormatPicker.spec.tsx       — Jest tests (render + open + currency change)
```

## Public exports

### `FormatPicker` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `format` | `FormattingValue` | — (required) | Current format configuration |
| `value` | `number` | — (required) | Example number rendered in the trigger button label |
| `onDataFormatChange` | `(format: FormattingDataFormat) => void` | — (required) | Called when the user selects numeric / percent / cash |
| `onCurrencyChange` | `(currency: CurrencyType) => void` | — (required) | Called when a currency is selected from the dropdown |
| `onUseSeparatorChange` | `(useSeparator: boolean) => void` | — (required) | Called when the 1000-separator checkbox changes |
| `onCompactNumbersChange` | `(useCompact: boolean) => void` | — (required) | Called when the compact numbers checkbox changes |
| `onFixedLengthChange` | `(fixedLength: number) => void` | — (required) | Called when decimal places are incremented/decremented |
| `onSetDefault` | `() => void` | — | If provided, renders a "Set default" footer button |
| `onFormattedValueChange` | `(formattedValue: string) => void` | — | Called (via `useEffect`) whenever the formatted display value changes |
| `text` | `Partial<FormatPickerTexts>` | see defaults below | Override any label text |
| `currenciesConfig` | `CurrencyConfig[]` | USD, EUR, PLN, JPY | Custom currency list shown in the cash dropdown |
| `buttonType` | `string` | `'tertiary'` | Ant Design / DS button type for the trigger button |
| `disabled` | `boolean` | — | Disables the trigger button and all controls inside the panel |
| `maxFixedLength` | `number` | — | Upper bound for decimal places (increment is blocked when reached) |

### `FormatPickerProps`

Type re-export for consumers that need to type props.

### `FormattingValue`

Shape of the `format` prop:

| Field | Type | Description |
|-------|------|-------------|
| `dataFormat` | `FormattingDataFormat` | `'numeric' \| 'percent' \| 'cash'` |
| `currency` | `CurrencyType` | Currency code string (e.g. `'USD'`) |
| `useSeparator` | `boolean` | Whether to use 1000 grouping separator |
| `compactNumbers` | `boolean` | Whether to use compact notation |
| `fixedLength` | `number` | Number of decimal places |

### `FormatPickerTexts` (i18n defaults)

All fields are `ReactNode` except `currencyMenuItemPrefix` which is `string`.

| Key | Default |
|-----|---------|
| `header` | `'Number format'` |
| `format` | `'Format'` |
| `numeric` | `'Numeric'` |
| `cash` | `'Cash'` |
| `percentage` | `'Percentage'` |
| `setDefault` | `'Set default'` |
| `useSeparator` | `'Use 1000 separator'` |
| `compactNumbers` | `'Use compact numbers'` |
| `currencyMenuItemPrefix` | `'e.g.'` |

### `CurrencyConfig`

`{ currency: CurrencyType; label: string }` — shape of entries in `currenciesConfig`.

## Usage patterns

```tsx
import FormatPicker from '@synerise/ds-format-picker';
import type { FormattingValue } from '@synerise/ds-format-picker';

const [format, setFormat] = useState<FormattingValue>({
  dataFormat: 'numeric',
  currency: 'USD',
  useSeparator: false,
  compactNumbers: false,
  fixedLength: 2,
});

<FormatPicker
  format={format}
  value={19000.7}
  onDataFormatChange={(dataFormat) => setFormat((f) => ({ ...f, dataFormat }))}
  onCurrencyChange={(currency) => setFormat((f) => ({ ...f, currency }))}
  onUseSeparatorChange={(useSeparator) => setFormat((f) => ({ ...f, useSeparator }))}
  onCompactNumbersChange={(compactNumbers) => setFormat((f) => ({ ...f, compactNumbers }))}
  onFixedLengthChange={(fixedLength) => setFormat((f) => ({ ...f, fixedLength }))}
  onSetDefault={() => setFormat(defaultFormat)}
/>
```

## Styling

`FormatSettings.styles.ts` — all styles for the dropdown panel. Uses `theme.palette` tokens (`white`, `grey-050`, `grey-100`, `grey-300`, `grey-500`, `grey-700`). Hardcoded `min-width: 268px` for the panel container.

> **Note:** `SuffixWrapper` is imported from `@synerise/ds-list-item/dist/components/Text/Text.styles` — a fragile deep/internal path.

## Key dependencies

- `@synerise/ds-dropdown` — wraps the whole component as a click-triggered dropdown overlay
- `@synerise/ds-core` (`useDataFormat`) — `formatValue` utility that applies `NumberToFormatOptions`; requires `DSProvider` in the tree
- `react-intl` — i18n for all labels; requires `IntlProvider` (supplied by `DSProvider`)
- `@synerise/ds-button` + `@synerise/ds-button-group` — format-type buttons and decimal-place controls
- `@synerise/ds-checkbox` — separator and compact-numbers checkboxes
- `@synerise/ds-radio` — wraps the button-group for format-type selection (value binding)
- `@synerise/ds-list-item` — currency dropdown rows

## Implementation notes

- **Trigger button label** is always `"{texts.format} {getFormattedValue()}"` — e.g. `"Format 19,000.70"`. The `value` prop is purely for display.
- **`onFormattedValueChange`** fires via `useEffect` on every change to `format` or `value`; it is not fired on user interaction directly.
- **`onSetDefault` is optional** — when omitted, the footer (grey bar with "Set default" button) is not rendered at all.
- **`currenciesConfig` default** is `DEFAULT_CURRENCIES_CONFIG` defined in `FormatSettings.tsx`: USD, EUR, PLN, JPY. Not exported.
- **`CurrencyType` is typed as `string`** (not a union of specific codes). The README's `USD | EUR | PLN | JPY` is only the default config list, not a type constraint.
- **Filename typo** — the types file is `FomartPicker.types.ts` (missing `t`). The import in `index.ts` matches the typo, so it works, but it should be fixed.
- **Test runner is Jest** (not Vitest).
