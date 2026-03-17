# InputNumber (`@synerise/ds-input-number`)

> Locale-aware numeric input that wraps Ant Design `InputNumber` with form-field layout (label, tooltip, description, error text), autosize support, and locale-driven thousand/decimal formatting.

## Package structure

```
src/
  InputNumber.tsx                — main component
  InputNumber.types.ts           — InputNumberProps, deprecated Props alias
  InputNumber.styles.tsx         — styled-components (InputNumberContainer, AntdInputNumber, etc.)
  index.ts                       — public exports
  constants/
    inputNumber.constants.ts     — MAXIMUM_FRACTION_DIGITS (20), MAXIMUM_NUMBER_DIGITS (15), NUMBER_DELIMITER ('.')
  utils/
    inputNumber.utils.ts         — formatNumber, parseFormattedNumber helpers
  style/
    index.less                   — Less styles imported at runtime
  __specs__/
    InputNumber.spec.tsx         — Jest tests (component)
    inputNumber.utils.spec.tsx   — Jest tests (utils)
```

## Public exports

### `InputNumber` (default export)

Functional component. Not a forwardRef — no ref forwarding.

Props = `AntdInputNumberProps<number>` + `FormFieldCommonProps` + custom props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| null` | `undefined` | Controlled value |
| `defaultValue` | `number \| null` | `undefined` | Uncontrolled initial value |
| `onChange` | `(value: number \| null) => void` | `undefined` | Called with parsed numeric value on every change |
| `error` | `boolean` | `undefined` | Triggers error state (red background on input) |
| `errorText` | `ReactNode` | `undefined` | Error message shown below input; also triggers error state |
| `label` | `ReactNode` | `undefined` | Label shown above input (linked via generated `id`) |
| `description` | `ReactNode` | `undefined` | Helper text shown below input |
| `tooltip` | `ReactNode` | `undefined` | Tooltip content next to label |
| `tooltipConfig` | `TooltipProps` | `undefined` | Ant Design tooltip config |
| `prefixel` | `ReactNode` | `undefined` | Content in the left addon slot |
| `suffixel` | `ReactNode` | `undefined` | Content in the right addon slot |
| `raw` | `boolean` | `undefined` | When `true`, renders bare input without FormField wrapper (no label/tooltip/description/error) |
| `valueFormatOptions` | `NumberToFormatOptions` | `undefined` | Override formatting options (e.g. `{ maximumFractionDigits: 2 }`) |
| `autoResize` | `AutoResizeProp` | `undefined` | Enable autosize: `true` or `{ minWidth, maxWidth?, stretchToFit? }` |
| `autoResizeProps` | `Partial<Pick<AutosizeInputProps, 'placeholderIsMinWidth' \| 'wrapperClassName' \| 'wrapperStyle' \| 'extraWidth'>>` | `undefined` | Extra props passed to `AutosizeWrapper` |
| `style` | `CSSProperties` | `undefined` | Applied to the inner `InputNumberWrapper` |
| + all Antd InputNumber props | — | — | `min`, `max`, `step`, `precision`, `disabled`, `autoFocus`, `onPressEnter`, etc. |

> **`formatter` and `parser` props from Ant Design are overridden internally** — passing them has no effect. Formatting is always driven by `useDataFormat` locale + `valueFormatOptions`.

> **`decimalSeparator` from Ant Design is superseded** by the locale-derived `decimalDelimiter` from `useDataFormat`.

### `InputNumberProps` (type export)

The full props type. `Props` is also exported from the types file as a `@deprecated` alias but is **not** re-exported from `index.ts`.

## Usage patterns

```tsx
import InputNumber from '@synerise/ds-input-number';

// Basic with form field
<InputNumber
  label="Quantity"
  description="Enter a number between 1 and 100"
  min={1}
  max={100}
  defaultValue={10}
  onChange={(value) => console.log(value)}
/>

// Error state
<InputNumber
  label="Price"
  error
  errorText="Must be a positive number"
  value={price}
  onChange={setPrice}
/>

// With prefix/suffix
<InputNumber
  prefixel="$"
  suffixel="USD"
  min={0}
  step={0.01}
/>

// Raw (no form field wrapper)
<InputNumber raw value={qty} onChange={setQty} />

// Autosize
<InputNumber
  autoResize={{ minWidth: '60px', maxWidth: '200px', stretchToFit: true }}
  value={val}
  onChange={setVal}
/>

// Custom decimal precision
<InputNumber
  valueFormatOptions={{ maximumFractionDigits: 2 }}
  defaultValue={1234.5678}
/>
```

## Styling

Styles live in `InputNumber.styles.tsx`. Uses `@synerise/ds-core` theme tokens:
- `grey-700` — input text colour
- `red-050` — error state background
- `grey-050` — addon background
- `grey-300` — `Prefixel`/`Suffixel` border colour (these styled exports exist but are not used by the main component — antd's `addonBefore`/`addonAfter` are used instead)

Additional Less styles in `src/style/index.less` (imported at runtime).

> **Deep import**: `InputNumber.styles.tsx` imports `autoresizeConfObjToCss` from `@synerise/ds-input/dist/Input.styles` — a fragile internal path.

## Key dependencies

- `antd` — `InputNumber` base component
- `@synerise/ds-form-field` — `FormField` wrapper providing label, tooltip, description, error layout
- `@synerise/ds-input` — `AutosizeWrapper` + `AutoResizeProp` type
- `@synerise/ds-core` — `useDataFormat` hook (locale-aware number formatting), `NumberToFormatOptions`
- `@synerise/ds-utils` — `useResizeObserver` (for `stretchToFit` autosize mode)
- `uuid` — generates stable `id` for label `htmlFor` association

## Implementation notes

- **Locale-aware formatting**: `useDataFormat()` returns `formatValue`, `thousandDelimiter`, `decimalDelimiter` based on the active `DataFormatNotationType` (`'EU'` or `'US'`). The `formatter`/`parser` passed to Ant Design are derived from these — they cannot be overridden by consumers.
- **Controlled/uncontrolled hybrid**: Component keeps `localValue` state internally. `value` prop changes are synced via `useEffect`, but only when `value !== localValue` to avoid reset loops.
- **`keypress` event listener bug**: The `useEffect` that prevents non-numeric keypresses has **no dependency array** — the event listener is removed and re-added on every render.
- **Error state**: Either `error={true}` or a non-empty `errorText` triggers error styling. The `.error` className is set on the Ant Design input, and `red-050` background is applied via styled-component conditional styles.
- **`raw` mode**: When `raw={true}`, the `FormField` wrapper is skipped entirely — `label`, `description`, `errorText`, `tooltip`, `tooltipConfig` have no effect.
- **`autoResize` + `stretchToFit`**: Uses `useResizeObserver` on a wrapper ref. When the parent container resizes, `max-width` is dynamically set on the inner Ant Design input element. An extra `45px` (`AUTOSIZE_EXTRA_WIDTH`) is added to accommodate the up/down step buttons.
- **Maximum digits**: `parseFormattedNumber` truncates to `MAXIMUM_NUMBER_DIGITS = 15` characters to avoid floating-point precision issues near `Number.MAX_SAFE_INTEGER`.
- **Tests use Jest** (`jest.config.js`) — not yet migrated to Vitest.
