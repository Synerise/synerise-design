# InputNumber (`@synerise/ds-input-number`)

> Locale-aware numeric input, **DS-native** (no Ant Design). Renders a styled `<input>` with custom
> up/down steppers, form-field layout (label, tooltip, description, error text), autosize support,
> and locale-driven thousand/decimal formatting.

## Package structure

```
src/
 InputNumber.tsx — main component (value flow, steppers, autosize wiring)
 InputNumber.types.ts — InputNumberProps (explicit, hand-written), deprecated Props alias
 InputNumber.styles.tsx — DS-native styled-components (InputNumberRoot, HandlerWrap, HandlerUp/Down, InputField, Addon, …)
 index.ts — public exports
 hooks/
 useStepper.ts — float-safe increment/decrement, clamp, precision, press-and-hold + Shift×10
 constants/
 inputNumber.constants.ts — MAXIMUM_FRACTION_DIGITS (20), MAXIMUM_NUMBER_DIGITS (15), NUMBER_DELIMITER ('.'), ANGLE_UP_SVG / ANGLE_DOWN_SVG (stepper glyphs)
 utils/
 inputNumber.utils.ts — formatNumber, parseFormattedNumber helpers
 __specs__/
 InputNumber.spec.tsx — Vitest tests (component + steppers + value flow)
 inputNumber.utils.spec.tsx — Vitest tests (utils)
```

There is **no `style/` LESS** — all styling is in `InputNumber.styles.tsx`.

## Public exports

### `InputNumber` (default export)

Functional component. Not a forwardRef — no ref forwarding.

Props = explicit `InputNumberOwnProps` + `FormFieldCommonProps` + `PassthroughAttributes` (`data-*`/`aria-*`)
+ standard input HTML attributes via `Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'size' | 'min' | 'max' | 'type'>` (antd-parity forwarding of `maxLength`, `onFocus`, `tabIndex`, `inputMode`, `onKeyDown`, …). The omitted keys are owned explicitly by the component (different types/behavior). Two have special wiring: `onKeyDown` and `onKeyPress` are composed with the internal arrow-stepping / numeric-filter handlers (consumer called first), and `inputMode` defaults to `'decimal'` but a consumer value overrides it:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| null` | `undefined` | Controlled value |
| `defaultValue` | `number \| null` | `undefined` | Uncontrolled initial value |
| `onChange` | `(value: number \| null) => void` | `undefined` | Called with parsed numeric value on every change |
| `onBlur` | `(event: FocusEvent<HTMLInputElement>) => void` | `undefined` | Native input blur, invoked **after** the on-blur min/max re-align (consumers read `event.target.value`) |
| `onKeyPress` | `(event: KeyboardEvent<HTMLInputElement>) => void` | `undefined` | Forwarded the input's `keypress` event (fired before the internal numeric-key filter) |
| `onStep` | `(value: number, info: { offset: number; type: 'up' \| 'down' }) => void` | `undefined` | Fires on a stepper interaction (up/down button or ArrowUp/ArrowDown). antd parity — fires alongside `onChange`; `offset` is the applied step magnitude (incl. Shift×10) |
| `min` / `max` | `number` | `undefined` | Stepper bounds (clamped on step) |
| `step` | `number \| string` | `1` | Stepper increment |
| `disabled` / `readOnly` | `boolean` | `undefined` | Disable input; steppers are not rendered |
| `autoFocus` | `boolean` | `undefined` | Focus the input on mount |
| `tabIndex` | `number` | `undefined` | Forwarded to the underlying `<input>` (focus order) |
| `placeholder` | `string` | `undefined` | Input placeholder |
| `size` | `'small' \| 'middle' \| 'large'` | `undefined` | `'large'` → 48px tall |
| `error` | `boolean` | `undefined` | Triggers error state (red inset border + background) |
| `errorText` | `ReactNode` | `undefined` | Error message shown below input; also triggers error state |
| `label` / `description` / `tooltip` / `tooltipConfig` | from `FormFieldCommonProps` | `undefined` | Form-field layout |
| `prefixel` / `suffixel` | `ReactNode` | `undefined` | Content in the left / right addon slot |
| `raw` | `boolean` | `undefined` | When `true`, renders bare input without FormField wrapper |
| `valueFormatOptions` | `NumberToFormatOptions` | `undefined` | Override formatting options (e.g. `{ maximumFractionDigits: 2 }`) |
| `autoResize` | `AutoResizeProp` | `undefined` | Enable autosize: `true` or `{ minWidth, maxWidth?, stretchToFit? }` |
| `autoResizeProps` | `Partial<Pick<AutosizeInputProps, 'placeholderIsMinWidth' \| 'wrapperClassName' \| 'wrapperStyle' \| 'extraWidth'>>` | `undefined` | Extra props passed to `AutosizeWrapper` |
| `style` / `className` | `CSSProperties` / `string` | `undefined` | Applied to the inner `InputNumberWrapper` |

> **Removed in the antd-removal migration (STOR-2334) — BREAKING.** The antd-only props are gone:
> `formatter`, `parser` (formatting is always locale-driven via `useDataFormat` + `valueFormatOptions`),
> `decimalSeparator` (superseded by the locale `decimalDelimiter`), `controls`, `keyboard`, `stringMode`,
> `bordered`, `status`, `prefix`, `onPressEnter`, and `addonBefore`/`addonAfter` (use `prefixel`/`suffixel`).
> Also removed: `precision` — the stepped value is now rounded to
> `max(decimals(step), valueFormatOptions?.maximumFractionDigits ?? 0)`, so express decimal precision
> via `step` and/or `valueFormatOptions` instead.

### `InputNumberProps` (type export)

The full props type. `Props` is also exported from the types file as a `@deprecated` alias but is **not**
re-exported from `index.ts`.

## Usage patterns

```tsx
import InputNumber from '@synerise/ds-input-number';

// Basic with form field
<InputNumber label="Quantity" min={1} max={100} defaultValue={10} onChange={(v) => console.log(v)} />

// Error state
<InputNumber label="Price" error errorText="Must be positive" value={price} onChange={setPrice} />

// With prefix/suffix
<InputNumber prefixel="$" suffixel="USD" min={0} step={0.01} />

// Raw (no form field wrapper)
<InputNumber raw value={qty} onChange={setQty} />

// Autosize
<InputNumber autoResize={{ minWidth: '60px', maxWidth: '200px', stretchToFit: true }} value={val} onChange={setVal} />
```

## Styling

All styling lives in `InputNumber.styles.tsx` as DS-native styled-components driven by transient
`$`-props and `:focus-within` (no antd LESS, no `.ant-*`/`.ds-*` styling selectors). The
`ant-input-number-*` and `ds-input-number-*` class names are kept on the elements as hooks only
(ui-tests / interim external CSS). Theme tokens used: `grey-700` (text), `grey-300` (idle border),
`blue-600` (focus border), `red-600`/`red-050` (error), `grey-500` (placeholder), `grey-050` (addon).

> **Deep import**: `InputNumber.styles.tsx` imports `autoresizeConfObjToCss` from
> `@synerise/ds-input/dist/Input.styles` — a fragile internal path (pre-existing; flagged as an
> eslint warning until ds-input exposes it from the root).

## Key dependencies

- `@synerise/ds-form-field` — `FormField` wrapper providing label, tooltip, description, error layout
- `@synerise/ds-input` — `AutosizeWrapper` + `AutoResizeProp` type
- `@synerise/ds-core` — `useDataFormat` hook (locale-aware number formatting), `NumberToFormatOptions`, `ThemeProps`
- `@synerise/ds-utils` — `useResizeObserver` (for `stretchToFit` autosize) + `PassthroughAttributes` type
- `uuid` — generates stable `id` for label `htmlFor` association

## Implementation notes

- **Steppers (`useStepper`)**: float-safe arithmetic (integer scaling, so `0.1 + 0.2 === 0.3`), clamp to
  `min`/`max`, then round to `max(decimals(step), valueFormatOptions?.maximumFractionDigits ?? 0)` — so a
  fractional `step` (e.g. `0.01`) keeps its decimals without any extra config, and `maximumFractionDigits`
  raises the rounding floor. Mouse press-and-hold auto-repeats (600ms delay → 200ms interval);
  `Shift` multiplies the step by ten; ArrowUp/ArrowDown step from the keyboard (a consumer `onKeyDown`
  is invoked first, then the stepping runs). Steppers are not rendered when `disabled` or `readOnly`.
- **Value flow**: a controlled `<input type="text">`. Typed input is parsed locale→number string first
  (`parseFormattedNumber`) then re-formatted for display (`formatNumber`) — preserving a lone `-`, a
  trailing decimal and trailing zeros while typing. `onChange` always emits `number | null` (emits `0`,
  not `null`). `aria-valuenow` carries the raw numeric value.
- **On-blur min/max re-align (antd parity)**: typing is never clamped (rc-input-number's
  `userTyping=true` path), so a value can exceed `min`/`max` mid-edit. On blur, an out-of-range value is
  re-aligned to the nearest bound (`> max ⇒ max`, `< min ⇒ min`) — mirroring rc-input-number's
  `flushInputValue(false)` → `triggerValueUpdate(…, userTyping=false)` → `getRangeValue`. When it clamps
  it updates the display and fires `onChange(clamped)`; an in-range value is left untouched (no
  `onChange`). Empty / `NaN` values are not clamped. Steppers clamp independently in `useStepper`.
- **Numeric key filter**: lives on the input's `onKeyPress` — the native `keypress` event does not fire
  for Backspace / arrows / Delete, so editing keys are never blocked. A consumer-supplied `onKeyPress`
  prop is invoked first (so it can inspect / `preventDefault`), then the numeric filter runs.
- **Locale-aware formatting**: `useDataFormat()` returns `formatValue`, `thousandDelimiter`,
  `decimalDelimiter` based on the active `DataFormatNotationType` (`'EU'` or `'US'`).
- **Controlled/uncontrolled hybrid**: keeps `localValue`/`displayValue` state; `value` prop changes sync
  via `useEffect` (only when `value !== localValue`).
- **Error state**: `error={true}` or a non-empty `errorText` adds the `error` class to the root and the
  red inset border + `red-050` background via `$error`.
- **`raw` mode**: skips the `FormField` wrapper — `label`/`description`/`errorText`/`tooltip` have no effect.
- **`autoResize` + `stretchToFit`**: `useResizeObserver` on a wrapper ref dynamically sets `max-width`;
  `AUTOSIZE_EXTRA_WIDTH = 45` accommodates the stepper buttons.
- **Maximum digits**: `parseFormattedNumber` truncates to `MAXIMUM_NUMBER_DIGITS = 15` to avoid
  floating-point precision issues near `Number.MAX_SAFE_INTEGER`.
- **Uses Vitest** for testing.
```
