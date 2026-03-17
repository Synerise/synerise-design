# CompletedWithin (`@synerise/ds-completed-within`)

> A trigger button + dropdown picker that lets the user select a numeric value and a time period (e.g. "Completed within 3 days").

## Package structure

```
src/
  CompletedWithin.tsx       — main component, state management + dropdown orchestration
  CompletedWithin.types.ts  — all prop interfaces and shared types
  CompleteWithin.styles.ts  — styled-components (note: intentional typo in filename)
  index.ts                  — public exports
  Settings/
    Settings.tsx            — dropdown content: InputNumber + Select for value/period
    Settings.types.ts       — SettingsProps (internal use only)
    Settings.styles.ts      — styled wrapper for the dropdown panel
```

## Public exports

### `CompletedWithin` (default export)

No `forwardRef`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `PeriodValue` | — | **Required.** Controlled value `{ period, value }`. |
| `onSetValue` | `(value: PeriodValue) => void` | — | **Required.** Called when dropdown closes with a valid value set. |
| `text` | `Partial<CompletedWithinTexts>` | see defaults below | Override any label. Merged with react-intl defaults. |
| `maxValue` | `number` | `undefined` | Upper bound for the numeric input. Value is clamped on dropdown close. |
| `periods` | `CustomPeriod[]` | Built-in 6 periods | Replaces the default period list entirely when provided. |
| `placeholder` | `string` | `undefined` | Label shown on the trigger button when no value is set. |
| `tooltip` | `string` | `undefined` | Tooltip shown on hover over the trigger button. |
| `readOnly` | `boolean` | `undefined` | Hides the dropdown and clear button; renders trigger only. |

### `PeriodValue` (type)

```ts
{ period: Period; value?: number }
```

### `Period` (type)

`'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'MONTHS' | 'YEARS' | string | undefined`
(uses `LiteralStringUnion` — accepts those literals with IDE autocomplete, but allows any string for custom periods)

### `CustomPeriod` (type)

```ts
{ value: Period; label: ReactNode }
```

### `CompletedWithinTexts` (type)

| Key | Type | Default |
|-----|------|---------|
| `header` | `ReactNode` | `'Completed within'` |
| `completedLabel` | `ReactNode` | `'Completed within'` |
| `clear` | `ReactNode` | `'Clear'` |
| `periodPlaceholder` | `ReactNode` | `'Interval'` |

### `CompletedWithinProps` (type)

Re-exported props interface.

## Usage patterns

```tsx
import CompletedWithin from '@synerise/ds-completed-within';
import type { PeriodValue } from '@synerise/ds-completed-within';

const [value, setValue] = useState<PeriodValue>({ period: undefined, value: undefined });

<CompletedWithin
  value={value}
  onSetValue={setValue}
  placeholder="Completed within"
  maxValue={365}
/>
```

## Implementation notes

- **`onSetValue` fires on dropdown close**, not on each keystroke. The component buffers changes in internal state (`innerValue`, `innerPeriod`) and only calls `onSetValue` when the Dropdown `onOpenChange` fires with `visible: false` AND both `innerValue` and `innerPeriod` are set.
- **`maxValue` clamping** — if `innerValue > maxValue` when the dropdown closes, `maxValue` is used instead. This happens silently with no validation UI.
- **Clear button** — only shown when `value.value !== undefined && value.value > 0` AND `readOnly` is false. Calls `onSetValue({ value: undefined, period: undefined })`.
- **Trigger mode** — renders as `'icon-label'` (clock icon + text) when a value is set or `placeholder` is provided, otherwise `'single-icon'` (clock only).
- **Default periods** are translated via react-intl using `DS.COMPLETED-WITHIN.{PERIOD}` message IDs. Custom `periods` prop bypasses i18n entirely.
- **`IntlProvider` required** — uses `useIntl()` directly. Wrap the app in `IntlProvider` or all text will fall back to English defaults.
- **Filename typo**: styles file is `CompleteWithin.styles.ts` (missing "d"), not `CompletedWithin.styles.ts`.
- **`DEFAULT_PERIODS`** is exported from `CompletedWithin.tsx` (not re-exported from `index.ts`) — not part of the public API.

## Key dependencies

- `@synerise/ds-dropdown` — wraps the Settings panel
- `@synerise/ds-tooltip` — trigger button hover tooltip (hidden while dropdown is open)
- `@synerise/ds-input-number` — numeric value input in Settings
- `@synerise/ds-select` — period selection in Settings
- `react-intl` — i18n for default labels
